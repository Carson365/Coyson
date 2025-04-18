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

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const fetchAllGenres = async () => {
  for (const genre of allGenres) {
    await fetchBooksByGenre(genre, 64);
    await delay(200);
  }
  console.log(booksByGenre);
};

const cleanBookData = (book, genre) => {
  const matchedGenre = book.categories?.find(cat => allGenres.includes(cat)) || genre;
  const genreData = genreIDs.find(g => g.genre === matchedGenre) || {};

  return {
    id: crypto.randomUUID(),
    genreid: genreData.id ?? null,
    title: book?.title ?? "Unavailable",
    subtitle: book?.subtitle ?? "Unavailable",
    authors: Array.isArray(book?.authors) ? book.authors : [],
    publisher: book?.publisher ?? "Unavailable",
    description: book?.description ?? "Unavailable",
    pageCount: book?.pageCount ?? "Unavailable",
    categories: matchedGenre ?? "Unavailable",
    rating: book?.averageRating ?? "Unavailable",
    maturityRating: book?.maturityRating ?? "Unavailable",
    image: book?.imageLinks?.thumbnail ?? null
  };
};

const isDuplicateBook = (book, genre) => {
  return booksByGenre[genre]?.some(existingBook => existingBook.title === book.title) ?? false;
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
        const info = item.volumeInfo;
        if (!info) return;

        const cleanedBook = cleanBookData(info, genre);

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

  return booksByGenre[genre];
};
