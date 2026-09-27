import React, { useState } from 'react';

const HomePage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ loading: false, success: true, error: '' });
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000);
      } else {
        setStatus({ loading: false, success: false, error: data.error || 'Something went wrong.' });
      }
    } catch (err) {
      setStatus({ loading: false, success: false, error: 'Could not connect to the server. Check if backend is running.' });
    }
  };

  return (
    <div className="bg-[#09090b] text-white">

      {/* 1. HERO SECTION */}
      <section id="hero" className="py-20 px-6 md:px-16 lg:px-24 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-[0_4px_20px_rgba(255,99,71,0.35)]">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-900 text-emerald-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Open to opportunities
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight text-white">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">Jagadeeswaran K.</span><br />
            I build modern web applications.
          </h1>
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed font-normal">
            I'm a Full-Stack Developer focused on building responsive, scalable and user-friendly applications using modern technologies.
          </p>

          <div className="space-y-4 pt-2">
            <div className="flex flex-wrap gap-4">
              <a href="#projects" className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition shadow-lg shadow-rose-600/30">
                View My Projects →
              </a>
              <a href="#contact" className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 font-bold px-6 py-3.5 rounded-xl text-sm transition">
                Let's Connect
              </a>
            </div>

            <div className="flex items-center gap-6 text-sm text-zinc-400 pt-1">
              <a href="https://github.com/dharshini-git07" target="_blank" rel="noreferrer" className="hover:text-rose-400 transition flex items-center gap-1 font-medium">
                GitHub ↗
              </a>
              <span>•</span>
              <a href="#about" className="hover:text-rose-400 transition flex items-center gap-1 font-medium">
                About Me ↗
              </a>
              <span>•</span>
              <a href="#contact" className="hover:text-rose-400 transition flex items-center gap-1 font-medium">
                Contact ↗
              </a>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[520px] bg-[#0d1117] border border-zinc-800 rounded-3xl p-7 shadow-2xl relative transition-all duration-300 shadow-[0_0_35px_rgba(255,99,71,0.35)] border-[#ff6347]/50 group">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800/80">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
            </div>
            <span className="text-zinc-500 font-mono text-xs">developer.js</span>
          </div>

          <div className="font-mono text-xs md:text-sm space-y-2 py-2">
            <p><span className="text-purple-400">const</span> <span className="text-blue-400">developer</span> = {'{'}</p>
            <div className="pl-6 space-y-1.5">
              <p><span className="text-zinc-300">name:</span> <span className="text-emerald-400">"Jagadeeswaran K."</span>,</p>
              <p><span className="text-zinc-300">role:</span> <span className="text-emerald-400">"Full-Stack Developer"</span>,</p>
              <p><span className="text-zinc-300">frontend:</span> <span className="text-emerald-400">"React"</span>,</p>
              <p><span className="text-zinc-300">backend:</span> <span className="text-emerald-400">"Node.js"</span>,<span className="text-emerald-400">"Express.js"</span>,</p>
              <p><span className="text-zinc-300">database:</span> <span className="text-emerald-400">"MongoDB"</span>,</p>
              <p><span className="text-zinc-300">focus:</span> <span className="text-emerald-400">"Building"</span></p>
            </div>
            <p>{'};'}</p>
          </div>

          <div className="mt-6 bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-4 flex items-center justify-between">
            <span className="text-xs text-zinc-400 font-medium">Current status</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-semibold text-emerald-400">Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section id="about" className="py-20 px-6 md:px-16 lg:px-24 border-t border-zinc-900 shadow-[0_4px_20px_rgba(255,99,71,0.35)]">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <span className="text-xs uppercase tracking-widest text-rose-500 font-bold bg-rose-950/40 px-3 py-1 rounded-full border border-rose-900">
            Background & Passion
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white">About Me</h2>
          <div className="w-12 h-1 bg-rose-600 mx-auto rounded-full mt-2"></div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                "Passionate & Self-Taught Software Developer"
              </h3>
              <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                I am <strong className="text-rose-500 font-semibold"> Jagadeeswaran K.</strong> I've completed my Bachelor of Engineering in Mechanical Engineering at <strong className="text-white font-semibold">St. Joseph’s Institute of Technology, Chennai</strong> with a stellar academic record of <strong className="text-rose-400 font-semibold">8.2 CGPA</strong>.
              </p>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                Self-taught Software Developer with a background in Mechanical Engineering. Blending engineering problem-solving skills with modern software development to build impactful applications.
              </p>
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                I specialize in full stack web development using the <strong className="text-white font-semibold">MERN Stack</strong> (MongoDB, Express.js, React, Node.js) and possess a deep interest in <strong className="text-white font-semibold">Java Development, Artificial Intelligence, Machine Learning</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
              <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-3xl space-y-1 hover:shadow-[0_0_35px_rgba(255,99,71,0.35)] hover:border-[#ff6347]/50">
                <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Education</span>
                <h4 className="font-bold text-white text-base">B.E. Mechanical</h4>
                <p className="text-xs text-rose-500 font-semibold"> CGPA 8.776</p>
              </div>
              <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-3xl space-y-1 hover:shadow-[0_0_35px_rgba(255,99,71,0.35)] hover:border-[#ff6347]/50">
                <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Institution</span>
                <h4 className="font-bold text-white text-base">St. Joseph’s Institute of Technology, Chennai.</h4>
                <p className="text-xs text-zinc-400">Anna University Affiliated</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl space-y-6 shadow-xl shadow-[0_0_35px_rgba(255,99,71,0.35)] border-[#ff6347]/50">
            <h3 className="text-xl font-bold text-white border-b border-zinc-800 pb-4">Core Technical Focus</h3>

            <div className="space-y-5 text-sm">
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-rose-500 mt-2 shrink-0"></span>
                <div>
                  <h4 className="font-bold text-white">Full Stack Development</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">Building responsive web applications</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-rose-500 mt-2 shrink-0"></span>
                <div>
                  <h4 className="font-bold text-white">MERN Stack</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">MongoDB, Express.js, React.js, Node.js</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-rose-500 mt-2 shrink-0"></span>
                <div>
                  <h4 className="font-bold text-white">Java Development</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">Java, Springboot, Microservices</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-rose-500 mt-2 shrink-0"></span>
                <div>
                  <h4 className="font-bold text-white">Artificial Intelligence & ML</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">Intelligent automation and models</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SKILLS SECTION (Updated with 4 cards and counts matching design) */}
      <section id="skills" className="py-20 px-6 md:px-16 lg:px-24 border-t border-zinc-900 shadow-[0_4px_20px_rgba(255,99,71,0.35)]">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <span className="text-xs uppercase tracking-widest text-rose-500 font-bold bg-rose-950/40 px-3 py-1 rounded-full border border-rose-900">
            Technical Proficiency
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white">Technical Skills</h2>
          <p className="text-zinc-400 text-sm pt-1">Technologies, frameworks, and tools I use to build robust full-stack software solutions</p>
          <div className="w-12 h-1 bg-rose-600 mx-auto rounded-full mt-2"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Frontend Development */}
          <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl space-y-4 hover:shadow-[0_0_35px_rgba(255,99,71,0.35)] hover:border-[#ff6347]/50">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="font-bold text-base text-white">Frontend Development</h3>
              <span className="text-xs font-semibold text-rose-500">5 Tools</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS'].map(skill => (
                <span key={skill} className="px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-medium text-zinc-300">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Backend & Database */}
          <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl space-y-4 hover:shadow-[0_0_35px_rgba(255,99,71,0.35)] hover:border-[#ff6347]/50">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="font-bold text-base text-white">Backend & Database</h3>
              <span className="text-xs font-semibold text-rose-500">4 Tools</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {['Node.js', 'Express.js', 'MongoDB', 'Firebase'].map(skill => (
                <span key={skill} className="px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-medium text-zinc-300">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Programming Languages */}
          <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl space-y-4 hover:shadow-[0_0_35px_rgba(255,99,71,0.35)] hover:border-[#ff6347]/50">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="font-bold text-base text-white">Programming Languages</h3>
              <span className="text-xs font-semibold text-rose-500">4 Tools</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {['C', 'Java', 'JavaScript', 'Python'].map(skill => (
                <span key={skill} className="px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-medium text-zinc-300">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Tools & Version Control */}
          <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl space-y-4 hover:shadow-[0_0_35px_rgba(255,99,71,0.35)] hover:border-[#ff6347]/50">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="font-bold text-base text-white">Tools & Version Control</h3>
              <span className="text-xs font-semibold text-rose-500">3 Tools</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {['Git', 'GitHub', 'Vercel'].map(skill => (
                <span key={skill} className="px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-medium text-zinc-300">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. PROJECTS SECTION (All 4 Projects Restored in Full Detail) */}
      <section id="projects" className="py-20 px-6 md:px-16 lg:px-24 border-t border-zinc-900 shadow-[0_4px_20px_rgba(255,99,71,0.35)]">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <span className="text-xs uppercase tracking-widest text-rose-500 font-bold bg-rose-950/40 px-3 py-1 rounded-full border border-rose-900">
            Portfolio Work
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white">Featured Projects</h2>
          <p className="text-zinc-400 text-sm pt-1">Software and full-stack engineering projects developed by Jagadeeswaran K.</p>
          <div className="w-12 h-1 bg-rose-600 mx-auto rounded-full mt-2"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">

          {/* Project 1 */}
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-8 flex flex-col justify-between space-y-6 shadow-xl hover:shadow-[0_0_35px_rgba(255,99,71,0.35)] hover:border-[#ff6347]/50">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white leading-snug">Bulk Mail – Email Management System</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                I built a responsive, feature-packed MERN stack application designed to simplify bulk email distribution with custom Excel parsing, live tracking, and secure multi-database authentication.
              </p>

              <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-2xl p-5 space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-500">Key Features</h4>
                <ul className="space-y-1.5 text-xs text-zinc-300">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                    Integrated SheetJS (xlsx) parsing to extract recipient lists
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                    Effortlessly handle bulk email campaigns via spreadsheet or quick single/manual entries
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                    Automatically records sent emails, exact timestamps, recipient lists, and delivery statuses.
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {['React', 'Express.js', 'Node.js', 'MongoDB', 'Nodemailer'].map(t => (
                <span key={t} className="px-3.5 py-1.5 bg-zinc-950 text-rose-400 border border-zinc-800 rounded-xl text-xs font-medium">{t}</span>
              ))}
            </div>
          </div>

          {/* Project 2 */}
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-8 flex flex-col justify-between space-y-6 shadow-xl hover:shadow-[0_0_35px_rgba(255,99,71,0.35)] hover:border-[#ff6347]/50">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white leading-snug">Weather Report App</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                  A real-time, fully responsive weather dashboard designed to provide instant weather updates, local time/date tracking, and comprehensive atmospheric metrics.
              </p>

              <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-2xl p-5 space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-500">Key Features</h4>
                <ul className="space-y-1.5 text-xs text-zinc-300">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                    Instant weather lookup for any city worldwide
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                    Calculates dynamic local times and formatted dates using API timezone offsets
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                   Displays temperature, min/max ranges, humidity, wind speed, pressure, visibility, and UV index categories
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {['React', 'Node.js', 'Express.js', 'API', 'Tailwind CSS'].map(t => (
                <span key={t} className="px-3.5 py-1.5 bg-zinc-950 text-rose-400 border border-zinc-800 rounded-xl text-xs font-medium">{t}</span>
              ))}
            </div>
          </div>

          {/* Project 3 */}
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-8 flex flex-col justify-between space-y-6 shadow-xl hover:shadow-[0_0_35px_rgba(255,99,71,0.35)] hover:border-[#ff6347]/50">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white leading-snug">Student Portal Web App</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                I built a clean, fully responsive, and interactive dashboard designed to help manage student profiles, monitor academic performance, and bookmark top performers seamlessly.
              </p>

              <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-2xl p-5 space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-500">Key Features</h4>
                <ul className="space-y-1.5 text-xs text-zinc-300">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                    Custom LED-style status light bars and color-coded score badges dynamically tiered by marks
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                    Instant bookmarking system to save and organize key student profiles
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                    In-depth card overlays showing roll numbers, age, batch details, and performance metrics
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {['MERN Stack', 'React', 'Node.js', 'React Router'].map(t => (
                <span key={t} className="px-3.5 py-1.5 bg-zinc-950 text-rose-400 border border-zinc-800 rounded-xl text-xs font-medium">{t}</span>
              ))}
            </div>
          </div>

          {/* Project 4 */}
          {/* <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-8 flex flex-col justify-between space-y-6 shadow-xl hover:shadow-[0_0_35px_rgba(255,99,71,0.35)] hover:border-[#ff6347]/50">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white leading-snug">FaceSecure Lite</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                A lightweight facial detection and verification security portal designed for fast user authentication and attendance logging.
              </p>

              <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-2xl p-5 space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-500">Key Features</h4>
                <ul className="space-y-1.5 text-xs text-zinc-300">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                    Real-time face detection algorithms
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                    Secure biometric verification dashboard
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                    Lightweight deployment footprint
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {['Python', 'Computer Vision', 'React', 'Tailwind CSS'].map(t => (
                <span key={t} className="px-3.5 py-1.5 bg-zinc-950 text-rose-400 border border-zinc-800 rounded-xl text-xs font-medium">{t}</span>
              ))}
            </div>
          </div> */}

        </div>
      </section>

      {/* 5. EDUCATION SECTION */}
      <section id="education" className="py-20 px-6 md:px-16 lg:px-24 border-t border-zinc-900 shadow-[0_4px_20px_rgba(255,99,71,0.35)]">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <span className="text-xs uppercase tracking-widest text-rose-500 font-bold bg-rose-950/40 px-3 py-1 rounded-full border border-rose-900">
            Academic Credentials
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white">Educational Background</h2>
          <div className="w-12 h-1 bg-rose-600 mx-auto rounded-full mt-2"></div>
        </div>

        <div className="max-w-4xl mx-auto bg-zinc-900/40 border border-zinc-800 p-8 md:p-10 rounded-3xl shadow-xl space-y-8 shadow-[0_0_35px_rgba(255,99,71,0.35)] border-[#ff6347]/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-800/80 pb-8">
            <div className="space-y-2">
              <span className="px-3 py-1 bg-rose-950/40 border border-rose-900 text-rose-500 rounded-full text-xs font-semibold inline-block">
                Undergraduate Degree
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white">St. Joseph’s Institute of Technology, Chennai</h3>
              <p className="text-zinc-400 text-sm md:text-base">Bachelor of Engineering in Mechanical Engineering</p>
            </div>
            <div className="bg-gradient-to-br from-zinc-950 to-zinc-900 border border-zinc-800 p-5 rounded-2xl text-center min-w-[180px] shadow-lg">
              <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest block mb-1">Cumulative GPA</span>
              <span className="text-3xl font-black text-rose-500">8.2</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONTACT SECTION (With Nodemailer integration) */}
      <section id="contact" className="py-20 px-6 md:px-16 lg:px-24 border-t border-zinc-900 shadow-[0_4px_20px_rgba(255,99,71,0.35)]">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <span className="text-xs uppercase tracking-widest text-rose-500 font-bold bg-rose-950/40 px-3 py-1 rounded-full border border-rose-900">
            Let's Connect
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white">Get In Touch</h2>
          <p className="text-zinc-400 text-sm">Have an opportunity or inquiry? Send me a message!</p>
          <div className="w-12 h-1 bg-rose-600 mx-auto rounded-full mt-2"></div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Contact Details</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                I am open to software development opportunities and technical collaborations.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-2xl flex items-center gap-4 shadow-md hover:shadow-[0_0_35px_rgba(255,99,71,0.35)] hover:border-[#ff6347]/50">
                <div className="w-10 h-10 rounded-xl bg-rose-950/40 border border-rose-900 flex items-center justify-center text-rose-500 font-bold text-sm">✉</div>
                <div>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">Email</span>
                  <a href="mailto:kjagadeeswaran007@gmail.com" className="text-sm font-bold text-white hover:text-rose-400 transition">
                  kjagadeeswaran007@gmail.com
                  </a>
                </div>
              </div>

              <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-2xl flex items-center gap-4 shadow-md hover:shadow-[0_0_35px_rgba(255,99,71,0.35)] hover:border-[#ff6347]/50">
                <div className="w-10 h-10 rounded-xl bg-blue-950/40 border border-blue-900 flex items-center justify-center text-blue-400 font-bold text-sm">in</div>
                <div>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">LinkedIn</span>
                  <a href="https://www.linkedin.com/in/jagadeeswaran-k-a21a43227/" target="_blank" rel="noreferrer" className="text-sm font-bold text-white hover:text-rose-400 transition">
                    Jagadeeswaran K
                  </a>
                </div>
              </div>

              <div className="bg-zinc-900/40 border border-zinc-800 p-4 rounded-2xl flex items-center gap-4 shadow-md hover:shadow-[0_0_35px_rgba(255,99,71,0.35)] hover:border-[#ff6347]/50">
                <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-300 font-bold text-xs">git</div>
                <div>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">GitHub</span>
                  <a href="https://github.com/jagadeeswaran-K007" target="_blank" rel="noreferrer" className="text-sm font-bold text-white hover:text-rose-400 transition">
                    @jagadeeswaran-K007
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl shadow-xl shadow-[0_0_35px_rgba(255,99,71,0.35)] border-[#ff6347]/50">
            <h3 className="text-xl font-bold text-white mb-6">Send Message</h3>

            {status.success && (
              <div className="mb-6 bg-emerald-950/60 border border-emerald-900 text-emerald-400 text-xs p-4 rounded-2xl text-center font-medium">
                ✅ Thank you! Your message has been sent successfully via Nodemailer.
              </div>
            )}

            {status.error && (
              <div className="mb-6 bg-rose-950/60 border border-rose-900 text-rose-400 text-xs p-4 rounded-2xl text-center font-medium">
                ❌ {status.error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 ">
              <div>
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-2">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 p-3.5 rounded-xl text-sm text-white focus:outline-none focus:border-rose-600"
                  required
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-2">Your Email</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 p-3.5 rounded-xl text-sm text-white focus:outline-none focus:border-rose-600"
                  required
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-2">Message</label>
                <textarea
                  rows="4"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 p-3.5 rounded-xl text-sm text-white focus:outline-none focus:border-rose-600"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={status.loading}
                className="w-full bg-rose-600 hover:bg-rose-700 disabled:bg-rose-900 text-white font-bold py-3.5 rounded-xl text-sm transition shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2"
              >
                {status.loading ? 'Sending Email...' : 'Send Message'}
              </button>
            </form>
          </div>

        </div>
      </section>

    </div>
  );
};

export default HomePage;