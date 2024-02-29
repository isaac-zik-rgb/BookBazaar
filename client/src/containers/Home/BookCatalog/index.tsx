import SideFilter from './SideFilter';
import BooksList from './BooksList';

const BookCatalog = () => {
  return (
    <div className="flex gap-x-16 rounded-md bg-gray-100 px-16 py-14">
      <SideFilter />
      <BooksList />
    </div>
  );
};

export default BookCatalog;
