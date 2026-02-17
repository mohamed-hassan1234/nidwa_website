import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ArrowRight, Plus } from 'lucide-react';

const Projects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const { data } = await axios.get('https://nidwa.com/api/projects');
                setProjects(data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };
        fetchProjects();
    }, []);

    return (
        <section id="portfolio" className="py-32 bg-white">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
                    <div className="max-w-2xl">
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-primary font-black uppercase tracking-[0.3em] mb-4 text-sm"
                        >
                            Our Portfolio
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter"
                        >
                            Impactful <span className="text-primary italic font-light">Case Studies</span>
                        </motion.h2>
                    </div>
                    <motion.button
                        whileHover={{ x: 5 }}
                        className="hidden md:flex items-center space-x-2 text-primary font-black uppercase tracking-widest text-sm border-b-2 border-primary pb-2 mt-8 md:mt-0 transition-all hover:text-primary-hover hover:border-primary-hover"
                    >
                        <span>View All Works</span>
                        <ArrowRight className="w-5 h-5" />
                    </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative h-[500px] rounded-[3.5rem] overflow-hidden bg-slate-100 shadow-2xl shadow-slate-200/50"
                        >
                            <img
                                src={project.imageUrl}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>

                            {/* Content Over */}
                            <div className="absolute inset-0 p-12 flex flex-col justify-end transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    className="mb-4"
                                >
                                    <span className="bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full">
                                        {project.category}
                                    </span>
                                </motion.div>
                                <h3 className="text-3xl font-black text-white mb-6 leading-tight tracking-tight">
                                    {project.title}
                                </h3>
                                <button className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-900 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-primary hover:text-white transform scale-90 group-hover:scale-100">
                                    <Plus className="w-6 h-6" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
