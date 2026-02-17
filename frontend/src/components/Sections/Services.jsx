import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ChevronRight, Layers } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const Services = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const { data } = await axios.get('https://nidwa.com/api/services');
                setServices(data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };
        fetchServices();
    }, []);

    const DynamicIcon = ({ name, className }) => {
        const Icon = LucideIcons[name] || Layers;
        return <Icon className={className} />;
    };

    return (
        <section id="services" className="py-32 bg-slate-50">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-primary font-black uppercase tracking-[0.3em] mb-4 text-sm"
                    >
                        How we help
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter"
                    >
                        Our Core <span className="text-primary italic font-light">Expertise</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-slate-600 text-lg"
                    >
                        We deliver high-impact technology solutions designed to solve complex business challenges.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {services.length > 0 ? services.map((service, index) => (
                        <motion.div
                            key={service._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-12 rounded-[3.5rem] border border-slate-100 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 group relative overflow-hidden"
                        >
                            {/* Hover Background Accent */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700"></div>

                            <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-10 group-hover:bg-primary transition-colors duration-500 relative z-10">
                                <DynamicIcon name={service.iconName} className="w-10 h-10 text-primary group-hover:text-white transition-colors duration-500" />
                            </div>

                            <h3 className="text-2xl font-black text-slate-900 mb-6 tracking-tight relative z-10">
                                {service.title}
                            </h3>
                            <p className="text-slate-600 leading-relaxed mb-8 relative z-10">
                                {service.description}
                            </p>

                            <button className="flex items-center space-x-2 text-slate-900 font-black text-sm uppercase tracking-widest group-hover:text-primary transition-colors relative z-10">
                                <span>Learn More</span>
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    )) : (
                        [1, 2, 3].map((i) => (
                            <div key={i} className="bg-white/50 p-12 rounded-[3.5rem] border border-slate-100 animate-pulse h-96"></div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default Services;
