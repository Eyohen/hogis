import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Save, Plus, Edit, Trash2, AlertCircle, 
  CheckCircle, Settings as SettingsIcon, 
  Database, Users, Globe, Mail, Bell
} from 'lucide-react';
import { URL } from '../../url';



const Settings = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // Category Management
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    color: '#f59e0b',
    sortOrder: 0
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${URL}/categories?includeInactive=true`);
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      setError('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async () => {
    try {
      setSaving(true);
      await axios.post(`${URL}/categories`, newCategory);
      setSuccess('Category created successfully');
      setNewCategory({ name: '', description: '', color: '#f59e0b', sortOrder: 0 });
      setShowAddCategory(false);
      fetchCategories();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create category');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateCategory = async (category) => {
    try {
      setSaving(true);
      await axios.put(`${URL}/categories/${category.id}`, category);
      setSuccess('Category updated successfully');
      setEditingCategory(null);
      fetchCategories();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update category');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      return;
    }

    try {
      setSaving(true);
      await axios.delete(`${URL}/categories/${categoryId}`);
      setSuccess('Category deleted successfully');
      fetchCategories();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to delete category');
    } finally {
      setSaving(false);
    }
  };

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  const SettingCard = ({ title, description, icon: Icon, children }) => (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mr-4">
            <Icon className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );

  const CategoryForm = ({ category, onSave, onCancel, isNew = false }) => {
    const [formData, setFormData] = useState(category || newCategory);

    const handleSubmit = (e) => {
      e.preventDefault();
      if (isNew) {
        setNewCategory(formData);
        handleCreateCategory();
      } else {
        onSave(formData);
      }
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="e.g. Healing, Salvation"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={formData.color}
                onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={formData.color}
                onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="#f59e0b"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
            placeholder="Brief description of this category..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort Order
          </label>
          <input
            type="number"
            value={formData.sortOrder}
            onChange={(e) => setFormData(prev => ({ ...prev, sortOrder: parseInt(e.target.value) || 0 }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            placeholder="0"
            min="0"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 transition-colors flex items-center"
          >
            {saving ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            {isNew ? 'Create' : 'Update'}
          </button>
        </div>
      </form>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage system settings and configurations</p>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
              <p className="text-red-700">{error}</p>
            </div>
            <button onClick={clearMessages} className="text-red-400 hover:text-red-600">
              ×
            </button>
          </div>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              <p className="text-green-700">{success}</p>
            </div>
            <button onClick={clearMessages} className="text-green-400 hover:text-green-600">
              ×
            </button>
          </div>
        </div>
      )}

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Category Management */}
        <SettingCard
          title="Category Management"
          description="Manage testimony categories and their display order"
          icon={Database}
        >
          <div className="space-y-4">
            {/* Add New Category */}
            {showAddCategory ? (
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Add New Category</h4>
                <CategoryForm
                  isNew={true}
                  onCancel={() => {
                    setShowAddCategory(false);
                    setNewCategory({ name: '', description: '', color: '#f59e0b', sortOrder: 0 });
                  }}
                />
              </div>
            ) : (
              <button
                onClick={() => setShowAddCategory(true)}
                className="flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </button>
            )}

            {/* Existing Categories */}
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category.id} className="border border-gray-200 rounded-lg p-4">
                  {editingCategory?.id === category.id ? (
                    <CategoryForm
                      category={editingCategory}
                      onSave={handleUpdateCategory}
                      onCancel={() => setEditingCategory(null)}
                    />
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <div>
                          <h5 className="text-sm font-medium text-gray-900">{category.name}</h5>
                          <p className="text-sm text-gray-500">{category.description || 'No description'}</p>
                          <p className="text-xs text-gray-400">Sort order: {category.sortOrder}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          category.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {category.isActive ? 'Active' : 'Inactive'}
                        </span>
                        
                        <button
                          onClick={() => setEditingCategory(category)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
                          className="text-red-400 hover:text-red-600"
                          disabled={saving}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </SettingCard>

        {/* System Information */}
        <SettingCard
          title="System Information"
          description="Current system status and information"
          icon={SettingsIcon}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">API Version:</span>
                <span className="text-sm font-medium text-gray-900">v1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Database:</span>
                <span className="text-sm font-medium text-gray-900">PostgreSQL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Environment:</span>
                <span className="text-sm font-medium text-gray-900">
                  {process.env.NODE_ENV || 'development'}
                </span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Last Backup:</span>
                <span className="text-sm font-medium text-gray-900">Not configured</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Storage:</span>
                <span className="text-sm font-medium text-gray-900">Cloudinary</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Email Service:</span>
                <span className="text-sm font-medium text-gray-900">Configured</span>
              </div>
            </div>
          </div>
        </SettingCard>

        {/* User Management Settings */}
        <SettingCard
          title="User Management"
          description="Configure user registration and management settings"
          icon={Users}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Email Verification Required</h4>
                <p className="text-sm text-gray-500">Require users to verify email before accessing features</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Auto-approve Testimonies</h4>
                <p className="text-sm text-gray-500">Automatically approve testimonies without admin review</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
              </label>
            </div>
          </div>
        </SettingCard>

        {/* Email & Notifications */}
        <SettingCard
          title="Email & Notifications"
          description="Configure email templates and notification settings"
          icon={Mail}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From Email Address
              </label>
              <input
                type="email"
                defaultValue="noreply@theythattestify.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="noreply@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Notification Email
              </label>
              <input
                type="email"
                defaultValue="admin@theythattestify.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="admin@example.com"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">New Testimony Notifications</h4>
                <p className="text-sm text-gray-500">Send email when new testimony is submitted</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
              </label>
            </div>
            
            <button className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors">
              Save Email Settings
            </button>
          </div>
        </SettingCard>

        {/* Website Settings */}
        <SettingCard
          title="Website Configuration"
          description="General website settings and configuration"
          icon={Globe}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website Name
              </label>
              <input
                type="text"
                defaultValue="TheyThatTestify"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mission Statement
              </label>
              <textarea
                rows={3}
                defaultValue="To collect and share 1 million testimonies of Jesus to inspire faith, glorify God, and build a living archive of His power in our time."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Testimonies Goal
              </label>
              <input
                type="number"
                defaultValue="1000000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
            
            <button className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors">
              Save Website Settings
            </button>
          </div>
        </SettingCard>
      </div>
    </div>
  );
};

export default Settings;