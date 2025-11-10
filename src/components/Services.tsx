import { Code, Bot, Mic, Palette, PenTool, Sparkles } from "lucide-react";

const services = [
  {
    icon: <Code size={40} />,
    title: "Web Development",
    desc: "Modern, responsive, and scalable websites built with cutting-edge technologies.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: <Bot size={40} />,
    title: "Chatbot Services",
    desc: "AI-powered chatbots that enhance user engagement and automate customer support.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: <Mic size={40} />,
    title: "Voice2Doc",
    desc: "Convert speech into smart, structured documents with advanced AI processing.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: <PenTool size={40} />,
    title: "Social Media Content",
    desc: "Creative content strategies to boost your digital presence and engagement.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: <Palette size={40} />,
    title: "Smart Poster & Logo",
    desc: "Eye-catching designs that reflect your brand identity and captivate audiences.",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: <Sparkles size={40} />,
    title: "AI/ML Solutions",
    desc: "Custom AI and machine learning solutions tailored to your business needs.",
    color: "from-yellow-500 to-orange-500",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-blue-600">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive software development and digital transformation services
            to help your business thrive in the digital age.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              <div
                className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${service.color} mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <div className="text-white">{service.icon}</div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{service.desc}</p>
              <div className="mt-6 flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
                <span>Learn More</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
