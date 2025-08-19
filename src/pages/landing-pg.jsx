import React, { useState, useEffect } from 'react';
import {  
  Target, 
  TrendingUp, 
  Clock, 
  Calendar, 
  Award, 
  Users, 
  CheckCircle, 
  BarChart3, 
  Star,
  Play,
} from 'lucide-react';
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import {AlertInfo} from "../components/alerts"

const LandingPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const features = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Smart Time Tracking",
      description: "Automatically track study sessions with intelligent break detection and focus time analysis."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Goal Setting & Progress",
      description: "Set study goals, track progress, and celebrate achievements with our visual progress system."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Analytics Dashboard",
      description: "Get detailed insights into your study patterns, productivity trends, and performance metrics."
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Study Planner",
      description: "Plan your study schedule, set reminders, and organize subjects with our intuitive calendar."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Achievement System",
      description: "Earn badges, unlock rewards, and stay motivated with our gamified learning experience."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Study Groups",
      description: "Connect with classmates, create study groups, and collaborate on shared learning goals."
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Engineering Student, IIT Delhi",
      content: "Trackify helped me increase my study efficiency by 40%. The analytics showed me exactly where I was wasting time!",
      avatar: "PS",
      rating: 5
    },
    {
      name: "Arjun Patel",
      role: "Medical Student, AIIMS",
      content: "The goal tracking feature kept me motivated during NEET prep. I could see my daily progress which was incredibly motivating.",
      avatar: "AP",
      rating: 5
    },
    {
      name: "Sneha Reddy",
      role: "Commerce Student, Delhi University",
      content: "Love the study group feature! Collaborating with friends and tracking group progress made studying so much more engaging.",
      avatar: "SR",
      rating: 5
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Students" },
    { number: "2M+", label: "Study Hours Tracked" },
    { number: "85%", label: "Improved Performance" },
    { number: "4.9★", label: "App Store Rating" }
  ];

  return (
    
    <div className="min-h-screen">
      
      {/* Header */}
      <Navbar/>
      
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 ">
        
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className='flex justify-center my-5'><AlertInfo/></div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Hero Content */}
            <div className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-card-foreground leading-tight mb-6">
                Track Your 
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Study Journey</span>
              </h1>
              
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Transform your study habits with intelligent tracking, goal setting, and analytics. 
                Join thousands of students who've improved their academic performance with Trackify.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center">
                  <Play className="w-5 h-5 mr-2" />
                  Start Tracking Free
                </button>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  No credit card required
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  14-day free trial
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className={`transform transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="relative">
                {/* Main Dashboard Mockup */}
                <div className="bg-card rounded-2xl shadow-2xl p-6 border ">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-card-foreground">Today's Progress</h3>
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">+15%</span>
                    </div>
                  </div>
                  
                  {/* Progress Bars */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Mathematics</span>
                        <span className="text-indigo-600 font-medium">2h 30m</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full w-3/4"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Physics</span>
                        <span className="text-indigo-600 font-medium">1h 45m</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full w-1/2"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Chemistry</span>
                        <span className="text-indigo-600 font-medium">3h 15m</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-orange-500 to-red-600 h-2 rounded-full w-5/6"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-indigo-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-indigo-600">7h 30m</div>
                      <div className="text-sm text-gray-400">Total Today</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">95%</div>
                      <div className="text-sm text-gray-400">Goal Achieved</div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Achievement Card */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-xl shadow-lg transform rotate-3">
                  <div className="flex items-center">
                    <Award className="w-6 h-6 mr-2" />
                    <div>
                      <div className="font-semibold">Streak Master!</div>
                      <div className="text-sm opacity-90">7 days streak</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-card-foreground mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-card-foreground mb-4">
              Everything You Need to 
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Excel in Studies</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Powerful features designed specifically for students to track, analyze, and improve their study habits
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-card border  rounded-2xl p-8 hover:shadow-xl hover:border-indigo-200 transition-all duration-300 group">
                <div className="text-indigo-600 mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center gap-6">
                  {feature.icon}
                  <h3 className="text-xl font-semibold text-card-foreground mb-3">{feature.title}</h3>
                </div>
                
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-card-foreground mb-4">How Trackify Works</h2>
            <p className="text-xl text-gray-400">Get started in just 3 simple steps</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-3">Set Your Goals</h3>
              <p className="text-gray-400">Define your study subjects, daily goals, and target hours for each topic.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-3">Track Your Time</h3>
              <p className="text-gray-400">Start study sessions with one click. Our smart timer tracks your focus time automatically.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-3">Analyze & Improve</h3>
              <p className="text-gray-400">Review detailed analytics, identify patterns, and optimize your study schedule for better results.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-card-foreground mb-4">Loved by Students Everywhere</h2>
            <p className="text-xl text-gray-400">See how Trackify is helping students achieve their academic goals</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-card border  rounded-2xl p-8 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-400 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-card-foreground">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default LandingPage
