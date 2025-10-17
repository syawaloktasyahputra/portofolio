import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import { Monitor, Code, Server, Wifi, Award, User, Mail, Phone, MapPin, Github, Linkedin, Instagram, ChevronDown, Menu, X, Terminal, Cpu, Network, Database, Shield, FileCode, Briefcase, GraduationCap, Zap, Layers, Globe, Lock, Cloud, Activity, Home, FolderKanban, MessageCircle, Sparkles, Sun, Moon, ArrowRight, UserPlus, ExternalLink, Gamepad2, BookOpen, Mountain, Code2, CheckCircle, CodeXml, ServerCog, ShieldCheck, DatabaseZap, CloudCog, Quote, Star, ArrowUp, Bot, Send, KeyRound, BrainCircuit } from 'lucide-react';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  const [language, setLanguage] = useState('ID');
  const [theme, setTheme] = useState('dark'); // 'dark' or 'light'
  const [activeModal, setActiveModal] = useState('none'); // 'none', 'login', 'signup'
  const [contactForm, setContactForm] = useState({ from_name: '', from_email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState({ sending: false, sent: false, error: false });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [hoveredNav, setHoveredNav] = useState({ left: 0, width: 0, opacity: 0 });
  const [subscribeStatus, setSubscribeStatus] = useState('idle'); // idle, subscribing, success
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isTestimonialFading, setIsTestimonialFading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [typedName, setTypedName] = useState('');
  const [currentSpecialization, setCurrentSpecialization] = useState(0);
  const [isSpecializationFading, setIsSpecializationFading] = useState(false);
  
  const typingIndexRef = React.useRef(0);
  const isDeletingRef = React.useRef(false);

  // Cek status login dari localStorage saat komponen dimuat
  useEffect(() => {
    if (localStorage.getItem('portfolioUser')) {
      setIsLoggedIn(true);
    }

    // Cek bahasa yang tersimpan di localStorage
    const savedLanguage = localStorage.getItem('portfolioLanguage');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

    // Cek tema yang tersimpan
    const savedTheme = localStorage.getItem('portfolioTheme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');


    return () => {
      if (testimonialIntervalRef.current) clearInterval(testimonialIntervalRef.current);
      if (specializationIntervalRef.current) clearInterval(specializationIntervalRef.current);
      // Cleanup untuk typing effect akan ditangani di useEffect-nya sendiri
    };
  }, []);

  const isScrollingRef = React.useRef(false);
  const scrollTimeoutRef = React.useRef(null);
  const heroRef = React.useRef(null);
  const testimonialIntervalRef = React.useRef(null);
  const specializationIntervalRef = React.useRef(null);
  const sectionRefs = {
    about: React.useRef(null),
    skills: React.useRef(null),
    certificates: React.useRef(null),
    projects: React.useRef(null),
    hobbies: React.useRef(null),
    testimonials: React.useRef(null),
    contact: React.useRef(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      // Jika ada timeout yang berjalan, hapus.
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      setScrollY(window.scrollY);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'skills', 'certificates', 'projects', 'hobbies', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current && !isScrollingRef.current) setActiveSection(current);

      // Atur timeout baru. Jika tidak ada scroll lagi selama 150ms,
      // anggap scroll telah berhenti dan aktifkan kembali deteksi otomatis.
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 150);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      if (heroRef.current) window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    testimonialIntervalRef.current = setInterval(() => {
      handleTestimonialChange((currentTestimonial + 1) % testimonials.length);
    }, 7000); // Ganti testimoni setiap 7 detik

    return () => {
      if (testimonialIntervalRef.current) clearInterval(testimonialIntervalRef.current);
    };
  }, [currentTestimonial]);

  useEffect(() => {
    if (isChatOpen && chatMessages.length === 0) {
      setChatMessages([
        { sender: 'bot', text: t.chatWelcome }
      ]);
    }
  }, [isChatOpen]);

  const specializations = React.useMemo(() => [
    'Network Infrastructure Specialist',
    'System Administrator',
    'Security Enthusiast',
    'Cloud Practitioner'
  ], []);

  useEffect(() => {
    const nameToType = "Syawal Okta Syahputra";
    let i = 0;
    const typingInterval = setInterval(() => {
      setTypedName(nameToType.substring(0, i + 1));
      i++;
      if (i === nameToType.length) {
        clearInterval(typingInterval);
      }
    }, 80);

    specializationIntervalRef.current = setInterval(() => {
      setIsSpecializationFading(true);
      setTimeout(() => {
        setCurrentSpecialization(prev => (prev + 1) % specializations.length);
        setIsSpecializationFading(false);
      }, 500);
    }, 3000);

    return () => { clearInterval(typingInterval); clearInterval(specializationIntervalRef.current); };
    return () => { clearInterval(specializationIntervalRef.current); };
  }, [specializations]);

  useEffect(() => {
    const nameToType = "Syawal Okta Syahputra";
    let typingTimeout;

    const typingEffect = () => {
      const i = typingIndexRef.current;
      const isDeleting = isDeletingRef.current;
      const text = isDeleting ? nameToType.substring(0, i - 1) : nameToType.substring(0, i + 1);
      const delay = isDeleting ? 50 : 100;

      setTypedName(text);

      if (!isDeleting && text === nameToType) {
        isDeletingRef.current = true;
        typingTimeout = setTimeout(typingEffect, 2000); // Jeda sebelum menghapus
      } else if (isDeleting && text === '') {
        isDeletingRef.current = false;
        typingIndexRef.current = 0;
        typingTimeout = setTimeout(typingEffect, 500); // Jeda sebelum mengetik lagi
      } else {
        typingIndexRef.current = i + (isDeleting ? -1 : 1);
        typingTimeout = setTimeout(typingEffect, delay);
      }
    };

    typingTimeout = setTimeout(typingEffect, 500); // Jeda awal sebelum mulai

    return () => clearTimeout(typingTimeout);
  }, [specializations]);

  const getRandomResponse = (responses) => {
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const getBotResponse = (message) => {
    const msg = message.toLowerCase();
    if (msg.includes('proyek') || msg.includes('project')) return getRandomResponse(t.chatResponseProject);
    if (msg.includes('skill') || msg.includes('keahlian') || msg.includes('kemampuan')) return getRandomResponse(t.chatResponseSkills);
    if (msg.includes('kontak') || msg.includes('contact') || msg.includes('hubungi')) return getRandomResponse(t.chatResponseContact);
    if (msg.includes('siapa') || msg.includes('tentang') || msg.includes('about')) return getRandomResponse(t.chatResponseAbout);
    if (msg.includes('terima kasih') || msg.includes('thank you')) return getRandomResponse(t.chatResponseThanks);
    if (msg.includes('halo') || msg.includes('hai') || msg.includes('hello')) return getRandomResponse(t.chatResponseGreeting);
    return getRandomResponse(t.chatResponseDefault);
  };
  const handleTestimonialChange = (index) => {
    // Hentikan interval jika pengguna berinteraksi manual
    if (testimonialIntervalRef.current) {
      clearInterval(testimonialIntervalRef.current);
    }

    setIsTestimonialFading(true);
    setTimeout(() => {
      setCurrentTestimonial(index);
      setIsTestimonialFading(false);
    }, 400); // Durasi harus cocok dengan transisi CSS
  };
  const translations = {
    ID: {
      // Nav
      navHome: 'Beranda',
      navAbout: 'Tentang',
      navSkills: 'Keahlian',
      navCertificates: 'Sertifikat',
      navProjects: 'Proyek',
      navHobbies: 'Hobi',
      navContact: 'Kontak',
      login: 'Masuk', 
      logout: 'Keluar',
      // Hero
      heroBadge: 'Tersedia untuk Kolaborasi',
      heroSubtitle: 'Teknik Mesin & Jaringan',
      heroTagline: 'Spesialis Infrastruktur Jaringan • Administrator Sistem • Penggiat Keamanan',
      heroCTA1: 'Lihat Karya Saya',
      heroCTA2: 'Hubungi Saya',
      // Stats
      statsProjects: 'Proyek Selesai',
      statsCerts: 'Sertifikasi',
      statsExp: 'Tahun Pengalaman',
      statsSuccess: 'Tingkat Keberhasilan',
      // About
      aboutTitle: 'Siapa Saya?',
      aboutSubtitle: 'Siswa TKR & Penggiat Teknologi',
      aboutDesc1: 'Saya adalah siswa Teknik Otomotif di SMKS UTAMA Ciranjang yang bersemangat dalam pengembangan frontend, desain antarmuka, dan teknologi web modern. Dengan pengalaman langsung dalam merancang, mengimplementasikan, dan mengelola proyek berbasis web, saya terus mengembangkan kemampuan untuk menjadi frontend developer yang andal dan inovatif.',
      aboutDesc2: 'Fokus saya saat ini adalah pada pengembangan frontend, desain UI/UX, dan pembuatan antarmuka web yang responsif dan interaktif. Saya percaya bahwa tampilan dan pengalaman pengguna yang baik dapat meningkatkan nilai serta efisiensi sebuah produk digital.',
      education: 'Pendidikan',
      viewCV: 'Tampilkan CV', // Teks ini sudah benar
      location: 'Lokasi',
      // Skills
      skillsTitle: 'Kemampuan Teknis',
      skillProficiency: 'Kemahiran',
      // Certificates
      certsTitle: 'Sertifikasi & Penghargaan',
      // Projects
      projectsTitle: 'Karya Unggulan',
      // Hobbies
      hobbiesTitle: 'Hobi & Minat',
      hobbiesSubtitle: 'Di luar baris kode, inilah yang membuat saya tetap terinspirasi.',
      hobbyGaming: 'Bermain Game',
      hobbyGamingDesc: 'Menjelajahi dunia virtual dan memecahkan teka-teki strategis.',
      hobbyReading: 'Membaca Buku',
      hobbyReadingDesc: 'Mendalami fiksi ilmiah dan buku-buku teknis.',
      hobbyHiking: 'Mendaki',
      hobbyHikingDesc: 'Menemukan ketenangan dan tantangan di alam bebas.',
      hobbyCoding: 'Proyek Pribadi',
      hobbyCodingDesc: 'Bereksperimen dengan teknologi baru dan membangun hal-hal keren.',
      // Testimonials
      testimonialsTitle: 'Apa Kata Mereka',
      testimonialsSubtitle: 'Ulasan dari orang-orang yang pernah bekerja sama dengan saya.',
      testimonial1Quote: 'Kemampuan Syawal Okta dalam pengembangan frontend sangat luar biasa. Ia proaktif, cepat belajar, dan selalu mampu menghadirkan solusi antarmuka yang menarik, fungsional, serta andal.',
      testimonial1Name: 'Rizky Adi Pratama',
      testimonial1Role: 'Senior Frontend Developer, Voltra Studio',
      testimonial2Quote: 'Bekerja dengan Syawal Okta dalam proyek pengembangan antarmuka web adalah pengalaman yang luar biasa. Ia sangat teliti, kreatif, dan memiliki pemahaman mendalam tentang desain serta pengalaman pengguna.',
      testimonial2Name: 'Nadia Putri Ananda',
      testimonial2Role: 'UI/UX Designer, Kreativ Labs',
      testimonial3Quote: 'Syawal Okta adalah kolaborator yang luar biasa. Ia memiliki etos kerja yang kuat, kemampuan problem-solving yang tajam, dan selalu berusaha menghadirkan hasil terbaik dalam setiap proyek pengembangan frontend.',
      testimonial3Name: 'Citra Lestari',
      testimonial3Role: 'Project Manager, Tech Corp',
      // Chatbot
      chatTitle: 'Asisten AI',
      chatWelcome: 'Halo! Saya asisten AI. Ada yang bisa saya bantu seputar portofolio Syawal Okta? Coba tanyakan tentang "proyek", "keahlian", atau "kontak".',
      chatPlaceholder: 'Ketik pertanyaan Anda...',
      chatResponseAbout: [
        'Syawal Okta adalah seorang siswa Teknik Otomotif yang bersemangat dalam pengembangan frontend dan desain antarmuka web. Anda bisa membaca lebih lanjut di bagian "Tentang Saya".',
        'Tentu, Anda bisa mengenal Syawal Okta lebih jauh di bagian "Tentang Saya".',
      ],
      chatResponseProject: [
        'Anda dapat melihat semua karya unggulan Syawal Okta di bagian "Proyek". Setiap proyek memiliki deskripsi dan teknologi yang digunakan.',
        'Tentu! Cek bagian "Proyek" untuk melihat daftar lengkap proyek yang telah dikerjakan Syawal Okta.',
      ],
      chatResponseSkills: [
        'Daftar keahlian teknis Syawal Okta, termasuk Administrasi Jaringan dan Keamanan Siber, ada di bagian "Keahlian".',
        'Untuk melihat kemampuan teknis Syawal Okta, silakan kunjungi bagian "Keahlian" di halaman ini.',
      ],
      chatResponseContact: [
        'Untuk terhubung dengan Syawal Okta, silakan gunakan formulir kontak di bagian "Kontak" atau hubungi melalui email yang tertera.',
        'Ingin berkolaborasi? Temukan cara menghubungi Syawal Okta di bagian "Kontak".',
      ],
      chatResponseGreeting: ['Halo! Ada yang bisa saya bantu?', 'Hai! Senang bisa membantu Anda.'],
      chatResponseThanks: ['Sama-sama! Senang bisa membantu.', 'Dengan senang hati!'],
      chatResponseDefault: [
        'Maaf, saya belum mengerti pertanyaan itu. Anda bisa bertanya tentang "proyek", "keahlian", "kontak", atau "tentang" Syawal Okta.',
        'Hmm, saya tidak yakin mengerti. Coba tanyakan sesuatu yang lebih spesifik seperti "apa saja proyeknya?".',
        'Saya masih belajar. Untuk saat ini, saya hanya bisa menjawab pertanyaan seputar "proyek", "keahlian", dan "kontak".',
      ],
      // Contact
      contactTitle: 'Mari Terhubung',
      contactSubtitle: 'Tertarik untuk berkolaborasi? Jangan ragu untuk menghubungi!',
      contactEmail: 'Email',
      contactPhone: 'Telepon',
      contactSocial: 'Ikuti Perjalanan Saya',
      contactFormTitle: 'Kirim Saya Pesan',
      formName: 'Nama Anda',
      formEmail: 'Email Anda',
      formSubject: 'Subjek',
      formMessage: 'Pesan Anda',
      formSend: 'Kirim Pesan',
      formSending: 'Mengirim...',
      formSent: 'Pesan Terkirim!',
      formError: 'Gagal, Coba Lagi',
      // Modals
      loginTitle: 'Masuk Akun',
      loginWelcome: 'Selamat datang kembali!',
      loginForgot: 'Lupa Kata Sandi?',
      loginContinue: 'Atau lanjutkan dengan',
      loginNoAccount: 'Belum punya akun?',
      loginSignUp: 'Daftar',
      signupTitle: 'Buat Akun',
      signupWelcome: 'Bergabung dengan komunitas kami!',
      signupEmail: 'Alamat Email',
      signupUsername: 'Nama Pengguna',
      signupPassword: 'Kata Sandi',
      signupCreate: 'Buat Akun',
      signupHaveAccount: 'Sudah punya akun?',
      forgotTitle: 'Reset Kata Sandi',
      forgotSubtitle: 'Masukkan email Anda untuk menerima tautan reset.',
      forgotAction: 'Kirim Tautan Reset',
      forgotBackToLogin: 'Kembali ke Masuk',
      // Footer
      footerTagline: 'Membangun antarmuka web yang interaktif dan responsif dengan fokus pada pengalaman pengguna dan performa terbaik.',
      footerQuickLinks: 'Tautan Cepat',
      footerConnect: 'Terhubung Dengan Saya',
    },
    EN: {
      // Nav
      navHome: 'Home',
      navAbout: 'About',
      navSkills: 'Skills',
      navCertificates: 'Certificates',
      navProjects: 'Projects',
      navHobbies: 'Hobbies',
      navContact: 'Contact',
      login: 'Login', 
      logout: 'Logout',
      // Hero
      heroBadge: 'Available for Collaboration',
      heroSubtitle: 'Computer & Network Engineering',
      heroCTA1: 'View My Work',
      heroCTA2: 'Get In Touch',
      // Stats
      statsProjects: 'Projects Completed',
      statsCerts: 'Certifications',
      statsExp: 'Years Experience',
      statsSuccess: 'Success Rate',
      // About
      aboutTitle: 'Who Am I?',
      aboutSubtitle: 'Automotive Student & Frontend Enthusiast',
      aboutDesc1: 'I am an Automotive Engineering student at SMKS UTAMA Ciranjang, passionate about frontend development, UI/UX design, and modern web technologies. With hands-on experience in designing, building, and optimizing web interfaces, I continuously develop my skills to become a reliable and creative frontend developer.', 
      aboutDesc2: 'My current focus is on frontend development, UI/UX design, and creating responsive, interactive web interfaces. I believe that well-designed interfaces and user experiences can significantly enhance the value and efficiency of digital products.',
      education: 'Education',
      viewCV: 'View CV', // Teks ini sudah benar
      location: 'Location',
      // Skills
      skillsTitle: 'Technical Arsenal',
      skillProficiency: 'Proficiency',
      // Certificates
      certsTitle: 'Certifications & Awards',
      // Projects
      projectsTitle: 'Featured Work',
      // Hobbies
      hobbiesTitle: 'Hobbies & Interests',
      hobbiesSubtitle: 'Beyond the lines of code, this is what keeps me inspired.',
      hobbyGaming: 'Gaming',
      hobbyGamingDesc: 'Exploring virtual worlds and solving strategic puzzles.',
      hobbyReading: 'Reading',
      hobbyReadingDesc: 'Diving into science fiction and technical books.',
      hobbyHiking: 'Hiking',
      hobbyHikingDesc: 'Finding peace and challenges in the great outdoors.',
      hobbyCoding: 'Personal Projects',
      hobbyCodingDesc: 'Experimenting with new technologies and building cool stuff.',
      // Testimonials
      testimonialsTitle: 'What They Say',
      testimonialsSubtitle: 'Reviews from people I have collaborated with.',
      testimonial1Quote: "Syawal Okta's ability to manage network infrastructure is outstanding. He is proactive, a quick learner, and always delivers reliable solutions.",
      testimonial1Name: 'Rizky Adi Pratama',
      testimonial1Role: 'Senior Frontend Developer, Voltra Studio',
      testimonial2Quote: 'Working with Syawal Okta on a web interface project was an amazing experience. His attention to detail and deep understanding of UI/UX design are very impressive.',
      testimonial2Name: 'Nadia Putri Ananda',
      testimonial2Role: 'UI/UX Designer, Kreativ Labs',
      testimonial3Quote: 'Syawal Okta is a valuable team member. His strong work ethic and problem-solving skills make him an excellent collaborator in any frontend project.',
      testimonial3Name: 'Citra Lestari',
      testimonial3Role: 'Project Manager, Tech Corp',
      // Chatbot
      chatTitle: 'AI Assistant',
      chatWelcome: 'Hello! I am an AI assistant. How can I help you with Syawal Okta\'s portfolio? Try asking about "projects", "skills", or "contact".',
      chatPlaceholder: 'Type your question...',
      chatResponseAbout: [
        'Syawal Okta is an Automotive Engineering student passionate about frontend development and web interface design. You can read more in the "About Me" section.',
        'Sure, you can get to know Syawal Okta better in the "About Me" section.',
      ],
      chatResponseProject: [
        'You can see all of Syawal Okta\'s featured work in the "Projects" section. Each project includes a description and the technologies used.',
        'Of course! Check out the "Projects" section for a complete list of projects Syawal Okta has worked on.',
      ],
      chatResponseSkills: [
        'A list of Syawal Okta\'s technical skills, including Network Administration and Cybersecurity, is in the "Skills" section.',
        'To see Syawal Okta\'s technical abilities, please visit the "Skills" section on this page.',
      ],
      chatResponseContact: [
        'To connect with Syawal Okta, please use the contact form in the "Contact" section or reach out via the provided email.',
        'Interested in collaborating? Find out how to contact Syawal Okta in the "Contact" section.',
      ],
      chatResponseGreeting: ['Hello! How can I help you?', 'Hi there! Happy to assist.'],
      chatResponseThanks: ["You're welcome! Glad I could help.", 'My pleasure!'],
      chatResponseDefault: [
        'Sorry, I don\'t understand that question yet. You can ask about Syawal Okta\'s "projects", "skills", "contact", or "about" him.',
        "Hmm, I'm not sure I understand. Try asking something more specific like 'what are his projects?'.",
        "I'm still learning. For now, I can only answer questions about 'projects', 'skills', and 'contact'.",
      ],
      // Contact
      contactTitle: "Let's Connect",
      contactSubtitle: 'Interested in collaborating? Feel free to reach out!',
      contactEmail: 'Email',
      contactPhone: 'Phone',
      contactSocial: 'Follow My Journey',
      contactFormTitle: 'Send Me a Message',
      formName: 'Your Name',
      formEmail: 'Your Email',
      formSubject: 'Subject',
      formMessage: 'Your Message',
      formSend: 'Send Message',
      formSending: 'Sending...',
      formSent: 'Message Sent!',
      formError: 'Failed, Try Again',
      // Modals
      loginTitle: 'Secure Login',
      loginWelcome: 'Welcome back!',
      loginForgot: 'Forgot Password?',
      loginContinue: 'Or continue with',
      loginNoAccount: "Don't have an account?",
      loginSignUp: 'Sign Up',
      signupTitle: 'Create Account',
      signupWelcome: 'Join our community!',
      signupEmail: 'Email Address',
      signupUsername: 'Username',
      signupPassword: 'Password',
      signupCreate: 'Create Account',
      signupHaveAccount: 'Already have an account?',
      forgotTitle: 'Reset Password',
      forgotSubtitle: 'Enter your email to receive a reset link.',
      forgotAction: 'Send Reset Link',
      forgotBackToLogin: 'Back to Login',
      // Footer
      footerTagline: 'Crafting robust digital infrastructures with a focus on performance and security.',
      footerQuickLinks: 'Quick Links',
      footerConnect: 'Connect With Me',
    }
  };

  const t = translations[language];

  const navItems = React.useMemo(() => [
    { id: 'home', label: t.navHome, icon: Home },
    { id: 'about', label: t.navAbout, icon: User },
    { id: 'skills', label: t.navSkills, icon: Zap },
    { id: 'certificates', label: t.navCertificates, icon: Award },
    { id: 'projects', label: t.navProjects, icon: FolderKanban },
    { id: 'hobbies', label: t.navHobbies, icon: Sparkles },
    { id: 'contact', label: t.navContact, icon: MessageCircle },
  ], [t]);

  const skills = React.useMemo(() => [
    { name: 'Network Administration', icon: Network, level: 90, category: 'Infrastructure' },
    { name: 'Server Management', icon: ServerCog, level: 85, category: 'Infrastructure' },
    { name: 'Web Development', icon: CodeXml, level: 88, category: 'Development' },
    { name: 'Cybersecurity', icon: ShieldCheck, level: 82, category: 'Security' },
    { name: 'Database Admin', icon: DatabaseZap, level: 80, category: 'Infrastructure' },
    { name: 'Cloud Computing', icon: CloudCog, level: 87, category: 'Infrastructure' },
  ], []);

  const projects = React.useMemo(() => [
    { title: 'Network Monitoring System', description: 'Real-time network monitoring dashboard with analytics and alerting system for traffic and performance monitoring.', tech: ['Python', 'React', 'SNMP', 'WebSocket'], category: 'Network', icon: Activity, gradient: 'from-emerald-400 via-teal-500 to-cyan-600', emoji: '🌐', liveUrl: '#', sourceUrl: '#' },
    { title: 'School Server Infrastructure', description: 'Complete server setup with Active Directory, DNS, DHCP, and load balancing for school infrastructure.', tech: ['Windows Server', 'Linux', 'Apache', 'MySQL'], category: 'Server', icon: Server, gradient: 'from-violet-400 via-purple-500 to-indigo-600', emoji: '🖥️', liveUrl: null, sourceUrl: '#' },
    { title: 'Wireless Network Design', description: 'Enterprise wireless network with seamless roaming and QoS for optimal school area coverage.', tech: ['UniFi', 'MikroTik', 'VLAN', 'QoS'], category: 'Network', icon: Wifi, gradient: 'from-pink-400 via-rose-500 to-red-600', emoji: '📡', liveUrl: '#', sourceUrl: null },
    { title: 'Firewall & Security System', description: 'Multi-layer security with IDS/IPS and VPN infrastructure to protect the network from threats.', tech: ['pfSense', 'Snort', 'IPTables', 'VPN'], category: 'Security', icon: Shield, gradient: 'from-orange-400 via-amber-500 to-yellow-600', emoji: '🔒', liveUrl: null, sourceUrl: '#' },
    { title: 'IT Ticketing Platform', description: 'Web-based helpdesk with automated workflow and SLA tracking for IT support trouble ticket management.', tech: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript'], category: 'Development', icon: FileCode, gradient: 'from-blue-400 via-indigo-500 to-purple-600', emoji: '💻', liveUrl: '#', sourceUrl: '#' },
    { title: 'Cloud Backup Solution', description: 'Automated backup system with encryption and disaster recovery for critical company data.', tech: ['Bash Script', 'Rsync', 'AWS', 'Docker'], category: 'System', icon: Cloud, gradient: 'from-cyan-400 via-blue-500 to-indigo-600', emoji: '☁️', liveUrl: null, sourceUrl: '#' },
  ], []);

  const stats = React.useMemo(() => [
    { label: t.statsProjects, value: '20+', icon: Layers },
    { label: t.statsCerts, value: '4', icon: Award },
    { label: t.statsExp, value: '2+', icon: Zap },
    { label: t.statsSuccess, value: '98%', icon: Activity },
  ], [t]);

  const certificates = React.useMemo(() => [
    { name: 'Cisco Certified Network Associate (CCNA)', issuer: 'Cisco', year: '2024', color: 'from-blue-400 to-cyan-600', icon: Award, link: '#' },
    { name: 'CompTIA Network+', issuer: 'CompTIA', year: '2024', color: 'from-green-400 to-emerald-600', icon: Award, link: '#' },
    { name: 'MikroTik Certified Network Associate', issuer: 'MikroTik', year: '2023', color: 'from-purple-400 to-pink-600', icon: Award, link: '#' },
    { name: 'Linux Professional Institute (LPIC-1)', issuer: 'LPI', year: '2024', color: 'from-orange-400 to-red-600', icon: Award, link: '#' },
  ], []);

  const hobbies = React.useMemo(() => [
    { name: t.hobbyGaming, description: t.hobbyGamingDesc, icon: Gamepad2 },
    { name: t.hobbyReading, description: t.hobbyReadingDesc, icon: BookOpen },
    { name: t.hobbyHiking, description: t.hobbyHikingDesc, icon: Mountain },
    { name: t.hobbyCoding, description: t.hobbyCodingDesc, icon: Code2 },
  ], [t]);

  const testimonials = React.useMemo(() => [
    {
      quote: t.testimonial1Quote,
      name: t.testimonial1Name,
      role: t.testimonial1Role,
      avatar: `https://i.pravatar.cc/150?u=ahmadsubarjo`
    },
    {
      quote: t.testimonial2Quote,
      name: t.testimonial2Name,
      role: t.testimonial2Role,
      avatar: `https://i.pravatar.cc/150?u=budisantoso`
    },
    {
      quote: t.testimonial3Quote,
      name: t.testimonial3Name,
      role: t.testimonial3Role,
      avatar: `https://i.pravatar.cc/150?u=citralestari`
    }
  ], [t]);

  const handleFilterChange = (category) => {
    if (activeFilter === category || isFiltering) return;

    setActiveFilter(category);
    setIsFiltering(true); // Mulai animasi

    // Durasi animasi harus cukup untuk out dan in
    // (misal: 500ms untuk out, 500ms untuk in)
    setTimeout(() => {
      setIsFiltering(false); // Selesai animasi
    }, 800); // Total durasi animasi
  };

  const playSound = (soundFile, volume = 0.2) => {
    const audio = new Audio(`/${soundFile}`);
    audio.volume = volume;
    audio.play().catch(error => console.error("Sound play failed:", error));
  };

  const categories = ['all', 'Network', 'Server', 'Security', 'Development', 'System'];
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const smoothScrollTo = (targetPosition, duration) => {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const easeInOutQuad = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
  };

  const scrollToSection = (section) => {
    playSound('click.mp3');
    setActiveSection(section);
    // Kunci deteksi otomatis saat scroll dimulai dari klik
    isScrollingRef.current = true;
    setIsMenuOpen(false);
    const element = document.getElementById(section);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      smoothScrollTo(offsetPosition, 1000); // Durasi 1000ms untuk scroll yang lebih halus
    }
  };

  const toggleLanguage = () => {
    playSound('click.mp3');
    const newLang = language === 'ID' ? 'EN' : 'ID';
    setLanguage(newLang);
    localStorage.setItem('portfolioLanguage', newLang);
  };

  const toggleTheme = () => {
    playSound('click.mp3');
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('portfolioTheme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const handleLogin = () => {
    playSound('click.mp3');
    if (isLoggedIn) {
      // Logout logic
      localStorage.removeItem('portfolioUser');
      setIsLoggedIn(false);
      alert('You have been logged out.');
    } else {
      // Open login modal
      setActiveModal('login');
    }
  };

  const handleCloseChat = () => {
    playSound('click.mp3');
    setIsChatOpen(false);
    // Hapus riwayat chat saat ditutup
    setChatMessages([]);
  };

  const handleChatSubmit = (e) => {
    playSound('click.mp3', 0.3);
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = { sender: 'user', text: chatInput };
    const newMessages = [...chatMessages, userMessage];
    setChatMessages(newMessages);
    setChatInput('');

    setTimeout(() => {
      const botResponse = { sender: 'bot', text: getBotResponse(chatInput) };
      setChatMessages([...newMessages, botResponse]);
    }, 1000);
  };

  const handleContactFormChange = (e) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ sending: true, sent: false, error: false });

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      contactForm,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    ).then((result) => {
        console.log(result.text);
        setFormStatus({ sending: false, sent: true, error: false });
        setContactForm({ from_name: '', from_email: '', subject: '', message: '' });
        setTimeout(() => setFormStatus({ sending: false, sent: false, error: false }), 5000);
    }, (error) => {
        console.log(error.text);
        setFormStatus({ sending: false, sent: false, error: true });
        setTimeout(() => setFormStatus({ sending: false, sent: false, error: false }), 5000);
        setTimeout(() => setFormStatus({ sending: false, sent: false, error: false }), 6000);
    });
  };

  const handleSubscribeSubmit = (e) => {
    playSound('click.mp3');
    e.preventDefault();
    if (!subscribeEmail || subscribeStatus !== 'idle') return;

    setSubscribeStatus('subscribing');
    // Simulate API call
    setTimeout(() => {
      console.log(`Subscribed with: ${subscribeEmail}`);
      setSubscribeStatus('success');
      setSubscribeEmail('');

      // Reset status after a few seconds
      setTimeout(() => {
        setSubscribeStatus('idle');
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 overflow-hidden">
      {/* Cursor Glow Effect */}
      <div 
        className="fixed w-96 h-96 pointer-events-none z-50 transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          background: `radial-gradient(circle, rgba(20, 184, 166, ${theme === 'dark' ? '0.15' : '0.1'}) 0%, transparent 70%)`,
        }}
      />

      {/* Chatbot Button */}
      <button
        onClick={() => {
          playSound('click.mp3');
          isChatOpen ? handleCloseChat() : setIsChatOpen(true);
        }}
        className="fixed bottom-8 left-8 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-teal-600 text-white flex items-center justify-center shadow-lg shadow-cyan-500/40 hover:scale-110 transition-all duration-300"
        aria-label={t.chatTitle}
      >
        {isChatOpen ? <X size={30} /> : <Bot size={30} />}
      </button>

      {/* Scroll to Top Button */}
      <button
        onClick={() => scrollToSection('home')}
        className={`fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 text-white flex items-center justify-center shadow-lg shadow-teal-500/40 hover:scale-110 transition-all duration-300 ${
          scrollY > 400 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} />
      </button>

      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-slate-50 dark:bg-zinc-900"></div>
        
        {/* Nebula/Aurora Effect for Dark Mode */}
        <div 
          className="absolute -inset-64 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 blur-3xl opacity-0 dark:opacity-100 transition-opacity duration-1000"
          style={{
            transform: `translate(
              ${theme === 'dark' ? (mousePosition.x - window.innerWidth / 2) / -100 : 0}px, 
              ${theme === 'dark' ? (scrollY * 0.1) + (mousePosition.y - window.innerHeight / 2) / -100 : 0}px
            )`
          }}
        />

        {/* Grid Layer */}
        <div 
          className="absolute inset-0 opacity-10 dark:opacity-15"
          style={{
            backgroundImage: `
              linear-gradient(rgba(20, 184, 166, 0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(20, 184, 166, 0.04) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: `translateY(${theme === 'dark' ? scrollY * 0.4 : 0}px)`,
          }}
        />

        {/* Starfield Layer 1 (Fast) */}
        <div 
          className="absolute inset-0 opacity-0 dark:opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '300px 300px',
            transform: `translateY(${theme === 'dark' ? scrollY * 0.2 : 0}px)`,
          }}
        />

        {/* Starfield Layer 2 (Slow) */}
        <div 
          className="absolute inset-0 opacity-0 dark:opacity-15"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.07) 1px, transparent 1px)',
            backgroundSize: '600px 600px',
            transform: `translateY(${theme === 'dark' ? scrollY * 0.1 : 0}px)`,
          }}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-slate-50 dark:to-zinc-900"></div>
      </div>

      {/* Premium Navigation Bar */}
      <nav className={`fixed w-full z-40 transition-all duration-500 ${scrollY > 50 ? 'py-3' : 'py-5'}`}>
        <div className="max-w-screen-xl mx-auto px-6">
          <div className={`flex items-center transition-all duration-500 ${
            scrollY > 50 
              ? 'bg-slate-100/80 dark:bg-zinc-950/80 backdrop-blur-2xl border border-slate-200/80 dark:border-zinc-700/50 shadow-2xl shadow-slate-900/5 dark:shadow-black/20' 
              : 'bg-transparent border border-transparent'
          } rounded-full`}>
            
            {/* Logo */}
            <button onClick={() => scrollToSection('home')} className="flex items-center space-x-3 group p-2">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Terminal className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-100 dark:border-zinc-950 animate-pulse"></div>
              </div>
              <div className="hidden lg:block">
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  Syawal Okta Syahputra
                </div>
                <div className="text-xs text-slate-500 dark:text-zinc-400 -mt-1">Network Engineer</div>
              </div>
            </button>

            {/* Spacer */}
            <div className="flex-grow"></div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center bg-slate-200/60 dark:bg-zinc-800/70 backdrop-blur-xl border border-slate-300/50 dark:border-zinc-700/50 rounded-full p-1 mx-4">
              <div className="relative flex items-center" onMouseLeave={() => setHoveredNav({ ...hoveredNav, opacity: 0 })}>
                <div 
                  className="absolute bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full h-full transition-all duration-300 ease-out"
                  style={{ left: hoveredNav.left, width: hoveredNav.width, opacity: hoveredNav.opacity, zIndex: -1 }}
                ></div>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  onMouseEnter={(e) => {
                    const { offsetLeft, offsetWidth } = e.currentTarget;
                    setHoveredNav({ left: offsetLeft, width: offsetWidth, opacity: 1 });
                  }}
                  className={`relative group px-5 py-2 rounded-full transition-colors duration-300 flex items-center space-x-2 z-10 ${
                    activeSection === item.id ? 'text-white' : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                  {activeSection === item.id && (
                    <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse"></div>
                  )}
                </button>
              ))}
              </div>
            </div>

            {/* Controls & CTA */}
            <div className="hidden lg:flex items-center space-x-2 bg-slate-200/60 dark:bg-zinc-800/70 backdrop-blur-xl border border-slate-300/50 dark:border-zinc-700/50 rounded-full p-1">
              <div className="flex items-center space-x-2">
                <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-300/50 dark:hover:bg-zinc-700/50 transition-colors" aria-label="Toggle Theme">
                  <Sun className="w-5 h-5 text-teal-500 hidden dark:block" />
                  <Moon className="w-5 h-5 text-teal-500 block dark:hidden" />
                </button>
                <button onClick={toggleLanguage} className="flex items-center space-x-1.5 p-2 rounded-full hover:bg-slate-300/50 dark:hover:bg-zinc-700/50 transition-colors" aria-label="Toggle Language">
                  <Globe className="w-5 h-5 text-teal-400" />
                  <span className="text-sm font-bold text-slate-700 dark:text-zinc-300">{language}</span>
                </button>
              </div>

              <button onClick={handleLogin} className="px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-zinc-300 bg-slate-300/50 dark:bg-zinc-700/50 rounded-full hover:bg-slate-300 dark:hover:bg-zinc-700 transition-colors" aria-label="Login">
                {isLoggedIn ? t.logout : t.login}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-slate-800 dark:text-white p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-xl transition-colors"
              onClick={() => {
                playSound('click.mp3');
                setIsMenuOpen(!isMenuOpen);
              }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 mx-6">
            <div className="bg-slate-100/95 dark:bg-zinc-950/95 backdrop-blur-2xl border border-slate-200/50 dark:border-zinc-700/50 rounded-3xl p-6 shadow-2xl shadow-slate-900/5 dark:shadow-black/20">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg shadow-teal-500/30'
                        : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-zinc-800/50'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-zinc-700/50 space-y-4">
                {/* Mobile Controls */}
                <div className="flex justify-between items-center bg-slate-200/50 dark:bg-zinc-900/50 rounded-full p-2">
                  <span className="text-sm text-slate-500 dark:text-zinc-400 pl-2">Interface</span>
                  <div className="flex items-center space-x-1">
                    <button onClick={toggleTheme} className="p-2 rounded-full bg-slate-100 dark:bg-zinc-800">
                      <Sun className="w-5 h-5 text-teal-500 hidden dark:block" />
                      <Moon className="w-5 h-5 text-teal-500 block dark:hidden" />
                    </button>
                    <button onClick={toggleLanguage} className="flex items-center space-x-1 p-2 rounded-full bg-slate-100 dark:bg-zinc-800">
                      <Globe className="w-5 h-5 text-teal-400" />
                      <span className="text-sm font-bold text-slate-700 dark:text-zinc-300">{language}</span>
                    </button>
                  </div>
                </div>
                {/* Mobile CTA */}
                <button onClick={handleLogin} className="w-full px-6 py-3 bg-slate-200/50 dark:bg-zinc-800/50 rounded-xl font-semibold text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors text-left flex items-center space-x-3">
                  <Lock className="w-5 h-5" /><span>{isLoggedIn ? t.logout : t.login}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          {/* Status Badge */}
          <div className="inline-flex items-center space-x-2 bg-teal-500/10 dark:bg-teal-900/30 border border-teal-500/30 rounded-full px-6 py-2.5 mb-8 backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-teal-500 dark:text-teal-400 font-semibold">{t.heroBadge}</span>
          </div>

          {/* Main Title */}
          <div className="relative h-28 md:h-36 lg:h-44 flex items-center justify-center mb-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-500 to-purple-600 animate-gradient-flow tracking-tight relative">
              {typedName}
              <span className="animate-blink text-teal-400">|</span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="text-xl md:text-3xl text-slate-500 dark:text-zinc-400 mb-4 font-mono animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <span className="text-teal-400">&lt;</span>
            <span className="text-slate-900 dark:text-white">{t.heroSubtitle}</span>
            <span className="text-teal-400">/&gt;</span>
          </div>

          <p className="text-lg md:text-xl text-slate-600 dark:text-zinc-400 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up h-16 flex flex-col items-center justify-center" style={{ animationDelay: '400ms' }}>
            <span className={`transition-opacity duration-500 ${isSpecializationFading ? 'opacity-0' : 'opacity-100'}`}>
              {specializations[currentSpecialization]}
            </span>
            <span className="text-base text-teal-600 dark:text-teal-400 font-semibold mt-1">@ SMKS UTAMA Ciranjang</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
            <button
              onClick={() => scrollToSection('projects')}
              className="group relative px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full font-bold text-white overflow-hidden shadow-2xl shadow-teal-500/40 hover:shadow-teal-500/60 transition-all transform hover:scale-105"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>{t.heroCTA1}</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-sky-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 bg-slate-800/5 backdrop-blur-sm border border-slate-800/10 dark:bg-zinc-800/50 dark:border-zinc-700/50 rounded-full font-bold text-slate-800 dark:text-white hover:bg-slate-800/10 dark:hover:bg-zinc-800 hover:border-slate-800/20 dark:hover:border-zinc-600 transition-all transform hover:scale-105"
            >
              {t.heroCTA2}
            </button>
          </div>

          {/* Scroll Indicator - Moved below stats */}
          <div 
            className="w-6 h-10 rounded-full border-2 border-slate-300 dark:border-zinc-700 flex justify-center items-start p-1 mx-auto mt-16 animate-fade-in-up" 
            style={{ animationDelay: '700ms' }}
            onClick={() => scrollToSection('about')}
          >
            <div className="w-1 h-2 rounded-full bg-teal-400 animate-bounce"></div>
          </div>
        </div>

        {/* Floating Shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 border-2 border-cyan-500/20 rounded-lg rotate-12 transition-transform duration-500 ease-out" style={{ transform: `translate(${(mousePosition.x - window.innerWidth / 2) / -40}px, ${(mousePosition.y - window.innerHeight / 2) / -40}px) rotate(12deg)` }}></div>
        <div className="absolute bottom-40 right-10 w-32 h-32 border-2 border-purple-500/20 rounded-full transition-transform duration-500 ease-out" style={{ transform: `translate(${(mousePosition.x - window.innerWidth / 2) / 50}px, ${(mousePosition.y - window.innerHeight / 2) / 50}px)` }}></div>
        <div className="absolute bottom-1/2 left-1/4 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full transition-transform duration-500 ease-out" style={{ transform: `translate(${(mousePosition.x - window.innerWidth / 2) / 25}px, ${(mousePosition.y - window.innerHeight / 2) / 25}px)` }}></div>
      </section>

      {/* Sticky Stats Section */}
      <div className="sticky top-24 z-30 px-6 mb-10">
        <div className="max-w-5xl mx-auto bg-slate-100/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-zinc-700/50 rounded-3xl shadow-xl shadow-slate-900/5 dark:shadow-black/20 p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="group relative text-center p-4 rounded-2xl transition-all duration-300 hover:bg-slate-200/50 dark:hover:bg-zinc-800/50"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
                  e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
                }}
              >
                <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(20,184,166,0.1),transparent_40%)] dark:bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(20,184,166,0.2),transparent_40%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <stat.icon className="w-8 h-8 text-teal-400 mb-3 group-hover:scale-110 transition-transform mx-auto" />
                  <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-slate-500 dark:text-zinc-400">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" ref={sectionRefs.about} className={`relative py-40 px-6 transition-opacity duration-1000 ${visibleSections.has('about') ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className={`text-center mb-16 ${visibleSections.has('about') ? 'animate-fade-in-up' : ''}`}>
            <span className="text-teal-500 dark:text-teal-400 font-mono text-sm tracking-wider">&lt;about&gt;</span>
            <h2 className="text-5xl md:text-6xl font-black mt-3 mb-4">
              <span className="bg-gradient-to-r from-slate-800 to-black dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                {t.aboutTitle}
              </span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-teal-500 to-cyan-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-5 gap-10 items-center">
            {/* Left Column: Image/Visual */}
            <div className={`md:col-span-2 ${visibleSections.has('about') ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '200ms' }}>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-3xl blur-lg opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <div className="relative bg-slate-100 dark:bg-zinc-950 rounded-3xl p-8 flex flex-col items-center justify-center aspect-square">
                  <BrainCircuit className="w-32 h-32 text-teal-400 mb-4" strokeWidth={1} />
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Syawal Okta Syahputra</h3>
                  <p className="text-teal-500 dark:text-teal-400 font-mono">{t.aboutSubtitle}</p>
                </div>
              </div>
            </div>

            {/* Right Column: Description */}
            <div className={`md:col-span-3 ${visibleSections.has('about') ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '400ms' }}>
              <p className="text-slate-800 dark:text-neutral-300 leading-relaxed mb-6 text-lg">
                {t.aboutDesc1} 
              </p>
              <p className="text-slate-600 dark:text-zinc-400 leading-relaxed text-lg">
                {t.aboutDesc2}
              </p>

              <div className="mt-8 pt-8 border-t border-slate-200 dark:border-zinc-700/50 flex flex-wrap gap-8">
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-8 h-8 text-teal-400" />
                  <div>
                    <p className="text-sm text-slate-500 dark:text-zinc-400">{t.education}</p>
                    <p className="font-semibold text-slate-900 dark:text-white">SMKS UTAMA Ciranjang</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-8 h-8 text-cyan-400" />
                  <div>
                    <p className="text-sm text-slate-500 dark:text-zinc-400">{t.location}</p>
                    <p className="font-semibold text-slate-900 dark:text-white">Cianjur, Indonesia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" ref={sectionRefs.skills} className={`relative py-32 px-6 bg-slate-100 dark:bg-transparent transition-opacity duration-1000 ${visibleSections.has('skills') ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className={`text-center mb-16 ${visibleSections.has('skills') ? 'animate-fade-in-up' : ''}`}>
            <span className="text-teal-500 dark:text-teal-400 font-mono text-sm tracking-wider">&lt;skills&gt;</span>
            <h2 className="text-5xl md:text-6xl font-black mt-3 mb-4">
              <span className="bg-gradient-to-r from-slate-800 to-black dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                {t.skillsTitle}
              </span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-teal-500 to-cyan-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className={`group relative bg-slate-50 dark:bg-zinc-800/50 backdrop-blur-xl border border-slate-200 dark:border-zinc-700/50 rounded-3xl p-8 hover:border-slate-300 dark:hover:border-zinc-600 transition-all overflow-hidden ${visibleSections.has('skills') ? 'animate-fade-in-up' : ''}`} 
                style={{ animationDelay: `${100 * index}ms` }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
                  e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
                }}
              >
                {/* Aurora Effect */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                     style={{ background: 'radial-gradient(300px circle at var(--x) var(--y), rgba(20, 184, 166, 0.15), transparent 80%)' }}></div>
                
                <div className="relative z-10">
                  <skill.icon className="w-12 h-12 text-teal-400 mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all" />
                  <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{skill.name}</h3>
                  <span className="text-xs px-3 py-1 bg-teal-500/10 text-teal-700 dark:bg-teal-500/20 dark:text-teal-400 rounded-full border border-teal-500/20 dark:border-teal-500/30">
                    {skill.category} 
                  </span>
                  
                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-500 dark:text-zinc-400">{t.skillProficiency}</span>
                      <span className="text-sm font-bold text-teal-500 dark:text-teal-400">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-200 dark:bg-zinc-700/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full transition-all duration-1000 ease-out shadow-lg shadow-teal-500/50"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" ref={sectionRefs.certificates} className={`relative py-32 px-6 transition-opacity duration-1000 ${visibleSections.has('certificates') ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className={`text-center mb-16 ${visibleSections.has('certificates') ? 'animate-fade-in-up' : ''}`}>
            <span className="text-teal-500 dark:text-teal-400 font-mono text-sm tracking-wider">&lt;certificates&gt;</span>
            <h2 className="text-5xl md:text-6xl font-black mt-3 mb-4">
              <span className="bg-gradient-to-r from-slate-800 to-black dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                {t.certsTitle}
              </span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full"></div>
          </div>

          <div className={`bg-slate-100/50 dark:bg-zinc-800/50 backdrop-blur-xl border border-slate-200/50 dark:border-zinc-700/50 rounded-3xl p-10 ${visibleSections.has('certificates') ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '200ms' }}>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { name: 'Cisco Certified Network Associate (CCNA)', issuer: 'Cisco', year: '2024', color: 'from-sky-400 to-blue-600' },
                { name: 'CompTIA Network+', issuer: 'CompTIA', year: '2024', color: 'from-green-400 to-emerald-600' },
                { name: 'MikroTik Certified Network Associate', issuer: 'MikroTik', year: '2023', color: 'from-cyan-400 to-sky-600' },
                { name: 'Linux Professional Institute (LPIC-1)', issuer: 'LPI', year: '2024', color: 'from-orange-400 to-red-600' },
              ].map((cert, index) => (
                <div key={index} className={`group flex items-center space-x-4 bg-slate-50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-slate-200 dark:border-zinc-700 hover:border-slate-300 dark:hover:border-zinc-600 hover:bg-white/70 dark:hover:bg-zinc-800/50 transition-all ${visibleSections.has('certificates') ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: `${300 + index * 100}ms` }}>
                  <div className={`w-14 h-14 bg-gradient-to-br ${cert.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg`}>
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-black dark:group-hover:text-white mb-1 transition-colors">{cert.name}</p>
                    <p className="text-sm text-slate-500 dark:text-zinc-400">{cert.issuer} • {cert.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" ref={sectionRefs.projects} className={`relative py-32 px-6 bg-slate-100 dark:bg-transparent transition-opacity duration-1000 ${visibleSections.has('projects') ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className={`text-center mb-16 ${visibleSections.has('projects') ? 'animate-fade-in-up' : ''}`}>
            <span className="text-teal-500 dark:text-teal-400 font-mono text-sm tracking-wider">&lt;projects&gt;</span>
            <h2 className="text-5xl md:text-6xl font-black mt-3 mb-4">
              <span className="bg-gradient-to-r from-slate-800 to-black dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                {t.projectsTitle}
              </span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-teal-500 to-cyan-600 mx-auto rounded-full"></div>
          </div>

          {/* Filter Buttons */}
          <div className={`flex flex-wrap justify-center gap-3 mb-12 ${visibleSections.has('projects') ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '200ms' }}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleFilterChange(category)}
                className={`px-6 py-3 rounded-full font-semibold capitalize transition-all duration-300 text-slate-700 dark:text-zinc-400 ${
                  activeFilter === category
                    ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/30 scale-105'
                    : 'bg-slate-200/70 dark:bg-zinc-800/70 backdrop-blur-sm border border-slate-300/50 dark:border-zinc-700/50 hover:border-slate-400/50 dark:hover:border-zinc-600 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <div 
                key={index}
                onClick={() => {
                  playSound('click.mp3');
                  setSelectedProject(project);
                }}
                className={`group relative bg-slate-50 dark:bg-zinc-800/50 backdrop-blur-xl border border-slate-200 dark:border-zinc-700/50 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ease-in-out hover:border-slate-300 dark:hover:border-zinc-600 hover:bg-slate-100/50 dark:hover:bg-zinc-800 ${
                  (activeFilter === 'all' || project.category === activeFilter)
                    ? 'opacity-100 scale-100 rotate-0'
                    : 'opacity-0 scale-50 -rotate-12'
                } ${visibleSections.has('projects') ? 'animate-fade-in-up' : ''}`}
                style={{
                  transitionDelay: `${(activeFilter === 'all' || project.category === activeFilter) ? (isFiltering ? 300 : 0) + index * 50 : index * 50}ms`,
                  animationDelay: `${300 + index * 100}ms`
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
                  e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
                }}
              >
                {/* Aurora Effect */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                     style={{ background: `radial-gradient(400px circle at var(--x) var(--y), ${project.gradient.replace('from-', 'rgba(').replace('to-', ', rgba(').replace(']', ', 0.1)')}, transparent 80%)` }}></div>
                
                <div className="p-8 pb-0">
                  <div className={`w-full h-36 bg-gradient-to-br ${project.gradient} rounded-2xl flex items-center justify-center text-7xl mb-6 group-hover:scale-105 transition-transform shadow-2xl`}>
                    {project.emoji}
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <project.icon className="w-9 h-9 text-teal-400 group-hover:scale-110 transition-transform" />
                    <span className="text-xs px-3 py-1.5 bg-teal-500/10 text-teal-700 dark:bg-teal-500/20 dark:text-teal-400 rounded-full border border-teal-500/20 dark:border-teal-500/30 font-semibold">
                      {project.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="px-8 pb-8">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="text-xs px-3 py-1.5 bg-slate-200 dark:bg-zinc-700/50 border border-slate-300/50 dark:border-zinc-600/50 rounded-lg text-slate-700 dark:text-zinc-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hobbies Section */}
      <section id="hobbies" ref={sectionRefs.hobbies} className={`relative py-32 px-6 bg-slate-50 dark:bg-transparent transition-opacity duration-1000 ${visibleSections.has('hobbies') ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className={`text-center mb-16 ${visibleSections.has('hobbies') ? 'animate-fade-in-up' : ''}`}>
            <span className="text-cyan-500 dark:text-cyan-400 font-mono text-sm tracking-wider">&lt;hobbies&gt;</span>
            <h2 className="text-5xl md:text-6xl font-black mt-3 mb-4">
              <span className="bg-gradient-to-r from-slate-800 to-black dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                {t.hobbiesTitle}
              </span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-400 to-sky-500 mx-auto rounded-full"></div>
            <p className={`text-slate-600 dark:text-zinc-400 mt-6 text-lg ${visibleSections.has('hobbies') ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '100ms' }}>
              {t.hobbiesSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hobbies.map((hobby, index) => (
              <div 
                key={index} 
                className={`group relative bg-slate-100 dark:bg-zinc-800/50 backdrop-blur-xl border border-slate-200 dark:border-zinc-700/50 rounded-3xl p-8 text-center hover:border-slate-300 dark:hover:border-zinc-600 transition-all hover:transform hover:scale-105 overflow-hidden ${visibleSections.has('hobbies') ? 'animate-fade-in-up' : ''}`} 
                style={{ animationDelay: `${200 + index * 100}ms` }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
                  e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
                }}
              >
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                     style={{ background: 'radial-gradient(250px circle at var(--x) var(--y), rgba(34, 211, 238, 0.1), transparent 80%)' }}></div>
                <div className="flex justify-center mb-6">
                  <hobby.icon className="w-16 h-16 text-cyan-400 group-hover:text-sky-400 group-hover:scale-110 transition-all duration-300" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{hobby.name}</h3>
                <p className="text-slate-600 dark:text-zinc-400 text-sm leading-relaxed">{hobby.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" ref={sectionRefs.testimonials} className={`relative py-32 px-6 transition-opacity duration-1000 ${visibleSections.has('testimonials') ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className={`text-center mb-16 ${visibleSections.has('testimonials') ? 'animate-fade-in-up' : ''}`}>
            <span className="text-teal-500 dark:text-teal-400 font-mono text-sm tracking-wider">&lt;testimonials&gt;</span>
            <h2 className="text-5xl md:text-6xl font-black mt-3 mb-4">
              <span className="bg-gradient-to-r from-slate-800 to-black dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                {t.testimonialsTitle}
              </span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-teal-500 to-cyan-600 mx-auto rounded-full"></div>
            <p className={`text-slate-600 dark:text-zinc-400 mt-6 text-lg ${visibleSections.has('testimonials') ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '100ms' }}>
              {t.testimonialsSubtitle}
            </p>
          </div>

          <div className="relative max-w-3xl mx-auto">
            <div 
              className={`group relative bg-slate-100/50 dark:bg-zinc-800/50 backdrop-blur-xl border border-slate-200/50 dark:border-zinc-700/50 rounded-3xl p-8 transition-opacity duration-300 ${isTestimonialFading ? 'opacity-0' : 'opacity-100'} ${visibleSections.has('testimonials') ? 'animate-fade-in-up' : ''}`}
              style={{ animationDelay: '200ms' }}
            >
              <Quote className="absolute top-6 right-6 w-16 h-16 text-teal-500/5 dark:text-teal-500/10 group-hover:text-teal-500/10 dark:group-hover:text-teal-500/20 transition-colors" strokeWidth={1.5} />
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <img src={testimonials[currentTestimonial].avatar} alt={testimonials[currentTestimonial].name} className="w-16 h-16 rounded-full border-2 border-teal-400/50 mr-5" />
                  <div>
                    <p className="font-bold text-lg text-slate-900 dark:text-white">{testimonials[currentTestimonial].name}</p>
                    <p className="text-sm text-teal-500 dark:text-teal-400">{testimonials[currentTestimonial].role}</p>
                  </div>
                </div>
                <p className="text-slate-700 dark:text-neutral-300 italic leading-relaxed mb-6 h-24">"{testimonials[currentTestimonial].quote}"</p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleTestimonialChange(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentTestimonial === index 
                      ? 'bg-teal-400 scale-125' 
                      : 'bg-slate-300 dark:bg-zinc-700 hover:bg-slate-400 dark:hover:bg-zinc-500'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={sectionRefs.contact} className={`relative py-32 px-6 bg-slate-100 dark:bg-transparent transition-opacity duration-1000 ${visibleSections.has('contact') ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className={`text-center mb-16 ${visibleSections.has('contact') ? 'animate-fade-in-up' : ''}`}>
            <span className="text-teal-500 dark:text-teal-400 font-mono text-sm tracking-wider">&lt;contact&gt;</span>
            <h2 className="text-5xl md:text-6xl font-black mt-3 mb-4">
              <span className="bg-gradient-to-r from-slate-800 to-black dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                {t.contactTitle}
              </span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-teal-500 to-cyan-600 mx-auto rounded-full"></div>
            <p className={`text-slate-600 dark:text-zinc-400 mt-6 text-lg ${visibleSections.has('contact') ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '100ms' }}>
              {t.contactSubtitle}
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <a href="mailto:syawaloktasyahputra@gmail.com" className={`group bg-slate-50 dark:bg-zinc-800/50 backdrop-blur-xl border border-slate-200 dark:border-zinc-700/50 rounded-3xl p-8 hover:border-slate-300 dark:hover:border-zinc-600 transition-all hover:transform hover:scale-105 ${visibleSections.has('contact') ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '200ms' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-teal-500/30">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm text-slate-500 dark:text-zinc-400 mb-2">{t.contactEmail}</p>
              <p className="font-bold text-base break-all leading-tight text-slate-900 dark:text-white">Arlianto032@gmail.com</p>
            </a>

            <a href="tel:+6283176340970" className={`group bg-slate-50 dark:bg-zinc-800/50 backdrop-blur-xl border border-slate-200 dark:border-zinc-700/50 rounded-3xl p-8 hover:border-slate-300 dark:hover:border-zinc-600 transition-all hover:transform hover:scale-105 ${visibleSections.has('contact') ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '300ms' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-sky-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-cyan-500/30">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm text-slate-500 dark:text-zinc-400 mb-2">{t.contactPhone}</p>
              <p className="font-bold text-lg text-slate-900 dark:text-white">+62 899 5257 735</p>
            </a>

            <div className={`group bg-slate-50 dark:bg-zinc-800/50 backdrop-blur-xl border border-slate-200 dark:border-zinc-700/50 rounded-3xl p-8 ${visibleSections.has('contact') ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '400ms' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-green-500/30">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm text-slate-500 dark:text-zinc-400 mb-2">{t.location}</p>
              <p className="font-bold text-lg text-slate-900 dark:text-white">Cianjur, Jawa Barat</p>
            </div>
          </div>

          {/* Social Media Links */}
          <div className={`bg-slate-50/50 dark:bg-zinc-800/50 backdrop-blur-xl border border-slate-200/50 dark:border-zinc-700/50 rounded-3xl p-10 mb-12 ${visibleSections.has('contact') ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '500ms' }}>
            <h3 className="text-2xl font-bold text-center mb-8 text-slate-900 dark:text-white">{t.contactSocial}</h3>
            <div className="flex justify-center gap-4">
              <a href="https://github.com/syawaloktasyahputra" target="_blank" rel="noopener noreferrer" className="group w-16 h-16 bg-slate-100 dark:bg-zinc-900 rounded-2xl flex items-center justify-center hover:bg-slate-200 dark:hover:bg-zinc-700 transition-all hover:scale-110 border border-slate-200 dark:border-zinc-700 hover:border-slate-300 dark:hover:border-zinc-600 shadow-lg">
                <Github className="w-8 h-8 text-slate-500 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
              </a>
              <a href="https://www.linkedin.com/in/oktodev" target="_blank" rel="noopener noreferrer" className="group w-16 h-16 bg-slate-100 dark:bg-zinc-900 rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-all hover:scale-110 border border-slate-200 dark:border-zinc-700 hover:border-blue-400/50 shadow-lg">
                <Linkedin className="w-8 h-8 text-slate-500 dark:text-zinc-400 group-hover:text-white transition-colors" />
              </a>
              <a href="https://www.instagram.com/oktodev/" target="_blank" rel="noopener noreferrer" className="group w-16 h-16 bg-slate-100 dark:bg-zinc-900 rounded-2xl flex items-center justify-center hover:bg-pink-600 transition-all hover:scale-110 border border-slate-200 dark:border-zinc-700 hover:border-pink-400/50 shadow-lg">
                <Instagram className="w-8 h-8 text-slate-500 dark:text-zinc-400 group-hover:text-white transition-colors" />
              </a>
              <a href="https://oktodev.me" target="_blank" rel="noopener noreferrer" className="group w-16 h-16 bg-slate-100 dark:bg-zinc-900 rounded-2xl flex items-center justify-center hover:bg-teal-600 transition-all hover:scale-110 border border-slate-200 dark:border-zinc-700 hover:border-teal-400/50 shadow-lg">
                <Globe className="w-8 h-8 text-slate-500 dark:text-zinc-400 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Message Form */}
          <div className={`bg-slate-50/50 dark:bg-zinc-800/50 backdrop-blur-xl border border-slate-200/50 dark:border-zinc-700/50 rounded-3xl p-10 ${visibleSections.has('contact') ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '600ms' }}>
            <h3 className="text-2xl font-bold mb-8 text-center text-slate-900 dark:text-white">{t.contactFormTitle}</h3>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="from_name"
                  value={contactForm.from_name}
                  onChange={handleContactFormChange}
                  placeholder={t.formName}
                  required
                  className="w-full px-6 py-4 bg-slate-100 dark:bg-zinc-900/50 border border-slate-300 dark:border-zinc-700 rounded-xl focus:outline-none focus:border-teal-400 transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500"
                />
                <input
                  type="email"
                  name="from_email"
                  value={contactForm.from_email}
                  onChange={handleContactFormChange}
                  placeholder={t.formEmail}
                  required
                  className="w-full px-6 py-4 bg-slate-100 dark:bg-zinc-900/50 border border-slate-300 dark:border-zinc-700 rounded-xl focus:outline-none focus:border-teal-400 transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500"
                />
              </div>
              <input
                type="text"
                name="subject"
                value={contactForm.subject}
                onChange={handleContactFormChange}
                placeholder={t.formSubject}
                required
                className="w-full px-6 py-4 bg-slate-100 dark:bg-zinc-900/50 border border-slate-300 dark:border-zinc-700 rounded-xl focus:outline-none focus:border-teal-400 transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500"
              />
              <textarea
                rows="5"
                name="message"
                value={contactForm.message}
                onChange={handleContactFormChange}
                placeholder={t.formMessage}
                required
                className="w-full px-6 py-4 bg-slate-100 dark:bg-zinc-900/50 border border-slate-300 dark:border-zinc-700 rounded-xl focus:outline-none focus:border-teal-400 transition-all resize-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500"
              ></textarea>
              <button type="submit" disabled={formStatus.sending} className="w-full px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl font-bold text-white hover:shadow-lg hover:shadow-teal-500/50 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                {formStatus.sending ? t.formSending : formStatus.sent ? t.formSent : formStatus.error ? t.formError : t.formSend}
              </button>
              {formStatus.sent && <p className="text-center text-green-400 flex items-center justify-center gap-2 animate-fade-in"><CheckCircle size={20} /> Pesan Anda telah berhasil dikirim!</p>}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-20 px-6 bg-slate-200/50 dark:bg-zinc-950/50 border-t border-slate-300/50 dark:border-zinc-800/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
          {/* Column 1: Brand & Tagline */}
          <div>
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/30">
                  <Terminal className="w-6 h-6 text-white" />
              </div>
              <div className="font-bold text-teal-500 dark:text-teal-400 text-xl">Syawal Okta Syahputra</div>
            </div>
            <p className="text-slate-600 dark:text-zinc-400 text-sm">
              {t.footerTagline}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">{t.footerQuickLinks}</h4>
            <ul className="space-y-3">
              {navItems.map(item => (
                  <li key={item.id}>
                      <button onClick={() => scrollToSection(item.id)} className="text-slate-600 dark:text-zinc-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors flex items-center gap-2 mx-auto md:mx-0">
                          <div className="w-1.5 h-1.5 bg-teal-500/50 rounded-full"></div>
                          {item.label}
                      </button>
                  </li>
              ))}
            </ul> 
          </div>

          {/* Column 3: Connect */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">{t.footerConnect}</h4>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="https://github.com/syawaloktasyahputra" target="_blank" rel="noopener noreferrer" className="group w-12 h-12 bg-slate-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center hover:bg-slate-300 dark:hover:bg-zinc-700 transition-all border border-slate-300/50 dark:border-zinc-700 hover:border-slate-400/50 dark:hover:border-zinc-600">
                  <Github className="w-6 h-6 text-slate-600 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
              </a>
              <a href="https://www.linkedin.com/in/oktodev/" target="_blank" rel="noopener noreferrer" className="group w-12 h-12 bg-slate-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center hover:bg-slate-300 dark:hover:bg-zinc-700 transition-all border border-slate-300/50 dark:border-zinc-700 hover:border-slate-400/50 dark:hover:border-zinc-600">
                  <Linkedin className="w-6 h-6 text-slate-600 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
              </a>
              <a href="https://www.instagram.com/tuanmudazaky_/" target="_blank" rel="noopener noreferrer" className="group w-12 h-12 bg-slate-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center hover:bg-slate-300 dark:hover:bg-zinc-700 transition-all border border-slate-300/50 dark:border-zinc-700 hover:border-slate-400/50 dark:hover:border-zinc-600">
                  <Instagram className="w-6 h-6 text-slate-600 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Column 4: Newsletter/Contact CTA */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">Tetap Terhubung</h4>
            <p className="text-slate-600 dark:text-zinc-400 text-sm mb-4">Dapatkan info terbaru tentang proyek dan teknologi.</p>
            <form onSubmit={handleSubscribeSubmit} className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={subscribeEmail}
                onChange={(e) => setSubscribeEmail(e.target.value)}
                disabled={subscribeStatus !== 'idle'}
                required
                className="w-full px-4 py-2 bg-slate-50/50 dark:bg-zinc-800/50 border border-slate-300/50 dark:border-zinc-700 rounded-l-lg focus:outline-none focus:border-teal-400 text-sm transition-colors disabled:opacity-50 placeholder-slate-500" 
              />
              <button type="submit" disabled={subscribeStatus !== 'idle'} className="px-4 py-2 bg-teal-500 hover:bg-teal-600 rounded-r-lg font-semibold text-sm text-white transition-colors w-32 disabled:bg-teal-700 disabled:opacity-70 disabled:cursor-not-allowed">
                {subscribeStatus === 'idle' && 'Subscribe'}
                {subscribeStatus === 'subscribing' && 'Subscribing...'}
                {subscribeStatus === 'success' && 'Success!'}
              </button>
            </form>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-300 dark:border-zinc-800 text-center text-slate-500 dark:text-zinc-500 text-sm">
          <p>© {new Date().getFullYear()} Syawal Okta Syahputra. All Rights Reserved.</p>
          <p className="mt-1">Built with <span className="text-teal-400">React</span> & <span className="text-sky-400">Tailwind CSS</span>.</p>
        </div>
      </footer>

      {/* Login Modal */}
      {activeModal === 'login' && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => {
            playSound('click.mp3');
            setActiveModal('none');
          }}
        >
          <div 
            className="bg-gradient-to-br from-slate-50 to-slate-200 dark:from-zinc-950 dark:to-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-3xl p-10 shadow-2xl shadow-slate-900/10 dark:shadow-black/30 w-full max-w-md relative animate-zoom-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button onClick={() => {
              playSound('click.mp3');
              setActiveModal('none');
            }} className="absolute top-4 right-4 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
              <X size={24} />
            </button>
            
            <div className="flex flex-col items-center justify-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-teal-500/30">
                  <Lock className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{t.loginTitle}</h2>
              <p className="text-slate-500 dark:text-zinc-400 mt-1">{t.loginWelcome}</p>
            </div>

            <form className="space-y-6">
              <div className="relative">
                <User className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400 dark:text-zinc-500" size={20} />
                <input type="text" className="w-full pl-12 pr-4 py-3 bg-slate-100/50 dark:bg-zinc-800/50 border border-slate-300 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500" placeholder={t.signupUsername} />
              </div>
              <div className="relative">
                <Lock className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400 dark:text-zinc-500" size={20} />
                <input type="password" className="w-full pl-12 pr-4 py-3 bg-slate-100/50 dark:bg-zinc-800/50 border border-slate-300 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500" placeholder={t.signupPassword} />
              </div>
              <div className="text-right">
                <a href="#" onClick={(e) => { 
                  e.preventDefault(); 
                  playSound('click.mp3');
                  setActiveModal('forgot'); 
                }} className="text-sm text-teal-500 dark:text-teal-400 hover:underline">{t.loginForgot}</a>
              </div>

              <button
                type="submit"
                onClick={(e) => { 
                  e.preventDefault(); 
                  // Mock login: simpan data dummy ke localStorage
                  playSound('click.mp3');
                  localStorage.setItem('portfolioUser', JSON.stringify({ username: 'demoUser' }));
                  setIsLoggedIn(true);
                  setActiveModal('none'); 
                }}
                className="w-full px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-teal-500/50 transition-all transform hover:scale-105"
              >{t.login}</button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300 dark:border-zinc-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-100 dark:bg-zinc-900 text-slate-500">{t.loginContinue}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-slate-100/50 dark:bg-zinc-800/50 rounded-xl font-semibold text-slate-800 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors">
                <Github size={20} /> GitHub
              </button>
              <button className="group flex items-center justify-center gap-3 w-full px-4 py-3 bg-slate-100/50 dark:bg-zinc-800/50 rounded-xl font-semibold text-slate-800 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:scale-110">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  <path d="M1 1h22v22H1z" fill="none"/>
                </svg>
                Google
              </button>
            </div>
            <p className="text-center text-sm text-slate-500 dark:text-zinc-500 mt-8">
              {t.loginNoAccount} <a href="#" onClick={(e) => { 
                e.preventDefault(); 
                playSound('click.mp3');
                setActiveModal('signup'); 
              }} className="font-semibold text-teal-500 dark:text-teal-400 hover:underline">{t.loginSignUp}</a>
            </p>
          </div>
        </div>
      )}

      {/* Sign Up Modal */}
      {activeModal === 'signup' && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => {
            playSound('click.mp3');
            setActiveModal('none');
          }}
        >
          <div 
            className="bg-gradient-to-br from-slate-50 to-slate-200 dark:from-zinc-950 dark:to-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-3xl p-10 shadow-2xl shadow-slate-900/10 dark:shadow-black/30 w-full max-w-md relative animate-zoom-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button onClick={() => {
              playSound('click.mp3');
              setActiveModal('none');
            }} className="absolute top-4 right-4 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
              <X size={24} />
            </button>
            
            <div className="flex flex-col items-center justify-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-teal-500/30">
                  <UserPlus className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{t.signupTitle}</h2>
              <p className="text-slate-500 dark:text-zinc-400 mt-1">{t.signupWelcome}</p>
            </div>

            <form className="space-y-6">
              <div className="relative">
                <Mail className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400 dark:text-zinc-500" size={20} />
                <input type="email" className="w-full pl-12 pr-4 py-3 bg-slate-100/50 dark:bg-zinc-800/50 border border-slate-300 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500" placeholder={t.signupEmail} />
              </div>
              <div className="relative">
                <User className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400 dark:text-zinc-500" size={20} />
                <input type="text" className="w-full pl-12 pr-4 py-3 bg-slate-100/50 dark:bg-zinc-800/50 border border-slate-300 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500" placeholder={t.signupUsername} />
              </div>
              <div className="relative">
                <Lock className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400 dark:text-zinc-500" size={20} />
                <input type="password" className="w-full pl-12 pr-4 py-3 bg-slate-100/50 dark:bg-zinc-800/50 border border-slate-300 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500" placeholder={t.signupPassword} />
              </div>

              <button
                type="submit"
                onClick={(e) => { 
                  e.preventDefault(); 
                  // Mock sign up: simpan data dummy dan langsung login
                  playSound('click.mp3');
                  localStorage.setItem('portfolioUser', JSON.stringify({ username: 'newUser' }));
                  setIsLoggedIn(true);
                  setActiveModal('none'); 
                }}
                className="w-full px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-teal-500/50 transition-all transform hover:scale-105"
              >{t.signupCreate}</button>
            </form>

            <p className="text-center text-sm text-slate-500 dark:text-zinc-500 mt-8">
              {t.signupHaveAccount} <a href="#" onClick={(e) => { 
                e.preventDefault(); 
                playSound('click.mp3');
                setActiveModal('login'); 
              }} className="font-semibold text-teal-500 dark:text-teal-400 hover:underline">{t.login}</a>
            </p>
          </div>
        </div>
      )}

      {/* Forgot Password Modal */}
      {activeModal === 'forgot' && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => {
            playSound('click.mp3');
            setActiveModal('none');
          }}
        >
          <div 
            className="bg-gradient-to-br from-slate-50 to-slate-200 dark:from-zinc-950 dark:to-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-3xl p-10 shadow-2xl shadow-slate-900/10 dark:shadow-black/30 w-full max-w-md relative animate-zoom-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button onClick={() => {
              playSound('click.mp3');
              setActiveModal('none');
            }} className="absolute top-4 right-4 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
              <X size={24} />
            </button>
            
            <div className="flex flex-col items-center justify-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-teal-500/30">
                  <KeyRound className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{t.forgotTitle}</h2>
              <p className="text-slate-500 dark:text-zinc-400 mt-1 text-center">{t.forgotSubtitle}</p>
            </div>

            <form className="space-y-6">
              <div className="relative">
                <Mail className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400 dark:text-zinc-500" size={20} />
                <input type="email" className="w-full pl-12 pr-4 py-3 bg-slate-100/50 dark:bg-zinc-800/50 border border-slate-300 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500" placeholder={t.formEmail} />
              </div>

              <button
                type="submit"
                onClick={(e) => { 
                  e.preventDefault(); 
                  playSound('click.mp3');
                  alert('Reset link sent (simulation)!'); 
                  setActiveModal('login'); 
                }}
                className="w-full px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-teal-500/50 transition-all transform hover:scale-105"
              >{t.forgotAction}</button>
            </form>

            <p className="text-center text-sm text-slate-500 dark:text-zinc-500 mt-8">
              <a href="#" onClick={(e) => { e.preventDefault(); playSound('click.mp3'); setActiveModal('login'); }} className="font-semibold text-teal-500 dark:text-teal-400 hover:underline">{t.forgotBackToLogin}</a>
            </p>
          </div>
        </div>
      )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => {
            playSound('click.mp3');
            setSelectedProject(null);
          }}
        >
          <div 
            className="bg-gradient-to-br from-slate-50 to-slate-200 dark:from-zinc-950 dark:to-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-3xl p-10 shadow-2xl shadow-slate-900/10 dark:shadow-black/30 w-full max-w-2xl relative animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button onClick={() => {
              playSound('click.mp3');
              setSelectedProject(null);
            }} className="absolute top-4 right-4 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
              <X size={24} />
            </button>
            
            <div className={`w-full h-48 bg-gradient-to-br ${selectedProject.gradient} rounded-2xl flex items-center justify-center text-8xl mb-6 shadow-2xl modal-content-fade-in-up`} style={{ animationDelay: '100ms' }}>
              {selectedProject.emoji}
            </div>

            <div className="flex items-center justify-between mb-4 modal-content-fade-in-up" style={{ animationDelay: '200ms' }}>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{selectedProject.title}</h2>
              <span className="text-sm px-4 py-1.5 bg-teal-500/10 text-teal-700 dark:bg-teal-500/20 dark:text-teal-400 rounded-full border border-teal-500/20 dark:border-teal-500/30 font-semibold">
                {selectedProject.category}
              </span>
            </div>

            <p className="text-slate-600 dark:text-zinc-400 text-base leading-relaxed mb-6 modal-content-fade-in-up" style={{ animationDelay: '300ms' }}>
              {selectedProject.description}
            </p>

            <div className="mb-6 modal-content-fade-in-up" style={{ animationDelay: '400ms' }}>
              <h4 className="font-bold text-lg mb-3 text-teal-500 dark:text-teal-400">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tech.map((tech, i) => (
                  <span key={i} className="text-sm px-3 py-1.5 bg-slate-200 dark:bg-zinc-800/50 border border-slate-300/50 dark:border-zinc-700/50 rounded-lg text-slate-700 dark:text-zinc-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8 modal-content-fade-in-up" style={{ animationDelay: '500ms' }}>
              {selectedProject.liveUrl ? (
                <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-slate-100/50 dark:bg-zinc-800/50 rounded-xl font-semibold text-slate-800 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors">
                  <ExternalLink size={20} /> Live Demo
                </a>
              ) : (
                <button disabled className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-slate-200/50 dark:bg-zinc-800/50 rounded-xl font-semibold text-slate-500 opacity-50 cursor-not-allowed">
                  <ExternalLink size={20} /> Live Demo
                </button>
              )}
              {selectedProject.sourceUrl ? (
                <a href={selectedProject.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-slate-100/50 dark:bg-zinc-800/50 rounded-xl font-semibold text-slate-800 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors">
                  <Github size={20} /> Source Code
                </a>
              ) : (
                <button disabled className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-slate-200/50 dark:bg-zinc-800/50 rounded-xl font-semibold text-slate-500 opacity-50 cursor-not-allowed">
                  <Github size={20} /> Source Code
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Chatbot Window */}
      {isChatOpen && (
        <div className="fixed bottom-28 left-8 z-50 w-96 max-w-[calc(100vw-4rem)] animate-fade-in-up">
          <div className="bg-slate-100/80 dark:bg-zinc-950/80 backdrop-blur-xl border border-slate-200 dark:border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/10 dark:shadow-cyan-500/20 flex flex-col h-[60vh] max-h-[700px]">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-cyan-500/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{t.chatTitle}</h3>
              </div>
              <button onClick={() => {
                playSound('click.mp3');
                handleCloseChat();
              }} className="text-slate-500 hover:text-slate-900 dark:hover:text-white">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-500/50 scrollbar-track-slate-200 dark:scrollbar-track-gray-800/50">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender === 'bot' && <div className="w-8 h-8 bg-slate-200 dark:bg-zinc-800 rounded-full flex items-center justify-center flex-shrink-0"><Bot size={18} className="text-cyan-400" /></div>}
                  <div className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.sender === 'user' 
                      ? 'bg-teal-500 text-white rounded-br-none' 
                      : 'bg-slate-200 text-slate-800 dark:bg-zinc-800 dark:text-zinc-300 rounded-bl-none'
                  }`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-200 dark:border-cyan-500/20">
              <form onSubmit={handleChatSubmit} className="flex items-center gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={t.chatPlaceholder}
                  className="w-full px-4 py-2 bg-slate-200/50 dark:bg-zinc-800/50 border border-slate-300 dark:border-cyan-500/20 rounded-full focus:outline-none focus:border-cyan-400 transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 text-sm"
                />
                <button 
                  type="submit"
                  className="w-10 h-10 flex-shrink-0 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 text-white flex items-center justify-center hover:scale-110 transition-transform"
                  aria-label="Send message"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
