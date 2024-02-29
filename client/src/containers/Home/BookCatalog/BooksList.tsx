import BookCard from 'components/BookCard';
import { books } from 'data/bookList';

const BooksList = () => {
  return (
    <div className="grid grid-cols-2 gap-x-20 gap-y-20">
      {books.map((book) => (
        <BookCard featured key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BooksList;
