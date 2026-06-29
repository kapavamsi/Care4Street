'use client';

import { useState, FormEvent, useRef, useEffect } from 'react';
import { uploadImage } from '@/lib/upload';
import { getCityName, getCityCommittee } from '@/lib/city';

interface ReportModalProps {
  lat: number;
  lng: number;
  onClose: () => void;
  onSubmit: () => void;
}

const ISSUE_TYPES = [
  { value: 'pothole', label: '🕳️ Pothole' },
  { value: 'graffiti', label: '🎨 Graffiti' },
  { value: 'streetlight', label: '💡 Broken Streetlight' },
  { value: 'tree', label: '🌳 Fallen Tree' },
  { value: 'broken_wires', label: '⚡ Broken Wires' },
  { value: 'waste_dump', label: '🗑️ Waste Dump' }
];

export default function ReportModal({ lat, lng, onClose, onSubmit }: ReportModalProps) {
  const [issueType, setIssueType] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadMethod, setUploadMethod] = useState<'file' | 'url'>('file');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [cityName, setCityName] = useState<string>('');
  const [committeeName, setCommitteeName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Detect city from coordinates
    if (lat && lng) {
      try {
        const city = getCityName(lat, lng);
        const committee = getCityCommittee(lat, lng);
        console.log('📍 ReportModal - City:', city, 'Committee:', committee);
        setCityName(city);
        setCommitteeName(committee);
      } catch (err) {
        console.warn('City detection error:', err);
        setCityName('Bangalore');
        setCommitteeName('BBMP');
      }
    }
  }, [lat, lng]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError('Image size exceeds 10MB limit.');
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setUploadStatus('');

    if (!issueType) {
      setError('Please select an issue type');
      return;
    }

    if (!description.trim()) {
      setError('Please enter a description');
      return;
    }

    setSubmitting(true);
    setUploadProgress(0);

    try {
      let userId = localStorage.getItem('userId');
      if (!userId) {
        userId = crypto.randomUUID();
        localStorage.setItem('userId', userId);
      }

      let finalImageUrl = imageUrl || '';

      if (uploadMethod === 'file' && imageFile) {
        setUploadStatus('📤 Uploading to S3...');
        setUploadProgress(30);
        
        try {
          finalImageUrl = await uploadImage(imageFile, userId);
          setUploadProgress(100);
          setUploadStatus('✅ Uploaded to S3 successfully!');
        } catch (uploadError: any) {
          setUploadStatus('❌ S3 upload failed');
          setError('Failed to upload image: ' + uploadError.message);
          setSubmitting(false);
          return;
        }
      }

      setUploadStatus('📤 Submitting report...');
      setUploadProgress(70);

      // Use detected city or fallback
      const reportCity = cityName || 'Bangalore';
      const reportCommittee = committeeName || 'BBMP';

      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          issueType,
          lat,
          lng,
          description,
          imageUrl: finalImageUrl,
          city: reportCity,
          country: 'India',
          cityCommittee: reportCommittee
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit report');
      }

      setUploadProgress(100);
      setUploadStatus('✅ Report submitted!');
      
      setTimeout(() => {
        onSubmit();
        onClose();
      }, 1000);

    } catch (err: any) {
      setError(err.message || 'Failed to submit report.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="mb-5 flex items-start justify-between border-b border-gray-200 pb-3">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Report an Issue</h2>
            <p className="mt-1 text-sm text-gray-600">
              📍 {lat.toFixed(6)}, {lng.toFixed(6)}
            </p>
            <p className="text-xs text-blue-600 mt-0.5">
              🏙️ {cityName || 'Detecting...'} • 🏛️ {committeeName || '...'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Issue Type <span className="text-red-500">*</span>
            </label>
            <select
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
              required
            >
              <option value="">Select an issue type</option>
              {ISSUE_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Describe the issue in detail..."
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none resize-none"
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Image <span className="text-gray-400">(optional)</span>
            </label>
            
            <div className="flex gap-2 mb-3">
              <button
                type="button"
                onClick={() => setUploadMethod('file')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  uploadMethod === 'file' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                📁 Upload File
              </button>
              <button
                type="button"
                onClick={() => setUploadMethod('url')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  uploadMethod === 'url' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                🔗 Image URL
              </button>
            </div>

            {uploadMethod === 'file' ? (
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {imagePreview && (
                  <div className="mt-2 relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-48 rounded-lg object-cover border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview(null);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = '';
                        }
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ✕
                    </button>
                  </div>
                )}
                {uploadProgress > 0 && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          uploadProgress === 100 ? 'bg-green-600' : 'bg-blue-600'
                        }`}
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    {uploadStatus && (
                      <p className={`text-xs mt-1 ${
                        uploadProgress === 100 ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {uploadStatus}
                      </p>
                    )}
                  </div>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  Upload to AWS S3. JPG, PNG, GIF. Max 10MB.
                </p>
              </div>
            ) : (
              <div>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Enter a direct URL to an image.
                </p>
              </div>
            )}
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700 border border-red-200">
              ⚠️ {error}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              {submitting ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
