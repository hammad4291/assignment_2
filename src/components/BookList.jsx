import React from 'react'

export default function BookList({ books = [], onEdit, onDelete }) {
  if (!books.length) return <div className="empty">No books saved yet.</div>

  return (
    <div className="book-list">
      {books.map((b) => (
        <div className="book-card" key={b.id}>
          <div className="thumb">
            {b.cover ? <img src={b.cover} alt={b.name} /> : <div className="no-cover">No Image</div>}
          </div>
          <div className="meta">
            <div className="title">{b.name}</div>
            <div className="price">${Number(b.price).toFixed(2)}</div>
            <div className="category">{b.categoryName || '—'}</div>
            <div className="actions">
              <button onClick={() => onEdit(b)}>Update</button>
              <button className="btn-delete" onClick={() => onDelete(b.id)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
