"use client";

import { Code, Bot, Mic, Palette, PenTool, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { servicesApi } from "@/lib/api";
import { Service } from "@/types/api";
import { getIconComponent } from "@/lib/iconMapping";

// Fallback services data
const fallbackServices = [
  {
    icon: "Code",
    title: "Web Development",
    description: "Modern, responsive, and scalable websites built with cutting-edge technologies.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: "Bot",
    title: "Chatbot Services",
    description: "AI-powered chatbots that enhance user engagement and automate customer support.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: "Mic",
    title: "Voice2Doc",
    description: "Convert speech into smart, structured documents with advanced AI processing.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: "PenTool",
    title: "Social Media Content",
    description: "Creative content strategies to boost your digital presence and engagement.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: "Palette",
    title: "Smart Poster & Logo",
    description: "Eye-catching designs that reflect your brand identity and captivate audiences.",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: "Sparkles",
    title: "AI/ML Solutions",
    description: "Custom AI and machine learning solutions tailored to your business needs.",
    color: "from-yellow-500 to-orange-500",
  },
];

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await servicesApi.getAll();
        if (response.success && response.data && response.data.length > 0) {
          // Filter only active services and sort by orderIndex
          const activeServices = response.data
            .filter((s) => s.isActive !== false)
            .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));
          setServices(activeServices);
        } else {
          // Use fallback data
          setServices(fallbackServices as Service[]);
        }
      } catch (err) {
        console.error("Error fetching services:", err);
        setError(err instanceof Error ? err.message : "Failed to load services");
        // Use fallback data on error
        setServices(fallbackServices as Service[]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Use services from API or fallback
  const displayServices = services.length > 0 ? services : fallbackServices as Service[];

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

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error && services.length === 0 ? (
          <div className="text-center py-12 text-red-600">
            Error: {error}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayServices.map((service, index) => {
              const iconComponent = getIconComponent(service.icon || "", 40) || <Code size={40} />;
              const color = service.color || "from-blue-500 to-cyan-500";
              
              return (
                <div
                  key={service.id || index}
                  className="group bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                >
                  <div
                    className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${color} mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="text-white">{iconComponent}</div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  <div className="mt-6 flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
                    <span>Learn More</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
