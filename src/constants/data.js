export const COLORS = {
  g900: "#0a1f0a",
  g800: "#1a3a1a",
  g700: "#2d6a35",
  g500: "#4a9a55",
  gold: "#c8a825",
  goldLight: "#fdf6d8",
  bg: "#f0faf2",
  card: "#ffffff",
  cardAlt: "#e8f5e9",
  text: "#0d1f0d",
  muted: "#3a5c3a",
  subtle: "#7aaa80",
  border: "#c8e6c9",
};

export const FONTS = {
  display: "'Syne', sans-serif",
  body: "'Plus Jakarta Sans', sans-serif",
};

export const NAV_ITEMS = [
  {
    section: null,
    items: [{ id: "dashboard", label: "Dashboard", icon: "LayoutDashboard" }],
  },
  {
    section: "Academic",
    items: [
      { id: "schedule", label: "Class Schedule",   icon: "Clock" },
      { id: "grades",   label: "Grades",           icon: "BarChart2" },
      { id: "calendar", label: "Academic Calendar",icon: "CalendarDays" },
    ],
  },
  {
    section: "Documents",
    items: [
      { id: "transcript", label: "Official Transcript", icon: "FileText" },
    ],
  },
  {
    section: "Financial",
    items: [
      { id: "payments", label: "Payment History", icon: "History" },
    ],
  },
  {
    section: "Account",
    items: [
      { id: "profile", label: "Profile & Account", icon: "UserCircle" },
    ],
  },
];

export const SCHOOL_INFO = {
  name:    "Olivarez College Tagaytay",
  address: "Maharlika Highway, Tagaytay City, Cavite, Philippines",
  email:   "info@oct.edu.ph",
  phone:   "(046) 483-0657",
  hours:   "Monday – Saturday, 8:00 AM – 5:00 PM",
  website: "www.oct.edu.ph",
  motto:   "Mind · Body · Soul",
  founded: "2003",
};

export const SCHEDULE = [
  { code: "IT 104",       subject: "Quantitative Method",                                     day: "FRI", time: "1:00–4:00",   room: "COMLAB 2", prof: "De Villa, Karen",             section: "BSIT 212-A", units: 3, color: "#1a3a1a", icon: "Calculator" },
  { code: "GEC 7",        subject: "Science, Technology and Society",                         day: "FRI", time: "4:00–7:00",   room: "NB 2",     prof: "Canuel, Rienel",             section: "BSIT 212-A", units: 3, color: "#2d6a35", icon: "Globe" },
  { code: "Olivarian 104",subject: "Purposeful Communication in Conversation & Collaboration",day: "SAT", time: "1:00–3:00",   room: "107",      prof: "Casalme, Christian Lawrence",section: "BSIT 212-A", units: 2, color: "#4a9a55", icon: "MessageSquare" },
  { code: "IT 205",       subject: "Computer Organization & Assembly Language",               day: "SAT", time: "9:00–12:00",  room: "COMLAB 3", prof: "Olimpiada, Ariel",           section: "BSIT 212-A", units: 3, color: "#1a3a1a", icon: "Cpu" },
  { code: "GEC 4",        subject: "Art Appreciation",                                        day: "THU", time: "1:00–4:00",   room: "NB 3",     prof: "Concepcion, Ruth",           section: "BSIT 212-A", units: 3, color: "#2d6a35", icon: "Palette" },
  { code: "PE 4",         subject: "Wellness and Fitness",                                    day: "THU", time: "10:00–12:00", room: "GYM",      prof: "Malabanan, Maricelle",       section: "BSIT 212-A", units: 2, color: "#4a9a55", icon: "Dumbbell" },
  { code: "IT 210",       subject: "Web Programming",                                         day: "THU", time: "4:00–7:00",   room: "COMLAB 1", prof: "Torres, Jerold",             section: "BSIT 212-A", units: 3, color: "#1a3a1a", icon: "Code" },
  { code: "GEC 8",        subject: "The Contemporary World",                                  day: "TUE", time: "1:00–4:00",   room: "120",      prof: "Caparida, AJ",              section: "BSIT 212-A", units: 3, color: "#2d6a35", icon: "BookOpen" },
  { code: "IT 204",       subject: "System Analysis and Design",                              day: "TUE", time: "4:00–7:00",   room: "COMLAB 1", prof: "Miranda, Aleli",            section: "BSIT 212-A", units: 3, color: "#4a9a55", icon: "GitBranch" },
];

export const GRADES = [
  { subject: "Quantitative Method",                                     code: "IT 104",        units: 3, prelim: 88, midterm: 91 },
  { subject: "Science, Technology and Society",                         code: "GEC 7",         units: 3, prelim: 92, midterm: 89 },
  { subject: "Purposeful Communication in Conversation & Collaboration",code: "Olivarian 104", units: 2, prelim: 85, midterm: 87 },
  { subject: "Computer Organization & Assembly Language",               code: "IT 205",        units: 3, prelim: 95, midterm: 94 },
  { subject: "Art Appreciation",                                        code: "GEC 4",         units: 3, prelim: 90, midterm: 92 },
  { subject: "Wellness and Fitness",                                    code: "PE 4",          units: 2, prelim: 88, midterm: 90 },
  { subject: "Web Programming",                                         code: "IT 210",        units: 3, prelim: 91, midterm: 93 },
  { subject: "The Contemporary World",                                  code: "GEC 8",         units: 3, prelim: 86, midterm: 88 },
  { subject: "System Analysis and Design",                              code: "IT 204",        units: 3, prelim: 89, midterm: 92 },
];

export const ANNOUNCEMENTS = [
  { title: "Enrollment for 2nd Semester Now Open",       date: "Feb 18", tag: "Enrollment" },
  { title: "Foundation Day Celebration – March 7, 2026", date: "Feb 15", tag: "Events" },
  { title: "Library Hours Extended During Finals Week",  date: "Feb 12", tag: "Library" },
];

export const CLASSES = [
  { code: "IT 104",        name: "Quantitative Method",                                     prof: "De Villa, Karen",             units: 3, time: "FRI 1:00–4:00",   room: "COMLAB 2", section: "BSIT 212-A", icon: "Calculator" },
  { code: "GEC 7",         name: "Science, Technology and Society",                         prof: "Canuel, Rienel",              units: 3, time: "FRI 4:00–7:00",   room: "NB 2",     section: "BSIT 212-A", icon: "Globe" },
  { code: "Olivarian 104", name: "Purposeful Communication in Conversation & Collaboration",prof: "Casalme, Christian Lawrence", units: 2, time: "SAT 1:00–3:00",   room: "107",      section: "BSIT 212-A", icon: "MessageSquare" },
  { code: "IT 205",        name: "Computer Organization & Assembly Language",               prof: "Olimpiada, Ariel",            units: 3, time: "SAT 9:00–12:00",  room: "COMLAB 3", section: "BSIT 212-A", icon: "Cpu" },
  { code: "GEC 4",         name: "Art Appreciation",                                        prof: "Concepcion, Ruth",           units: 3, time: "THU 1:00–4:00",   room: "NB 3",     section: "BSIT 212-A", icon: "Palette" },
  { code: "PE 4",          name: "Wellness and Fitness",                                    prof: "Malabanan, Maricelle",       units: 2, time: "THU 10:00–12:00", room: "GYM",      section: "BSIT 212-A", icon: "Dumbbell" },
  { code: "IT 210",        name: "Web Programming",                                         prof: "Torres, Jerold",             units: 3, time: "THU 4:00–7:00",   room: "COMLAB 1", section: "BSIT 212-A", icon: "Code" },
  { code: "GEC 8",         name: "The Contemporary World",                                  prof: "Caparida, AJ",              units: 3, time: "TUE 1:00–4:00",   room: "120",      section: "BSIT 212-A", icon: "BookOpen" },
  { code: "IT 204",        name: "System Analysis and Design",                              prof: "Miranda, Aleli",            units: 3, time: "TUE 4:00–7:00",   room: "COMLAB 1", section: "BSIT 212-A", icon: "GitBranch" },
];

export const PAYMENTS = [
  { date: "Feb 1, 2026",  amount: "₱2,000", desc: "Downpayment",              ref: "REF-2026-001", method: "Cash" },
  { date: "Jan 15, 2026", amount: "₱1,680", desc: "2nd Payment",              ref: "REF-2026-002", method: "GCash" },
  { date: "Dec 5, 2025",  amount: "₱2,200", desc: "1st Semester Downpayment", ref: "REF-2025-089", method: "Cash" },
  { date: "Nov 20, 2025", amount: "₱1,800", desc: "Balance Payment",          ref: "REF-2025-075", method: "Bank Transfer" },
];
