/**
 * Event Hub - Floating AI Assistant v3.0
 * Self-contained: full event knowledge base built-in.
 * Never fails even if ai-services.js is not loaded.
 */

// ── FULL EVENT DATABASE (built-in, always available) ──────────────────────────
const EVENTS_DB = [
  { id:"hackathon-2026", title:"Hackathon 2026", date:"2026-03-25", venue:"Auditorium", coordinator:"Dr. Rajesh Kumar", phone:"+91 9876543210", category:"Technical", city:"Coimbatore", college:"PSG College of Technology", description:"Join the biggest 24-hour coding competition. Build innovative projects and compete for prizes.", type:"team", teamSize:"2–4 members", prize:"₹50,000 prize pool", trending:true, tags:["hackathon","coding","code","technical","psg","programming","competition","project"] },
  { id:"debate-competition", title:"Inter-College Debate", date:"2026-05-01", venue:"Auditorium", coordinator:"Prof. Anjali Sharma", phone:"+91 9876543211", category:"Non-Technical", city:"Coimbatore", college:"PSG College of Technology", description:"Engage in intellectual discussions and improve your debating and public speaking skills.", type:"team", teamSize:"2 members", prize:"Trophies & certificates", trending:false, tags:["debate","speaking","language","arts","psg","inter-college","discussion","non-technical"] },
  { id:"robotics-workshop", title:"Robotics Workshop", date:"2026-04-02", venue:"Lab 2", coordinator:"Vikram Bhatt", phone:"+91 9876543212", category:"Technical", city:"Coimbatore", college:"Coimbatore Institute of Technology", description:"Hands-on sessions: build and program real robots using Arduino and Raspberry Pi.", type:"team", teamSize:"2–3 members", prize:"Certificates for all", trending:true, tags:["robotics","robot","arduino","hardware","cit","embedded","build"] },
  { id:"mobile-app-dev-workshop", title:"Mobile App Development Workshop", date:"2026-05-12", venue:"Innovation Lab", coordinator:"Neha Patel", phone:"+91 9876543213", category:"Non-Technical", city:"Coimbatore", college:"Coimbatore Institute of Technology", description:"Build your first mobile app using Flutter or React Native. Beginner-friendly with expert mentors.", type:"individual", teamSize:"Individual", prize:"Best app wins internship referral", trending:true, tags:["mobile","app","flutter","android","ios","cit","beginner","non-technical"] },
  { id:"data-science-seminar", title:"Data Science Seminar", date:"2026-03-28", venue:"Seminar Hall", coordinator:"Dr. Priya Singh", phone:"+91 9876543214", category:"Technical", city:"Coimbatore", college:"Kumaraguru College of Technology", description:"Explore data science and machine learning with industry experts. Covers pandas, sklearn, real-world datasets.", type:"individual", teamSize:"Individual", prize:"Certificate of participation", trending:true, tags:["data","science","ml","machine learning","pandas","python","kct","analytics","technical"] },
  { id:"environmental-awareness-seminar", title:"Environmental Awareness Seminar", date:"2026-05-15", venue:"Seminar Hall", coordinator:"Rohit Desai", phone:"+91 9876543215", category:"Non-Technical", city:"Coimbatore", college:"Kumaraguru College of Technology", description:"Learn about sustainable practices, climate change, and environmental conservation strategies.", type:"individual", teamSize:"Individual", prize:"Certificate", trending:false, tags:["environment","green","sustainability","climate","kct","awareness","nature","non-technical"] },
  { id:"iot-workshop", title:"Internet of Things Workshop", date:"2026-06-08", venue:"Electronics Lab", coordinator:"Arun Kumar", phone:"+91 9876543216", category:"Technical", city:"Chennai", college:"Anna University", description:"Build smart IoT devices using sensors, microcontrollers, and cloud platforms.", type:"individual", teamSize:"Individual", prize:"Certificate + project kit", trending:true, tags:["iot","sensors","embedded","smart","anna university","electronics","microcontroller","technical"] },
  { id:"music-festival", title:"Music Festival", date:"2026-05-05", venue:"Open Stage", coordinator:"Divya Krishnan", phone:"+91 9876543217", category:"Non-Technical", city:"Chennai", college:"Anna University", description:"Electrifying live performances from student bands, soloists, and guest artists.", type:"team", teamSize:"Solo or group", prize:"Cash prizes for top performers", trending:true, tags:["music","festival","band","concert","singing","anna university","cultural","non-technical"] },
  { id:"ai-seminar", title:"AI Seminar", date:"2026-04-15", venue:"Seminar Hall", coordinator:"Prof. Venkatesh Rao", phone:"+91 9876543218", category:"Technical", city:"Chennai", college:"IIT Madras", description:"Latest advances in AI, Large Language Models, and Generative AI from top industry researchers.", type:"individual", teamSize:"Individual", prize:"Certificate + research paper submission", trending:false, tags:["ai","artificial intelligence","llm","generative","iit","research","deep learning","technical"] },
  { id:"entrepreneurship-seminar", title:"Entrepreneurship Seminar", date:"2026-04-28", venue:"Conference Hall", coordinator:"Meera Iyer", phone:"+91 9876543219", category:"Non-Technical", city:"Chennai", college:"IIT Madras", description:"Learn from successful entrepreneurs and VCs. Includes live pitch session and networking.", type:"individual", teamSize:"Individual", prize:"Best pitch wins incubation support", trending:false, tags:["startup","entrepreneur","business","iit","pitch","venture","networking","non-technical"] },
  { id:"python-programming-bootcamp", title:"Python Programming Bootcamp", date:"2026-06-25", venue:"Coding Lab", coordinator:"Sanjay Nath", phone:"+91 9876543220", category:"Technical", city:"Chennai", college:"SRM Institute of Science and Technology", description:"Intensive Python course: OOP, APIs, automation, and web scraping. Beginner to advanced.", type:"individual", teamSize:"Individual", prize:"Certificate + SRM placement referral", trending:true, tags:["python","programming","coding","bootcamp","srm","automation","technical"] },
  { id:"gaming-tournament", title:"E-Sports Gaming Tournament", date:"2026-05-18", venue:"Gaming Arena", coordinator:"Arjun Verma", phone:"+91 9876543221", category:"Non-Technical", city:"Chennai", college:"SRM Institute of Science and Technology", description:"Compete in BGMI, Valorant, and FIFA. Massive cash prize pool for winners.", type:"team", teamSize:"Individual or team of 5", prize:"₹25,000 prize pool", trending:true, tags:["gaming","esports","bgmi","valorant","fifa","srm","tournament","game","non-technical"] },
  { id:"cloud-computing-workshop", title:"Cloud Computing Workshop", date:"2026-05-25", venue:"Computer Center", coordinator:"Harish Kumar", phone:"+91 9876543222", category:"Technical", city:"Madurai", college:"Madurai Kamaraj University", description:"Master AWS, Azure, and GCP. Hands-on labs on deployment, scaling, and serverless computing.", type:"individual", teamSize:"Individual", prize:"Certificate + free cloud credits", trending:true, tags:["cloud","aws","azure","gcp","serverless","mku","deployment","technical"] },
  { id:"football-tournament", title:"Football Tournament", date:"2026-04-20", venue:"Sports Ground", coordinator:"Mithun Singh", phone:"+91 9876543223", category:"Non-Technical", city:"Madurai", college:"Madurai Kamaraj University", description:"Inter-college football championship. Teams compete for the campus football trophy.", type:"team", teamSize:"11 members per team", prize:"Champion trophy + medals", trending:true, tags:["football","sports","soccer","tournament","mku","inter-college","championship","non-technical"] },
  { id:"web-dev-workshop", title:"Web Development Workshop", date:"2026-04-25", venue:"Computer Lab", coordinator:"Rishab Malhotra", phone:"+91 9876543224", category:"Technical", city:"Madurai", college:"Thiagarajar College", description:"Learn HTML5, CSS3, React.js, and Node.js. Build and deploy a live project by end of session.", type:"individual", teamSize:"Individual", prize:"Certificate + GitHub profile review", trending:true, tags:["web","html","css","react","javascript","node","frontend","backend","thiagarajar","technical"] },
  { id:"mental-health-awareness", title:"Mental Health Awareness Program", date:"2026-05-28", venue:"Student Center", coordinator:"Dr. Anjana Nair", phone:"+91 9876543225", category:"Non-Technical", city:"Madurai", college:"Thiagarajar College", description:"Discussions on mental health, stress management, and well-being led by licensed counsellors.", type:"individual", teamSize:"Individual", prize:"Certificate", trending:false, tags:["mental","health","wellness","stress","counselling","thiagarajar","non-technical"] },
  { id:"blockchain-conference", title:"Blockchain Technology Conference", date:"2026-04-18", venue:"Auditorium", coordinator:"Karan Patel", phone:"+91 9876543226", category:"Technical", city:"Madurai", college:"American College", description:"Discover blockchain, DeFi, NFTs, and Web3 technologies with hands-on smart contract demos.", type:"individual", teamSize:"Individual", prize:"Certificate + Web3 starter kit", trending:false, tags:["blockchain","web3","nft","defi","crypto","smart contract","american college","technical"] },
  { id:"cricket-tournament", title:"Inter-College Cricket Tournament", date:"2026-05-03", venue:"Cricket Ground", coordinator:"Sushant Gupta", phone:"+91 9876543227", category:"Non-Technical", city:"Madurai", college:"American College", description:"Exciting T20 cricket matches between top college teams. Open to all cricket enthusiasts!", type:"team", teamSize:"11 members + substitutes", prize:"Rolling trophy + cash prize", trending:true, tags:["cricket","t20","sports","tournament","american college","inter-college","non-technical"] }
];

// ── SMART NLP ENGINE ───────────────────────────────────────────────────────────
function smartAnswer(userMessage) {
  const msg = userMessage.toLowerCase().trim();
  const events = EVENTS_DB;

  // Format a single event card
  const card = (e) =>
    `🎯 **${e.title}**
📅 **Date:** ${e.date}
📍 **Venue:** ${e.venue} — ${e.college}, ${e.city}
🏷️ **Category:** ${e.category} | 👥 **Type:** ${e.teamSize}
🏆 **Prize:** ${e.prize}
📞 **Coordinator:** ${e.coordinator} (${e.phone})
📝 ${e.description}
👉 [View & Register](events.html?highlight=${e.id})`;

  // List multiple events
  const listCards = (evts, header) => {
    if (!evts.length) return `No events found. Check **[All Events](events.html)** for the full list.`;
    if (evts.length === 1) return card(evts[0]);
    return `${header}\n\n` +
      evts.map(e =>
        `• **${e.title}** | 📅 ${e.date} | 📍 ${e.college}, ${e.city} | 🏷️ ${e.category} | 🏆 ${e.prize}`
      ).join("\n") +
      `\n\n*Ask me about any specific event for full details!*\n👉 **[View All Events](events.html)**`;
  };

  // ── Direct event name match ──
  const byName = events.filter(e => msg.includes(e.title.toLowerCase()) || msg.includes(e.id));
  if (byName.length === 1) return card(byName[0]);

  // ── City queries ──
  if (msg.includes("coimbatore") || msg.includes("cbr")) {
    const r = events.filter(e => e.city === "Coimbatore");
    return listCards(r, `🏙️ **Events in Coimbatore (${r.length} events):**`);
  }
  if (msg.includes("chennai") || msg.includes("madras")) {
    const r = events.filter(e => e.city === "Chennai");
    return listCards(r, `🏙️ **Events in Chennai (${r.length} events):**`);
  }
  if (msg.includes("madurai")) {
    const r = events.filter(e => e.city === "Madurai");
    return listCards(r, `🏙️ **Events in Madurai (${r.length} events):**`);
  }

  // ── College queries ──
  const collegeAliases = [
    { keys: ["psg"], name: "PSG College of Technology" },
    { keys: ["cit", "coimbatore institute"], name: "Coimbatore Institute of Technology" },
    { keys: ["kct", "kumaraguru"], name: "Kumaraguru College of Technology" },
    { keys: ["anna university", "anna uni"], name: "Anna University" },
    { keys: ["iit madras", "iit"], name: "IIT Madras" },
    { keys: ["srm"], name: "SRM Institute of Science and Technology" },
    { keys: ["mku", "madurai kamaraj"], name: "Madurai Kamaraj University" },
    { keys: ["thiagarajar"], name: "Thiagarajar College" },
    { keys: ["american college"], name: "American College" }
  ];
  for (const { keys, name } of collegeAliases) {
    if (keys.some(k => msg.includes(k))) {
      const r = events.filter(e => e.college === name);
      return listCards(r, `🏛️ **Events at ${name} (${r.length} events):**`);
    }
  }

  // ── Category queries ──
  if (msg.includes("technical") && !msg.includes("non")) {
    const r = events.filter(e => e.category === "Technical");
    return listCards(r, `💻 **Technical Events (${r.length} events):**`);
  }
  if (msg.includes("non-technical") || msg.includes("non technical") || msg.includes("non tech") || msg.includes("nontechnical")) {
    const r = events.filter(e => e.category === "Non-Technical");
    return listCards(r, `🎉 **Non-Technical Events (${r.length} events):**`);
  }
  if (msg.includes("cultural") || msg.includes("arts") || msg.includes("performance")) {
    const r = events.filter(e => e.tags.some(t => ["music","debate","festival","cultural","non-technical"].includes(t)));
    return listCards(r, `🎭 **Cultural & Arts Events (${r.length} events):**`);
  }
  if (msg.includes("sports") || msg.includes("game") || msg.includes("tournament") && !msg.includes("gaming")) {
    const r = events.filter(e => e.tags.some(t => ["cricket","football","soccer","sports","tournament"].includes(t)));
    return listCards(r, `⚽ **Sports Events (${r.length} events):**`);
  }

  // ── Topic keyword queries ──
  const topicRules = [
    { words: ["hackathon","hack-a-thon"], filter: e => e.tags.includes("hackathon") },
    { words: ["coding","code","programming","program"], filter: e => e.tags.some(t => ["coding","programming","python","hackathon"].includes(t)) },
    { words: ["python"], filter: e => e.tags.includes("python") },
    { words: ["web","html","css","react","javascript","frontend","backend"], filter: e => e.tags.some(t => ["web","html","css","react","javascript"].includes(t)) },
    { words: ["ai","artificial intelligence","machine learning","ml","deep learning","llm"], filter: e => e.tags.some(t => ["ai","machine learning","llm","deep learning"].includes(t)) },
    { words: ["data science","data","analytics"], filter: e => e.tags.some(t => ["data","analytics","ml"].includes(t)) },
    { words: ["robotics","robot","arduino"], filter: e => e.tags.some(t => ["robotics","robot","arduino"].includes(t)) },
    { words: ["iot","internet of things","sensor"], filter: e => e.tags.some(t => ["iot","sensors","embedded"].includes(t)) },
    { words: ["cloud","aws","azure","gcp","serverless"], filter: e => e.tags.some(t => ["cloud","aws","azure","gcp"].includes(t)) },
    { words: ["blockchain","web3","crypto","nft","defi"], filter: e => e.tags.some(t => ["blockchain","web3","crypto"].includes(t)) },
    { words: ["mobile","app","flutter","android","ios"], filter: e => e.tags.some(t => ["mobile","flutter","android"].includes(t)) },
    { words: ["music","band","concert","singing"], filter: e => e.tags.some(t => ["music","band","singing"].includes(t)) },
    { words: ["gaming","esports","bgmi","valorant","fifa"], filter: e => e.tags.some(t => ["gaming","esports","bgmi","valorant"].includes(t)) },
    { words: ["football","soccer"], filter: e => e.tags.includes("football") },
    { words: ["cricket"], filter: e => e.tags.includes("cricket") },
    { words: ["debate","speaking"], filter: e => e.tags.includes("debate") },
    { words: ["startup","entrepreneur","business","pitch"], filter: e => e.tags.some(t => ["startup","entrepreneur","business"].includes(t)) },
    { words: ["health","wellness","mental","stress","psychology"], filter: e => e.tags.some(t => ["health","mental","wellness"].includes(t)) },
    { words: ["environment","green","climate","sustainability"], filter: e => e.tags.some(t => ["environment","green","sustainability"].includes(t)) }
  ];
  for (const { words, filter } of topicRules) {
    if (words.some(w => msg.includes(w))) {
      const r = events.filter(filter);
      if (r.length) return r.length === 1 ? card(r[0]) : listCards(r, `🔍 **Found ${r.length} matching event(s):**`);
    }
  }

  // ── Trending / recommended ──
  if (msg.includes("trending") || msg.includes("popular") || msg.includes("hot")) {
    const r = events.filter(e => e.trending);
    return listCards(r, `🔥 **Trending Events (${r.length} events):**`);
  }

  // ── Team vs individual ──
  if (msg.includes("team") || msg.includes("group") || msg.includes("partner")) {
    const r = events.filter(e => e.type === "team");
    return listCards(r, `👥 **Team-Based Events (${r.length} events):**`);
  }
  if (msg.includes("individual") || msg.includes("solo") || msg.includes("alone")) {
    const r = events.filter(e => e.type === "individual");
    return listCards(r, `🧑 **Individual Events (${r.length} events):**`);
  }

  // ── Prize queries ──
  if (msg.includes("prize") || msg.includes("cash") || msg.includes("reward") || msg.includes("money") || msg.includes("win")) {
    const r = events.filter(e => e.prize.includes("₹") || e.prize.toLowerCase().includes("trophy") || e.prize.toLowerCase().includes("cash"));
    return `🏆 **Events with Cash Prizes / Trophies:**\n\n` +
      r.map(e => `• **${e.title}** — ${e.prize} (${e.college}, ${e.city})`).join("\n") +
      `\n\n👉 **[View All Events](events.html)**`;
  }

  // ── Weekend / date range queries ──
  if (msg.includes("weekend") || msg.includes("this weekend") || msg.includes("next weekend")) {
    const now = new Date();
    const day = now.getDay();
    const daysUntilFriday = ((5 - day) + 7) % 7;
    const nextFriday = new Date(now);
    nextFriday.setDate(now.getDate() + daysUntilFriday);
    const nextSunday = new Date(nextFriday);
    nextSunday.setDate(nextFriday.getDate() + 2);

    const weekendEvents = events.filter((e) => {
      const eventDate = new Date(e.date);
      return eventDate >= nextFriday && eventDate <= nextSunday;
    });

    if (weekendEvents.length) {
      return listCards(weekendEvents, `📅 **This Weekend's Events (${weekendEvents.length}):**`);
    }
    const upcomingHackathons = events.filter((e) => e.tags.includes("hackathon") || e.title.toLowerCase().includes("hackathon"));
    return `📅 **No events are scheduled for this weekend.** Here are the nearest upcoming hackathons instead:\n\n` +
      upcomingHackathons.map(e => `• **${e.title}** — ${e.date} at ${e.venue}, ${e.college}`).join("\n") +
      `\n\n👉 Ask me for more details about any event.`;
  }

  // ── Beginner / first-year support queries ──
  if (msg.includes("1st-year") || msg.includes("1st year") || msg.includes("first-year") || msg.includes("first year") || msg.includes("freshman") || msg.includes("beginner")) {
    const r = events.filter((e) =>
      e.category === "Non-Technical" &&
      /(workshop|seminar|program|session)/i.test(e.title + " " + (e.description || ""))
    );
    if (r.length) {
      return listCards(r, `🎓 **Non-Technical workshops and beginner-friendly sessions:**`);
    }
  }

  // ── Venue / location queries ──
  if (msg.includes("venue") || msg.includes("location") || msg.includes("where") || msg.includes("address") || msg.includes("place")) {
    return `📍 **All Event Venues:**\n\n` +
      events.map(e => `• **${e.title}:** ${e.venue}, ${e.college}, ${e.city}`).join("\n") +
      `\n\n💡 *Arrive 15 minutes early for QR badge scanning!*`;
  }

  // ── Coordinator / contact ──
  if (msg.includes("coordinator") || msg.includes("contact") || msg.includes("organizer") || msg.includes("phone") || msg.includes("call") || msg.includes("helpline")) {
    return `📞 **Event Coordinators:**\n\n` +
      events.map(e => `• **${e.title}:** ${e.coordinator} — ${e.phone}`).join("\n") +
      `\n\n📧 General Support: events@college.edu`;
  }

  // ── Date / upcoming queries ──
  if (msg.includes("upcoming") || msg.includes("next") || msg.includes("soon") || msg.includes("date") || msg.includes("schedule") || msg.includes("when")) {
    const sorted = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
    return listCards(sorted.slice(0, 6), `📅 **Upcoming Events (sorted by date):**`);
  }

  // ── Certificate queries ──
  if (msg.includes("certificate") || msg.includes("credential") || msg.includes("credit") || msg.includes("badge")) {
    return `📜 **E-Certificates & Credit Points:**

• E-Certificates are available on your **[Dashboard](dashboard.html)** within 24–48 hours after attendance.
• Participation earns 100–250 activity credit points synced to your student profile.
• Winner & merit certificates are awarded during closing ceremonies.
• **All ${events.length} events** on Event Hub issue participation certificates!`;
  }

  // ── Registration ──
  if (msg.includes("register") || msg.includes("sign up") || msg.includes("enroll") || msg.includes("how to join") || msg.includes("join")) {
    return `📝 **How to Register for an Event:**

1. Go to the **[Events Page](events.html)**
2. Browse or search for your event
3. Click the event card → Click **"Register Now"**
4. Fill in your student details and submit
5. Track registrations on your **[Dashboard](dashboard.html)**

💡 *Some events require team registration. Check event details for team size.*`;
  }

  // ── Fee queries ──
  if (msg.includes("fee") || msg.includes("cost") || msg.includes("paid") || msg.includes("free") || msg.includes("ticket") || msg.includes("price")) {
    return `💳 **Registration Fees:**

✅ All ${events.length} events on Event Hub are **FREE** for enrolled students with a valid college ID.
Some premium events may require a nominal fee — check the individual event page on **[Events](events.html)**.`;
  }

  // ── Show all events ──
  if (msg.includes("all event") || msg.includes("list event") || msg.includes("show all") || msg.includes("every event") || msg.includes("show event")) {
    return listCards(events, `📋 **All ${events.length} Events on Event Hub:**`);
  }

  // ── Greeting / help ──
  if (msg.length < 6 || msg.includes("hello") || msg.includes("hi") || msg.includes("hey") || msg.includes("help") || msg === "?") {
    return `👋 Hi! I'm your **Event Hub AI Assistant** — I know everything about all **${events.length} events**!

**Try asking me:**
• *"Events in Chennai"* or *"Coimbatore events"*
• *"Show me hackathons"* or *"Python events"*
• *"Non-technical events"* or *"Technical events"*
• *"Which events have cash prizes?"*
• *"Who is the coordinator for AI Seminar?"*
• *"Events at IIT Madras"* or *"PSG events"*
• *"Upcoming events"* or *"Team-based events"*

What would you like to know? 🚀`;
  }

  // ── Fuzzy keyword match (last resort) ──
  const words = msg.split(/\s+/).filter(w => w.length > 3);
  const fuzzy = events.filter(e => {
    const corpus = [e.title, e.city, e.college, e.category, ...e.tags].join(" ").toLowerCase();
    return words.some(w => corpus.includes(w));
  });
  if (fuzzy.length) return listCards(fuzzy, `🔍 **Found ${fuzzy.length} event(s) matching "${userMessage}":**`);

  // ── Ultimate fallback: show all ──
  const sorted = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
  return `🤔 I couldn't find a specific match for **"${userMessage}"**. Here are all our events:\n\n` +
    sorted.map(e => `• **${e.title}** | ${e.date} | ${e.city} | ${e.category}`).join("\n") +
    `\n\nTry asking by **city**, **college**, **category**, or **topic**! 😊`;
}

// ── ASSISTANT UI ───────────────────────────────────────────────────────────────
function initAIAssistant() {
  if (document.getElementById("ai-chat-bubble")) return;

  document.body.insertAdjacentHTML("beforeend", `
    <button id="ai-chat-bubble" class="ai-bubble-btn" title="Ask Event AI Assistant">
      <i class="fas fa-wand-magic-sparkles"></i>
      <span class="ai-bubble-badge">AI</span>
    </button>

    <div id="ai-chat-drawer" class="ai-drawer">
      <div class="ai-drawer-header">
        <div class="ai-header-title">
          <div class="ai-avatar"><i class="fas fa-robot"></i></div>
          <div>
            <h3>Event Hub AI Assistant</h3>
            <span class="ai-status"><i class="fas fa-circle"></i> Online &amp; Ready</span>
          </div>
        </div>
        <div class="ai-header-actions">
          <button id="ai-key-btn" title="API Key Settings" class="ai-icon-btn"><i class="fas fa-key"></i></button>
          <button id="ai-close-btn" title="Close" class="ai-icon-btn"><i class="fas fa-times"></i></button>
        </div>
      </div>

      <div id="ai-key-modal" class="ai-key-modal" style="display:none;">
        <h4><i class="fas fa-cog"></i> Gemini API Settings</h4>
        <p>Enter your Google Gemini API key for cloud AI. Leave blank to use built-in smart engine.</p>
        <input type="password" id="geminiApiKeyInput" placeholder="AIzaSy..." />
        <div class="ai-modal-buttons">
          <button id="saveApiKeyBtn" class="btn btn-primary btn-sm">Save Key</button>
          <button id="closeKeyModalBtn" class="btn btn-secondary btn-sm">Cancel</button>
        </div>
      </div>

      <div id="ai-chat-body" class="ai-drawer-body">
        <div class="ai-msg bot">
          <div class="ai-msg-bubble">
            👋 Hi! I'm your <strong>Event Hub AI Concierge</strong>.<br>
            Ask me anything about our <strong>18 events</strong> — dates, venues, prizes, coordinators, cities, and more!
          </div>
        </div>
      </div>

      <div class="ai-suggestions">
        <button class="ai-chip" data-prompt="Show all upcoming events">📅 Upcoming</button>
        <button class="ai-chip" data-prompt="Show me hackathons">💻 Hackathons</button>
        <button class="ai-chip" data-prompt="Show me technical events">⚙️ Technical</button>
        <button class="ai-chip" data-prompt="Show all non-technical events">🎉 Non-Technical</button>
        <button class="ai-chip" data-prompt="Which events have cash prizes?">🏆 Prizes</button>
      </div>

      <div class="ai-drawer-footer">
        <input type="text" id="aiUserInput" placeholder="Ask about any event, city, date, prize..." />
        <button id="aiSendBtn" class="ai-send-btn"><i class="fas fa-paper-plane"></i></button>
      </div>
    </div>
  `);

  const bubble   = document.getElementById("ai-chat-bubble");
  const drawer   = document.getElementById("ai-chat-drawer");
  const closeBtn = document.getElementById("ai-close-btn");
  const keyBtn   = document.getElementById("ai-key-btn");
  const keyModal = document.getElementById("ai-key-modal");
  const keyInput = document.getElementById("geminiApiKeyInput");
  const chatBody = document.getElementById("ai-chat-body");
  const input    = document.getElementById("aiUserInput");
  const sendBtn  = document.getElementById("aiSendBtn");

  // Restore saved API key
  keyInput.value = localStorage.getItem("gemini_api_key") || "";

  bubble.addEventListener("click", () => {
    drawer.classList.toggle("open");
    if (drawer.classList.contains("open")) input.focus();
  });
  closeBtn.addEventListener("click", () => drawer.classList.remove("open"));
  keyBtn.addEventListener("click", () => {
    keyModal.style.display = keyModal.style.display === "none" ? "block" : "none";
  });
  document.getElementById("closeKeyModalBtn").addEventListener("click", () => {
    keyModal.style.display = "none";
  });
  document.getElementById("saveApiKeyBtn").addEventListener("click", () => {
    const key = keyInput.value.trim();
    localStorage.setItem("gemini_api_key", key);
    if (window.AIServices) window.AIServices.setApiKey(key);
    keyModal.style.display = "none";
    appendBot("✅ **API Key saved!** Cloud AI is now active for richer answers.");
  });

  // Markdown renderer
  const md = (t) => t
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\n/g, "<br>");

  function appendUser(msg) {
    const d = document.createElement("div");
    d.className = "ai-msg user";
    d.innerHTML = `<div class="ai-msg-bubble">${msg}</div>`;
    chatBody.appendChild(d);
    chatBody.scrollTop = chatBody.scrollHeight;
  }
  function appendBot(markdownText) {
    const d = document.createElement("div");
    d.className = "ai-msg bot";
    d.innerHTML = `<div class="ai-msg-bubble">${md(markdownText)}</div>`;
    chatBody.appendChild(d);
    chatBody.scrollTop = chatBody.scrollHeight;
  }
  function appendTyping() {
    const d = document.createElement("div");
    d.className = "ai-msg bot typing-msg";
    d.innerHTML = `<div class="ai-msg-bubble ai-typing"><span></span><span></span><span></span></div>`;
    chatBody.appendChild(d);
    chatBody.scrollTop = chatBody.scrollHeight;
    return d;
  }

  const handleSend = async (userText) => {
    const text = (userText || input.value).trim();
    if (!text) return;
    input.value = "";
    appendUser(text);
    const typing = appendTyping();

    try {
      let response = null;

      // Try Gemini cloud API via AIServices if available
      if (window.AIServices && typeof window.AIServices.queryAssistant === "function") {
        try { response = await window.AIServices.queryAssistant(text); } catch (_) { response = null; }
      }

      // Always fall back to built-in smart engine if cloud failed or no key
      if (!response) response = smartAnswer(text);

      typing.remove();
      appendBot(response);
    } catch (err) {
      typing.remove();
      // Even on unexpected error, use built-in engine
      appendBot(smartAnswer(text));
    }
  };

  sendBtn.addEventListener("click", () => handleSend());
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); handleSend(); } });
  document.querySelectorAll(".ai-chip").forEach(chip => {
    chip.addEventListener("click", () => handleSend(chip.getAttribute("data-prompt")));
  });
}

// Boot
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAIAssistant);
} else {
  initAIAssistant();
}
