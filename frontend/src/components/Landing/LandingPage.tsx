import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DarkModeToggle from "../Common/DarkModeToggle";
import { ChevronDown, Clock, Brain, Calendar, MessageCircle } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-500 dark:from-gray-900 dark:via-purple-950 dark:to-black overflow-x-hidden">
      {/* Navbar */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/10 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <span className="ml-2 text-2xl font-bold text-white">EchoVerse</span>
          </div>

          {/* Update the navbar buttons container to fix the DarkModeToggle overlap */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/login')}
              className="text-white hover:text-purple-200 transition">
              Login
            </button>
            <button
              onClick={() => navigate('/register')}
              className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-100 transition transform hover:scale-105 mr-2">
              Sign Up
            </button>
            <div className="ml-2">
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </header>




      {/* Hero Section - Fixed to add proper mobile padding */}
      <section className="relative pt-24 md:pt-32 min-h-screen flex items-center justify-center px-4">

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-400/20 dark:bg-purple-800/20 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-blue-400/20 dark:bg-blue-800/20 blur-3xl animate-pulse"></div>
        </div>


        {/* Hero Content */}
        <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center">
          <div className="text-left mt-8 md:mt-0">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white dark:text-gray-100 mb-6 leading-tight">
              <span className="relative">
                Echo
                <span className="absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r from-purple-400 to-pink-500"></span>
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">Verse</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 dark:text-gray-300 mb-8 leading-relaxed">
              Record your thoughts. Speak to your future self.
              Unlock memories across time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={() => navigate('/register')}
                className="px-8 py-4 rounded-xl bg-white text-purple-600 font-bold transition transform hover:scale-105 hover:shadow-xl flex items-center justify-center"
              >
                Get Started
              </button>
              <button
                onClick={() => navigate('/learn-more')}
                className="px-8 py-4 rounded-xl border-2 border-white/50 text-white font-bold transition transform hover:scale-105 hover:bg-white/10 flex items-center justify-center"
              >
                Learn More
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-white/80">
              <div className="flex items-center">
                <div className="w-1 h-1 rounded-full bg-purple-300 mr-2"></div>
                <span>End-to-end encryption</span>
              </div>
              <div className="flex items-center">
                <div className="w-1 h-1 rounded-full bg-purple-300 mr-2"></div>
                <span>Free version available</span>
              </div>
            </div>
          </div>

          {/* Glass Card Mockup */}
          <div className="backdrop-blur-xl bg-white/20 dark:bg-white/10 border border-white/30 dark:border-white/10 rounded-3xl p-8 shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-300">
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="space-y-4">
                <div className="w-full h-14 rounded-lg bg-white/20 dark:bg-white/5 flex items-center px-4">
                  <MessageCircle className="h-5 w-5 text-white/70 mr-3" />
                  <span className="text-white/70">Record a new memory...</span>
                </div>
                <div className="space-y-3">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="w-full p-4 rounded-lg bg-white/10 dark:bg-white/5 border border-white/10">
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-sm text-white/70">
                          {item === 1 ? "Today" : item === 2 ? "Yesterday" : "Last week"}
                        </div>
                        <Clock className="h-4 w-4 text-white/50" />
                      </div>
                      <div className="text-white text-sm">
                        {item === 1
                          ? "I finally solved that coding problem I've been stuck on for days!"
                          : item === 2
                            ? "Met with the team today. Great progress on our project."
                            : "Feeling inspired after that conference. So many new ideas."}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-white/50" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white/5 backdrop-blur-lg">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-white mb-16">Why Choose EchoVerse?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="h-10 w-10 text-purple-300" />,
                title: "Memory Mapping",
                description: "Organize your thoughts with our intuitive memory mapping system, helping you connect ideas across time."
              },
              {
                icon: <Calendar className="h-10 w-10 text-purple-300" />,
                title: "Time Capsules",
                description: "Schedule messages to your future self. Set reminders, goals, or simply leave words of encouragement."
              },
              {
                icon: <MessageCircle className="h-10 w-10 text-purple-300" />,
                title: "Voice Journaling",
                description: "Speak your thoughts naturally with our advanced voice recording feature. Transcription included."
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="backdrop-blur-md bg-white/10 dark:bg-white/5 border border-white/20 rounded-2xl p-8 hover:shadow-2xl transition transform hover:-translate-y-1"
              >
                <div className="bg-purple-900/30 rounded-xl p-4 inline-block mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/80">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-white mb-16">What Our Users Say</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "EchoVerse has transformed how I reflect on my daily experiences. The time capsule feature is brilliant!",
                name: "Alex Johnson",
                title: "Product Designer"
              },
              {
                quote: "I've tried many journaling apps, but nothing compares to the thoughtful design and features of EchoVerse.",
                name: "Maya Patel",
                title: "Content Creator"
              },
              {
                quote: "The voice journaling feature has made it so much easier to record my thoughts on busy days.",
                name: "James Wilson",
                title: "Entrepreneur"
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="backdrop-blur-md bg-white/10 dark:bg-white/5 border border-white/20 rounded-2xl p-8 hover:shadow-xl transition"
              >
                <div className="mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-300">★</span>
                  ))}
                </div>
                <p className="text-white/90 italic mb-6">"{testimonial.quote}"</p>
                <div>
                  <p className="text-white font-medium">{testimonial.name}</p>
                  <p className="text-purple-300">{testimonial.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="backdrop-blur-xl bg-gradient-to-r from-purple-600/50 to-blue-600/50 dark:from-purple-900/50 dark:to-blue-900/50 rounded-3xl p-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Begin Your Journey Today</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Start capturing your thoughts, memories, and ideas with EchoVerse.
              Your future self will thank you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/register')}
                className="px-8 py-4 rounded-xl bg-white text-purple-600 font-bold transition transform hover:scale-105 hover:shadow-xl"
              >
                Create Free Account
              </button>
              <button
                onClick={() => navigate('/login')}
                className="px-8 py-4 rounded-xl border-2 border-white/70 text-white font-bold transition transform hover:scale-105 hover:bg-white/10"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-md py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <span className="ml-2 text-2xl font-bold text-white">EchoVerse</span>
            </div>

            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-6 md:mb-0">
              {["About", "Features", "Pricing", "Contact", "Help"].map((item, index) => (
                <a key={index} href="#" className="text-white/70 hover:text-white transition">
                  {item}
                </a>
              ))}
            </div>

            <div className="text-white/50 text-sm">
              © {new Date().getFullYear()} EchoVerse. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;