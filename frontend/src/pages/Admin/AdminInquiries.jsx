import React, { useState, useEffect, useContext, useMemo } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Mail, Search, Trash2, Clock, CheckCircle2, PlayCircle, AlertCircle } from 'lucide-react';

const statusMeta = {
    pending: {
        label: 'Pending',
        badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
        button: 'border-amber-300 text-amber-600 dark:border-amber-500/40 dark:text-amber-400 hover:bg-amber-500 hover:text-white'
    },
    proceed: {
        label: 'Proceed',
        badge: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
        button: 'border-blue-300 text-blue-600 dark:border-blue-500/40 dark:text-blue-400 hover:bg-blue-500 hover:text-white'
    },
    completed: {
        label: 'Completed',
        badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
        button: 'border-emerald-300 text-emerald-600 dark:border-emerald-500/40 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white'
    }
};

const normalizeStatus = (value) => (['pending', 'proceed', 'completed'].includes(value) ? value : 'pending');

const AdminInquiries = () => {
    const { user } = useContext(AuthContext);
    const [inquiries, setInquiries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeActionId, setActiveActionId] = useState('');

    const fetchInquiries = async () => {
        const { data } = await axios.get('https://nidwa.com/api/contact', {
            headers: { Authorization: `Bearer ${user.token}` }
        });

        setInquiries(
            data.map((item) => ({
                ...item,
                status: normalizeStatus(item.status)
            }))
        );
    };

    useEffect(() => {
        if (!user?.token) return;
        fetchInquiries();
    }, [user?.token]);

    const stats = useMemo(() => {
        return inquiries.reduce(
            (acc, inquiry) => {
                const status = normalizeStatus(inquiry.status);
                acc.total += 1;
                acc[status] += 1;
                return acc;
            },
            { total: 0, pending: 0, proceed: 0, completed: 0 }
        );
    }, [inquiries]);

    const filteredInquiries = useMemo(() => {
        if (!searchTerm.trim()) return inquiries;
        const keyword = searchTerm.toLowerCase().trim();

        return inquiries.filter((inquiry) => {
            return (
                inquiry.name.toLowerCase().includes(keyword) ||
                inquiry.email.toLowerCase().includes(keyword) ||
                inquiry.message.toLowerCase().includes(keyword) ||
                normalizeStatus(inquiry.status).includes(keyword)
            );
        });
    }, [inquiries, searchTerm]);

    const handleStatusUpdate = async (inquiryId, status) => {
        const actionKey = `${inquiryId}-${status}`;
        setActiveActionId(actionKey);

        try {
            const headers = { Authorization: `Bearer ${user.token}` };

            try {
                await axios.put(
                    `https://nidwa.com/api/contact/${inquiryId}/status`,
                    { status },
                    { headers }
                );
            } catch (error) {
                if (error?.response?.status !== 404) throw error;

                await axios.put(
                    `https://nidwa.com/api/contact/${inquiryId}`,
                    { status },
                    { headers }
                );
            }

            setInquiries((prev) =>
                prev.map((item) => (item._id === inquiryId ? { ...item, status } : item))
            );
        } catch (error) {
            console.error(error);
        } finally {
            setActiveActionId('');
        }
    };

    const handleDelete = async (inquiryId) => {
        if (!window.confirm('Delete this inquiry?')) return;

        setActiveActionId(inquiryId);
        try {
            const headers = { Authorization: `Bearer ${user.token}` };

            try {
                await axios.delete(`https://nidwa.com/api/contact/${inquiryId}`, { headers });
            } catch (error) {
                if (error?.response?.status !== 404) throw error;
                await axios.delete(`https://nidwa.com/api/contact/delete/${inquiryId}`, { headers });
            }

            setInquiries((prev) => prev.filter((item) => item._id !== inquiryId));
        } catch (error) {
            console.error(error);
        } finally {
            setActiveActionId('');
        }
    };

    return (
        <div className="space-y-10 animate-fade-in pb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 dark:text-white">Inquiry Inbox</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 font-bold italic">Manage status workflow and customer requests.</p>
                </div>
                <div className="admin-search-shell">
                    <Search className="w-5 h-5 text-slate-400" />
                    <input
                        className="admin-search-input"
                        placeholder="Filter inquiries..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <div className="bg-primary p-6 rounded-2xl text-white shadow-xl shadow-primary/30">
                    <p className="text-[11px] font-black uppercase tracking-[2px] text-white/80">Total Inquiries</p>
                    <h3 className="text-3xl font-black mt-2">{stats.total}</h3>
                </div>
                <div className="bg-white dark:bg-[#171d2e] p-6 rounded-2xl border border-slate-200/70 dark:border-slate-800/70 shadow-sm">
                    <p className="text-[11px] font-black uppercase tracking-[2px] text-slate-500 dark:text-slate-400">Pending</p>
                    <h3 className="text-3xl font-black mt-2 text-amber-500">{stats.pending}</h3>
                </div>
                <div className="bg-white dark:bg-[#171d2e] p-6 rounded-2xl border border-slate-200/70 dark:border-slate-800/70 shadow-sm">
                    <p className="text-[11px] font-black uppercase tracking-[2px] text-slate-500 dark:text-slate-400">Proceed</p>
                    <h3 className="text-3xl font-black mt-2 text-blue-500">{stats.proceed}</h3>
                </div>
                <div className="bg-white dark:bg-[#171d2e] p-6 rounded-2xl border border-slate-200/70 dark:border-slate-800/70 shadow-sm">
                    <p className="text-[11px] font-black uppercase tracking-[2px] text-slate-500 dark:text-slate-400">Completed</p>
                    <h3 className="text-3xl font-black mt-2 text-emerald-500">{stats.completed}</h3>
                </div>
            </div>

            <div className="space-y-6">
                {filteredInquiries.map((inquiry) => {
                    const status = normalizeStatus(inquiry.status);
                    const statusInfo = statusMeta[status];
                    const isDeleting = activeActionId === inquiry._id;

                    return (
                        <div key={inquiry._id} className="bg-white dark:bg-[#171d2e] p-8 rounded-2xl border border-slate-200/70 dark:border-slate-800/70 shadow-sm">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-primary text-xl uppercase">
                                        {inquiry.name[0]}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-slate-800 dark:text-white">{inquiry.name}</h3>
                                        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{inquiry.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <div className="flex items-center justify-end gap-2 text-slate-400 dark:text-slate-500 font-black text-[10px] uppercase tracking-widest mb-1">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span>Received</span>
                                        </div>
                                        <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                            {new Date(inquiry.date || inquiry.createdAt).toLocaleDateString(undefined, {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <span className={`px-3 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-wider ${statusInfo.badge}`}>
                                        {statusInfo.label}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-slate-50 dark:bg-slate-800/40 p-6 rounded-xl border border-slate-200/70 dark:border-slate-700/60">
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
                                    {inquiry.message}
                                </p>
                            </div>

                            <div className="flex flex-wrap justify-end mt-6 gap-3">
                                {(['pending', 'proceed', 'completed']).map((nextStatus) => {
                                    const isActive = status === nextStatus;
                                    const isUpdating = activeActionId === `${inquiry._id}-${nextStatus}`;
                                    const icon = nextStatus === 'pending' ? AlertCircle : nextStatus === 'proceed' ? PlayCircle : CheckCircle2;
                                    const ActionIcon = icon;

                                    return (
                                        <button
                                            key={nextStatus}
                                            onClick={() => handleStatusUpdate(inquiry._id, nextStatus)}
                                            disabled={isActive || isUpdating || isDeleting}
                                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-black border transition-all ${statusMeta[nextStatus].button} ${isActive ? 'opacity-45 cursor-not-allowed' : ''}`}
                                        >
                                            <ActionIcon className="w-4 h-4" />
                                            <span>{isUpdating ? 'Updating...' : statusMeta[nextStatus].label}</span>
                                        </button>
                                    );
                                })}
                                <button
                                    onClick={() => handleDelete(inquiry._id)}
                                    disabled={isDeleting}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-black border border-red-300 text-red-500 dark:border-red-500/40 hover:bg-red-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {filteredInquiries.length === 0 && (
                <div className="bg-white dark:bg-[#171d2e] p-14 rounded-2xl border border-slate-200/70 dark:border-slate-800/70 text-center text-slate-400 dark:text-slate-500">
                    <Mail className="w-14 h-14 mx-auto mb-4 opacity-60" />
                    <p className="font-black uppercase tracking-widest text-sm">No inquiries match this filter</p>
                </div>
            )}
        </div>
    );
};

export default AdminInquiries;
