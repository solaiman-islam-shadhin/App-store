// My Profile Page - Created by AI Assistant
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaImage } from 'react-icons/fa';

export const MyProfile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="card bg-base-100 shadow-2xl">
          <div className="card-body">
            <div className="flex items-center gap-6 mb-6">
              <div className="avatar">
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={user.photoURL || 'https://via.placeholder.com/150'}
                    alt={user.displayName}
                  />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold">{user.displayName}</h1>
                <p className="text-base-content/70">App Store User</p>
              </div>
            </div>

            <div className="divider"></div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaUser className="text-primary" />
                <div>
                  <p className="font-semibold">Display Name</p>
                  <p className="text-base-content/70">{user.displayName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-primary" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-base-content/70">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaImage className="text-primary" />
                <div>
                  <p className="font-semibold">Profile Photo</p>
                  <p className="text-base-content/70">
                    {user.photoURL ? 'Custom photo set' : 'Default photo'}
                  </p>
                </div>
              </div>
            </div>

            <div className="divider"></div>

            <div className="card bg-base-200">
              <div className="card-body">
                <h3 className="card-title">Account Statistics</h3>
                <div className="stats stats-vertical lg:stats-horizontal shadow">
                  <div className="stat">
                    <div className="stat-title">Member Since</div>
                    <div className="stat-value text-primary">Today</div>
                  </div>
                  <div className="stat">
                    <div className="stat-title">Apps Reviewed</div>
                    <div className="stat-value text-secondary">0</div>
                  </div>
                  <div className="stat">
                    <div className="stat-title">Apps Installed</div>
                    <div className="stat-value">0</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};