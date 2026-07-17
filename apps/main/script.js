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
      description: "Небольшое устройство для просмотра данных, которыми обмениваются блоки в машине. Оно может сохранять их на карту памяти и показывать на маленьком экране.",
      proof: "Сам собираю и программу, и электронику, чтобы всё работало как один прибор.",
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
      description: "Приложения для Flipper Zero, которые считывают номер ключа и сами заносят его в таблицу. Это убирает долгую ручную работу.",
      proof: "Помогает быстро и без путаницы подготовить много ключей.",
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
      description: "Программа для Windows, которая сама выполняет действия по простым правилам. Например, может ждать файл, время или запуск другой программы.",
      proof: "Вместо десятков отдельных таймеров - одно место для настройки автоматизации.",
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
      description: "Рисовалка: рисуешь в браузере, и рисунок сразу появляется на маленьком экране устройства.",
      proof: "Связал сайт и самодельное устройство так, чтобы они отвечали друг другу.",
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
      description: "Моя интерактивная визитка. Здесь есть проекты, карточка, которая реагирует на курсор, и терминал с секретной мини-системой.",
      proof: "Показывает, что я могу сделать сайт не просто страницей с текстом.",
      tags: ["HTML", "CSS", "JavaScript", "UX", "Virtual FS"],
      status: "LIVE",
      images: [
        { src: "assets/projects/web-cover.svg", alt: "Интерактивный сайт-портфолио Кошелева Романа" }
      ]
    },
    {
      id: "lab",
      number: "06",
      category: "software",
      title: "HTML LAB",
      subtitle: "Интерактивные эксперименты с физикой",
      glyph: "L",
      type: "WEB / INTERACTIVE EXPERIMENTS",
      year: "2026",
      description: "Отдельная лаборатория с интерактивными физическими сценами: резиновым шаром, порталами, датчиками движения и управлением с клавиатуры или тача.",
      proof: "Показывает, как я собираю сложное поведение в понятный браузерный интерфейс.",
      tags: ["Canvas", "Physics", "Web Components", "Touch", "JavaScript"],
      status: "LIVE",
      url: "https://lab.romeo558.ru/",
      cta: "ОТКРЫТЬ ЛАБОРАТОРИЮ ↗",
      images: [
        { src: "assets/projects/lab-cover.svg", alt: "Интерактивная HTML-лаборатория Romeo558" }
      ]
    }
  ]
};

// Set this to "en" only in the forced-English package. Otherwise, browser
// language is used as a privacy-friendly approximation of the visitor's locale.
const FORCED_LANGUAGE = null;
const russianLanguagePrefixes = ["ru", "uk", "be"];
const detectedLanguage = navigator.languages?.[0] || navigator.language || "en";
const browserLocale = detectedLanguage.toLowerCase();
const detectedSiteLanguage = russianLanguagePrefixes.some(prefix => browserLocale.startsWith(prefix)) ? "ru"
  : browserLocale.startsWith("fr") ? "fr"
  : browserLocale.startsWith("it") ? "it"
  : browserLocale.startsWith("es") ? "es"
  : browserLocale.startsWith("kk") ? "kk"
  : browserLocale === "en-gb" ? "en-GB"
  : "en";
const siteLanguage = FORCED_LANGUAGE || detectedSiteLanguage;

// Terminal copy lives here instead of in command handlers. Add a new locale as
// another object with the same keys - commands and filesystem logic stay intact.
const TERMINAL_I18N = {
  ru: {
    welcome: "Профиль загружен. Введи help. Для любопытных существует команда из двух слов.",
    session: "user: guest\nprofile: Кошелев Роман\nmode: portfolio shell\nchannel: 558",
    tutorialTitle: "ROMEO.OS БЫСТРЫЙ СТАРТ", tutorialSteps: ["прочитает приветствие владельца системы", "покажет информацию о системе", "покажет файлы, папки и права", "перейдёт к описаниям проектов", "откроет описание проекта", "создаст виртуальный файл", "откроет встроенный редактор"],
    tutorialNote: "Файловая система существует только внутри страницы и хранится в localStorage этого браузера. Команды ping и nmap являются визуальной симуляцией.",
    welcomeFile: "Здравствуй, любопытный пользователь!\nЭта виртуальная машина полностью в вашем распоряжении. Пожалуйста, не сломай ничего и постарайся не удалять корневые каталоги (это опционально).",
    cuntFile: "CUNT - CAN Utility aNd Tool\n\nМой проект портативного инструмента для работы с автомобильной CAN-шиной. Устройство на ESP32-S3 объединяет работу с CAN-шиной, OLED-интерфейс, физические кнопки, запись на microSD и собственную прошивку.",
    keyflowFile: "Keyflow - мой проект по автоматизации работы с ключами. Связка Flipper Zero и HID передаёт UID в таблицу и убирает ручную рутину. Это сократило время работы в 45 раз и убрало ошибки.",
    oledFile: "OLED Painter - мой эксперимент по объединению браузерного интерфейса и физического устройства на ESP32-S3. Плата создаёт Wi-Fi точку доступа, данные передаются в реальном времени, а рисунок с телефона или компьютера сразу появляется на экране.",
    schedulerFile: "Advanced Scheduler - мой проект расширенного планировщика задач для Windows на Rust. Он собирает автоматизацию из условий и действий: процессов, файлов, времени, бездействия, запуска команд и системных операций.",
    siteFile: "Этот сайт - интерактивная визитка Кошелева Романа, собранная на чистых HTML, CSS и JavaScript. Внутри: адаптивное портфолио, интерактивная ID-карта, терминал, записываемая виртуальная файловая система, nano, neofetch, debug-консоль и аварийное самовосстановление.",
    todoFile: "- исправить мобильную верстку\n- удалить интерфейс отладки\n- перестать выпускать недоработанный код\n- не забыть купить молоко\n- опять переписать парсер терминала\n- не забыть удалить этот файл перед релизом",
    privateNote: "Идея может начинаться как эксперимент. Ценность появляется, когда прототип действительно запускается и отвечает на вопрос: работает ли это?",
    projectMissing: 'Проект "{id}" не найден. Используй work или ls /projects.', projectOpen: "Открываю {name}...",
    commandHelp: "whoami          профессиональный профиль\nwork             список проектов\nopen <id>        открыть проект\nstatus           состояние профиля\ncontact          контакты\ngithub           открыть GitHub\nemail            написать письмо\nneofetch         информация о romeoOS\nopenweb <url>    открыть ссылку\ncowsay <text>    важная системная утилита\ndebug            JS-консоль страницы\neaster egg       смонтировать romeoOS\nclear            очистить вывод\nexit             закрыть терминал",
    whoamiTitle: "КОШЕЛЕВ РОМАН", whoami: "Разработчик и инженер. Создаю web-интерфейсы, системные инструменты и embedded-прототипы. Сильная сторона - соединять код, железо и UX в одном рабочем решении.",
    openingGithub: "Открываю GitHub...", openingEmail: "Открываю почтовый клиент...", commandNotFound: "{command}: command not found. Введи help.",
    mounted: "виртуальная файловая система подключена в режиме чтения и записи", alreadyMounted: "файловая система уже подключена к /dev/portfolio0", unlock: "токен разблокировки принят", mounting: "подключаю /dev/portfolio0 к / ...", syncing: "синхронизирую виртуальную файловую систему ...", returned: "возврат в оболочку портфолио", debugInfo: "JavaScript выполняется в контексте страницы браузера. Он может менять текущий DOM и состояние romeoOS, но не имеет доступа к серверу и файлам устройства.\n\nИспользуй .help для примеров и .exit для выхода.", leaveDebug: "выход из debug-консоли -> {mode}", input: "введи команду",
    recoveryComplete: "восстановление завершено: файловая система восстановлена из зеркала журнала", rootRevoked: "права root отозваны у guest. Неплохая попытка.",
    recoveryFound: "НАЙДЕНО ЯДРО ВОССТАНОВЛЕНИЯ", recoveryCountdown: "АВТОВОССТАНОВЛЕНИЕ ЧЕРЕЗ {seconds}", recoverySearching: "ПОИСК ЯДРА ВОССТАНОВЛЕНИЯ", recoverySteps: ["загрузка ядра восстановления из зеркального сектора", "сканирование фрагментов журнала", "восстановление таблицы виртуальных inode", "восстановление модулей портфолио", "сборка состояния интерфейса", "переподключение /dev/portfolio0 для записи", "файловая система чиста - перезапуск интерфейса"]
  },
  en: {
    welcome: "Profile loaded. Type help. A two-word command exists for curious visitors.",
    session: "user: guest\nprofile: Roman Koshelev\nmode: portfolio shell\nchannel: 558",
    tutorialTitle: "ROMEO.OS QUICK START", tutorialSteps: ["reads the owner's welcome message", "shows system information", "lists files, folders and permissions", "opens the project descriptions", "opens a project description", "creates a virtual file", "opens the built-in editor"],
    tutorialNote: "The filesystem exists only inside this page and is stored in this browser's localStorage. ping and nmap are visual simulations.",
    welcomeFile: "Hello, curious visitor!\nThis virtual machine is entirely at your disposal. Please do not break anything and try not to delete the root directories (optional).",
    cuntFile: "CUNT - CAN Utility aNd Tool\n\nMy portable tool for working with automotive CAN buses. The ESP32-S3 device combines CAN handling, an OLED interface, physical controls, microSD logging and custom firmware.",
    keyflowFile: "Keyflow is my key-workflow automation project. A Flipper Zero and HID setup sends UIDs to a spreadsheet and removes manual routine. It reduced the work time by 45 times and eliminated errors.",
    oledFile: "OLED Painter is my experiment in combining a browser interface with a physical ESP32-S3 device. The board creates a Wi-Fi access point, data moves in real time, and a drawing from a phone or computer appears on the display immediately.",
    schedulerFile: "Advanced Scheduler is my extended Windows task scheduler written in Rust. It builds automation from conditions and actions: processes, files, time, inactivity, command launches and system operations.",
    siteFile: "This site is Roman Koshelev's interactive portfolio, built with plain HTML, CSS and JavaScript. Inside: a responsive portfolio, interactive ID card, terminal, writable virtual filesystem, nano, neofetch, debug console and emergency self-recovery.",
    todoFile: "- fix the mobile layout\n- remove the debug interface\n- stop releasing unfinished code\n- remember to buy milk\n- rewrite the terminal parser again\n- remember to delete this file before release",
    privateNote: "An idea can start as an experiment. Value appears when a prototype actually runs and answers the question: does it work?",
    projectMissing: 'Project "{id}" was not found. Use work or ls /projects.', projectOpen: "Opening {name}...",
    commandHelp: "whoami          professional profile\nwork             project list\nopen <id>        open a project\nstatus           profile status\ncontact          contact details\ngithub           open GitHub\nemail            write an email\nneofetch         romeoOS information\nopenweb <url>    open a link\ncowsay <text>    essential system utility\ndebug            page JavaScript console\neaster egg       mount romeoOS\nclear            clear output\nexit             close terminal",
    whoamiTitle: "ROMAN KOSHELEV", whoami: "Developer and engineer. I build web interfaces, system tools and embedded prototypes. My strength is bringing code, hardware and UX together in one practical solution.",
    openingGithub: "Opening GitHub...", openingEmail: "Opening email client...", commandNotFound: "{command}: command not found. Type help.",
    mounted: "virtual filesystem mounted read-write", alreadyMounted: "filesystem already mounted at /dev/portfolio0", unlock: "unlock token accepted", mounting: "mounting /dev/portfolio0 on / ...", syncing: "syncing virtual filesystem ...", returned: "returned to portfolio shell", debugInfo: "JavaScript executes in this page's browser context. It can modify the current DOM and romeoOS state, but it has no server access and cannot inspect files on the device.\n\nUse .help for examples and .exit to leave.", leaveDebug: "leaving debug console -> {mode}", input: "type a command",
    recoveryComplete: "recovery complete: filesystem restored from journal mirror", rootRevoked: "root privileges revoked for guest. Nice try.",
    recoveryFound: "RECOVERY KERNEL FOUND", recoveryCountdown: "AUTO-RECOVERY IN {seconds}", recoverySearching: "SEARCHING FOR RECOVERY KERNEL", recoverySteps: ["booting recovery kernel from mirrored sector", "scanning journal fragments", "reconstructing virtual inode table", "restoring portfolio modules", "rebuilding interface state", "remounting /dev/portfolio0 read-write", "filesystem clean - rebooting UI"]
  }
};

// Locale overrides inherit the complete American-English terminal dictionary.
// Only text differs - command names and terminal behaviour remain universal.
Object.assign(TERMINAL_I18N, {
  "en-GB": { ...TERMINAL_I18N.en, welcome: "Profile loaded. Type help. A two-word command exists for curious visitors.", whoami: "Developer and engineer. I build web interfaces, system tools and embedded prototypes. My strength is bringing code, hardware and UX together in one practical solution." },
  fr: { ...TERMINAL_I18N.en, welcome: "Profil chargé. Tape help. Une commande en deux mots attend les visiteurs curieux.", session: "user: guest\nprofile: Roman Koshelev\nmode: portfolio shell\nchannel: 558", tutorialTitle: "DÉMARRAGE RAPIDE ROMEO.OS", tutorialSteps: ["lit le message d'accueil du propriétaire", "affiche les informations système", "liste les fichiers, dossiers et permissions", "ouvre les descriptions de projets", "ouvre une description de projet", "crée un fichier virtuel", "ouvre l'éditeur intégré"], tutorialNote: "Le système de fichiers existe uniquement dans cette page et est enregistré dans le localStorage de ce navigateur. ping et nmap sont des simulations visuelles.", welcomeFile: "Bonjour, visiteur curieux !\nCette machine virtuelle est entièrement à ta disposition. Essaie simplement de ne pas supprimer les répertoires racine.", cuntFile: "CUNT - CAN Utility aNd Tool\n\nMon outil portable pour les bus CAN automobiles. L'appareil ESP32-S3 réunit la gestion CAN, une interface OLED, des commandes physiques, l'enregistrement microSD et un firmware maison.", keyflowFile: "Keyflow est mon projet d'automatisation du travail avec des clés. Un ensemble Flipper Zero et HID envoie les UID vers un tableau et enlève les tâches manuelles.", oledFile: "OLED Painter est mon expérience réunissant une interface navigateur et un appareil ESP32-S3. Les données passent en temps réel et le dessin apparaît immédiatement sur l'écran.", schedulerFile: "Advanced Scheduler est mon planificateur Windows étendu, écrit en Rust. Il compose l'automatisation avec des conditions et des actions.", siteFile: "Ce site est le portfolio interactif de Roman Koshelev, construit avec HTML, CSS et JavaScript purs. Il comprend un portfolio, une carte ID, un terminal et un système de fichiers virtuel.", todoFile: "- corriger la mise en page mobile\n- supprimer l'interface de débogage\n- arrêter de publier du code inachevé\n- penser à acheter du lait\n- réécrire encore le parseur du terminal\n- supprimer ce fichier avant la sortie", privateNote: "Une idée peut commencer comme une expérience. Sa valeur apparaît lorsqu'un prototype fonctionne vraiment et répond à la question : est-ce que ça marche ?", projectMissing: 'Projet "{id}" introuvable. Utilise work ou ls /projects.', projectOpen: "Ouverture de {name}...", commandHelp: "whoami          profil professionnel\nwork             liste des projets\nopen <id>        ouvrir un projet\nstatus           état du profil\ncontact          coordonnées\ngithub           ouvrir GitHub\nemail            écrire un e-mail\nneofetch         informations romeoOS\nopenweb <url>    ouvrir un lien\ncowsay <text>    utilitaire système essentiel\ndebug            console JavaScript de la page\neaster egg       monter romeoOS\nclear            effacer la sortie\nexit             fermer le terminal", whoamiTitle: "ROMAN KOSHELEV", whoami: "Développeur et ingénieur. Je crée des interfaces web, des outils système et des prototypes embarqués.", openingGithub: "Ouverture de GitHub...", openingEmail: "Ouverture du client e-mail...", commandNotFound: "{command}: commande introuvable. Tape help.", mounted: "système de fichiers virtuel monté en lecture-écriture", alreadyMounted: "système de fichiers déjà monté sur /dev/portfolio0", unlock: "jeton de déverrouillage accepté", mounting: "montage de /dev/portfolio0 sur / ...", syncing: "synchronisation du système de fichiers virtuel ...", returned: "retour au shell du portfolio", debugInfo: "JavaScript s'exécute dans le contexte du navigateur de cette page. Il peut modifier le DOM et l'état de romeoOS, mais il n'a pas accès au serveur ni aux fichiers de l'appareil.\n\nUtilise .help pour des exemples et .exit pour quitter.", leaveDebug: "sortie de la console debug -> {mode}", input: "tape une commande", recoveryComplete: "récupération terminée : système de fichiers restauré", rootRevoked: "privilèges root retirés à guest. Bien essayé.", recoveryFound: "NOYAU DE RÉCUPÉRATION TROUVÉ", recoveryCountdown: "RÉCUPÉRATION AUTO DANS {seconds}", recoverySearching: "RECHERCHE DU NOYAU DE RÉCUPÉRATION", recoverySteps: ["démarrage du noyau de récupération", "analyse du journal", "reconstruction des inode virtuels", "restauration des modules", "reconstruction de l'interface", "remontage en lecture-écriture", "système propre - redémarrage de l'interface"] },
  it: { ...TERMINAL_I18N.en, welcome: "Profilo caricato. Digita help. C'è un comando di due parole per i visitatori curiosi.", tutorialTitle: "AVVIO RAPIDO ROMEO.OS", tutorialSteps: ["legge il messaggio di benvenuto", "mostra le informazioni di sistema", "elenca file, cartelle e permessi", "apre le descrizioni dei progetti", "apre una descrizione del progetto", "crea un file virtuale", "apre l'editor integrato"], tutorialNote: "Il file system esiste solo in questa pagina e viene salvato nel localStorage del browser. ping e nmap sono simulazioni visive.", welcomeFile: "Ciao, visitatore curioso!\nQuesta macchina virtuale è interamente a tua disposizione. Cerca solo di non eliminare le directory radice.", cuntFile: "CUNT - CAN Utility aNd Tool\n\nIl mio strumento portatile per bus CAN automobilistici. Il dispositivo ESP32-S3 unisce gestione CAN, interfaccia OLED, controlli fisici, log su microSD e firmware personalizzato.", keyflowFile: "Keyflow è il mio progetto di automazione per il lavoro con le chiavi. Flipper Zero e HID inviano UID a un foglio di calcolo e rimuovono il lavoro manuale.", oledFile: "OLED Painter è il mio esperimento che unisce un'interfaccia browser e un dispositivo ESP32-S3. I dati passano in tempo reale e il disegno appare subito sul display.", schedulerFile: "Advanced Scheduler è il mio pianificatore Windows avanzato scritto in Rust. Costruisce automazioni da condizioni e azioni.", siteFile: "Questo sito è il portfolio interattivo di Roman Koshelev, creato con HTML, CSS e JavaScript puri.", todoFile: "- correggere il layout mobile\n- rimuovere l'interfaccia di debug\n- smettere di pubblicare codice incompleto\n- ricordarsi di comprare il latte\n- riscrivere ancora il parser del terminale\n- eliminare questo file prima del rilascio", privateNote: "Un'idea può iniziare come un esperimento. Il valore appare quando un prototipo funziona davvero.", projectMissing: 'Progetto "{id}" non trovato. Usa work o ls /projects.', projectOpen: "Apertura di {name}...", commandHelp: "whoami          profilo professionale\nwork             elenco progetti\nopen <id>        apri un progetto\nstatus           stato del profilo\ncontact          contatti\ngithub           apri GitHub\nemail            scrivi un'e-mail\nneofetch         informazioni romeoOS\nopenweb <url>    apri un link\ncowsay <text>    utile strumento di sistema\ndebug            console JavaScript della pagina\neaster egg       monta romeoOS\nclear            cancella l'output\nexit             chiudi il terminale", whoami: "Sviluppatore e ingegnere. Creo interfacce web, strumenti di sistema e prototipi embedded.", openingGithub: "Apertura di GitHub...", openingEmail: "Apertura del client e-mail...", commandNotFound: "{command}: comando non trovato. Digita help.", mounted: "file system virtuale montato in lettura-scrittura", alreadyMounted: "file system già montato su /dev/portfolio0", unlock: "token di sblocco accettato", mounting: "montaggio di /dev/portfolio0 su / ...", syncing: "sincronizzazione del file system virtuale ...", returned: "ritorno alla shell del portfolio", input: "digita un comando", recoveryComplete: "ripristino completato: file system restaurato", rootRevoked: "privilegi root revocati a guest. Bel tentativo.", recoveryFound: "KERNEL DI RIPRISTINO TROVATO", recoveryCountdown: "RIPRISTINO AUTOMATICO TRA {seconds}", recoverySearching: "RICERCA DEL KERNEL DI RIPRISTINO", recoverySteps: ["avvio del kernel di ripristino", "scansione del journal", "ricostruzione degli inode virtuali", "ripristino dei moduli", "ricostruzione dell'interfaccia", "rimontaggio in lettura-scrittura", "file system pulito - riavvio dell'interfaccia"] },
  es: { ...TERMINAL_I18N.en, welcome: "Perfil cargado. Escribe help. Hay un comando de dos palabras para visitantes curiosos.", tutorialTitle: "INICIO RÁPIDO DE ROMEO.OS", tutorialSteps: ["lee el mensaje de bienvenida", "muestra información del sistema", "lista archivos, carpetas y permisos", "abre las descripciones de proyectos", "abre una descripción de proyecto", "crea un archivo virtual", "abre el editor integrado"], tutorialNote: "El sistema de archivos existe solo dentro de esta página y se guarda en el localStorage del navegador. ping y nmap son simulaciones visuales.", welcomeFile: "Hola, visitante curioso.\nEsta máquina virtual está completamente a tu disposición. Solo intenta no borrar los directorios raíz.", cuntFile: "CUNT - CAN Utility aNd Tool\n\nMi herramienta portátil para buses CAN de automóviles. El dispositivo ESP32-S3 reúne CAN, interfaz OLED, controles físicos, registro en microSD y firmware propio.", keyflowFile: "Keyflow es mi proyecto de automatización de trabajo con llaves. Flipper Zero y HID envían UID a una hoja de cálculo y eliminan trabajo manual.", oledFile: "OLED Painter es mi experimento que une una interfaz de navegador y un dispositivo ESP32-S3. Los datos viajan en tiempo real y el dibujo aparece de inmediato en la pantalla.", schedulerFile: "Advanced Scheduler es mi planificador avanzado de tareas de Windows escrito en Rust. Construye automatización con condiciones y acciones.", siteFile: "Este sitio es el portfolio interactivo de Roman Koshelev, creado con HTML, CSS y JavaScript puros.", todoFile: "- arreglar el diseño móvil\n- eliminar la interfaz de depuración\n- dejar de publicar código sin terminar\n- recordar comprar leche\n- reescribir otra vez el analizador del terminal\n- borrar este archivo antes del lanzamiento", privateNote: "Una idea puede empezar como un experimento. El valor aparece cuando un prototipo realmente funciona.", projectMissing: 'Proyecto "{id}" no encontrado. Usa work o ls /projects.', projectOpen: "Abriendo {name}...", commandHelp: "whoami          perfil profesional\nwork             lista de proyectos\nopen <id>        abrir un proyecto\nstatus           estado del perfil\ncontact          contacto\ngithub           abrir GitHub\nemail            escribir correo\nneofetch         información de romeoOS\nopenweb <url>    abrir enlace\ncowsay <text>    utilidad esencial\ndebug            consola JavaScript\neaster egg       montar romeoOS\nclear            limpiar salida\nexit             cerrar terminal", whoami: "Desarrollador e ingeniero. Creo interfaces web, herramientas de sistema y prototipos embebidos.", openingGithub: "Abriendo GitHub...", openingEmail: "Abriendo el cliente de correo...", commandNotFound: "{command}: comando no encontrado. Escribe help.", mounted: "sistema de archivos virtual montado en lectura y escritura", alreadyMounted: "sistema de archivos ya montado en /dev/portfolio0", unlock: "token de desbloqueo aceptado", mounting: "montando /dev/portfolio0 en / ...", syncing: "sincronizando el sistema de archivos virtual ...", returned: "vuelta a la shell del portfolio", input: "escribe un comando", recoveryComplete: "recuperación completa: sistema de archivos restaurado", rootRevoked: "privilegios root revocados para guest. Buen intento.", recoveryFound: "KERNEL DE RECUPERACIÓN ENCONTRADO", recoveryCountdown: "RECUPERACIÓN AUTOMÁTICA EN {seconds}", recoverySearching: "BUSCANDO KERNEL DE RECUPERACIÓN", recoverySteps: ["iniciando kernel de recuperación", "analizando journal", "reconstruyendo inodos virtuales", "restaurando módulos", "reconstruyendo la interfaz", "remontando lectura-escritura", "sistema limpio - reiniciando interfaz"] },
  kk: { ...TERMINAL_I18N.en, welcome: "Профиль жүктелді. help деп теріңіз. Қызыққандарға екі сөзден тұратын команда бар.", tutorialTitle: "ROMEO.OS ЖЫЛДАМ БАСТАУ", tutorialSteps: ["иесінің сәлемдесуін оқиды", "жүйе туралы ақпаратты көрсетеді", "файлдар, бумалар және рұқсаттарды көрсетеді", "жоба сипаттамаларын ашады", "жоба сипаттамасын ашады", "виртуалды файл жасайды", "кіріктірілген редакторды ашады"], tutorialNote: "Файлдық жүйе тек осы беттің ішінде бар және браузердің localStorage жадында сақталады. ping және nmap - визуалды модельдеу.", welcomeFile: "Сәлем, қызыққұмар қонақ!\nБұл виртуалды машина толығымен сіздің қарамағыңызда. Тек түбірлік бумаларды өшірмеуге тырысыңыз.", cuntFile: "CUNT - CAN Utility aNd Tool\n\nАвтокөліктің CAN шинасына арналған портативті құралым. ESP32-S3 құрылғысы CAN, OLED интерфейсі, физикалық басқару, microSD жазбасы және өз firmware-ін біріктіреді.", keyflowFile: "Keyflow - кілттермен жұмысты автоматтандыру жобам. Flipper Zero және HID UID-терді кестеге жібереді және қолмен істейтін жұмысты азайтады.", oledFile: "OLED Painter - браузер интерфейсі мен ESP32-S3 құрылғысын біріктіретін тәжірибем. Деректер нақты уақытта беріледі, сурет экранда бірден пайда болады.", schedulerFile: "Advanced Scheduler - Rust тілінде жазылған кеңейтілген Windows тапсырмалар жоспарлағышым. Ол автоматтандыруды шарттар мен әрекеттерден құрастырады.", siteFile: "Бұл сайт - таза HTML, CSS және JavaScript-пен жасалған Роман Кошелевтің интерактивті портфолиосы.", todoFile: "- мобильді беттеуді түзету\n- debug интерфейсін жою\n- аяқталмаған кодты шығаруды тоқтату\n- сүт сатып алуды ұмытпау\n- терминал парсерін тағы жазу\n- релиз алдында бұл файлды жою", privateNote: "Идея тәжірибеден басталуы мүмкін. Құндылық прототип шынымен жұмыс істегенде пайда болады.", projectMissing: '"{id}" жобасы табылмады. work немесе ls /projects қолданыңыз.', projectOpen: "{name} ашылуда...", commandHelp: "whoami          кәсіби профиль\nwork             жоба тізімі\nopen <id>        жобаны ашу\nstatus           профиль күйі\ncontact          байланыстар\ngithub           GitHub ашу\nemail            хат жазу\nneofetch         romeoOS ақпараты\nopenweb <url>    сілтеме ашу\ncowsay <text>    маңызды жүйелік құрал\ndebug            JavaScript консолі\neaster egg       romeoOS қосу\nclear            шығысты тазалау\nexit             терминалды жабу", whoami: "Әзірлеуші және инженер. Веб-интерфейстер, жүйелік құралдар және embedded прототиптер жасаймын.", openingGithub: "GitHub ашылуда...", openingEmail: "Пошта клиенті ашылуда...", commandNotFound: "{command}: команда табылмады. help деп теріңіз.", mounted: "виртуалды файлдық жүйе оқу-жазу режимінде қосылды", alreadyMounted: "файлдық жүйе /dev/portfolio0 жүйесіне қосылған", unlock: "құлыпты ашу токені қабылданды", mounting: "/dev/portfolio0 жүйесі / ішіне қосылуда ...", syncing: "виртуалды файлдық жүйе синхрондалуда ...", returned: "портфолио shell-іне оралу", input: "команда теріңіз", recoveryComplete: "қалпына келтіру аяқталды: файлдық жүйе қалпына келтірілді", rootRevoked: "guest үшін root құқықтары кері қайтарылды. Жақсы талпыныс.", recoveryFound: "ҚАЛПЫНА КЕЛТІРУ ЯДРОСЫ ТАБЫЛДЫ", recoveryCountdown: "АВТОМАТТЫ ҚАЛПЫНА КЕЛТІРУ {seconds} КЕЙІН", recoverySearching: "ҚАЛПЫНА КЕЛТІРУ ЯДРОСЫН ІЗДЕУ", recoverySteps: ["қалпына келтіру ядросын жүктеу", "журналды сканерлеу", "виртуалды inode кестесін қалпына келтіру", "модульдерді қалпына келтіру", "интерфейсті қайта құрастыру", "оқу-жазу режимінде қайта қосу", "файлдық жүйе таза - интерфейсті қайта жүктеу"] }
});
function t(key, values = {}) {
  const lookup = locale => key.split(".").reduce((value, part) => value?.[part], TERMINAL_I18N[locale]);
  const value = lookup(siteLanguage) ?? lookup("en") ?? key;
  if (Array.isArray(value)) return value;
  return String(value).replace(/\{(\w+)\}/g, (_, name) => values[name] ?? `{${name}}`);
}

const englishProjects = {
  cunt: { subtitle: "CAN Utility aNd Tool", description: "A small device for looking at the data shared by car modules. It can save it to a memory card and show it on a small screen.", proof: "I build both the software and the electronics so they work as one tool.", type: "EMBEDDED / AUTOMOTIVE", status: "ACTIVE BUILD", alt: "CAN Utility aNd Tool interface concept" },
  keyflow: { subtitle: "Key-workflow automation", description: "Flipper Zero apps that read a key number and put it into a spreadsheet automatically. This removes long manual work.", proof: "Helps prepare many keys quickly and without mix-ups.", type: "FLIPPER ZERO / WORKFLOW", status: "WORKING PROTOTYPE", alt: "Keyflow project visualization" },
  scheduler: { subtitle: "Conditions, rules and actions", description: "A Windows program that performs actions from simple rules. For example, it can wait for a file, a time or another program to start.", proof: "One place for automation instead of lots of separate timers.", type: "WINDOWS / SYSTEM TOOL", status: "IN DEVELOPMENT", alt: "Advanced Scheduler rules-engine diagram" },
  painter: { subtitle: "A browser that draws on a microcontroller", description: "A drawing app: draw in the browser and the picture appears right away on the device's small screen.", proof: "A website and a homemade device react to each other.", type: "ESP32 / WEB INTERFACE", status: "COMPLETE", alt: "OLED Painter project interface" },
  web: { title: "THIS SITE", subtitle: "Interactive portfolio and browser-based romeoOS", description: "My interactive portfolio. It has projects, a card that reacts to the cursor and a terminal with a secret mini-system.", proof: "Shows that I can make a website more than a page with text.", type: "WEB / PERSONAL PORTFOLIO", status: "LIVE", alt: "Koshelev Roman interactive portfolio website" },
  lab: { title: "HTML LAB", subtitle: "Interactive physics experiments", description: "A separate laboratory with interactive physics scenes: a rubber ball, portals, motion sensors, and keyboard or touch controls.", proof: "Shows how I turn complex behaviour into a clear browser interface.", type: "WEB / INTERACTIVE EXPERIMENTS", status: "LIVE", cta: "OPEN LAB ↗", alt: "Romeo558 interactive HTML laboratory" }
};

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
}

const EXTRA_SITE_COPY = {
  fr: { portfolio: "Portfolio", email: "E-mail", terminal: "Terminal", statement: "Je transforme les idées en <span class=\"scramble\" data-text=\"systèmes fonctionnels\">systèmes fonctionnels</span>.", intro: "Je conçois des interfaces web, des outils système et des prototypes embarqués. Je réunis code, matériel et UX dans une solution concrète.", projects: "Voir les projets", mail: "Envoyer un e-mail", copy: "copier", open: "ouvrir ↗", projectDescription: "Des projets qui montrent mieux qu'une liste de technologies ce que je sais construire.", all: "tous", hardware: "matériel", software: "logiciel", contact: "Un projet à la croisée de l'interface, de l'automatisation et du matériel ?", top: "↑ retour en haut", labCta: "OUVRIR LE LABO ↗" },
  it: { portfolio: "Portfolio", email: "E-mail", terminal: "Terminale", statement: "Trasformo le idee in <span class=\"scramble\" data-text=\"sistemi funzionanti\">sistemi funzionanti</span>.", intro: "Progetto interfacce web, strumenti di sistema e prototipi embedded. Unisco codice, hardware e UX in una soluzione concreta.", projects: "Vedi progetti", mail: "Invia un'e-mail", copy: "copia", open: "apri ↗", projectDescription: "Progetti che mostrano meglio di un elenco di tecnologie ciò che so costruire.", all: "tutti", hardware: "hardware", software: "software", contact: "Hai un progetto tra interfaccia, automazione e hardware?", top: "↑ torna su", labCta: "APRI IL LAB ↗" },
  es: { portfolio: "Portafolio", email: "Correo", terminal: "Terminal", statement: "Convierto ideas en <span class=\"scramble\" data-text=\"sistemas que funcionan\">sistemas que funcionan</span>.", intro: "Diseño interfaces web, herramientas de sistema y prototipos embebidos. Uno código, hardware y UX en una solución práctica.", projects: "Ver proyectos", mail: "Enviar correo", copy: "copiar", open: "abrir ↗", projectDescription: "Proyectos que muestran mejor que una lista de tecnologías lo que sé construir.", all: "todos", hardware: "hardware", software: "software", contact: "¿Tienes una tarea entre interfaz, automatización y hardware?", top: "↑ volver arriba", labCta: "ABRIR EL LAB ↗" },
  kk: { portfolio: "Портфолио", email: "Пошта", terminal: "Терминал", statement: "Идеяларды <span class=\"scramble\" data-text=\"жұмыс істейтін жүйелерге\">жұмыс істейтін жүйелерге</span> айналдырамын.", intro: "Веб-интерфейстерді жобалаймын, жүйелік құралдар мен embedded прототиптер жасаймын. Кодты, темірді және UX-ті бір практикалық шешімге біріктіремін.", projects: "Жобаларды көру", mail: "Поштаға жазу", copy: "көшіру", open: "ашу ↗", projectDescription: "Технологиялар тізімінен гөрі нені жасай алатынымды жақсы көрсететін жобалар.", all: "барлығы", hardware: "жабдық", software: "софт", contact: "Интерфейс, автоматтандыру және жабдық қиылысындағы міндет бар ма?", top: "↑ жоғары", labCta: "ЗЕРТХАНАНЫ АШУ ↗" }
};

function localizeVisibleSite() {
  document.documentElement.lang = siteLanguage;
  const russian = siteLanguage === "ru";
  setText(".boot-identity", russian ? "КОШЕЛЕВ РОМАН / ЛИЧНОЕ ПОРТФОЛИО" : "ROMAN KOSHELEV / PERSONAL PORTFOLIO");
  setText(".eyebrow", russian ? "OPEN TO INTERESTING BUILDS / KAZAN" : "OPEN TO INTERESTING BUILDS / KAZAN");
  [".hero-proof > div:nth-child(1) strong", ".hero-proof > div:nth-child(2) strong", ".hero-proof > div:nth-child(3) strong"].forEach((selector, index) => setText(selector, russian ? ["ВЕБ И UI", "СИСТЕМНЫЕ ИНСТРУМЕНТЫ", "EMBEDDED"][index] : ["WEB & UI", "SYSTEM TOOLS", "EMBEDDED"][index]));
  setText(".identity-topline span:first-child", russian ? "ИДЕНТИФИКАЦИЯ / KR-01" : "IDENTITY / KR-01");
  setText(".machine-state", russian ? "В СЕТИ" : "ONLINE");
  setText(".core-label small", russian ? "ПЕРЕТАСКИВАЙ" : "DRAG");
  [".identity-nameplate > div:first-child span", ".identity-nameplate > div:last-child span", ".machine-grid > div:nth-child(1) span", ".machine-grid > div:nth-child(2) span", ".machine-grid > div:nth-child(3) span", ".machine-grid > div:nth-child(4) span"].forEach((selector, index) => setText(selector, russian ? ["ИМЯ", "ПРОФИЛЬ", "ФОКУС", "ОБЛАСТЬ", "РЕЖИМ", "ВРЕМЯ РАБОТЫ"][index] : ["NAME", "PROFILE", "FOCUS", "RANGE", "MODE", "UPTIME"][index]));
  [".identity-nameplate > div:last-child strong", ".machine-grid > div:nth-child(1) strong", ".machine-grid > div:nth-child(2) strong", ".machine-grid > div:nth-child(3) strong"].forEach((selector, index) => setText(selector, russian ? ["РАЗРАБОТЧИК / ИНЖЕНЕР", "СОЗДАНИЕ", "КОД / ЖЕЛЕЗО / UX", "ПРОТОТИП"][index] : ["DEVELOPER / ENGINEER", "BUILDING", "CODE / HW / UX", "PROTOTYPE"][index]));
  setText(".ticker-track", russian
    ? "ВЕБ-ИНТЕРФЕЙСЫ × RUST-ИНСТРУМЕНТЫ × EMBEDDED-СИСТЕМЫ × ESP32 × АВТОМАТИЗАЦИЯ × ПРОТОТИПИРОВАНИЕ ЖЕЛЕЗА × ВЕБ-ИНТЕРФЕЙСЫ × RUST-ИНСТРУМЕНТЫ × EMBEDDED-СИСТЕМЫ × ESP32 × АВТОМАТИЗАЦИЯ × ПРОТОТИПИРОВАНИЕ ЖЕЛЕЗА"
    : "WEB INTERFACES × RUST TOOLS × EMBEDDED SYSTEMS × ESP32 × AUTOMATION × HARDWARE PROTOTYPING × WEB INTERFACES × RUST TOOLS × EMBEDDED SYSTEMS × ESP32 × AUTOMATION × HARDWARE PROTOTYPING");
  setText(".kicker", russian ? "ИЗБРАННЫЕ_РАБОТЫ / 2026" : "SELECTED_WORK / 2026");
  setText(".portfolio-contact > div:first-child > span", russian ? "СВЯЗЬ / НАПРЯМУЮ" : "CONTACT / DIRECT");
  setText(".footer > span:nth-child(2)", russian ? "HTML / CSS / JAVASCRIPT / БЕЗ ФРЕЙМВОРКОВ" : "HTML / CSS / JAVASCRIPT / NO FRAMEWORKS");
  setText(".terminal-statusbar > span:nth-child(2)", russian ? "↑↓ ИСТОРИЯ" : "↑↓ HISTORY");
  setText(".terminal-statusbar > span:nth-child(3)", russian ? "TAB АВТОДОПОЛНЕНИЕ" : "TAB AUTOCOMPLETE");
  setText(".terminal-statusbar > span:nth-child(4)", russian ? "ESC ЗАКРЫТЬ" : "ESC CLOSE");
  setText(".terminal-editor footer > span:nth-child(1)", russian ? "Ctrl S сохранить" : "Ctrl S save");
  setText(".terminal-editor footer > span:nth-child(2)", russian ? "Ctrl X выйти" : "Ctrl X exit");
  setText(".terminal-pager footer > span", russian ? "ПРОКРУТКА / Q / ESC ДЛЯ ЗАКРЫТИЯ" : "SCROLL / Q / ESC TO CLOSE");
  setText("#terminal-editor-save", russian ? "ЗАПИСАТЬ" : "WRITE OUT");
  if (russian) return;

  document.title = "Roman Koshelev - developer and engineer";
  setText("#page-title", document.title);
  document.querySelector("#page-description").content = "Roman Koshelev - developer and engineer. Web interfaces, system tools, automation and embedded prototypes.";
  document.querySelector("#og-title").content = document.title;
  document.querySelector("#og-description").content = "Interfaces, automation, embedded development and practical technical prototypes.";
  setText(".skip-boot", "skip boot sequence");
  setText(".brand-copy", "ROMAN KOSHELEV");
  document.querySelector(".brand-copy").insertAdjacentHTML("beforeend", " <small>DEVELOPER + ENGINEER</small>");
  setText(".top-nav a[href='#projects']", "Portfolio");
  setText(".top-nav a[href^='mailto']", "Email");
  setText("#open-terminal span:last-child", "Terminal");
  setText(".hero-role", "DEVELOPER / ENGINEER / SYSTEM BUILDER");
  document.querySelector("#hero-statement").innerHTML = 'I turn ideas into <span class="scramble" data-text="working systems">working systems</span>.';
  setText("#hero-intro", "I design web interfaces, write system tools and build embedded prototypes. I combine code, hardware and clear UX into one practical solution.");
  setText("#proof-web", "interfaces and visualization");
  setText("#proof-tools", "automation and native software");
  setText("#proof-embedded", "ESP32, protocols and devices");
  document.querySelector("#projects-link").innerHTML = "View projects <span>↘</span>";
  document.querySelector("#email-link").innerHTML = "Send an email <span>↗</span>";
  setText("#copy-email-label", "copy");
  setText("#open-github-label", "open ↗");
  setText(".hero-surname", "KOSHELEV");
  setText(".hero-firstname", "ROMAN");
  setText(".identity-nameplate > div:first-child strong", "ROMAN KOSHELEV");
  setText(".identity-footline span:first-child", "MOVE CURSOR ANYWHERE");
  setText(".identity-footline span:last-child", "VIEWPORT TRACKING ACTIVE");
  setText("#projects-title", "Portfolio");
  setText("#projects-description", "Projects that show what I can build better than a list of technologies.");
  const filters = { all: "all", hardware: "hardware", software: "software", flipper: "flipper" };
  Object.entries(filters).forEach(([filter, label]) => setText(`.filter-chip[data-filter='${filter}']`, label));
  setText("#contact-heading", "Have a task where interface design, automation and hardware meet?");
  setText("#back-top", "↑ back to top");
  document.querySelector(".footer > span:first-child").lastChild.textContent = " ROMAN KOSHELEV";

  CONFIG.projects.forEach(project => {
    const translation = englishProjects[project.id];
    if (!translation) return;
    Object.assign(project, translation);
    if (project.images?.[0]) project.images[0].alt = translation.alt;
  });

  const extra = EXTRA_SITE_COPY[siteLanguage];
  if (!extra) return;
  const labProject = CONFIG.projects.find(project => project.id === "lab");
  if (labProject && extra.labCta) labProject.cta = extra.labCta;
  setText(".top-nav a[href='#projects']", extra.portfolio);
  setText(".top-nav a[href^='mailto']", extra.email);
  setText("#open-terminal span:last-child", extra.terminal);
  document.querySelector("#hero-statement").innerHTML = extra.statement;
  setText("#hero-intro", extra.intro);
  document.querySelector("#projects-link").innerHTML = `${extra.projects} <span>↘</span>`;
  document.querySelector("#email-link").innerHTML = `${extra.mail} <span>↗</span>`;
  setText("#copy-email-label", extra.copy);
  setText("#open-github-label", extra.open);
  setText("#projects-description", extra.projectDescription);
  ["all", "hardware", "software"].forEach(key => setText(`.filter-chip[data-filter='${key}']`, extra[key]));
  setText("#contact-heading", extra.contact);
  setText("#back-top", extra.top);
}

localizeVisibleSite();

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(pointer: fine)").matches;

// Boot sequence
const bootScreen = $("#boot-screen");
const bootLog = $("#boot-log");
const bootLines = siteLanguage === "en" ? [
  "[ OK ] loading identity: KOSHELEV_ROMAN",
  "[ OK ] indexing selected work",
  "[ OK ] connecting contact endpoints",
  "[ OK ] viewport tracking ready",
  "[ OK ] portfolio online"
] : [
  "[ OK ] загрузка профиля: KOSHELEV_ROMAN",
  "[ OK ] индексация избранных работ",
  "[ OK ] подключение каналов связи",
  "[ OK ] отслеживание viewport готово",
  "[ OK ] портфолио в сети"
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
        <button class="project-thumb ${index === 0 ? "active" : ""}" data-image-index="${index}" type="button" aria-label="${siteLanguage === "en" ? "Show image" : "Показать изображение"} ${index + 1}">
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
          <div class="preview-proof"><span>${siteLanguage === "en" ? "WHAT THIS PROVES" : "ЧТО ЭТО ДОКАЗЫВАЕТ"}</span><strong>${project.proof}</strong></div>
        </div>
      </div>
      <div class="preview-footer">
        <div class="preview-tags">${project.tags.map(tag => `<span>${tag}</span>`).join("")}</div>
        <div class="preview-status"><span>${siteLanguage === "en" ? "STATUS" : "СТАТУС"}</span><b>${project.status}</b></div>
        ${project.url ? `<a class="project-visit-link" href="${project.url}" target="_blank" rel="noreferrer">${project.cta || "OPEN ↗"}</a>` : ""}
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

const FS_STORAGE_KEY = `romeoOS.virtualFS.v4.${siteLanguage}`;
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
    "welcome.txt": makeFile(t("welcomeFile")),
    "available_commands.txt": makeFile("touch, mkdir, rm, nano, chmod, alias, env, find, grep, neofetch\n\nls, cd, pwd, cat, less, tree, find, grep, echo, clear, whoami, hostname, date, uptime, history, alias, env, export, which, file, stat, wc, head, tail\n\nping, nmap, cowsay, debug\n\noperators: &&, |"),
    projects: makeDir({
      "cunt.txt": makeFile(t("cuntFile")), "keyflow.txt": makeFile(t("keyflowFile")), "oled.txt": makeFile(t("oledFile")), "scheduler.txt": makeFile(t("schedulerFile")), "this-site.txt": makeFile(t("siteFile"))
    }),
    stuff: makeDir({
      "TODO.txt": makeFile(t("todoFile")),
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
let terminalMonitor = null;

function appendTerminalLine(text, type = "") {
  if (terminalMonitor) {
    terminalMonitor.output.push(String(text ?? ""));
    terminalMonitor.failed ||= type.split(/\s+/).includes("error");
    if (terminalMonitor.capture) return null;
  }
  const line = document.createElement("div");
  line.className = `terminal-line ${type}`.trim();
  line.textContent = String(text ?? "");
  terminalOutput.appendChild(line);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
  return line;
}

function appendTerminalBlock(title, body) {
  if (terminalMonitor) {
    terminalMonitor.output.push(`${title}\n${body}`);
    if (terminalMonitor.capture) return;
  }
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
    <div class="tutorial-head"><span>${t("tutorialTitle")}</span><b>7 ${siteLanguage === "en" ? "STEPS" : "ШАГОВ"}</b></div>
    <ol>
      <li><code>cat welcome.txt</code><span>${t("tutorialSteps.0")}</span></li>
      <li><code>neofetch</code><span>${t("tutorialSteps.1")}</span></li>
      <li><code>ls -la</code><span>${t("tutorialSteps.2")}</span></li>
      <li><code>cd projects</code><span>${t("tutorialSteps.3")}</span></li>
      <li><code>cat cunt.txt</code><span>${t("tutorialSteps.4")}</span></li>
      <li><code>touch hello.txt</code><span>${t("tutorialSteps.5")}</span></li>
      <li><code>nano hello.txt</code><span>${t("tutorialSteps.6")}</span></li>
    </ol>
    <p>${t("tutorialNote")}</p>
  `;
  terminalOutput.appendChild(tutorial);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function openTerminal() {
  terminalModal.hidden = false;
  if (!terminalOutput.children.length) {
    appendTerminalLine("ROMAN.CLI 4.0 / ROMEO.OS PORTFOLIO SHELL", "success");
    appendTerminalLine(t("welcome"), "muted");
    appendTerminalBlock("SESSION", t("session"));
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
  appendTerminalBlock(siteLanguage === "en" ? "LAB NOTE" : "ЗАМЕТКА ИЗ ЛАБОРАТОРИИ", t("privateNote"));
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
  terminalInput.placeholder = debugActive ? "document.title or .exit" : fsActive ? "ls, nano, neofetch..." : t("input");

  const quickCommands = debugActive
    ? [["document.title", "document.title"], ["romeoOS", "romeoOS"], ["location.href", "location.href"], ["console.clear()", "console.clear()"], [".exit", ".exit"]]
    : fsActive
      ? [["cat welcome.txt", "cat welcome.txt"], ["neofetch", "neofetch"], ["ls -la", "ls -la"], ["cd projects", "cd projects"], ["help", "help"]]
      : [["whoami", "whoami"], ["work", "work"], ["neofetch", "neofetch"], ["contact", "contact"], ["help", "help"]];

  terminalRailLabel.textContent = debugActive ? "JAVASCRIPT" : fsActive ? "ROMEO.OS COMMANDS" : (siteLanguage === "en" ? "QUICK COMMANDS" : "БЫСТРЫЕ КОМАНДЫ");
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
    appendTerminalLine(t("alreadyMounted"), "muted");
    return;
  }
  shellMode = "filesystem";
  currentPath = [];
  appendTerminalLine(t("unlock"), "success");
  appendTerminalLine(t("mounting"), "muted");
  appendTerminalLine(t("mounted"), "success");
  appendTutorial();
  updateTerminalChrome();
}

function leaveFilesystem() {
  if (shellMode !== "filesystem") return;
  shellMode = "portfolio";
  appendTerminalLine(t("syncing"), "muted");
  saveVirtualFS();
  appendTerminalLine(t("returned"), "success");
  updateTerminalChrome();
}

function enterDebug(initialCode = "") {
  debugReturnMode = shellMode === "portfolio" ? "portfolio" : "filesystem";
  shellMode = "debug";
  appendTerminalBlock(siteLanguage === "en" ? "DEBUG CONSOLE" : "DEBUG-КОНСОЛЬ", t("debugInfo"));
  updateTerminalChrome();
  if (initialCode) evaluateDebugCode(initialCode);
}

function leaveDebug() {
  shellMode = debugReturnMode;
  appendTerminalLine(t("leaveDebug", { mode: shellMode }), "success");
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
  corruptionCountdown.textContent = t("recoveryCountdown", { seconds });
  const countdownTimer = setInterval(() => {
    seconds -= 1;
    corruptionCountdown.textContent = seconds > 0 ? t("recoveryCountdown", { seconds }) : t("recoverySearching");
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
  corruptionCountdown.textContent = t("recoveryFound");
  const steps = t("recoverySteps").map((text, index) => [text, [12, 29, 48, 67, 84, 96, 100][index]]);

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
    appendTerminalLine(t("recoveryComplete"), "success");
    appendTerminalLine(t("rootRevoked"), "muted");
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
    appendTerminalLine(t("projectMissing", { id: id || "" }), "error");
    return;
  }
  appendTerminalLine(t("projectOpen", { name: project.title }), "success");
  if (project.url) {
    setTimeout(() => window.open(project.url, "_blank", "noopener"), 260);
    return;
  }
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
    appendTerminalBlock("COMMAND INDEX", t("commandHelp"));
  },
  whoami() {
    appendTerminalBlock(t("whoamiTitle"), t("whoami"));
  },
  work() { appendTerminalBlock("SELECTED WORK", workList()); },
  status() { appendTerminalBlock("SYSTEM STATUS", "portfolio: ONLINE\nprojects indexed: 5\nfocus: WEB / SYSTEM TOOLS / EMBEDDED\navailability: OPEN TO INTERESTING BUILDS\nrecovery kernel: ARMED"); },
  contact() { appendTerminalBlock("CONTACT", `email: ${CONFIG.email}\ngithub: ${CONFIG.github}`); },
  github() { appendTerminalLine(t("openingGithub"), "success"); window.open(CONFIG.github, "_blank", "noopener,noreferrer"); },
  email() { appendTerminalLine(t("openingEmail"), "success"); location.href = `mailto:${CONFIG.email}`; },
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
      "  use && to run the next command after success; use | with grep, head, tail, wc, sort or uniq",
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
  date() { appendTerminalLine(new Date().toLocaleString(siteLanguage === "ru" ? "ru-RU" : "en-US", { dateStyle: "full", timeStyle: "medium" })); },
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

function parseShellOperators(value) {
  const segments = [];
  const operators = [];
  let current = "";
  let quote = null;
  let escaped = false;

  const pushSegment = operator => {
    const segment = current.trim();
    if (!segment) return { error: `shell: syntax error near unexpected token '${operator}'` };
    segments.push(segment);
    operators.push(operator);
    current = "";
    return null;
  };

  for (let index = 0; index < value.length; index += 1) {
    const char = value[index];
    if (escaped) {
      current += char;
      escaped = false;
      continue;
    }
    if (char === "\\" && quote !== "'") {
      current += char;
      escaped = true;
      continue;
    }
    if (quote) {
      current += char;
      if (char === quote) quote = null;
      continue;
    }
    if (char === "\"" || char === "'") {
      quote = char;
      current += char;
      continue;
    }
    if (char === "|" || (char === "&" && value[index + 1] === "&")) {
      const operator = char === "|" ? "|" : "&&";
      const problem = pushSegment(operator);
      if (problem) return problem;
      if (operator === "&&") index += 1;
      continue;
    }
    current += char;
  }

  if (!operators.length) return null;
  if (!current.trim()) return { error: `shell: syntax error near unexpected token '${operators.at(-1)}'` };
  segments.push(current.trim());
  return { segments, operators };
}

async function runMonitoredCommand(command, capture = false) {
  const previousMonitor = terminalMonitor;
  const monitor = { capture, failed: false, output: [] };
  terminalMonitor = monitor;
  try {
    await executeTerminalCommand(command, { display: false, history: false, skipOperators: true });
  } finally {
    terminalMonitor = previousMonitor;
  }
  return monitor;
}

function filterPipelineInput(commandText, input) {
  const tokens = tokenizeCommand(commandText);
  const command = tokens.shift()?.toLowerCase() || "";
  const args = tokens;
  const lines = input ? input.split("\n") : [];

  if (command === "cat" && !args.length) return { ok: true, output: input };
  if (command === "sort") return { ok: true, output: lines.sort((left, right) => left.localeCompare(right)).join("\n") };
  if (command === "uniq") return { ok: true, output: lines.filter((line, index) => index === 0 || line !== lines[index - 1]).join("\n") };

  if (command === "grep") {
    const flags = args.filter(arg => arg.startsWith("-"));
    const values = args.filter(arg => !arg.startsWith("-"));
    const pattern = values[0];
    if (!pattern || values.length > 1) return { ok: false, output: "grep: pipeline usage: grep [-in] pattern" };
    try {
      const flagText = flags.join("");
      const regex = new RegExp(pattern, flagText.includes("i") ? "i" : "");
      const output = lines
        .map((line, index) => ({ line, index: index + 1 }))
        .filter(item => regex.test(item.line))
        .map(item => flagText.includes("n") ? `${item.index}:${item.line}` : item.line)
        .join("\n");
      return { ok: true, output };
    } catch (error) {
      return { ok: false, output: `grep: ${error.message}` };
    }
  }

  if (command === "head" || command === "tail") {
    const { count, paths } = parseCountOption(args);
    if (paths.length) return { ok: false, output: `${command}: pipeline usage: ${command} [-n N]` };
    const selected = command === "head" ? lines.slice(0, count) : lines.slice(-count);
    return { ok: true, output: selected.join("\n") };
  }

  if (command === "wc") {
    const flags = args.filter(arg => arg.startsWith("-")).join("");
    const otherArgs = args.filter(arg => !arg.startsWith("-"));
    if (otherArgs.length) return { ok: false, output: "wc: pipeline usage: wc [-lwc]" };
    const counts = [];
    if (!flags || flags.includes("l")) counts.push((input.match(/\n/g) || []).length);
    if (!flags || flags.includes("w")) counts.push(input.trim() ? input.trim().split(/\s+/).length : 0);
    if (!flags || flags.includes("c")) counts.push(new Blob([input]).size);
    return { ok: true, output: counts.join(" ") };
  }

  return { ok: false, output: `${command || "shell"}: cannot read pipeline input` };
}

async function executePipeline(stages) {
  if (stages.length === 1) return runMonitoredCommand(stages[0]);

  let result = await runMonitoredCommand(stages[0], true);
  if (result.failed) {
    appendTerminalLine(result.output.join("\n"), "error");
    return result;
  }

  let output = result.output.join("\n");
  for (const stage of stages.slice(1)) {
    const filtered = filterPipelineInput(stage, output);
    if (!filtered.ok) {
      appendTerminalLine(filtered.output, "error");
      return { failed: true, output: [filtered.output] };
    }
    output = filtered.output;
  }

  if (output) appendTerminalLine(output);
  return { failed: false, output: output ? [output] : [] };
}

async function executeShellExpression(expression) {
  let stages = [expression.segments[0]];
  for (let index = 0; index < expression.operators.length; index += 1) {
    const operator = expression.operators[index];
    const nextSegment = expression.segments[index + 1];

    if (operator === "|") {
      stages.push(nextSegment);
      continue;
    }

    const result = await executePipeline(stages);
    if (result.failed) return;
    stages = [nextSegment];
  }
  await executePipeline(stages);
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

  if (!options.skipOperators) {
    const expression = parseShellOperators(value);
    if (expression?.error) {
      appendTerminalLine(expression.error, "error");
      return;
    }
    if (expression) {
      await executeShellExpression(expression);
      return;
    }
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
  else appendTerminalLine(t("commandNotFound", { command }), "error");
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
    showToast(siteLanguage === "en" ? "Email copied" : "Почта скопирована");
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
