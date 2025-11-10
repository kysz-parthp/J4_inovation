import {
  Code,
  Database,
  Smartphone,
  Cloud,
  Brain,
  Globe,
  Zap,
  Shield,
} from "lucide-react";

const technologies = {
  frontend: [
    { name: "React.js", icon: <Code size={32} /> },
    { name: "Next.js", icon: <Globe size={32} /> },
    { name: "Vue.js", icon: <Code size={32} /> },
    { name: "Angular", icon: <Code size={32} /> },
    { name: "TypeScript", icon: <Code size={32} /> },
  ],
  backend: [
    { name: "Node.js", icon: <Zap size={32} /> },
    { name: "Python", icon: <Code size={32} /> },
    { name: "PHP", icon: <Code size={32} /> },
    { name: "Laravel", icon: <Code size={32} /> },
  ],
  database: [
    { name: "MySQL", icon: <Database size={32} /> },
    { name: "PostgreSQL", icon: <Database size={32} /> },
    { name: "MongoDB", icon: <Database size={32} /> },
  ],
  mobile: [
    { name: "React Native", icon: <Smartphone size={32} /> },
    { name: "Flutter", icon: <Smartphone size={32} /> },
    { name: "iOS", icon: <Smartphone size={32} /> },
    { name: "Android", icon: <Smartphone size={32} /> },
  ],
  cloud: [
    { name: "AWS", icon: <Cloud size={32} /> },
    { name: "Azure", icon: <Cloud size={32} /> },
    { name: "Google Cloud", icon: <Cloud size={32} /> },
  ],
  ai: [
    { name: "ChatGPT", icon: <Brain size={32} /> },
    { name: "Gemini", icon: <Brain size={32} /> },
    { name: "Claude", icon: <Brain size={32} /> },
    { name: "Custom AI", icon: <Brain size={32} /> },
  ],
};

export default function TechnologyStack() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Software Development
            <br />
            <span className="text-blue-600">Expertise</span>
          </h2>
        </div>

        <div className="space-y-16">
          {/* Frontend */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <Code className="text-blue-600" size={28} />
              Frontend
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {technologies.frontend.map((tech, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-blue-100"
                >
                  <div className="text-blue-600 mb-3 flex justify-center">
                    {tech.icon}
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    {tech.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Backend */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <Zap className="text-blue-600" size={28} />
              Backend
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {technologies.backend.map((tech, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-purple-100"
                >
                  <div className="text-purple-600 mb-3 flex justify-center">
                    {tech.icon}
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    {tech.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Database */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <Database className="text-blue-600" size={28} />
              Databases
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {technologies.database.map((tech, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-green-100"
                >
                  <div className="text-green-600 mb-3 flex justify-center">
                    {tech.icon}
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    {tech.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <Smartphone className="text-blue-600" size={28} />
              Mobile Apps
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {technologies.mobile.map((tech, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-orange-100"
                >
                  <div className="text-orange-600 mb-3 flex justify-center">
                    {tech.icon}
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    {tech.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Cloud */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <Cloud className="text-blue-600" size={28} />
              DevOps/Cloud
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {technologies.cloud.map((tech, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-cyan-100"
                >
                  <div className="text-cyan-600 mb-3 flex justify-center">
                    {tech.icon}
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    {tech.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* AI/ML */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <Brain className="text-blue-600" size={28} />
              AI/ML Models
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {technologies.ai.map((tech, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-indigo-100"
                >
                  <div className="text-indigo-600 mb-3 flex justify-center">
                    {tech.icon}
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    {tech.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

