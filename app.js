const STORAGE_KEY = "famelie-aura-state";

const defaultState = {
  profiles: [
    {
      id: crypto.randomUUID(),
      name: "Lena",
      age: 10,
      device: "Tablet · Schule",
      limit: 120,
      focus: "Hausaufgaben 90 min",
      mood: "ruhig",
      risk: "niedrig",
    },
    {
      id: crypto.randomUUID(),
      name: "Jonas",
      age: 13,
      device: "Smartphone · Freizeit",
      limit: 150,
      focus: "Social 45 min",
      mood: "aktiv",
      risk: "mittel",
    },
    {
      id: crypto.randomUUID(),
      name: "Mila",
      age: 7,
      device: "Smartwatch · Outdoor",
      limit: 60,
      focus: "Spielzeit 30 min",
      mood: "sicher",
      risk: "niedrig",
    },
  ],
  quickActions: [
    {
      id: "content",
      icon: "🛡️",
      title: "Inhaltsfilter",
      description: "Ki-gestützte Filter für sensible Inhalte und Apps.",
      status: "aktiv",
    },
    {
      id: "geo",
      icon: "📍",
      title: "Geo-Tracking",
      description: "Zonen definieren und automatische Benachrichtigungen erhalten.",
      status: "aktiv",
    },
    {
      id: "sleep",
      icon: "🌙",
      title: "Schlafenszeit",
      description: "Geräte automatisch in den Ruhemodus versetzen.",
      status: "geplant",
    },
    {
      id: "trust",
      icon: "💬",
      title: "Vertrauenschat",
      description: "Diskrete Nachrichten bei Sicherheitsbedenken.",
      status: "aktiv",
    },
  ],
  rules: [
    {
      id: crypto.randomUUID(),
      title: "Bildschirmzeit",
      audience: "Alle Geräte",
      detail: "Max. 2h/Tag, Wochenendbonus +30 min",
      status: true,
    },
    {
      id: crypto.randomUUID(),
      title: "App-Freigaben",
      audience: "Jonas · Smartphone",
      detail: "Neue Apps benötigen Elternfreigabe",
      status: true,
    },
    {
      id: crypto.randomUUID(),
      title: "Safe Search",
      audience: "Lena · Tablet",
      detail: "Filter für Websuche + YouTube Kids Mode",
      status: true,
    },
    {
      id: crypto.randomUUID(),
      title: "SOS-Kontakte",
      audience: "Mila · Smartwatch",
      detail: "Nur gespeicherte Kontakte erreichbar",
      status: false,
    },
  ],
  insights: [
    {
      id: "score",
      title: "Sicherheits-Score",
      value: "92%",
      description: "Keine kritischen Vorfälle in 7 Tagen",
      progress: 92,
    },
    {
      id: "mood",
      title: "Stimmungsbarometer",
      value: "Stabil",
      description: "Leichte Stressspitze am Dienstag",
      progress: 78,
    },
    {
      id: "risk",
      title: "Online-Risiken",
      value: "Niedrig",
      description: "2 blockierte Inhalte, 0 Chats außerhalb",
      progress: 18,
    },
    {
      id: "family",
      title: "Familienzeit",
      value: "+45 min",
      description: "Mehr Offline-Zeit im Vergleich zur Vorwoche",
      progress: 64,
    },
  ],
};

const state = loadState();

const profileContainer = document.querySelector("#profiles");
const actionContainer = document.querySelector("#quick-actions");
const ruleContainer = document.querySelector("#rules");
const insightContainer = document.querySelector("#insights");
const statusPill = document.querySelector("#system-status");
const toast = document.querySelector("#toast");

const profileModal = document.querySelector("#profile-modal");
const ruleModal = document.querySelector("#rule-modal");
const profileForm = document.querySelector("#profile-form");
const ruleForm = document.querySelector("#rule-form");

const addProfileBtn = document.querySelector("#add-profile");
const addRuleBtn = document.querySelector("#add-rule");
const refreshInsightsBtn = document.querySelector("#refresh-insights");

const exportBtn = document.querySelector("#export-report");
const emergencyBtn = document.querySelector("#activate-emergency");
const supportBtn = document.querySelector("#support-chat");
const safetyBtn = document.querySelector("#run-safety-check");

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    return JSON.parse(saved);
  }
  return structuredClone(defaultState);
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  updateStatus();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

function updateStatus() {
  const deviceCount = state.profiles.length;
  statusPill.innerHTML = `
    <span class="dot" aria-hidden="true"></span>
    Schutz aktiv · ${deviceCount} Geräte verbunden
  `;
}

function tagClassForRisk(risk) {
  if (risk === "hoch") return "danger";
  if (risk === "mittel") return "warning";
  return "";
}

function renderProfiles() {
  profileContainer.innerHTML = "";
  state.profiles.forEach((profile) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div>
        <h3>${profile.name} (${profile.age})</h3>
        <p>${profile.device}</p>
        <p><strong>${profile.focus}</strong></p>
      </div>
      <div class="card-footer">
        <span class="tag ${tagClassForRisk(profile.risk)}">${profile.mood}</span>
        <button class="btn ghost" data-remove-profile="${profile.id}">Entfernen</button>
      </div>
      <p class="rule-meta">Tageslimit: ${profile.limit} Min</p>
    `;
    profileContainer.appendChild(card);
  });
}

function renderActions() {
  actionContainer.innerHTML = "";
  state.quickActions.forEach((action) => {
    const tile = document.createElement("article");
    tile.className = "action-tile";
    tile.innerHTML = `
      <div class="action-icon">${action.icon}</div>
      <div>
        <h3>${action.title}</h3>
        <p>${action.description}</p>
      </div>
      <div class="action-footer">
        <span class="tag">${action.status}</span>
        <button class="btn ghost" data-action="${action.id}">Toggle</button>
      </div>
    `;
    actionContainer.appendChild(tile);
  });
}

function renderRules() {
  ruleContainer.innerHTML = "";
  state.rules.forEach((rule) => {
    const card = document.createElement("article");
    card.className = "rule-card";
    card.innerHTML = `
      <div class="rule-header">
        <div>
          <h3>${rule.title}</h3>
          <p class="rule-meta">${rule.audience}</p>
        </div>
        <button class="toggle ${rule.status ? "active" : ""}" data-toggle="${rule.id}"></button>
      </div>
      <p>${rule.detail}</p>
    `;
    ruleContainer.appendChild(card);
  });
}

function renderInsights() {
  insightContainer.innerHTML = "";
  state.insights.forEach((insight) => {
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
}

function renderAll() {
  renderProfiles();
  renderActions();
  renderRules();
  renderInsights();
  updateStatus();
}

function closeModal(modal) {
  modal.close();
}

function openModal(modal) {
  modal.showModal();
}

addProfileBtn.addEventListener("click", () => {
  profileForm.reset();
  openModal(profileModal);
});

addRuleBtn.addEventListener("click", () => {
  ruleForm.reset();
  openModal(ruleModal);
});

profileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(profileForm);
  const profile = {
    id: crypto.randomUUID(),
    name: formData.get("name"),
    age: Number(formData.get("age")),
    device: formData.get("device"),
    limit: Number(formData.get("limit")),
    focus: formData.get("focus"),
    mood: "neu",
    risk: "niedrig",
  };
  state.profiles.push(profile);
  saveState();
  renderProfiles();
  showToast("Profil gespeichert.");
  closeModal(profileModal);
});

ruleForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(ruleForm);
  state.rules.push({
    id: crypto.randomUUID(),
    title: formData.get("title"),
    audience: formData.get("audience"),
    detail: formData.get("detail"),
    status: true,
  });
  saveState();
  renderRules();
  showToast("Regel gespeichert.");
  closeModal(ruleModal);
});

profileContainer.addEventListener("click", (event) => {
  const target = event.target.closest("[data-remove-profile]");
  if (!target) return;
  const profileId = target.dataset.removeProfile;
  state.profiles = state.profiles.filter((profile) => profile.id !== profileId);
  saveState();
  renderProfiles();
  showToast("Profil entfernt.");
});

ruleContainer.addEventListener("click", (event) => {
  const toggle = event.target.closest("[data-toggle]");
  if (!toggle) return;
  const rule = state.rules.find((item) => item.id === toggle.dataset.toggle);
  if (!rule) return;
  rule.status = !rule.status;
  saveState();
  renderRules();
  showToast(`Regel ${rule.status ? "aktiviert" : "deaktiviert"}.`);
});

actionContainer.addEventListener("click", (event) => {
  const actionBtn = event.target.closest("[data-action]");
  if (!actionBtn) return;
  const action = state.quickActions.find((item) => item.id === actionBtn.dataset.action);
  if (!action) return;
  action.status = action.status === "aktiv" ? "pausiert" : "aktiv";
  saveState();
  renderActions();
  showToast(`${action.title} ${action.status}.`);
});

refreshInsightsBtn.addEventListener("click", () => {
  state.insights = state.insights.map((insight) => ({
    ...insight,
    progress: Math.min(100, Math.max(10, insight.progress + (Math.random() * 20 - 10))),
  }));
  saveState();
  renderInsights();
  showToast("Insights aktualisiert.");
});

[exportBtn, emergencyBtn, supportBtn, safetyBtn].forEach((btn) => {
  btn.addEventListener("click", () => {
    showToast(`${btn.textContent} wird vorbereitet.`);
  });
});

[profileModal, ruleModal].forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal(modal);
  });
});

document.querySelectorAll("[data-close]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.close;
    if (target === "profile") closeModal(profileModal);
    if (target === "rule") closeModal(ruleModal);
  });
});

renderAll();
