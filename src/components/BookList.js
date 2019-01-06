import React from 'react'

const BookList = (props) => {
  const { loading, booksData, removeBook, editBook } = props

  if (loading) {
    return (
      <React.Fragment>
        Loading...
      </React.Fragment>
    )
  }

  if (booksData.length === 0) {
    return (
      <React.Fragment>
        No books listed
      </React.Fragment>
    )
  }

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
        {booksData.map(book => {
          // console.log(book.data().id)
          // Pelkät () sulkeet -> ei tarvitse returnia erikseen -- ts. {} pois book => {...} --> book => ()
          return (
            <tr key={book.id}>
              <td className="tableText">{book.data().title}</td>
              <td className="tableText">{book.data().author}</td>
              <td className="tableNumber">{book.data().published}</td>
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