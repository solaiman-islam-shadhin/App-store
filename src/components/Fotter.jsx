import React from 'react'

export const Fotter = () => {
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
      </footer>
    </div>
  )
}