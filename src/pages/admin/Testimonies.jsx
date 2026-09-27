import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Search, Filter, Eye, Check, X, Star, 
  ChevronLeft, ChevronRight, MoreVertical,
  Calendar, User, Tag, MessageSquare, Video,
  AlertCircle, CheckCircle, Clock, XCircle
} from 'lucide-react';
import { URL } from '../../url';


const Testimonies = () => {
  const [testimonies, setTestimonies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1 });
  
  // Filters
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    type: 'all',
    category: 'all',
    sortBy: 'createdAt',
    sortOrder: 'DESC'
  });
  
  // UI State
  const [selectedTestimony, setSelectedTestimony] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);

  useEffect(() => {
    fetchTestimonies();
  }, [filters, pagination.page]);

  const fetchTestimonies = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.page,
        limit: 10,
        ...filters
      };
      
      if (filters.status === 'all') delete params.status;
      if (filters.type === 'all') delete params.type;
      if (filters.category === 'all') delete params.category;

      const response = await axios.get(`${URL}/admin/testimonies`, { params });
      setTestimonies(response.data.testimonies);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Failed to fetch testimonies:', error);
      setError('Failed to load testimonies');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (testimony) => {
    try {
      setActionLoading(true);
      await axios.patch(`${URL}/admin/testimonies/${testimony.id}/approve`);
      fetchTestimonies();
    } catch (error) {
      console.error('Failed to approve testimony:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!selectedTestimony || !rejectionReason.trim()) return;
    
    try {
      setActionLoading(true);
      await axios.patch(`${URL}/admin/testimonies/${selectedTestimony.id}/reject`, {
        rejectionReason
      });
      setShowRejectModal(false);
      setRejectionReason('');
      setSelectedTestimony(null);
      fetchTestimonies();
    } catch (error) {
      console.error('Failed to reject testimony:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleFeatured = async (testimony) => {
    try {
      setActionLoading(true);
      await axios.patch(`${URL}/admin/testimonies/${testimony.id}/toggle-featured`);
      fetchTestimonies();
    } catch (error) {
      console.error('Failed to toggle featured status:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-amber-100 text-amber-800', icon: Clock, label: 'Pending' },
      approved: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Approved' },
      rejected: { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Rejected' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </span>
    );
  };

  const getTypeBadge = (type) => {
    const Icon = type === 'video' ? Video : MessageSquare;
    const color = type === 'video' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800';
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
        <Icon className="h-3 w-3 mr-1" />
        {type === 'video' ? 'Video' : 'Written'}
      </span>
    );
  };

  if (loading && testimonies.length === 0) {
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
          <h1 className="text-2xl font-bold text-gray-900">Testimonies Management</h1>
          <p className="text-gray-600">Review and manage testimony submissions</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>{pagination.total} total testimonies</span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search testimonies..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="all">All Types</option>
            <option value="written">Written</option>
            <option value="video">Video</option>
          </select>
          
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="createdAt">Date Created</option>
            <option value="title">Title</option>
            <option value="viewCount">View Count</option>
          </select>
          
          <select
            value={filters.sortOrder}
            onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="DESC">Newest First</option>
            <option value="ASC">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Testimonies List */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Testimony
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {testimonies.map((testimony) => (
                <tr key={testimony.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                          {testimony.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          {testimony.category?.name}
                        </p>
                        {testimony.isFeatured && (
                          <div className="flex items-center mt-1">
                            <Star className="h-3 w-3 text-amber-400 mr-1" />
                            <span className="text-xs text-amber-600">Featured</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                        {testimony.user?.profilePicture ? (
                          <img 
                            src={testimony.user.profilePicture} 
                            alt=""
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <User className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {testimony.isAnonymous ? 'Anonymous' : `${testimony.user?.firstName} ${testimony.user?.lastName}`}
                        </p>
                        <p className="text-sm text-gray-500">{testimony.user?.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(testimony.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getTypeBadge(testimony.type)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(testimony.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {testimony.viewCount || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => {
                          setSelectedTestimony(testimony);
                          setShowModal(true);
                        }}
                        className="text-amber-600 hover:text-amber-900"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      
                      {testimony.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(testimony)}
                            disabled={actionLoading}
                            className="text-green-600 hover:text-green-900 disabled:opacity-50"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedTestimony(testimony);
                              setShowRejectModal(true);
                            }}
                            disabled={actionLoading}
                            className="text-red-600 hover:text-red-900 disabled:opacity-50"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </>
                      )}
                      
                      {testimony.status === 'approved' && (
                        <button
                          onClick={() => handleToggleFeatured(testimony)}
                          disabled={actionLoading}
                          className={`${testimony.isFeatured ? 'text-amber-600' : 'text-gray-400'} hover:text-amber-900 disabled:opacity-50`}
                        >
                          <Star className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.pages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing page <span className="font-medium">{pagination.page}</span> of{' '}
                  <span className="font-medium">{pagination.pages}</span>
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.pages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* View Testimony Modal */}
      {showModal && selectedTestimony && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">{selectedTestimony.title}</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="mt-2 flex items-center space-x-4">
                {getStatusBadge(selectedTestimony.status)}
                {getTypeBadge(selectedTestimony.type)}
                <span className="text-sm text-gray-500">
                  {new Date(selectedTestimony.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Author</h4>
                <p className="text-sm text-gray-600">
                  {selectedTestimony.isAnonymous ? 'Anonymous' : `${selectedTestimony.user?.firstName} ${selectedTestimony.user?.lastName}`}
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Content</h4>
                {selectedTestimony.type === 'written' ? (
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">{selectedTestimony.content}</p>
                ) : (
                  <div>
                    <a 
                      href={selectedTestimony.videoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-amber-600 hover:text-amber-700"
                    >
                      {selectedTestimony.videoUrl}
                    </a>
                  </div>
                )}
              </div>
              
              {selectedTestimony.tags && selectedTestimony.tags.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedTestimony.tags.map((tag, index) => (
                      <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedTestimony.location && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Location</h4>
                  <p className="text-sm text-gray-600">{selectedTestimony.location}</p>
                </div>
              )}
              
              {selectedTestimony.rejectionReason && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Rejection Reason</h4>
                  <p className="text-sm text-red-600">{selectedTestimony.rejectionReason}</p>
                </div>
              )}
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-2">
              {selectedTestimony.status === 'pending' && (
                <>
                  <button
                    onClick={() => handleApprove(selectedTestimony)}
                    disabled={actionLoading}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setShowRejectModal(true);
                    }}
                    disabled={actionLoading}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Reject
                  </button>
                </>
              )}
              
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && selectedTestimony && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Reject Testimony</h3>
              <p className="text-sm text-gray-600 mb-4">
                Please provide a reason for rejecting "{selectedTestimony.title}". This will help the author understand what needs to be improved.
              </p>
              
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={4}
                placeholder="Enter rejection reason..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
              />
              
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => {
                    setShowRejectModal(false);
                    setRejectionReason('');
                    setSelectedTestimony(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReject}
                  disabled={actionLoading || !rejectionReason.trim()}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                >
                  {actionLoading ? 'Rejecting...' : 'Reject'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimonies;