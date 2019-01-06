import React, { useState, useEffect } from 'react';
import BookList from './components/BookList'
import { AddBooksForm, EditBooksForm } from './components/BookForm'

import { addNew, deleteItem, updateItem } from './firebase/functions'
import db from './firebase/config'

const App = () => {

  // Listing initial data
  // Now using firebase w/ effects
  useEffect(() => {
    setLoadingState(true)
    return db.collection('books').onSnapshot(snapshot => {
      setBooks(snapshot.docs)
      setLoadingState(false)
    })
  }, [])

  // Duplicate (BookForm.js already has this, consider importing)
  const initialEditFormState = {
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
    const id = updatedBook.id

    // Updating now in firebase
    updateItem(id, updatedBook)
  }

  const [loading, setLoadingState] = useState(true)
  const [booksList, setBooks] = useState([])
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
            loading={loading}
            booksData={booksList}
            removeBook={removeBook}
            editBook={editSelectedBookFields}
          />
        </div>
      </div>
    </div>
  )
}


export default App;
