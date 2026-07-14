const CONFIG = {
  name: "Кошелев Роман",
  email: "rkoshelev2001@gmail.com",
  github: "https://github.com/Roma-jpg",
  projects: [
    {
      id: "cunt",
      number: "01",
      category: "hardware",
      title: "CUNT",
      subtitle: "CAN Utility aNd Tool",
      glyph: "C",
      type: "EMBEDDED / AUTOMOTIVE",
      year: "2026",
      description: "Карманный CAN-инструмент на ESP32-S3: чтение шин, логирование, OLED-интерфейс, microSD и собственное управление. Проект строится как практический набор инструментов для исследования автомобильной электроники.",
      proof: "Полная связка железа, firmware, интерфейса и работы с реальным протоколом в одном устройстве.",
      tags: ["ESP32-S3", "CAN", "C++", "OLED", "microSD"],
      status: "ACTIVE BUILD",
      images: [
        { src: "assets/projects/cunt-cover.svg", alt: "Концепт интерфейса CAN Utility aNd Tool" }
      ]
    },
    {
      id: "keyflow",
      number: "02",
      category: "flipper",
      title: "KEYFLOW",
      subtitle: "Автоматизация работы с ключами",
      glyph: "K",
      type: "FLIPPER ZERO / WORKFLOW",
      year: "2026",
      description: "Связка приложений для Flipper Zero, которая считывает UID, передаёт данные в таблицу через HID и ускоряет повторяющиеся операции. Главная цель - убрать ручную рутину и сделать процесс наблюдаемым.",
      proof: "Embedded-приложение, HID и таблица работают как единая система автоматизации.",
      tags: ["Flipper Zero", "NFC", "HID", "C", "Automation"],
      status: "WORKING PROTOTYPE",
      images: [
        { src: "assets/projects/keyflow-cover.svg", alt: "Визуализация проекта Keyflow" }
      ]
    },
    {
      id: "scheduler",
      number: "03",
      category: "software",
      title: "ADVANCED SCHEDULER",
      subtitle: "Условия, правила и действия",
      glyph: "A",
      type: "WINDOWS / SYSTEM TOOL",
      year: "2026",
      description: "Нативный планировщик на Rust, где автоматизация собирается из условий и действий: процессы, файлы, время, бездействие, запуск команд и управление системой. Не просто таймер, а небольшой движок правил.",
      proof: "Архитектура из наблюдателей, условий и действий вместо набора жёстко прописанных сценариев.",
      tags: ["Rust", "Windows", "JSON", "Automation", "Native"],
      status: "IN DEVELOPMENT",
      images: [
        { src: "assets/projects/scheduler-cover.svg", alt: "Схема движка правил Advanced Scheduler" }
      ]
    },
    {
      id: "painter",
      number: "04",
      category: "hardware",
      title: "OLED PAINTER",
      subtitle: "Браузер рисует на микроконтроллере",
      glyph: "O",
      type: "ESP32 / WEB INTERFACE",
      year: "2026",
      description: "ESP32-S3 поднимает HTTP-сервер и превращает браузер в пульт рисования для SSD1306. Состояние отправляется на плату в реальном времени, а устройство отвечает звуком и анимацией.",
      proof: "Браузер, сеть, firmware, дисплей и физическая обратная связь собраны в единый интерактивный продукт.",
      tags: ["ESP-IDF", "HTTP", "SSD1306", "JavaScript", "I2C"],
      status: "COMPLETE",
      images: [
        { src: "assets/projects/painter-cover.svg", alt: "Интерфейс проекта OLED Painter" }
      ]
    },
    {
      id: "web",
      number: "05",
      category: "software",
      title: "ЭТОТ САЙТ",
      subtitle: "Интерактивная визитка и браузерная romeoOS",
      glyph: "R",
      type: "WEB / PERSONAL PORTFOLIO",
      year: "2026",
      description: "Этот сайт - самостоятельный проект на чистых HTML, CSS и JavaScript. Он объединяет адаптивную визитку, интерактивное портфолио, глобально отслеживающую курсор ID-карту и полноценную игрушечную Unix-среду внутри терминала.",
      proof: "Показывает, как я проектирую нестандартный UX, собираю сложную клиентскую логику без фреймворков и довожу техническую идею до цельного продукта.",
      tags: ["HTML", "CSS", "JavaScript", "UX", "Virtual FS"],
      status: "LIVE",
      images: [
        { src: "assets/projects/web-cover.svg", alt: "Интерактивный сайт-портфолио Кошелева Романа" }
      ]
    }
  ]
};

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(pointer: fine)").matches;

// Boot sequence
const bootScreen = $("#boot-screen");
const bootLog = $("#boot-log");
const bootLines = [
  "[ OK ] loading identity: KOSHELEV_ROMAN",
  "[ OK ] indexing selected work",
  "[ OK ] connecting contact endpoints",
  "[ OK ] viewport tracking ready",
  "[ OK ] portfolio online"
];

function getBootState() {
  try { return sessionStorage.getItem("koshelevBooted"); }
  catch (_) { return null; }
}

function saveBootState() {
  try { sessionStorage.setItem("koshelevBooted", "1"); }
  catch (_) {}
}

function finishBoot() {
  bootScreen.classList.add("done");
  document.body.classList.remove("booting");
  saveBootState();
}

document.body.classList.add("booting");
if (getBootState() || reducedMotion) {
  bootLines.forEach(line => bootLog.insertAdjacentHTML("beforeend", `<div>${line.replace("OK", "<b>OK</b>")}</div>`));
  finishBoot();
} else {
  bootLines.forEach((line, index) => {
    setTimeout(() => {
      bootLog.insertAdjacentHTML("beforeend", `<div>${line.replace("OK", "<b>OK</b>")}</div>`);
      if (index === bootLines.length - 1) setTimeout(finishBoot, 420);
    }, 250 + index * 250);
  });
}
$("#skip-boot").addEventListener("click", finishBoot);

// Cursor light, global card tracking and magnetic buttons
const identityCard = $("#identity-card");
let targetRX = 0;
let targetRY = 0;
let currentRX = 0;
let currentRY = 0;

function animateCardTilt() {
  currentRX += (targetRX - currentRX) * 0.085;
  currentRY += (targetRY - currentRY) * 0.085;
  identityCard.style.setProperty("--card-rx", `${currentRX.toFixed(3)}deg`);
  identityCard.style.setProperty("--card-ry", `${currentRY.toFixed(3)}deg`);
  requestAnimationFrame(animateCardTilt);
}

window.addEventListener("pointermove", event => {
  document.documentElement.style.setProperty("--mouse-x", `${event.clientX}px`);
  document.documentElement.style.setProperty("--mouse-y", `${event.clientY}px`);

  if (finePointer && !reducedMotion) {
    const nx = event.clientX / innerWidth - 0.5;
    const ny = event.clientY / innerHeight - 0.5;
    targetRX = Math.max(-6, Math.min(6, ny * -10));
    targetRY = Math.max(-8, Math.min(8, nx * 13));
  }
}, { passive: true });

window.addEventListener("blur", () => { targetRX = 0; targetRY = 0; });
document.documentElement.addEventListener("mouseleave", () => { targetRX = 0; targetRY = 0; });
if (finePointer && !reducedMotion) animateCardTilt();

if (finePointer && !reducedMotion) {
  $$(".magnetic").forEach(element => {
    element.addEventListener("pointermove", event => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      element.style.transform = `translate(${x * .09}px, ${y * .09}px)`;
    });
    element.addEventListener("pointerleave", () => { element.style.transform = ""; });
  });
}

// Scramble headline
function scramble(element) {
  if (!element || reducedMotion) return;
  const finalText = element.dataset.text;
  const chars = "01<>/{}[]#$%&*";
  let frame = 0;
  const total = finalText.length * 3;
  const timer = setInterval(() => {
    element.textContent = finalText.split("").map((char, index) => {
      if (char === " ") return " ";
      if (index * 3 < frame) return char;
      return chars[Math.floor(Math.random() * chars.length)];
    }).join("");
    frame += 1;
    if (frame > total) {
      clearInterval(timer);
      element.textContent = finalText;
    }
  }, 32);
}
setTimeout(() => scramble($(".scramble")), 1350);

// Uptime
const startedAt = Date.now();
setInterval(() => {
  const seconds = Math.floor((Date.now() - startedAt) / 1000);
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  $("#uptime").textContent = `${h}:${m}:${s}`;
}, 1000);

// Draggable core
const core = $("#machine-core");
let dragging = false;
let origin = { x: 0, y: 0 };
let corePosition = { x: 0, y: 0 };

core.addEventListener("pointerdown", event => {
  dragging = true;
  origin = { x: event.clientX - corePosition.x, y: event.clientY - corePosition.y };
  core.setPointerCapture(event.pointerId);
});

core.addEventListener("pointermove", event => {
  if (!dragging) return;
  corePosition.x = Math.max(-92, Math.min(92, event.clientX - origin.x));
  corePosition.y = Math.max(-68, Math.min(68, event.clientY - origin.y));
  core.style.transform = `translate(${corePosition.x}px, ${corePosition.y}px) rotate(${corePosition.x * .07}deg)`;
});

function releaseCore() {
  if (!dragging) return;
  dragging = false;
  core.animate([
    { transform: `translate(${corePosition.x}px, ${corePosition.y}px) rotate(${corePosition.x * .07}deg)` },
    { transform: "translate(0,0) rotate(0)" }
  ], { duration: 700, easing: "cubic-bezier(.18,.9,.25,1.25)" });
  core.style.transform = "";
  corePosition = { x: 0, y: 0 };
}
core.addEventListener("pointerup", releaseCore);
core.addEventListener("pointercancel", releaseCore);

// Reveal
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .12 });
$$(".reveal").forEach(element => revealObserver.observe(element));

// Portfolio
const projectList = $("#project-list");
const projectPreview = $("#project-preview");
let selectedProject = null;
let currentFilter = "all";
let activeImageIndex = 0;

function renderProjects(filter = "all") {
  currentFilter = filter;
  const projects = CONFIG.projects.filter(project => filter === "all" || project.category === filter);

  projectList.innerHTML = projects.map(project => `
    <button class="project-item ${selectedProject === project.id ? "active" : ""}" data-project="${project.id}" type="button">
      <span class="project-number">${project.number}</span>
      <span class="project-main"><strong>${project.title}</strong><span>${project.subtitle}</span></span>
      <span class="project-arrow">↗</span>
    </button>
  `).join("");

  $$(".project-item", projectList).forEach(button => {
    button.addEventListener("click", () => selectProject(button.dataset.project));
  });

  if (!projects.some(project => project.id === selectedProject)) {
    selectProject(projects[0]?.id, false);
  }
}

function mediaMarkup(project) {
  const images = project.images?.length ? project.images : [];
  const first = images[0];
  return `
    <figure class="project-media" data-glyph="${project.glyph}">
      ${first ? `<img id="project-main-image" src="${first.src}" alt="${first.alt || project.title}" />` : `<img id="project-main-image" hidden alt="" />`}
      <div class="project-media-fallback"><strong>${project.glyph}</strong></div>
      <figcaption class="media-label">PROJECT VISUAL / ${project.number}</figcaption>
      ${images.length > 1 ? `<div class="project-thumbnails">${images.map((image, index) => `
        <button class="project-thumb ${index === 0 ? "active" : ""}" data-image-index="${index}" type="button" aria-label="Показать изображение ${index + 1}">
          <img src="${image.src}" alt="" />
        </button>
      `).join("")}</div>` : ""}
    </figure>
  `;
}

function bindProjectMedia(project) {
  const mainImage = $("#project-main-image");
  if (mainImage) {
    mainImage.addEventListener("error", () => { mainImage.hidden = true; });
  }

  $$(".project-thumb").forEach(button => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.imageIndex);
      const image = project.images[index];
      if (!image || !mainImage) return;
      activeImageIndex = index;
      mainImage.hidden = false;
      mainImage.src = image.src;
      mainImage.alt = image.alt || project.title;
      $$(".project-thumb").forEach(thumb => thumb.classList.toggle("active", thumb === button));
    });
  });
}

function selectProject(id, rerender = true) {
  const project = CONFIG.projects.find(item => item.id === id);
  if (!project) return;
  selectedProject = id;
  activeImageIndex = 0;
  if (rerender) renderProjects(currentFilter);

  projectPreview.innerHTML = `
    <article class="preview-content">
      ${mediaMarkup(project)}
      <div class="preview-meta"><span>${project.type}</span><span>${project.year}</span></div>
      <div class="preview-copy">
        <h3>${project.title}</h3>
        <div>
          <p>${project.description}</p>
          <div class="preview-proof"><span>WHAT THIS PROVES</span><strong>${project.proof}</strong></div>
        </div>
      </div>
      <div class="preview-footer">
        <div class="preview-tags">${project.tags.map(tag => `<span>${tag}</span>`).join("")}</div>
        <div class="preview-status"><span>STATUS</span><b>${project.status}</b></div>
      </div>
    </article>
  `;
  bindProjectMedia(project);
}

$$(".filter-chip").forEach(button => {
  button.addEventListener("click", () => {
    $$(".filter-chip").forEach(chip => chip.classList.remove("active"));
    button.classList.add("active");
    selectedProject = null;
    renderProjects(button.dataset.filter);
  });
});
renderProjects();

// Terminal and virtual filesystem
const terminalModal = $("#terminal-modal");
const terminalWindow = $(".terminal-window");
const terminalOutput = $("#terminal-output");
const terminalInput = $("#terminal-input");
const terminalForm = $("#terminal-form");
const terminalPath = $("#terminal-path");
const terminalUser = $("#terminal-user");
const terminalSubtitle = $("#terminal-subtitle");
const terminalModeStatus = $("#terminal-mode-status");
const terminalRailLabel = $(".terminal-rail > span");
const terminalRailButtons = $$(".terminal-rail button");
const terminalEditor = $("#terminal-editor");
const terminalEditorPath = $("#terminal-editor-path");
const terminalEditorText = $("#terminal-editor-text");
const terminalEditorSave = $("#terminal-editor-save");
const terminalEditorClose = $("#terminal-editor-close");
const terminalPager = $("#terminal-pager");
const terminalPagerPath = $("#terminal-pager-path");
const terminalPagerContent = $("#terminal-pager-content");
const terminalPagerClose = $("#terminal-pager-close");
const corruptionScreen = $("#corruption-screen");
const corruptionCountdown = $("#corruption-countdown");
const corruptionNoise = $("#corruption-noise");
const recoveryPanel = $("#recovery-panel");
const recoveryLog = $("#recovery-log");
const recoveryProgress = $("#recovery-progress");

const FS_STORAGE_KEY = "romeoOS.virtualFS.v3";
const ALIAS_STORAGE_KEY = "romeoOS.aliases.v1";
const shellStartedAt = Date.now();
const commandHistory = [];
let historyIndex = 0;
let shellMode = "portfolio";
let debugReturnMode = "filesystem";
let currentPath = [];
let recoveryTimers = [];
let editorTargetPath = null;
let aliases = loadAliases();
const shellEnv = {
  USER: "guest",
  HOME: "/home/guest",
  SHELL: "/bin/bash",
  HOSTNAME: "romeo558.ru",
  TERM: "xterm-256color",
  THEME: "Dark",
  PATH: "/usr/local/bin:/usr/bin:/bin"
};

function nowISO() {
  return new Date().toISOString();
}

function makeFile(content = "", mode = "-rw-r--r--") {
  const stamp = nowISO();
  return { type: "file", mode, content, created: stamp, modified: stamp };
}

function makeDir(children = {}, mode = "drwxr-xr-x") {
  const stamp = nowISO();
  return { type: "dir", mode, children, created: stamp, modified: stamp };
}

function createDefaultFS() {
  return makeDir({
    "welcome.txt": makeFile("Здравствуй, любопытный пользователь!\nЭта виртуальная машина полностью в вашем распоряжении. Пожалуйста, не сломай ничего и постарайся не удалять корневые каталоги (это опционально)."),
    "available_commands.txt": makeFile("touch, mkdir, rm, nano, chmod, alias, env, find, grep, neofetch\n\nls, cd, pwd, cat, less, tree, find, grep, echo, clear, whoami, hostname, date, uptime, history, alias, env, export, which, file, stat, wc, head, tail\n\nping, nmap, cowsay, debug"),
    projects: makeDir({
      "cunt.txt": makeFile("CUNT - CAN Utility aNd Tool\n\nМой проект портативного инструмента для работы с автомобильной CAN-шиной.\nМне хотелось получить устройство, с помощью которого можно подключаться к автомобильной электронике, просматривать CAN-пакеты, сохранять их, отправлять их и анализировать без использования дорогущего оборудования. \nПоэтому я решил собрать собственное устройство на ESP32-S3. Оно объединяет работу с CAN-шиной, OLED-интерфейс, управление с физических кнопок, запись данных на microSD и собственную прошивку."),
      "keyflow.txt": makeFile("Keyflow - мой проект по автоматизации копирования ключей в память домофона.\nПередо мной поставили задачу - записать в память домофона в общей сумме 180 ключей и сделать таблицу всех ключей.\nЯ бы мог делать всё вручную, переписывать UID каждого ключа в таблицу, делая неизбежные ошибки, я бы мог бегать туда-сюда с ключами и каждый подносить к считывателю домофона, но я решил автоматизировать процесс с помощью Flipper Zero.\nНе вижу смысла делиться логикой работы моего изобретения, но оно сократило время работы в 45 раз и сократило ошибки на все 100. "),
      "oled.txt": makeFile("OLED Painter - мой эксперимент по объединению браузерного интерфейса и физического устройства на ESP32-S3.\n\nПри подключении платы к питанию она создаёт WiFi точку доступа с веб-интерфейсом. Передача данных между устройствами происходит в реальном времени. Можно рисовать на телефоне/компьютере и сразу видеть рисунок на экране устройства."),
      "scheduler.txt": makeFile("Advanced Scheduler - мой проект расширенного планировщика задач для Windows, написанного на Rust.\n\nОбычные планировщики уже умеют запускать программу в определённое время, но этого не хватет, когда действие должно зависеть сразу от нескольких условий: запущенного процесса, состояния файла, времени, бездействия пользователя или других событий в системе.\nПоэтому я решил создать свой, универсальный движок правил. В нём пользователь собирает автоматизацию из условий и действий: наблюдение за процессами и файлами, запуск команд, управление программами, эмуляция ввода и выполнение системных операций и получает желаемый результат. \nПример: Запускать Telegram.exe как только запустится Happ.exe и пройдёт 8 секунд."),
      "this-site.txt": makeFile("Этот сайт - интерактивная визитка Кошелева Романа, собранная на чистых HTML, CSS и JavaScript.\n\nВнутри: адаптивное портфолио, интерактивная ID-карта, терминал, записываемая виртуальная файловая система, nano, neofetch, debug-консоль и аварийное самовосстановление интерфейса.")
    }),
    stuff: makeDir({
      "TODO.txt": makeFile("- исправить мобильную верстку\n- удалить интерфейс отладки\n- перестать выпускать недоработанный код\n- не забыть купить молоко\n- опять переписать парсер терминала\n- не забыть удалить этот файл перед релизом"),
      "benchmark.log": makeFile("graphics preset: potato\n\nnotepad.exe - 3 FPS\ncalc.exe - 2 FPS + просадки\nGTAVI.exe - -330 FPS (комп в долг ушёл короче)"),
      "passwords.txt": makeFile("12345678")
    }),
    home: makeDir({
      guest: makeDir({
        ".profile": makeFile("USER=guest\nHOSTNAME=romeo558.ru\nSHELL=/bin/bash\nHOME=/home/guest\nCHANNEL=558", "-rw-r-----")
      })
    }),
    system: makeDir({
      "identity.conf": makeFile("NAME=Кошелев Роман\nROLE=Developer + Engineer\nFOCUS=Web, System Tools, Embedded\nLOCATION=Kazan\nSTATUS=Open to interesting builds", "-r--r--r--"),
      "contact.conf": makeFile([
        `EMAIL=${CONFIG.email}`,
        `GITHUB=${CONFIG.github}`,
        "HOST=romeo558.ru"
      ].join("\n"), "-r--r--r--"),
      boot: makeDir({
        manifest: makeFile("boot-drive=/dev/portfolio0\nkernel=6.6.0-portfolio\nrecovery-kernel=enabled\njournal=mirrored\nroot-protection=questionable", "-r--r--r--")
      })
    }),
    var: makeDir({
      log: makeDir({
        "build.log": makeFile("portfolio shell initialized\nvirtual filesystem mounted read-write\ncustom filesystem image loaded\nrecovery kernel armed\nawaiting curious visitor"),
        "access.log": makeFile("guest session accepted\nprivilege level: harmless curiosity")
      })
    })
  });
}

function normalizeMetadata(node) {
  if (!node || !["file", "dir"].includes(node.type)) return null;
  const stamp = nowISO();
  node.created ||= stamp;
  node.modified ||= node.created;
  node.mode ||= node.type === "dir" ? "drwxr-xr-x" : "-rw-r--r--";
  if (node.type === "file") node.content = String(node.content ?? "");
  if (node.type === "dir") {
    node.children ||= {};
    Object.values(node.children).forEach(normalizeMetadata);
  }
  return node;
}

function loadVirtualFS() {
  try {
    const stored = JSON.parse(localStorage.getItem(FS_STORAGE_KEY));
    if (stored?.type === "dir") return normalizeMetadata(stored);
  } catch (_) {}
  return createDefaultFS();
}

function saveVirtualFS() {
  try { localStorage.setItem(FS_STORAGE_KEY, JSON.stringify(virtualFS)); }
  catch (_) {}
}

function loadAliases() {
  try {
    const stored = JSON.parse(localStorage.getItem(ALIAS_STORAGE_KEY));
    if (stored && typeof stored === "object" && !Array.isArray(stored)) return stored;
  } catch (_) {}
  return { ll: "ls -la", cls: "clear" };
}

function saveAliases() {
  try { localStorage.setItem(ALIAS_STORAGE_KEY, JSON.stringify(aliases)); }
  catch (_) {}
}

let virtualFS = loadVirtualFS();

function appendTerminalLine(text, type = "") {
  const line = document.createElement("div");
  line.className = `terminal-line ${type}`.trim();
  line.textContent = String(text ?? "");
  terminalOutput.appendChild(line);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
  return line;
}

function appendTerminalBlock(title, body) {
  const block = document.createElement("div");
  block.className = "terminal-block";
  const heading = document.createElement("strong");
  heading.textContent = title;
  const paragraph = document.createElement("p");
  paragraph.textContent = body;
  block.append(heading, paragraph);
  terminalOutput.appendChild(block);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function appendTutorial() {
  const tutorial = document.createElement("div");
  tutorial.className = "terminal-tutorial";
  tutorial.innerHTML = `
    <div class="tutorial-head"><span>ROMEO.OS QUICK START</span><b>7 STEPS</b></div>
    <ol>
      <li><code>cat welcome.txt</code><span>прочитает приветствие владельца системы</span></li>
      <li><code>neofetch</code><span>покажет информацию о системе</span></li>
      <li><code>ls -la</code><span>покажет файлы, папки и права</span></li>
      <li><code>cd projects</code><span>перейдёт к описаниям проектов</span></li>
      <li><code>cat cunt.txt</code><span>откроет описание проекта</span></li>
      <li><code>touch hello.txt</code><span>создаст виртуальный файл</span></li>
      <li><code>nano hello.txt</code><span>откроет встроенный редактор</span></li>
    </ol>
    <p>Файловая система существует только внутри страницы и хранится в localStorage этого браузера. Команды ping и nmap являются визуальной симуляцией.</p>
  `;
  terminalOutput.appendChild(tutorial);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function openTerminal() {
  terminalModal.hidden = false;
  if (!terminalOutput.children.length) {
    appendTerminalLine("ROMAN.CLI 4.0 / ROMEO.OS PORTFOLIO SHELL", "success");
    appendTerminalLine("Профиль загружен. Введи help. Для любопытных существует команда из двух слов.", "muted");
    appendTerminalBlock("SESSION", "user: guest\nprofile: Кошелев Роман\nmode: portfolio shell\nchannel: 558");
  }
  updateTerminalChrome();
  setTimeout(() => terminalInput.focus(), 0);
}

function closeTerminal() {
  closeNano(false);
  closePager();
  terminalModal.hidden = true;
}

function workList() {
  return CONFIG.projects.map(project => `${project.id.padEnd(10)} ${project.title.padEnd(20)} ${project.status}`).join("\n");
}

function runPrivateChannel() {
  appendTerminalLine("private channel 558 accepted", "success");
  const signal = document.createElement("div");
  signal.className = "terminal-signal";
  signal.innerHTML = `<pre>       ╭─╮                 ╭────╮
───────╯ ╰────╮   ╭────────╯    ╰──────
              ╰───╯
  SIGNAL LOCKED / KOSHELEV LAB / 558</pre>`;
  terminalOutput.appendChild(signal);
  appendTerminalBlock("LAB NOTE", "Идея может начинаться как эксперимент. Ценность появляется, когда прототип действительно запускается и отвечает на вопрос: работает ли это?");
  document.body.classList.add("signal-unlocked");
  setTimeout(() => document.body.classList.remove("signal-unlocked"), 8000);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function pathToString(path = currentPath) {
  return path.length ? `/${path.join("/")}` : "/";
}

function promptPath() {
  const path = pathToString();
  return path === "/home/guest" ? "~" : path.startsWith("/home/guest/") ? `~/${path.slice(12)}` : path;
}

function updateTerminalChrome() {
  const fsActive = shellMode === "filesystem";
  const debugActive = shellMode === "debug";
  terminalUser.textContent = debugActive ? "debug@romeoOS" : fsActive ? "guest@romeoOS" : "roman@portfolio";
  terminalPath.textContent = debugActive ? "js" : fsActive ? promptPath() : "~";
  terminalSubtitle.textContent = debugActive
    ? "javascript console / page context"
    : fsActive ? `romeoOS / ${pathToString()}` : "portfolio shell / ch 558";
  terminalModeStatus.innerHTML = debugActive
    ? "<i></i> DEBUG CONSOLE"
    : fsActive ? "<i></i> FILESYSTEM RW" : "<i></i> ONLINE";
  terminalInput.placeholder = debugActive ? "document.title or .exit" : fsActive ? "ls, nano, neofetch..." : "введи команду";

  const quickCommands = debugActive
    ? [["document.title", "document.title"], ["romeoOS", "romeoOS"], ["location.href", "location.href"], ["console.clear()", "console.clear()"], [".exit", ".exit"]]
    : fsActive
      ? [["cat welcome.txt", "cat welcome.txt"], ["neofetch", "neofetch"], ["ls -la", "ls -la"], ["cd projects", "cd projects"], ["help", "help"]]
      : [["whoami", "whoami"], ["work", "work"], ["neofetch", "neofetch"], ["contact", "contact"], ["help", "help"]];

  terminalRailLabel.textContent = debugActive ? "JAVASCRIPT" : fsActive ? "ROMEO.OS COMMANDS" : "QUICK COMMANDS";
  terminalRailButtons.forEach((button, index) => {
    const [label, command] = quickCommands[index];
    button.textContent = label;
    button.dataset.terminalCommand = command;
  });
  terminalWindow?.classList.toggle("filesystem-mode", fsActive);
  terminalWindow?.classList.toggle("debug-mode", debugActive);
}

function normalizeVirtualPath(rawPath = "") {
  let value = String(rawPath).trim();
  if (!value || value === ".") return [...currentPath];
  if (value === "~") return ["home", "guest"];
  if (value.startsWith("~/")) value = `/home/guest/${value.slice(2)}`;

  const result = value.startsWith("/") ? [] : [...currentPath];
  value.split("/").forEach(part => {
    if (!part || part === ".") return;
    if (part === "..") result.pop();
    else result.push(part);
  });
  return result;
}

function getVirtualNode(path) {
  let node = virtualFS;
  for (const segment of path) {
    if (node.type !== "dir" || !Object.hasOwn(node.children, segment)) return null;
    node = node.children[segment];
  }
  return node;
}

function getParentInfo(rawPath) {
  const path = normalizeVirtualPath(rawPath);
  if (!path.length) return null;
  const name = path.at(-1);
  const parentPath = path.slice(0, -1);
  return { path, name, parentPath, parent: getVirtualNode(parentPath) };
}

function splitFlagsAndPaths(args) {
  const flags = args.filter(arg => arg.startsWith("-") && arg !== "-");
  const paths = args.filter(arg => !arg.startsWith("-") || arg === "-");
  return { flags, paths };
}

function formatNodeDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "---- -- -- --:--";
  return date.toISOString().slice(0, 16).replace("T", " ");
}

function listDirectory(node, showHidden = false, longMode = false) {
  const entries = Object.entries(node.children)
    .filter(([name]) => showHidden || !name.startsWith("."))
    .sort((a, b) => {
      if (a[1].type !== b[1].type) return a[1].type === "dir" ? -1 : 1;
      return a[0].localeCompare(b[0]);
    });

  if (!entries.length) return "";
  if (longMode) {
    return entries.map(([name, item]) => {
      const size = item.type === "file" ? String(new Blob([item.content]).size).padStart(6) : "  4096";
      return `${item.mode} guest guest ${size} ${formatNodeDate(item.modified)} ${name}${item.type === "dir" ? "/" : ""}`;
    }).join("\n");
  }
  return entries.map(([name, item]) => `${name}${item.type === "dir" ? "/" : ""}`).join("    ");
}

function treeLines(node, prefix = "", depth = 0, maxDepth = 8) {
  if (node.type !== "dir" || depth >= maxDepth) return [];
  const entries = Object.entries(node.children).filter(([name]) => !name.startsWith("."));
  const lines = [];
  entries.forEach(([name, item], index) => {
    const last = index === entries.length - 1;
    lines.push(`${prefix}${last ? "└──" : "├──"} ${name}${item.type === "dir" ? "/" : ""}`);
    if (item.type === "dir") lines.push(...treeLines(item, `${prefix}${last ? "    " : "│   "}`, depth + 1, maxDepth));
  });
  return lines;
}

function enterFilesystem() {
  if (shellMode === "filesystem") {
    appendTerminalLine("filesystem already mounted at /dev/portfolio0", "muted");
    return;
  }
  shellMode = "filesystem";
  currentPath = [];
  appendTerminalLine("unlock token accepted", "success");
  appendTerminalLine("mounting /dev/portfolio0 on / ...", "muted");
  appendTerminalLine("virtual filesystem mounted read-write", "success");
  appendTutorial();
  updateTerminalChrome();
}

function leaveFilesystem() {
  if (shellMode !== "filesystem") return;
  shellMode = "portfolio";
  appendTerminalLine("syncing virtual filesystem ...", "muted");
  saveVirtualFS();
  appendTerminalLine("returned to portfolio shell", "success");
  updateTerminalChrome();
}

function enterDebug(initialCode = "") {
  debugReturnMode = shellMode === "portfolio" ? "portfolio" : "filesystem";
  shellMode = "debug";
  appendTerminalBlock("DEBUG CONSOLE", "JavaScript executes in this page's browser context. It can modify the current DOM and romeoOS state, but it has no server access and cannot inspect files on the device.\n\nUse .help for examples and .exit to leave.");
  updateTerminalChrome();
  if (initialCode) evaluateDebugCode(initialCode);
}

function leaveDebug() {
  shellMode = debugReturnMode;
  appendTerminalLine(`leaving debug console -> ${shellMode}`, "success");
  updateTerminalChrome();
}

function formatDebugValue(value) {
  if (value === undefined) return "undefined";
  if (value === null) return "null";
  if (value instanceof Element) {
    const id = value.id ? `#${value.id}` : "";
    const classes = value.classList.length ? `.${[...value.classList].join(".")}` : "";
    return `<${value.tagName.toLowerCase()}${id}${classes}>`;
  }
  if (typeof value === "function") return value.toString();
  if (typeof value !== "object") return String(value);
  const seen = new WeakSet();
  try {
    return JSON.stringify(value, (_, item) => {
      if (typeof item === "object" && item !== null) {
        if (seen.has(item)) return "[Circular]";
        seen.add(item);
      }
      return item;
    }, 2);
  } catch (_) {
    return Object.prototype.toString.call(value);
  }
}

async function evaluateDebugCode(code) {
  try {
    const result = (0, eval)(code);
    const resolved = result instanceof Promise ? await result : result;
    appendTerminalLine(formatDebugValue(resolved), "success");
  } catch (error) {
    appendTerminalLine(`${error.name}: ${error.message}`, "error");
  }
}

function isDestructiveRootCommand(value) {
  const normalized = value.toLowerCase().replace(/\s+/g, " ").trim().replace(/^sudo\s+/, "");
  if (!normalized.startsWith("rm ")) return false;
  const hasRecursive = /(?:^|\s)-[a-z]*r[a-z]*/.test(normalized) || normalized.includes("--recursive");
  const hasForce = /(?:^|\s)-[a-z]*f[a-z]*/.test(normalized) || normalized.includes("--force");
  const targetsRoot = /(?:^|\s)\/(?:\*|\s|$)/.test(normalized) || normalized.includes("--no-preserve-root");
  return hasRecursive && hasForce && targetsRoot;
}

function clearRecoveryTimers() {
  recoveryTimers.forEach(timer => {
    clearTimeout(timer);
    clearInterval(timer);
  });
  recoveryTimers = [];
}

function triggerFilesystemCorruption(command) {
  clearRecoveryTimers();
  terminalInput.blur();
  corruptionScreen.hidden = false;
  corruptionScreen.className = "corruption-screen active";
  recoveryPanel.hidden = true;
  recoveryLog.innerHTML = "";
  recoveryProgress.style.width = "0%";
  document.body.classList.add("system-corrupted");
  corruptionNoise.textContent = `panic: ${command}\nroot inode table erased\nmount: /dev/portfolio0 failed`;

  let seconds = 10;
  corruptionCountdown.textContent = `AUTO-RECOVERY IN ${seconds}`;
  const countdownTimer = setInterval(() => {
    seconds -= 1;
    corruptionCountdown.textContent = seconds > 0 ? `AUTO-RECOVERY IN ${seconds}` : "SEARCHING FOR RECOVERY KERNEL";
    corruptionNoise.textContent = Array.from({ length: 3 }, () => {
      const hex = Math.floor(Math.random() * 0xffffffff).toString(16).padStart(8, "0");
      return `0x${hex}  ${Math.random() > .5 ? "inode missing" : "journal checksum mismatch"}`;
    }).join("\n");
    if (seconds <= 0) {
      clearInterval(countdownTimer);
      beginSelfRecovery();
    }
  }, 1000);
  recoveryTimers.push(countdownTimer);
}

function beginSelfRecovery() {
  corruptionScreen.classList.add("recovering");
  recoveryPanel.hidden = false;
  corruptionCountdown.textContent = "RECOVERY KERNEL FOUND";
  const steps = [
    ["booting recovery kernel from mirrored sector", 12],
    ["scanning journal fragments", 29],
    ["reconstructing virtual inode table", 48],
    ["restoring portfolio modules", 67],
    ["rebuilding interface state", 84],
    ["remounting /dev/portfolio0 read-write", 96],
    ["filesystem clean - rebooting UI", 100]
  ];

  steps.forEach(([text, progress], index) => {
    const timer = setTimeout(() => {
      const line = document.createElement("div");
      line.innerHTML = `<b>[${progress === 100 ? "OK" : ".."}]</b> ${text}`;
      recoveryLog.appendChild(line);
      recoveryProgress.style.width = `${progress}%`;
      if (progress === 100) finishSelfRecovery();
    }, index * 520);
    recoveryTimers.push(timer);
  });
}

function finishSelfRecovery() {
  const flashTimer = setTimeout(() => {
    document.body.classList.remove("system-corrupted");
    corruptionScreen.classList.add("restored");
    shellMode = "filesystem";
    currentPath = [];
    updateTerminalChrome();
    terminalModal.hidden = false;
    appendTerminalLine("recovery complete: filesystem restored from journal mirror", "success");
    appendTerminalLine("root privileges revoked for guest. Nice try.", "muted");
    setTimeout(() => terminalInput.focus(), 80);

    const hideTimer = setTimeout(() => {
      corruptionScreen.hidden = true;
      corruptionScreen.className = "corruption-screen";
      clearRecoveryTimers();
    }, 700);
    recoveryTimers.push(hideTimer);
  }, 760);
  recoveryTimers.push(flashTimer);
}

function openProjectFromTerminal(id) {
  const project = CONFIG.projects.find(item => item.id === id);
  if (!project) {
    appendTerminalLine(`Проект "${id || ""}" не найден. Используй work или ls /projects.`, "error");
    return;
  }
  appendTerminalLine(`Открываю ${project.title}...`, "success");
  selectProject(project.id);
  setTimeout(() => {
    closeTerminal();
    document.getElementById("projects").scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  }, 320);
}

function writeVirtualFile(rawPath, content, append = false) {
  const info = getParentInfo(rawPath);
  if (!info || !info.parent || info.parent.type !== "dir") return { ok: false, error: "No such directory" };
  const existing = info.parent.children[info.name];
  if (existing?.type === "dir") return { ok: false, error: "Is a directory" };
  if (!existing) info.parent.children[info.name] = makeFile(content);
  else {
    existing.content = append ? `${existing.content}${content}` : content;
    existing.modified = nowISO();
  }
  info.parent.modified = nowISO();
  saveVirtualFS();
  return { ok: true, node: info.parent.children[info.name], path: info.path };
}

function openNano(rawPath) {
  if (!rawPath) {
    appendTerminalLine("nano: missing file operand", "error");
    return;
  }
  const info = getParentInfo(rawPath);
  if (!info || !info.parent || info.parent.type !== "dir") {
    appendTerminalLine(`nano: ${rawPath}: No such directory`, "error");
    return;
  }
  const node = info.parent.children[info.name];
  if (node?.type === "dir") {
    appendTerminalLine(`nano: ${rawPath}: Is a directory`, "error");
    return;
  }
  editorTargetPath = info.path;
  terminalEditorPath.textContent = pathToString(info.path);
  terminalEditorText.value = node?.content || "";
  terminalEditor.hidden = false;
  terminalWindow.classList.add("editor-open");
  setTimeout(() => terminalEditorText.focus(), 0);
}

function saveNano() {
  if (!editorTargetPath) return;
  const path = pathToString(editorTargetPath);
  const result = writeVirtualFile(path, terminalEditorText.value, false);
  if (!result.ok) {
    appendTerminalLine(`nano: ${path}: ${result.error}`, "error");
    return;
  }
  appendTerminalLine(`nano: wrote ${new Blob([terminalEditorText.value]).size} bytes to ${path}`, "success");
  closeNano(false);
}

function closeNano(refocus = true) {
  if (!terminalEditor || terminalEditor.hidden) return;
  terminalEditor.hidden = true;
  terminalWindow.classList.remove("editor-open");
  editorTargetPath = null;
  if (refocus) setTimeout(() => terminalInput.focus(), 0);
}

function openPager(rawPath) {
  const path = normalizeVirtualPath(rawPath);
  const node = getVirtualNode(path);
  if (!node) {
    appendTerminalLine(`less: ${rawPath}: No such file or directory`, "error");
    return;
  }
  if (node.type === "dir") {
    appendTerminalLine(`less: ${rawPath}: Is a directory`, "error");
    return;
  }
  terminalPagerPath.textContent = pathToString(path);
  terminalPagerContent.textContent = node.content || "(empty file)";
  terminalPager.hidden = false;
  terminalWindow.classList.add("pager-open");
  terminalPagerContent.scrollTop = 0;
  terminalPagerClose.focus();
}

function closePager(refocus = true) {
  if (!terminalPager || terminalPager.hidden) return;
  terminalPager.hidden = true;
  terminalWindow.classList.remove("pager-open");
  if (refocus) setTimeout(() => terminalInput.focus(), 0);
}

function octalToMode(value, type) {
  if (!/^[0-7]{3}$/.test(value)) return null;
  const symbols = value.split("").map(digit => {
    const n = Number(digit);
    return `${n & 4 ? "r" : "-"}${n & 2 ? "w" : "-"}${n & 1 ? "x" : "-"}`;
  }).join("");
  return `${type === "dir" ? "d" : "-"}${symbols}`;
}

function wildcardToRegExp(pattern) {
  const escaped = pattern.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*").replace(/\?/g, ".");
  return new RegExp(`^${escaped}$`);
}

function walkVirtualFS(node, basePath, callback) {
  callback(node, basePath);
  if (node.type !== "dir") return;
  Object.entries(node.children).forEach(([name, child]) => {
    walkVirtualFS(child, [...basePath, name], callback);
  });
}

function parseCountOption(args, defaultCount = 10) {
  let count = defaultCount;
  const copy = [...args];
  if (copy[0] === "-n" && /^\d+$/.test(copy[1] || "")) {
    count = Number(copy[1]);
    copy.splice(0, 2);
  } else if (/^-\d+$/.test(copy[0] || "")) {
    count = Number(copy.shift().slice(1));
  }
  return { count, paths: copy };
}

function formatUptime() {
  const totalSeconds = Math.max(0, Math.floor((Date.now() - shellStartedAt) / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours ? `${hours}h ` : ""}${minutes}m ${seconds}s`;
}

function renderNeofetch() {
  const art = [
    "        ██████╗ ",
    "        ██╔══██╗",
    "        ██████╔╝",
    "        ██╔══██╗",
    "        ██║  ██║",
    "        ╚═╝  ╚═╝"
  ];
  const info = [
    "romeoOS",
    "",
    "Host:      romeo558.ru",
    "Kernel:    6.6.0-portfolio",
    "Shell:     bash",
    "Memory:    32 MB / 256 MB",
    "Terminal:  Chrome",
    "Theme:     Dark",
    `Uptime:    ${formatUptime()}`
  ];
  const rows = Array.from({ length: Math.max(art.length, info.length) }, (_, index) => `${(art[index] || "").padEnd(19)}${info[index] || ""}`);
  appendTerminalLine(rows.join("\n"), "success");
}

function cowsay(text) {
  const message = text || "moo. try help";
  const width = Math.min(48, Math.max(3, message.length));
  const words = message.split(/\s+/);
  const lines = [];
  let line = "";
  words.forEach(word => {
    if (`${line} ${word}`.trim().length > width && line) {
      lines.push(line);
      line = word;
    } else line = `${line} ${word}`.trim();
  });
  if (line) lines.push(line);
  const boxWidth = Math.max(...lines.map(item => item.length));
  const top = ` ${"_".repeat(boxWidth + 2)}`;
  const bottom = ` ${"-".repeat(boxWidth + 2)}`;
  const body = lines.map((item, index) => {
    const left = lines.length === 1 ? "<" : index === 0 ? "/" : index === lines.length - 1 ? "\\" : "|";
    const right = lines.length === 1 ? ">" : index === 0 ? "\\" : index === lines.length - 1 ? "/" : "|";
    return `${left} ${item.padEnd(boxWidth)} ${right}`;
  });
  appendTerminalLine(`${top}\n${body.join("\n")}\n${bottom}\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||`);
}

function safeOpenWeb(raw) {
  if (!raw) {
    appendTerminalLine("openweb: missing URL", "error");
    return;
  }
  try {
    const url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
    if (!["http:", "https:"].includes(url.protocol)) throw new Error("unsupported protocol");
    appendTerminalLine(`opening ${url.href}`, "success");
    window.open(url.href, "_blank", "noopener,noreferrer");
  } catch (_) {
    appendTerminalLine(`openweb: invalid URL '${raw}'`, "error");
  }
}

function simulatePing(host = "romeo558.ru") {
  appendTerminalLine(`PING ${host} (203.0.113.58): 56 data bytes`, "muted");
  const times = [18.4, 17.9, 19.1, 18.2].map(value => value + Math.random() * 1.8);
  times.forEach((time, index) => {
    setTimeout(() => {
      appendTerminalLine(`64 bytes from ${host}: icmp_seq=${index + 1} ttl=58 time=${time.toFixed(1)} ms`);
      if (index === times.length - 1) {
        const avg = times.reduce((sum, value) => sum + value, 0) / times.length;
        appendTerminalLine(`--- ${host} ping statistics ---\n4 packets transmitted, 4 received, 0% packet loss\nrtt min/avg/max = ${Math.min(...times).toFixed(1)}/${avg.toFixed(1)}/${Math.max(...times).toFixed(1)} ms\n[simulation: no packets were sent]`, "success");
      }
    }, 180 * (index + 1));
  });
}

function simulateNmap(target = "romeo558.ru") {
  const isLocal = ["localhost", "127.0.0.1", "::1"].includes(target.toLowerCase());
  const ports = isLocal
    ? [[3000, "open", "dev-server"], [5500, "open", "live-server"], [9222, "filtered", "chrome-debug"]]
    : [[22, "filtered", "ssh"], [80, "open", "http"], [443, "open", "https"]];
  appendTerminalLine(`Starting Nmap 7.95 ( https://nmap.org )\nNmap scan report for ${target}\nHost is up (0.018s latency).`, "muted");
  setTimeout(() => {
    appendTerminalLine(`PORT     STATE     SERVICE\n${ports.map(([port, state, service]) => `${String(port).padEnd(8)} ${state.padEnd(9)} ${service}`).join("\n")}\n\nNmap done: 1 IP address (1 host up) scanned in 0.42 seconds\n[simulation: no network scan was performed]`, "success");
  }, 520);
}

const portfolioCommands = {
  help() {
    appendTerminalBlock("COMMAND INDEX", "whoami          профессиональный профиль\nwork             список проектов\nopen <id>        открыть проект\nstatus           состояние профиля\ncontact          контакты\ngithub           открыть GitHub\nemail            написать письмо\nneofetch         информация о romeoOS\nopenweb <url>    открыть ссылку\ncowsay <text>    важная системная утилита\ndebug            JS-консоль страницы\neaster egg       смонтировать romeoOS\nclear            очистить вывод\nexit             закрыть терминал");
  },
  whoami() {
    appendTerminalBlock("КОШЕЛЕВ РОМАН", "Разработчик и инженер. Создаю web-интерфейсы, системные инструменты и embedded-прототипы. Сильная сторона - соединять код, железо и UX в одном рабочем решении.");
  },
  work() { appendTerminalBlock("SELECTED WORK", workList()); },
  status() { appendTerminalBlock("SYSTEM STATUS", "portfolio: ONLINE\nprojects indexed: 5\nfocus: WEB / SYSTEM TOOLS / EMBEDDED\navailability: OPEN TO INTERESTING BUILDS\nrecovery kernel: ARMED"); },
  contact() { appendTerminalBlock("CONTACT", `email: ${CONFIG.email}\ngithub: ${CONFIG.github}`); },
  github() { appendTerminalLine("Открываю GitHub...", "success"); window.open(CONFIG.github, "_blank", "noopener,noreferrer"); },
  email() { appendTerminalLine("Открываю почтовый клиент...", "success"); location.href = `mailto:${CONFIG.email}`; },
  neofetch() { renderNeofetch(); },
  openweb(args) { safeOpenWeb(args[0]); },
  cowsay(args) { cowsay(args.join(" ")); },
  debug(args) { enterDebug(args.join(" ")); },
  clear() { terminalOutput.innerHTML = ""; },
  exit() { closeTerminal(); },
  "558"() { runPrivateChannel(); }
};

const filesystemCommands = {
  help() {
    appendTerminalBlock("ROMEO.OS COMMANDS", [
      "NAVIGATION / READING",
      "  ls [-la] [path]   cd [path]   pwd   cat <file>   less <file>",
      "  tree [path]       find [path] [-name pattern]    grep [-in] pattern file",
      "  file <path>       stat <path>  wc [-lwc] <file>  head/tail [-n N] <file>",
      "",
      "FILES / DIRECTORIES",
      "  touch <file>      mkdir [-p] <dir>   rm [-rf] <path>",
      "  nano <file>       chmod <mode> <path> echo <text> [> or >> file]",
      "",
      "SHELL / SYSTEM",
      "  clear  whoami  hostname  date  uptime  history  alias  env  export",
      "  which  neofetch  cowsay  ping  nmap  openweb  debug",
      "",
      "PORTFOLIO",
      "  open <project>    portfolio    exit    558"
    ].join("\n"));
  },
  pwd() { appendTerminalLine(pathToString()); },
  ls(args) {
    const { flags, paths } = splitFlagsAndPaths(args);
    const target = paths[0] || ".";
    const node = getVirtualNode(normalizeVirtualPath(target));
    if (!node) return appendTerminalLine(`ls: cannot access '${target}': No such file or directory`, "error");
    if (node.type === "file") return appendTerminalLine(target.split("/").pop() || target);
    const flagText = flags.join("");
    const output = listDirectory(node, flagText.includes("a"), flagText.includes("l"));
    appendTerminalLine(output || "(empty)", output ? "" : "muted");
  },
  cd(args) {
    const target = args[0] || "~";
    const path = normalizeVirtualPath(target);
    const node = getVirtualNode(path);
    if (!node) return appendTerminalLine(`cd: ${target}: No such file or directory`, "error");
    if (node.type !== "dir") return appendTerminalLine(`cd: ${target}: Not a directory`, "error");
    currentPath = path;
    updateTerminalChrome();
  },
  cat(args) {
    if (!args.length) return appendTerminalLine("cat: missing file operand", "error");
    args.forEach(target => {
      const node = getVirtualNode(normalizeVirtualPath(target));
      if (!node) appendTerminalLine(`cat: ${target}: No such file or directory`, "error");
      else if (node.type === "dir") appendTerminalLine(`cat: ${target}: Is a directory`, "error");
      else appendTerminalLine(node.content);
    });
  },
  less(args) {
    if (!args[0]) return appendTerminalLine("less: missing file operand", "error");
    openPager(args[0]);
  },
  tree(args) {
    const target = args[0] || ".";
    const path = normalizeVirtualPath(target);
    const node = getVirtualNode(path);
    if (!node) return appendTerminalLine(`tree: ${target}: No such file or directory`, "error");
    if (node.type !== "dir") return appendTerminalLine(target.split("/").pop());
    appendTerminalLine(`${pathToString(path)}\n${treeLines(node).join("\n")}`);
  },
  find(args) {
    let start = ".";
    let pattern = "*";
    const nameIndex = args.indexOf("-name");
    if (nameIndex >= 0) {
      pattern = args[nameIndex + 1] || "*";
      if (nameIndex > 0) start = args[0];
    } else if (args[0]) start = args[0];
    const startPath = normalizeVirtualPath(start);
    const node = getVirtualNode(startPath);
    if (!node) return appendTerminalLine(`find: '${start}': No such file or directory`, "error");
    const regex = wildcardToRegExp(pattern);
    const results = [];
    walkVirtualFS(node, startPath, (_, path) => {
      const name = path.at(-1) || "/";
      if (regex.test(name)) results.push(pathToString(path));
    });
    appendTerminalLine(results.join("\n") || "(no matches)", results.length ? "" : "muted");
  },
  grep(args) {
    const flags = args.filter(arg => arg.startsWith("-"));
    const values = args.filter(arg => !arg.startsWith("-"));
    const pattern = values.shift();
    if (!pattern || !values.length) return appendTerminalLine("grep: usage: grep [-in] pattern file...", "error");
    let regex;
    try { regex = new RegExp(pattern, flags.join("").includes("i") ? "i" : ""); }
    catch (error) { return appendTerminalLine(`grep: ${error.message}`, "error"); }
    const showLine = flags.join("").includes("n");
    values.forEach(target => {
      const node = getVirtualNode(normalizeVirtualPath(target));
      if (!node) return appendTerminalLine(`grep: ${target}: No such file or directory`, "error");
      if (node.type === "dir") return appendTerminalLine(`grep: ${target}: Is a directory`, "error");
      const matches = node.content.split("\n").map((line, index) => ({ line, index: index + 1 })).filter(item => regex.test(item.line));
      matches.forEach(item => appendTerminalLine(`${values.length > 1 ? `${target}:` : ""}${showLine ? `${item.index}:` : ""}${item.line}`));
    });
  },
  echo(args) {
    const redirectIndex = args.findIndex(arg => arg === ">" || arg === ">>");
    if (redirectIndex < 0) return appendTerminalLine(args.join(" "));
    const target = args[redirectIndex + 1];
    if (!target) return appendTerminalLine("echo: missing redirect target", "error");
    const content = `${args.slice(0, redirectIndex).join(" ")}\n`;
    const result = writeVirtualFile(target, content, args[redirectIndex] === ">>");
    if (!result.ok) appendTerminalLine(`echo: ${target}: ${result.error}`, "error");
  },
  touch(args) {
    if (!args.length) return appendTerminalLine("touch: missing file operand", "error");
    args.forEach(target => {
      const info = getParentInfo(target);
      if (!info || !info.parent || info.parent.type !== "dir") return appendTerminalLine(`touch: cannot touch '${target}': No such directory`, "error");
      const existing = info.parent.children[info.name];
      if (existing?.type === "dir") return appendTerminalLine(`touch: '${target}': Is a directory`, "error");
      if (existing) existing.modified = nowISO();
      else info.parent.children[info.name] = makeFile("");
      info.parent.modified = nowISO();
    });
    saveVirtualFS();
  },
  mkdir(args) {
    const recursive = args.includes("-p");
    const targets = args.filter(arg => arg !== "-p");
    if (!targets.length) return appendTerminalLine("mkdir: missing operand", "error");
    targets.forEach(target => {
      const path = normalizeVirtualPath(target);
      if (!path.length) return appendTerminalLine("mkdir: cannot create directory '/': File exists", "error");
      let node = virtualFS;
      for (let index = 0; index < path.length; index += 1) {
        const segment = path[index];
        const existing = node.children[segment];
        if (existing) {
          if (existing.type !== "dir") { appendTerminalLine(`mkdir: cannot create directory '${target}': Not a directory`, "error"); return; }
          if (index === path.length - 1 && !recursive) { appendTerminalLine(`mkdir: cannot create directory '${target}': File exists`, "error"); return; }
          node = existing;
        } else {
          if (!recursive && index !== path.length - 1) { appendTerminalLine(`mkdir: cannot create directory '${target}': No such file or directory`, "error"); return; }
          node.children[segment] = makeDir();
          node.modified = nowISO();
          node = node.children[segment];
        }
      }
    });
    saveVirtualFS();
  },
  rm(args) {
    const shortFlags = args.filter(arg => /^-[^-]/.test(arg)).join("");
    const recursive = /[rR]/.test(shortFlags) || args.includes("--recursive");
    const force = shortFlags.includes("f") || args.includes("--force");
    const targets = args.filter(arg => !arg.startsWith("-"));
    if (!targets.length) return appendTerminalLine("rm: missing operand", "error");
    targets.forEach(target => {
      const info = getParentInfo(target);
      if (!info || !info.parent || info.parent.type !== "dir" || !Object.hasOwn(info.parent.children, info.name)) {
        if (!force) appendTerminalLine(`rm: cannot remove '${target}': No such file or directory`, "error");
        return;
      }
      const node = info.parent.children[info.name];
      if (node.type === "dir" && !recursive) return appendTerminalLine(`rm: cannot remove '${target}': Is a directory`, "error");
      delete info.parent.children[info.name];
      info.parent.modified = nowISO();
    });
    saveVirtualFS();
  },
  nano(args) { openNano(args[0]); },
  chmod(args) {
    const [modeValue, target] = args;
    if (!modeValue || !target) return appendTerminalLine("chmod: usage: chmod MODE FILE", "error");
    const node = getVirtualNode(normalizeVirtualPath(target));
    if (!node) return appendTerminalLine(`chmod: cannot access '${target}': No such file or directory`, "error");
    if (/^[0-7]{3}$/.test(modeValue)) {
      node.mode = octalToMode(modeValue, node.type);
    } else if (/^[+-]x$/.test(modeValue)) {
      const chars = node.mode.split("");
      [3, 6, 9].forEach(index => { chars[index] = modeValue[0] === "+" ? "x" : "-"; });
      node.mode = chars.join("");
    } else return appendTerminalLine(`chmod: invalid mode: '${modeValue}'`, "error");
    node.modified = nowISO();
    saveVirtualFS();
  },
  whoami() { appendTerminalLine(shellEnv.USER); },
  hostname() { appendTerminalLine(shellEnv.HOSTNAME); },
  date() { appendTerminalLine(new Date().toLocaleString("ru-RU", { dateStyle: "full", timeStyle: "medium" })); },
  uptime() { appendTerminalLine(`up ${formatUptime()}, 1 user, load average: 0.05, 0.03, 0.01`); },
  history() { appendTerminalLine(commandHistory.map((item, index) => `${String(index + 1).padStart(4)}  ${item}`).join("\n") || "(history empty)"); },
  alias(args, raw) {
    if (!args.length) return appendTerminalLine(Object.entries(aliases).map(([name, command]) => `alias ${name}='${command}'`).join("\n") || "(no aliases)");
    const definition = raw.match(/^alias\s+([A-Za-z_][\w-]*)=(?:"([^"]*)"|'([^']*)'|(.+))$/);
    if (!definition) {
      const name = args[0];
      if (aliases[name]) appendTerminalLine(`alias ${name}='${aliases[name]}'`);
      else appendTerminalLine(`alias: ${name}: not found`, "error");
      return;
    }
    aliases[definition[1]] = definition[2] ?? definition[3] ?? definition[4] ?? "";
    saveAliases();
  },
  env() { appendTerminalLine(Object.entries(shellEnv).map(([key, value]) => `${key}=${value}`).join("\n")); },
  export(args) {
    if (!args.length) return filesystemCommands.env();
    args.forEach(item => {
      const index = item.indexOf("=");
      if (index < 1) return appendTerminalLine(`export: '${item}': not a valid identifier`, "error");
      shellEnv[item.slice(0, index)] = item.slice(index + 1);
    });
  },
  which(args) {
    if (!args.length) return appendTerminalLine("which: missing command", "error");
    args.forEach(name => {
      if (aliases[name]) appendTerminalLine(`${name}: aliased to '${aliases[name]}'`);
      else if (filesystemCommands[name] || portfolioCommands[name] || ["open", "easter", "egg"].includes(name)) appendTerminalLine(`/usr/bin/${name}`);
      else appendTerminalLine(`${name} not found`, "error");
    });
  },
  file(args) {
    if (!args.length) return appendTerminalLine("file: missing operand", "error");
    args.forEach(target => {
      const node = getVirtualNode(normalizeVirtualPath(target));
      if (!node) return appendTerminalLine(`${target}: cannot open: No such file or directory`, "error");
      if (node.type === "dir") return appendTerminalLine(`${target}: directory`);
      const ext = target.split(".").pop().toLowerCase();
      const kind = node.content.length === 0 ? "empty" : ext === "json" ? "JSON text data" : ext === "md" ? "Markdown document, UTF-8 text" : ext === "log" ? "log file, UTF-8 text" : "UTF-8 Unicode text";
      appendTerminalLine(`${target}: ${kind}`);
    });
  },
  stat(args) {
    if (!args.length) return appendTerminalLine("stat: missing operand", "error");
    args.forEach(target => {
      const path = normalizeVirtualPath(target);
      const node = getVirtualNode(path);
      if (!node) return appendTerminalLine(`stat: cannot stat '${target}': No such file or directory`, "error");
      const size = node.type === "file" ? new Blob([node.content]).size : 4096;
      appendTerminalLine(`  File: ${pathToString(path)}\n  Size: ${size}\tType: ${node.type}\nAccess: (${node.mode})  Uid: guest  Gid: guest\nBirth: ${node.created}\nModify: ${node.modified}`);
    });
  },
  wc(args) {
    const flags = args.filter(arg => arg.startsWith("-")).join("");
    const targets = args.filter(arg => !arg.startsWith("-"));
    if (!targets.length) return appendTerminalLine("wc: missing file operand", "error");
    targets.forEach(target => {
      const node = getVirtualNode(normalizeVirtualPath(target));
      if (!node || node.type !== "file") return appendTerminalLine(`wc: ${target}: No such file`, "error");
      const lines = (node.content.match(/\n/g) || []).length;
      const words = node.content.trim() ? node.content.trim().split(/\s+/).length : 0;
      const bytes = new Blob([node.content]).size;
      const selected = [];
      if (!flags || flags.includes("l")) selected.push(lines);
      if (!flags || flags.includes("w")) selected.push(words);
      if (!flags || flags.includes("c")) selected.push(bytes);
      appendTerminalLine(`${selected.join(" ")} ${target}`);
    });
  },
  head(args) {
    const { count, paths } = parseCountOption(args);
    if (!paths.length) return appendTerminalLine("head: missing file operand", "error");
    paths.forEach(target => {
      const node = getVirtualNode(normalizeVirtualPath(target));
      if (!node || node.type !== "file") return appendTerminalLine(`head: ${target}: No such file`, "error");
      const lines = node.content.endsWith("\n") ? node.content.slice(0, -1).split("\n") : node.content.split("\n");
      appendTerminalLine(lines.slice(0, count).join("\n"));
    });
  },
  tail(args) {
    const { count, paths } = parseCountOption(args);
    if (!paths.length) return appendTerminalLine("tail: missing file operand", "error");
    paths.forEach(target => {
      const node = getVirtualNode(normalizeVirtualPath(target));
      if (!node || node.type !== "file") return appendTerminalLine(`tail: ${target}: No such file`, "error");
      const lines = node.content.endsWith("\n") ? node.content.slice(0, -1).split("\n") : node.content.split("\n");
      appendTerminalLine(lines.slice(-count).join("\n"));
    });
  },
  neofetch() { renderNeofetch(); },
  ping(args) { simulatePing(args[0]); },
  nmap(args) { simulateNmap(args.find(arg => !arg.startsWith("-")) || "romeo558.ru"); },
  openweb(args) { safeOpenWeb(args[0]); },
  cowsay(args) { cowsay(args.join(" ")); },
  debug(args) { enterDebug(args.join(" ")); },
  portfolio() { leaveFilesystem(); },
  clear() { terminalOutput.innerHTML = ""; },
  exit() { leaveFilesystem(); },
  "558"() { runPrivateChannel(); }
};

function tokenizeCommand(value) {
  const tokens = [];
  let current = "";
  let quote = null;
  let escaped = false;

  for (const char of value) {
    if (escaped) {
      current += char;
      escaped = false;
      continue;
    }
    if (char === "\\" && quote !== "'") {
      escaped = true;
      continue;
    }
    if (quote) {
      if (char === quote) quote = null;
      else current += char;
      continue;
    }
    if (char === "\"" || char === "'") {
      quote = char;
      continue;
    }
    if (/\s/.test(char)) {
      if (current) {
        tokens.push(current);
        current = "";
      }
      continue;
    }
    current += char;
  }
  if (escaped) current += "\\";
  if (current) tokens.push(current);
  return tokens;
}

function shellQuote(value) {
  return /\s/.test(value) ? `"${value.replace(/"/g, '\\"')}"` : value;
}

async function executeTerminalCommand(rawValue, options = {}) {
  const value = rawValue.trim();
  if (!value) return;

  if (shellMode === "debug") {
    if (options.display !== false) appendTerminalLine(`debug@romeoOS:js> ${value}`, "command");
    if (options.history !== false) {
      commandHistory.push(value);
      historyIndex = commandHistory.length;
    }
    if ([".exit", "exit", "portfolio"].includes(value)) return leaveDebug();
    if (value === ".help") return appendTerminalBlock("DEBUG HELP", "document.title\ndocument.querySelector('h1').textContent\nromeoOS.fs\nromeoOS.resetFS()\ndocument.body.classList.toggle('signal-unlocked')\n.exit");
    if (value === ".clear") { terminalOutput.innerHTML = ""; return; }
    await evaluateDebugCode(value);
    return;
  }

  if (options.display !== false) appendTerminalLine(`${terminalUser.textContent}:${terminalPath.textContent}$ ${value}`, "command");
  if (options.history !== false) {
    commandHistory.push(value);
    historyIndex = commandHistory.length;
  }

  if (isDestructiveRootCommand(value)) {
    appendTerminalLine("rm: removing '/' ...", "error");
    triggerFilesystemCorruption(value);
    return;
  }

  const tokens = tokenizeCommand(value);
  let command = tokens.shift()?.toLowerCase() || "";
  const args = tokens;
  const normalizedPhrase = value.toLowerCase().replace(/\s+/g, " ").trim();

  if (["easter egg", "easteregg", "egg", "mount secret"].includes(normalizedPhrase)) {
    enterFilesystem();
    return;
  }

  if (aliases[command] && (options.aliasDepth || 0) < 6) {
    const expanded = `${aliases[command]} ${args.map(shellQuote).join(" ")}`.trim();
    await executeTerminalCommand(expanded, { display: false, history: false, aliasDepth: (options.aliasDepth || 0) + 1 });
    return;
  }

  if (command === "open") {
    openProjectFromTerminal(args[0]?.toLowerCase());
    return;
  }

  const commandMap = shellMode === "filesystem" ? filesystemCommands : portfolioCommands;
  const handler = commandMap[command];
  if (handler) await handler(args, value);
  else if (shellMode === "filesystem" && command === "sudo") appendTerminalLine("guest is not in the sudoers file. This incident will be reported to nobody.", "error");
  else appendTerminalLine(`${command}: command not found. Введи help.`, "error");
}

function autocompletePath(value) {
  const match = value.match(/^(.*?\s)([^\s]*)$/);
  if (!match) return null;
  const prefix = match[1];
  const rawPath = match[2];
  const slashIndex = rawPath.lastIndexOf("/");
  const directoryPart = slashIndex >= 0 ? rawPath.slice(0, slashIndex + 1) : "";
  const partial = slashIndex >= 0 ? rawPath.slice(slashIndex + 1) : rawPath;
  const directoryPath = normalizeVirtualPath(directoryPart || ".");
  const node = getVirtualNode(directoryPath);
  if (!node || node.type !== "dir") return null;
  const matches = Object.keys(node.children).filter(name => name.startsWith(partial));
  if (matches.length !== 1) return null;
  const matchedNode = node.children[matches[0]];
  return `${prefix}${directoryPart}${matches[0]}${matchedNode.type === "dir" ? "/" : ""}`;
}

terminalForm.addEventListener("submit", event => {
  event.preventDefault();
  const value = terminalInput.value;
  terminalInput.value = "";
  executeTerminalCommand(value);
});

terminalInput.addEventListener("keydown", event => {
  if (event.key === "ArrowUp") {
    event.preventDefault();
    historyIndex = Math.max(0, historyIndex - 1);
    terminalInput.value = commandHistory[historyIndex] || "";
  }
  if (event.key === "ArrowDown") {
    event.preventDefault();
    historyIndex = Math.min(commandHistory.length, historyIndex + 1);
    terminalInput.value = commandHistory[historyIndex] || "";
  }
  if (event.key === "Tab") {
    event.preventDefault();
    if (shellMode === "debug") return;
    if (shellMode === "filesystem") {
      const completedPath = autocompletePath(terminalInput.value);
      if (completedPath) {
        terminalInput.value = completedPath;
        return;
      }
    }
    const commands = shellMode === "filesystem"
      ? [...Object.keys(filesystemCommands), "open", "easter egg", ...Object.keys(aliases)]
      : [...Object.keys(portfolioCommands), "open", "easter egg", ...Object.keys(aliases)];
    const candidates = commands.filter(item => item.startsWith(terminalInput.value.toLowerCase()));
    if (candidates.length === 1) terminalInput.value = candidates[0];
  }
});

terminalEditorSave.addEventListener("click", saveNano);
terminalEditorClose.addEventListener("click", () => closeNano());
terminalEditorText.addEventListener("keydown", event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
    event.preventDefault();
    saveNano();
  }
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "x") {
    event.preventDefault();
    closeNano();
  }
  if (event.key === "Tab") {
    event.preventDefault();
    const start = terminalEditorText.selectionStart;
    const end = terminalEditorText.selectionEnd;
    terminalEditorText.setRangeText("  ", start, end, "end");
  }
});
terminalPagerClose.addEventListener("click", () => closePager());

$("#open-terminal").addEventListener("click", openTerminal);
$$('[data-close-terminal]').forEach(element => element.addEventListener("click", closeTerminal));
$$('[data-terminal-command]').forEach(button => {
  button.addEventListener("click", () => executeTerminalCommand(button.dataset.terminalCommand));
});

document.addEventListener("keydown", event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    openTerminal();
  }
  if (event.key === "Escape" && !terminalPager.hidden) { closePager(); return; }
  if (event.key === "Escape" && !terminalEditor.hidden) { closeNano(); return; }
  if (event.key === "Escape" && !terminalModal.hidden && !document.body.classList.contains("system-corrupted")) closeTerminal();
  if (!terminalPager.hidden && ["q", "Q"].includes(event.key)) closePager();
});

Object.defineProperties(window, {
  romeoOS: {
    configurable: true,
    value: {
      get fs() { return virtualFS; },
      get cwd() { return pathToString(); },
      get env() { return shellEnv; },
      get aliases() { return aliases; },
      config: CONFIG,
      run: command => executeTerminalCommand(String(command)),
      resetFS() {
        virtualFS = createDefaultFS();
        saveVirtualFS();
        currentPath = [];
        updateTerminalChrome();
        return "filesystem reset";
      }
    }
  }
});



// Contact and utilities
let toastTimer;
function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
}

$("#copy-email").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(CONFIG.email);
    showToast("Почта скопирована");
  } catch (_) {
    showToast(CONFIG.email);
  }
});

$("#back-top").addEventListener("click", () => window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" }));
$("#year").textContent = new Date().getFullYear();

// Scroll progress
const scrollProgress = $("#scroll-progress");
function updateScrollProgress() {
  const max = document.documentElement.scrollHeight - innerHeight;
  const progress = max > 0 ? Math.min(1, scrollY / max) : 0;
  scrollProgress.style.width = `${progress * 100}%`;
}
window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);
updateScrollProgress();

// Minimal background signal field
const canvas = $("#signal-field");
const ctx = canvas.getContext("2d");
let width = 0;
let height = 0;
let particles = [];

function resizeCanvas() {
  const ratio = Math.min(devicePixelRatio, 2);
  width = innerWidth;
  height = innerHeight;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  const count = Math.min(38, Math.max(16, Math.floor(width / 34)));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - .5) * .1,
    vy: (Math.random() - .5) * .1,
    r: Math.random() * 1.1 + .35
  }));
}

function drawField() {
  ctx.clearRect(0, 0, width, height);
  particles.forEach((particle, index) => {
    particle.x += particle.vx;
    particle.y += particle.vy;
    if (particle.x < 0 || particle.x > width) particle.vx *= -1;
    if (particle.y < 0 || particle.y > height) particle.vy *= -1;
    ctx.fillStyle = "rgba(255,255,255,.14)";
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
    ctx.fill();

    for (let next = index + 1; next < particles.length; next += 1) {
      const other = particles[next];
      const distance = Math.hypot(particle.x - other.x, particle.y - other.y);
      if (distance < 115) {
        const strength = (1 - distance / 115) * (document.body.classList.contains("signal-unlocked") ? .13 : .045);
        ctx.strokeStyle = `rgba(184,255,106,${strength})`;
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(other.x, other.y);
        ctx.stroke();
      }
    }
  });
  if (!reducedMotion) requestAnimationFrame(drawField);
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);
drawField();
