import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

/**
 * Takes a breadcrumb title (from url path) and replaces
 * special chars to more readable chars
 *
 * @param breadcrumb - The breadcrumb title
 * @returns The transformed title
 *
 */
const convertBreadcrumb = (breadcrumb: BreadcrumbsItem, rootLabel?: string, toUpperCase?: boolean, transformLabel?: (breadcrumb: BreadcrumbsItem) => string): string => {
  const title = breadcrumb ? decodeURIComponent(breadcrumb.breadcrumb) : rootLabel || 'Projets';
  const transformedTitle = transformLabel && breadcrumb ? transformLabel(breadcrumb) : decodeURIComponent(title);
  return toUpperCase ? transformedTitle.toUpperCase() : transformedTitle;
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
  transformLabel?: ((breadcrumb: BreadcrumbsItem) => string) | undefined;

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

  loading?: boolean;
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
  loading,
}: BreadcrumbsProps) => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState<Array<BreadcrumbsItem> | null>(null);

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split('/');
      linkPath.shift();

      const pathArray = linkPath.map((path, i) => {
        const pathWithoutQuery = path.split('?')[0];
        const dynamicPath = router.pathname.split('/')[i + 1].replace('[', '').replace(']', '');
        return { pathname: dynamicPath, breadcrumb: pathWithoutQuery, href: '/' + linkPath.slice(0, i + 1).join('/') };
      });

      setBreadcrumbs(pathArray);
    }
  }, [router]);

  if (!breadcrumbs) {
    return null;
  }

  return (
    <nav style={containerStyle} className={`text-sm breadcrumbs ${containerClassName}`} aria-label='breadcrumbs'>
      <ul style={listStyle} className={useDefaultStyle ? '_2jvtI' : listClassName}>
        <li style={inactiveItemStyle} className={inactiveItemClassName}>
          <Link href='/'>
            <a>{convertBreadcrumb(null, rootLabel, labelsToUppercase, transformLabel)}</a>
          </Link>
        </li>
        {breadcrumbs.length >= 1 &&
          breadcrumbs.map((breadcrumb, i) => {
            if (!breadcrumb || breadcrumb.breadcrumb.length === 0) {
              return;
            }
            const text = convertBreadcrumb(breadcrumb, rootLabel, labelsToUppercase, transformLabel);
            return (
              <li
                key={breadcrumb.href}
                className={`transition-opacity ${loading ? 'opacity-0' : 'opacity-100'} ${i === breadcrumbs.length - 1 ? activeItemClassName : inactiveItemClassName}`}
                style={i === breadcrumbs.length - 1 ? activeItemStyle : inactiveItemStyle}
              >
                {i === breadcrumbs.length - 1 ? (
                  <span>{text}</span>
                ) : (
                  <Link href={breadcrumb.href}>
                    <a>{text}</a>
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
