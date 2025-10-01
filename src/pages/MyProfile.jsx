import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const MyProfile = () => {
  const { user } = useAuth();
  const [installedApps, setInstalledApps] = useState([]);
  const [everInstalledApps, setEverInstalledApps] = useState([]);
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch apps data
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

    // Get installed apps
    const installed = JSON.parse(localStorage.getItem('installedApps') || '[]');
    const everInstalled = JSON.parse(localStorage.getItem('everInstalledApps') || '[]');
    setInstalledApps(installed);
    setEverInstalledApps(everInstalled);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner text="Loading profile..." />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please login to view profile</h2>
        </div>
      </div>
    );
  }

  const installedAppDetails = apps.filter(app => installedApps.includes(app.id));
  const totalDownloads = installedAppDetails.reduce((sum, app) => sum + app.downloads, 0);

  return (
    <div className="min-h-screen bg-black
    ">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-primary flex items-center justify-center text-white text-3xl font-bold">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
              ) : (
                user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()
              )}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {user.displayName || 'User'}
              </h1>
              <p className="text-gray-600 mb-4">{user.email}</p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="bg-blue-100 px-4 py-2 rounded-lg">
                  <span className="text-blue-800 font-semibold">{installedApps.length}</span>
                  <span className="text-blue-600 ml-1">Apps Installed</span>
                </div>
                <div className="bg-green-100 px-4 py-2 rounded-lg">
                  <span className="text-green-800 font-semibold">{everInstalledApps.length}</span>
                  <span className="text-green-600 ml-1">Apps Tried</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">📱</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Currently Installed</h3>
                <p className="text-2xl font-bold text-blue-600">{installedApps.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">📊</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Total Downloads</h3>
                <p className="text-2xl font-bold text-green-600">
                  {totalDownloads > 1000000000 ? `${(totalDownloads/1000000000).toFixed(1)}B` : 
                   totalDownloads > 1000000 ? `${(totalDownloads/1000000).toFixed(1)}M` : 
                   `${(totalDownloads/1000).toFixed(0)}K`}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">⭐</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Avg Rating</h3>
                <p className="text-2xl font-bold text-purple-600">
                  {installedAppDetails.length > 0 
                    ? (installedAppDetails.reduce((sum, app) => sum + app.rating, 0) / installedAppDetails.length).toFixed(1)
                    : '0.0'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Installed Apps */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">My Installed Apps</h2>
          {installedAppDetails.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📱</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Apps Installed</h3>
              <p className="text-gray-500">Start exploring and install some amazing apps!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {installedAppDetails.map((app) => (
                <div key={app.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <img
                      src={app.thumbnail}
                      alt={app.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{app.name}</h3>
                      <p className="text-sm text-gray-600">{app.developer}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-yellow-500">⭐</span>
                        <span className="text-sm font-medium">{app.rating}</span>
                        <span className="text-xs text-gray-500">
                          {app.downloads > 1000000 ? `${(app.downloads/1000000).toFixed(1)}M` : `${(app.downloads/1000).toFixed(0)}K`} downloads
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};