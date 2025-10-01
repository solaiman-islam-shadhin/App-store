import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const AppDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [app, setApp] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ comment: '', rating: 5 });
  const [isInstalled, setIsInstalled] = useState(false);
  const [hasEverInstalled, setHasEverInstalled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [installing, setInstalling] = useState(false);
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/data.json')
      .then(res => res.json())
      .then(data => {
        const foundApp = data.find(a => a.id === id);
        if (foundApp) {
          setApp(foundApp);
          setReviews(foundApp.reviews || []);
        }
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });

    const installedApps = JSON.parse(localStorage.getItem('installedApps') || '[]');
    setIsInstalled(installedApps.includes(id));

    const everInstalledApps = JSON.parse(localStorage.getItem('everInstalledApps') || '[]');
    setHasEverInstalled(everInstalledApps.includes(id));
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.comment.trim()) {
      toast.error('Please enter a review comment');
      return;
    }

    setSubmittingReview(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const review = {
      id: Date.now(),
      user: user.displayName || user.email,
      rating: parseInt(newReview.rating),
      comment: newReview.comment,
      date: new Date().toLocaleDateString()
    };

    setReviews([review, ...reviews]);
    setNewReview({ comment: '', rating: 5 });
    setSubmittingReview(false);
    toast.success('Review submitted successfully!');
  };

  const handleInstall = async () => {
    setInstalling(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const installedApps = JSON.parse(localStorage.getItem('installedApps') || '[]');
    const everInstalledApps = JSON.parse(localStorage.getItem('everInstalledApps') || '[]');
    
    if (isInstalled) {
      const updatedApps = installedApps.filter(appId => appId !== id);
      localStorage.setItem('installedApps', JSON.stringify(updatedApps));
      setIsInstalled(false);
      toast.success(`${app.name} uninstalled successfully!`);
    } else {
      installedApps.push(id);
      localStorage.setItem('installedApps', JSON.stringify(installedApps));
      setIsInstalled(true);
      
      if (!everInstalledApps.includes(id)) {
        everInstalledApps.push(id);
        localStorage.setItem('everInstalledApps', JSON.stringify(everInstalledApps));
        setHasEverInstalled(true);
      }
      
      toast.success(`${app.name} installed successfully!`);
    }
    
    setInstalling(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner text="Loading app details..." />
      </div>
    );
  }

  if (!app) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">App not found</h2>
          <p>The app you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* App Header - Responsive */}
        <div className="bg-white rounded-2xl shadow-lg mb-8 overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/3 p-6 flex justify-center">
              <img
                src={app.banner || app.thumbnail}
                className="w-full max-w-sm rounded-lg shadow-xl"
                alt={app.name}
              />
            </div>
            <div className="lg:w-2/3 p-6">
              <h1 className="text-3xl lg:text-5xl font-bold mb-4 text-primary">{app.name}</h1>
              <p className="text-lg lg:text-xl text-gray-600 mb-4 ">{app.developer}</p>
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500 text-xl">⭐</span>
                  <span className="text-lg font-semibold text-primary">{app.rating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-500 text-xl">📥</span>
                  <span className='text-primary'>{app.downloads > 1000000 ? `${(app.downloads/1000000).toFixed(1)}M` : `${(app.downloads/1000).toFixed(0)}K`} downloads</span>
                </div>
                <div className="badge badge-primary badge-lg text-white">{app.category}</div>
              </div>
              <button 
                onClick={handleInstall} 
                className={`btn btn-lg w-full lg:w-auto ${isInstalled ? 'btn-error' : 'btn-primary'}`}
                disabled={installing}
              >
                {installing ? (
                  <>
                    <span className="loading loading-spinner loading-sm bg-primary"></span>
                    {isInstalled ? 'Uninstalling...' : 'Installing...'}
                  </>
                ) : (
                  isInstalled ? 'Uninstall' : 'Install'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Content Grid - Responsive */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-primary">Description</h2>
              <p className="text-black leading-relaxed">{app.description}</p>
            </div>

            {/* Features */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-primary">Features</h2>
              <ul className="space-y-3">
                {app.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-black">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6 text-primary">Reviews & Ratings</h2>
              
              {/* Submit Review Form */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4 text-primary">Write a Review</h3>
                {!hasEverInstalled && (
                  <div className="alert alert-warning mb-4">
                    <span>⚠️ You must install the app at least once to submit a review</span>
                  </div>
                )}
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Your Review</label>
                    <textarea
                      className="w-full px-4 py-3 border  border-gray-300 rounded-lg text-black"
                      rows="4"
                      placeholder="Share your experience with this app..."
                      value={newReview.comment}
                      onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                      disabled={!hasEverInstalled || submittingReview}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Rating</label>
                    <select
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newReview.rating}
                      onChange={(e) => setNewReview({...newReview, rating: e.target.value})}
                      disabled={!hasEverInstalled || submittingReview}
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ (5 stars)</option>
                      <option value={4}>⭐⭐⭐⭐ (4 stars)</option>
                      <option value={3}>⭐⭐⭐ (3 stars)</option>
                      <option value={2}>⭐⭐ (2 stars)</option>
                      <option value={1}>⭐ (1 star)</option>
                    </select>
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-primary w-full lg:w-auto" 
                    disabled={!hasEverInstalled || submittingReview}
                  >
                    {submittingReview ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Submitting...
                      </>
                    ) : (
                      'Submit Review'
                    )}
                  </button>
                </form>
              </div>

              {/* Reviews List - Redesigned */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary">User Reviews ({reviews.length})</h3>
                {reviews.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>No reviews yet. Be the first to review this app!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id || review.user} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                          <div className="flex items-center gap-3 mb-2 sm:mb-0">
                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                              {review.user.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{review.user}</h4>
                              <p className="text-sm text-gray-500">{review.date || 'Today'}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={`text-lg ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}>
                                ⭐
                              </span>
                            ))}
                            <span className="ml-2 text-sm font-medium text-gray-600">({review.rating}/5)</span>
                          </div>
                        </div>
                        <p className="text-black leading-relaxed">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <div className="text-center mb-6">
                <img
                  src={app.thumbnail}
                  alt={app.name}
                  className="w-24 h-24 mx-auto rounded-xl mb-4"
                />
                <h3 className="font-bold text-lg text-primary">{app.name}</h3>
                <p className="text-gray-600">{app.developer}</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Rating</span>
                  <span className="font-semibold text-primary">{app.rating}/5 ⭐</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Downloads</span>
                  <span className="font-semibold text-primary">{app.downloads > 1000000 ? `${(app.downloads/1000000).toFixed(1)}M` : `${(app.downloads/1000).toFixed(0)}K`}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Category</span>
                  <span className="font-semibold text-primary">{app.category}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Status</span>
                  <span className={`font-semibold ${isInstalled ? 'text-green-600' : 'text-gray-500'}`}>
                    {isInstalled ? 'Installed' : 'Not Installed'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};