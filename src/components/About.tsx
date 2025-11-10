import { Target, Heart, Lightbulb, Shield } from "lucide-react";

const values = [
  {
    icon: <Target size={32} />,
    title: "Innovation",
    desc: "We stay ahead of the curve with cutting-edge technologies and creative solutions.",
  },
  {
    icon: <Heart size={32} />,
    title: "Trust",
    desc: "Building long-lasting relationships based on transparency and reliability.",
  },
  {
    icon: <Lightbulb size={32} />,
    title: "Creativity",
    desc: "Transforming ideas into exceptional digital experiences that stand out.",
  },
  {
    icon: <Shield size={32} />,
    title: "Excellence",
    desc: "Committed to delivering world-class quality in every project we undertake.",
  },
];

const team = [
  {
    name: "Parth Prajapati",
    role: "Founder & CEO",
    img: "/team1.jpg",
    gradient: "from-blue-400 to-cyan-400",
  },
  {
    name: "Emilia Fernandez",
    role: "Lead Designer",
    img: "/team2.jpg",
    gradient: "from-purple-400 to-pink-400",
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Mission Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-blue-600">Us</span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-700 leading-relaxed">
            At J4.Innovate, our mission is to redefine how technology connects
            people and ideas. We value innovation, trust, and creativity in
            every project we build.
          </p>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="text-blue-600 mb-4 flex justify-center">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {value.title}
              </h3>
              <p className="text-gray-600 text-sm">{value.desc}</p>
            </div>
          ))}
        </div>

        {/* Team Section */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet the talented individuals driving innovation at J4.Innovate
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              <div
                className={`w-32 h-32 mx-auto rounded-full mb-6 bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white text-4xl font-bold shadow-lg`}
              >
                {member.name.charAt(0)}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {member.name}
              </h3>
              <p className="text-blue-600 font-semibold">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
