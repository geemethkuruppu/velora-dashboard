import React from 'react';
import { Calendar, Plus } from 'lucide-react';
import StatsGrid from '../components/dashboard/StatsGrid';
import BookingTable from '../components/dashboard/BookingTable';
import { BookingChart, CategoryChart } from '../components/dashboard/DashboardWidgets';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    return (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Top Row: Stats (2/3) and Booking Chart (1/3) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <StatsGrid />
                </div>
                <div className="lg:col-span-1">
                    <BookingChart />
                </div>
            </div>

            {/* Bottom Row: Booking Table (2/3) and Category Chart (1/3) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <BookingTable />
                </div>
                <div className="lg:col-span-1">
                    <CategoryChart />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
