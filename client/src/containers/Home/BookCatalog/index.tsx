import SideFilter from './SideFilter';
import BooksList from './BooksList';
import { GenreProvider } from 'contexts/GenreContext';

const BookCatalog = () => {
  return (
    <div className="flex gap-x-16 rounded-md bg-gray-100 px-16 py-14">
      <GenreProvider>
        <SideFilter />
        <BooksList />
      </GenreProvider>
    </div>
  );
};

export default BookCatalog;
