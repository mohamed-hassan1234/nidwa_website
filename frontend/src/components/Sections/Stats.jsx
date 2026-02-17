import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Award } from 'lucide-react';
import axios from 'axios';

const Stats = () => {
    const [counts, setCounts] = useState({ projects: 0, services: 0 });

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const [projRes, servRes] = await Promise.all([
                    axios.get('https://nidwa.com/api/projects/count'),
                    axios.get('https://nidwa.com/api/services/count')
                ]);

                setCounts({
                    projects: projRes.data.count || 0,
                    services: servRes.data.count || 0
                });
            } catch (error) {
                console.error('Error fetching counts:', error);
            }
        };
        fetchCounts();
    }, []);

    const stats = [
        { label: "Projects Done", value: counts.projects, suffix: "+", icon: Briefcase },
        { label: "Services Provided", value: counts.services, suffix: "+", icon: Award }
    ];

    return (
        <section className="py-24 bg-slate-900 border-y border-slate-800">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="text-center group bg-white/5 p-12 rounded-[2rem] border border-white/10 hover:border-primary/50 transition-colors"
                        >
                            <div className="mb-6 flex justify-center">
                                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:rotate-[360deg] shadow-lg shadow-primary/20">
                                    <stat.icon className="w-10 h-10" />
                                </div>
                            </div>
                            <h3 className="text-5xl md:text-7xl font-black text-white mb-4">
                                {stat.value}{stat.suffix}
                            </h3>
                            <p className="text-primary font-black uppercase tracking-[0.2em] text-sm">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
