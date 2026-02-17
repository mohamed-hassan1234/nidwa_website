import React, { useState, useEffect, useContext, useMemo } from 'react';
import axios from 'axios';
import * as LucideIcons from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { Plus, Trash2, Layers, Search } from 'lucide-react';

const AdminServices = () => {
    const { user } = useContext(AuthContext);
    const [services, setServices] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [newService, setNewService] = useState({ title: '', description: '', iconName: 'Monitor' });

    const resolveIcon = (iconName) => {
        const iconKey = typeof iconName === 'string' ? iconName.trim() : '';
        return LucideIcons[iconKey] || Layers;
    };

    const fetchServices = async () => {
        const { data } = await axios.get('https://nidwa.com/api/services');
        setServices(data);
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const filteredServices = useMemo(() => {
        if (!searchTerm.trim()) return services;

        const keyword = searchTerm.toLowerCase().trim();
        return services.filter((service) => {
            return (
                service.title.toLowerCase().includes(keyword) ||
                service.description.toLowerCase().includes(keyword) ||
                (service.iconName || '').toLowerCase().includes(keyword)
            );
        });
    }, [services, searchTerm]);

    const handleCreate = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        const payload = {
            title: newService.title.trim(),
            description: newService.description.trim(),
            iconName: newService.iconName.trim() || 'Layers'
        };

        try {
            await axios.post('https://nidwa.com/api/services', payload, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setNewService({ title: '', description: '', iconName: 'Monitor' });
            fetchServices();
        } catch (error) {
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this service?')) return;
        await axios.delete(`https://nidwa.com/api/services/${id}`, {
            headers: { Authorization: `Bearer ${user.token}` }
        });
        fetchServices();
    };

    const CurrentIconPreview = resolveIcon(newService.iconName);

    return (
        <div className="space-y-10 animate-fade-in pb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 dark:text-white">Services Management</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 font-bold italic">Manage your ICT technical offerings.</p>
                </div>
                <div className="admin-search-shell">
                    <Search className="w-5 h-5 text-slate-400" />
                    <input
                        className="admin-search-input"
                        placeholder="Search services..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-4">
                    <div className="bg-white dark:bg-[#171d2e] p-10 rounded-[2rem] border border-slate-200/70 dark:border-slate-800/70 shadow-sm sticky top-8">
                        <div className="flex items-center space-x-4 mb-10">
                            <div className="bg-primary/10 p-3 rounded-xl text-primary shadow-inner"><Plus className="w-6 h-6" /></div>
                            <h3 className="text-xl font-black dark:text-white">New Service</h3>
                        </div>
                        <form onSubmit={handleCreate} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Service Title</label>
                                <input
                                    className="admin-input"
                                    placeholder="e.g. Cloud Infrastructure"
                                    value={newService.title}
                                    onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Icon Name</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        className="admin-input"
                                        placeholder="e.g. Monitor, Shield, Cloud"
                                        value={newService.iconName}
                                        onChange={(e) => setNewService({ ...newService, iconName: e.target.value })}
                                    />
                                    <div className="w-12 h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#101827] text-primary flex items-center justify-center shadow-sm">
                                        <CurrentIconPreview className="w-5 h-5" />
                                    </div>
                                </div>
                                <p className="text-xs font-medium text-slate-400 dark:text-slate-500">Use a Lucide icon name; unknown names fallback to `Layers`.</p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Description</label>
                                <textarea
                                    className="admin-textarea"
                                    rows="5"
                                    placeholder="Brief technical description..."
                                    value={newService.description}
                                    onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="w-full bg-primary text-white font-black py-4 rounded-xl shadow-xl shadow-primary/20 hover:scale-[1.01] transition-all transform active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isSaving ? 'Saving...' : 'Create Service'}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="lg:col-span-8">
                    <div className="bg-white dark:bg-[#171d2e] rounded-[2rem] border border-slate-200/70 dark:border-slate-800/70 overflow-hidden shadow-sm">
                        <div className="p-8 border-b border-slate-200/70 dark:border-slate-800/50 flex items-center justify-between">
                            <h3 className="text-lg font-black text-slate-700 dark:text-white">Active Services</h3>
                            <span className="text-primary font-black text-xs uppercase tracking-wider">{filteredServices.length} items</span>
                        </div>
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/70 dark:bg-slate-800/30 text-slate-500 dark:text-slate-400">
                                <tr className="text-[10px] font-black uppercase tracking-[2px]">
                                    <th className="p-6">Icon</th>
                                    <th className="p-6">Service</th>
                                    <th className="p-6">Overview</th>
                                    <th className="p-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800">
                                {filteredServices.map((service) => {
                                    const ServiceIcon = resolveIcon(service.iconName);

                                    return (
                                        <tr key={service._id} className="hover:bg-slate-50/80 dark:hover:bg-primary/5 transition-colors group">
                                            <td className="p-6">
                                                <div className="bg-primary/10 w-11 h-11 rounded-xl text-primary inline-flex items-center justify-center shadow-inner">
                                                    <ServiceIcon className="w-5 h-5" />
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <span className="font-black text-slate-800 dark:text-white text-[15px]">{service.title}</span>
                                            </td>
                                            <td className="p-6 font-semibold text-slate-500 dark:text-slate-400 text-xs leading-relaxed max-w-[260px] truncate">
                                                {service.description}
                                            </td>
                                            <td className="p-6 text-right">
                                                <button
                                                    onClick={() => handleDelete(service._id)}
                                                    className="p-2.5 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        {filteredServices.length === 0 && (
                            <div className="p-20 text-center text-slate-400 dark:text-slate-500">
                                <Layers className="w-14 h-14 mx-auto mb-4 opacity-60" />
                                <p className="font-black uppercase tracking-widest text-sm">No services found</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminServices;
