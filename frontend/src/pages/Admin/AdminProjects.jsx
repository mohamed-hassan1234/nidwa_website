import React, { useState, useEffect, useContext, useMemo } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Plus, Trash2, ExternalLink, Search, Briefcase } from 'lucide-react';

const AdminProjects = () => {
    const { user } = useContext(AuthContext);
    const [projects, setProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [newProject, setNewProject] = useState({ title: '', category: '', imageUrl: '' });

    const fetchProjects = async () => {
        const { data } = await axios.get('https://nidwa.com/api/projects');
        setProjects(data);
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const filteredProjects = useMemo(() => {
        if (!searchTerm.trim()) return projects;
        const keyword = searchTerm.toLowerCase().trim();

        return projects.filter((project) => {
            return project.title.toLowerCase().includes(keyword) || project.category.toLowerCase().includes(keyword);
        });
    }, [projects, searchTerm]);

    const handleCreate = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        const payload = {
            title: newProject.title.trim(),
            category: newProject.category.trim(),
            imageUrl: newProject.imageUrl.trim()
        };

        try {
            await axios.post('https://nidwa.com/api/projects', payload, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setNewProject({ title: '', category: '', imageUrl: '' });
            fetchProjects();
        } catch (error) {
            console.error(error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this project?')) return;
        await axios.delete(`https://nidwa.com/api/projects/${id}`, {
            headers: { Authorization: `Bearer ${user.token}` }
        });
        fetchProjects();
    };

    return (
        <div className="space-y-10 animate-fade-in pb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 dark:text-white">Portfolio Management</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 font-bold italic">Showcase your ICT success stories.</p>
                </div>
                <div className="admin-search-shell">
                    <Search className="w-5 h-5 text-slate-400" />
                    <input
                        className="admin-search-input"
                        placeholder="Search projects..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white dark:bg-[#171d2e] p-10 rounded-[2rem] border border-slate-200/70 dark:border-slate-800/70 shadow-sm">
                <div className="flex items-center space-x-3 mb-10">
                    <div className="bg-primary/10 p-2.5 rounded-xl text-primary shadow-inner"><Plus className="w-5 h-5" /></div>
                    <h3 className="text-xl font-black dark:text-white">Create New Portfolio Entry</h3>
                </div>
                <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Project Name</label>
                        <input
                            className="admin-input"
                            placeholder="Enter project title"
                            value={newProject.title}
                            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Category</label>
                        <input
                            className="admin-input"
                            placeholder="e.g. Cloud Services"
                            value={newProject.category}
                            onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-1">Cover Image URL</label>
                        <input
                            className="admin-input"
                            placeholder="https://..."
                            value={newProject.imageUrl}
                            onChange={(e) => setNewProject({ ...newProject, imageUrl: e.target.value })}
                            required
                        />
                    </div>
                    <div className="md:col-span-2 lg:col-span-3">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="w-full bg-primary text-white font-black py-4 rounded-xl shadow-xl shadow-primary/20 hover:scale-[1.01] transition-all transform active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isSaving ? 'Saving...' : 'Add Project to Portfolio'}
                        </button>
                    </div>
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                    <div key={project._id} className="bg-white dark:bg-[#171d2e] rounded-[2rem] border border-slate-200/70 dark:border-slate-800/70 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group relative">
                        <div className="relative h-64 overflow-hidden">
                            <img src={project.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={project.title} />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                            <div className="absolute top-6 left-6">
                                <span className="bg-primary/90 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-xl shadow-lg">
                                    {project.category}
                                </span>
                            </div>
                        </div>
                        <div className="p-8 pt-7">
                            <h3 className="text-lg font-black text-slate-800 dark:text-white leading-tight mb-6">{project.title}</h3>
                            <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800/70">
                                <button className="flex items-center space-x-2 text-primary font-black text-xs uppercase group-hover:underline">
                                    <ExternalLink className="w-4 h-4" />
                                    <span>View Details</span>
                                </button>
                                <button
                                    onClick={() => handleDelete(project._id)}
                                    className="bg-red-50 dark:bg-red-500/10 text-red-500 p-2.5 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredProjects.length === 0 && (
                <div className="bg-white dark:bg-[#171d2e] border border-slate-200/70 dark:border-slate-800/70 rounded-[2rem] p-12 text-center text-slate-400 dark:text-slate-500">
                    <Briefcase className="w-14 h-14 mx-auto mb-4 opacity-60" />
                    <p className="font-black uppercase tracking-widest text-sm">No projects found</p>
                </div>
            )}
        </div>
    );
};

export default AdminProjects;
