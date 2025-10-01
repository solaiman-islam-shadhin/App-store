import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const Apps = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/data.json')
      .then(res => res.json())
      .then(data => {
        setApps(data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner text="Loading all apps..." />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Browse All Apps</h1>
        <p className="text-xl text-base-content/70">Discover amazing apps across all categories</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {apps.map((app) => (
          <Link key={app.id} to={`/app/${app.id}`} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <figure className="px-4 pt-4">
              <img src={app.thumbnail} alt={app.name} className="rounded-xl w-full h-48 object-cover" />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-lg">{app.name}</h2>
              <p className="text-sm text-base-content/70 mb-2">{app.developer}</p>
              
              <div className="flex items-center justify-between">
                <span className="font-semibold">⭐ {app.rating}</span>
                <span className="text-sm">📥 {app.downloads > 1000000 ? `${(app.downloads/1000000).toFixed(1)}M` : `${(app.downloads/1000).toFixed(0)}K`}</span>
              </div>
              
              <div className="badge badge-primary badge-outline mt-2">{app.category}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};