import { booksByGenre } from "./Api";

export function GetBookByID(bookID) {
  for (const books of Object.values(booksByGenre)) {
    const book = books.find(book => book.bookID == bookID);
    if (book) {
      return book;
    }
  }
  return null;
}