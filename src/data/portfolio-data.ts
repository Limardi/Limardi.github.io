export interface PortfolioData {
  projects: Project[];
  experience: Experience[];
  education: Education;
  skills: Skill[];
  organizations: Organization[];
  languages: Language[];
  personal: PersonalInfo;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  detailedDescription: string;
  technologies: string[];
  challenges: string[];
  solutions: string[];
  outcomes: string[];
  githubUrl?: string;
  liveUrl?: string;
  image: string;
  type: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location?: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
  impact: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  gpa: number;
  tScore: number;
  rankings: Ranking[];
  courses: string[];
  focus: string[];
}

export interface Ranking {
  region: string;
  rank: string;
  icon: string;
}

export interface Skill {
  category: string;
  skills: string[];
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Organization {
  id: string;
  name: string;
  role: string;
  period: string;
  responsibilities: string[];
  impact: string[];
}

export interface Language {
  name: string;
  level: string;
  percentage: number;
  certification?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin?: string;
  about: string;
  interests: string[];
}

export const portfolioData: PortfolioData = {
  projects: [
    {
      id: "insta-clone",
      title: "Insta-Clone",
      category: "Web Development",
      description: "Instagram clone web app built from scratch, featuring full-stack development with React. Implemented seamless UI design with Tailwind CSS and created responsive web applications, establishing a solid foundation in dynamic web development.",
      detailedDescription: "A comprehensive Instagram clone that replicates core social media functionality including user authentication, photo sharing, likes, comments, and real-time updates. Built with modern web technologies and responsive design principles.",
      technologies: ["React", "Tailwind CSS", "JavaScript", "HTML5", "CSS3", "Git", "GitHub"],
      challenges: [
        "Implementing real-time updates for likes and comments",
        "Creating responsive design for mobile and desktop",
        "Managing state across multiple components",
        "Optimizing image loading and performance"
      ],
      solutions: [
        "Used React hooks for state management",
        "Implemented CSS Grid and Flexbox for responsive layouts",
        "Created reusable components for better code organization",
        "Optimized images with lazy loading techniques"
      ],
      outcomes: [
        "Successfully replicated Instagram's core features",
        "Improved understanding of React ecosystem",
        "Enhanced UI/UX design skills",
        "Gained experience with modern web development practices"
      ],
      githubUrl: "https://github.com/Limardi/insta-clone",
      image: "/images/insta-clone.jpg",
      type: "Self Project"
    },
    {
      id: "mini-chess-ai",
      title: "Mini-chess AI",
      category: "Machine Learning",
      description: "Decision tree model to predict optimal chess moves, implementing machine learning algorithms. Focused on improving basic Machine Learning concepts and building ML models using C++.",
      detailedDescription: "An AI chess engine that uses decision tree algorithms to evaluate board positions and predict optimal moves. The system analyzes game states and provides strategic recommendations based on machine learning principles.",
      technologies: ["C++", "Machine Learning", "Decision Trees", "Algorithms", "Data Structures"],
      challenges: [
        "Implementing efficient decision tree algorithms",
        "Optimizing move evaluation functions",
        "Handling large search spaces",
        "Balancing accuracy vs performance"
      ],
      solutions: [
        "Used alpha-beta pruning to reduce search space",
        "Implemented heuristic evaluation functions",
        "Created efficient data structures for board representation",
        "Applied machine learning techniques for move prediction"
      ],
      outcomes: [
        "Developed a functional chess AI engine",
        "Improved understanding of ML algorithms",
        "Enhanced C++ programming skills",
        "Gained experience with game AI development"
      ],
      githubUrl: "https://github.com/Limardi/mini-chess-ai",
      image: "/images/mini-chess-ai.jpg",
      type: "AI Project"
    },
    {
      id: "course-in",
      title: "Course-In",
      category: "Mobile Development",
      description: "Academic system information app for NTHU, featuring comprehensive API integration and database management. Developed using Flutter to create a seamless mobile experience.",
      detailedDescription: "A mobile application designed to help NTHU students access academic information, course schedules, and university resources. Features real-time data synchronization and intuitive user interface.",
      technologies: ["Flutter", "Dart", "API Integration", "Database Management", "Mobile UI/UX"],
      challenges: [
        "Integrating with NTHU's academic APIs",
        "Managing complex data structures",
        "Creating intuitive mobile interface",
        "Handling offline functionality"
      ],
      solutions: [
        "Implemented RESTful API integration",
        "Used local database for offline access",
        "Created responsive mobile UI components",
        "Applied state management patterns"
      ],
      outcomes: [
        "Successfully deployed mobile app for NTHU students",
        "Improved mobile development skills",
        "Enhanced API integration experience",
        "Gained user feedback and iteration experience"
      ],
      image: "/images/course-in.jpg",
      type: "Mobile App"
    },
    {
      id: "kitchen-learning",
      title: "Kitchen Learning",
      category: "Game Development",
      description: "Machine Learning project focused on creating AI agents for modern video games using Unity and reinforcement learning. Implemented ML-Agents to create AI agents with reinforcement learning (PPO) algorithm.",
      detailedDescription: "A Unity-based game environment where AI agents learn to perform kitchen tasks through reinforcement learning. The project demonstrates advanced AI techniques in game development and simulation.",
      technologies: ["Unity", "ML-Agents", "Reinforcement Learning", "PPO Algorithm", "C#", "Python"],
      challenges: [
        "Implementing PPO algorithm in Unity",
        "Designing effective reward systems",
        "Training AI agents for complex tasks",
        "Optimizing training performance"
      ],
      solutions: [
        "Used Unity ML-Agents framework",
        "Designed progressive reward structures",
        "Implemented curriculum learning",
        "Optimized neural network architectures"
      ],
      outcomes: [
        "Successfully trained AI agents for kitchen tasks",
        "Improved understanding of reinforcement learning",
        "Enhanced Unity development skills",
        "Gained experience with ML-Agents framework"
      ],
      image: "/images/kitchen-learning.jpg",
      type: "Game Dev"
    }
  ],
  experience: [
    {
      id: "icode-intern",
      role: "Software Engineer Intern",
      company: "iCode Indonesia",
      location: "Jakarta",
      period: "July 2023 - Sept 2023",
      description: "Create a real-life problem solution using Computer vision and Machine Learning",
      achievements: [
        "Learn OpenCV and YOLO/v8 to create an AI model",
        "Utilize version control (git, github) for professional software development"
      ],
      technologies: ["OpenCV", "YOLO", "Python", "Computer Vision", "Machine Learning", "Git"],
      impact: [
        "Developed computer vision solutions for real-world problems",
        "Contributed to AI model development and deployment",
        "Improved code quality through version control practices"
      ]
    },
    {
      id: "research-assistant",
      role: "Undergraduate Research Assistant",
      company: "CGV & VM Lab",
      period: "Oct 2024 - Present",
      description: "Work under 2 projects for professor Hung Kuo Chu and professor Shih Hsuan Hung",
      achievements: [
        "Dataset Visualization for Structure from motion Camera Input",
        "Improving Physical based realistic material generation Pipeline"
      ],
      technologies: ["Computer Vision", "3D Graphics", "Python", "Research Methods", "Data Visualization"],
      impact: [
        "Contributed to cutting-edge computer vision research",
        "Improved material generation algorithms",
        "Enhanced dataset visualization techniques"
      ]
    },
    {
      id: "teaching-assistant",
      role: "Teaching Assistant",
      company: "NTHU IBP Summer camp",
      period: "June 2024 - July 2024",
      description: "Summer camp teaching assistant",
      achievements: [
        "Create curriculum, prepare material and final project for Summer camp",
        "Teach basic C and arduino programming"
      ],
      technologies: ["C Programming", "Arduino", "Teaching", "Curriculum Development"],
      impact: [
        "Mentored international students in programming fundamentals",
        "Developed comprehensive curriculum materials",
        "Enhanced teaching and communication skills"
      ]
    }
  ],
  education: {
    institution: "National Tsing Hua University",
    degree: "B.S. in Electrical Engineering and Computer Science",
    period: "September 2022 - Present",
    gpa: 3.5,
    tScore: 50.0,
    rankings: [
      { region: "Taiwan", rank: "#2", icon: "🇹🇼" },
      { region: "Asia", rank: "#81", icon: "🌏" },
      { region: "World", rank: "#267", icon: "🌍" }
    ],
    courses: [
      "Data Structures",
      "Algorithms",
      "Computer Architecture",
      "Digital Design",
      "Programming Languages",
      "Operating Systems",
      "Database Systems",
      "Computer Networks"
    ],
    focus: [
      "Software Development",
      "Computer Systems",
      "Electrical Engineering Fundamentals",
      "Machine Learning",
      "Computer Vision"
    ]
  },
  skills: [
    {
      category: "Programming Languages",
      skills: ["C++", "Python", "JavaScript", "TypeScript", "C", "Dart"],
      proficiency: "Advanced"
    },
    {
      category: "Web Development",
      skills: ["React", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "Node.js"],
      proficiency: "Advanced"
    },
    {
      category: "Mobile Development",
      skills: ["Flutter", "React Native", "Mobile UI/UX"],
      proficiency: "Intermediate"
    },
    {
      category: "Machine Learning",
      skills: ["TensorFlow", "PyTorch", "OpenCV", "YOLO", "Reinforcement Learning", "ML-Agents"],
      proficiency: "Intermediate"
    },
    {
      category: "Tools & Technologies",
      skills: ["Git", "GitHub", "Unity", "Arduino", "Docker", "Linux"],
      proficiency: "Intermediate"
    }
  ],
  organizations: [
    {
      id: "eecs-gsa",
      name: "EECS-GSA",
      role: "Member of Academic affair",
      period: "Mar 2024 - Present",
      responsibilities: [
        "Organizing 2 networking events for EECS international students in NTHU",
        "Active Support NTHU EECS international student community",
        "Actively supported students in the Electrical Engineering and Computer Science Global Studies",
        "Providing guidance on academic pathways and career prospects",
        "Organizing events and workshops aimed at enhancing student knowledge about the university, industry trends"
      ],
      impact: [
        "Enhanced international student community engagement",
        "Improved academic support systems",
        "Facilitated networking opportunities"
      ]
    },
    {
      id: "ppi-hsinchu",
      name: "Indonesian Student Association in Hsinchu (PPI Hsinchu)",
      role: "Member of Academic and career affair",
      period: "Aug 2024 - Present",
      responsibilities: [
        "Organizing event and supporting Indonesian community in Hsinchu city",
        "Head of Division and Event for several events",
        "Member of Academic and Career division for Indonesian Student Association in H.H.H",
        "Academic Events for Indonesian students in Hsinchu City"
      ],
      impact: [
        "Strengthened Indonesian student community",
        "Organized successful academic and career events",
        "Provided support for Indonesian students abroad"
      ]
    },
    {
      id: "nthu-ibp",
      name: "NTHU IBP Summer camp",
      role: "Teaching assistant Division",
      period: "June 2024 - July 2024",
      responsibilities: [
        "Create curriculum, prepare material and final project for Summer camp",
        "Teach basic C and arduino programming",
        "Assisted in teaching and mentoring international students in foundational C Programming",
        "Collaborated with a diverse team to design and conduct interactive workshops",
        "Fostering hands-on learning and encouraging problem-solving skills"
      ],
      impact: [
        "Successfully mentored international students",
        "Developed comprehensive programming curriculum",
        "Enhanced teaching and leadership skills"
      ]
    }
  ],
  languages: [
    {
      name: "English",
      level: "IELTS - 6.5 (CEFR B2)",
      percentage: 85,
      certification: "IELTS"
    },
    {
      name: "Chinese",
      level: "TOCFL - B1",
      percentage: 70,
      certification: "TOCFL"
    },
    {
      name: "Indonesian",
      level: "Native",
      percentage: 100
    }
  ],
  personal: {
    name: "Vincent Limardi",
    title: "Full-stack Developer",
    location: "Hsinchu, Taiwan",
    email: "vincentlimardi234@gmail.com",
    phone: "+886 976 972 122",
    github: "https://github.com/Limardi",
    about: "Full-stack developer passionate about creating elegant solutions. Currently pursuing a degree in Electrical Engineering and Computer Science at National Tsing Hua University. Experienced in web development, machine learning, and mobile applications.",
    interests: [
      "Machine Learning and AI",
      "Web Development",
      "Mobile Applications",
      "Computer Vision",
      "Game Development",
      "Open Source Projects"
    ]
  }
}; 