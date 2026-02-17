import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { Laptop, Lock, User as UserIcon, Sun, Moon, ArrowRight } from 'lucide-react';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, user } = useContext(AuthContext);
    const { darkMode, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate('/admin/dashboard');
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            navigate('/admin/dashboard');
        } catch {
            setError('Account verification failed. Check credentials.');
            setTimeout(() => setError(''), 3000);
        }
    };

    return (
        <div className="min-h-screen bg-[#f2f7ff] dark:bg-[#111827] flex items-center justify-center p-4 sm:p-6 transition-colors duration-500">
            <button
                onClick={toggleTheme}
                className="fixed top-5 right-5 sm:top-8 sm:right-8 p-3 rounded-xl bg-white/95 dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700/70 text-slate-600 dark:text-slate-300 transition-all hover:scale-105 active:scale-95"
                aria-label="Toggle theme"
            >
                {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>

            <div className="w-full max-w-[1000px] flex bg-white dark:bg-[#171d2e] rounded-[2rem] lg:rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200/70 dark:border-slate-800/80 animate-fade-in">
                <div className="hidden lg:flex lg:w-1/2 bg-[#435ebe] p-16 flex-col justify-between relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary opacity-20 pointer-events-none"></div>
                    <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10 flex items-center space-x-3">
                        <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-md border border-white/20">
                            <Laptop className="text-white w-6 h-6" />
                        </div>
                        <span className="text-2xl font-black text-white">Nidwa ICT</span>
                    </div>

                    <div className="relative z-10 space-y-6">
                        <h2 className="text-5xl font-black text-white leading-tight">
                            Secure <br />
                            Management Portal
                        </h2>
                        <p className="text-blue-100 text-lg font-medium leading-relaxed max-w-sm">
                            Manage your enterprise ICT solutions, track portfolios, and handle client inquiries from one unified dashboard.
                        </p>
                    </div>

                    <div className="relative z-10 pt-10 border-t border-white/10">
                        <p className="text-white/60 text-xs font-bold uppercase tracking-widest">© 2026 Crafted with Excellence</p>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16">
                    <div className="mb-10 sm:mb-12">
                        <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-3">Log in.</h1>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Use your admin credentials to access the dashboard.</p>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-6 py-4 rounded-xl mb-8 flex items-center space-x-3 animate-pulse">
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            <span className="text-sm font-extrabold">{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="relative group">
                            <label className="absolute -top-2.5 left-4 bg-white dark:bg-[#171d2e] px-2 text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest group-focus-within:text-primary transition-colors">
                                Username
                            </label>
                            <input
                                type="text"
                                className="admin-input py-4 pr-12"
                                placeholder="Admin ID"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600">
                                <UserIcon className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="relative group">
                            <label className="absolute -top-2.5 left-4 bg-white dark:bg-[#171d2e] px-2 text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest group-focus-within:text-primary transition-colors">
                                Password
                            </label>
                            <input
                                type="password"
                                className="admin-input py-4 pr-12"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600">
                                <Lock className="w-5 h-5" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-3 mb-2">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary dark:bg-slate-800 dark:border-slate-600"
                                />
                                <label className="text-sm font-bold text-slate-600 dark:text-slate-400">Keep me logged in</label>
                            </div>
                            <a href="#" className="text-sm font-extrabold text-primary hover:underline">
                                Forgot?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary hover:bg-[#344d9f] text-white font-black py-4 rounded-xl shadow-xl shadow-primary/30 flex items-center justify-center space-x-3 transform active:scale-95 transition-all"
                        >
                            <span>LOG IN</span>
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </form>

                    <div className="mt-10 text-center">
                        <p className="text-slate-500 dark:text-slate-400 font-bold text-sm">
                            Don&apos;t have an account?{' '}
                            <a href="#" className="text-primary hover:underline">
                                Contact System Admin.
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
