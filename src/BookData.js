import { booksByGenre } from "./Api";

export function GetBookByID(bookID) {
  for (const [genre, books] of Object.entries(booksByGenre)) {
    for (const book of books) {
      if (book.id === bookID) {
        return book;
      }
    }
  }
  return null;
}
