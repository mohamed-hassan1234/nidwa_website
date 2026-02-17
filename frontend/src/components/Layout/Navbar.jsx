import React, { useState, useEffect } from 'react';
import { Menu, X, Laptop } from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Services', href: '#services' },
        { name: 'Portfolio', href: '#portfolio' },
        { name: 'Contact', href: '#contact' }
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
            <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
                <a href="#home" className="flex items-center space-x-2 group">
                    <div className="bg-primary p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                        <Laptop className="text-white w-6 h-6" />
                    </div>
                    <span className={`text-2xl font-black tracking-tighter ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
                        NIDWA<span className="text-primary">ICT</span>
                    </span>
                </a>

                <div className="hidden lg:flex space-x-10 items-center">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className={`text-sm font-bold uppercase tracking-widest hover:text-primary transition-all relative group ${isScrolled ? 'text-slate-700' : 'text-white'}`}
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                        </a>
                    ))}
                    <button className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-full text-sm font-bold tracking-widest transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-95">
                        HIRE US
                    </button>
                </div>

                <div className="lg:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`p-2 rounded-lg ${isScrolled ? 'text-slate-900' : 'text-white'}`}
                    >
                        {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`lg:hidden absolute top-full left-0 w-full bg-white transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[500px] border-t border-slate-100' : 'max-h-0'}`}>
                <div className="p-8 flex flex-col space-y-6">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="text-lg font-bold text-slate-900 hover:text-primary transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                    <button className="bg-primary text-white py-4 rounded-xl font-bold tracking-widest">
                        GET STARTED
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
