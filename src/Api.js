export let booksByGenre = {};

const cleanBookData = (book, category) => {
  return {
    title: book?.title || "Unavailable",
    subtitle: book?.subtitle || "Unavailable",
    authors: Array.isArray(book?.authors) ? book.authors : [],
    publisher: book?.publisher || "Unavailable",
    description: book?.description || "Unavailable",
    pageCount: book?.pageCount || "Unavailable",
    categories: category || "Unavailable", 
    rating: book?.averageRating || "Unavailable",
    maturityRating: book?.maturityRating || "Unavailable",
    image: book?.imageLinks?.thumbnail || "Unavailable",
  };
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
        booksByGenre[genre].push(cleanedBook);
        booksFetched++;
      });

      startIndex += currentBatchSize;
    } catch (error) {
      console.error(`Error fetching books for genre "${genre}":`, error);
      break;
    }
  }

  return booksByGenre;
};