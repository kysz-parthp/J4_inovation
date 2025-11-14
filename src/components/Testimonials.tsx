"use client";

import { Star, Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { testimonialsApi } from "@/lib/api";
import { Testimonial } from "@/types/api";

// Fallback testimonials data
const fallbackTestimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    content:
      "J4.Innovate transformed our business with their AI-powered solutions. The team is professional, innovative, and delivers beyond expectations.",
    rating: 5,
    avatar: "SJ",
    isApproved: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CTO, Digital Solutions",
    content:
      "Outstanding web development services! They built our platform with cutting-edge technology and it's been performing flawlessly.",
    rating: 5,
    avatar: "MC",
    isApproved: true,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Founder, Creative Agency",
    content:
      "The Voice2Doc system they developed has revolutionized our workflow. Highly recommend their AI/ML expertise!",
    rating: 5,
    avatar: "ER",
    isApproved: true,
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Product Manager, InnovateCo",
    content:
      "Professional, timely, and innovative. J4.Innovate is our go-to partner for all software development needs.",
    rating: 5,
    avatar: "DT",
    isApproved: true,
  },
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await testimonialsApi.getAll();
        if (response.success && response.data && response.data.length > 0) {
          // Filter only approved testimonials and sort by orderIndex
          const approvedTestimonials = response.data
            .filter((t) => t.isApproved !== false)
            .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));
          setTestimonials(approvedTestimonials);
        } else {
          // Use fallback data
          setTestimonials(fallbackTestimonials as Testimonial[]);
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        // Use fallback data on error
        setTestimonials(fallbackTestimonials as Testimonial[]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Use testimonials from API or fallback
  const displayTestimonials = testimonials.length > 0 ? testimonials : fallbackTestimonials as Testimonial[];

  useEffect(() => {
    if (displayTestimonials.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length);
      }, 5000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [displayTestimonials.length]);

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our <span className="text-blue-600">Clients Say</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it - hear from our satisfied clients
            </p>
          </div>
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our <span className="text-blue-600">Clients Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it - hear from our satisfied clients
          </p>
        </div>

        {displayTestimonials.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {displayTestimonials.map((testimonial, index) => {
              const rating = testimonial.rating || 5;
              const avatar = testimonial.avatar || testimonial.name.substring(0, 2).toUpperCase();
              
              return (
                <div
                  key={testimonial.id || index}
                  className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <Quote className="text-blue-600 mb-4" size={32} />
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-4">
                    {testimonial.companyLogoUrl ? (
                      <img
                        src={testimonial.companyLogoUrl}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                        {avatar}
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-gray-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            No testimonials available
          </div>
        )}

        {/* Client Logos or Stats */}
        <div className="text-center pt-8 border-t border-gray-200">
          <p className="text-gray-600 mb-4">Trusted by leading companies</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-2xl font-bold text-gray-400">TechCorp</div>
            <div className="text-2xl font-bold text-gray-400">InnovateLab</div>
            <div className="text-2xl font-bold text-gray-400">DigitalFirst</div>
            <div className="text-2xl font-bold text-gray-400">CloudTech</div>
          </div>
        </div>
      </div>
    </section>
  );
}

