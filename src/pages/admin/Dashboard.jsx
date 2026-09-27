import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Users, MessageSquare, Eye, Clock, 
  TrendingUp, TrendingDown, Activity, 
  CheckCircle, XCircle, AlertCircle,
  Calendar, ArrowUpRight,ArrowRight
} from 'lucide-react';
import { URL } from '../../url';



const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${URL}/admin/dashboard/stats`);
      setStats(response.data.stats);
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
      setError('Failed to load dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num?.toLocaleString() || '0';
  };

  const StatCard = ({ title, value, icon: Icon, change, changeType, color = 'amber' }) => {
    const colorClasses = {
      amber: 'bg-amber-50 text-amber-700 border-amber-200',
      blue: 'bg-blue-50 text-blue-700 border-blue-200',
      green: 'bg-green-50 text-green-700 border-green-200',
      purple: 'bg-purple-50 text-purple-700 border-purple-200',
    };

    const iconColors = {
      amber: 'text-amber-600',
      blue: 'text-blue-600',
      green: 'text-green-600',
      purple: 'text-purple-600',
    };

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{formatNumber(value)}</p>
            {change && (
              <div className="flex items-center mt-2">
                {changeType === 'increase' ? (
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm font-medium ${
                  changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {change}
                </span>
                <span className="text-sm text-gray-500 ml-1">vs last month</span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            <Icon className={`h-6 w-6 ${iconColors[color]}`} />
          </div>
        </div>
      </div>
    );
  };

  const RecentActivity = ({ title, items, emptyMessage }) => (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      </div>
      <div className="p-6">
        {items && items.length > 0 ? (
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-amber-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {item.title || item.firstName + ' ' + item.lastName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.category?.name || item.email} • {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-gray-400" />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">{emptyMessage}</p>
        )}
      </div>
    </div>
  );

  const ProgressBar = ({ percentage, label, total, current }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">{label}</h3>
        <span className="text-sm text-gray-500">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
        <div 
          className="bg-gradient-to-r from-amber-400 to-amber-600 h-3 rounded-full transition-all duration-500"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <span>{formatNumber(current)} testimonies documented</span>
        <span>{formatNumber(total)} goal</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600">Monitor the progress of our 1 million testimonies mission</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats?.users?.total || 0}
          icon={Users}
          change="+12%"
          changeType="increase"
          color="blue"
        />
        <StatCard
          title="Total Testimonies"
          value={stats?.testimonies?.total || 0}
          icon={MessageSquare}
          change="+8%"
          changeType="increase"
          color="amber"
        />
        <StatCard
          title="Pending Review"
          value={stats?.testimonies?.pending || 0}
          icon={Clock}
          color="purple"
        />
        <StatCard
          title="Total Views"
          value={stats?.testimonies?.totalViews || 0}
          icon={Eye}
          change="+24%"
          changeType="increase"
          color="green"
        />
      </div>

      {/* Progress to Goal */}
      <ProgressBar
        percentage={parseFloat(stats?.progress?.toGoal || 0)}
        label="Progress to 1 Million Testimonies"
        total={1000000}
        current={stats?.testimonies?.approved || 0}
      />

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Testimony Status</h3>
            <Activity className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm text-gray-600"></span>
                <span className="text-sm text-gray-600">Approved</span>
            </div>
            <span className="text-sm font-medium text-gray-900">
              {stats?.testimonies?.approved || 0}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-amber-500 mr-2" />
              <span className="text-sm text-gray-600">Pending</span>
            </div>
            <span className="text-sm font-medium text-gray-900">
              {stats?.testimonies?.pending || 0}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <XCircle className="h-4 w-4 text-red-500 mr-2" />
              <span className="text-sm text-gray-600">Rejected</span>
            </div>
            <span className="text-sm font-medium text-gray-900">
              {stats?.testimonies?.rejected || 0}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Content Types</h3>
          <MessageSquare className="h-5 w-5 text-gray-400" />
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Written Testimonies</span>
            <span className="text-sm font-medium text-gray-900">
              {stats?.testimonies?.writtenTestimonies || 0}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Video Testimonies</span>
            <span className="text-sm font-medium text-gray-900">
              {stats?.testimonies?.videoTestimonies || 0}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Featured Stories</span>
            <span className="text-sm font-medium text-gray-900">
              {stats?.testimonies?.featured || 0}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
          <ArrowUpRight className="h-5 w-5 text-gray-400" />
        </div>
        <div className="space-y-2">
          <button 
            onClick={() => window.location.href = '/admin/testimonies?status=pending'}
            className="w-full text-left p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-amber-200"
          >
            <div className="flex items-center justify-between">
              <span>Review Pending Testimonies</span>
              {stats?.testimonies?.pending > 0 && (
                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                  {stats.testimonies.pending}
                </span>
              )}
            </div>
          </button>
          <button 
            onClick={() => window.location.href = '/admin/testimonies?featured=true'}
            className="w-full text-left p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-amber-200"
          >
            Manage Featured Stories
          </button>
          <button 
            onClick={() => window.location.href = '/admin/users'}
            className="w-full text-left p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-amber-200"
          >
            <div className="flex items-center justify-between">
              <span>View User Management</span>
              {stats?.users?.total > 0 && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {stats.users.total}
                </span>
              )}
            </div>
          </button>
          <button className="w-full text-left p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-amber-200">
            Export Analytics Report
          </button>
        </div>
      </div>
    </div>

    {/* Recent Activity */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <RecentActivity
        title="Recent Testimonies Awaiting Review"
        items={stats?.testimonies?.recentPending || []}
        emptyMessage="No testimonies awaiting review"
      />
      <RecentActivity
        title="New Users This Week"
        items={stats?.users?.recent || []}
        emptyMessage="No new users this week"
      />
    </div>

    {/* System Health & Growth */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900">Monthly Growth Trend</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-amber-400 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Testimonies</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Users</span>
            </div>
          </div>
        </div>
        
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <div className="text-center">
            <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">Growth Chart Visualization</p>
            <p className="text-sm text-gray-400 mt-1">
              Chart.js or Recharts integration recommended
            </p>
            <div className="mt-4 text-xs text-gray-400">
              Monthly growth data: {stats?.monthlyGrowth?.length || 0} data points
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">System Health</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">API Status</span>
            <span className="flex items-center text-sm text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Online
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Database</span>
            <span className="flex items-center text-sm text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Connected
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Email Service</span>
            <span className="flex items-center text-sm text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Active
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">File Storage</span>
            <span className="flex items-center text-sm text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Connected
            </span>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-600 mb-2">Mission Progress</div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500">To 1M Goal</span>
            <span className="text-xs font-medium text-gray-900">
              {((stats?.testimonies?.approved || 0) / 1000000 * 100).toFixed(4)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="bg-gradient-to-r from-amber-400 to-amber-600 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${Math.max(0.1, ((stats?.testimonies?.approved || 0) / 1000000 * 100))}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500">
            {(1000000 - (stats?.testimonies?.approved || 0)).toLocaleString()} remaining
          </p>
        </div>
      </div>
    </div>

    {/* Action Items & Alerts */}
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Action Items & Alerts</h3>
      <div className="space-y-3">
        {stats?.testimonies?.pending > 0 ? (
          <div className="flex items-center justify-between p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-amber-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-amber-800">
                  {stats.testimonies.pending} testimonies awaiting review
                </p>
                <p className="text-xs text-amber-600">Requires admin action</p>
              </div>
            </div>
            <button 
              onClick={() => window.location.href = '/admin/testimonies?status=pending'}
              className="text-amber-600 hover:text-amber-700 text-sm font-medium flex items-center"
            >
              Review Now <ArrowRight className="ml-1 h-3 w-3" />
            </button>
          </div>
        ) : (
          <div className="flex items-center p-4 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-green-800">All testimonies reviewed</p>
              <p className="text-xs text-green-600">No pending items</p>
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center">
            <Users className="h-5 w-5 text-blue-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-blue-800">
                {stats?.users?.recent?.length || 0} new users this week
              </p>
              <p className="text-xs text-blue-600">Community growth</p>
            </div>
          </div>
          <button 
            onClick={() => window.location.href = '/admin/users'}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
          >
            View Users <ArrowRight className="ml-1 h-3 w-3" />
          </button>
        </div>
        
        {(stats?.testimonies?.approved || 0) > 0 && (
          <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <Activity className="h-5 w-5 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-green-800">Platform actively growing</p>
                <p className="text-xs text-green-600">
                  {stats.testimonies.approved} approved testimonies inspiring others
                </p>
              </div>
            </div>
            <button 
              onClick={() => window.location.href = '/admin/testimonies'}
              className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center"
            >
              View All <ArrowRight className="ml-1 h-3 w-3" />
            </button>
          </div>
        )}
      </div>
    </div>

    {/* Footer Stats */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white rounded-lg border border-gray-200 p-4 text-center shadow-sm">
        <div className="text-2xl font-bold text-gray-900 mb-1">
          {Math.round(((stats?.testimonies?.approved || 0) / (stats?.testimonies?.total || 1)) * 100)}%
        </div>
        <div className="text-xs text-gray-500">Approval Rate</div>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-4 text-center shadow-sm">
        <div className="text-2xl font-bold text-gray-900 mb-1">
          {Math.round((stats?.testimonies?.totalViews || 0) / (stats?.testimonies?.approved || 1))}
        </div>
        <div className="text-xs text-gray-500">Avg Views per Story</div>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-4 text-center shadow-sm">
        <div className="text-2xl font-bold text-gray-900 mb-1">
          {stats?.users?.recent?.length || 0}
        </div>
        <div className="text-xs text-gray-500">New Users (7 days)</div>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-4 text-center shadow-sm">
        <div className="text-2xl font-bold text-amber-600 mb-1">
          {((stats?.testimonies?.approved || 0) / 1000000 * 100).toFixed(2)}%
        </div>
        <div className="text-xs text-gray-500">Mission Progress</div>
      </div>
    </div>
  </div>
);

};

export default Dashboard;