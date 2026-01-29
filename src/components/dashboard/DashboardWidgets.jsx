import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    ResponsiveContainer,
    Cell
} from 'recharts';
import { ChevronDown } from 'lucide-react';

const chartData = [
    { name: 'January', value: 455, color: '#000B18' },
    { name: 'February', value: 350, color: '#FF4181', change: '-10%' },
    { name: 'March', value: 222, color: '#E8EAF6' },
];

export const BookingChart = () => (
    <div className="bg-white rounded-[32px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-black/5 flex flex-col h-[280px]">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h3 className="text-base font-bold text-primary tracking-tight">Booking</h3>
                <p className="text-text-muted text-[9px] font-medium mt-0.5">Monthly booking avg. rating</p>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 border border-black/5 rounded-lg text-[9px] font-bold text-primary cursor-pointer hover:bg-gray-100 transition-all">
                Quantity <ChevronDown size={10} />
            </div>
        </div>

        <div className="flex-1 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <Bar dataKey="value" radius={[8, 8, 8, 8]} barSize={40}>
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Bar>
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        fontSize={9}
                        fontWeight="bold"
                        tick={{ fill: '#A0AEC0' }}
                        dy={8}
                    />
                </BarChart>
            </ResponsiveContainer>

            {/* Overlay Change Tag for February */}
            <div className="absolute top-[35%] left-[45%] bg-rose-50 text-rose-500 text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-rose-100">
                -10%
            </div>
        </div>

        <div className="flex justify-between mt-3 px-2">
            {chartData.map((d, i) => (
                <span key={i} className="text-xs font-bold text-primary">{d.value}</span>
            ))}
        </div>
    </div>
);

export const CategoryChart = () => (
    <div className="bg-white rounded-[32px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-black/5 flex flex-col h-[400px]">
        <div className="flex justify-between items-start mb-8">
            <div>
                <h3 className="text-base font-bold text-primary tracking-tight">Top category</h3>
                <p className="text-text-muted text-[9px] font-medium mt-0.5">Most booked room weekly</p>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 border border-black/5 rounded-lg text-[9px] font-bold text-primary cursor-pointer hover:bg-gray-100 transition-all">
                Weekly <ChevronDown size={10} />
            </div>
        </div>

        <div className="flex-1 flex items-center justify-center relative scale-90">
            {/* Custom Circle Layout inspired by design */}
            <div className="relative w-64 h-64">
                {/* Main Black Circle */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary rounded-full flex flex-col items-center justify-center text-white border-[8px] border-white shadow-xl z-20">
                    <span className="text-3xl font-bold">56%</span>
                    <span className="text-[9px] uppercase tracking-widest font-bold opacity-60">Bookings</span>
                </div>

                {/* Blue Circle */}
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#7C4DFF] rounded-full flex flex-col items-center justify-center text-white border-[8px] border-white shadow-xl z-30">
                    <span className="text-2xl font-bold">30%</span>
                    <span className="text-[8px] uppercase tracking-widest font-bold opacity-60">Bookings</span>
                </div>

                {/* Lavender Circle */}
                <div className="absolute bottom-4 right-0 w-28 h-28 bg-[#D1C4E9] rounded-full flex flex-col items-center justify-center text-primary border-[6px] border-white shadow-xl z-10">
                    <span className="text-xl font-bold">14%</span>
                    <span className="text-[7px] uppercase tracking-widest font-bold opacity-40">Bookedings</span>
                </div>
            </div>
        </div>
    </div>
);

const DashboardWidgets = () => {
    return (
        <div className="flex flex-col gap-6">
            <BookingChart />
            <CategoryChart />
        </div>
    );
};

export default DashboardWidgets;
