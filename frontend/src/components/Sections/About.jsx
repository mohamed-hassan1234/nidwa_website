import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const About = () => {
    const features = [
        "Certified Infrastructure Experts",
        "24/7 Proactive System Monitoring",
        "Bespoke Enterprise Software",
        "Advanced Cybersecurity Audits"
    ];

    return (
        <section id="about" className="py-32 bg-white overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-2xl shadow-primary/10">
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000"
                                alt="Team working"
                                className="w-full h-[600px] object-cover"
                            />
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/10 rounded-full mix-blend-multiply filter blur-2xl animate-blob"></div>
                        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>

                        <div className="absolute bottom-12 right-12 z-20 bg-primary p-10 rounded-[3rem] text-white shadow-2xl">
                            <p className="text-5xl font-black mb-1">15+</p>
                            <p className="text-xs font-bold uppercase tracking-widest opacity-80">Years Experience</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-primary font-black uppercase tracking-[0.3em] mb-4 text-sm">About Nidwa ICT</p>
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-10 tracking-tighter leading-tight">
                            Pioneering the Digital <span className="text-primary italic font-light">Frontier</span> Since 2009
                        </h2>

                        <p className="text-slate-600 text-lg leading-relaxed mb-10">
                            We don't just provide services; we architect success. Nidwa ICT has been at the forefront of digital transformation, helping businesses navigate the complexities of modern technology with confidence and precision.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            {features.map((feature, idx) => (
                                <div key={idx} className="flex items-center space-x-3 group">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                        <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                    <span className="text-slate-700 font-bold">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <button className="border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white px-10 py-4 rounded-2xl font-black tracking-widest transition-all duration-300">
                            LEARN MORE
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
