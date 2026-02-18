import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Lock, Moon, Sun, User as UserIcon, UserPlus } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';

const AdminRegister = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { register, user } = useContext(AuthContext);
    const { darkMode, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate('/admin/dashboard');
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            setTimeout(() => setError(''), 3000);
            return;
        }

        try {
            await register(username, password);
            navigate('/admin/dashboard');
        } catch (err) {
            const message = err?.response?.data?.message || 'Registration failed. Try another username.';
            setError(message);
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

            <div className="w-full max-w-[560px] bg-white dark:bg-[#171d2e] rounded-[2rem] shadow-2xl overflow-hidden border border-slate-200/70 dark:border-slate-800/80 animate-fade-in p-8 sm:p-12">
                <div className="mb-10">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                        <UserPlus className="w-7 h-7" />
                    </div>
                    <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-3">Create account.</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Register your admin account and access the dashboard.</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-6 py-4 rounded-xl mb-8 flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <span className="text-sm font-extrabold">{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-7">
                    <div className="relative group">
                        <label className="absolute -top-2.5 left-4 bg-white dark:bg-[#171d2e] px-2 text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest group-focus-within:text-primary transition-colors">
                            Username
                        </label>
                        <input
                            type="text"
                            className="admin-input py-4 pr-12"
                            placeholder="Choose username"
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
                            placeholder="Create password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600">
                            <Lock className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="relative group">
                        <label className="absolute -top-2.5 left-4 bg-white dark:bg-[#171d2e] px-2 text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-widest group-focus-within:text-primary transition-colors">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            className="admin-input py-4 pr-12"
                            placeholder="Repeat password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600">
                            <Lock className="w-5 h-5" />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary hover:bg-[#344d9f] text-white font-black py-4 rounded-xl shadow-xl shadow-primary/30 flex items-center justify-center space-x-3 transform active:scale-95 transition-all"
                    >
                        <span>REGISTER</span>
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </form>

                <div className="mt-10 text-center">
                    <p className="text-slate-500 dark:text-slate-400 font-bold text-sm">
                        Already have an account?{' '}
                        <Link to="/admin" className="text-primary hover:underline">
                            Log in.
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminRegister;
