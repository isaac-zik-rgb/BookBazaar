import BookCard from 'components/BookCard';
import { useEffect, useState } from 'react';
import { BookDto, getAllBooks } from 'services/book.service';

const BooksList = () => {
  const [books, setBooks] = useState<BookDto[]>([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await getAllBooks() as any;
        console.log(response);
        
        setBooks(response as BookDto[]);
      } catch (error) {
        console.error(error);
      }
    }
    fetchAllBooks();
  }, []);
  return (
    <div>
      <div className="grid lg:grid-cols-2 gap-x-20 gap-y-20">
      {books.map((book) => (
        <BookCard featured key={book.id} book={book} />
      ))}
    </div>
    </div>
  );
};

export default BooksList;
