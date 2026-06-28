'use client';

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

interface ExportButtonProps {
  reports: Report[];
}

export default function ExportButton({ reports }: ExportButtonProps) {
  const exportCSV = () => {
    const headers = ['ID', 'Type', 'Description', 'Status', 'Upvotes', 'Latitude', 'Longitude', 'Created At'];
    const rows = reports.map(r => [
      r.id,
      r.issue_type,
      r.description || '',
      r.status,
      r.upvote_count,
      r.lat.toFixed(6),
      r.lng.toFixed(6),
      new Date(r.created_at).toLocaleDateString()
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `care4street-reports-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={exportCSV}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
    >
      📊 Export CSV
    </button>
  );
}
