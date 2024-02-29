import { NavMenu } from 'configs/constants';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="flex justify-between bg-primary px-20 py-8">
      <span />
      <span>2024-BOOKBAZAAR</span>
      <div className="space-x-10">
        {NavMenu.map((item, index) => (
          <Link key={index} to={item.url} className="font-bold text-white">
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Footer;
