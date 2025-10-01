import React from 'react';
import { Link, NavLink } from 'react-router';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { user, logout, loading } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className='container mx-auto pt-5'>
      <div className="navbar border-1 border-primary p-5 rounded-2xl shadow-lg shadow-white/20">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-primary rounded-box z-10 mt-3 w-52 p-2 shadow">
              <NavLink to="/" className={({isActive}) => isActive ? "text-base border-b-2 border-white" : "hover:text-white hover:scale-105 hover:transition-all text-base"}>Home</NavLink>
              <NavLink to="/apps" className={({isActive}) => isActive ? "text-base border-b-2 border-white" : "hover:text-white hover:scale-105 hover:transition-all text-base"}>Apps</NavLink>
            </ul>
          </div>
          <Link to="/" className="text-xl lg:text-2xl font-bold">App Store</Link>
        </div>
        
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-5">
            <NavLink to="/" className={({isActive}) => isActive ? "text-xl border-b-2 border-primary" : "hover:text-primary hover:scale-105 hover:transition-all text-xl"}>Home</NavLink>
            <NavLink to="/apps" className={({isActive}) => isActive ? "text-xl border-b-2 border-primary" : "hover:text-primary hover:scale-105 hover:transition-all text-xl"}>Apps</NavLink>
          </ul>
        </div>
        
        <div className="navbar-end space-x-3">
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : user ? (
            <div className="dropdown dropdown-end">
              
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img alt={user.displayName} src={user.photoURL || 'https://via.placeholder.com/150'} />
                </div>
               
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li>
                  <div className="justify-between">
                    <span>{user.displayName}</span>
                  </div>
                </li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </ul>
            </div>
          ) : (
            <>
            
              <Link to="/login" className="btn btn-outline">Login</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};