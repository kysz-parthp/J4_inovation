"use client";

import { ExternalLink, Github } from "lucide-react";
import { useEffect, useState } from "react";
import { portfolioApi } from "@/lib/api";
import { Portfolio } from "@/types/api";

// Fallback portfolio data
const fallbackProjects = [
  {
    id: 1,
    title: "Smart AI Bot",
    category: "AI/ML",
    description: "Intelligent chatbot solution with natural language processing capabilities.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    title: "Innovative Web App",
    category: "Web Development",
    description: "Modern web application with real-time features and seamless user experience.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    title: "Voice2Doc System",
    category: "AI/ML",
    description: "Advanced voice-to-document conversion system powered by AI.",
    gradient: "from-green-500 to-emerald-500",
  },
];

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await portfolioApi.getAll();
        if (response.success && response.data && response.data.length > 0) {
          // Sort by orderIndex
          const sortedPortfolio = response.data.sort(
            (a, b) => (a.orderIndex || 0) - (b.orderIndex || 0)
          );
          setPortfolio(sortedPortfolio);
        } else {
          // Use fallback data
          setPortfolio(fallbackProjects as Portfolio[]);
        }
      } catch (err) {
        console.error("Error fetching portfolio:", err);
        // Use fallback data on error
        setPortfolio(fallbackProjects as Portfolio[]);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  // Use portfolio from API or fallback
  const displayProjects = portfolio.length > 0 ? portfolio : fallbackProjects as Portfolio[];

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-blue-600">Portfolio</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore some of our recent projects that showcase our expertise and
            innovation.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProjects.map((project, index) => {
              const gradient = project.gradient || "from-blue-500 to-cyan-500";
              const imageUrl = project.imageUrl;
              
              return (
                <div
                  key={project.id || index}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                >
                  {/* Image or Gradient Placeholder */}
                  <div
                    className={`h-56 bg-gradient-to-br ${gradient} relative overflow-hidden`}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
                        {project.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white/90 backdrop-blur-sm p-2 rounded-lg hover:bg-white transition-colors"
                        >
                          <ExternalLink size={20} className="text-gray-800" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white/90 backdrop-blur-sm p-2 rounded-lg hover:bg-white transition-colors"
                        >
                          <Github size={20} className="text-gray-800" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
                      <span>View Project</span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="text-center mt-12">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
}
