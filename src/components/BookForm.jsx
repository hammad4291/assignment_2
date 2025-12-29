import React, { useState, useEffect } from 'react'

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export default function BookForm({ categories = [], initialData = null, onCancel, onSave }) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [cover, setCover] = useState('')

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '')
      setPrice(initialData.price != null ? String(initialData.price) : '')
      setCategoryId(initialData.categoryId || '')
      setCover(initialData.cover || '')
    } else {
      setName('')
      setPrice('')
      setCategoryId(categories[0]?.id || '')
      setCover('')
    }
  }, [initialData, categories])

//   async function onFileChange(e) {
//     const f = e.target.files && e.target.files[0]
//     if (!f) return
//     try {
//       const b64 = await fileToBase64(f)
//       setCover(b64)
//     } catch (err) {
//       console.error('Failed to read image', err)
//     }
//   }
const onFileChange = (e) => { 
    const file = e.target.files[0]; 
    if (!file) return; 
    const reader = new FileReader(); 
    reader.onload = () => { 
      setCover(reader.result); // Base64 
// image string 
    }; 
    reader.readAsDataURL(file); 
  };

  function submit(e) {
    e.preventDefault()
    if (!name.trim()) return alert('Enter book name')
    if (!price || isNaN(Number(price))) return alert('Enter valid price')
    if (!categoryId) return alert('Select category')

    const payload = {
      name: name.trim(),
      price: Number(price),
      cover: cover || '',
      categoryId: Number(categoryId)
    }

    onSave(payload)
  }

  return (
    <form className="book-form" onSubmit={submit}>
      <label>Book Name
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Book name" />
      </label>

      <label>Price
        <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g. 12.99" />
      </label>

      <label>Category
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          <option value="">-- select category --</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </label>

      <label>Cover Image
        <input type="file" accept="image/*" onChange={onFileChange} />
      </label>

      {cover && (
        <div className="cover-preview">
          <img src={cover} alt="cover" />
        </div>
      )}

      <div className="form-actions">
        <button type="submit">Save</button>
        <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}
