import BookCard from 'components/BookCard';
import { useGenre } from 'contexts/GenreContext';
import { useEffect, useState } from 'react';
import { BookDto, getAllBooks } from 'services/book.service';

const BooksList = () => {
  const [books, setBooks] = useState<BookDto[]>([]);
  const { selectedGenre } = useGenre();

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = (await getAllBooks({ genre: selectedGenre })) as any;
        console.log(response);

        setBooks(response as BookDto[]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllBooks();
  }, [selectedGenre]);

  if ((books.length === 0))
    return (
      // there is no book in the selected genre
      <div className="text-center flex items-center justify-center w-full">
        <h1 className="text-3xl font-bold">No books found</h1>
      </div>
    );
  return (
    <div>
      <div className="grid gap-x-20 gap-y-20 lg:grid-cols-2">
        {books.map((book) => (
          <BookCard featured key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BooksList;
