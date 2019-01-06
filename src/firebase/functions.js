import db from './config'
import { booksPath } from '../constants/paths'

const addNew = async (newBook) => {
  await db.collection(booksPath).add({
    author: newBook.author,
    published: newBook.published,
    title: newBook.title
  })
}

const deleteItem = async (id) => {
  await db.collection(booksPath).doc(id).delete()
}

const updateItem = async (id, book) => {
  await db.collection(booksPath).doc(id).update({ ...book })
}

export {
  addNew,
  deleteItem,
  updateItem
}