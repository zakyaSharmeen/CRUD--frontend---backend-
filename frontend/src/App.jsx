import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/items";

function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", price: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await axios.get(API_URL);
    setItems(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await axios.post(API_URL, form);
    setForm({ name: "", price: "" });
    fetchItems();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put(`${API_URL}/${editingId}`, form);
    setForm({ name: "", price: "" });
    setEditingId(null);
    fetchItems();
  };

  const handleEdit = (item) => {
    setForm({ name: item.name, price: item.price });
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchItems();
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", textAlign: "center" }}>
      <h2>CRUD App</h2>
      <form onSubmit={editingId ? handleUpdate : handleAdd}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
        <button type="submit">{editingId ? "Update" : "Add"} Item</button>
      </form>
      
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.name} - ${item.price}
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
