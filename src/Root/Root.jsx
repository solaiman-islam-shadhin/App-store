import React from 'react'
import { Outlet } from 'react-router'
import { Navbar } from '../components/Navbar'
import { Fotter } from '../components/Fotter'

export const Root = () => {
    return (
        <div>
            <div >
                <Navbar />
                <div className='min-h-[calc(100vh-320px)]'>
                    <Outlet></Outlet>
                </div>
                <Fotter />
            </div>
        </div>
    )
}