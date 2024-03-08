import bookDetailTopImage from 'assets/images/bookDetailTopImage.png';
import { Button } from 'components/ui';
import MainLayout from 'layouts/MainLayout';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BookDto, getBookDetail } from 'services/book.service';
import SimilarBooks from './SimilarBooks';

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();

  const [book, setBook] = useState<BookDto>();

  const elevatedDivRef = useRef<HTMLDivElement>(null);
  const height = elevatedDivRef.current?.offsetHeight;
  const [bottomElementHeight, setBottomElementHeight] = useState(height);

  useLayoutEffect(() => {    
    setBottomElementHeight(elevatedDivRef.current?.offsetHeight);
  }, [height, book]);

  if (!id) return null;

  useEffect(() => {
    const fetchBookByID = async () => {
      try {
        const book = await getBookDetail(id) as any;
        setBook(book as BookDto);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBookByID();
  }, [id]);

  return (
    <MainLayout>
      <div className="flex min-h-[52rem] flex-col">
        <TopImage />
        <div
          style={{ height: `calc(${bottomElementHeight}px - 8rem)` }}
          className="relative bg-gray-100 py-24"
        >
          <Details book={book} ref={elevatedDivRef} />
        </div>
      </div>
    </MainLayout>
  );
};

const TopImage = () => {
  return (
    <div>
      <img src={bookDetailTopImage} alt="book-detail-top-image" />
    </div>
  );
};

const Details = React.forwardRef(
  (
    {
      book,
      ...rest
    }: {
      book: BookDto | undefined;
    },
    ref: React.Ref<HTMLDivElement>
  ) => {
    if (!book) return null;
    const {
      book_cover,
      title,
      author,
      reviews_count,
      liked_count,
      description,
      genre,
    } = book;
    return (
      <div
        {...rest}
        ref={ref}
        className="absolute -top-[14rem] flex w-full flex-col justify-between gap-10 px-20 lg:flex-row"
      >
        <div className="flex h-max shrink-0 flex-col gap-y-14 rounded-lg bg-white pb-10 shadow-md lg:w-3/5">
          <div className="flex gap-x-6">
            <div className="h-[27rem] w-[17rem] shrink-0 shadow-lg">
              <img
                src={book_cover}
                className="object-fill. h-full w-full rounded-lg"
                alt="book-detail-top-image"
              />
            </div>
            <div className="flex w-full flex-col justify-end gap-y-10 px-4">
              <h1 className="text-5xl font-bold">{title}</h1>
              <div className="flex flex-col gap-y-6 text-gray-500">
                <div className="space-x-8">
                  <span>By {author}</span>
                  <span>
                    {' '}
                    {liked_count}{' '}
                    likes
                  </span>
                </div>
                <div> {reviews_count} stars / 5</div>
              </div>
              <div className="self-center">
                <Button variant="solid">Trade Now</Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-14 px-10">
            <div className="">
              <h2 className="text-3xl font-semibold">Summary</h2>
              <p className="mt-4">{description}</p>
            </div>
            <div className="space-x-6">
              <span className="rounded-lg bg-gray-200 p-3">{genre}</span>
            </div>
          </div>
          <div className="self-center">
            <Button variant="outlined">See Comments</Button>
          </div>
        </div>
        <div className="flex flex-col justify-start gap-y-8">
          <SimilarBooks book={book} />
        </div>
      </div>
    );
  }
);

export default BookDetails;
