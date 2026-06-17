import React from 'react';
import { Users, HeartPulse, DollarSign, Activity } from 'lucide-react';
import { Card } from '@heroui/react';

const CommunityImpactStats = () => {

  const statsData = [
    {
      id: "total-donors",
      count: "14,250+",
      label: "Active Donors",
      icon: Users,
      isHighlighted: false,
    },
    {
      id: "total-funding",
      count: "$48,900+",
      label: "Total Funding",
      icon: DollarSign,
      isHighlighted: true,
    },
    {
      id: "total-requests",
      count: "32,840+",
      label: "Blood Requests",
      icon: HeartPulse,
      isHighlighted: false,
    }
  ];

  return (
    <section className="bg-rose-50 rounded-b-4xl  text-slate-600 py-16 px-4 sm:px-6 lg:px-8 select-none font-sans antialiased">
      <div className="max-w-7xl mx-auto">
       
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/60 pb-6">
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
             Community Impact
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Real-time insights into active donors, requests, and platform support.
            </p>
          </div>
          
        </div>

      
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statsData.map((stat) => {
            const IconComponent = stat.icon;
            
            return (
              <Card
                key={stat.id}
                className={`relative rounded-[2rem] p-8 transition-all duration-300 ease-out transform hover:-translate-y-1.5 overflow-hidden group ${
                  stat.isHighlighted
                    ? 'bg-[#E11D48] text-white shadow-lg shadow-rose-600/10 border border-[#E11D48]'
                    : 'bg-white text-slate-600 border border-slate-200/60 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.08)]'
                }`}
              >
              
                <div className={`absolute -top-4 -right-4 p-4 opacity-[0.03] transition-transform duration-500 group-hover:scale-110 ${
                  stat.isHighlighted ? 'text-white opacity-10' : 'text-slate-900'
                }`}>
                  <IconComponent className="w-32 h-32" />
                </div>

               
                <div className="flex items-center justify-between gap-4 ">
                  <span className={`text-xs font-bold uppercase tracking-wider ${
                    stat.isHighlighted ? 'text-rose-200' : 'text-slate-400'
                  }`}>
                    {stat.label}
                  </span>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm border ${
                    stat.isHighlighted
                      ? 'bg-rose-500/30 border-rose-400/20 text-white'
                      : 'bg-slate-50 border-slate-100 text-slate-900'
                  }`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                </div>

               
                <div className="">
                  <h4 className={`text-3xl sm:text-4xl font-black tracking-tight leading-none ${
                    stat.isHighlighted ? 'text-white' : 'text-slate-900'
                  }`}>
                    {stat.count}
                  </h4>
                </div>

              
                <div className={`absolute bottom-0 left-8 right-8 h-[3px] rounded-t-full transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${
                  stat.isHighlighted ? 'bg-white/40' : 'bg-[#E11D48]'
                }`} />
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default CommunityImpactStats;