import React from 'react';
import { Users, Award, Shield, Heart, Target, Eye } from 'lucide-react';

const About = () => {
  const timeline = [
    {
      year: "1985",
      title: "Founded",
      description: "AutoElite was founded with a vision to revolutionize the automotive industry."
    },
    {
      year: "1995",
      title: "Expansion",
      description: "Expanded to multiple locations and partnered with premium brands."
    },
    {
      year: "2005",
      title: "Digital Innovation",
      description: "Launched our digital platform to enhance customer experience."
    },
    {
      year: "2015",
      title: "Sustainability Focus",
      description: "Introduced eco-friendly vehicles and sustainable practices."
    },
    {
      year: "2024",
      title: "Industry Leader",
      description: "Recognized as the leading premium automotive dealer in the region."
    }
  ];

  const team = [
    {
      name: "John Smith",
      position: "CEO & Founder",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      description: "Visionary leader with 25+ years in automotive industry"
    },
    {
      name: "Sarah Wilson",
      position: "Sales Director",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      description: "Expert in customer relations and premium vehicle sales"
    },
    {
      name: "Michael Johnson",
      position: "Service Manager",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
      description: "Certified technician ensuring top-quality vehicle maintenance"
    }
  ];

  const values = [
    {
      icon: <Heart className="h-8 w-8 text-red-600" />,
      title: "Customer First",
      description: "We put our customers at the heart of everything we do, ensuring their satisfaction is our top priority."
    },
    {
      icon: <Shield className="h-8 w-8 text-red-600" />,
      title: "Trust & Transparency",
      description: "We believe in honest, transparent dealings with clear communication at every step."
    },
    {
      icon: <Award className="h-8 w-8 text-red-600" />,
      title: "Excellence",
      description: "We strive for excellence in every interaction, service, and vehicle we offer."
    },
    {
      icon: <Target className="h-8 w-8 text-red-600" />,
      title: "Innovation",
      description: "We embrace new technologies and innovative solutions to enhance your experience."
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About AutoElite</h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              For nearly four decades, we've been dedicated to providing exceptional automotive experiences 
              and helping customers find their perfect vehicle.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                AutoElite began in 1985 with a simple mission: to revolutionize the car buying experience 
                by focusing on quality, service, and customer satisfaction. What started as a small family 
                business has grown into one of the region's most trusted automotive dealerships.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Today, we're proud to offer an extensive selection of premium vehicles from the world's 
                leading manufacturers, backed by our commitment to excellence and innovation. Our team of 
                automotive experts is dedicated to helping you find the perfect vehicle that matches your 
                lifestyle and needs.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">25,000+</div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 mb-2">39</div>
                  <div className="text-gray-600">Years of Excellence</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1037913/pexels-photo-1037913.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="AutoElite dealership"
                className="w-full h-96 object-cover rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="mb-6">
                <Target className="h-12 w-12 text-red-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-600 text-lg">
                To provide exceptional automotive experiences through quality vehicles, 
                outstanding service, and genuine care for our customers' needs. We strive 
                to build lasting relationships based on trust, transparency, and excellence.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="mb-6">
                <Eye className="h-12 w-12 text-red-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-600 text-lg">
                To be the premier destination for automotive excellence, setting the standard 
                for customer service and innovation in the industry. We envision a future where 
                every customer drives away completely satisfied with their experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mb-4 flex justify-center">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Journey</h2>
            <p className="text-xl text-gray-400">
              Milestones that shaped our success
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-red-600"></div>
            <div className="space-y-16">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className="w-1/2 pr-8">
                    <div className={`text-${index % 2 === 0 ? 'right' : 'left'}`}>
                      <div className="bg-white p-6 rounded-xl shadow-lg">
                        <h3 className="text-2xl font-bold text-red-600 mb-2">{item.year}</h3>
                        <h4 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h4>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-red-600 rounded-full border-4 border-white z-10"></div>
                  <div className="w-1/2 pl-8"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">
              The passionate professionals behind AutoElite
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-red-600 font-medium mb-3">{member.position}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;