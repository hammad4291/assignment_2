import React, { useEffect, useState } from 'react'
import './App.css'
import BookForm from './components/BookForm'
import BookList from './components/BookList'
import db, { initCategories, getCategories, getBooksWithCategory, addBook, updateBook, deleteBook } from './db'

const DEFAULT_CATEGORIES = ['Fiction', 'Non-Fiction', 'Sci-Fi', 'Romance', 'Programming']

function App() {
  const [categories, setCategories] = useState([])
  const [books, setBooks] = useState([])
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    // initialize categories (only if empty)
    initCategories(DEFAULT_CATEGORIES).then(loadAll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function loadAll() {
    const cats = await getCategories()
    setCategories(cats)
    const bs = await getBooksWithCategory()
    setBooks(bs)
  }

  async function handleAdd(payload) {
    await addBook(payload)
    setShowForm(false)
    setEditing(null)
    await loadAll()
  }

  async function handleUpdate(payload) {
    if (!editing) return
    await updateBook(editing.id, payload)
    setEditing(null)
    setShowForm(false)
    await loadAll()
  }

  async function handleDelete(id) {
    if (!confirm('Delete this book?')) return
    await deleteBook(id)
    await loadAll()
  }

  function onEdit(book) {
    setEditing(book)
    setShowForm(true)
  }

  function onAddClick() {
    setEditing(null)
    setShowForm(true)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Book Manager (IndexedDB)</h1>
      </header>

      <main className="app-main">
        <div className="controls">
          <button onClick={onAddClick}>Add New Book</button>
        </div>

        {showForm && (
          <div className="form-wrap">
            <BookForm
              categories={categories}
              initialData={editing}
              onCancel={() => { setShowForm(false); setEditing(null) }}
              onSave={async (payload) => {
                if (editing) {
                  await handleUpdate(payload)
                } else {
                  await handleAdd(payload)
                }
              }}
            />
          </div>
        )}

        <section className="list-wrap">
          <BookList books={books} onEdit={onEdit} onDelete={handleDelete} />
        </section>
      </main>
    </div>
  )
}

export default App
