import React, { useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Layers, Briefcase, Clock3, CheckCircle2, ArrowRight, Mail } from 'lucide-react';

const DashboardHome = () => {
    const { user } = useContext(AuthContext);
    const [servicesCount, setServicesCount] = useState(0);
    const [projectsCount, setProjectsCount] = useState(0);
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!user?.token) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const [servicesRes, projectsRes, inquiriesRes] = await Promise.all([
                    axios.get('https://nidwa.com/api/services'),
                    axios.get('https://nidwa.com/api/projects'),
                    axios.get('https://nidwa.com/api/contact', {
                        headers: { Authorization: `Bearer ${user.token}` }
                    })
                ]);

                setServicesCount(servicesRes.data.length);
                setProjectsCount(projectsRes.data.length);
                setInquiries(
                    inquiriesRes.data.map((item) => ({
                        ...item,
                        status: item.status || 'pending'
                    }))
                );
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [user?.token]);

    const inquiryStats = useMemo(() => {
        return inquiries.reduce(
            (acc, inquiry) => {
                const currentStatus = inquiry.status || 'pending';
                if (currentStatus === 'proceed') acc.proceed += 1;
                else if (currentStatus === 'completed') acc.completed += 1;
                else acc.pending += 1;
                return acc;
            },
            { pending: 0, proceed: 0, completed: 0 }
        );
    }, [inquiries]);

    const totalInquiries = inquiries.length;
    const statusBars = [
        { key: 'pending', label: 'Pending', value: inquiryStats.pending, color: 'bg-amber-500' },
        { key: 'proceed', label: 'Proceed', value: inquiryStats.proceed, color: 'bg-blue-500' },
        { key: 'completed', label: 'Completed', value: inquiryStats.completed, color: 'bg-emerald-500' }
    ];

    const cards = [
        {
            label: 'Services',
            value: servicesCount,
            icon: Layers,
            accent: 'bg-indigo-500'
        },
        {
            label: 'Projects',
            value: projectsCount,
            icon: Briefcase,
            accent: 'bg-cyan-500'
        },
        {
            label: 'Pending Inquiries',
            value: inquiryStats.pending,
            icon: Clock3,
            accent: 'bg-amber-500'
        },
        {
            label: 'Completed Inquiries',
            value: inquiryStats.completed,
            icon: CheckCircle2,
            accent: 'bg-emerald-500'
        }
    ];

    const recentInquiries = useMemo(() => inquiries.slice(0, 5), [inquiries]);

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            <div>
                <h1 className="text-3xl font-black text-slate-800 dark:text-white">Dashboard Overview</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1 font-semibold">Live data from services, projects, and inquiries.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {cards.map((card) => (
                    <div key={card.label} className="bg-white dark:bg-[#171d2e] p-6 rounded-2xl shadow-sm border border-slate-200/70 dark:border-slate-800/70 flex items-center gap-4">
                        <div className={`${card.accent} w-12 h-12 rounded-xl text-white flex items-center justify-center shadow-lg shadow-black/10`}>
                            <card.icon className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-wide font-black text-slate-500 dark:text-slate-400">{card.label}</p>
                            <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">
                                {loading ? '--' : card.value}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7 bg-white dark:bg-[#171d2e] p-8 rounded-2xl border border-slate-200/70 dark:border-slate-800/70 shadow-sm">
                    <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 mb-8">Inquiry Status Chart</h3>
                    <div className="space-y-6">
                        {statusBars.map((item) => {
                            const percent = totalInquiries > 0 ? Math.round((item.value / totalInquiries) * 100) : 0;

                            return (
                                <div key={item.key} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-black text-slate-600 dark:text-slate-300">{item.label}</span>
                                        <span className="text-sm font-black text-slate-600 dark:text-slate-300">
                                            {item.value} ({percent}%)
                                        </span>
                                    </div>
                                    <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div className={`${item.color} h-full rounded-full transition-all`} style={{ width: `${percent}%` }}></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {totalInquiries === 0 && (
                        <p className="text-sm text-slate-400 dark:text-slate-500 font-semibold mt-6">No inquiries found yet.</p>
                    )}
                </div>

                <div className="lg:col-span-5 bg-white dark:bg-[#171d2e] p-8 rounded-2xl border border-slate-200/70 dark:border-slate-800/70 shadow-sm">
                    <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 mb-6">Recent Inquiries</h3>
                    <div className="space-y-4">
                        {recentInquiries.map((inquiry) => (
                            <div key={inquiry._id} className="p-4 rounded-xl border border-slate-200/70 dark:border-slate-800/70 bg-slate-50/60 dark:bg-slate-800/20">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <p className="font-black text-slate-800 dark:text-slate-100 text-sm">{inquiry.name}</p>
                                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">{inquiry.email}</p>
                                    </div>
                                    <span className="px-2.5 py-1 rounded-lg text-[10px] uppercase tracking-wide font-black bg-primary/10 text-primary">
                                        {inquiry.status}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-3 truncate">“{inquiry.message}”</p>
                            </div>
                        ))}
                    </div>
                    {recentInquiries.length === 0 && (
                        <div className="py-10 text-center text-slate-400 dark:text-slate-500">
                            <Mail className="w-10 h-10 mx-auto mb-3 opacity-60" />
                            <p className="font-semibold text-sm">No recent messages</p>
                        </div>
                    )}
                    <div className="pt-6 mt-6 border-t border-slate-200/70 dark:border-slate-800/70">
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-2">
                            Manage full inquiry workflow from inbox
                            <ArrowRight className="w-4 h-4" />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
