import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Star } from 'lucide-react';

const Hero = () => {
    const tickerItems = Array(10).fill("Nidwa ICT");

    return (
        <section id="home" className="relative min-h-screen flex flex-col overflow-hidden bg-slate-950">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full filter blur-[128px] animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary rounded-full filter blur-[96px] animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10 flex-grow flex items-center pt-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-8"
                        >
                            <span className="w-2 h-2 bg-primary rounded-full animate-ping"></span>
                            <span className="text-primary text-xs font-bold uppercase tracking-widest">Innovation in Tech</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="text-white text-5xl md:text-8xl font-black leading-tight mb-8 tracking-tighter"
                        >
                            Expert ICT <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Solutions</span> for <br />
                            Global Leaders
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="text-slate-400 text-lg md:text-xl mb-12 max-w-xl leading-relaxed"
                        >
                            We build the digital spine of modern commerce. From cloud architecture to bespoke software, Nidwa ICT delivers future-proof technology.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="flex flex-wrap gap-6"
                        >
                            <button className="bg-primary hover:bg-primary-hover text-white px-10 py-5 rounded-2xl font-black tracking-widest flex items-center space-x-3 transition-all hover:translate-y-[-4px] shadow-2xl shadow-primary/30">
                                <span>START PROJECT</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>
                            <button className="group relative flex items-center space-x-4">
                                <div className="w-14 h-14 rounded-full border border-slate-800 flex items-center justify-center group-hover:border-primary transition-colors duration-500">
                                    <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                        <Play className="text-white fill-white w-4 h-4" />
                                    </div>
                                </div>
                                <span className="text-white font-bold tracking-widest text-sm underline-offset-8 group-hover:underline">WATCH DEMO</span>
                            </button>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 1 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative z-10 rounded-[3rem] overflow-hidden border border-slate-800 shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000"
                                className="w-full h-[600px] object-cover"
                                alt="Modern Technology"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
                        </div>

                        {/* Floating Card */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute -bottom-10 -left-10 z-20 bg-white p-8 rounded-[2rem] shadow-2xl border border-slate-100 max-w-[280px]"
                        >
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary">
                                    <Play className="w-6 h-6 fill-secondary" />
                                </div>
                                <div>
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Trust Score</p>
                                    <p className="text-slate-900 font-black text-xl">99.9%</p>
                                </div>
                            </div>
                            <p className="text-slate-500 text-sm leading-relaxed">System uptime guaranteed with our world-class cloud infrastructure.</p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Scrolling Ticker Line */}
            <div className="relative py-8 bg-primary overflow-hidden border-y border-white/10 z-20">
                <div className="flex whitespace-nowrap">
                    <motion.div
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="flex items-center space-x-12 shrink-0 pr-12"
                    >
                        {tickerItems.map((text, i) => (
                            <React.Fragment key={i}>
                                <span className="text-white text-3xl md:text-5xl font-black uppercase tracking-tighter flex items-center">
                                    {text}
                                </span>
                                <Star className="text-white fill-white w-6 h-6 md:w-10 md:h-10 rotate-12" />
                            </React.Fragment>
                        ))}
                    </motion.div>
                    <motion.div
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="flex items-center space-x-12 shrink-0 pr-12"
                    >
                        {tickerItems.map((text, i) => (
                            <React.Fragment key={i}>
                                <span className="text-white text-3xl md:text-5xl font-black uppercase tracking-tighter flex items-center">
                                    {text}
                                </span>
                                <Star className="text-white fill-white w-6 h-6 md:w-10 md:h-10 rotate-12" />
                            </React.Fragment>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
