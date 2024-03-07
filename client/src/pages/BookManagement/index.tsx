import { Button } from 'components/ui';
import books from 'data/bookList';
import { Book } from 'pages/BookDetails';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal } from '@mui/base/Modal';
import { useState } from 'react';

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  authorName: yup.string().required('Author name is required'),
  coverPhoto: yup.mixed().required('Cover photo is required'),
  bookPdf: yup.mixed().required('Book PDF is required'),
});

const BookManagement = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const onClose = (_: Event, r: string) => {
    if ((r = 'backdropClick')) return;
    handleClose();
  };

  const onSubmit = () => {
    console.log('data');
    handleClose();
  };

  function AddBookModal() {
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

    const onSubmit = async (data: any) => {
      setIsLoading(true);
      try {
        console.log('data', data);

        setIsLoading(false);
        handleClose(); // Close the modal after successful submission
      } catch (error) {
        console.error('Error submitting form:', error);
        setIsLoading(false);
      }
    };

    const handleFileChange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        setPreviewImage(URL.createObjectURL(file));
        setValue('coverPhoto', file);

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
                          {...register('authorName')}
                          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.authorName && (
                          <p className="mt-1 text-red-500">
                            {errors.authorName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="about"
                        className="text-md block font-medium leading-6 text-gray-900"
                      >
                        Description
                      </label>
                      <div className="mt-2">
                        <textarea
                          id="about"
                          name="about"
                          rows={3}
                          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          defaultValue={''}
                        />
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
                        {errors.coverPhoto && (
                          <p className="mt-1 text-red-500">
                            {errors.coverPhoto.message}
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
                          <p className="mt-2 text-xl ml-4 text-gray-600">
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
        </Modal>
      </>
    );
  }

  return (
    <>
      <AddBookModal />
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
                  Likes
                </th>
                <th scope="col" className="px-6 py-3">
                  Reviews
                </th>
                <th scope="col" className="px-6 py-3">
                  Comments
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {books.map((book: Book) => (
                <tr
                  key={book.id}
                  className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                >
                  <td className="py-5 pl-6 pr-3 text-sm">
                    <div className="h-11 w-11 flex-shrink-0">
                      <img
                        className="h-11 w-11 rounded-full"
                        src={book.cover}
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
                  <td className="px-6 py-4">{book.like}</td>
                  <td className="px-6 py-4">{book.rate}</td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/books/${book.id}#comments`}
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                      View Comments
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                      Edit
                    </a>
                    <a
                      href="#"
                      className="ms-3 font-medium text-red-600 hover:underline dark:text-red-500"
                    >
                      Remove
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default BookManagement;
