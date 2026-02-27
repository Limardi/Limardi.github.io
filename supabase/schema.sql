-- ============================================================
-- Portfolio CMS Schema
-- Run this in your Supabase project: SQL Editor > New Query
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- personal_info
-- ============================================================
create table if not exists personal_info (
    id uuid primary key default uuid_generate_v4 (),
    name text not null,
    title text not null,
    location text not null,
    email text not null,
    phone text not null,
    github text not null,
    linkedin text,
    about text not null,
    interests text [] not null default '{}',
    updated_at timestamptz default now()
);

-- ============================================================
-- projects
-- ============================================================
create table if not exists projects (
    id uuid primary key default uuid_generate_v4 (),
    slug text unique not null,
    title text not null,
    category text not null,
    description text not null,
    detailed_description text not null,
    technologies text [] not null default '{}',
    challenges text [] not null default '{}',
    solutions text [] not null default '{}',
    outcomes text [] not null default '{}',
    github_url text,
    live_url text,
    image text,
    type text not null,
    sort_order int not null default 0,
    created_at timestamptz default now()
);

-- ============================================================
-- experience
-- ============================================================
create table if not exists experience (
    id uuid primary key default uuid_generate_v4 (),
    slug text unique not null,
    role text not null,
    company text not null,
    location text,
    period text not null,
    description text not null,
    achievements text [] not null default '{}',
    technologies text [] not null default '{}',
    impact text [] not null default '{}',
    sort_order int not null default 0,
    created_at timestamptz default now()
);

-- ============================================================
-- education
-- ============================================================
create table if not exists education (
    id uuid primary key default uuid_generate_v4 (),
    institution text not null,
    degree text not null,
    period text not null,
    gpa numeric(3, 2),
    t_score numeric(4, 1),
    rankings jsonb not null default '[]',
    courses text [] not null default '{}',
    focus text [] not null default '{}',
    updated_at timestamptz default now()
);

-- ============================================================
-- skills
-- ============================================================
create table if not exists skills (
    id uuid primary key default uuid_generate_v4 (),
    category text not null,
    skills text [] not null default '{}',
    proficiency text not null check (
        proficiency in (
            'Beginner',
            'Intermediate',
            'Advanced',
            'Expert'
        )
    ),
    sort_order int not null default 0
);

-- ============================================================
-- organizations
-- ============================================================
create table if not exists organizations (
    id uuid primary key default uuid_generate_v4 (),
    slug text unique not null,
    name text not null,
    role text not null,
    period text not null,
    responsibilities text [] not null default '{}',
    impact text [] not null default '{}',
    sort_order int not null default 0,
    created_at timestamptz default now()
);

-- ============================================================
-- languages
-- ============================================================
create table if not exists languages (
    id uuid primary key default uuid_generate_v4 (),
    name text not null,
    level text not null,
    percentage int not null check (percentage between 0 and 100),
    certification text,
    sort_order int not null default 0
);

-- ============================================================
-- Row Level Security (RLS)
-- Public: can read everything
-- Writes: blocked (CMS uses service role key locally, bypassing RLS)
-- ============================================================
alter table personal_info enable row level security;

alter table projects enable row level security;

alter table experience enable row level security;

alter table education enable row level security;

alter table skills enable row level security;

alter table organizations enable row level security;

alter table languages enable row level security;

-- Allow public read on all tables
create policy "Public read personal_info" on personal_info for
select using (true);

create policy "Public read projects" on projects for
select using (true);

create policy "Public read experience" on experience for
select using (true);

create policy "Public read education" on education for
select using (true);

create policy "Public read skills" on skills for
select using (true);

create policy "Public read organizations" on organizations for
select using (true);

create policy "Public read languages" on languages for
select using (true);

-- ============================================================
-- Seed: existing portfolio data (from portfolio-data.ts)
-- ============================================================

insert into
    personal_info (
        name,
        title,
        location,
        email,
        phone,
        github,
        about,
        interests
    )
values (
        'Vincent Limardi',
        'Full-stack Developer',
        'Hsinchu, Taiwan',
        'vincentlimardi234@gmail.com',
        '+886 976 972 122',
        'https://github.com/Limardi',
        'Full-stack developer passionate about creating elegant solutions. Currently pursuing a degree in Electrical Engineering and Computer Science at National Tsing Hua University. Experienced in web development, machine learning, and mobile applications.',
        array[
            'Machine Learning and AI',
            'Web Development',
            'Mobile Applications',
            'Computer Vision',
            'Game Development',
            'Open Source Projects'
        ]
    );

insert into
    education (
        institution,
        degree,
        period,
        gpa,
        t_score,
        rankings,
        courses,
        focus
    )
values (
        'National Tsing Hua University',
        'B.S. in Electrical Engineering and Computer Science',
        'September 2022 - Present',
        3.5,
        50.0,
        '[{"region":"Taiwan","rank":"#2","icon":"🇹🇼"},{"region":"Asia","rank":"#81","icon":"🌏"},{"region":"World","rank":"#267","icon":"🌍"}]',
        array[
            'Data Structures',
            'Algorithms',
            'Computer Architecture',
            'Digital Design',
            'Programming Languages',
            'Operating Systems',
            'Database Systems',
            'Computer Networks'
        ],
        array[
            'Software Development',
            'Computer Systems',
            'Electrical Engineering Fundamentals',
            'Machine Learning',
            'Computer Vision'
        ]
    );

insert into projects (slug, title, category, description, detailed_description, technologies, challenges, solutions, outcomes, github_url, image, type, sort_order) values
('insta-clone', 'Insta-Clone', 'Web Development',
 'Instagram clone web app built from scratch, featuring full-stack development with React. Implemented seamless UI design with Tailwind CSS and created responsive web applications, establishing a solid foundation in dynamic web development.',
 'A comprehensive Instagram clone that replicates core social media functionality including user authentication, photo sharing, likes, comments, and real-time updates.',
 array['React','Tailwind CSS','JavaScript','HTML5','CSS3','Git','GitHub'],
 array['Implementing real-time updates for likes and comments','Creating responsive design for mobile and desktop','Managing state across multiple components','Optimizing image loading and performance'],
 array['Used React hooks for state management','Implemented CSS Grid and Flexbox for responsive layouts','Created reusable components for better code organization','Optimized images with lazy loading techniques'],
 array['Successfully replicated Instagram core features','Improved understanding of React ecosystem','Enhanced UI/UX design skills','Gained experience with modern web development practices'],
 'https://github.com/Limardi/insta-clone', '/images/insta-clone.jpg', 'Self Project', 1),
('mini-chess-ai', 'Mini-chess AI', 'Machine Learning',
 'Decision tree model to predict optimal chess moves, implementing machine learning algorithms. Focused on improving basic Machine Learning concepts and building ML models using C++.',
 'An AI chess engine that uses decision tree algorithms to evaluate board positions and predict optimal moves.',
 array['C++','Machine Learning','Decision Trees','Algorithms','Data Structures'],
 array['Implementing efficient decision tree algorithms','Optimizing move evaluation functions','Handling large search spaces','Balancing accuracy vs performance'],
 array['Used alpha-beta pruning to reduce search space','Implemented heuristic evaluation functions','Created efficient data structures for board representation','Applied machine learning techniques for move prediction'],
 array['Developed a functional chess AI engine','Improved understanding of ML algorithms','Enhanced C++ programming skills','Gained experience with game AI development'],
 'https://github.com/Limardi/mini-chess-ai', '/images/mini-chess-ai.jpg', 'AI Project', 2),
('course-in', 'Course-In', 'Mobile Development',
 'Academic system information app for NTHU, featuring comprehensive API integration and database management. Developed using Flutter to create a seamless mobile experience.',
 'A mobile application designed to help NTHU students access academic information, course schedules, and university resources.',
 array['Flutter','Dart','API Integration','Database Management','Mobile UI/UX'],
 array['Integrating with NTHU academic APIs','Managing complex data structures','Creating intuitive mobile interface','Handling offline functionality'],
 array['Implemented RESTful API integration','Used local database for offline access','Created responsive mobile UI components','Applied state management patterns'],
 array['Successfully deployed mobile app for NTHU students','Improved mobile development skills','Enhanced API integration experience','Gained user feedback and iteration experience'],
 null, '/images/course-in.jpg', 'Mobile App', 3),
('kitchen-learning', 'Kitchen Learning', 'Game Development',
 'Machine Learning project focused on creating AI agents for modern video games using Unity and reinforcement learning.',
 'A Unity-based game environment where AI agents learn to perform kitchen tasks through reinforcement learning.',
 array['Unity','ML-Agents','Reinforcement Learning','PPO Algorithm','C#','Python'],
 array['Implementing PPO algorithm in Unity','Designing effective reward systems','Training AI agents for complex tasks','Optimizing training performance'],
 array['Used Unity ML-Agents framework','Designed progressive reward structures','Implemented curriculum learning','Optimized neural network architectures'],
 array['Successfully trained AI agents for kitchen tasks','Improved understanding of reinforcement learning','Enhanced Unity development skills','Gained experience with ML-Agents framework'],
 null, '/images/kitchen-learning.jpg', 'Game Dev', 4);

insert into
    experience (
        slug,
        role,
        company,
        location,
        period,
        description,
        achievements,
        technologies,
        impact,
        sort_order
    )
values (
        'icode-intern',
        'Software Engineer Intern',
        'iCode Indonesia',
        'Jakarta',
        'July 2023 - Sept 2023',
        'Create a real-life problem solution using Computer vision and Machine Learning',
        array[
            'Learn OpenCV and YOLO/v8 to create an AI model',
            'Utilize version control (git, github) for professional software development'
        ],
        array[
            'OpenCV',
            'YOLO',
            'Python',
            'Computer Vision',
            'Machine Learning',
            'Git'
        ],
        array[
            'Developed computer vision solutions for real-world problems',
            'Contributed to AI model development and deployment',
            'Improved code quality through version control practices'
        ],
        1
    ),
    (
        'research-assistant',
        'Undergraduate Research Assistant',
        'CGV & VM Lab',
        null,
        'Oct 2024 - Present',
        'Work under 2 projects for professor Hung Kuo Chu and professor Shih Hsuan Hung',
        array[
            'Dataset Visualization for Structure from motion Camera Input',
            'Improving Physical based realistic material generation Pipeline'
        ],
        array[
            'Computer Vision',
            '3D Graphics',
            'Python',
            'Research Methods',
            'Data Visualization'
        ],
        array[
            'Contributed to cutting-edge computer vision research',
            'Improved material generation algorithms',
            'Enhanced dataset visualization techniques'
        ],
        2
    ),
    (
        'teaching-assistant',
        'Teaching Assistant',
        'NTHU IBP Summer camp',
        null,
        'June 2024 - July 2024',
        'Summer camp teaching assistant',
        array[
            'Create curriculum, prepare material and final project for Summer camp',
            'Teach basic C and arduino programming'
        ],
        array[
            'C Programming',
            'Arduino',
            'Teaching',
            'Curriculum Development'
        ],
        array[
            'Mentored international students in programming fundamentals',
            'Developed comprehensive curriculum materials',
            'Enhanced teaching and communication skills'
        ],
        3
    );

insert into
    skills (
        category,
        skills,
        proficiency,
        sort_order
    )
values (
        'Programming Languages',
        array[
            'C++',
            'Python',
            'JavaScript',
            'TypeScript',
            'C',
            'Dart'
        ],
        'Advanced',
        1
    ),
    (
        'Web Development',
        array[
            'React',
            'Next.js',
            'HTML5',
            'CSS3',
            'Tailwind CSS',
            'Node.js'
        ],
        'Advanced',
        2
    ),
    (
        'Mobile Development',
        array[
            'Flutter',
            'React Native',
            'Mobile UI/UX'
        ],
        'Intermediate',
        3
    ),
    (
        'Machine Learning',
        array[
            'TensorFlow',
            'PyTorch',
            'OpenCV',
            'YOLO',
            'Reinforcement Learning',
            'ML-Agents'
        ],
        'Intermediate',
        4
    ),
    (
        'Tools & Technologies',
        array[
            'Git',
            'GitHub',
            'Unity',
            'Arduino',
            'Docker',
            'Linux'
        ],
        'Intermediate',
        5
    );

insert into
    organizations (
        slug,
        name,
        role,
        period,
        responsibilities,
        impact,
        sort_order
    )
values (
        'eecs-gsa',
        'EECS-GSA',
        'Member of Academic affair',
        'Mar 2024 - Present',
        array[
            'Organizing 2 networking events for EECS international students in NTHU',
            'Active Support NTHU EECS international student community',
            'Providing guidance on academic pathways and career prospects',
            'Organizing events and workshops aimed at enhancing student knowledge'
        ],
        array[
            'Enhanced international student community engagement',
            'Improved academic support systems',
            'Facilitated networking opportunities'
        ],
        1
    ),
    (
        'ppi-hsinchu',
        'Indonesian Student Association in Hsinchu (PPI Hsinchu)',
        'Member of Academic and career affair',
        'Aug 2024 - Present',
        array[
            'Organizing event and supporting Indonesian community in Hsinchu city',
            'Head of Division and Event for several events',
            'Member of Academic and Career division for Indonesian Student Association in H.H.H',
            'Academic Events for Indonesian students in Hsinchu City'
        ],
        array[
            'Strengthened Indonesian student community',
            'Organized successful academic and career events',
            'Provided support for Indonesian students abroad'
        ],
        2
    ),
    (
        'nthu-ibp',
        'NTHU IBP Summer camp',
        'Teaching assistant Division',
        'June 2024 - July 2024',
        array[
            'Create curriculum, prepare material and final project for Summer camp',
            'Teach basic C and arduino programming',
            'Assisted in teaching and mentoring international students in foundational C Programming',
            'Collaborated with a diverse team to design and conduct interactive workshops'
        ],
        array[
            'Successfully mentored international students',
            'Developed comprehensive programming curriculum',
            'Enhanced teaching and leadership skills'
        ],
        3
    );

insert into
    languages (
        name,
        level,
        percentage,
        certification,
        sort_order
    )
values (
        'English',
        'IELTS - 6.5 (CEFR B2)',
        85,
        'IELTS',
        1
    ),
    (
        'Chinese',
        'TOCFL - B1',
        70,
        'TOCFL',
        2
    ),
    (
        'Indonesian',
        'Native',
        100,
        null,
        3
    );