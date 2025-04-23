import { GetBookByID } from "./BookData";
import { useUser } from './UserContext';

export let booksByGenre = {};

export const allGenres = [
  "Fiction",
  "Mystery",
  "Biography",
  "Fantasy",
  "AutoBiography",
  "Nonfiction",
  "Thriller",
  "Science Fiction",
  "Poetry",
  "Novel"
];

export const genreIDs = [
  { id: 101, genre: "Fiction" },
  { id: 102, genre: "Mystery" },
  { id: 103, genre: "Biography" },
  { id: 104, genre: "Fantasy" },
  { id: 105, genre: "AutoBiography" },
  { id: 106, genre: "Nonfiction" },
  { id: 107, genre: "Thriller" },
  { id: 108, genre: "Science Fiction" },
  { id: 109, genre: "Poetry" },
  { id: 110, genre: "Novel" }
];

export function AddBookToDB(book){
  fetch('http://localhost:5000/api/Book', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      genreID: book.genreid,
      title: book.title,
      subtitle: book.subtitle,
      authors: book.authors,
      publisher: book.publisher,
      description: book.description,
      pageCount: book.pageCount,
      categories: book.categories,
      rating: book.rating,
      maturityRating: book.maturityRating,
      image: book.image,
      price: book.price,
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.text();
  })
  .then(data => {
    console.log("Success:", data);
  })
  .catch(error => {
    console.error("Error:", error);
  });
}

export const GetBookByGenre = async (genreID) => {
  const response = await fetch(`http://localhost:5000/api/book/genre/${genreID}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const books = await response.json();

  if (!booksByGenre[genreID]) {
    booksByGenre[genreID] = [];
  }

  books.forEach(book => {
    booksByGenre[genreID].push(book);
  });
};

export const AuthenticateUser = (token) => {

  const userData = {
    id: token,
    name: "Coy",
    email: "",
    role: "",
    profileImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN-p2XOT4ks6ZjiZuhhZWUMcvGvvb-woRgrw&s",
    books: [],
    points: 370,
  };

  // Fetch user by token, if user found populate userData else leave empty

  if(userData.id == null){
    return false;
  } else {
    return userData;
  }
};

// Create new user in the database
export async function CreateUser(){
  const user = {
      id: "",
      email: "",
      profileImg: "",
      books: [],
      points: 0,
  };
  
  /* Create a new user 
  const response = await fetch("http://localhost:5000/api/customer", {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
  });
  
  if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
  }
  
  const data = await response.json();
  */
}


/*  All Commented Below is for fetching books from Google API

const getRandomPrice = () => {
  const prices = [19.99, 24.99, 29.99, 34.99, 39.99];
  const randomIndex = Math.floor(Math.random() * prices.length);
  return prices[randomIndex];
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const fetchAllGenres = async () => {
  for (const genre of allGenres) {
    await fetchBooksByGenre(genre, 64);
    await delay(200);
  }
  console.log(booksByGenre);
};

const cleanBookData = (book, matchedGenres) => {
  const genreid = genreIDs.find(g => g.genre === matchedGenres[0])?.id ?? null;
  count++;

  return {
    genreid: typeof genreid === "number" ? genreid : null,
    title: book?.title ?? "Unavailable",
    subtitle: book?.subtitle ?? null,
    authors: Array.isArray(book?.authors) 
      ? (book.authors[0] ?? "Unavailable") 
      : (book?.authors ?? "Unavailable"),
    publisher: book?.publisher ?? null,
    description: book?.description ?? null,
    pageCount: typeof book?.pageCount === "number" ? book.pageCount : null,
    categories: Array.isArray(matchedGenres) 
      ? (matchedGenres[0] ?? null) 
      : (matchedGenres ?? null),
    rating: typeof book?.averageRating === "number" ? book.averageRating : null,
    maturityRating: book?.maturityRating ?? null,
    image: book?.imageLinks?.thumbnail ?? null,
    price: getRandomPrice()
  }  
};


const isDuplicateBook = (book, genre) => {
  return booksByGenre[genre]?.some(existingBook => existingBook.title === book.title) ?? false;
};


export const fetchBooksByGenre = async (genre, batchSize) => {
  let booksFetched = 0;
  let startIndex = 0;

  
  while (booksFetched < batchSize) {
    const remainingBooks = batchSize - booksFetched;
    const currentBatchSize = Math.min(remainingBooks, 40);

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&maxResults=${currentBatchSize}&startIndex=${startIndex}`
      );

      const data = await response.json();

      if (!data.items || data.items.length === 0) break;

      for (const item of data.items) {
        const info = item.volumeInfo;
        if (!info || !info.imageLinks?.thumbnail) continue;

        const forcedGenre = [genre];
        const cleanedBook = cleanBookData(info, forcedGenre);

        if (!booksByGenre[genre]) {
          booksByGenre[genre] = [];
        }

        if (!isDuplicateBook(cleanedBook, genre)) {
          booksByGenre[genre].push(cleanedBook);
          booksFetched++;
        }

        if (booksFetched >= batchSize) break; 
      }

      startIndex += currentBatchSize;
    } catch (error) {
      console.error(`Error fetching books for genre "${genre}":`, error);
      break;
    }
  }
  await delay(500);
  console.log(booksByGenre)
  
  return booksByGenre;
};
*/

