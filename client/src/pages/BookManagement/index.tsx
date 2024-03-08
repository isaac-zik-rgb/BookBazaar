import { Button } from 'components/ui';
import { Link } from 'react-router-dom';
import { set, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal } from '@mui/base/Modal';
import { useState } from 'react';
import { useEffect } from 'react';
import {
  CreateBookDto,
  getMyBooks,
  addBook,
  BookDto,
  deleteBook,
  updateBook,
} from 'services/book.service';
import { Genres } from 'configs/constants';

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  author: yup.string().required('Author name is required'),
  genre: yup.string().required('Genre is required'),
  description: yup.string().required('Description is required'),
  book_cover: yup.mixed().required('Cover photo is required'),
  price: yup.string().required('Price is required'),
  bookPdf: yup.mixed().notRequired(),
});

const BookManagement = () => {
  const [open, setOpen] = useState(false);
  const [books, setBooks] = useState<BookDto[]>([]);
  const [selectedBook, setSelectedBook] = useState<BookDto | undefined>();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    selectedBook && setSelectedBook(undefined);
    setOpen(false);
  };

  const onClose = (_: Event, r: string) => {
    if ((r = 'backdropClick')) return;
    handleClose();
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteBook(id);
      setBooks((prev) => prev.filter((book) => book.id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = (await getMyBooks()) as any;
        setBooks(response as BookDto[]);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  const handleEdit = (book: BookDto) => {
    setSelectedBook(book);
    handleOpen();
  };

  function BookModal({ book }: { book?: BookDto }) {
    const [isLoading, setIsLoading] = useState(false);
    const [previewPdf, setPreviewPdf] = useState(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm({
      resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data: CreateBookDto) => {
      setIsLoading(true);
      try {
        console.log('data', book);
        if (book) {
          const resp = await updateBook({ bookId: book.id, payload: data });
          const updatedBooks = books.map((b) =>
            b.id === book.id ? { ...b, ...resp } : b
          );
          setBooks(updatedBooks);
          setIsLoading(false);
          handleClose();
          return;
        } else {
          const newBook = (await addBook(data)) as any;
          setBooks((prev) => [...prev, newBook]);
        }

        setIsLoading(false);
        handleClose();
      } catch (error) {
        console.error('Error submitting form:', error);
        setIsLoading(false);
      }
    };

    useEffect(() => {
      if (book) {
        setValue('title', book.title);
        setValue('author', book.author);
        setValue('genre', book.genre);
        setValue('price', book.price);
        setValue('description', book.description);
        setPreviewImage(book.book_cover);
      }
    }, [book, setValue]);

    const handleFileChange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        setPreviewImage(URL.createObjectURL(file));
        setValue('book_cover', file);
      }
    };

    const handlePdfChange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        setPreviewPdf(file.name);
        setValue('bookPdf', file);
      }
    };

    return (
      <>
        <Modal
          open={open}
          onClose={onClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
          slots={{ backdrop: 'div' }}
          slotProps={{
            root: () => ({
              className:
                'fixed flex z-[1300] items-center inset-0 justify-center',
            }),
            backdrop: () => ({
              className: '-z-1 fixed inset-0 bg-gray-500/20',
            }),
          }}
        >
          {isLoading ? (
            <div className="flex h-96 items-center justify-center">
              <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-primary">
                Loading ...
              </div>
            </div>
          ) : (
            <div className="top-10 z-10 max-h-[90vh] overflow-y-auto rounded-lg bg-white p-6 py-10">
              <h2 id="add-book-title" className="text-xl font-semibold">
                Add New Book
              </h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div id="add-book-form" className="space-y-12">
                  <div className="">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="title"
                          className="text-md block font-medium leading-6 text-gray-900"
                        >
                          Title
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            id="title"
                            {...register('title')}
                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.title && (
                            <p className="mt-1 text-red-500">
                              {errors.title.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="author"
                          className="text-md block font-medium leading-6 text-gray-900"
                        >
                          Author
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            id="author-name"
                            {...register('author')}
                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.author && (
                            <p className="mt-1 text-red-500">
                              {errors.author.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Genre
                        </label>
                        <div className="mt-2">
                          <select
                            id="genre"
                            {...register('genre')}
                            autoComplete="country-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          >
                            {Genres.slice(1).map((item, index: number) => (
                              <option key={index} value={item.value}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        {errors.genre && (
                          <p className="mt-1 text-red-500">
                            {errors.genre.message}
                          </p>
                        )}
                      </div>

                      <div className="sr-only">
                        <label
                          htmlFor="price"
                          className="text-md block font-medium leading-6 text-gray-900"
                        >
                          Price
                        </label>
                        <div className="mt-2">
                          <input
                            type="number"
                            id="price"
                            value="0"
                            {...register('price')}
                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.price && (
                            <p className="mt-1 text-red-500">
                              {errors.price.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label
                          htmlFor="description"
                          className="text-md block font-medium leading-6 text-gray-900"
                        >
                          Description
                        </label>
                        <div className="mt-2">
                          <textarea
                            id="description"
                            rows={3}
                            {...register('description')}
                            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            defaultValue={''}
                          />
                          {errors.description && (
                            <p className="mt-1 text-red-500">
                              {errors.description.message}
                            </p>
                          )}
                        </div>
                        <p className="mt-3 text-sm leading-6 text-gray-600">
                          Write a few sentences about the book.
                        </p>
                      </div>

                      <div className="col-span-full">
                        <label
                          htmlFor="cover-photo"
                          className="text-md block font-medium leading-6 text-gray-900"
                        >
                          Cover photo{' '}
                          <p className="mt-1 inline-flex text-xs text-gray-600">
                            (PNG, JPG, GIF up to 10MB)
                          </p>
                        </label>
                        <div className="mt-2">
                          {previewImage && (
                            <img
                              src={previewImage}
                              alt="Cover Preview"
                              className="mx-auto h-40 rounded-lg"
                            />
                          )}
                          <div className="mt-2 flex items-center justify-center">
                            <label
                              htmlFor="file-upload"
                              className="cursor-pointer rounded-md border border-indigo-600 bg-white px-4 py-2 font-semibold text-indigo-600 hover:bg-indigo-600 hover:text-white"
                            >
                              {previewImage
                                ? 'Change Cover Photo'
                                : 'Upload Cover Photo'}
                            </label>
                            <input
                              id="file-upload"
                              name="coverPhoto"
                              type="file"
                              onChange={handleFileChange}
                              className="sr-only"
                            />
                          </div>
                          {errors.book_cover && (
                            <p className="mt-1 text-red-500">
                              {errors.book_cover.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-span-full">
                        <label
                          htmlFor="book_file"
                          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Upload Book PDF{' '}
                          <div
                            className="mt-1 inline-flex text-sm text-gray-500 dark:text-gray-300"
                            id="user_avatar_help"
                          >
                            (PDF format only, up to 10MB)
                          </div>
                        </label>
                        <div className="mt-2 flex items-center justify-start">
                          <label
                            htmlFor="book-file-upload"
                            className="cursor-pointer rounded-md border border-indigo-600 bg-white px-4 py-2 font-semibold text-indigo-600 hover:bg-indigo-600 hover:text-white"
                          >
                            {previewPdf
                              ? 'Change Book File'
                              : 'Upload Book File'}
                          </label>
                          <input
                            id="book-file-upload"
                            name="coverPhoto"
                            type="file"
                            onChange={handlePdfChange}
                            className="sr-only"
                          />
                          {previewPdf && (
                            <p className="ml-4 mt-2 text-xl text-gray-600">
                              {previewPdf}
                            </p>
                          )}
                        </div>
                        {errors.bookPdf && (
                          <p className="mt-1 text-red-500">
                            {errors.bookPdf.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-5">
                    <Button variant="outlined" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="solid">
                      Save
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </Modal>
      </>
    );
  }

  return (
    <>
      <BookModal book={selectedBook} />

      <div className="space-y-6 border-b border-gray-200 bg-white px-4 pb-5 sm:px-6">
        <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div className="ml-4 mt-2">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Books
            </h3>
          </div>
          <div className="ml-4 mt-2 flex-shrink-0">
            <Button onClick={handleOpen} variant="solid" className="">
              Add New Book
            </Button>
          </div>
        </div>
        {!(books.length === 0) ? (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
              <thead className="bg-primary/10 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4 pl-6">
                    Cover
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Author
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Genre
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Likes
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Reviews
                  </th>
                  <th scope="col" className="px-6 py-3">
                    View
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {books.map((book: BookDto) => (
                  <tr
                    key={book.id}
                    className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                  >
                    <td className="py-5 pl-6 pr-3 text-sm">
                      <div className="h-11 w-11 flex-shrink-0">
                        <img
                          className="h-11 w-11 rounded-full"
                          src={book.book_cover}
                          alt=""
                        />
                      </div>
                    </td>
                    <th
                      scope="row"
                      className="whitespace-nowrap py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {book.title}
                    </th>
                    <td className="px-6 py-4">{book.author}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs font-semibold leading-5 text-indigo-800 bg-indigo-100 rounded-full">
                        {book.genre}
                      </span>
                    </td>
                    <td className="px-6 py-4">{book.liked_count}</td>
                    <td className="px-6 py-4">{book.reviews_count}</td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/books/${book.id}#comments`}
                        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                      >
                        View
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          handleEdit(book);
                        }}
                        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          handleDelete(book.id);
                        }}
                        className="ms-3 font-medium text-red-600 hover:underline dark:text-red-500"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex h-96 items-center justify-center">
            <p className="text-gray-400">You have not added any books yet.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default BookManagement;
