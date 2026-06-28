"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend,
  Tooltip,
} from "recharts";

export default function DashboardOverviewChart({
  donors,
  requests,
  funding,
}) {
  const data = [
    {
      name: "Donors",
      value: donors,
      fill: "#db0000",
    },
    {
      name: "Requests",
      value: requests,
      fill: "#F66565",
    },
    {
      name: "Funding",
      value: funding,
      fill: "#FBBCBC",
    },
  ];

  return (
    <div className="mt-10 rounded-[28px] border border-slate-200 bg-white dark:bg-white/20 p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-slate-900">
          Platform Overview
        </h2>
        <p className="text-sm text-slate-500 dark:text-gray-300">
          A quick summary of donors, requests, and funding.
        </p>
      </div>

      <div className="h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius="65%"
              outerRadius="90%"
              paddingAngle={5}
              cornerRadius={12}
              isAnimationActive
            />

            <Tooltip
              formatter={(value, name) => [
                name === "Funding"
                  ? `$${Number(value).toLocaleString()}`
                  : Number(value).toLocaleString(),
                name,
              ]}
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              }}
            />

            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              iconSize={12}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}