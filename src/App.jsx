import React, { useEffect, useRef, useState } from "react";

const PALETTE = {
  navy: "#0D1B2A",
  navyMid: "#1B2A3B",
  navyLight: "#253347",
  teal: "#00C9B1",
  purple: "#7B5EA7",
  gold: "#F5A623",
  white: "#FFFFFF",
  muted: "#8A9BB0",
  red: "#E05C5C",
  blue: "#45A3FF",
};

const studentData = {
  name: "Rohan Sharma",
  class: "Class 11 — CBSE",
  school: "West Bengal",
  mastery: 67,
  streak: 12,
  learningStyle: "Visual Learner",
  subjects: {
    "C Programming": [
      { topic: "Variables & Data Types", mastery: 92, status: "mastered" },
      { topic: "Arrays", mastery: 88, status: "mastered" },
      { topic: "Pointers", mastery: 45, status: "at-risk" },
      { topic: "Recursion", mastery: 31, status: "danger" },
      { topic: "Sorting Algorithms", mastery: 0, status: "locked" },
    ],
    Mathematics: [
      { topic: "Algebra", mastery: 78, status: "progress" },
      { topic: "Trigonometry", mastery: 65, status: "progress" },
      { topic: "Calculus", mastery: 40, status: "at-risk" },
      { topic: "Probability", mastery: 85, status: "mastered" },
    ],
    Physics: [
      { topic: "Mechanics", mastery: 72, status: "progress" },
      { topic: "Thermodynamics", mastery: 55, status: "progress" },
      { topic: "Optics", mastery: 20, status: "danger" },
      { topic: "Electromagnetism", mastery: 0, status: "locked" },
    ],
  },
};

const classData = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  name:
    ["Rohan", "Priya", "Amit", "Sneha", "Rahul", "Ananya", "Vikram", "Pooja", "Arjun", "Kavya"][
      i % 10
    ] +
    " " +
    ["S", "K", "M", "R", "P", "D", "B", "C", "G", "N"][Math.floor(i / 10)],
  mastery: Math.floor(Math.random() * 60) + 30,
  cohort: i < 12 ? "A" : i < 21 ? "B" : i < 28 ? "C" : "D",
}));

const tutorSystemPrompt = `You are EduTwin's AI Tutor — a friendly, patient, and encouraging educational assistant for Indian high school and college students.

Your personality:
- Warm, supportive, never condescending
- Use simple language, relatable Indian examples (cricket, Bollywood, street food, local context) when explaining concepts
- Never just give the answer — use the Socratic method: ask guiding questions first, then explain step by step
- Keep responses concise (max 4-5 lines per message)
- Add a small encouragement at the end of each explanation
- If the student seems stuck, offer 3 multiple choice hints

Student context:
- Name: Rohan Sharma, Class 11, West Bengal
- Current weak topic: Recursion in C Programming
- Learning style: Visual learner
- Mastery level: Intermediate

When explaining recursion or C programming concepts, use visual analogies (like Russian dolls, mirrors facing each other, or Matryoshka dolls). For other topics, find the most relatable everyday Indian analogy you can.

Always end responses with one of these emojis: 💡🚀⭐🎯✨`;

const portals = {
  student: {
    label: "Student Portal",
    helper: "Rohan Sharma",
    tabs: ["My Twin", "Career Readiness", "AI Tutor"],
  },
  teacher: {
    label: "Teacher Portal",
    helper: "Class 11 Faculty",
    tabs: ["Class Dashboard", "Interventions", "Student Explorer"],
  },
};

function App() {
  const [activePortal, setActivePortal] = useState("student");
  const [activeTab, setActiveTab] = useState(portals.student.tabs[0]);

  function switchPortal(portal) {
    setActivePortal(portal);
    setActiveTab(portals[portal].tabs[0]);
  }

  return (
    <div className="min-h-screen bg-[#0D1B2A] text-white selection:bg-[#00C9B1] selection:text-[#0D1B2A]">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-80 w-80 rounded-full bg-[#00C9B1]/10 blur-3xl" />
        <div className="absolute bottom-[-8%] right-[-8%] h-96 w-96 rounded-full bg-[#7B5EA7]/20 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-72 w-72 rounded-full bg-[#F5A623]/5 blur-3xl" />
      </div>

      <Navbar
        activePortal={activePortal}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        switchPortal={switchPortal}
      />

      <main className="relative mx-auto max-w-7xl px-4 pb-10 pt-40 sm:px-6 lg:px-8 lg:pt-32">
        <section key={`${activePortal}-${activeTab}`} className="animate-[fadeSlide_.35s_ease-out]">
          <PortalHeader activePortal={activePortal} activeTab={activeTab} />
          {activePortal === "student" && activeTab === "My Twin" && <StudentTwinView />}
          {activePortal === "student" && activeTab === "Career Readiness" && <CareerReadiness />}
          {activePortal === "student" && activeTab === "AI Tutor" && <AITutor />}
          {activePortal === "teacher" && activeTab === "Class Dashboard" && <TeacherDashboard />}
          {activePortal === "teacher" && activeTab === "Interventions" && <TeacherInterventions />}
          {activePortal === "teacher" && activeTab === "Student Explorer" && <StudentExplorer />}
        </section>
      </main>

      <footer className="relative border-t border-white/10 px-4 py-5 text-center text-sm text-[#8A9BB0]">
        Powered by Bayesian Knowledge Tracing · Bhashini API · EduTwin AI Engine
      </footer>

      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseRing {
          0%, 100% { transform: scale(1); opacity: .55; }
          50% { transform: scale(1.08); opacity: 1; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(180%); }
        }
        @keyframes blink {
          0%, 80%, 100% { opacity: .25; transform: translateY(0); }
          40% { opacity: 1; transform: translateY(-3px); }
        }
      `}</style>
    </div>
  );
}

function Navbar({ activePortal, activeTab, setActiveTab, switchPortal }) {
  const currentTabs = portals[activePortal].tabs;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0D1B2A]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <button
          onClick={() => switchPortal("student")}
          className="flex items-center gap-3 text-left text-xl font-black tracking-wide text-white"
          aria-label="Go to Student Portal"
        >
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#00C9B1]/20 text-2xl ring-1 ring-[#00C9B1]/40">
            🧬
          </span>
          EduTwin
        </button>

          <div className="grid grid-cols-2 gap-2 rounded-2xl bg-[#1B2A3B]/80 p-1 ring-1 ring-white/10 sm:w-[430px]">
            {Object.entries(portals).map(([key, portal]) => (
              <button
                key={key}
                onClick={() => switchPortal(key)}
                className={`rounded-xl px-4 py-2.5 text-left transition ${
                  activePortal === key
                    ? "bg-[#00C9B1] text-[#0D1B2A] shadow-lg shadow-[#00C9B1]/20"
                    : "text-[#8A9BB0] hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="block text-sm font-black">{portal.label}</span>
                <span className="block text-xs font-semibold opacity-80">{portal.helper}</span>
              </button>
            ))}
          </div>

          <div className="hidden items-center gap-2 rounded-full bg-[#253347] px-3 py-2 text-xs font-semibold text-[#8A9BB0] ring-1 ring-white/10 xl:flex">
            <span className="h-2 w-2 rounded-full bg-[#00C9B1] shadow-[0_0_14px_#00C9B1]" />
            {activePortal === "student" ? "Student twin live" : "Classroom AI live"}
          </div>
        </div>

        <nav className="flex max-w-full gap-2 overflow-x-auto rounded-2xl bg-[#0D1B2A]/60 p-1 ring-1 ring-white/10">
          {currentTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold transition ${
                activeTab === tab
                  ? "bg-[#00C9B1] text-[#0D1B2A] shadow-lg shadow-[#00C9B1]/20"
                  : "text-[#8A9BB0] hover:bg-white/5 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

function PortalHeader({ activePortal, activeTab }) {
  const copy = {
    student: {
      eyebrow: "Student experience",
      title: activeTab === "My Twin" ? "Rohan's Learning Twin" : activeTab,
      text: "Personal progress, career readiness, and AI tutoring stay together in the student portal.",
    },
    teacher: {
      eyebrow: "Teacher command center",
      title: activeTab,
      text: "Classroom cohorts, intervention workflows, and student-level twin signals live in the teacher portal.",
    },
  };
  const item = copy[activePortal];

  return (
    <div className="mb-5 flex flex-col gap-3 rounded-[2rem] border border-white/10 bg-[#1B2A3B]/70 p-5 shadow-2xl shadow-black/10 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#00C9B1]">{item.eyebrow}</p>
        <h1 className="mt-1 text-3xl font-black text-white sm:text-4xl">{item.title}</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-[#8A9BB0]">{item.text}</p>
      </div>
      <div className="w-fit rounded-2xl bg-[#0D1B2A]/60 px-4 py-3 text-sm font-black text-[#F5A623] ring-1 ring-white/10">
        {activePortal === "student" ? "Learner view" : "Educator view"}
      </div>
    </div>
  );
}

function StudentTwinView() {
  return (
    <div className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)_310px]">
      <StudentProfileCard />
      <SkillTree />
      <TwinAlerts />
    </div>
  );
}

function StudentProfileCard() {
  return (
    <Panel className="overflow-hidden">
      <div className="relative">
        <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-[#7B5EA7]/20 blur-2xl" />
        <div className="mb-5 flex items-center gap-4">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[#00C9B1] to-[#7B5EA7] text-xl font-black text-white shadow-lg shadow-[#00C9B1]/20">
            RS
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">{studentData.name}</h1>
            <p className="text-sm text-[#8A9BB0]">
              {studentData.class} · {studentData.school}
            </p>
          </div>
        </div>

        <CircularProgress value={studentData.mastery} />

        <div className="mt-6 grid gap-3">
          <InfoPill label="Learning style" value={studentData.learningStyle} accent="teal" />
          <InfoPill label="Current streak" value={`${studentData.streak} days 🔥`} accent="gold" />
          <InfoPill label="Active since" value="Jan 2025" accent="purple" />
        </div>
      </div>
    </Panel>
  );
}

function CircularProgress({ value }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center rounded-3xl bg-[#0D1B2A]/50 p-5 ring-1 ring-white/10">
      <div className="relative h-36 w-36">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 140 140">
          <circle cx="70" cy="70" r={radius} fill="none" stroke="#253347" strokeWidth="13" />
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="#00C9B1"
            strokeLinecap="round"
            strokeWidth="13"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-700"
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center">
            <div className="text-4xl font-black text-white">{value}%</div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8A9BB0]">Mastery</div>
          </div>
        </div>
      </div>
      <p className="mt-2 text-center text-sm text-[#8A9BB0]">Overall digital twin confidence</p>
    </div>
  );
}

function InfoPill({ label, value, accent }) {
  const accents = {
    teal: "border-[#00C9B1]/40 bg-[#00C9B1]/10 text-[#00C9B1]",
    gold: "border-[#F5A623]/40 bg-[#F5A623]/10 text-[#F5A623]",
    purple: "border-[#7B5EA7]/50 bg-[#7B5EA7]/20 text-[#C5B7E7]",
  };

  return (
    <div className={`rounded-2xl border px-4 py-3 ${accents[accent]}`}>
      <p className="text-xs uppercase tracking-[0.16em] opacity-80">{label}</p>
      <p className="mt-1 text-base font-bold">{value}</p>
    </div>
  );
}

function SkillTree() {
  const [selectedNode, setSelectedNode] = useState(null);

  return (
    <Panel className="relative min-h-[660px] overflow-hidden">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#00C9B1]">Bayesian Skill Map</p>
          <h2 className="text-2xl font-black text-white">Rohan's Knowledge Graph</h2>
        </div>
        <Legend />
      </div>

      <div className="relative grid gap-5">
        {Object.entries(studentData.subjects).map(([subject, nodes], subjectIndex) => (
          <SubjectBranch
            key={subject}
            subject={subject}
            nodes={nodes}
            subjectIndex={subjectIndex}
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
          />
        ))}
      </div>
    </Panel>
  );
}

function SubjectBranch({ subject, nodes, subjectIndex, selectedNode, setSelectedNode }) {
  return (
    <div className="relative rounded-3xl bg-[#0D1B2A]/40 p-4 ring-1 ring-white/10">
      <div className="mb-4 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#253347] text-lg ring-1 ring-white/10">
          {subject === "C Programming" ? "C" : subject === "Mathematics" ? "∑" : "Φ"}
        </div>
        <div>
          <h3 className="font-black text-white">{subject}</h3>
          <p className="text-xs text-[#8A9BB0]">{nodes.length} concept nodes · live BKT estimates</p>
        </div>
      </div>

      <div className="relative flex flex-wrap items-center gap-3">
        <div className="absolute left-8 right-8 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-[#253347] via-[#00C9B1]/40 to-[#253347]" />
        {nodes.map((node, nodeIndex) => {
          const key = `${subject}-${node.topic}`;
          return (
            <div key={node.topic} className="relative">
              <button
                onClick={() =>
                  setSelectedNode(selectedNode?.key === key ? null : { ...node, subject, key, subjectIndex, nodeIndex })
                }
                className={`group relative z-10 min-h-[98px] w-[132px] rounded-2xl border px-3 py-3 text-left transition hover:-translate-y-1 hover:shadow-xl ${nodeStyles(
                  node.status,
                )}`}
              >
                <span className="mb-2 flex items-center justify-between">
                  <span className="h-2.5 w-2.5 rounded-full bg-current shadow-[0_0_16px_currentColor]" />
                  <span className="text-xs font-black">{node.mastery}%</span>
                </span>
                <span className="block text-sm font-bold leading-tight text-white">{node.topic}</span>
                <span className="mt-2 block text-[11px] uppercase tracking-[0.14em] opacity-75">{node.status}</span>
              </button>

              {selectedNode?.key === key && (
                <NodePopup node={node} onClose={() => setSelectedNode(null)} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function NodePopup({ node, onClose }) {
  return (
    <div className="absolute left-0 top-[108px] z-30 w-64 rounded-2xl border border-[#00C9B1]/40 bg-[#101f31] p-4 shadow-2xl shadow-black/40">
      <button
        onClick={onClose}
        className="absolute right-3 top-2 text-lg leading-none text-[#8A9BB0] hover:text-white"
        aria-label="Close node details"
      >
        ×
      </button>
      <p className="pr-5 text-sm font-black text-white">{node.topic}</p>
      <div className="mt-3 space-y-2 text-sm text-[#8A9BB0]">
        <p>
          Mastery probability: <span className="font-bold text-white">{node.mastery}%</span>
        </p>
        <p>Last attempted: 2 days ago</p>
        <p>
          Recommended action:{" "}
          <span className="font-semibold text-[#00C9B1]">{recommendationFor(node)}</span>
        </p>
      </div>
    </div>
  );
}

function Legend() {
  const items = [
    ["Mastered", PALETTE.teal],
    ["In Progress", PALETTE.gold],
    ["At Risk", PALETTE.red],
    ["Not Started", PALETTE.navyLight],
  ];

  return (
    <div className="flex flex-wrap gap-2 text-xs text-[#8A9BB0]">
      {items.map(([label, color]) => (
        <span key={label} className="flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 ring-1 ring-white/10">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
          {label}
        </span>
      ))}
    </div>
  );
}

function TwinAlerts() {
  const alerts = [
    {
      tone: "red",
      icon: "🔴",
      title: "Recursion risk detected",
      text: "Rohan is likely to struggle with Recursion in the next 2 lessons. Recommend: 15-min micro-lesson now.",
    },
    {
      tone: "gold",
      icon: "🟡",
      title: "Pointers below threshold",
      text: "Pointer concepts showing 45% mastery — below threshold. Schedule review before next assessment.",
    },
    {
      tone: "teal",
      icon: "🟢",
      title: "Arrays ready to advance",
      text: "Arrays mastered at 88%. Ready to advance to Sorting algorithms.",
    },
  ];

  return (
    <Panel>
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F5A623]">AI Twin Alerts</p>
        <h2 className="text-2xl font-black text-white">Next Best Actions</h2>
      </div>
      <div className="space-y-4">
        {alerts.map((alert) => (
          <AlertCard key={alert.title} alert={alert} />
        ))}
      </div>
    </Panel>
  );
}

function AlertCard({ alert }) {
  const [assigned, setAssigned] = useState(false);
  const toneClasses = {
    red: "border-[#E05C5C]/40 bg-[#E05C5C]/10",
    gold: "border-[#F5A623]/40 bg-[#F5A623]/10",
    teal: "border-[#00C9B1]/40 bg-[#00C9B1]/10",
  };

  return (
    <article className={`rounded-3xl border p-4 ${toneClasses[alert.tone]}`}>
      <div className="mb-3 flex items-start gap-3">
        <span className="text-xl">{alert.icon}</span>
        <div>
          <h3 className="font-black text-white">{alert.title}</h3>
          <p className="mt-1 text-sm leading-6 text-[#C9D4E2]">{alert.text}</p>
        </div>
      </div>
      <button
        onClick={() => setAssigned(true)}
        className={`w-full rounded-2xl px-4 py-2.5 text-sm font-black transition ${
          assigned
            ? "bg-[#00C9B1] text-[#0D1B2A]"
            : "bg-white/10 text-white ring-1 ring-white/10 hover:bg-white/20"
        }`}
      >
        {assigned ? "Assigned ✓" : "Assign"}
      </button>
    </article>
  );
}

function TeacherDashboard() {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(timeout);
  }, [toast]);

  return (
    <div className="space-y-5">
      <StatsBar />
      <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <CohortCards setToast={setToast} />
        <StudentGrid />
      </div>
      {toast && <Toast message={toast} />}
    </div>
  );
}

function TeacherInterventions() {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(timeout);
  }, [toast]);

  return (
    <div className="space-y-5">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
        <CohortCards setToast={setToast} />
        <div className="space-y-5">
          <Panel>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F5A623]">Priority Queue</p>
            <h2 className="mt-1 text-2xl font-black text-white">Today's Teacher Actions</h2>
            <div className="mt-5 space-y-3">
              {[
                ["1", "Launch recursion micro-lesson", "Cohort A · 12 students"],
                ["2", "Send pointer visual guide", "Cohort C · 7 students"],
                ["3", "Unlock array challenge", "Cohort B · 9 students"],
              ].map(([rank, title, meta]) => (
                <div key={title} className="flex gap-3 rounded-2xl bg-[#0D1B2A]/50 p-3 ring-1 ring-white/10">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#00C9B1] text-sm font-black text-[#0D1B2A]">
                    {rank}
                  </span>
                  <div>
                    <p className="font-black text-white">{title}</p>
                    <p className="mt-1 text-sm text-[#8A9BB0]">{meta}</p>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7B5EA7]">Automation</p>
            <h2 className="mt-1 text-2xl font-black text-white">AI Drafted Plan</h2>
            <p className="mt-3 text-sm leading-6 text-[#C9D4E2]">
              28-minute remediation block: 8 min visual recap, 12 min guided practice, 8 min exit ticket.
            </p>
            <button
              onClick={() => setToast("✓ Intervention plan scheduled — Class 11 notified")}
              className="mt-5 w-full rounded-2xl bg-[#F5A623] px-4 py-3 text-sm font-black text-[#0D1B2A] transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#F5A623]/20"
            >
              Schedule Plan
            </button>
          </Panel>
        </div>
      </div>
      {toast && <Toast message={toast} />}
    </div>
  );
}

function StudentExplorer() {
  const [selectedId, setSelectedId] = useState(1);
  const selected = classData.find((student) => student.id === selectedId) || classData[0];
  const level = selected.mastery >= 80 ? "Ready to advance" : selected.mastery >= 50 ? "On track" : "Needs support";
  const levelColor = selected.mastery >= 80 ? PALETTE.teal : selected.mastery >= 50 ? PALETTE.gold : PALETTE.red;

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
      <Panel>
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#00C9B1]">Student Explorer</p>
            <h2 className="text-2xl font-black text-white">Open Any Student Twin</h2>
          </div>
          <span className="w-fit rounded-full bg-[#253347] px-3 py-2 text-xs font-black text-[#8A9BB0] ring-1 ring-white/10">
            40 simulated learners
          </span>
        </div>

        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {classData.map((student) => (
            <button
              key={student.id}
              onClick={() => setSelectedId(student.id)}
              className={`rounded-2xl border p-3 text-left transition hover:-translate-y-0.5 ${
                selectedId === student.id
                  ? "border-[#00C9B1] bg-[#00C9B1]/10"
                  : "border-white/10 bg-[#0D1B2A]/40 hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`grid h-10 w-10 place-items-center rounded-full text-xs font-black text-[#0D1B2A] ${avatarColor(
                    student.mastery,
                  )}`}
                >
                  {student.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>
                <div>
                  <p className="font-black text-white">{student.name}</p>
                  <p className="text-xs text-[#8A9BB0]">Cohort {student.cohort} · {student.mastery}%</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </Panel>

      <Panel>
        <div className="flex items-center gap-4">
          <div className={`grid h-16 w-16 place-items-center rounded-2xl text-lg font-black text-[#0D1B2A] ${avatarColor(selected.mastery)}`}>
            {selected.name
              .split(" ")
              .map((part) => part[0])
              .join("")}
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">{selected.name}</h2>
            <p className="text-sm text-[#8A9BB0]">Cohort {selected.cohort} · Class 11</p>
          </div>
        </div>

        <div className="mt-6 rounded-3xl bg-[#0D1B2A]/50 p-5 ring-1 ring-white/10">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-[#8A9BB0]">Mastery confidence</span>
            <span className="text-lg font-black" style={{ color: levelColor }}>
              {selected.mastery}%
            </span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-[#253347]">
            <div className="h-full rounded-full" style={{ width: `${selected.mastery}%`, backgroundColor: levelColor }} />
          </div>
          <p className="mt-3 text-sm font-black" style={{ color: levelColor }}>
            {level}
          </p>
        </div>

        <div className="mt-5 space-y-3">
          {[
            ["Weakest concept", selected.cohort === "A" ? "Recursion" : selected.cohort === "C" ? "Pointers" : "Calculus"],
            ["Recommended action", selected.mastery < 50 ? "Micro-lesson today" : "Adaptive practice set"],
            ["Parent update", selected.mastery < 50 ? "Send support note" : "No urgent update"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-[#0D1B2A]/40 px-4 py-3 ring-1 ring-white/10">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8A9BB0]">{label}</p>
              <p className="mt-1 font-black text-white">{value}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function StatsBar() {
  const stats = [
    ["Total Students", "40", "Class 11 cohort", PALETTE.teal],
    ["Average Mastery", "63%", "Across core concepts", PALETTE.purple],
    ["At Risk", "8", "Need teacher attention", PALETTE.red],
    ["Ready to Advance", "12", "Unlock challenge path", PALETTE.gold],
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map(([label, value, helper, color]) => (
        <Panel key={label} className="relative overflow-hidden">
          <div className="absolute right-4 top-4 h-12 w-12 rounded-full opacity-20 blur-xl" style={{ backgroundColor: color }} />
          <p className="text-sm font-semibold text-[#8A9BB0]">{label}</p>
          <div className="mt-3 flex items-end justify-between">
            <p className="text-4xl font-black text-white">{value}</p>
            <span className="h-3 w-3 rounded-full shadow-[0_0_18px_currentColor]" style={{ color, backgroundColor: color }} />
          </div>
          <p className="mt-2 text-sm text-[#8A9BB0]">{helper}</p>
        </Panel>
      ))}
    </div>
  );
}

function CohortCards({ setToast }) {
  const cohorts = [
    {
      id: "A",
      count: 12,
      color: PALETTE.red,
      issue: "Need recursion review — mastery below 40%",
      action: "Launch Micro-Lesson",
    },
    {
      id: "B",
      count: 9,
      color: PALETTE.teal,
      issue: "Ready for advanced arrays — mastery above 85%",
      action: "Assign Challenge",
    },
    {
      id: "C",
      count: 7,
      color: PALETTE.gold,
      issue: "Struggling with pointers — need visual explanation",
      action: "Send Visual Guide",
    },
    {
      id: "D",
      count: 12,
      color: PALETTE.blue,
      issue: "On track — no action needed",
      action: "View Progress",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {cohorts.map((cohort) => (
        <Panel key={cohort.id} className="group overflow-hidden">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span
                  className="h-3 w-3 rounded-full shadow-[0_0_18px_currentColor]"
                  style={{ color: cohort.color, backgroundColor: cohort.color }}
                />
                <h3 className="text-2xl font-black text-white">Cohort {cohort.id}</h3>
              </div>
              <p className="mt-1 text-sm text-[#8A9BB0]">{cohort.count} students · AI clustered</p>
            </div>
            <div className="rounded-2xl bg-[#0D1B2A]/60 px-3 py-2 text-sm font-black text-white ring-1 ring-white/10">
              {Math.round((cohort.count / 40) * 100)}%
            </div>
          </div>
          <div className="rounded-2xl bg-[#0D1B2A]/40 p-4 ring-1 ring-white/10">
            <p className="min-h-[48px] text-base font-semibold leading-6 text-[#C9D4E2]">{cohort.issue}</p>
          </div>
          <button
            onClick={() => setToast(`✓ Action sent to Cohort ${cohort.id} — ${cohort.count} students notified`)}
            className="mt-5 w-full rounded-2xl bg-[#00C9B1] px-4 py-3 text-sm font-black text-[#0D1B2A] transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#00C9B1]/20"
          >
            {cohort.action}
          </button>
        </Panel>
      ))}
    </div>
  );
}

function StudentGrid() {
  return (
    <Panel>
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7B5EA7]">Class Pulse</p>
        <h2 className="text-2xl font-black text-white">40 Student Twins</h2>
      </div>
      <div className="grid grid-cols-8 gap-2 sm:grid-cols-10 xl:grid-cols-8">
        {classData.map((student) => (
          <div key={student.id} className="group relative">
            <div
              className={`grid h-10 w-10 place-items-center rounded-full text-xs font-black text-[#0D1B2A] ring-2 ring-white/10 transition group-hover:scale-110 ${avatarColor(
                student.mastery,
              )}`}
            >
              {student.name
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </div>
            <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 hidden w-44 -translate-x-1/2 rounded-xl bg-[#101f31] p-3 text-center text-xs shadow-xl ring-1 ring-white/10 group-hover:block">
              <p className="font-black text-white">{student.name}</p>
              <p className="mt-1 text-[#8A9BB0]">Mastery {student.mastery}% · Cohort {student.cohort}</p>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function CareerReadiness() {
  return (
    <div className="space-y-5">
      <RRIHeroCard />
      <SkillColumns />
      <MarketSyncBanner />
    </div>
  );
}

function RRIHeroCard() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setValue(68), 160);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Panel className="overflow-hidden">
      <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#00C9B1]">Role Readiness Index</p>
          <h1 className="mt-2 text-3xl font-black text-white sm:text-5xl">Junior Web Developer — Kolkata</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[#C9D4E2]">
            You are 68% ready. Master 2 more skills to cross the interview threshold (75%).
          </p>
          <div className="mt-8 overflow-hidden rounded-full bg-[#0D1B2A] ring-1 ring-white/10">
            <div
              className="relative h-6 rounded-full bg-[#00C9B1] transition-all duration-1000 ease-out"
              style={{ width: `${value}%` }}
            >
              <div className="absolute inset-y-0 w-20 bg-white/25 blur-md [animation:shimmer_1.8s_linear_infinite]" />
            </div>
          </div>
          <div className="mt-3 flex justify-between text-sm font-semibold text-[#8A9BB0]">
            <span>Current readiness</span>
            <span>Interview threshold 75%</span>
          </div>
        </div>
        <div className="rounded-[2rem] bg-[#0D1B2A]/50 p-6 text-center ring-1 ring-white/10">
          <div className="mx-auto grid h-44 w-44 place-items-center rounded-full bg-[#00C9B1]/10 ring-1 ring-[#00C9B1]/30">
            <div>
              <p className="text-6xl font-black text-[#00C9B1]">68%</p>
              <p className="mt-1 text-sm font-bold uppercase tracking-[0.16em] text-[#8A9BB0]">RRI</p>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}

function SkillColumns() {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      <Panel>
        <h2 className="mb-5 text-2xl font-black text-white">Current Skills</h2>
        <div className="flex flex-wrap gap-3">
          {["HTML/CSS ✓", "JavaScript Basics ✓", "C Programming ✓", "Problem Solving ✓"].map((skill) => (
            <span key={skill} className="rounded-full bg-[#00C9B1]/20 px-4 py-2 text-sm font-black text-[#00C9B1] ring-1 ring-[#00C9B1]/30">
              {skill}
            </span>
          ))}
        </div>
      </Panel>

      <Panel>
        <h2 className="mb-5 text-2xl font-black text-white">Gap Skills</h2>
        <div className="space-y-3">
          {[
            ["CSS Flexbox", "3 lessons away"],
            ["React Basics", "12 lessons away"],
            ["Git & GitHub", "5 lessons away"],
          ].map(([skill, distance]) => (
            <div key={skill} className="flex items-center justify-between gap-3 rounded-2xl border border-[#F5A623]/40 bg-[#F5A623]/10 px-4 py-3">
              <span className="font-black text-white">{skill}</span>
              <span className="text-sm font-bold text-[#F5A623]">{distance}</span>
            </div>
          ))}
        </div>
      </Panel>

      <Panel>
        <h2 className="mb-5 text-2xl font-black text-white">Other Role Matches</h2>
        <div className="space-y-4">
          {[
            ["Junior Python Developer", 71],
            ["Data Analyst Trainee", 58],
            ["QA Engineer", 62],
          ].map(([role, match]) => (
            <RoleMatch key={role} role={role} match={match} />
          ))}
        </div>
      </Panel>
    </div>
  );
}

function RoleMatch({ role, match }) {
  return (
    <div className="rounded-2xl bg-[#0D1B2A]/40 p-4 ring-1 ring-white/10">
      <div className="mb-2 flex items-center justify-between gap-3">
        <h3 className="font-black text-white">{role}</h3>
        <span className="text-sm font-black text-[#00C9B1]">{match}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[#253347]">
        <div className="h-full rounded-full bg-gradient-to-r from-[#7B5EA7] to-[#00C9B1]" style={{ width: `${match}%` }} />
      </div>
      <button className="mt-3 rounded-xl bg-white/10 px-3 py-2 text-xs font-black text-white ring-1 ring-white/10 transition hover:bg-white/20">
        Explore Path
      </button>
    </div>
  );
}

function MarketSyncBanner() {
  return (
    <div className="overflow-hidden rounded-3xl border border-[#00C9B1]/30 bg-[#00C9B1]/10 px-5 py-4 text-center font-semibold text-[#DFFCF8] shadow-lg shadow-[#00C9B1]/5">
      📡 Synced with 2,847 job postings on LinkedIn · Naukri · Internshala — Last updated: 2 hours ago
    </div>
  );
}

function AITutor() {
  return (
    <div className="mx-auto max-w-4xl">
      <ChatInterface />
    </div>
  );
}

function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hey Rohan! 👋 Ready to crack recursion today? Let's start simple — what do you think happens when a function calls itself? 🤔",
    },
    { role: "user", text: "I don't really get it... it just loops forever?" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("edutwin_anthropic_key") || "");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  function saveApiKey(value) {
    setApiKey(value);
    if (value.trim()) {
      localStorage.setItem("edutwin_anthropic_key", value.trim());
    } else {
      localStorage.removeItem("edutwin_anthropic_key");
    }
  }

  async function sendMessage(event) {
    event.preventDefault();
    const text = input.trim();
    if (!text || isTyping) return;

    const nextMessages = [...messages, { role: "user", text }];
    setMessages(nextMessages);
    setInput("");
    setIsTyping(true);

    try {
      const reply = await fetchAnthropicReply(nextMessages, apiKey);
      setMessages((current) => [...current, { role: "assistant", text: reply }]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text:
            "I can't reach the live tutor API from this demo right now. Think of recursion like stacked tiffin boxes: open one, solve it, then return to the previous box. What base case would stop the stacking? 💡",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <Panel className="overflow-hidden p-0">
      <div className="border-b border-white/10 bg-[#1B2A3B] p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#00C9B1]">AI Tutor</p>
            <h1 className="text-3xl font-black text-white">Recursion Coach for Rohan</h1>
          </div>
          <div className="rounded-2xl bg-[#0D1B2A]/60 px-4 py-3 text-sm text-[#8A9BB0] ring-1 ring-white/10">
            Topic focus: <span className="font-black text-[#F5A623]">Recursion in C</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 bg-[#0D1B2A]/30 p-5">
        <label className="block text-sm font-semibold text-[#8A9BB0]">
          Optional Anthropic API key for live responses
          <input
            value={apiKey}
            onChange={(event) => saveApiKey(event.target.value)}
            type="password"
            placeholder="Paste key for live Claude replies, or leave blank for fallback"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-[#253347] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#8A9BB0] focus:border-[#00C9B1]"
          />
        </label>
      </div>

      <div className="max-h-[560px] min-h-[460px] space-y-4 overflow-y-auto p-5">
        {messages.map((message, index) => (
          <MessageBubble key={`${message.role}-${index}`} message={message} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={sendMessage} className="flex gap-3 border-t border-white/10 bg-[#1B2A3B] p-4">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask EduTwin..."
          className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-[#0D1B2A] px-4 py-3 text-white outline-none transition placeholder:text-[#8A9BB0] focus:border-[#00C9B1]"
        />
        <button
          type="submit"
          disabled={isTyping}
          className="rounded-2xl bg-[#00C9B1] px-5 py-3 font-black text-[#0D1B2A] transition hover:shadow-lg hover:shadow-[#00C9B1]/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Send
        </button>
      </form>
    </Panel>
  );
}

function MessageBubble({ message }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[82%] rounded-3xl px-5 py-4 text-sm leading-6 shadow-lg ${
          isUser
            ? "bg-[#253347] text-white"
            : "border-l-4 border-[#00C9B1] bg-[#101f31] text-[#DDE7F2]"
        }`}
      >
        <p className="mb-1 text-xs font-black uppercase tracking-[0.14em] text-[#8A9BB0]">
          {isUser ? "Rohan" : "EduTwin Tutor"}
        </p>
        {message.text}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-2 rounded-3xl border-l-4 border-[#00C9B1] bg-[#101f31] px-5 py-4">
        {[0, 1, 2].map((dot) => (
          <span
            key={dot}
            className="h-2.5 w-2.5 rounded-full bg-[#00C9B1]"
            style={{ animation: `blink 1.1s ${dot * 0.15}s infinite` }}
          />
        ))}
      </div>
    </div>
  );
}

async function fetchAnthropicReply(messages, apiKey) {
  if (!apiKey?.trim()) {
    throw new Error("Missing Anthropic API key");
  }

  const apiMessages = messages
    .filter((message, index) => index > 0 || message.role === "user")
    .map((message) => ({
      role: message.role === "assistant" ? "assistant" : "user",
      content: message.text,
    }));

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey.trim(),
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 220,
      system: tutorSystemPrompt,
      messages: apiMessages,
    }),
  });

  if (!response.ok) {
    throw new Error(`Anthropic request failed: ${response.status}`);
  }

  const data = await response.json();
  return data?.content?.map((block) => block.text).filter(Boolean).join("\n") || "Let's try that another way. What should recursion stop on first? 💡";
}

function Panel({ children, className = "" }) {
  return (
    <div className={`rounded-[2rem] border border-white/10 bg-[#1B2A3B]/90 p-5 shadow-2xl shadow-black/20 backdrop-blur ${className}`}>
      {children}
    </div>
  );
}

function nodeStyles(status) {
  const styles = {
    mastered: "border-[#00C9B1]/40 bg-[#00C9B1]/20 text-[#00C9B1]",
    progress: "border-[#F5A623]/40 bg-[#F5A623]/10 text-[#F5A623]",
    "at-risk": "border-[#F5A623]/40 bg-[#F5A623]/10 text-[#F5A623]",
    danger: "border-[#E05C5C]/40 bg-[#E05C5C]/10 text-[#E05C5C]",
    locked: "border-white/10 bg-[#253347] text-[#8A9BB0]",
  };

  return styles[status] || styles.locked;
}

function recommendationFor(node) {
  if (node.status === "mastered") return "Advance to the next concept";
  if (node.status === "progress") return "Practice 2 adaptive questions";
  if (node.status === "at-risk") return "Watch a visual explainer";
  if (node.status === "danger") return "Start a 15-min micro-lesson";
  return "Unlock after prerequisite mastery";
}

function avatarColor(mastery) {
  if (mastery >= 80) return "bg-[#00C9B1]";
  if (mastery >= 50) return "bg-[#F5A623]";
  return "bg-[#E05C5C]";
}

function Toast({ message }) {
  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-2xl border border-[#00C9B1]/30 bg-[#101f31] px-5 py-3 text-sm font-black text-white shadow-2xl shadow-black/30">
      {message}
    </div>
  );
}

export default App;
