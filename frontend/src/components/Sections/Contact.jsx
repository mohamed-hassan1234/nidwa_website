import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('https://nidwa.com/api/contact', formData);
            setSubmitted(true);
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Error submitting inquiry:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="py-32 bg-slate-50 relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-white transform -skew-y-6 -translate-y-64"></div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row gap-24">
                    <div className="lg:w-5/12">
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-primary font-black uppercase tracking-[0.3em] mb-4 text-sm"
                        >
                            Let's Talk
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-black text-slate-900 mb-10 tracking-tighter leading-tight"
                        >
                            Have a Big Project <span className="text-primary italic font-light text-5xl italic">in Mind?</span>
                        </motion.h2>

                        <p className="text-slate-600 text-lg leading-relaxed mb-12 max-w-md">
                            We're ready to help you scale your digital infrastructure. Reach out and let's build something extraordinary together.
                        </p>

                        <div className="space-y-10">
                            {[
                                { icon: Send, label: "Email Us", val: "hello@nidwaict.com" },
                                { icon: CheckCircle, label: "Visit Us", val: "Enterprise Tower, Level 24" }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex items-center space-x-6"
                                >
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary shadow-xl shadow-slate-200/50">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-1">{item.label}</h4>
                                        <p className="text-slate-500 font-bold">{item.val}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-7/12">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="bg-white p-8 md:p-16 rounded-[4rem] shadow-2xl shadow-primary/5 border border-slate-100"
                        >
                            {submitted ? (
                                <div className="text-center py-10">
                                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-8">
                                        <CheckCircle className="w-12 h-12" />
                                    </div>
                                    <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Message Received!</h3>
                                    <p className="text-slate-600 mb-10">Our consultants will reach out within 12 business hours.</p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="text-primary font-black uppercase tracking-widest text-sm border-b-2 border-primary pb-2"
                                    >
                                        Send Another
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-2">Your Name</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full bg-slate-50 border-none px-8 py-5 rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-bold text-slate-900 placeholder:text-slate-300"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="Jack Dorsey"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-2">Email Address</label>
                                            <input
                                                type="email"
                                                required
                                                className="w-full bg-slate-50 border-none px-8 py-5 rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-bold text-slate-900 placeholder:text-slate-300"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="jack@twitter.com"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 px-2">Project Brief</label>
                                        <textarea
                                            rows="5"
                                            required
                                            className="w-full bg-slate-50 border-none px-8 py-5 rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all font-bold text-slate-900 placeholder:text-slate-300 min-h-[180px]"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            placeholder="Tell us what you're building..."
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-slate-900 text-white font-black py-6 rounded-2xl hover:bg-primary transition-all duration-300 flex items-center justify-center space-x-3 shadow-xl shadow-slate-900/10 hover:shadow-primary/20 active:scale-[0.98]"
                                    >
                                        {loading ? <span className="animate-pulse">PROCESSING...</span> : (
                                            <>
                                                <span className="tracking-[0.2em]">SEND MESSAGE</span>
                                                <Send className="w-5 h-5" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
