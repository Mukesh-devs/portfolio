import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Bot, User, Loader2, X } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface AIChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

// ── Portfolio Knowledge Base ──
const PORTFOLIO_CONTEXT = `
You are Mukesh MK's portfolio AI assistant. Answer questions about Mukesh based on this info:

NAME: Mukesh MK
ROLE: Software Engineer
LOCATION: Chennai, India
EMAIL: mukesh.be25@gmail.com
LINKEDIN: linkedin.com/in/mukeshmurugan
GITHUB: github.com/Mukesh-devs
LEETCODE: leetcode.com/u/Mukesh-mx
WORK PREFERENCES: Open to Remote, Hybrid, or On-site; Flexible timings; Ready to relocate

ABOUT: Computer Science graduate (B.E., Anna University, CGPA 8.62/10, 2020–2024). Former Zoho Incubation Trainee with 6 months of hands-on training. Currently learning AI integration for modern applications. Focused on clean, efficient code and scalable backend systems.

SKILLS:
- Backend: Java (OOP, DSA), Python, Spring Boot, JPA/Hibernate, RESTful APIs, MySQL
- Cloud: AWS (EC2, S3, Lambda), Google Cloud, Cloud Networking, IAM, Linux
- DevOps: Docker, Git, Postman
- Frontend: React, HTML5, CSS3, JavaScript, Tailwind CSS
- Networking: TCP/IP, Subnetting

PROJECTS:
1. MemoryBook – Social Memory Sharing: Spring Boot MVC, RESTful APIs, MySQL via JPA/Hibernate, JWT auth, role-based authorization.
2. MovieTime AI – Smart Ticket Booking: Java/Spring Boot + Python AI agent using Google Gemini for conversational movie ticket booking, React frontend.
3. MedBot – AI-powered health info system: 162K+ entity medical Knowledge Graph, Google Gemini LLM, semantic search (Sentence Transformers), fact validation, PubMed citations. Tech: Python, Flask, SQLite, D3.js, PyTorch.
4. Job Crawler – Autonomous job scraper: LinkedIn/Naukri scraper with Gemini AI job analysis, match scoring, stealth mode, ATS-optimized resume generation, Telegram notifications. Tech: Python, Selenium, Google Gemini, SQLite, Pandas.

EXPERIENCE:
1. Incubation Trainee – Zoho, Chennai (Feb 2025 – Jun 2025): 6-month intensive training in full-stack development, software engineering practices.
2. Technical Careers Program – TNS India Foundation with Capgemini (Dec 2023 – May 2024): Training in SQL, Core Java 8, JPA/Hibernate, Git, Spring Boot, JavaScript, HTML5, CSS3.

EDUCATION:
- B.E. in Computer Science – Anna University, Chennai (CGPA 8.62/10)
- HSC – Our Angel Matriculation HSS, Chennai (67%)
- SSLC – Our Angel Matriculation HSS, Chennai (85%)
`;

// ── Smart response generator (returns null if no keyword match) ──
function generateResponse(question: string): string | null {
  const q = question.toLowerCase().trim();

  // Greetings
  if (/^(hi|hello|hey|hola|greetings|yo|sup)\b/.test(q)) {
    return "Hey there! 👋 I'm Mukesh's portfolio assistant. I can tell you about his skills, projects, experience, education, or how to get in touch. What would you like to know?";
  }

  // Name
  if (/who (is|are)|what('?s| is) (your|his) name|about (you|him|mukesh)/i.test(q)) {
    return "I'm the AI assistant for **Mukesh MK** — a Software Engineer based in Chennai, India. He's a Computer Science graduate from Anna University (CGPA 8.62/10) with experience at Zoho as an Incubation Trainee. He's passionate about building clean, scalable backend systems and is currently exploring AI integration for modern applications.";
  }

  // Skills
  if (/skill|tech|stack|language|tool|what (can|does) (he|mukesh) (know|use)|proficien/i.test(q)) {
    return "Mukesh has a strong skill set across multiple domains:\n\n**Backend:** Java (OOP, DSA), Python, Spring Boot, JPA/Hibernate, RESTful APIs, MySQL\n\n**Cloud & Infra:** AWS (EC2, S3, Lambda), Google Cloud, IAM, Linux\n\n**DevOps:** Docker, Git, Postman\n\n**Frontend:** React, JavaScript, HTML5, CSS3, Tailwind CSS\n\n**Networking:** TCP/IP, Subnetting\n\nHe's especially strong in Java/Spring Boot backend development and has been actively building AI-powered applications!";
  }

  // Java / Spring Boot
  if (/java|spring\s*boot|backend|jpa|hibernate/i.test(q)) {
    return "Java and Spring Boot are Mukesh's core strengths! He has deep expertise in:\n\n• **Java** — OOP, Data Structures & Algorithms\n• **Spring Boot** — MVC architecture, REST API development\n• **JPA/Hibernate** — Database ORM & MySQL integration\n• **JWT Authentication** — Secure API authorization\n\nHe applied these skills in projects like **MemoryBook** (social memory sharing app) and **MovieTime AI** (smart ticket booking system).";
  }

  // Python
  if (/python|flask|selenium|pandas/i.test(q)) {
    return "Mukesh uses Python extensively for AI/ML and automation projects:\n\n• **MedBot** — Built with Flask, PyTorch, Sentence Transformers for medical knowledge graph querying\n• **Job Crawler** — Uses Selenium for web scraping, Pandas for data processing, and Google Gemini for AI analysis\n• **MovieTime AI** — Python AI agent integrated with Google Gemini\n\nHe's comfortable with Flask, SQLite, Selenium, Pandas, and various AI/ML libraries.";
  }

  // Projects (general)
  if (/project|built|build|portfolio|work(ed)? on|created|develop/i.test(q)) {
    return "Mukesh has built some impressive projects:\n\n🔹 **MemoryBook** — Social memory sharing platform with Spring Boot, JWT auth, and role-based access\n\n🔹 **MovieTime AI** — AI-powered movie ticket booking using Google Gemini for conversational UX\n\n🔹 **MedBot** — Health info system with a 162K+ entity medical Knowledge Graph, semantic search, and PubMed citations\n\n🔹 **Job Crawler** — Autonomous job scraper with AI job matching, stealth mode, and auto resume generation\n\nWant details on any specific project?";
  }

  // MedBot
  if (/medbot|medical|health|knowledge graph/i.test(q)) {
    return "**MedBot** is an AI-powered health information system that combines:\n\n• A **162K+ entity Medical Knowledge Graph**\n• **Google Gemini LLM** for natural language understanding\n• **Sentence Transformers** for semantic search\n• **Fact validation** with PubMed citation linking\n\n**Tech Stack:** Python, Flask, SQLite, D3.js, PyTorch\n\nIt's designed to provide accurate, evidence-based medical information with proper citations!";
  }

  // MovieTime
  if (/movie|ticket|booking|movietime/i.test(q)) {
    return "**MovieTime AI** is a smart movie ticket booking system that features:\n\n• **Conversational UI** — Chat-based booking powered by Google Gemini AI agent\n• **Backend:** Java/Spring Boot for robust API handling\n• **AI Agent:** Python-based agent for natural language ticket booking\n• **Frontend:** React for a smooth user experience\n\nIt demonstrates Mukesh's ability to integrate AI with traditional full-stack development!";
  }

  // Job Crawler
  if (/job\s*crawler|scraper|scraping|job\s*board|resume/i.test(q)) {
    return "**Job Crawler** is an autonomous job hunting tool that includes:\n\n• **Smart Scraping** — Crawls LinkedIn & Naukri with stealth/anti-bot measures\n• **AI Analysis** — Google Gemini evaluates job matches with scoring\n• **Auto Resume** — Generates ATS-optimized resumes (PDF/DOCX)\n• **Notifications** — Sends alerts via Telegram\n\n**Tech:** Python, Selenium, Google Gemini, SQLite, Pandas\n\nA great showcase of automation + AI skills!";
  }

  // MemoryBook
  if (/memory\s*book|social|memory sharing/i.test(q)) {
    return "**MemoryBook** is a social memory sharing platform built with:\n\n• **Spring Boot MVC** — Clean architecture with RESTful APIs\n• **MySQL + JPA/Hibernate** — Efficient database management\n• **JWT Authentication** — Secure user sessions\n• **Role-based Authorization** — Controlled access to features\n\nIt demonstrates solid backend engineering with proper security practices!";
  }

  // Experience
  if (/experience|work|intern|job|career|zoho|capgemini|tns/i.test(q)) {
    return "Mukesh's professional experience:\n\n**🏢 Zoho** — Incubation Trainee (Feb–Jun 2025)\n• 6-month intensive training in full-stack development\n• Software engineering best practices & real-world problem solving\n\n**🏢 TNS India Foundation (with Capgemini)** — Technical Careers Program (Dec 2023–May 2024)\n• Training in SQL, Core Java 8, JPA/Hibernate, Git\n• Spring Boot, JavaScript, HTML5, CSS3\n\nHe's gained strong industry-level training from top tech companies!";
  }

  // Education
  if (/education|university|college|degree|cgpa|grade|study|academic/i.test(q)) {
    return "Mukesh's educational background:\n\n🎓 **B.E. in Computer Science** — Anna University, Chennai\n• CGPA: 8.62 / 10\n• Duration: Nov 2020 – Jun 2024\n\n📚 **HSC** — Our Angel Matriculation HSS, Chennai (67%)\n📚 **SSLC** — Our Angel Matriculation HSS, Chennai (85%)\n\nHe graduated with a strong academic record in Computer Science!";
  }

  // Contact
  if (/contact|reach|email|mail|hire|connect|touch|linkedin|github|leetcode/i.test(q)) {
    return "You can reach Mukesh through:\n\n📧 **Email:** mukesh.be25@gmail.com\n💼 **LinkedIn:** [linkedin.com/in/mukeshmurugan](https://linkedin.com/in/mukeshmurugan)\n🐙 **GitHub:** [github.com/Mukesh-devs](https://github.com/Mukesh-devs)\n💻 **LeetCode:** [leetcode.com/u/Mukesh-mx](https://leetcode.com/u/Mukesh-mx)\n\n📍 Based in Chennai, India — open to Remote, Hybrid, or On-site roles and ready to relocate!";
  }

  // Location / availability
  if (/locat|where|city|country|remote|relocat|avail|open to/i.test(q)) {
    return "Mukesh is based in **Chennai, India** 📍\n\nHe's very flexible with work arrangements:\n• ✅ Open to **Remote, Hybrid, or On-site**\n• ✅ **Flexible timings** (any shift)\n• ✅ **Ready to relocate**\n\nHe's actively looking for opportunities where he can contribute and grow!";
  }

  // AI / ML
  if (/ai|artificial|machine learning|ml|gemini|llm|deep learning/i.test(q)) {
    return "Mukesh is actively building with AI:\n\n• **Google Gemini** — Used across MovieTime AI, Job Crawler, and MedBot\n• **Sentence Transformers** — Semantic search in MedBot\n• **PyTorch** — Deep learning components in MedBot\n• **Knowledge Graphs** — 162K+ entity medical KG in MedBot\n\nHe's bridging traditional software engineering with modern AI capabilities — a powerful combination!";
  }

  // Cloud / AWS
  if (/cloud|aws|ec2|s3|lambda|google cloud|deploy/i.test(q)) {
    return "Mukesh has cloud infrastructure skills including:\n\n☁️ **AWS:** EC2, S3, Lambda\n☁️ **Google Cloud** platform experience\n🔒 **IAM** — Identity & access management\n🐧 **Linux** — Server administration\n🌐 **Networking** — TCP/IP, subnetting, cloud networking\n\nHe can handle both application development and cloud deployment!";
  }

  // Docker / DevOps
  if (/docker|devops|container|deploy|ci\/?cd|git\b/i.test(q)) {
    return "Mukesh's DevOps & tooling experience:\n\n🐳 **Docker** — Containerization\n📦 **Git** — Version control\n🔧 **Postman** — API testing & documentation\n🐧 **Linux** — Server management & scripting\n\nHe understands the full development lifecycle from code to deployment!";
  }

  // Strengths / why hire
  if (/strength|why hire|why should|what makes|unique|stand out|special/i.test(q)) {
    return "What makes Mukesh stand out:\n\n💡 **Strong foundations** — 8.62 CGPA + Zoho training\n🛠️ **Full-stack capable** — Java/Spring Boot backend + React frontend\n🤖 **AI-savvy** — Building real AI-powered apps with Google Gemini\n📊 **Problem solver** — Active on LeetCode with strong DSA skills\n🚀 **Self-driven** — Built 4 substantial projects independently\n🔄 **Versatile** — Backend, cloud, AI, and automation skills\n\nHe brings a rare combination of solid engineering + cutting-edge AI skills!";
  }

  // Thanks
  if (/thank|thanks|thx|appreciate/i.test(q)) {
    return "You're welcome! 😊 Feel free to ask anything else about Mukesh's portfolio, or reach out to him directly at **mukesh.be25@gmail.com**. Have a great day!";
  }

  // Bye
  if (/^(bye|goodbye|see you|cya|later)\b/i.test(q)) {
    return "Goodbye! 👋 Thanks for checking out Mukesh's portfolio. Don't hesitate to reach out if you have more questions. Have a wonderful day!";
  }

  // No keyword match — return null to trigger API fallback
  return null;
}

// ── Typing Animation Hook ──
function useTypingAnimation(text: string, speed: number = 15) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!text) return;
    setDisplayedText('');
    setIsComplete(false);
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return { displayedText, isComplete };
}

// ── Single Message Bubble ──
const MessageBubble: React.FC<{ message: Message; isLatest: boolean }> = ({ message, isLatest }) => {
  const isUser = message.role === 'user';
  const shouldAnimate = !isUser && isLatest && message.isTyping;
  const { displayedText, isComplete } = useTypingAnimation(
    shouldAnimate ? message.content : '',
    12
  );

  const content = shouldAnimate ? displayedText : message.content;

  // Simple markdown-like rendering
  const renderContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      // Bold: **text**
      const parsed = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      // Links: [text](url)
      const withLinks = parsed.replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer" class="underline text-blue-400 hover:text-blue-300">$1</a>'
      );
      return (
        <span key={i}>
          <span dangerouslySetInnerHTML={{ __html: withLinks }} />
          {i < text.split('\n').length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-3 mt-1">
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-md'
            : 'bg-gray-100 dark:bg-slate-700/80 text-gray-800 dark:text-gray-200 rounded-bl-md'
        }`}
      >
        <div className="whitespace-pre-wrap">{renderContent(content)}</div>
        {shouldAnimate && !isComplete && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.6 }}
            className="inline-block w-1.5 h-4 bg-current ml-0.5 align-middle rounded-sm"
          />
        )}
      </div>
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 dark:from-gray-500 dark:to-gray-700 flex items-center justify-center ml-3 mt-1">
          <User className="w-4 h-4 text-white" />
        </div>
      )}
    </motion.div>
  );
};

// ── Loading Indicator ──
const TypingIndicator: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="flex justify-start mb-4"
  >
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-3">
      <Bot className="w-4 h-4 text-white" />
    </div>
    <div className="bg-gray-100 dark:bg-slate-700/80 rounded-2xl rounded-bl-md px-5 py-3 flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500"
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15, ease: 'easeInOut' }}
        />
      ))}
    </div>
  </motion.div>
);

// ── API Fallback ──
const API_URL = 'http://127.0.0.1:8000/ask';

async function fetchFromAPI(question: string): Promise<string> {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    return data.answer || data.response || data.message || JSON.stringify(data);
  } catch {
    return "I couldn't reach the server right now. You can try asking about Mukesh's **skills**, **projects**, **experience**, **education**, or **contact info** — I know those by heart!";
  }
}

// ── Suggested Questions ──
const SUGGESTIONS = [
  "What are Mukesh's skills?",
  "Tell me about his projects",
  "What's his experience?",
  "How can I contact him?",
];

// ── Main Chat Window ──
const AIChatWindow: React.FC<AIChatWindowProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMsg: Message = {
        id: 'welcome',
        role: 'assistant',
        content: "Hi! 👋 I'm Mukesh's AI assistant. I know all about his skills, projects, experience, and education. Ask me anything about his portfolio!",
        timestamp: new Date(),
        isTyping: true,
      };
      setMessages([welcomeMsg]);
    }
  }, [isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [isOpen]);

  // Browser back button support + Escape key
  useEffect(() => {
    if (!isOpen) return;

    // Push a fake history state so pressing back closes the chat
    window.history.pushState({ chatOpen: true }, '');

    const handlePopState = () => {
      onClose();
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // When chat closes, clean up history state if it's still there
  const handleClose = useCallback(() => {
    if (window.history.state?.chatOpen) {
      window.history.back();
    } else {
      onClose();
    }
  }, [onClose]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      const userMsg: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: text.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) =>
        prev.map((m) => ({ ...m, isTyping: false })).concat(userMsg)
      );
      setInput('');
      setIsLoading(true);

      // Try local keyword match first
      const localResponse = generateResponse(text);

      let response: string;
      if (localResponse) {
        // Small delay for local responses
        await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 400));
        response = localResponse;
      } else {
        // Fallback to API
        response = await fetchFromAPI(text);
      }

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        isTyping: true,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsLoading(false);
    },
    [isLoading]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  // Click outside the panel to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-end sm:justify-end p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleBackdropClick}
        >
          {/* Backdrop – lets portfolio show through */}
          <motion.div
            className="absolute inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Chat Panel */}
          <motion.div
            ref={panelRef}
            className="relative w-full sm:w-[420px] md:w-[460px] h-full sm:h-[85vh] sm:max-h-[700px] flex flex-col bg-white dark:bg-slate-900 sm:rounded-2xl shadow-2xl overflow-hidden border-0 sm:border border-gray-200/50 dark:border-slate-700/50"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex-shrink-0 flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-blue-600" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white">
                    Portfolio AI
                  </h2>
                  <p className="text-[11px] text-blue-100/80">
                    Ask me about Mukesh
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4 text-white/80" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto ai-chat-scroll px-4 py-5 space-y-1">
              {messages.length <= 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-wrap gap-2 justify-center mt-2 mb-4"
                >
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="px-3.5 py-1.5 rounded-full text-xs border border-gray-200 dark:border-slate-600 text-gray-500 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                    >
                      {s}
                    </button>
                  ))}
                </motion.div>
              )}

              {messages.map((msg, idx) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  isLatest={idx === messages.length - 1}
                />
              ))}

              <AnimatePresence>{isLoading && <TypingIndicator />}</AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area – clean, no border divider */}
            <div className="flex-shrink-0 px-4 pb-4 pt-2 bg-white dark:bg-slate-900">
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-2.5"
              >
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask anything about Mukesh..."
                    disabled={isLoading}
                    className="w-full px-4 py-2.5 rounded-full bg-gray-100 dark:bg-slate-800 border-0 text-gray-900 dark:text-white text-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all duration-200 disabled:opacity-50"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-shrink-0 p-2.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIChatWindow;
