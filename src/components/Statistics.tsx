"use client";

import { TrendingUp, Users, Award, Code2 } from "lucide-react";
import { useEffect, useState } from "react";
import { statisticsApi } from "@/lib/api";
import { Statistics } from "@/types/api";
import { getIconComponent } from "@/lib/iconMapping";

// Fallback statistics data
const fallbackStats = [
  {
    id: 1,
    number: "500+",
    label: "Projects Completed",
    icon: "Code2",
    color: "from-blue-500 to-cyan-500",
    isActive: true,
  },
  {
    id: 2,
    number: "300+",
    label: "Happy Clients",
    icon: "Users",
    color: "from-purple-500 to-pink-500",
    isActive: true,
  },
  {
    id: 3,
    number: "97%",
    label: "Client Retention",
    icon: "Award",
    color: "from-green-500 to-emerald-500",
    isActive: true,
  },
  {
    id: 4,
    number: "250+",
    label: "Technology Experts",
    icon: "TrendingUp",
    color: "from-orange-500 to-red-500",
    isActive: true,
  },
];

export default function Statistics() {
  const [statistics, setStatistics] = useState<Statistics[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await statisticsApi.getAll();
        if (response.success && response.data && response.data.length > 0) {
          // Filter only active statistics and sort by orderIndex
          const activeStats = response.data
            .filter((s) => s.isActive !== false)
            .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));
          setStatistics(activeStats);
        } else {
          // Use fallback data
          setStatistics(fallbackStats as Statistics[]);
        }
      } catch (err) {
        console.error("Error fetching statistics:", err);
        // Use fallback data on error
        setStatistics(fallbackStats as Statistics[]);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  // Use statistics from API or fallback
  const displayStats = statistics.length > 0 ? statistics : fallbackStats as Statistics[];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            We are <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">J4.Innovate</span>
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayStats.map((stat, index) => {
              const iconComponent = getIconComponent(stat.icon || "", 40) || <Code2 size={40} />;
              const color = stat.color || "from-blue-500 to-cyan-500";
              
              return (
                <div
                  key={stat.id || index}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20"
                >
                  <div className={`inline-flex p-4 rounded-full bg-gradient-to-br ${color} mb-4`}>
                    <div className="text-white">{iconComponent}</div>
                  </div>
                  <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-lg text-gray-300">{stat.label}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

