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

    // Check if app is installed
    const installedApps = JSON.parse(localStorage.getItem('installedApps') || '[]');
    setIsInstalled(installedApps.includes(id));
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.comment.trim()) {
      toast.error('Please enter a review comment');
      return;
    }

    setSubmittingReview(true);
    
    // Simulate API delay
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
    
    // Simulate installation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const installedApps = JSON.parse(localStorage.getItem('installedApps') || '[]');
    
    if (isInstalled) {
      // Uninstall
      const updatedApps = installedApps.filter(appId => appId !== id);
      localStorage.setItem('installedApps', JSON.stringify(updatedApps));
      setIsInstalled(false);
      toast.success(`${app.name} uninstalled successfully!`);
    } else {
      // Install
      installedApps.push(id);
      localStorage.setItem('installedApps', JSON.stringify(installedApps));
      setIsInstalled(true);
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
    <div className="container mx-auto px-4 py-8">
      <div className="hero bg-base-200 rounded-2xl mb-8">
        <div className="hero-content flex-col lg:flex-row">
          <img src={app.banner || app.thumbnail} className="max-w-sm rounded-lg shadow-2xl" alt={app.name} />
          <div>
            <h1 className="text-5xl font-bold">{app.name}</h1>
            <p className="text-xl text-base-content/70 mb-2">{app.developer}</p>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-lg font-semibold">⭐ {app.rating}</span>
              <span>📥 {app.downloads > 1000000 ? `${(app.downloads/1000000).toFixed(1)}M` : `${(app.downloads/1000).toFixed(0)}K`} downloads</span>
              <div className="badge badge-primary badge-lg">{app.category}</div>
            </div>
            <button 
              onClick={handleInstall} 
              className={`btn btn-lg ${isInstalled ? 'btn-error' : 'btn-primary'}`}
              disabled={installing}
            >
              {installing ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  {isInstalled ? 'Uninstalling...' : 'Installing...'}
                </>
              ) : (
                isInstalled ? '🗑️ Uninstall' : '📱 Install'
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <p className="text-base-content/80 leading-relaxed">{app.description}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Features</h2>
            <ul className="list-disc list-inside space-y-2">
              {app.features.map((feature, index) => (
                <li key={index} className="text-base-content/80">{feature}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Reviews</h2>
            
            <div className="card bg-base-100 shadow-xl mb-6">
              <div className="card-body">
                <h3 className="card-title">Submit a Review</h3>
                {!isInstalled && (
                  <div className="alert alert-warning mb-4">
                    <span>⚠️ You must install the app first to submit a review</span>
                  </div>
                )}
                <form onSubmit={handleReviewSubmit}>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Review</span>
                    </label>
                    <textarea
                      className="textarea textarea-bordered h-24"
                      placeholder="Write your review here..."
                      value={newReview.comment}
                      onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                      disabled={!isInstalled || submittingReview}
                      required
                    ></textarea>
                  </div>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Rating</span>
                    </label>
                    <select
                      className="select select-bordered"
                      value={newReview.rating}
                      onChange={(e) => setNewReview({...newReview, rating: e.target.value})}
                      disabled={!isInstalled || submittingReview}
                    >
                      <option value={5}>5 Stars</option>
                      <option value={4}>4 Stars</option>
                      <option value={3}>3 Stars</option>
                      <option value={2}>2 Stars</option>
                      <option value={1}>1 Star</option>
                    </select>
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    disabled={!isInstalled || submittingReview}
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
            </div>

            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id || review.user} className="card bg-base-100 shadow-lg">
                  <div className="card-body">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{review.user}</h4>
                      <div className="flex items-center gap-2">
                        <span>⭐ {review.rating}</span>
                        <span className="text-sm text-base-content/70">{review.date || 'Today'}</span>
                      </div>
                    </div>
                    <p className="text-base-content/80">{review.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};