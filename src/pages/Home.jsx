// import React, { useState, useEffect } from 'react';
// import { ChevronDown, Play, Users, Heart, Globe, Star, Mail, Phone, MapPin, Menu, X, ArrowRight, CheckCircle, Book, Video, Mic } from 'lucide-react';

// const Home = () => {
//   const [currentPage, setCurrentPage] = useState('home');
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const navigation = [
//     { name: 'Home', id: 'home' },
//     { name: 'About', id: 'about' },
//     { name: 'Share Your Story', id: 'share' },
//     { name: 'Watch Stories', id: 'watch' },
//     { name: 'Get Involved', id: 'involved' },
//     { name: 'Contact', id: 'contact' }
//   ];

//   const NavBar = () => (
//     <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
//       isScrolled ? 'bg-black/90 backdrop-blur-lg' : 'bg-transparent'
//     }`}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-20">
//           <div className="flex items-center">
//             <div className="flex-shrink-0">
//               <h1 className="text-2xl font-light text-white tracking-wider">
//                 <span className="font-bold">They</span>ThatTestify
//               </h1>
//             </div>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-12">
//             {navigation.map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => setCurrentPage(item.id)}
//                 className={`text-lg font-light tracking-wide transition-all duration-300 relative ${
//                   currentPage === item.id
//                     ? 'text-gray-500 hover:text-gray-500'
//                     : 'text-amber-400'
//                 } after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-amber-400 after:left-0 after:bottom-[-8px] after:transition-all after:duration-300 ${
//                   currentPage === item.id ? 'after:w-full' : 'hover:after:w-full'
//                 }`}
//               >
//                 {item.name}
//               </button>
//             ))}
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="text-white/80 hover:text-white transition-colors"
//             >
//               {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Navigation */}
//       {isMobileMenuOpen && (
//         <div className="md:hidden bg-black/95 backdrop-blur-lg">
//           <div className="px-4 pt-2 pb-3 space-y-1">
//             {navigation.map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => {
//                   setCurrentPage(item.id);
//                   setIsMobileMenuOpen(false);
//                 }}
//                 className={`block px-3 py-4 text-base font-light w-full text-left tracking-wide transition-colors ${
//                   currentPage === item.id
//                     ? 'text-amber-400'
//                     : 'text-white/80 hover:text-white'
//                 }`}
//               >
//                 {item.name}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </nav>
//   );

//   const HomePage = () => (
//     <div>
//       {/* Hero Section */}
//       <section className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-800 text-white relative overflow-hidden">
//         {/* Background Pattern */}
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400 rounded-full blur-3xl"></div>
//           <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
//         </div>

//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
//           <div className="max-w-4xl">
//             <div className="mb-8">
//               <span className="inline-block px-4 py-2 bg-amber-400/20 text-amber-400 rounded-full text-sm font-medium tracking-wide mb-6">
//                 GLOBAL MISSION
//               </span>
//             </div>

//             <h1 className="text-6xl md:text-8xl font-light mb-8 leading-tight">
//               <span className="block">1 Million</span>
//               <span className="block text-amber-400 font-medium">Testimonies</span>
//               <span className="block text-3xl md:text-4xl font-light text-white/70 mt-4">
//                 One Global Witness
//               </span>
//             </h1>

//             <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl font-light leading-relaxed">
//               We're on a mission to document and share 1 million real-life stories of what Jesus has done 
//               in the lives of believers across the world.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-6 mb-16">
//               <button 
//                 onClick={() => setCurrentPage('share')}
//                 className="group bg-amber-400 hover:bg-amber-500 text-black px-8 py-4 rounded-none text-lg font-medium transition-all duration-300 flex items-center justify-center gap-3"
//               >
//                 Share Your Testimony
//                 <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
//               </button>
//               <button 
//                 onClick={() => setCurrentPage('watch')}
//                 className="group border border-white/30 hover:border-white hover:bg-white/10 px-8 py-4 rounded-none text-lg font-light transition-all duration-300 flex items-center justify-center gap-3"
//               >
//                 <Play size={20} />
//                 Watch Stories
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Scripture Quote */}
//       <section className="py-24 bg-white">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <blockquote className="text-2xl md:text-3xl font-light text-gray-800 leading-relaxed mb-8">
//             "In a world full of noise, the voice of truth still cuts through—
//             <em className="text-amber-600"> the voice of testimony</em>."
//           </blockquote>
//           <div className="w-24 h-px bg-amber-400 mx-auto mb-8"></div>
//           <p className="text-lg text-gray-600 font-light leading-relaxed">
//             <strong className="font-medium">Revelation 12:11</strong> says, "They overcame by the blood of the Lamb and by the word of their testimony." 
//             Your story matters. Whether it's a moment of healing, freedom from fear, provision in need, or salvation itself—your testimony has the power to inspire faith and glorify God.
//           </p>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-24 bg-gray-50">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">Our Progress</h2>
//             <p className="text-xl text-gray-600 font-light">Every story matters. Every testimony counts.</p>
//           </div>

//           <div className="bg-white rounded-lg shadow-2xl p-12">
//             <div className="grid md:grid-cols-3 gap-12 text-center">
//               <div>
//                 <div className="text-5xl font-light text-amber-600 mb-4">000</div>
//                 <div className="text-lg font-medium text-gray-900 mb-2">Stories Documented</div>
//                 <div className="text-sm text-gray-500">Growing daily</div>
//               </div>
//               <div>
//                 <div className="text-5xl font-light text-gray-900 mb-4">1M</div>
//                 <div className="text-lg font-medium text-gray-900 mb-2">Our Goal</div>
//                 <div className="text-sm text-gray-500">Testimonies of Jesus</div>
//               </div>
//               <div>
//                 <div className="text-5xl font-light text-purple-600 mb-4">∞</div>
//                 <div className="text-lg font-medium text-gray-900 mb-2">Lives Impacted</div>
//                 <div className="text-sm text-gray-500">Through shared stories</div>
//               </div>
//             </div>

//             <div className="mt-12">
//               <div className="flex justify-between items-center mb-4">
//                 <span className="text-sm font-medium text-gray-600">Progress to 1 Million</span>
//                 <span className="text-sm font-medium text-gray-900">0.01%</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div className="bg-gradient-to-r from-amber-400 to-amber-600 h-2 rounded-full" style={{width: '0.1%'}}></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Featured Video */}
//       <section className="py-24 bg-black text-white">
//         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-4xl md:text-5xl font-light mb-6">Our Mission</h2>
//             <p className="text-xl text-white/70 font-light">Discover the heart behind 1 Million Testimonies</p>
//           </div>

//           <div className="relative group cursor-pointer">
//             <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg aspect-video flex items-center justify-center overflow-hidden">
//               <div className="text-center">
//                 <div className="w-24 h-24 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
//                   <Play size={32} className="text-black ml-1" />
//                 </div>
//                 <p className="text-xl font-light mb-2">60-Second Mission Video</p>
//                 <p className="text-white/60">Coming Soon</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );

//   const AboutPage = () => (
//     <div className="pt-20">
//       {/* Hero */}
//       <section className="py-24 bg-gradient-to-br from-gray-900 to-black text-white">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h1 className="text-5xl md:text-7xl font-light mb-8">
//             Why <span className="text-amber-400 font-medium">1 Million</span> Testimonies?
//           </h1>
//           <div className="w-24 h-px bg-amber-400 mx-auto"></div>
//         </div>
//       </section>

//       {/* Story */}
//       <section className="py-24 bg-white">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="prose prose-xl max-w-none">
//             <p className="text-xl leading-relaxed mb-8 font-light text-gray-700">
//               This mission began with a simple yet overwhelming word from God: <em className="text-amber-600">"Document 1 million testimonies of Jesus."</em> 
//               At first, it seemed impossible. But then I realized—it's not about numbers. It's about obedience. 
//               It's about raising a witness in this generation.
//             </p>

//             <p className="text-xl leading-relaxed mb-12 font-light text-gray-700">
//               Every testimony we share becomes a light in someone's darkness. A reminder that God is still moving, 
//               still healing, still saving. This is not my mission alone—it's a global movement. Together, we can tell 
//               the world about Jesus, one story at a time, until we reach a million.
//             </p>
//           </div>

//           {/* Mission Statement */}
//           <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 p-12 rounded-r-lg">
//             <h3 className="text-2xl font-light text-gray-900 mb-6">Mission Statement</h3>
//             <p className="text-xl font-light text-gray-800 italic leading-relaxed">
//               To collect and share 1 million testimonies of Jesus to inspire faith, glorify God, 
//               and build a living archive of His power in our time.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Values */}
//       <section className="py-24 bg-gray-50">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">Core Values</h2>
//             <div className="w-24 h-px bg-amber-400 mx-auto"></div>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[
//               { icon: Heart, title: 'Faith-Centered', desc: 'Jesus is always at the center of every story we share.' },
//               { icon: Star, title: 'Authenticity', desc: 'Real people sharing genuine moments of transformation.' },
//               { icon: Heart, title: 'Compassion', desc: 'We listen with love and share with care.' },
//               { icon: CheckCircle, title: 'Excellence', desc: 'Quality storytelling that honors the Kingdom.' },
//               { icon: Users, title: 'Community', desc: 'Many voices united in one powerful message.' },
//               { icon: Globe, title: 'Global Impact', desc: 'Reaching every nation with the testimony of Jesus.' }
//             ].map((value, index) => (
//               <div key={index} className="group">
//                 <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 h-full">
//                   <div className="w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-amber-200 transition-colors">
//                     <value.icon className="text-amber-600" size={28} />
//                   </div>
//                   <h3 className="text-xl font-medium text-gray-900 mb-4">{value.title}</h3>
//                   <p className="text-gray-600 font-light leading-relaxed">{value.desc}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );

//   const SharePage = () => (
//     <div className="pt-20">
//       {/* Hero */}
//       <section className="py-24 bg-gradient-to-br from-amber-50 to-orange-100">
//         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-8 leading-tight">
//               Your Story Can <span className="text-amber-600 font-medium">Change</span><br />
//               Someone's Life
//             </h1>
//             <div className="w-24 h-px bg-amber-400 mx-auto mb-8"></div>
//             <p className="text-xl text-gray-700 font-light leading-relaxed max-w-3xl mx-auto">
//               No testimony is too small. If Jesus has done anything in your life—set you free, healed you, 
//               provided for you, restored relationships, saved your soul—it's worth telling.
//             </p>
//           </div>

//           <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
//             <div className="p-12 text-center">
//               <div className="mb-8">
//                 <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
//                   <Mic className="text-amber-600" size={32} />
//                 </div>
//                 <h2 className="text-3xl font-light text-gray-900 mb-4">Share Your Testimony</h2>
//                 <p className="text-gray-600 font-light">
//                   When you share your testimony here, you give hope to someone who needs it. 
//                   You remind the world that our God is alive and still working.
//                 </p>
//               </div>

//               <a 
//                 href="https://forms.gle/jvRVLqxBFS6AW7zq6" 
//                 target="_blank" 
//                 rel="noopener noreferrer"
//                 className="group inline-flex items-center gap-3 bg-amber-400 hover:bg-amber-500 text-black px-10 py-4 rounded-none text-lg font-medium transition-all duration-300"
//               >
//                 Open Testimony Form
//                 <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
//               </a>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Process */}
//       <section className="py-24 bg-white">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-light text-gray-900 mb-6">How It Works</h2>
//             <div className="w-24 h-px bg-amber-400 mx-auto"></div>
//           </div>

//           <div className="grid md:grid-cols-3 gap-12">
//             {[
//               { step: '01', title: 'Share Your Story', desc: 'Tell us how Jesus has worked in your life through our simple form.', icon: Book },
//               { step: '02', title: 'We Review', desc: 'Our team carefully reviews each submission with prayer and care.', icon: CheckCircle },
//               { step: '03', title: 'Inspire Others', desc: 'Your story becomes part of our global archive, inspiring faith worldwide.', icon: Globe }
//             ].map((item, index) => (
//               <div key={index} className="text-center">
//                 <div className="relative mb-8">
//                   <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <item.icon className="text-amber-600" size={32} />
//                   </div>
//                   <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-light">
//                     {item.step}
//                   </div>
//                 </div>
//                 <h3 className="text-xl font-medium text-gray-900 mb-4">{item.title}</h3>
//                 <p className="text-gray-600 font-light leading-relaxed">{item.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );

//   const WatchPage = () => (
//     <div className="pt-20">
//       {/* Hero */}
//       <section className="py-24 bg-gradient-to-br from-gray-900 to-black text-white">
//         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h1 className="text-5xl md:text-6xl font-light mb-8 leading-tight">
//             Be Encouraged by What <span className="text-amber-400 font-medium">Jesus</span> is Doing
//           </h1>
//           <div className="w-24 h-px bg-amber-400 mx-auto mb-8"></div>
//           <p className="text-xl text-white/70 font-light leading-relaxed max-w-3xl mx-auto">
//             Here are real stories from real people whose lives have been changed by Jesus. 
//             Let these testimonies remind you that God's power is still at work—everywhere, every day.
//           </p>
//         </div>
//       </section>

//       {/* Filters */}
//       <section className="py-12 bg-white border-b">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-wrap justify-center gap-4">
//             {['All Stories', 'Healing', 'Salvation', 'Provision', 'Deliverance', 'Other'].map((filter) => (
//               <button
//                 key={filter}
//                 className="px-6 py-3 rounded-none border border-gray-300 text-gray-700 hover:border-amber-400 hover:text-amber-600 transition-all duration-300 font-light"
//               >
//                 {filter}
//               </button>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Featured Story */}
//       <section className="py-24 bg-gray-50">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
//             <div className="grid lg:grid-cols-2">
//               <div className="bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-12">
//                 <div className="text-center text-white">
//                   <div className="w-20 h-20 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-6">
//                     <Play size={32} className="text-black ml-1" />
//                   </div>
//                   <p className="text-lg font-light">Featured Story</p>
//                 </div>
//               </div>
//               <div className="p-12 flex items-center">
//                 <div>
//                   <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-4">
//                     FEATURED
//                   </span>
//                   <h3 className="text-3xl font-light text-gray-900 mb-6">From Darkness to Light</h3>
//                   <p className="text-lg text-gray-600 font-light leading-relaxed mb-8">
//                     "God completely transformed my life when I thought all hope was lost. This is the story of how Jesus found me in my darkest hour..."
//                   </p>
//                   <button className="group inline-flex items-center gap-3 bg-amber-400 hover:bg-amber-500 text-black px-8 py-3 rounded-none font-medium transition-all duration-300">
//                     Watch Now
//                     <Play className="group-hover:scale-110 transition-transform" size={16} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Story Grid */}
//       <section className="py-24 bg-white">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-light text-gray-900 mb-6">More Stories</h2>
//             <div className="w-24 h-px bg-amber-400 mx-auto"></div>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[1, 2, 3, 4, 5, 6].map((story) => (
//               <div key={story} className="group cursor-pointer">
//                 <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
//                   <div className="bg-gradient-to-br from-gray-700 to-gray-800 aspect-video flex items-center justify-center">
//                     <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-amber-400 group-hover:scale-110 transition-all duration-300">
//                       <Play size={20} className="text-white group-hover:text-black ml-1" />
//                     </div>
//                   </div>
//                   <div className="p-6">
//                     <div className="mb-3">
//                       <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded font-medium">Healing</span>
//                     </div>
//                     <h3 className="text-lg font-medium text-gray-900 mb-3">Testimony #{story}</h3>
//                     <p className="text-gray-600 text-sm font-light leading-relaxed mb-4">
//                       A powerful story of transformation and God's faithfulness in the midst of trials...
//                     </p>
//                     <button className="text-amber-600 hover:text-amber-700 font-medium text-sm group-hover:gap-2 flex items-center gap-1 transition-all">
//                       Watch Story <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="text-center mt-16">
//             <p className="text-gray-600 font-light mb-6">New testimonies are added weekly—check back for fresh stories of faith.</p>
//             <button className="bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-none font-light transition-colors">
//               View All Stories
//             </button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );

//   const InvolvedPage = () => (
//     <div className="pt-20">
//       {/* Hero */}
//       <section className="py-24 bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h1 className="text-5xl md:text-6xl font-light mb-8">
//             Join the <span className="text-amber-400 font-medium">Mission</span>
//           </h1>
//           <div className="w-24 h-px bg-amber-400 mx-auto mb-8"></div>
//           <p className="text-xl text-white/70 font-light leading-relaxed">
//             We believe this is Kingdom work—and Kingdom work is best done together.
//           </p>
//         </div>
//       </section>

//       {/* Ways to Partner */}
//       <section className="py-24 bg-white">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-light text-gray-900 mb-6">Ways to Partner</h2>
//             <div className="w-24 h-px bg-amber-400 mx-auto"></div>
//           </div>

//           <div className="grid lg:grid-cols-2 gap-8">
//             {[
//               {
//                 title: 'Share Your Testimony',
//                 desc: 'The heart of the mission. Your story could be the one that changes everything for someone else.',
//                 action: 'Share Now',
//                 color: 'bg-amber-400 hover:bg-amber-500',
//                 icon: Mic
//               },
//               {
//                 title: 'Tell Others',
//                 desc: 'Spread the word online and offline. Help us reach more people with this vision.',
//                 action: 'Get Resources',
//                 color: 'bg-blue-600 hover:bg-blue-700',
//                 icon: Users
//               },
//               {
//                 title: 'Invite Us',
//                 desc: 'Pastor or event organizer? Invite us to record testimonies at your gathering.',
//                 action: 'Send Invitation',
//                 color: 'bg-purple-600 hover:bg-purple-700',
//                 icon: Mail
//               },
//               {
//                 title: 'Support Financially',
//                 desc: 'Help cover travel, equipment, and production costs to expand our reach.',
//                 action: 'Donate Now',
//                 color: 'bg-green-600 hover:bg-green-700',
//                 icon: Heart
//               },
//               {
//                 title: 'Pray',
//                 desc: 'Pray for more hearts to be reached through these stories of transformation.',
//                 action: 'Prayer Guide',
//                 color: 'bg-gray-800 hover:bg-black',
//                 icon: Book
//               },
//               {
//                 title: 'Volunteer',
//                 desc: 'Join our team of volunteers helping to document and share these powerful stories.',
//                 action: 'Learn More',
//                 color: 'bg-orange-600 hover:bg-orange-700',
//                 icon: Star
//               }
//             ].map((way, index) => (
//               <div key={index} className="group">
//                 <div className="bg-gray-50 hover:bg-white rounded-lg p-8 transition-all duration-300 h-full shadow-lg hover:shadow-xl">
//                   <div className="flex items-start gap-4 mb-6">
//                     <div className="w-12 h-12 bg-gray-200 group-hover:bg-amber-100 rounded-lg flex items-center justify-center transition-colors">
//                       <way.icon className="text-gray-600 group-hover:text-amber-600" size={24} />
//                     </div>
//                     <div className="flex-1">
//                       <h3 className="text-xl font-medium text-gray-900 mb-3">{way.title}</h3>
//                       <p className="text-gray-600 font-light leading-relaxed mb-6">{way.desc}</p>
//                       <button className={`${way.color} text-white px-6 py-3 rounded-none font-medium transition-colors`}>
//                         {way.action}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="py-24 bg-gray-900 text-white">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-4xl font-light mb-6">Ready to Make an Impact?</h2>
//           <p className="text-xl text-white/70 font-light mb-12 leading-relaxed">
//             Choose how you'd like to partner with us in this global mission to document 1 million testimonies.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-6 justify-center">
//             <button className="group bg-amber-400 hover:bg-amber-500 text-black px-8 py-4 rounded-none font-medium transition-all duration-300 flex items-center justify-center gap-3">
//               Invite Us to Your Event
//               <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
//             </button>
//             <button className="border border-white/30 hover:border-white hover:bg-white/10 px-8 py-4 rounded-none font-light transition-all duration-300">
//               Support the Mission
//             </button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );

//   const ContactPage = () => (
//     <div className="pt-20">
//       {/* Hero */}
//       <section className="py-24 bg-gradient-to-br from-gray-900 to-black text-white">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h1 className="text-5xl md:text-6xl font-light mb-8">
//             Let's <span className="text-amber-400 font-medium">Connect</span>
//           </h1>
//           <div className="w-24 h-px bg-amber-400 mx-auto mb-8"></div>
//           <p className="text-xl text-white/70 font-light leading-relaxed">
//             Whether you have a testimony to share, want to invite us to your event, or have a question about the mission, we'd love to hear from you.
//           </p>
//         </div>
//       </section>

//       {/* Contact Content */}
//       <section className="py-24 bg-white">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid lg:grid-cols-2 gap-16">
//             {/* Contact Form */}
//             <div>
//               <h2 className="text-3xl font-light text-gray-900 mb-8">Send us a Message</h2>
//               <div className="space-y-6">
//                 <div className="grid sm:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-3">First Name</label>
//                     <input 
//                       type="text" 
//                       className="w-full px-4 py-4 border border-gray-200 rounded-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
//                       placeholder="John"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-3">Last Name</label>
//                     <input 
//                       type="text" 
//                       className="w-full px-4 py-4 border border-gray-200 rounded-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
//                       placeholder="Doe"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-3">Email</label>
//                   <input 
//                     type="email" 
//                     className="w-full px-4 py-4 border border-gray-200 rounded-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
//                     placeholder="john@example.com"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-3">Subject</label>
//                   <input 
//                     type="text" 
//                     className="w-full px-4 py-4 border border-gray-200 rounded-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
//                     placeholder="What's this about?"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-3">Message</label>
//                   <textarea 
//                     rows={6}
//                     className="w-full px-4 py-4 border border-gray-200 rounded-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
//                     placeholder="Tell us more..."
//                   ></textarea>
//                 </div>
//                 <button className="w-full bg-amber-400 hover:bg-amber-500 text-black py-4 rounded-none font-medium transition-colors">
//                   Send Message
//                 </button>
//               </div>
//             </div>

//             {/* Contact Info */}
//             <div>
//               <h2 className="text-3xl font-light text-gray-900 mb-8">Get in Touch</h2>
//               <div className="space-y-8">
//                 <div className="flex items-start gap-4">
//                   <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
//                     <Mail className="text-amber-600" size={24} />
//                   </div>
//                   <div>
//                     <h3 className="font-medium text-gray-900 mb-2">Email Us</h3>
//                     <p className="text-gray-600 font-light">hello@1milliontestimonies.org</p>
//                     <p className="text-gray-500 text-sm mt-1">We'll respond within 24 hours</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-4">
//                   <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
//                     <Phone className="text-amber-600" size={24} />
//                   </div>
//                   <div>
//                     <h3 className="font-medium text-gray-900 mb-2">Call Us</h3>
//                     <p className="text-gray-600 font-light">+1 (555) 123-4567</p>
//                     <p className="text-gray-500 text-sm mt-1">Mon-Fri, 9AM-5PM EST</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-4">
//                   <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
//                     <MapPin className="text-amber-600" size={24} />
//                   </div>
//                   <div>
//                     <h3 className="font-medium text-gray-900 mb-2">Visit Us</h3>
//                     <p className="text-gray-600 font-light">123 Mission Street<br />Faith City, FC 12345</p>
//                     <p className="text-gray-500 text-sm mt-1">By appointment only</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-12 p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
//                 <h3 className="font-medium text-gray-900 mb-3">Quick Response Promise</h3>
//                 <p className="text-gray-700 text-sm font-light leading-relaxed">
//                   We value every message and testimony shared with us. Our team is committed to responding 
//                   to all inquiries within 24-48 hours. For urgent matters or event bookings, please call us directly.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );

//   const Footer = () => (
//     <footer className="bg-black text-white py-16">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid md:grid-cols-4 gap-12 mb-12">
//           <div className="md:col-span-2">
//             <h3 className="text-2xl font-light mb-6 tracking-wider">
//               <span className="font-bold">That</span>ThatTestify
//             </h3>
//             <p className="text-white/70 mb-6 font-light leading-relaxed text-lg">
//               Creating the world's largest archive of Jesus testimonies to inspire faith, 
//               build community, and set people free through the power of shared stories.
//             </p>
//             <div className="flex items-center gap-2 text-amber-400">
//               <Book size={16} />
//               <p className="text-sm font-light">Revelation 12:11</p>
//             </div>
//           </div>

//           <div>
//             <h4 className="font-medium mb-6 text-white">Navigation</h4>
//             <ul className="space-y-3 text-white/70 font-light">
//               <li><button onClick={() => setCurrentPage('about')} className="hover:text-white transition-colors">About Mission</button></li>
//               <li><button onClick={() => setCurrentPage('share')} className="hover:text-white transition-colors">Share Story</button></li>
//               <li><button onClick={() => setCurrentPage('watch')} className="hover:text-white transition-colors">Watch Stories</button></li>
//               <li><button onClick={() => setCurrentPage('involved')} className="hover:text-white transition-colors">Get Involved</button></li>
//             </ul>
//           </div>

//           <div>
//             <h4 className="font-medium mb-6 text-white">Connect</h4>
//             <ul className="space-y-3 text-white/70 font-light">
//               <li><button onClick={() => setCurrentPage('contact')} className="hover:text-white transition-colors">Contact Us</button></li>
//               <li><a href="#" className="hover:text-white transition-colors">Prayer Requests</a></li>
//               <li><a href="#" className="hover:text-white transition-colors">Newsletter</a></li>
//               <li><a href="#" className="hover:text-white transition-colors">Partner With Us</a></li>
//             </ul>
//           </div>
//         </div>

//         <div className="border-t border-white/10 pt-8">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//             <p className="text-white/50 text-sm font-light">
//               &copy; 2025 TheyThatTestify. All rights reserved.
//             </p>
//             <div className="flex items-center gap-2 text-white/50 text-sm">
//               <span>501(c)(3) Non-profit Organization</span>
//               <span>•</span>
//               <span>Tax ID: 12-3456789</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );

//   const renderPage = () => {
//     switch(currentPage) {
//       case 'home': return <HomePage />;
//       case 'about': return <AboutPage />;
//       case 'share': return <SharePage />;
//       case 'watch': return <WatchPage />;
//       case 'involved': return <InvolvedPage />;
//       case 'contact': return <ContactPage />;
//       default: return <HomePage />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <NavBar />
//       {renderPage()}
//       <Footer />
//     </div>
//   );
// };

// export default Home;










//pages/Home.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronDown, Play, Users, Heart, Globe, Star, Mail, Phone, MapPin, Menu, X, ArrowRight, CheckCircle, Book, Video, Mic, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { URL } from '../url';



const Home = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // API Data State
  const [stats, setStats] = useState(null);
  const [featuredTestimonies, setFeaturedTestimonies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch data when component mounts or page changes
  useEffect(() => {
    if (currentPage === 'home') {
      fetchHomeData();
    } else if (currentPage === 'watch') {
      fetchWatchData();
    } else if (currentPage === 'share') {
      fetchCategories();
    }
  }, [currentPage]);

  const fetchHomeData = async () => {
    try {
      setLoading(true);
      const [statsResponse, featuredResponse] = await Promise.all([
        axios.get(`${URL}/testimonies/stats`),
        axios.get(`${URL}/testimonies/featured?limit=3`)
      ]);

      setStats(statsResponse.data.stats);
      setFeaturedTestimonies(featuredResponse.data.testimonies);
    } catch (error) {
      console.error('Failed to fetch home data:', error);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const fetchWatchData = async () => {
    try {
      setLoading(true);
      const [featuredResponse, allTestimoniesResponse] = await Promise.all([
        axios.get(`${URL}/testimonies/featured?limit=1`),
        axios.get(`${URL}/testimonies?limit=6`)
      ]);

      setFeaturedTestimonies(featuredResponse.data.testimonies);
      setAllTestimonies(allTestimoniesResponse.data.testimonies || []);
    } catch (error) {
      console.error('Failed to fetch testimonies:', error);
      setError('Failed to load testimonies');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${URL}/categories`);
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      setError('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  // Add state for all testimonies
  const [allTestimonies, setAllTestimonies] = useState([]);

  const navigation = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Share Your Story', id: 'share' },
    { name: 'Watch Stories', id: 'watch' },
    { name: 'Get Involved', id: 'involved' },
    { name: 'Contact', id: 'contact' }
  ];

  const NavBar = () => (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-lg' : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-light text-white tracking-wider">
                <span className="font-bold">They</span>ThatTestify
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`text-lg font-light tracking-wide transition-all duration-300 relative ${currentPage === item.id
                  ? 'text-gray-500 hover:text-gray-500'
                  : 'text-amber-400'
                  } after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-amber-400 after:left-0 after:bottom-[-8px] after:transition-all after:duration-300 ${currentPage === item.id ? 'after:w-full' : 'hover:after:w-full'
                  }`}
              >
                {item.name}
              </button>
            ))}

            {/* Login Link */}
            <div className="hidden md:flex items-center">
              <a
                href="/login"
                className="text-white/80 hover:text-amber-400 transition-colors text-sm font-light tracking-wide px-4 py-2 border border-white/20 rounded-full hover:border-amber-400/40"
              >
                Login
              </a>
            </div>

          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
              <a 
              href="/login" 
              className="text-white/80 hover:text-amber-400 transition-colors text-sm font-light tracking-wide px-3 py-1.5 border border-white/20 rounded-full hover:border-amber-400/40"
            >
              Login
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white/80 hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            
         
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block px-3 py-4 text-base font-light w-full text-left tracking-wide transition-colors ${currentPage === item.id
                  ? 'text-amber-400'
                  : 'text-white/80 hover:text-white'
                  }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );

  const HomePage = () => (
    <div>
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-800 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-4xl">
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-amber-400/20 text-amber-400 rounded-full text-sm font-medium tracking-wide mb-6">
                GLOBAL MISSION
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-light mb-8 leading-tight">
              <span className="block">1 Million</span>
              <span className="block text-amber-400 font-medium">Testimonies</span>
              <span className="block text-3xl md:text-4xl font-light text-white/70 mt-4">
                One Global Witness
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl font-light leading-relaxed">
              We're on a mission to document and share 1 million real-life stories of what Jesus has done
              in the lives of believers across the world.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 mb-16">
              <button
                onClick={() => setCurrentPage('share')}
                className="group bg-amber-400 hover:bg-amber-500 text-black px-8 py-4 rounded-none text-lg font-medium transition-all duration-300 flex items-center justify-center gap-3"
              >
                Share Your Testimony
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              <button
                onClick={() => setCurrentPage('watch')}
                className="group border border-white/30 hover:border-white hover:bg-white/10 px-8 py-4 rounded-none text-lg font-light transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Play size={20} />
                Watch Stories
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Scripture Quote */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <blockquote className="text-2xl md:text-3xl font-light text-gray-800 leading-relaxed mb-8">
            "In a world full of noise, the voice of truth still cuts through—
            <em className="text-amber-600"> the voice of testimony</em>."
          </blockquote>
          <div className="w-24 h-px bg-amber-400 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 font-light leading-relaxed">
            <strong className="font-medium">Revelation 12:11</strong> says, "They overcame by the blood of the Lamb and by the word of their testimony."
            Your story matters. Whether it's a moment of healing, freedom from fear, provision in need, or salvation itself—your testimony has the power to inspire faith and glorify God.
          </p>
        </div>
      </section>

      {/* Stats Section - Now with real data */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">Our Progress</h2>
            <p className="text-xl text-gray-600 font-light">Every story matters. Every testimony counts.</p>
          </div>

          <div className="bg-white rounded-lg shadow-2xl p-12">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
              </div>
            ) : error ? (
              <div className="text-center text-red-600">{error}</div>
            ) : (
              <>
                <div className="grid md:grid-cols-3 gap-12 text-center">
                  <div>
                    <div className="text-5xl font-light text-amber-600 mb-4">
                      {stats?.totalApproved?.toLocaleString() || '0'}
                    </div>
                    <div className="text-lg font-medium text-gray-900 mb-2">Stories Documented</div>
                    <div className="text-sm text-gray-500">Growing daily</div>
                  </div>
                  <div>
                    <div className="text-5xl font-light text-gray-900 mb-4">1M</div>
                    <div className="text-lg font-medium text-gray-900 mb-2">Our Goal</div>
                    <div className="text-sm text-gray-500">Testimonies of Jesus</div>
                  </div>
                  <div>
                    <div className="text-5xl font-light text-purple-600 mb-4">
                      {stats?.totalViews?.toLocaleString() || '∞'}
                    </div>
                    <div className="text-lg font-medium text-gray-900 mb-2">Lives Impacted</div>
                    <div className="text-sm text-gray-500">Through shared stories</div>
                  </div>
                </div>

                <div className="mt-12">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium text-gray-600">Progress to 1 Million</span>
                    <span className="text-sm font-medium text-gray-900">
                      {stats?.progressToGoal || '0.00'}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-amber-400 to-amber-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${Math.max(0.1, parseFloat(stats?.progressToGoal || 0))}%` }}
                    ></div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Featured Testimonies Section */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-light mb-6">Featured Stories</h2>
            <p className="text-xl text-white/70 font-light">Recent testimonies of God's faithfulness</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-400"></div>
            </div>
          ) : featuredTestimonies.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {featuredTestimonies.map((testimony) => (
                <Link

                  key={testimony.id}
                  to={`/testimony/${testimony.id}`}
                  className="group cursor-pointer">

                  <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 hover:bg-white/15 transition-all duration-300 h-full">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center mr-3">
                        {testimony.type === 'video' ? (
                          <Video size={20} className="text-black" />
                        ) : (
                          <Book size={20} className="text-black" />
                        )}
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-amber-400 mr-1" />
                        <span className="text-sm text-amber-400">Featured</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-medium text-white mb-3 group-hover:text-amber-400 transition-colors">
                      {testimony.title}
                    </h3>
                    <p className="text-white/70 text-sm mb-4 line-clamp-3">
                      {testimony.type === 'written'
                        ? testimony.content?.substring(0, 150) + '...'
                        : 'Watch this powerful video testimony of transformation.'
                      }
                    </p>
                    <div className="flex items-center justify-between text-sm text-white/60">
                      <span>{testimony.category?.name}</span>
                      <span>{testimony.viewCount || 0} views</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <div className="w-20 h-20 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Play size={32} className="text-black ml-1" />
              </div>
              <p className="text-xl font-light mb-2">Featured Stories Coming Soon</p>
              <p className="text-white/60">Be the first to share your testimony!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );

  const SharePage = () => (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-8 leading-tight">
              Your Story Can <span className="text-amber-600 font-medium">Change</span><br />
              Someone's Life
            </h1>
            <div className="w-24 h-px bg-amber-400 mx-auto mb-8"></div>
            <p className="text-xl text-gray-700 font-light leading-relaxed max-w-3xl mx-auto">
              No testimony is too small. If Jesus has done anything in your life—set you free, healed you,
              provided for you, restored relationships, saved your soul—it's worth telling.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
            <div className="p-12 text-center">
              <div className="mb-8">
                <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mic className="text-amber-600" size={32} />
                </div>
                <h2 className="text-3xl font-light text-gray-900 mb-4">Share Your Testimony</h2>
                <p className="text-gray-600 font-light mb-6">
                  When you share your testimony here, you give hope to someone who needs it.
                  You remind the world that our God is alive and still working.
                </p>

                {/* Categories Display */}
                {categories.length > 0 && (
                  <div className="mb-8">
                    <p className="text-sm text-gray-600 mb-4">Choose from categories like:</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {categories.slice(0, 6).map((category) => (
                        <span
                          key={category.id}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                        >
                          {category.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/share-testimony"
                className="group inline-flex items-center gap-3 bg-amber-400 hover:bg-amber-500 text-black px-10 py-4 rounded-none text-lg font-medium transition-all duration-300"
              >
                Share your testimony
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - same as original */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-6">How It Works</h2>
            <div className="w-24 h-px bg-amber-400 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: '01', title: 'Share Your Story', desc: 'Tell us how Jesus has worked in your life through our simple form.', icon: Book },
              { step: '02', title: 'We Review', desc: 'Our team carefully reviews each submission with prayer and care.', icon: CheckCircle },
              { step: '03', title: 'Inspire Others', desc: 'Your story becomes part of our global archive, inspiring faith worldwide.', icon: Globe }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-8">
                  <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="text-amber-600" size={32} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-light">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const WatchPage = () => (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-light mb-8 leading-tight">
            Be Encouraged by What <span className="text-amber-400 font-medium">Jesus</span> is Doing
          </h1>
          <div className="w-24 h-px bg-amber-400 mx-auto mb-8"></div>
          <p className="text-xl text-white/70 font-light leading-relaxed max-w-3xl mx-auto">
            Here are real stories from real people whose lives have been changed by Jesus.
            Let these testimonies remind you that God's power is still at work—everywhere, every day.
          </p>
        </div>
      </section>

      {/* Featured Story */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
            </div>
          ) : featuredTestimonies.length > 0 ? (
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
              <div className="grid lg:grid-cols-2">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-12">
                  <div className="text-center text-white">
                    <div className="w-20 h-20 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-6">
                      {featuredTestimonies[0].type === 'video' ? (
                        <Play size={32} className="text-black ml-1" />
                      ) : (
                        <Book size={32} className="text-black" />
                      )}
                    </div>
                    <p className="text-lg font-light">Featured Story</p>
                  </div>
                </div>
                <div className="p-12 flex items-center">
                  <div>
                    <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-4">
                      FEATURED
                    </span>
                    <h3 className="text-3xl font-light text-gray-900 mb-6">{featuredTestimonies[0].title}</h3>
                    <p className="text-lg text-gray-600 font-light leading-relaxed mb-8">
                      {featuredTestimonies[0].type === 'written'
                        ? featuredTestimonies[0].content?.substring(0, 200) + '...'
                        : 'Watch this powerful video testimony of transformation and God\'s faithfulness.'
                      }
                    </p>
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-sm text-gray-500">
                        By {featuredTestimonies[0].isAnonymous ? 'Anonymous' : `${featuredTestimonies[0].user?.firstName || 'A'} ${featuredTestimonies[0].user?.lastName || 'Believer'}`}
                      </span>
                      <span className="text-sm text-gray-500">
                        {featuredTestimonies[0].viewCount || 0} views
                      </span>
                    </div>
                    <Link
                      to={`/testimony/${featuredTestimonies[0].id}`}
                      className="group inline-flex items-center gap-3 bg-amber-400 hover:bg-amber-500 text-black px-8 py-3 rounded-none font-medium transition-all duration-300">
                      {featuredTestimonies[0].type === 'video' ? 'Watch Now' : 'Read Story'}
                      {featuredTestimonies[0].type === 'video' ? (
                        <Play className="group-hover:scale-110 transition-transform" size={16} />
                      ) : (
                        <Book className="group-hover:scale-110 transition-transform" size={16} />
                      )}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-2xl p-12 text-center">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Play size={32} className="text-amber-600 ml-1" />
              </div>
              <h3 className="text-2xl font-light text-gray-900 mb-4">Stories Coming Soon</h3>
              <p className="text-gray-600">Be the first to share your testimony and inspire others!</p>
            </div>
          )}
        </div>
      </section>

      {/* Story Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-6">More Stories</h2>
            <div className="w-24 h-px bg-amber-400 mx-auto"></div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
            </div>
          ) : allTestimonies.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allTestimonies.map((testimony) => (
                // <div key={testimony.id} className="group cursor-pointer">
                <Link key={testimony.id} to={`/testimony/${testimony.id}`} className="group cursor-pointer">
                  <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="bg-gradient-to-br from-gray-700 to-gray-800 aspect-video flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-amber-400 group-hover:scale-110 transition-all duration-300">
                        {testimony.type === 'video' ? (
                          <Play size={20} className="text-white group-hover:text-black ml-1" />
                        ) : (
                          <Book size={20} className="text-white group-hover:text-black" />
                        )}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="mb-3">
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded font-medium">
                          {testimony.category?.name || 'Testimony'}
                        </span>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-3">{testimony.title}</h3>
                      <p className="text-gray-600 text-sm font-light leading-relaxed mb-4">
                        {testimony.type === 'written'
                          ? testimony.content?.substring(0, 100) + '...'
                          : 'A powerful video story of transformation and God\'s faithfulness...'
                        }
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs text-gray-500">
                          {testimony.viewCount || 0} views
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(testimony.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <button className="text-amber-600 hover:text-amber-700 font-medium text-sm group-hover:gap-2 flex items-center gap-1 transition-all">
                        {testimony.type === 'video' ? 'Watch Story' : 'Read Story'}
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-500">No testimonies available yet. Be the first to share!</p>
            </div>
          )}

          <div className="text-center mt-16">
            <p className="text-gray-600 font-light mb-6">
              {allTestimonies.length > 0
                ? 'New testimonies are added weekly—check back for fresh stories of faith.'
                : 'Share your testimony to inspire others with God\'s goodness in your life.'
              }
            </p>
            <Link
              // onClick={() => setCurrentPage('share')}
              to="/share-testimony"
              className="bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-none font-light transition-colors"
            >
              Share Your Story
            </Link>
          </div>
        </div>
      </section>
    </div>
  );

  // Keep all your existing page components (AboutPage, InvolvedPage, ContactPage) unchanged
  const AboutPage = () => (
    // ... your existing AboutPage component code
    <div className="pt-20">
      {/* Keep your existing About page content */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-light mb-8">
            Why <span className="text-amber-400 font-medium">1 Million</span> Testimonies?
          </h1>
          <div className="w-24 h-px bg-amber-400 mx-auto"></div>
        </div>
      </section>
      {/* ... rest of your About content */}
    </div>
  );

  const InvolvedPage = () => (
    // ... your existing InvolvedPage component code
    <div className="pt-20">
      <section className="py-24 bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-light mb-8">
            Join the <span className="text-amber-400 font-medium">Mission</span>
          </h1>
          <div className="w-24 h-px bg-amber-400 mx-auto mb-8"></div>
          <p className="text-xl text-white/70 font-light leading-relaxed">
            We believe this is Kingdom work—and Kingdom work is best done together.
          </p>
        </div>
      </section>
      {/* ... rest of your Involved content */}
    </div>
  );

  const ContactPage = () => (
    // ... your existing ContactPage component code
    <div className="pt-20">
      <section className="py-24 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-light mb-8">
            Let's <span className="text-amber-400 font-medium">Connect</span>
          </h1>
          <div className="w-24 h-px bg-amber-400 mx-auto mb-8"></div>
          <p className="text-xl text-white/70 font-light leading-relaxed">
            Whether you have a testimony to share, want to invite us to your event, or have a question about the mission, we'd love to hear from you.
          </p>
        </div>
      </section>
      {/* ... rest of your Contact content */}
    </div>
  );

  const Footer = () => (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-light mb-6 tracking-wider">
              <span className="font-bold">They</span>ThatTestify
            </h3>
            <p className="text-white/70 mb-6 font-light leading-relaxed text-lg">
              Creating the world's largest archive of Jesus testimonies to inspire faith,
              build community, and set people free through the power of shared stories.
            </p>
            <div className="flex items-center gap-2 text-amber-400">
              <Book size={16} />
              <p className="text-sm font-light">Revelation 12:11</p>
            </div>

            {/* Real-time stats in footer */}
            {stats && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-light text-amber-400">
                      {stats.totalApproved?.toLocaleString() || '0'}
                    </div>
                    <div className="text-xs text-white/60">Testimonies</div>
                  </div>
                  <div>
                    <div className="text-2xl font-light text-amber-400">
                      {stats.totalViews?.toLocaleString() || '0'}
                    </div>
                    <div className="text-xs text-white/60">Total Views</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div>
            <h4 className="font-medium mb-6 text-white">Navigation</h4>
            <ul className="space-y-3 text-white/70 font-light">
              <li><button onClick={() => setCurrentPage('about')} className="hover:text-white transition-colors">About Mission</button></li>
              <li><button onClick={() => setCurrentPage('share')} className="hover:text-white transition-colors">Share Story</button></li>
              <li><button onClick={() => setCurrentPage('watch')} className="hover:text-white transition-colors">Watch Stories</button></li>
              <li><button onClick={() => setCurrentPage('involved')} className="hover:text-white transition-colors">Get Involved</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-6 text-white">Connect</h4>
            <ul className="space-y-3 text-white/70 font-light">
              <li><button onClick={() => setCurrentPage('contact')} className="hover:text-white transition-colors">Contact Us</button></li>
              <li><a href="#" className="hover:text-white transition-colors">Prayer Requests</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Newsletter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Partner With Us</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm font-light">
              &copy; 2025 TheyThatTestify. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <span>501(c)(3) Non-profit Organization</span>
              <span>•</span>
              <span>Tax ID: 12-3456789</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage />;
      case 'about': return <AboutPage />;
      case 'share': return <SharePage />;
      case 'watch': return <WatchPage />;
      case 'involved': return <InvolvedPage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      {renderPage()}
      <Footer />
    </div>
  );
};

export default Home;




