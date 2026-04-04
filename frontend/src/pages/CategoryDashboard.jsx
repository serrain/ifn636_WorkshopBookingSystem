import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';

const CategoryDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({ category_name: '', description: '' });

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('/api/categories');
      setCategories(res.data);
    } catch (err) {
      alert('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axiosInstance.put(`/api/categories/${editingId}`, formData);
      } else {
        await axiosInstance.post('/api/categories', formData);
      }
      setShowModal(false);
      setFormData({ category_name: '', description: '' });
      setEditingId(null);
      fetchCategories();
    } catch (err) {
      console.error("DEBUG ERROR:", err.response);

      const message = err.response?.data?.message
        || err.response?.data
        || err.message;

      alert('Operation failed: ' + message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this category?')) {
      try {
        await axiosInstance.delete(`/api/categories/${id}`);
        fetchCategories();
      } catch (err) {
        alert('Delete failed');
      }
    }
  };

  const openEditModal = (cat) => {
    setEditingId(cat._id);
    setFormData({ category_name: cat.category_name, description: cat.description });
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">Workshop Categories</h1>
            <p className="text-sm text-gray-500">Real-time database integration</p>
          </div>
          <button
            onClick={() => { setShowModal(true); setEditingId(null); setFormData({ category_name: '', description: '' }); }}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-700 shadow-md active:scale-95 transition-all"
          >
            + Add Category
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Category Name</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Description</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {categories.map((cat) => (
                <tr key={cat._id} className="hover:bg-gray-50/80">
                  <td className="px-6 py-4 font-semibold text-gray-800">{cat.category_name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{cat.description || 'No description'}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => openEditModal(cat)} className="text-blue-600 font-bold text-xs px-3 hover:underline">Edit</button>
                    <button onClick={() => handleDelete(cat._id)} className="text-red-600 font-bold text-xs px-3 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {loading && <div className="p-10 text-center text-gray-400">Syncing with MongoDB...</div>}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl">
            <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Category' : 'New Category'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Name</label>
                <input
                  required
                  value={formData.category_name}
                  onChange={(e) => setFormData({ ...formData, category_name: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="flex space-x-3 pt-2">
                <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">Save</button>
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-lg font-bold">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDashboard;