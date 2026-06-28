'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { useReports } from '@/app/context/ReportContext';

interface MapProps {
  onLocationClick: (lat: number, lng: number) => void;
}

export default function Map({ onLocationClick }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { triggerRefresh } = useReports();

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    if (!token) {
      setError('Mapbox token not found');
      setLoading(false);
      return;
    }

    if (!mapContainer.current) {
      setError('Map container not found');
      setLoading(false);
      return;
    }

    try {
      mapboxgl.accessToken = token;

      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [77.5946, 12.9716],
        zoom: 13,
      });

      map.current = newMap;

      newMap.on('load', () => {
        console.log('✅ Map loaded');
        setLoading(false);
        if (map.current) {
          fetchAndDisplayReports(map.current);
        }
      });

      newMap.on('error', (e) => {
        console.error('❌ Map error:', e);
        setError(e.error?.message || 'Map error');
        setLoading(false);
      });

      newMap.addControl(new mapboxgl.NavigationControl(), 'top-right');

      newMap.on('click', (e) => {
        if (e.lngLat) {
          onLocationClick(e.lngLat.lat, e.lngLat.lng);
        }
      });

      return () => {
        if (map.current) {
          map.current.remove();
          map.current = null;
        }
      };
    } catch (err: any) {
      console.error('❌ Error:', err);
      setError(err.message);
      setLoading(false);
    }
  }, []);

  const fetchAndDisplayReports = async (mapInstance: mapboxgl.Map) => {
    try {
      console.log('📊 Fetching reports for map...');
      const response = await fetch('/api/reports');
      const data = await response.json();
      const reports = data.reports || [];
      console.log(`📊 Found ${reports.length} reports`);

      if (!mapInstance) {
        console.error('❌ Map instance is undefined');
        return;
      }

      reports.forEach((report: any) => {
        const buttonId = `upvote-btn-${report.id}`;
        const countId = `upvote-count-${report.id}`;
        
        // Create image preview HTML
        const imageHTML = report.image_url 
          ? `<div style="margin-top: 6px;">
               <img 
                 src="${report.image_url}" 
                 alt="Report" 
                 style="width: 100%; max-height: 120px; object-fit: cover; border-radius: 4px; border: 1px solid #e5e7eb;"
                 onerror="this.style.display='none'"
               />
             </div>`
          : '';
        
        const popupHTML = `
          <div style="padding: 12px; max-width: 280px; font-family: system-ui, -apple-system, sans-serif;">
            <div style="font-weight: 600; font-size: 15px; color: #1f2937; margin-bottom: 4px;">
              ${report.issue_type.replace('_', ' ').toUpperCase()}
            </div>
            <div style="font-size: 13px; color: #4b5563; margin-bottom: 8px;">
              ${report.description || 'No description'}
            </div>
            ${imageHTML}
            <div style="display: flex; align-items: center; gap: 12px; border-top: 1px solid #e5e7eb; padding-top: 8px; margin-top: 8px;">
              <span style="font-size: 14px; font-weight: 600; color: #2563eb;" id="${countId}">
                👍 ${report.upvote_count || 0}
              </span>
              <span style="font-size: 11px; padding: 2px 8px; border-radius: 12px; background: ${
                report.status === 'resolved' ? '#d1fae5' : '#fef3c7'
              }; color: ${report.status === 'resolved' ? '#065f46' : '#92400e'};">
                ${report.status || 'submitted'}
              </span>
              <button 
                id="${buttonId}"
                data-report-id="${report.id}"
                style="
                  background: #3b82f6; 
                  color: white; 
                  border: none; 
                  padding: 4px 14px; 
                  border-radius: 6px; 
                  font-size: 12px; 
                  cursor: pointer;
                  font-weight: 500;
                  transition: all 0.2s;
                "
              >
                Upvote
              </button>
            </div>
          </div>
        `;

        const popup = new mapboxgl.Popup({ offset: 25, closeButton: true, maxWidth: '300px' }).setHTML(popupHTML);
        
        try {
          const marker = new mapboxgl.Marker({ color: getMarkerColor(report.issue_type) })
            .setLngLat([report.lng, report.lat])
            .setPopup(popup)
            .addTo(mapInstance);

          popup.on('open', () => {
            const button = document.getElementById(buttonId);
            if (button) {
              const newButton = button.cloneNode(true);
              button.parentNode?.replaceChild(newButton, button);
              
              newButton.addEventListener('click', async function(this: HTMLButtonElement) {
                const reportId = this.dataset.reportId;
                if (!reportId) return;
                await handleUpvote(reportId);
              });
            }
          });
        } catch (markerError) {
          console.error('❌ Error adding marker:', markerError);
        }
      });
    } catch (error) {
      console.error('❌ Error fetching reports:', error);
    }
  };

  const handleUpvote = async (reportId: string) => {
    console.log(`👍 Upvote clicked for report: ${reportId}`);
    
    try {
      let userId = localStorage.getItem('userId');
      if (!userId) {
        userId = crypto.randomUUID();
        localStorage.setItem('userId', userId);
      }

      const alreadyUpvoted = localStorage.getItem(`upvoted_${reportId}`);
      if (alreadyUpvoted === 'true') {
        alert('You already upvoted this report!');
        return;
      }

      console.log(`📤 Sending upvote for report ${reportId}...`);
      
      const response = await fetch('/api/reports/upvote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportId, userId })
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          localStorage.setItem(`upvoted_${reportId}`, 'true');
          alert('You already upvoted this report!');
          return;
        }
        throw new Error(data.error || 'Failed to upvote');
      }

      console.log(`✅ Upvote successful! New count: ${data.upvoteCount}`);
      
      const countElement = document.getElementById(`upvote-count-${reportId}`);
      if (countElement) {
        countElement.textContent = `👍 ${data.upvoteCount}`;
      }
      
      localStorage.setItem(`upvoted_${reportId}`, 'true');
      
      const button = document.querySelector(`[data-report-id="${reportId}"]`);
      if (button) {
        (button as HTMLButtonElement).disabled = true;
        (button as HTMLButtonElement).textContent = '✓ Upvoted';
        (button as HTMLButtonElement).style.background = '#10b981';
      }

      console.log('🔄 Triggering dashboard refresh...');
      triggerRefresh();

    } catch (error: any) {
      console.error('❌ Error upvoting:', error);
      alert(error.message || 'Failed to upvote. Please try again.');
    }
  };

  const getMarkerColor = (type: string) => {
    const colors: Record<string, string> = {
      pothole: '#ef4444',
      graffiti: '#f59e0b',
      streetlight: '#3b82f6',
      tree: '#10b981',
      broken_wires: '#f97316',
      waste_dump: '#8b5cf6'
    };
    return colors[type] || '#6b7280';
  };

  const handleRetry = () => window.location.reload();

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-center p-6 max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Map Error</h3>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={handleRetry}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full" style={{ minHeight: '100vh' }} />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  );
}
