import React, { useState, useEffect } from 'react';
import { Search, Plus, Minus, AlertCircle, Package, Calendar, History, X } from 'lucide-react';
import InventoryService from '../services/inventoryService';
import { motion, AnimatePresence } from 'framer-motion';

const Inventory = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [inventory, setInventory] = useState([]);
    const [stats, setStats] = useState({ total_items: 0, low_stock_count: 0, reserved_items_count: 0 });
    const [loading, setLoading] = useState(true);
    const [filterLowStock, setFilterLowStock] = useState(false);

    // View States
    const [showReservations, setShowReservations] = useState(false);
    const [showEvents, setShowEvents] = useState(false);
    const [reservations, setReservations] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchData();
        fetchStats();
    }, [filterLowStock]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await InventoryService.getInventory(filterLowStock);
            setInventory(data);
        } catch (error) {
            console.error("Failed to fetch inventory", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const data = await InventoryService.getStats();
            setStats(data);
        } catch (error) {
            console.error("Failed to fetch stats", error);
        }
    };

    const handleShowReservations = async () => {
        try {
            const data = await InventoryService.getReservations();
            setReservations(data);
            setShowReservations(true);
        } catch (error) {
            console.error("Failed to fetch reservations", error);
        }
    };

    const handleShowEvents = async () => {
        try {
            const data = await InventoryService.getEvents();
            setEvents(data);
            setShowEvents(true);
        } catch (error) {
            console.error("Failed to fetch events", error);
        }
    };

    const filteredInventory = inventory.filter(item =>
        item.variant_sku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.variant_id?.toString().includes(searchTerm)
    );

    return (
        <div className="flex flex-col gap-8 animate-in fade-in duration-500 relative">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-[1.8rem] font-bold text-text-main">Inventory Management</h1>
                    <p className="text-text-dim text-sm mt-2">Monitor and adjust stock levels across your catalog.</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={handleShowReservations}
                        className="flex items-center gap-2 px-4 py-2 border border-border rounded-md text-text-muted hover:text-text-main hover:border-primary/50 transition-all bg-dark-hover/30"
                    >
                        <Calendar size={16} />
                        <span className="text-sm font-medium">Reservations</span>
                    </button>
                    <button
                        onClick={handleShowEvents}
                        className="flex items-center gap-2 px-4 py-2 border border-border rounded-md text-text-muted hover:text-text-main hover:border-primary/50 transition-all bg-dark-hover/30"
                    >
                        <History size={16} />
                        <span className="text-sm font-medium">Events</span>
                    </button>
                    <button className="primary-btn">Bulk Update</button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card flex flex-col gap-1">
                    <p className="text-[0.8rem] text-text-muted font-medium uppercase tracking-wider">Total SKUs</p>
                    <h3 className="text-2xl font-bold text-text-main">{stats.total_items}</h3>
                </div>
                <div className="glass-card flex flex-col gap-1 border-rose-500/20">
                    <p className="text-[0.8rem] text-rose-400 font-medium uppercase tracking-wider">Low Stock Alerts</p>
                    <h3 className="text-2xl font-bold text-rose-400">{stats.low_stock_count}</h3>
                </div>
                <div className="glass-card flex flex-col gap-1">
                    <p className="text-[0.8rem] text-text-muted font-medium uppercase tracking-wider">Reserved Items</p>
                    <h3 className="text-2xl font-bold text-text-main">{stats.reserved_items_count}</h3>
                </div>
            </div>

            <div className="glass-card !p-0 overflow-hidden">
                <div className="p-6 flex justify-between items-center border-b border-border">
                    <div className="flex items-center bg-dark-hover border border-border px-4 py-2.5 rounded-md w-[350px] gap-3">
                        <Search size={18} className="text-text-muted" />
                        <input
                            type="text"
                            placeholder="Search by SKU or ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-transparent border-none text-text-main w-full focus:outline-none text-sm"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilterLowStock(false)}
                            className={`px-4 py-2 border-b-2 text-sm font-bold transition-colors ${!filterLowStock ? 'border-primary text-primary' : 'border-transparent text-text-muted hover:text-text-main'}`}
                        >
                            All Items
                        </button>
                        <button
                            onClick={() => setFilterLowStock(true)}
                            className={`px-4 py-2 border-b-2 text-sm font-semibold transition-colors flex items-center gap-2 ${filterLowStock ? 'border-rose-500 text-rose-400' : 'border-transparent text-text-muted hover:text-rose-400'}`}
                        >
                            Low Stock
                            {stats.low_stock_count > 0 && (
                                <span className="px-1.5 py-0.5 bg-rose-500/20 text-rose-400 text-[10px] rounded">{stats.low_stock_count}</span>
                            )}
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="px-6 py-4 text-text-muted text-[0.75rem] font-semibold uppercase tracking-wider">Product / SKU</th>
                                <th className="px-6 py-4 text-text-muted text-[0.75rem] font-semibold uppercase tracking-wider">Current Stock</th>
                                <th className="px-6 py-4 text-text-muted text-[0.75rem] font-semibold uppercase tracking-wider">Reserved</th>
                                <th className="px-6 py-4 text-text-muted text-[0.75rem] font-semibold uppercase tracking-wider text-right">Adjustment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="4" className="px-6 py-8 text-center text-text-dim">Loading inventory...</td></tr>
                            ) : filteredInventory.length === 0 ? (
                                <tr><td colSpan="4" className="px-6 py-8 text-center text-text-dim">No items found.</td></tr>
                            ) : (
                                filteredInventory.map(item => {
                                    const isLowStock = item.available_quantity < 5;
                                    return (
                                        <tr key={item.variant_id} className="border-b border-border hover:bg-dark-hover/50 transition-colors group">
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-dark-hover border border-border rounded flex items-center justify-center text-text-muted group-hover:text-primary transition-colors">
                                                        <Package size={18} />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-text-main">{item.product_name || `Variant #${item.variant_id}`}</p>
                                                        <p className="text-[0.75rem] text-primary font-mono mt-0.5">{item.variant_sku}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex flex-col">
                                                    <span className={`text-sm font-bold ${isLowStock ? 'text-rose-400' : 'text-text-main'}`}>
                                                        {item.available_quantity} available
                                                    </span>
                                                    <span className="text-xs text-text-dim">Total: {item.total_quantity}</span>
                                                    {isLowStock && (
                                                        <span className="text-[0.7rem] text-rose-400/80 flex items-center gap-1 font-medium italic mt-1">
                                                            <AlertCircle size={10} /> low stock
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-sm font-medium text-text-dim">{item.reserved_quantity} units</td>
                                            <td className="px-6 py-5 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button className="w-9 h-9 rounded-lg bg-dark-hover border border-border flex items-center justify-center text-text-dim hover:text-rose-400 hover:border-rose-500/30 transition-all">
                                                        <Minus size={16} />
                                                    </button>
                                                    <button className="w-9 h-9 rounded-lg bg-dark-hover border border-border flex items-center justify-center text-text-dim hover:text-emerald-400 hover:border-emerald-500/30 transition-all">
                                                        <Plus size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Reservations Modal */}
            <AnimatePresence>
                {showReservations && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowReservations(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                            className="glass-card w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col !p-0"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="p-6 border-b border-border flex justify-between items-center bg-white/5">
                                <h2 className="text-xl font-bold text-text-main">Inventory Reservations</h2>
                                <button onClick={() => setShowReservations(false)}><X className="text-text-dim hover:text-text-main" /></button>
                            </div>
                            <div className="p-0 overflow-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-white/5 text-text-muted sticky top-0">
                                        <tr>
                                            <th className="px-6 py-3">Order ID</th>
                                            <th className="px-6 py-3">Variant ID</th>
                                            <th className="px-6 py-3">Qty</th>
                                            <th className="px-6 py-3">Status</th>
                                            <th className="px-6 py-3">Created At</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/20">
                                        {reservations.map(res => (
                                            <tr key={res.id} className="hover:bg-white/5">
                                                <td className="px-6 py-4 font-mono text-xs text-text-dim">{res.order_id}</td>
                                                <td className="px-6 py-4 font-bold text-text-main">{res.variant_id}</td>
                                                <td className="px-6 py-4">{res.quantity}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${res.status === 'ACTIVE' ? 'bg-blue-500/20 text-blue-400' :
                                                        res.status === 'CONFIRMED' ? 'bg-emerald-500/20 text-emerald-400' :
                                                            'bg-gray-500/20 text-gray-400'
                                                        }`}>{res.status}</span>
                                                </td>
                                                <td className="px-6 py-4 text-text-dim text-xs">{new Date(res.created_at).toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Events Modal */}
            <AnimatePresence>
                {showEvents && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowEvents(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                            className="glass-card w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col !p-0"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="p-6 border-b border-border flex justify-between items-center bg-white/5">
                                <h2 className="text-xl font-bold text-text-main">Inventory Events Log</h2>
                                <button onClick={() => setShowEvents(false)}><X className="text-text-dim hover:text-text-main" /></button>
                            </div>
                            <div className="p-0 overflow-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-white/5 text-text-muted sticky top-0">
                                        <tr>
                                            <th className="px-6 py-3">Event Type</th>
                                            <th className="px-6 py-3">Variant ID</th>
                                            <th className="px-6 py-3">Order ID</th>
                                            <th className="px-6 py-3">Qty</th>
                                            <th className="px-6 py-3">Timestamp</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/20">
                                        {events.map(ev => (
                                            <tr key={ev.id} className="hover:bg-white/5">
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${ev.event_type === 'STOCK_ADDED' ? 'bg-emerald-500/20 text-emerald-400' :
                                                        ev.event_type === 'RESERVED' ? 'bg-amber-500/20 text-amber-400' :
                                                            'bg-gray-500/20 text-gray-400'
                                                        }`}>{ev.event_type}</span>
                                                </td>
                                                <td className="px-6 py-4 font-bold text-text-main">{ev.variant_id}</td>
                                                <td className="px-6 py-4 font-mono text-xs text-text-dim">{ev.order_id || '-'}</td>
                                                <td className="px-6 py-4">{ev.quantity}</td>
                                                <td className="px-6 py-4 text-text-dim text-xs">{new Date(ev.timestamp).toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default Inventory;
