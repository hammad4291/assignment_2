import Dexie from 'dexie'

const db = new Dexie('BooksDB')

db.version(1).stores({
  books: '++id, name, price, cover, categoryId',
  bookcategories: '++id, name'
})

async function initCategories(seed = []) {
  const count = await db.bookcategories.count()
  if (count === 0 && seed.length) {
    await db.bookcategories.bulkAdd(seed.map((n) => ({ name: n })))
  }
}

function getCategories() {
  return db.bookcategories.toArray()
}

async function getBooksWithCategory() {
  const books = await db.books.toArray()
  const categories = await db.bookcategories.toArray()
  const catMap = new Map(categories.map((c) => [c.id, c.name]))
  return books.map((b) => ({ ...b, categoryName: catMap.get(b.categoryId) || '' }))
}

function addBook(book) {
  // book: { name, price, cover, categoryId }
  return db.books.add(book)
}

function updateBook(id, changes) {
  return db.books.update(id, changes)
}

function deleteBook(id) {
  return db.books.delete(id)
}

export default db
export { initCategories, getCategories, getBooksWithCategory, addBook, updateBook, deleteBook }
