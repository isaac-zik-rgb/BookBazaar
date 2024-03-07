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
}

export const NavMenu = [
  {
    title: 'Explore',
    url: PAGES_URL.HOME,
  },
  {
    title: 'Whishlist',
    url: PAGES_URL.WISHLIST,
  },
  {
    title: 'About',
    url: PAGES_URL.ABOUT,
  },
];

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
