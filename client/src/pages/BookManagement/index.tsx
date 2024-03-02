import { Button } from 'components/ui';

const BookManagement = () => {
  return (
    <div className="border-b border-gray-200 bg-white px-4 pb-5 sm:px-6">
      <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="ml-4 mt-2">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Books
          </h3>
        </div>
        <div className="ml-4 mt-2 flex-shrink-0">
          <Button variant="solid" className="">
            Add New Book
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookManagement;
