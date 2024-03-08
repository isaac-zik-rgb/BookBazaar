import { Genres } from 'configs/constants';
import { NavLink, useLocation } from 'react-router-dom';

const SideFilter = () => {
  const { search } = useLocation();

  const genre = new URLSearchParams(search).get('genre');

  return (
    <div className="w-[15rem] shrink-0 text-2xl">
      <h2 className="pb-4 text-center font-bold">Book by Genre</h2>
      <div className="flex flex-col gap-y-2">
        {Genres.map((item, index: number) => (
          <NavLink
            key={index}
            to={`?genre=${item.value}`}
            className={`block rounded-md py-1 pl-8 ${
              genre === item.value || (!genre && item.value === 'all')
                ? 'text-white. bg-primary'
                : 'hover:bg-primary/30'
            }`}
          >
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SideFilter;
