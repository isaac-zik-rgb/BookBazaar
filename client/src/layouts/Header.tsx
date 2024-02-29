import { Button } from 'components/ui';
import { NavMenu, PAGES_URL } from 'configs/constants';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <div className="sticky  flex w-full items-center justify-between rounded-es-md bg-primary px-20 py-3">
      <Link className="text-3xl" id="logo" to="/">
        BOOKBAZAAR
      </Link>
      <div className="flex shrink-0 gap-14 text-white" id="nav-links">
        {NavMenu.map((item, index) => (
          <NavLink className={'group text-2xl'} key={index} to={item.url}>
            {({ isActive }) => (
              <span className="">
                <span
                  className={isActive ? 'hover:text-white' : 'hover:text-black'}
                >
                  {item.title}
                </span>
                {isActive && (
                  <span className="flex w-full justify-center pt-2.5">
                    <span className="block w-1/2 self-center border-b-4 border-white group-hover:border-black"></span>
                  </span>
                )}
              </span>
            )}
          </NavLink>
        ))}
      </div>
      <div className="space-x-6" id="auth-buttons">
        <Link to={PAGES_URL.LOGIN}>
          <Button className="border border-white text-white">LOGIN</Button>
        </Link>
        <Link to={PAGES_URL.LOGIN}>
          <Button className="bg-white py-2.5 text-black">SIGN UP</Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
