import React, { useState, useEffect } from 'react';
import BookList from './components/BookList'
import { AddBooksForm, EditBooksForm } from './components/BookForm'

import { getAll, addNew, deleteItem } from './firebase/functions'

const App = () => {

  // Listing initial data
  // Now using firebase w/ effects
  const initialBooksData = []

  const fetchData = async () => {
    const firebaseBooks = await getAll
    setBooks(firebaseBooks)
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Duplicate (BookForm.js already has this, consider importing)
  const initialEditFormState = {
    id: null,
    title: '',
    author: '',
    published: ''
  }

  const addBook = (book) => {
    // Add to firebase
    addNew(book)
  }

  // Removing existing book by filtering out id
  const removeBook = (id) => {
    setEditMode(false) // Avoid situation when deleting a book being edited
    // Perform delete on firebase 
    deleteItem(id)
  }

  // Set fields to editMode selected book
  const editSelectedBookFields = (book) => {
    setEditMode(true)
    setCurrentBook({
      id: book.id, title: book.title, author: book.author, published: book.published
    })
  }

  // Confirm update, called when user submits updated form
  const updateBookOnClick = (updatedBook) => {
    setEditMode(false)

    // Change booksList so on matching book id it updates that single book
    // This option doesnt mess with ordering
    // Alternatively this could be done with filter + order by id
    setBooks(booksList.map(book => book.id === updatedBook.id ? updatedBook : book))
  }

  const [booksList, setBooks] = useState(initialBooksData)
  const [editMode, setEditMode] = useState(false)
  const [currentBook, setCurrentBook] = useState(initialEditFormState)


  const selectedBooksForm = editMode ?
    <EditBooksForm
      setEditMode={setEditMode}
      currentBook={currentBook}
      updateBookOnClick={updateBookOnClick}
    />
    :
    <AddBooksForm
      addBook={addBook}
    />

  return (
    <div className="container">
      <h1 className="title">Listing books with React Hooks</h1>
      <div className="flex-row">
        <div className="flex-column">
          <h3 className="subTitle">Form for a book</h3>
          {selectedBooksForm}
        </div>
        <div className="flex-column">
          <h3 className="subTitle">Listed books</h3>
          <BookList
            books={booksList}
            removeBook={removeBook}
            editBook={editSelectedBookFields}
          />
        </div>
      </div>
    </div>
  )
}


export default App;
