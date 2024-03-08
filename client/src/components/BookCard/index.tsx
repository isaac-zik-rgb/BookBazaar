import { Button } from 'components/ui';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { BookDto } from 'services/book.service';


const BookCard = ({
  book,
  featured,
}: {
  book: BookDto;
  featured?: boolean;
}) => {
  const { book_cover, title, author, reviews_count, liked_count, description, id } = book;

  const shortenDescription = useCallback(() => {
    if (description.length > 80) {
      const lastSpaceBefore130 = description.lastIndexOf(' ', 80);
      return `${description.slice(0, lastSpaceBefore130)}...`;
    }
    return description;
  }, [description]);

  const href = `/books/${id}`;

  return (
    <Link to={href} className="group flex h-full relative cursor-pointer transition-shadow">
      <div className="relative z-10 flex gap-x-9">
        <div className="shrink-0. max-w-[148px] max-h-[226px]">
          <img className='w-[148px] h-[226px]' src={book_cover} alt="book" />
        </div>
        <div className="space-y-4  h-10">
          <h2 className="text-2xl font-medium">{title}</h2>
          <div className="space-y-3">
            <h3>By {author}</h3>
            <div className="flex w-full justify-between text-gray-500">
              <span>{reviews_count} / 5</span>
              <span>{liked_count} likes</span>
            </div>
          </div>
          <div className="w-[12.5rem] shrink-0 text-gray-500">
            {shortenDescription()}
          </div>
          {featured && !featured && (
            <Button className="w-full" variant="outlined">
              Trade now
            </Button>
          )}
        </div>
      </div>
      {featured && (
        <div className="absolute -bottom-6 -right-6 z-0 h-[calc(120%)] w-[90%] rounded border-2 bg-white shadow-md group-hover:shadow-xl" />
      )}
    </Link>
  );
};

const FeaturedBookCard = ({ book }: { book: BookDto }) => {
  const { id } = book;
  const href = `/book/${id}`;
  return (
    <Link
      to={href}
      className="group relative cursor-pointer transition-shadow ease-in-out"
    >
      <div className="relative z-10">
        <BookCard featured book={book} />
      </div>
      <div className="absolute -bottom-6 -right-6 z-0 h-[calc(100%)]. w-[90%] rounded border-2 bg-white shadow-md group-hover:shadow-xl" />
    </Link>
  );
};

export { BookCard, FeaturedBookCard };

export default BookCard;
