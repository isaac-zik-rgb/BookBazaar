import BookCard from "components/BookCard";
import { useEffect, useState } from "react";
import { BookDto, getBookByGenre } from "services/book.service";

const SimilarBooks = ({ book }: { book: BookDto }) => {
    const [similarBooks, setSimilarBooks] = useState<BookDto[]>();
    useEffect(() => {
      const fetchBookByGenre = async () => {
        try {
          const resp = await getBookByGenre(book.genre) as any;
          setSimilarBooks(resp.slice(0,2) as BookDto[]);
          
        } catch (error) {
          console.error(error);
        }
      };
      fetchBookByGenre();
      }, [book.genre]);
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
