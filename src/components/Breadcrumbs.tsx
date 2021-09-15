import React, { SVGProps, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface TransformedBreadcrumbLabel {
  label?: string;
  svgIcon?: SVGProps<SVGSVGElement>;
}
type TransformTitleFunction = (breadcrumb: BreadcrumbsItem) => TransformedBreadcrumbLabel;

/**
 * Takes a breadcrumb title (from url path) and replaces
 * special chars to more readable chars
 *
 * @param breadcrumb - The breadcrumb title
 * @returns The transformed title
 *
 */
const convertBreadcrumb = (breadcrumb: BreadcrumbsItem, rootLabel?: string, toUpperCase?: boolean, transformLabel?: TransformTitleFunction): TransformedBreadcrumbLabel => {
  const defaultBreadcrumb = { breadcrumb: '', href: '/', pathname: '' };
  const title = breadcrumb ? decodeURIComponent(breadcrumb.breadcrumb) : rootLabel || 'HOME';
  return transformLabel ? transformLabel(breadcrumb || defaultBreadcrumb) : { label: toUpperCase ? decodeURIComponent(title).toUpperCase() : decodeURIComponent(title) };
};

export interface BreadcrumbsItem {
  /** Breadcrumb title. Example: 'blog-entries' */
  breadcrumb: string;

  /** The URL which the breadcrumb points to. Example: 'blog/blog-entries' */
  href: string;

  pathname: string;
}

interface BreadcrumbsProps {
  /** If true, the default styles are used.
   * Make sure to import the CSS in _app.js
   * Example: true Default: false */
  useDefaultStyle?: boolean;

  /** The title for the very first breadcrumb pointing to the root directory. Example: '/' Default: 'HOME' */
  rootLabel?: string | null;

  /** Boolean indicator if the labels should be displayed as uppercase. Example: true Default: false */
  labelsToUppercase?: boolean;

  /** A transformation function that allows to customize the label strings. Receives the label string and has to return a string */
  transformLabel?: ((breadcrumb: BreadcrumbsItem) => { label?: string; svgIcon?: SVGProps<SVGSVGElement> }) | undefined;

  /** An inline style object for the outer container */
  containerStyle?: any | null;

  /** Classes to be used for the outer container. Won't be used if useDefaultStyle is true */
  containerClassName?: string;

  /** An inline style object for the breadcrumb list */
  listStyle?: any | null;

  /** Classes to be used for the breadcrumb list */
  listClassName?: string;

  /** An inline style object for the inactive breadcrumb list item */
  inactiveItemStyle?: any | null;

  /** Classes to be used for the inactive breadcrumb list item */
  inactiveItemClassName?: string;

  /** An inline style object for the active breadcrumb list item */
  activeItemStyle?: any | null;

  /** Classes to be used for the active breadcrumb list item */
  activeItemClassName?: string;

  loadingLevel?: number;
}

const defaultProps: BreadcrumbsProps = {
  useDefaultStyle: false,
  rootLabel: 'Projets',
  labelsToUppercase: false,
  transformLabel: undefined,
  containerStyle: null,
  containerClassName: '',
  listStyle: null,
  listClassName: '',
  inactiveItemStyle: null,
  inactiveItemClassName: '',
  activeItemStyle: null,
  activeItemClassName: '',
};

/**
 * A functional React component for Next.js that renders a dynamic Breadcrumb navigation
 * based on the current path within the Next.js router navigation.
 *
 * Only works in conjunction with Next.js, since it leverages the Next.js router.
 *
 * By setting useDefaultStyle to true, the default CSS will be used.
 * The component is highly customizable by either custom classes or
 * inline styles, which can be passed as props.
 *
 * @param props - object of type BreadcrumbsProps
 * @returns The breadcrumb React component.
 */
const Breadcrumbs = ({
  useDefaultStyle,
  rootLabel,
  labelsToUppercase,
  transformLabel,
  containerStyle,
  containerClassName,
  listStyle,
  listClassName,
  inactiveItemStyle,
  inactiveItemClassName,
  activeItemStyle,
  activeItemClassName,
  loadingLevel,
}: BreadcrumbsProps) => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState<Array<BreadcrumbsItem> | null>(null);

  useEffect(() => {
    if (router) {
      const asPath = router.asPath === '/' ? ['/'] : router.asPath.split('/');
      const pathname = router.pathname === '/' ? ['/'] : router.pathname.split('/');
      if (asPath.length === pathname.length) {
        const pathArray = asPath.map((path, i) => {
          const breadcrumb = path.split('?')[0];
          const pathnameWithoutBrackets = pathname[i].slice(1, pathname[i].length - 1);
          return { pathname: pathnameWithoutBrackets, breadcrumb, href: `${i === 0 ? '/' : ''}${asPath.slice(0, i + 1).join('/')}` };
        });

        setBreadcrumbs(pathArray);
      }
    }
  }, [router]);

  if (!breadcrumbs) {
    return null;
  }

  const transformedBreadcrumb = (item) => convertBreadcrumb(item, rootLabel, labelsToUppercase, transformLabel);

  return (
    <nav style={containerStyle} className={`text-sm breadcrumbs ${containerClassName}`} aria-label='breadcrumbs'>
      <ul style={listStyle} className='flex'>
        {breadcrumbs.length >= 0 &&
          breadcrumbs.map((breadcrumb, i) => {
            const { label, svgIcon } = transformedBreadcrumb(breadcrumb);
            return (
              <li
                key={breadcrumb.href}
                className={`overflow-hidden transition-opacity ${i === 0 ? 'flex-none w-5' : ''} ${loadingLevel === i ? 'opacity-0' : 'opacity-100'} ${i === breadcrumbs.length - 1 ? activeItemClassName : inactiveItemClassName}`}
                style={i === breadcrumbs.length - 1 ? activeItemStyle : inactiveItemStyle}
              >
                {i === breadcrumbs.length - 1 ? (
                  <p className='overflow-hidden overflow-ellipsis'>{label}</p>
                ) : (
                  <Link href={breadcrumb.href}>
                    <p className='hover:underline hover:cursor-pointer overflow-hidden overflow-ellipsis'>
                      {svgIcon && <span className='hover:cursor-pointer'>{svgIcon}</span>}
                      {label}
                    </p>
                  </Link>
                )}
              </li>
            );
          })}
      </ul>
    </nav>
  );
};

Breadcrumbs.defaultProps = defaultProps;

export default Breadcrumbs;
