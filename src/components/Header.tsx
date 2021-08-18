import PageTitle from './PageTitle';
import DynamicBreadcrumbs from './DynamicBreadcrumbs';
import ThemeChanger from './ThemeChanger';

const Header = () => {
  return (
    <div className='m-2 flex-grow-0'>
      {/* <ThemeChanger /> */}
      <PageTitle />
      <DynamicBreadcrumbs />
    </div>
  );
};

export default Header;
