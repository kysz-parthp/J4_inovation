import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Smart AI Bot",
    category: "AI/ML",
    img: "/portfolio1.jpg",
    desc: "Intelligent chatbot solution with natural language processing capabilities.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Innovative Web App",
    category: "Web Development",
    img: "/portfolio2.jpg",
    desc: "Modern web application with real-time features and seamless user experience.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Voice2Doc System",
    category: "AI/ML",
    img: "/portfolio3.jpg",
    desc: "Advanced voice-to-document conversion system powered by AI.",
    gradient: "from-green-500 to-emerald-500",
  },
];

export default function Portfolio() {
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              {/* Image Placeholder with Gradient */}
              <div
                className={`h-56 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
                    {project.category}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <button className="bg-white/90 backdrop-blur-sm p-2 rounded-lg hover:bg-white transition-colors">
                    <ExternalLink size={20} className="text-gray-800" />
                  </button>
                  <button className="bg-white/90 backdrop-blur-sm p-2 rounded-lg hover:bg-white transition-colors">
                    <Github size={20} className="text-gray-800" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4">{project.desc}</p>
                <div className="flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
                  <span>View Project</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
}
