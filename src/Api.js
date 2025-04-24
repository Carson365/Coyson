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
export function getGenreById(id) {
  const match = genreIDs.find(g => g.id === id);
  return match ? match.genre : null;
}

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

export const AuthenticateUser = async ({ token, name, email, profileImg }) => {
  try {
    const response = await fetch("http://localhost:5000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token, name, email, profileImg })
    });

    if (!response.ok) {
      throw new Error("User authentication failed.");
    }

    const user = await response.json();
    return {
      id: user.id,
      token: user.token,
      name: user.name,
      email: user.email,
      profileImg: user.profileImg,
      role: user.role,
      points: user.points,
      dateCreated: user.created,
    };
  } catch (error) {
    console.error("Error authenticating user:", error);
    return false;
  }
};

export const FetchCart = async (userId) => {
  try {
    const response = await fetch(`http://localhost:5000/api/cart/fetchcart?userId=${userId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch cart");
    }

    const data = await response.json();

    // Don't flatten or remap – just return the backend structure
    return data.cartItems ?? [];
  } catch (error) {
    console.error("Cart fetch error:", error);
    return [];
  }
};





export const AddToCart = async (userId, bookId, price) => {
  try {
    const response = await fetch(`http://localhost:5000/api/cart/addtocart?userId=${userId}&bookId=${bookId}&price=${price}`, {
      method: "POST"
    });

    if (!response.ok) throw new Error("Add to cart failed.");

    const updatedCart = await FetchCart(userId); // Pull updated cart
    return updatedCart;
  } catch (error) {
    console.error("Error adding to cart:", error);
    return null;
  }
};

// Take the price, if the user applied their points, and add the transaction to the database. Then reset their points if used and reset their active cart.
// Api.js
export const CompleteTransaction = async (userId, applyPoints) => {
  try {
    const response = await fetch("http://localhost:5000/api/cart/complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId, applyPoints })
    });

    if (!response.ok) throw new Error("Checkout failed.");

    return await response.json();
  } catch (error) {
    console.error("Error completing transaction:", error);
    return false;
  }
};




export const Checkout = async (userId, usePoints) => {
  try {
    const response = await fetch(`http://localhost:5000/api/cart/checkout?userId=${userId}&usePoints=${usePoints}`, {
      method: "POST"
    });

    if (!response.ok) throw new Error("Checkout failed.");

    const data = await response.json();

    // Defensive return in case backend doesn't send expected fields
    return {
      newPointTotal: data?.newPointTotal ?? 0,
      pointsUsed: data?.pointsUsed ?? 0,
      pointsEarned: data?.pointsEarned ?? 0
    };
  } catch (error) {
    console.error("Checkout error:", error);
    return null;
  }
};



export const ClearCart = (setUser) => {
  setUser(prev => ({ ...prev, cart: [] }));
};





export const UpdateCartQuantity = async (userId, bookId, quantity) => {
  try {
    const response = await fetch(`http://localhost:5000/api/cart/updatequantity?userId=${userId}&bookId=${bookId}&quantity=${quantity}`, {
      method: "PUT"
    });

    if (!response.ok) throw new Error("Failed to update quantity");
    return true;
  } catch (error) {
    console.error("UpdateCartQuantity error:", error);
    return false;
  }
};





export const RemoveFromCart = async (userId, bookId) => {
  try {
    const response = await fetch(`http://localhost:5000/api/cart/removefromcart?userId=${userId}&bookId=${bookId}`, {
      method: "DELETE"
    });

    if (!response.ok) throw new Error("Failed to remove item");
    return true;
  } catch (error) {
    console.error("RemoveFromCart error:", error);
    return false;
  }
};









// const getRandomPrice = () => {
//   const prices = [19.99, 24.99, 29.99, 34.99, 39.99];
//   const randomIndex = Math.floor(Math.random() * prices.length);
//   return prices[randomIndex];
// };

// const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// export const fetchAllGenres = async () => {
//   for (const genre of allGenres) {
//     await fetchBooksByGenre(genre, 64);
//     await delay(200);
//   }
//   console.log(booksByGenre);
// };

// const cleanBookData = (book, matchedGenres) => {
//   const genreid = genreIDs.find(g => g.genre === matchedGenres[0])?.id ?? null;
//   // count++;

//   return {
//     genreid: typeof genreid === "number" ? genreid : null,
//     title: book?.title ?? "Unavailable",
//     subtitle: book?.subtitle ?? null,
//     authors: Array.isArray(book?.authors) 
//       ? (book.authors[0] ?? "Unavailable") 
//       : (book?.authors ?? "Unavailable"),
//     publisher: book?.publisher ?? null,
//     description: book?.description ?? null,
//     pageCount: typeof book?.pageCount === "number" ? book.pageCount : null,
//     categories: Array.isArray(matchedGenres) 
//       ? (matchedGenres[0] ?? null) 
//       : (matchedGenres ?? null),
//     rating: typeof book?.averageRating === "number" ? book.averageRating : null,
//     maturityRating: book?.maturityRating ?? null,
//     image: book?.imageLinks?.thumbnail ?? null,
//     price: getRandomPrice()
//   }  
// };


// const isDuplicateBook = (book, genre) => {
//   return booksByGenre[genre]?.some(existingBook => existingBook.title === book.title) ?? false;
// };


// export const fetchBooksByGenre = async (genre, batchSize) => {
//   let booksFetched = 0;
//   let startIndex = 0;

  
//   while (booksFetched < batchSize) {
//     const remainingBooks = batchSize - booksFetched;
//     const currentBatchSize = Math.min(remainingBooks, 40);

//     try {
//       const response = await fetch(
//         `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&maxResults=${currentBatchSize}&startIndex=${startIndex}`
//       );

//       const data = await response.json();

//       if (!data.items || data.items.length === 0) break;

//       for (const item of data.items) {
//         const info = item.volumeInfo;
//         if (!info || !info.imageLinks?.thumbnail) continue;

//         const forcedGenre = [genre];
//         const cleanedBook = cleanBookData(info, forcedGenre);

//         if (!booksByGenre[genre]) {
//           booksByGenre[genre] = [];
//         }

//         if (!isDuplicateBook(cleanedBook, genre)) {
//           booksByGenre[genre].push(cleanedBook);
//           AddBookToDB(cleanedBook);
//           booksFetched++;
//         }

//         if (booksFetched >= batchSize) break; 
//       }

//       startIndex += currentBatchSize;
//     } catch (error) {
//       console.error(`Error fetching books for genre "${genre}":`, error);
//       break;
//     }
//   }
//   await delay(500);
//   console.log(booksByGenre)
  
//   return booksByGenre;
// };
