import db from './config'
import { booksPath } from '../constants/paths'

const getAll = db.collection(booksPath).get().then((snapshot) => {
  let stateArray = []

  snapshot.forEach((document) => {

    const docId = document.id
    const docData = document.data()
    const pushableObject = {
      id: docId,
      title: docData.title,
      author: docData.author,
      published: docData.published
    }
    stateArray.push(pushableObject)
  })
  return stateArray
})

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

export {
  getAll,
  addNew,
  deleteItem
}