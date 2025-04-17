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

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const fetchAllGenres = async () => {
  for (const genre of allGenres) {
    await fetchBooksByGenre(genre, 64);
    await delay(200);
  }
  console.log(booksByGenre)
};


const cleanBookData = (book, category) => {
  return {
    id: crypto.randomUUID(),
    title: book?.title || "Unavailable",
    subtitle: book?.subtitle || "Unavailable",
    authors: Array.isArray(book?.authors) ? book.authors : [],
    publisher: book?.publisher || "Unavailable",
    description: book?.description || "Unavailable",
    pageCount: book?.pageCount || "Unavailable",
    categories: category || "Unavailable", 
    rating: book?.averageRating || "Unavailable",
    maturityRating: book?.maturityRating || "Unavailable",
    image: book?.imageLinks?.thumbnail || null,
  };
};

const isDuplicateBook = (book, genre) => {
  return booksByGenre[genre].some(existingBook => existingBook.title === book.title);
};

export const fetchBooksByGenre = async (genre, batchSize) => {
  let booksFetched = 0;
  let startIndex = 0;

  if (!booksByGenre[genre]) {
    booksByGenre[genre] = [];
  }

  while (booksFetched < batchSize) {
    const remainingBooks = batchSize - booksFetched;
    const currentBatchSize = Math.min(remainingBooks, 40);

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&maxResults=${currentBatchSize}&startIndex=${startIndex}`
      );

      const data = await response.json();

      if (!data.items || data.items.length === 0) break;

      data.items.forEach(item => {
        if (!item.volumeInfo) return;

        const cleanedBook = cleanBookData(item.volumeInfo, genre);

        if (!isDuplicateBook(cleanedBook, genre) && cleanedBook.image) {
          booksByGenre[genre].push(cleanedBook);
          booksFetched++;
        }
      });

      startIndex += currentBatchSize;
    } catch (error) {
      console.error(`Error fetching books for genre "${genre}":`, error);
      break;
    }
  }

  console.log(`Loaded ${genre}:`);

  return booksByGenre[genre];
};