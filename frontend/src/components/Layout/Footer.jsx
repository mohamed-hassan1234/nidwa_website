import React from 'react';
import { Laptop, Mail, MapPin, Phone, Linkedin, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-950 pt-24 pb-12 overflow-hidden relative font-['Roboto',_sans-serif]">
            {/* Decorative Grid */}
            <div className="absolute inset-0 z-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                    <div className="lg:col-span-1">
                        <div className="flex items-center space-x-2 mb-8">
                            <div className="bg-primary p-2 rounded-xl">
                                <Laptop className="text-white w-6 h-6" />
                            </div>
                            <span className="text-2xl font-black tracking-tighter text-white uppercase">
                                NIDWA<span className="text-primary">ICT</span>
                            </span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed mb-8 font-medium">
                            Empowering enterprise growth through strategic technology implementation and world-class digital infrastructure.
                        </p>
                        <div className="flex space-x-4">
                            {[Linkedin, Twitter, Facebook].map((Icon, idx) => (
                                <a key={idx} href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all duration-300">
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-8">Solutions</h4>
                        <ul className="space-y-4">
                            {['Cloud Integration', 'Cybersecurity', 'Software Dev', 'IT Consulting'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-slate-400 text-sm font-bold hover:text-primary transition-colors">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-8">Company</h4>
                        <ul className="space-y-4">
                            {['About Us', 'Success Stories', 'Our Team', 'Careers'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-slate-400 text-sm font-bold hover:text-primary transition-colors">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-8">Connect</h4>
                        <ul className="space-y-6">
                            <li className="flex items-center space-x-4 text-slate-400">
                                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-primary">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <span className="text-sm font-bold">hello@nidwaict.com</span>
                            </li>
                            <li className="flex items-center space-x-4 text-slate-400">
                                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-primary">
                                    <MapPin className="w-4 h-4" />
                                </div>
                                <span className="text-sm font-bold">Enterprise Tower, L24</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.25em] mb-6 md:mb-0">
                        &copy; {new Date().getFullYear()} NIDWA ICT. PROTECTED BY GLOBAL PATENTS.
                    </p>
                    <div className="flex space-x-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
