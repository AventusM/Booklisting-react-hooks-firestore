import React, { useState, useEffect } from 'react'


const EditBooksForm = (props) => {
  const { setEditMode, currentBook, updateBookOnClick } = props

  // Editing fields of current book
  const [book, setBook] = useState(currentBook)
  // Listening to props changes in case one wants to edit another book without cancelling current editing
  useEffect(() => { setBook(currentBook) }, [props])

  // Method to handle input change
  const handleInput = (event) => {
    setBook({
      ...book,
      // Change properties of 1 parameter at a time for book
      [event.target.name]: event.target.value
    })
  }

  const submitChanges = (event) => {
    event.preventDefault()
    updateBookOnClick(book)
  }

  const resetEditMode = () => {
    setEditMode(false)
  }

  return (
    <form onSubmit={submitChanges}>
      <label>Title</label>
      <input type="text" name="title" value={book.title} onChange={handleInput} />
      <label>Author</label>
      <input type="text" name="author" value={book.author} onChange={handleInput} />
      <label>Year published</label>
      {/* https://stackoverflow.com/questions/8808590/html5-number-input-type-that-takes-only-integers */}
      <input type="number" name="published" value={book.published} min="1" step="1" onChange={handleInput} />
      <div className="button-container">
        <button className="form-Button">Edit book</button>
        <button className="form-Button form-cancel-Button" onClick={resetEditMode}>Cancel</button>
      </div >
    </form >
  )
}

const AddBooksForm = (props) => {
  // Destructure props
  const { addBook } = props

  // Create initial state for form (+reset)
  // Id gets attached to new book from parent container
  const initialFormState = {
    title: '',
    author: '',
    published: ''
  }

  // Add a hook to the book
  const [book, setBook] = useState(initialFormState)

  // Method to handle input change
  const handleInput = (event) => {
    setBook({
      ...book,
      // Change properties of 1 parameter at a time for book
      [event.target.name]: event.target.value
    })
  }

  const submitNewBook = (event) => {
    event.preventDefault()
    const anyEmptyConditions =
      !book.title ||
      !book.author ||
      !book.published

    if (anyEmptyConditions) return
    addBook(book) // Attach id to book and add to existing books in parent component
    setBook(initialFormState) // use setBook method to reset state whole at once, nice!
  }

  return (
    <form onSubmit={submitNewBook}>
      <label>Title</label>
      <input type="text" name="title" value={book.title} onChange={handleInput} />
      <label>Author</label>
      <input type="text" name="author" value={book.author} onChange={handleInput} />
      <label>Year published</label>
      {/* https://stackoverflow.com/questions/8808590/html5-number-input-type-that-takes-only-integers */}
      <input type="number" name="published" value={book.published} min="1" step="1" onChange={handleInput} />
      <button className="form-Button">Add a book!</button>
    </form >
  )
}

export {
  AddBooksForm,
  EditBooksForm
}