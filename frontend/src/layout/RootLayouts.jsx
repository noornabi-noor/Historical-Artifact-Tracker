import React from 'react';
import Navbar from '../shared/Navbar';
import { Outlet } from 'react-router';
import { ThemeProvider } from '../contexts/ThemeContext';
import Footer from '../shared/Footer';

const RootLayouts = () => {
    return (
        <div>
            <ThemeProvider>
                <Navbar/>
            </ThemeProvider>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default RootLayouts;