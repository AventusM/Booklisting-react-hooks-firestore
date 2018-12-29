import React from 'react'

const BookList = (props) => {
  const { books, removeBook, editBook } = props

  if (books.length === 0) {
    return (
      <React.Fragment>
        No books listed!
      </React.Fragment>
    )
  }

  // console.log(books)
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Published</th>
        </tr>
      </thead>
      <tbody>
        {books.map(book => {
          // Pelkät () sulkeet -> ei tarvitse returnia erikseen -- ts. {} pois book => {...} --> book => ()
          return (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td className="tableAuthor">{book.author}</td>
              <td className="tableNumber">{book.published}</td>
              <td>
                <div className="button-container">
                  <button className="edit-book-button" onClick={() => editBook(book)}>Edit</button>
                  <button className="remove-book-button" onClick={() => removeBook(book.id)}>Delete</button>
                </div>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default BookList