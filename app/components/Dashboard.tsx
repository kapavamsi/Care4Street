'use client';

import { useState, useEffect } from 'react';
import { useReports } from '@/app/context/ReportContext';
import ExportButton from './ExportButton';
import ImageViewer from './ImageViewer';

interface Report {
  id: string;
  issue_type: string;
  description: string;
  status: string;
  upvote_count: number;
  lat: number;
  lng: number;
  image_url: string | null;
  created_at: string;
}

export default function Dashboard() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const { refreshTrigger } = useReports();

  const [stats, setStats] = useState({
    total: 0,
    submitted: 0,
    assigned: 0,
    in_progress: 0,
    resolved: 0,
    highUrgency: 0
  });

  useEffect(() => {
    fetchReports();
    
    const interval = setInterval(() => {
      fetchReports();
    }, 10000);

    return () => clearInterval(interval);
  }, [refreshTrigger]);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/reports');
      const data = await response.json();
      const reportsData = data.reports || [];
      setReports(reportsData);
      
      const statsData = {
        total: reportsData.length,
        submitted: reportsData.filter((r: any) => r.status === 'submitted').length,
        assigned: reportsData.filter((r: any) => r.status === 'assigned').length,
        in_progress: reportsData.filter((r: any) => r.status === 'in_progress').length,
        resolved: reportsData.filter((r: any) => r.status === 'resolved').length,
        highUrgency: reportsData.filter((r: any) => {
          const daysOld = Math.floor((Date.now() - new Date(r.created_at).getTime()) / (1000 * 60 * 60 * 24));
          return (r.upvote_count * 10) + (daysOld * 5) > 25;
        }).length
      };
      setStats(statsData);
      
      const now = new Date();
      setLastUpdated(now.toLocaleTimeString());
    } catch (error) {
      console.error('❌ Dashboard: Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (reportId: string, newStatus: string) => {
    try {
      const userId = 'bbmp_official';
      const response = await fetch('/api/reports/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportId, status: newStatus, userId })
      });

      if (response.ok) {
        fetchReports();
      }
    } catch (error) {
      console.error('❌ Dashboard: Error updating status:', error);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      submitted: 'bg-yellow-100 text-yellow-800',
      assigned: 'bg-blue-100 text-blue-800',
      in_progress: 'bg-purple-100 text-purple-800',
      resolved: 'bg-green-100 text-green-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const calculateUrgency = (upvotes: number, createdAt: string) => {
    const daysOld = Math.floor((Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24));
    const score = (upvotes * 10) + (daysOld * 5);
    
    if (score > 50) return { level: 'Critical', color: 'bg-red-600 text-white', emoji: '🔴' };
    if (score > 25) return { level: 'High', color: 'bg-orange-500 text-white', emoji: '🟠' };
    if (score > 10) return { level: 'Medium', color: 'bg-yellow-500 text-white', emoji: '🟡' };
    return { level: 'Low', color: 'bg-green-500 text-white', emoji: '🟢' };
  };

  const filteredReports = filter === 'all' 
    ? reports 
    : reports.filter(r => r.status === filter);

  if (loading && reports.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 h-full overflow-y-auto bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">🏛️ BBMP Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Last updated: {lastUpdated || 'Loading...'} 
            {loading && ' (Refreshing...)'}
          </p>
        </div>
        <div className="flex gap-2">
          <ExportButton reports={reports} />
          <button
            onClick={fetchReports}
            disabled={loading}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              loading 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {loading ? '⟳ Refreshing...' : '🔄 Refresh'}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-6 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
          <div className="text-sm text-gray-500">Total Reports</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-yellow-200">
          <div className="text-2xl font-bold text-yellow-600">{stats.submitted}</div>
          <div className="text-sm text-gray-500">Submitted</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-200">
          <div className="text-2xl font-bold text-blue-600">{stats.assigned}</div>
          <div className="text-sm text-gray-500">Assigned</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-purple-200">
          <div className="text-2xl font-bold text-purple-600">{stats.in_progress}</div>
          <div className="text-sm text-gray-500">In Progress</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-green-200">
          <div className="text-2xl font-bold text-green-600">{stats.resolved}</div>
          <div className="text-sm text-gray-500">Resolved</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-red-200">
          <div className="text-2xl font-bold text-red-600">{stats.highUrgency}</div>
          <div className="text-sm text-gray-500">⚠️ High Urgency</div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            filter === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          All ({reports.length})
        </button>
        <button
          onClick={() => setFilter('submitted')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            filter === 'submitted' ? 'bg-yellow-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          Submitted ({stats.submitted})
        </button>
        <button
          onClick={() => setFilter('assigned')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            filter === 'assigned' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          Assigned ({stats.assigned})
        </button>
        <button
          onClick={() => setFilter('in_progress')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            filter === 'in_progress' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          In Progress ({stats.in_progress})
        </button>
        <button
          onClick={() => setFilter('resolved')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            filter === 'resolved' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          Resolved ({stats.resolved})
        </button>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-gray-600 w-16">📷</th>
                <th className="px-4 py-3 text-left text-gray-600">Type</th>
                <th className="px-4 py-3 text-left text-gray-600">Description</th>
                <th className="px-4 py-3 text-center text-gray-600">👍</th>
                <th className="px-4 py-3 text-center text-gray-600">Urgency</th>
                <th className="px-4 py-3 text-center text-gray-600">Status</th>
                <th className="px-4 py-3 text-left text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => {
                const urgency = calculateUrgency(report.upvote_count, report.created_at);
                return (
                  <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <ImageViewer 
                        imageUrl={report.image_url || ''} 
                        alt={report.issue_type}
                        className="w-12 h-12"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium capitalize">{report.issue_type.replace('_', ' ')}</td>
                    <td className="px-4 py-3 text-gray-600 max-w-xs truncate" title={report.description}>
                      {report.description}
                    </td>
                    <td className="px-4 py-3 text-center font-bold text-blue-600">{report.upvote_count || 0}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${urgency.color}`}>
                        {urgency.emoji} {urgency.level}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={report.status}
                        onChange={(e) => updateStatus(report.id, e.target.value)}
                        className="px-2 py-1 border rounded text-sm bg-white"
                      >
                        <option value="submitted">Submitted</option>
                        <option value="assigned">Assigned</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
              {filteredReports.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                    No reports found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
