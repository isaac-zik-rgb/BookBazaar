// constants.ts
export const colors = {
  primary: '#8AB907',
  secondary: '#207BA7',
  accent: '#e74c3c',
};

export const sizes = {
  dSize: '16px',
  mSize: '18px',
  lSize: '24px',
};

export const spacing = {
  small: '4px',
  medium: '8px',
  large: '16px',
};

export enum PAGES_URL {
  HOME = '/',
  WISHLIST = '/wishlist',
  ABOUT = '/about',
  LOGIN = '/login',
  SIGNUP = '/signup',
  DASHBOARD = '/dashboard',
  BOOKS_MANAGEMENT = `${PAGES_URL.DASHBOARD}/books-management`,
  PROFILE = `${PAGES_URL.DASHBOARD}/profile`,
}

export const NavMenu = [
  {
    title: 'Explore',
    url: PAGES_URL.HOME,
  },
  {
    title: 'Dashboard',
    url: PAGES_URL.BOOKS_MANAGEMENT,
  },
  {
    title: 'Profile',
    url: PAGES_URL.PROFILE,
  },
];

export const Genres = [
  { name: 'All', value: '' },
  { name: 'Fiction', value: 'fiction' },
  { name: 'Non-Fiction', value: 'non-fiction' },
  { name: 'Science Fiction', value: 'science-fiction' },
  { name: 'Fantasy', value: 'fantasy' },
  { name: 'Romance', value: 'romance' },
  { name: 'Mystery', value: 'mystery' },
  { name: 'Horror', value: 'horror' },
  { name: 'Others', value: 'others' },
];

export enum ENDPOINT {
  AUTH = "/auth",
  PROFILE = "/profile",
  MY_BOOKS = "/books",
  PUBLIC_BOOKS = "/all-books",
}
