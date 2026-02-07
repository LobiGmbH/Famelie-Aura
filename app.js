const profiles = [
  {
    name: "Lena (10)",
    device: "Tablet · Schule",
    mood: "ruhig",
    focus: "Hausaufgaben 90 min",
  },
  {
    name: "Jonas (13)",
    device: "Smartphone · Freizeit",
    mood: "aktiv",
    focus: "Social 45 min",
  },
  {
    name: "Mila (7)",
    device: "Smartwatch · Outdoor",
    mood: "sicher",
    focus: "Spielzeit 30 min",
  },
];

const quickActions = [
  {
    icon: "🛡️",
    title: "Inhaltsfilter",
    description: "Ki-gestützte Filter für sensible Inhalte und Apps.",
  },
  {
    icon: "📍",
    title: "Geo-Tracking",
    description: "Zonen definieren und automatische Benachrichtigungen erhalten.",
  },
  {
    icon: "🌙",
    title: "Schlafenszeit",
    description: "Geräte automatisch in den Ruhemodus versetzen.",
  },
  {
    icon: "💬",
    title: "Vertrauenschat",
    description: "Diskrete Nachrichten bei Sicherheitsbedenken.",
  },
];

const rules = [
  {
    title: "Bildschirmzeit",
    audience: "Alle Geräte",
    detail: "Max. 2h/Tag, Wochenendbonus +30 min",
    status: "active",
  },
  {
    title: "App-Freigaben",
    audience: "Jonas · Smartphone",
    detail: "Neue Apps benötigen Elternfreigabe",
    status: "active",
  },
  {
    title: "Safe Search",
    audience: "Lena · Tablet",
    detail: "Filter für Websuche + YouTube Kids Mode",
    status: "active",
  },
  {
    title: "SOS-Kontakte",
    audience: "Mila · Smartwatch",
    detail: "Nur gespeicherte Kontakte erreichbar",
    status: "inactive",
  },
];

const insights = [
  {
    title: "Sicherheits-Score",
    value: "92%",
    description: "Keine kritischen Vorfälle in 7 Tagen",
    progress: 92,
  },
  {
    title: "Stimmungsbarometer",
    value: "Stabil",
    description: "Leichte Stressspitze am Dienstag",
    progress: 78,
  },
  {
    title: "Online-Risiken",
    value: "Niedrig",
    description: "2 blockierte Inhalte, 0 Chats außerhalb",
    progress: 18,
  },
  {
    title: "Familienzeit",
    value: "+45 min",
    description: "Mehr Offline-Zeit im Vergleich zur Vorwoche",
    progress: 64,
  },
];

const profileContainer = document.querySelector("#profiles");
const actionContainer = document.querySelector("#quick-actions");
const ruleContainer = document.querySelector("#rules");
const insightContainer = document.querySelector("#insights");

profiles.forEach((profile) => {
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `
    <h3>${profile.name}</h3>
    <p>${profile.device}</p>
    <p><strong>${profile.focus}</strong></p>
    <span class="tag">${profile.mood}</span>
  `;
  profileContainer.appendChild(card);
});

quickActions.forEach((action) => {
  const tile = document.createElement("article");
  tile.className = "action-tile";
  tile.innerHTML = `
    <div class="action-icon">${action.icon}</div>
    <div>
      <h3>${action.title}</h3>
      <p>${action.description}</p>
    </div>
  `;
  actionContainer.appendChild(tile);
});

rules.forEach((rule) => {
  const card = document.createElement("article");
  card.className = "rule-card";
  card.innerHTML = `
    <div class="rule-header">
      <div>
        <h3>${rule.title}</h3>
        <p class="rule-meta">${rule.audience}</p>
      </div>
      <div class="toggle ${rule.status === "active" ? "active" : ""}"></div>
    </div>
    <p>${rule.detail}</p>
  `;
  ruleContainer.appendChild(card);
});

insights.forEach((insight) => {
  const card = document.createElement("article");
  card.className = "insight-card";
  card.innerHTML = `
    <h3>${insight.title}</h3>
    <p><strong>${insight.value}</strong></p>
    <p>${insight.description}</p>
    <div class="insight-bar"><span style="width: ${insight.progress}%"></span></div>
  `;
  insightContainer.appendChild(card);
});
