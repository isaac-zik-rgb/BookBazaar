import bookDetailTopImage from 'assets/images/bookDetailTopImage.png';
import { Button } from 'components/ui';
import MainLayout from 'layouts/MainLayout';

import React, { useLayoutEffect, useRef, useState } from 'react';
import BookCard from 'components/BookCard';
import { books } from 'data/bookList';
import { useParams } from 'react-router-dom';

export type Book = (typeof books)[0];

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();

  const elevatedDivRef = useRef<HTMLDivElement>(null);
  const height = elevatedDivRef.current?.offsetHeight;
  const [bottomElementHeight, setBottomElementHeight] = useState(height);

  useLayoutEffect(() => {
    setBottomElementHeight(elevatedDivRef.current?.offsetHeight);
  }, [height]);

  if (!id) return null;

  return (
    <MainLayout>
      <div className="flex min-h-[52rem] flex-col">
        <TopImage />
        <div
          style={{ height: `calc(${bottomElementHeight}px - 8rem)` }}
          className="relative bg-gray-100 py-24"
        >
          <Details book={books[parseInt(id) - 1]} ref={elevatedDivRef} />
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
      book: Book;
    },
    ref: React.Ref<HTMLDivElement>
  ) => {
    const { cover, title, author, rate, like, description, categories } = book;
    return (
      <div
        {...rest}
        ref={ref}
        className="absolute -top-[14rem] flex flex-col lg:flex-row w-full justify-between gap-10 px-20"
      >
        <div className="flex h-max lg:w-3/5 shrink-0 flex-col gap-y-14 rounded-lg bg-white pb-10 shadow-md">
          <div className="flex gap-x-6">
            <div className="h-[27rem] w-[17rem] shrink-0 shadow-lg">
              <img
                src={cover}
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
                    {like}
                    likes
                  </span>
                </div>
                <div> {rate} stars / 5</div>
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
              {categories.map((category) => (
                <span className="rounded-lg bg-gray-200 p-3">{category}</span>
              ))}
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

const SimilarBooks = ({ book }: { book: Book }) => {
  const similarBooks = books?.filter((b) => b.id !== book.id).slice(0, 3);
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

export default BookDetails;
