import React from 'react';
import Navbar from '../components/Layout/Navbar';
import Hero from '../components/Sections/Hero';
import Services from '../components/Sections/Services';
import Projects from '../components/Sections/Projects';
import Contact from '../components/Sections/Contact';
import Footer from '../components/Layout/Footer';

import About from '../components/Sections/About';
import Stats from '../components/Sections/Stats';

const Home = () => {
    return (
        <main className="relative bg-white overflow-x-hidden selection:bg-primary selection:text-white">
            <Navbar />
            <Hero />
            <About />
            <Stats />
            <Services />
            <Projects />
            {/* Testimonials would go here */}
            <Contact />
            <Footer />
        </main>
    );
};

export default Home;
