"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "What services does J4.Innovate offer?",
    answer:
      "We offer comprehensive software development services including Web Development, AI/ML Solutions, Mobile App Development, Cloud Services, Chatbot Development, Voice2Doc systems, and UI/UX Design services.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary based on scope and complexity. A simple website might take 2-4 weeks, while a complex AI-powered application could take 3-6 months. We provide detailed timelines during our initial consultation.",
  },
  {
    question: "Do you provide ongoing support and maintenance?",
    answer:
      "Yes! We offer comprehensive maintenance and support packages to ensure your software continues to perform optimally. This includes updates, bug fixes, security patches, and feature enhancements.",
  },
  {
    question: "What technologies do you specialize in?",
    answer:
      "We work with modern tech stacks including React, Next.js, Node.js, Python, AI/ML frameworks (ChatGPT, Gemini, Claude), cloud platforms (AWS, Azure, GCP), and mobile technologies (React Native, Flutter).",
  },
  {
    question: "Can I hire dedicated developers?",
    answer:
      "Absolutely! We offer dedicated developer hiring services where you can extend your team with our expert developers on a full-time or part-time basis.",
  },
  {
    question: "How do you ensure code quality?",
    answer:
      "We follow industry best practices including code reviews, automated testing, CI/CD pipelines, and maintain high coding standards. All code goes through rigorous quality assurance processes.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h2>
          <p className="text-xl text-gray-600">
            Got questions? We've got answers!
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 text-lg">
                  {faq.question}
                </span>
                <ChevronDown
                  size={24}
                  className={`text-blue-600 transition-transform duration-300 flex-shrink-0 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a
            href="#contact"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}

