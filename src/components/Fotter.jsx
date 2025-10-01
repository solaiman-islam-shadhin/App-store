import React from 'react'
import { Link } from 'react-router'
import { useAuth } from '../context/AuthContext'

export const Fotter = () => {
  const { user } = useAuth();

  return (
    <div>
      <footer className="footer footer-center bg-primary text-primary-content p-10">
        <aside>
          <p className="font-bold">
            App Store Ltd.
            <br />
            Providing reliable tech since 1992
          </p>
          <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
        </aside>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <Link to="/" className="link link-hover">Home</Link>
            <Link to="/apps" className="link link-hover">Apps</Link>
            {user && (
              <Link to="/MyProfile" className="link link-hover">My Profile</Link>
            )}
          </div>
        </nav>
      </footer>
    </div>
  )
}