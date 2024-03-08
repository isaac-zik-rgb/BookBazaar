import BookCard from 'components/BookCard';
import { useEffect, useState } from 'react';
import { BookDto, getBookByGenre } from 'services/book.service';

const SimilarBooks = ({ book }: { book: BookDto }) => {
  const [similarBooks, setSimilarBooks] = useState<BookDto[]>();
  useEffect(() => {
    const fetchBookByGenre = async () => {
      try {
        const resp = (await getBookByGenre(book.genre)) as any;
        const similaWithoutCurrent = resp.filter(
          (b: BookDto) => b.id !== book.id
        );
        setSimilarBooks(similaWithoutCurrent.slice(0, 3) as BookDto[]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBookByGenre();
  }, [book.id]);
  return (
    <>
      {similarBooks?.map((book) => (
        <div key={book.id} className="bg-white p-3 shadow-md hover:shadow-lg">
          <BookCard key={book.id} book={book} />
        </div>
      ))}
    </>
  );
};

export default SimilarBooks;
