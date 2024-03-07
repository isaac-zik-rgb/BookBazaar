import allTheLightWeCannotSee from 'assets/images/allTheLightWeCannotSee.png';
import harryPotterAndTheSorcerersStone from 'assets/images/harryPotterAndTheSorcerersStone.png';
import theCatchersInTheRye from 'assets/images/theCatchersInTheRye.png';
import prideAndPrejudice from 'assets/images/prideAndPrejudice.png';
import theGreatGatsby from 'assets/images/theGreatGatsby.png';
import toKillAMockingbird from 'assets/images/toKillAMockingbird.png';
import lordOfTheRingsTheFellowshipOfTheRing from 'assets/images/lordOfTheRingsTheFellowshipOfTheRing.png';
import theHitchhikersGuideToTheGalaxy from 'assets/images/theHitchhikersGuideToTheGalaxy.png';
import fiftyShadesOfGrey from 'assets/images/fiftyShadesOfGrey.png';
import crimeAndPunishment from 'assets/images/crimeAndPunishment.png';

export const books = [
  {
    id: '1',
    cover: allTheLightWeCannotSee,
    title: 'All the Light We Cannot See',
    author: 'Anthony Doerr',
    rate: 4.5,
    like: 157,
    categories: ['Fiction', 'Historical'],
    description:
      'Est nisi deserunt aliqua id elit exercitation labore eu occaecat. Aliquip fugiat esse et deserunt magna elit excepteur culpa iirure quis nostrud fugiat ea aliqua exercitation. Ullamco dolore eu excepteur deserunt mollit .',
  },
  {
    id: '2',
    cover: harryPotterAndTheSorcerersStone,
    title: "Harry Potter and the Sorcerer's Stone",
    author: 'J.K. Rowling',
    rate: 4.7,
    like: 205,
    categories: ['Fantasy', 'Young Adult'],
    description:
      'Join Harry Potter, a young wizard, as he begins his magical journey at Hogwarts School of Witchcraft and Wizardry.',
  },
  {
    id: '3',
    cover: theCatchersInTheRye,
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    rate: 4.4,
    like: 189,
    categories: ['Fiction', 'Coming-of-Age'],
    description:
      'Follow the story of Holden Caulfield, a teenager struggling with adolescence and the phoniness of the adult world.',
  },
  {
    id: '4',
    cover: prideAndPrejudice,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    rate: 4.6,
    like: 173,
    categories: ['Fiction', 'Romance'],
    description:
      'Experience the tumultuous romance between Elizabeth Bennet and Mr. Darcy in Regency-era England.',
  },
  {
    id: '5',
    cover: theGreatGatsby,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    rate: 4.8,
    like: 245,
    categories: ['Fiction', 'Classic'],
    description:
      'Enter the glamorous world of Jay Gatsby and the American Dream, set against the backdrop of the Jazz Age.',
  },
  {
    id: '6',
    cover: toKillAMockingbird,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    rate: 4.7,
    like: 189,
    categories: ['Fiction', 'Classic'],
    description:
      'Explore themes of racial injustice and moral growth through the eyes of young Scout Finch in the Deep South.',
  },
  {
    id: '7',
    cover: lordOfTheRingsTheFellowshipOfTheRing,
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    author: 'J.R.R. Tolkien',
    rate: 4.9,
    like: 312,
    categories: ['Fantasy', 'Adventure'],
    description:
      'Embark on a journey with Frodo Baggins and the Fellowship as they set out to destroy the One Ring and save Middle-earth.',
  },
  {
    id: '8',
    cover: theHitchhikersGuideToTheGalaxy,
    title: "The Hitchhiker's Guide to the Galaxy",
    author: 'Douglas Adams',
    rate: 4.5,
    like: 210,
    categories: ['Science Fiction', 'Humor'],
    description:
      'Join Arthur Dent as he travels through space with his alien friend Ford Prefect, armed with only a towel and the titular guidebook.',
  },
  {
    id: '9',
    cover: fiftyShadesOfGrey,
    title: 'Fifty Shades of Grey',
    author: 'E.L. James',
    rate: 3.8,
    like: 120,
    categories: ['Romance', 'Erotica'],
    description:
      'Delve into the passionate and provocative relationship between Anastasia Steele and Christian Grey.',
  },
  {
    id: '10',
    cover: crimeAndPunishment,
    title: 'Crime and Punishment',
    author: 'Fyodor Dostoevsky',
    rate: 4.4,
    like: 195,
    categories: ['Fiction', 'Psychological Thriller'],
    description:
      'Witness the psychological turmoil of Rodion Raskolnikov, a young ex-law student who commits a heinous crime and grapples with its consequences.',
  },
];

export default books;

