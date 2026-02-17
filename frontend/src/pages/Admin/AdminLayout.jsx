import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';
import { Laptop, LayoutDashboard, Layers, Briefcase, Mail, LogOut, Sun, Moon, User, Menu } from 'lucide-react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';

const AdminLayout = () => {
    const { user, logout } = useContext(AuthContext);
    const { darkMode, toggleTheme } = useContext(ThemeContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/admin');
    };

    const menuGroups = [
        {
            title: 'Menu',
            items: [{ label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' }]
        },
        {
            title: 'Content Management',
            items: [
                { label: 'Services', icon: Layers, path: '/admin/dashboard/services' },
                { label: 'Portfolio', icon: Briefcase, path: '/admin/dashboard/projects' },
                { label: 'Inquiries', icon: Mail, path: '/admin/dashboard/inquiries' }
            ]
        }
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="h-screen overflow-hidden flex bg-[#f2f7ff] dark:bg-[#111827] transition-colors duration-300">
            {sidebarOpen && (
                <button
                    type="button"
                    aria-label="Close sidebar"
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-[1px] lg:hidden"
                />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-50 w-72 h-screen transform transition-all duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:sticky lg:top-0 lg:translate-x-0 bg-white dark:bg-[#171d2e] border-r border-slate-200/70 dark:border-slate-800/80 shadow-xl shadow-slate-900/5 dark:shadow-black/20`}
            >
                <div className="flex flex-col h-full">
                    <div className="p-8 pb-4">
                        <div className="flex items-center space-x-3">
                            <div className="bg-primary p-2.5 rounded-xl shadow-lg shadow-primary/30">
                                <Laptop className="text-white w-6 h-6" />
                            </div>
                            <span className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">
                                Nidwa <span className="text-primary">ICT</span>
                            </span>
                        </div>
                    </div>

                    <div className="px-8 py-4 flex items-center justify-between border-b border-slate-200/70 dark:border-slate-800/70">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center">
                                <User className="w-4 h-4 text-slate-500 dark:text-slate-300" />
                            </div>
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-200 capitalize truncate max-w-[120px]">
                                {user?.username || 'Admin'}
                            </span>
                        </div>
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:text-primary transition-all active:scale-95"
                            aria-label="Toggle theme"
                        >
                            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </button>
                    </div>

                    <nav className="flex-1 px-4 py-8 overflow-y-auto space-y-8 no-scrollbar">
                        {menuGroups.map((group, gIdx) => (
                            <div key={gIdx} className="space-y-4">
                                <h4 className="px-4 text-[11px] font-black uppercase tracking-[2px] text-slate-400 dark:text-slate-500">
                                    {group.title}
                                </h4>
                                <div className="space-y-1.5">
                                    {group.items.map((item, iIdx) => (
                                        <Link
                                            key={iIdx}
                                            to={item.path}
                                            className={`flex items-center space-x-4 px-6 py-4 rounded-2xl font-black transition-all duration-200 group ${isActive(item.path)
                                                ? 'bg-primary text-white shadow-xl shadow-primary/25'
                                                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-primary dark:hover:text-primary'
                                                }`}
                                        >
                                            <item.icon
                                                className={`w-[20px] h-[20px] transition-colors ${isActive(item.path)
                                                    ? 'text-white'
                                                    : 'text-slate-400 dark:text-slate-500 group-hover:text-primary dark:group-hover:text-primary'
                                                    }`}
                                            />
                                            <span className="text-[15px]">{item.label}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </nav>

                    <div className="p-6">
                        <button
                            onClick={handleLogout}
                            className="flex items-center justify-center space-x-3 w-full p-4 rounded-xl font-black text-red-500 bg-red-50 dark:bg-red-500/10 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                        >
                            <LogOut className="w-5 h-5" />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            </aside>

            <div className="flex-1 h-screen flex flex-col min-w-0 overflow-hidden">
                <header className="sticky top-0 z-30 h-24 flex items-center justify-between px-8 lg:px-12 bg-[#f2f7ff]/80 dark:bg-[#111827]/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/70">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-3 rounded-2xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-sm border border-slate-200 dark:border-slate-700/80 hover:text-primary lg:hidden"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    <div className="flex-1"></div>

                    <div className="flex items-center space-x-6">
                        <div className="hidden sm:flex flex-col text-right">
                            <span className="text-sm font-black text-slate-900 dark:text-slate-100 capitalize">
                                {user?.username || 'Admin User'}
                            </span>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                                System Manager
                            </span>
                        </div>
                        <div className="p-1 rounded-full border-2 border-primary/20 ring-4 ring-primary/5">
                            <div className="w-11 h-11 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center border-2 border-white dark:border-slate-700 shadow-md">
                                <User className="text-slate-500 dark:text-slate-300 w-6 h-6" />
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto px-8 py-4 lg:px-12 no-scrollbar">
                    <Outlet />
                    <footer className="mt-20 py-10 border-t border-slate-200 dark:border-slate-800/70 text-center">
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">
                            © 2026 Nidwa ICT <span className="mx-3 text-slate-300 dark:text-slate-700">|</span>{' '}
                            <span className="text-primary italic">Crafted with Excellence</span>
                        </p>
                    </footer>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
