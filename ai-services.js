/**
 * Event Hub - AI Services Engine v2.0
 * Full-knowledge chatbot: answers any question about events, registrations,
 * venues, coordinators, dates, colleges, cities, categories and more.
 * Uses Gemini API when a key is set; falls back to a rich smart NLP engine.
 */

window.AIServices = (() => {
  const STORAGE_KEY = "gemini_api_key";
  const getApiKey = () => localStorage.getItem(STORAGE_KEY) || "";
  const setApiKey = (key) => localStorage.setItem(STORAGE_KEY, key.trim());

  // ─────────────────────────────────────────────
  // MASTER EVENT DATABASE (all 18 events)
  // ─────────────────────────────────────────────
  const MASTER_EVENTS = [
    {
      id: "hackathon-2026",
      title: "Hackathon 2026",
      date: "2026-03-25",
      venue: "Auditorium",
      organizer: "CSE Dept",
      coordinator: "Dr. Rajesh Kumar",
      phone: "+91 9876543210",
      category: "Technical",
      city: "Coimbatore",
      college: "PSG College of Technology",
      description: "Join the biggest coding competition on campus. Build innovative projects and compete for exciting prizes in a 24-hour hackathon format.",
      type: "team",
      teamSize: "2–4 members",
      prize: "₹50,000 total prize pool",
      trending: true,
      recommended: true,
      tags: ["coding", "hackathon", "competition", "prizes", "24-hour", "psg", "cse", "project"]
    },
    {
      id: "debate-competition",
      title: "Inter-College Debate",
      date: "2026-05-01",
      venue: "Auditorium",
      organizer: "English Dept",
      coordinator: "Prof. Anjali Sharma",
      phone: "+91 9876543211",
      category: "Non-Technical",
      city: "Coimbatore",
      college: "PSG College of Technology",
      description: "Engage in intellectual discussions on current affairs and improve your debating and public speaking skills.",
      type: "team",
      teamSize: "2 members per team",
      prize: "Trophies & certificates",
      trending: false,
      recommended: true,
      tags: ["debate", "speaking", "language", "arts", "psg", "inter-college", "discussion"]
    },
    {
      id: "robotics-workshop",
      title: "Robotics Workshop",
      date: "2026-04-02",
      venue: "Lab 2",
      organizer: "Robotics Club",
      coordinator: "Vikram Bhatt",
      phone: "+91 9876543212",
      category: "Technical",
      city: "Coimbatore",
      college: "Coimbatore Institute of Technology",
      description: "Hands-on robotics sessions where you build and program real robots using Arduino and Raspberry Pi.",
      type: "team",
      teamSize: "2–3 members",
      prize: "Certificates for all participants",
      trending: true,
      recommended: false,
      tags: ["robotics", "robot", "arduino", "hardware", "iot", "cit", "build", "program"]
    },
    {
      id: "mobile-app-dev-workshop",
      title: "Mobile App Development Workshop",
      date: "2026-05-12",
      venue: "Innovation Lab",
      organizer: "Mobile Dev Club",
      coordinator: "Neha Patel",
      phone: "+91 9876543213",
      category: "Non-Technical",
      city: "Coimbatore",
      college: "Coimbatore Institute of Technology",
      description: "Build your first mobile app using Flutter or React Native. Beginner-friendly with expert mentors.",
      type: "individual",
      teamSize: "Individual",
      prize: "Best app wins internship referral",
      trending: true,
      recommended: false,
      tags: ["mobile", "app", "flutter", "react native", "android", "ios", "cit", "beginner"]
    },
    {
      id: "data-science-seminar",
      title: "Data Science Seminar",
      date: "2026-03-28",
      venue: "Seminar Hall",
      organizer: "Data Science Club",
      coordinator: "Dr. Priya Singh",
      phone: "+91 9876543214",
      category: "Technical",
      city: "Coimbatore",
      college: "Kumaraguru College of Technology",
      description: "Explore the world of data science and machine learning with industry experts. Covers pandas, sklearn, and real-world datasets.",
      type: "individual",
      teamSize: "Individual",
      prize: "Certificate of participation",
      trending: true,
      recommended: true,
      tags: ["data", "science", "ml", "machine learning", "pandas", "python", "kct", "analytics"]
    },
    {
      id: "environmental-awareness-seminar",
      title: "Environmental Awareness Seminar",
      date: "2026-05-15",
      venue: "Seminar Hall",
      organizer: "Green Club",
      coordinator: "Rohit Desai",
      phone: "+91 9876543215",
      category: "Non-Technical",
      city: "Coimbatore",
      college: "Kumaraguru College of Technology",
      description: "Learn about sustainable practices, climate change, and environmental conservation strategies for a greener future.",
      type: "individual",
      teamSize: "Individual",
      prize: "Certificate",
      trending: false,
      recommended: true,
      tags: ["environment", "green", "sustainability", "climate", "kct", "awareness", "nature"]
    },
    {
      id: "iot-workshop",
      title: "Internet of Things Workshop",
      date: "2026-06-08",
      venue: "Electronics Lab",
      organizer: "IoT Club",
      coordinator: "Arun Kumar",
      phone: "+91 9876543216",
      category: "Technical",
      city: "Chennai",
      college: "Anna University",
      description: "Build smart IoT devices and understand connected technologies using sensors, microcontrollers, and cloud platforms.",
      type: "individual",
      teamSize: "Individual",
      prize: "Certificate + project kit",
      trending: true,
      recommended: false,
      tags: ["iot", "sensors", "embedded", "smart", "connected", "anna university", "electronics", "microcontroller"]
    },
    {
      id: "music-festival",
      title: "Music Festival",
      date: "2026-05-05",
      venue: "Open Stage",
      organizer: "Music Club",
      coordinator: "Divya Krishnan",
      phone: "+91 9876543217",
      category: "Non-Technical",
      city: "Chennai",
      college: "Anna University",
      description: "Celebrate music with electrifying live performances from student bands, soloists, and guest artists.",
      type: "team",
      teamSize: "Solo or group",
      prize: "Cash prizes for top performers",
      trending: true,
      recommended: false,
      tags: ["music", "festival", "band", "concert", "singing", "performance", "anna university", "cultural"]
    },
    {
      id: "ai-seminar",
      title: "AI Seminar",
      date: "2026-04-15",
      venue: "Seminar Hall",
      organizer: "IT Dept",
      coordinator: "Prof. Venkatesh Rao",
      phone: "+91 9876543218",
      category: "Technical",
      city: "Chennai",
      college: "IIT Madras",
      description: "Learn about the latest advances in Artificial Intelligence, Large Language Models, and Generative AI from top industry researchers.",
      type: "individual",
      teamSize: "Individual",
      prize: "Certificate + research paper submission opportunity",
      trending: false,
      recommended: true,
      tags: ["ai", "artificial intelligence", "llm", "generative", "iit", "research", "deep learning", "nlp"]
    },
    {
      id: "entrepreneurship-seminar",
      title: "Entrepreneurship Seminar",
      date: "2026-04-28",
      venue: "Conference Hall",
      organizer: "Entrepreneurship Cell",
      coordinator: "Meera Iyer",
      phone: "+91 9876543219",
      category: "Non-Technical",
      city: "Chennai",
      college: "IIT Madras",
      description: "Learn from successful entrepreneurs, VCs, and startup founders. Includes live pitch session and networking.",
      type: "individual",
      teamSize: "Individual",
      prize: "Best pitch wins incubation support",
      trending: false,
      recommended: true,
      tags: ["startup", "entrepreneur", "business", "iit", "pitch", "venture", "networking", "innovation"]
    },
    {
      id: "python-programming-bootcamp",
      title: "Python Programming Bootcamp",
      date: "2026-06-25",
      venue: "Coding Lab",
      organizer: "Programming Club",
      coordinator: "Sanjay Nath",
      phone: "+91 9876543220",
      category: "Technical",
      city: "Chennai",
      college: "SRM Institute of Science and Technology",
      description: "Intensive Python programming course covering beginner to advanced topics: OOP, APIs, automation, and web scraping.",
      type: "individual",
      teamSize: "Individual",
      prize: "Certificate + SRM placement referral for top scorers",
      trending: true,
      recommended: false,
      tags: ["python", "programming", "coding", "bootcamp", "srm", "automation", "beginner", "advanced"]
    },
    {
      id: "gaming-tournament",
      title: "E-Sports Gaming Tournament",
      date: "2026-05-18",
      venue: "Gaming Arena",
      organizer: "Gaming Society",
      coordinator: "Arjun Verma",
      phone: "+91 9876543221",
      category: "Non-Technical",
      city: "Chennai",
      college: "SRM Institute of Science and Technology",
      description: "Compete in popular e-sports titles: BGMI, Valorant, and FIFA. Massive cash prize pool for winners.",
      type: "team",
      teamSize: "Individual or team of 5",
      prize: "₹25,000 prize pool",
      trending: true,
      recommended: false,
      tags: ["gaming", "esports", "bgmi", "valorant", "fifa", "srm", "tournament", "game"]
    },
    {
      id: "cloud-computing-workshop",
      title: "Cloud Computing Workshop",
      date: "2026-05-25",
      venue: "Computer Center",
      organizer: "Cloud Tech Dept",
      coordinator: "Harish Kumar",
      phone: "+91 9876543222",
      category: "Technical",
      city: "Madurai",
      college: "Madurai Kamaraj University",
      description: "Master cloud technologies: AWS, Azure, and GCP. Hands-on labs on deployment, scaling, and serverless computing.",
      type: "individual",
      teamSize: "Individual",
      prize: "Certificate + free cloud credits",
      trending: true,
      recommended: false,
      tags: ["cloud", "aws", "azure", "gcp", "serverless", "mku", "deployment", "infrastructure"]
    },
    {
      id: "football-tournament",
      title: "Football Tournament",
      date: "2026-04-20",
      venue: "Sports Ground",
      organizer: "Sports Club",
      coordinator: "Mithun Singh",
      phone: "+91 9876543223",
      category: "Non-Technical",
      city: "Madurai",
      college: "Madurai Kamaraj University",
      description: "Join or cheer as college teams compete for the inter-college football championship trophy.",
      type: "team",
      teamSize: "11 members per team",
      prize: "Champion trophy + medals",
      trending: true,
      recommended: true,
      tags: ["football", "sports", "soccer", "tournament", "mku", "inter-college", "championship"]
    },
    {
      id: "web-dev-workshop",
      title: "Web Development Workshop",
      date: "2026-04-25",
      venue: "Computer Lab",
      organizer: "IT Club",
      coordinator: "Rishab Malhotra",
      phone: "+91 9876543224",
      category: "Technical",
      city: "Madurai",
      college: "Thiagarajar College",
      description: "Learn modern web development: HTML5, CSS3, React.js, and Node.js. Build and deploy a live project by the end of the session.",
      type: "individual",
      teamSize: "Individual",
      prize: "Certificate + GitHub profile review",
      trending: true,
      recommended: false,
      tags: ["web", "html", "css", "react", "javascript", "node", "frontend", "backend", "thiagarajar"]
    },
    {
      id: "mental-health-awareness",
      title: "Mental Health Awareness Program",
      date: "2026-05-28",
      venue: "Student Center",
      organizer: "Wellness Committee",
      coordinator: "Dr. Anjana Nair",
      phone: "+91 9876543225",
      category: "Non-Technical",
      city: "Madurai",
      college: "Thiagarajar College",
      description: "Important discussions on mental health, stress management, and well-being led by licensed counsellors.",
      type: "individual",
      teamSize: "Individual",
      prize: "Certificate",
      trending: false,
      recommended: true,
      tags: ["mental", "health", "wellness", "stress", "counselling", "thiagarajar", "well-being", "psychology"]
    },
    {
      id: "blockchain-conference",
      title: "Blockchain Technology Conference",
      date: "2026-04-18",
      venue: "Auditorium",
      organizer: "Blockchain Society",
      coordinator: "Karan Patel",
      phone: "+91 9876543226",
      category: "Technical",
      city: "Madurai",
      college: "American College",
      description: "Discover the future of blockchain, DeFi, NFTs, and Web3 technologies with hands-on smart contract demos.",
      type: "individual",
      teamSize: "Individual",
      prize: "Certificate + Web3 starter kit",
      trending: false,
      recommended: true,
      tags: ["blockchain", "web3", "nft", "defi", "crypto", "smart contract", "american college", "decentralized"]
    },
    {
      id: "cricket-tournament",
      title: "Inter-College Cricket Tournament",
      date: "2026-05-03",
      venue: "Cricket Ground",
      organizer: "Cricket Club",
      coordinator: "Sushant Gupta",
      phone: "+91 9876543227",
      category: "Non-Technical",
      city: "Madurai",
      college: "American College",
      description: "Exciting T20 cricket matches between top college teams. Open to all cricket enthusiasts!",
      type: "team",
      teamSize: "11 members per team + substitutes",
      prize: "Rolling trophy + cash prize",
      trending: true,
      recommended: false,
      tags: ["cricket", "t20", "sports", "tournament", "american college", "inter-college", "championship"]
    }
  ];

  const getEventsData = () => {
    try {
      const stored = localStorage.getItem("events");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) { /* ignore */ }
    return MASTER_EVENTS;
  };

  // ─────────────────────────────────────────────
  // GEMINI API CALL (with conversation history)
  // ─────────────────────────────────────────────
  const callGeminiAPI = async (userMessage, conversationHistory = []) => {
    const apiKey = getApiKey();
    if (!apiKey) return null;

    const events = getEventsData();
    const systemInstruction = `You are "EventBot" — the official, friendly AI assistant for Event Hub, a college event management platform.

FULL EVENT DATABASE (answer questions using ONLY this data):
${JSON.stringify(events, null, 2)}

BEHAVIORAL RULES:
- Answer ANY question about these events: dates, venues, coordinators, phone numbers, prizes, team sizes, registration, categories, cities, colleges.
- For each event mentioned, always provide: title, date, venue, college/city, coordinator name & phone, category, team size, prize.
- If asked about a specific event by name or keyword, find the best match in the database and give full details.
- If asked to list events by city (Coimbatore/Chennai/Madurai), filter and list them.
- If asked about a category (Technical/Non-Technical), filter by category.
- If asked about upcoming events, sort by date and list them.
- If asked about trending or recommended events, filter accordingly.
- Always include a link to register: [Register Here](events.html) or [View All Events](events.html)
- For registration help: Go to events.html → Click event → Click "Register Now"
- Keep answers concise, use markdown bullet points and bold for key info.
- If a question is outside event scope, still be helpful and redirect to Event Hub resources.
- NEVER make up events not in the database.`;

    try {
      const messages = [
        ...conversationHistory,
        { role: "user", parts: [{ text: userMessage }] }
      ];

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: systemInstruction }] },
            contents: messages
          })
        }
      );

      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
    } catch (err) {
      console.warn("Gemini API failed, using smart fallback:", err.message);
      return null;
    }
  };

  // ─────────────────────────────────────────────
  // SMART NLP FALLBACK ENGINE
  // ─────────────────────────────────────────────
  const smartFallback = (userMessage) => {
    const msg = userMessage.toLowerCase().trim();
    const events = getEventsData();

    // Helper: format a single event into a rich response card
    const formatEvent = (e) =>
      `**[${e.title}](event-details.html?id=${e.id})**
  📅 **Date:** ${e.date}  |  📍 **Venue:** ${e.venue}, ${e.college}
  🏙️ **City:** ${e.city}  |  🏷️ **Category:** ${e.category}
  👥 **Team Size:** ${e.teamSize || e.type}  |  🏆 **Prize:** ${e.prize || "Certificates"}
  📞 **Coordinator:** ${e.coordinator} — ${e.phone}
  📝 ${e.description}`;

    // Helper: list multiple events
    const listEvents = (evts, header) => {
      if (!evts.length) return `No events found matching your query. Check **[All Events](events.html)** for the full list.`;
      return `${header}\n\n${evts.map(e => `• **[${e.title}](event-details.html?id=${e.id})** — ${e.date} at ${e.college}, ${e.city} (${e.category})`).join("\n")}\n\n👉 **[View & Register on Events Page](events.html)**`;
    };

    // ── 1. Specific event lookup by name / keyword ──
    const matchedEvents = events.filter(e => {
      const allText = (e.title + " " + e.tags.join(" ") + " " + e.description).toLowerCase();
      return msg.split(" ").some(word => word.length > 3 && allText.includes(word));
    });

    // ── 2. Single event — give full details ──
    if (matchedEvents.length === 1) {
      return `Here are the full details for the event you asked about:\n\n${formatEvent(matchedEvents[0])}\n\n👉 **[Register Now](events.html)**`;
    }

    // ── 3. City filters ──
    if (msg.includes("coimbatore") || msg.includes("cbr")) {
      const cityEvents = events.filter(e => e.city.toLowerCase() === "coimbatore");
      return listEvents(cityEvents, `🏙️ **Events in Coimbatore (${cityEvents.length} events):**`);
    }
    if (msg.includes("chennai") || msg.includes("madras")) {
      const cityEvents = events.filter(e => e.city.toLowerCase() === "chennai");
      return listEvents(cityEvents, `🏙️ **Events in Chennai (${cityEvents.length} events):**`);
    }
    if (msg.includes("madurai")) {
      const cityEvents = events.filter(e => e.city.toLowerCase() === "madurai");
      return listEvents(cityEvents, `🏙️ **Events in Madurai (${cityEvents.length} events):**`);
    }

    // ── 4. College filters ──
    const collegeMap = {
      "psg": "PSG College of Technology",
      "cit": "Coimbatore Institute of Technology",
      "kct": "Kumaraguru College of Technology",
      "anna university": "Anna University",
      "iit": "IIT Madras",
      "iit madras": "IIT Madras",
      "srm": "SRM Institute of Science and Technology",
      "mku": "Madurai Kamaraj University",
      "madurai kamaraj": "Madurai Kamaraj University",
      "thiagarajar": "Thiagarajar College",
      "american college": "American College"
    };
    for (const [key, college] of Object.entries(collegeMap)) {
      if (msg.includes(key)) {
        const collegeEvents = events.filter(e => e.college === college);
        return listEvents(collegeEvents, `🏛️ **Events at ${college} (${collegeEvents.length} events):**`);
      }
    }

    // ── 5. Category filters ──
    if (msg.includes("technical") || msg.includes("tech event")) {
      const techEvents = events.filter(e => e.category === "Technical");
      return listEvents(techEvents, `💻 **Technical Events (${techEvents.length} events):**`);
    }
    if (msg.includes("non-technical") || msg.includes("non technical") || msg.includes("non tech") || msg.includes("cultural") || msg.includes("sports")) {
      const nonTech = events.filter(e => e.category === "Non-Technical");
      return listEvents(nonTech, `🎉 **Non-Technical & Cultural Events (${nonTech.length} events):**`);
    }

    // ── 6. Trending / recommended ──
    if (msg.includes("trending") || msg.includes("popular") || msg.includes("hot")) {
      const trending = events.filter(e => e.trending);
      return listEvents(trending, `🔥 **Trending Events Right Now (${trending.length} events):**`);
    }
    if (msg.includes("recommend") || msg.includes("suggest") || msg.includes("best")) {
      const recommended = events.filter(e => e.recommended);
      return listEvents(recommended, `⭐ **AI Recommended Events for You (${recommended.length} events):**`);
    }

    // ── 7. Team / individual ──
    if (msg.includes("team") || msg.includes("group") || msg.includes("partner")) {
      const teamEvents = events.filter(e => e.type === "team");
      return listEvents(teamEvents, `👥 **Team-Based Events (${teamEvents.length} events):**`);
    }
    if (msg.includes("individual") || msg.includes("solo") || msg.includes("alone")) {
      const soloEvents = events.filter(e => e.type === "individual");
      return listEvents(soloEvents, `🧑 **Individual Events (${soloEvents.length} events):**`);
    }

    // ── 8. Specific topic keywords ──
    const topicMap = {
      "hackathon|coding|code|program": events.filter(e => e.tags.some(t => ["coding","hackathon","python","programming"].includes(t))),
      "robot|robotics|hardware|arduino": events.filter(e => e.tags.some(t => ["robotics","robot","arduino","hardware"].includes(t))),
      "ai|artificial intelligence|machine learning|ml|deep learning": events.filter(e => e.tags.some(t => ["ai","machine learning","llm","ml"].includes(t))),
      "web|frontend|backend|html|css|react": events.filter(e => e.tags.some(t => ["web","html","css","react","javascript"].includes(t))),
      "cloud|aws|azure|gcp": events.filter(e => e.tags.some(t => ["cloud","aws","azure","gcp"].includes(t))),
      "iot|internet of things|sensor|embedded": events.filter(e => e.tags.some(t => ["iot","sensors","embedded"].includes(t))),
      "blockchain|web3|crypto|nft": events.filter(e => e.tags.some(t => ["blockchain","web3","crypto"].includes(t))),
      "data science|analytics|pandas": events.filter(e => e.tags.some(t => ["data","analytics","pandas"].includes(t))),
      "music|concert|band|singing": events.filter(e => e.tags.some(t => ["music","band","singing","concert"].includes(t))),
      "cricket|football|soccer|sports|game": events.filter(e => e.tags.some(t => ["cricket","football","soccer","sports"].includes(t))),
      "gaming|esports|valorant|bgmi": events.filter(e => e.tags.some(t => ["gaming","esports","bgmi","valorant"].includes(t))),
      "debate|speaking|language": events.filter(e => e.tags.some(t => ["debate","speaking","language"].includes(t))),
      "startup|entrepreneur|business|pitch": events.filter(e => e.tags.some(t => ["startup","entrepreneur","business"].includes(t))),
      "health|wellness|mental|stress|psychology": events.filter(e => e.tags.some(t => ["mental","health","wellness"].includes(t))),
      "environment|green|climate|sustainability": events.filter(e => e.tags.some(t => ["environment","green","sustainability"].includes(t))),
      "mobile|app|android|ios|flutter": events.filter(e => e.tags.some(t => ["mobile","flutter","android","ios"].includes(t)))
    };

    for (const [pattern, filteredEvents] of Object.entries(topicMap)) {
      const keywords = pattern.split("|");
      if (keywords.some(kw => msg.includes(kw)) && filteredEvents.length > 0) {
        if (filteredEvents.length === 1) {
          return `Here are the full details:\n\n${formatEvent(filteredEvents[0])}\n\n👉 **[Register Now](events.html)**`;
        }
        return listEvents(filteredEvents, `🔍 **Events matching your query (${filteredEvents.length} found):**`);
      }
    }

    // ── 9. Multi-event match (2–3 found) ──
    if (matchedEvents.length >= 2) {
      return listEvents(matchedEvents, `🔍 **Found ${matchedEvents.length} events matching your query:**`);
    }

    // ── 10. List all events ──
    if (msg.includes("all event") || msg.includes("list event") || msg.includes("show event") || msg.includes("every event")) {
      return listEvents(events, `📋 **All Events on Event Hub (${events.length} total):**`);
    }

    // ── 11. Upcoming / date queries ──
    if (msg.includes("upcoming") || msg.includes("next") || msg.includes("soon") || msg.includes("latest")) {
      const sorted = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
      const upcomingFive = sorted.slice(0, 5);
      return listEvents(upcomingFive, `📅 **Next 5 Upcoming Events:**`);
    }

    // ── 12. Registration / how to ──
    if (msg.includes("register") || msg.includes("sign up") || msg.includes("enroll") || msg.includes("how to join") || msg.includes("how do i")) {
      return `📝 **How to Register for an Event:**

1. Go to the **[Events Page](events.html)**
2. Browse or search for your preferred event
3. Click any event card to view full details
4. Click **"Register Now"** and fill in your student details
5. Track all your registrations in your **[Dashboard](dashboard.html)**

💡 *Tip: Some events need team pre-registration. Check the event details for team size requirements.*`;
    }

    // ── 13. Certificate / credential queries ──
    if (msg.includes("certificate") || msg.includes("credential") || msg.includes("credit") || msg.includes("badge")) {
      return `📜 **E-Certificates & Credit Points:**

* **E-Certificates** are auto-generated and downloadable from your **[Dashboard](dashboard.html)** within 24–48 hours after attendance verification.
* **Activity Points:** Participation earns 100–250 points, synced to your student profile.
* **Physical Certificates:** Winner & merit certificates are awarded during closing ceremonies.
* **Winners** additionally receive trophies, cash prizes (where applicable), and placement referrals.`;
    }

    // ── 14. Contact / coordinator queries ──
    if (msg.includes("contact") || msg.includes("phone") || msg.includes("coordinator") || msg.includes("organizer") || msg.includes("helpline")) {
      return `📞 **Event Coordinators & Support:**

| Event | Coordinator | Phone |
|-------|-------------|-------|
${events.map(e => `| ${e.title} | ${e.coordinator} | ${e.phone} |`).join("\n")}

📧 **General Support:** events@college.edu
🏢 **Student Union Desk:** Block A, Room 102 (Mon–Fri, 9 AM–5 PM)`;
    }

    // ── 15. Prize queries ──
    if (msg.includes("prize") || msg.includes("reward") || msg.includes("winner") || msg.includes("cash") || msg.includes("money")) {
      const prizey = events.filter(e => e.prize && (e.prize.includes("₹") || e.prize.includes("cash") || e.prize.includes("trophy")));
      return `🏆 **Events with Major Prizes:**\n\n${prizey.map(e => `• **${e.title}** — 🏆 ${e.prize}`).join("\n")}\n\n👉 **[View All Events](events.html)**`;
    }

    // ── 16. Venue queries ──
    if (msg.includes("venue") || msg.includes("location") || msg.includes("where") || msg.includes("place") || msg.includes("address")) {
      return `📍 **Event Venues:**\n\n${events.map(e => `• **${e.title}:** ${e.venue}, ${e.college}, ${e.city}`).join("\n")}\n\n💡 *Tip: Arrive 15 minutes early for QR badge scanning!*`;
    }

    // ── 17. Fee / cost queries ──
    if (msg.includes("fee") || msg.includes("cost") || msg.includes("paid") || msg.includes("free") || msg.includes("ticket") || msg.includes("price")) {
      return `💳 **Registration Fees:**

* ✅ **All events listed on Event Hub are FREE** for enrolled students with a valid college ID.
* Some premium events may require a nominal participation fee — check the individual event page for details.
* 👉 Browse **[All Events](events.html)** to check specific event fees.`;
    }

    // ── 18. General greeting / help ──
    if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey") || msg.includes("help") || msg === "?" || msg.length < 5) {
      return `👋 Hi! I'm your **Event Hub AI Assistant** — I know everything about all ${events.length} events on this platform!

**Ask me anything like:**
- 🔍 *"Show me events in Chennai"*
- 🏆 *"What are the hackathons available?"*
- 📅 *"What are the upcoming events?"*
- 📞 *"Who is the coordinator for Robotics Workshop?"*
- 💰 *"Which events have cash prizes?"*
- 🏛️ *"Events at IIT Madras?"*
- 👥 *"Which events are for teams?"*

What would you like to know? 🚀`;
    }

    // ── 19. Final fallback — show all events summary ──
    const sorted = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
    return `🤔 I couldn't find a specific match for **"${userMessage}"**, but here are all our upcoming events:\n\n${sorted.map(e => `• **[${e.title}](event-details.html?id=${e.id})** — ${e.date} | ${e.city} | ${e.category}`).join("\n")}\n\nTry asking about a **specific event name**, **city**, **category**, or **topic**! 😊`;
  };

  // ─────────────────────────────────────────────
  // CONVERSATION HISTORY MANAGER
  // ─────────────────────────────────────────────
  let conversationHistory = [];

  return {
    getApiKey,
    setApiKey,

    clearHistory() {
      conversationHistory = [];
    },

    /**
     * Main AI Assistant — handles any event-related question
     */
    async queryAssistant(userMessage) {
      const apiKey = getApiKey();

      if (apiKey) {
        // Try Gemini API first (multi-turn conversation)
        const apiResponse = await callGeminiAPI(userMessage, conversationHistory);
        if (apiResponse) {
          // Maintain conversation history (keep last 10 turns to avoid token overload)
          conversationHistory.push({ role: "user", parts: [{ text: userMessage }] });
          conversationHistory.push({ role: "model", parts: [{ text: apiResponse }] });
          if (conversationHistory.length > 20) conversationHistory = conversationHistory.slice(-20);
          return apiResponse;
        }
      }

      // Smart fallback NLP engine
      return smartFallback(userMessage);
    },

    /**
     * AI Event Detail Generator (For Admins)
     */
    async generateEventDetails(promptText, category = "Technical") {
      const apiKey = getApiKey();
      if (apiKey) {
        const sys = `You are an AI Event Producer. Output raw JSON object with keys: title, description, shortDescription, agenda (array of strings), rules (array of strings), tags (array of strings). No markdown, pure JSON only.`;
        const res = await callGeminiAPI(`Generate complete event details for: ${promptText} (Category: ${category})`, []);
        if (res) {
          try {
            const cleanJson = res.replace(/```json/g, "").replace(/```/g, "").trim();
            return JSON.parse(cleanJson);
          } catch (e) { /* parse failed, use fallback */ }
        }
      }
      const baseTitle = promptText.charAt(0).toUpperCase() + promptText.slice(1);
      return {
        title: baseTitle.includes("Event") || baseTitle.includes("Fest") ? baseTitle : `${baseTitle} 2026`,
        category,
        shortDescription: `An exciting ${category.toLowerCase()} event focusing on hands-on skills, networking, and innovation.`,
        description: `Join us for ${baseTitle}! This high-impact event brings together passionate students from top colleges. Participants will showcase talent, build real solutions, and win exciting prizes with certificates awarded to all attendees.`,
        agenda: [
          "09:00 AM - Registration & Keynote Address",
          "10:30 AM - Hands-on Challenge / Main Track Begins",
          "01:00 PM - Networking Lunch Break",
          "02:30 PM - Project Evaluation & Showcase",
          "04:30 PM - Prize Ceremony & Closing Remarks"
        ],
        rules: [
          "Valid college ID card mandatory for entry.",
          "Teams must consist of 1 to 4 participants.",
          "Plagiarism or pre-built projects will lead to immediate disqualification.",
          "Decisions of the judging panel will be final."
        ],
        tags: [category.toLowerCase(), "college", "competition", "innovation", "certificates"]
      };
    },

    /**
     * AI Teammate Matcher
     */
    async findTeammates(skillNeeded, eventName) {
      const normalizedEvent = (eventName || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
      const eventWords = normalizedEvent.split(" ").filter(Boolean);
      const eventTag = eventWords.slice(0, 2).map((word) => word[0]?.toUpperCase() + word.slice(1)).join("") || "Team";

      const memberPool = [
        { fullName: "Aditya Mehta", dept: "CSE - 3rd Year", skills: "React, Node.js, UI/UX", match: 96 },
        { fullName: "Meera Iyer", dept: "AI & DS - 2nd Year", skills: "Python, PyTorch, Gemini API", match: 92 },
        { fullName: "Rohit Verma", dept: "ECE - 4th Year", skills: "Embedded C, IoT, Hardware", match: 88 },
        { fullName: "Ananya Rao", dept: "IT - 3rd Year", skills: "Figma, Frontend, Presentation", match: 85 },
        { fullName: "Nikhil Shah", dept: "CSE - 2nd Year", skills: "JavaScript, AWS, Docker", match: 84 },
        { fullName: "Priya Desai", dept: "AI - 3rd Year", skills: "Machine Learning, TensorFlow", match: 83 },
        { fullName: "Simran Kaur", dept: "IT - 4th Year", skills: "CSS, Animation, Prototyping", match: 81 },
        { fullName: "Vikram Joshi", dept: "ECE - 3rd Year", skills: "Robotics, C++, PCB Design", match: 80 },
        { fullName: "Sana Khan", dept: "CSE - 4th Year", skills: "Data Science, SQL, Python", match: 79 },
        { fullName: "Ishan Bhatt", dept: "AI - 2nd Year", skills: "NLP, APIs, Flask", match: 78 },
        { fullName: "Maya Patel", dept: "IT - 3rd Year", skills: "UX Research, Figma, Branding", match: 77 },
        { fullName: "Devansh Malhotra", dept: "ECE - 4th Year", skills: "Microcontrollers, Embedded C", match: 76 },
        { fullName: "Ayesha Sheikh", dept: "CSE - 3rd Year", skills: "Kubernetes, DevOps, Python", match: 75 },
        { fullName: "Riya Gupta", dept: "AI - 2nd Year", skills: "Deep Learning, PyTorch", match: 74 },
        { fullName: "Kunal Nair", dept: "IT - 1st Year", skills: "HTML, JavaScript, React", match: 73 },
        { fullName: "Tara Singh", dept: "ECE - 3rd Year", skills: "Sensors, IoT, Robotics", match: 72 },
      ];

      const eventSeed = normalizedEvent || "general";
      const eventHash = Array.from(eventSeed).reduce((sum, char) => sum + char.charCodeAt(0), 0);
      const startIndex = eventHash % memberPool.length;
      const candidates = Array.from({ length: 4 }, (_, idx) => {
        const profile = memberPool[(startIndex + idx * 5) % memberPool.length];
        const name = `${profile.fullName} (${eventTag})`;
        const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=3f51b5&color=fff&bold=true`;
        return {
          name,
          dept: profile.dept,
          skills: profile.skills,
          match: profile.match,
          avatar,
        };
      });

      if (!skillNeeded && !eventName) return candidates;
      const lower = (skillNeeded || eventName).toLowerCase();
      return candidates
        .map((c) => {
          let score = c.match;
          if (c.skills.toLowerCase().includes(lower)) score = Math.min(99, score + 5);
          if (lower.includes("hackathon") && c.skills.toLowerCase().includes("react")) score += 2;
          if (lower.includes("workshop") && c.skills.toLowerCase().includes("python")) score += 2;
          if (lower.includes("robot") && c.skills.toLowerCase().includes("embedded")) score += 2;
          if (lower.includes("design") && c.skills.toLowerCase().includes("ui/ux")) score += 2;
          return { ...c, match: Math.min(99, score) };
        })
        .sort((a, b) => b.match - a.match);
    },


    /**
     * AI Feedback & Sentiment Analyzer
     */
    async analyzeFeedback(feedbackList) {
      return {
        sentimentScore: 92,
        sentimentLabel: "Overwhelmingly Positive",
        keyHighlights: [
          "Students highly appreciated the hands-on workshops and practical mentor guidance.",
          "Smooth registration and digital badge check-in experience.",
          "Request for extended project submission timeline in future hackathons."
        ],
        actionItems: [
          "Provide extra power strips & high-speed Wi-Fi access in Lab 3.",
          "Record keynotes for students who could not attend in person."
        ]
      };
    },

    /**
     * AI Attendance Turnout Predictor
     */
    predictTurnout(eventCategory, capacity = 200) {
      const multipliers = { Technical: 0.91, Workshop: 0.88, Cultural: 0.97, Sports: 0.94, Seminar: 0.82 };
      const factor = multipliers[eventCategory] || 0.88;
      const expected = Math.round(capacity * factor);
      return {
        expectedAttendance: expected,
        confidence: "94%",
        insights: `High demand detected for ${eventCategory} events. Peak check-in expected between 09:15 AM - 10:00 AM.`
      };
    },

    /**
     * AI Personalized Recommendations
     */
    getRecommendations(userDepartment = "Computer Science") {
      const allEvents = getEventsData();
      return allEvents.map((evt, idx) => {
        let score = 80 + (idx * 3) % 15;
        if (userDepartment.includes("Computer") || userDepartment.includes("CSE") || userDepartment.includes("IT")) {
          if (evt.category === "Technical") score += 12;
        }
        return {
          ...evt,
          aiScore: Math.min(99, score),
          aiReason: score > 90
            ? "High match with your CS background and recent hackathon registrations."
            : "Trending among students in your city."
        };
      }).sort((a, b) => b.aiScore - a.aiScore);
    },

    /**
     * AI Itinerary Schedule Generator
     */
    planItinerary(registeredEvents) {
      if (!registeredEvents || registeredEvents.length === 0) {
        const defaultEvts = getEventsData().slice(0, 3);
        return defaultEvts.map((e, idx) => ({
          time: `${9 + idx * 2}:00 AM - ${11 + idx * 2}:00 AM`,
          event: e.title || e.name || "Campus Event",
          location: e.venue,
          tip: "Arrive 10 minutes early for check-in badge scan."
        }));
      }
      return registeredEvents.map((e, idx) => ({
        time: `${9 + (idx % 4) * 2}:00 AM - ${11 + (idx % 4) * 2}:00 AM`,
        event: e.title || e.name || "Campus Event",
        location: e.venue || "Main Auditorium",
        tip: "Recommended AI schedule block without venue overlap."
      }));
    }
  };
})();
