import { AxiosResponse } from 'axios';
import { ENDPOINT } from 'configs/constants';
import { del, get, patch, post } from 'libs/axios';

export type CreateBookDto = {
  title: string;
  author: string;
  genre: string;
  description: string;
  price: string;
  book_cover: any;
};

export type BookDto = {
  id: number;
  title: string;
  author: string;
  genre: string;
  description: string;
  price: string;
  book_cover: string;
  posted_on: string;
  owner: string;
  posted_by: string;
  liked_count: number;
  reviews_count: number;
};

export const addBook = async (payload: CreateBookDto) => {
  return await post(`${ENDPOINT.MY_BOOKS}/`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getAllBooks = async ({
  genre,
}: {
  genre?: string;
}): Promise<AxiosResponse<BookDto[]>> => {
  if (genre) {
    return await get(`${ENDPOINT.PUBLIC_BOOKS}/?genre=${genre}`);
  } else return await get(`${ENDPOINT.PUBLIC_BOOKS}/`);
};

export const getMyBooks = async (): Promise<AxiosResponse<BookDto[]>> => {
  return await get(`${ENDPOINT.MY_BOOKS}/`);
};

export const updateBook = async ({
  bookId,
  payload,
}: {
  bookId: number;
  payload: Partial<BookDto>;
}) => {
  return await patch(`${ENDPOINT.MY_BOOKS}/${bookId}/`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const getBookDetail = async (id: string) => {
  return await get(`${ENDPOINT.PUBLIC_BOOKS}/${id}/`);
};

const getBookByGenre = async (genre: string) => {
  return await get(`${ENDPOINT.PUBLIC_BOOKS}/?genre=${genre}`);
};

const deleteBook = async (bookId: number) => {
  return await del(`${ENDPOINT.MY_BOOKS}/${bookId}/`);
};

export { getBookDetail, getBookByGenre, deleteBook };
