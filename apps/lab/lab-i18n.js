(() => {
  const preferred = (navigator.languages?.[0] || navigator.language || "en").toLowerCase();
  const locale = ["ru", "uk", "be"].some(prefix => preferred.startsWith(prefix)) ? "ru"
    : preferred.startsWith("fr") ? "fr" : preferred.startsWith("it") ? "it"
    : preferred.startsWith("es") ? "es" : preferred.startsWith("kk") ? "kk" : "en";

  const copy = {
    en: { lab: "HTML LAB", back: "← PORTFOLIO", rubber: "RUBBER PHYSICS", portal: "PORTAL PHYSICS", previous: "Previous experiment", next: "Next experiment", navigation: "Experiment navigation", list: "Experiment list", specimenRubber: "SPECIMEN / RUBBER-02", specimenPortal: "SPECIMEN / PORTAL-01", fixed: "FIXED GRAVITY", sensors: "ENABLE SENSORS", reset: "RESET", resetSize: "RESET SIZE", notice: "Motion sensors work only over HTTPS or localhost.", ball: "Red rubber ball", portalBall: "Red rubber ball and two movable portals", scale: "PORTAL SCALE", collision: "POINT COLLISION", twoSided: "TWO-SIDED", experiment: "{title}. Experiment {current} of {total}.", classic: "CLASSIC MOVE", tilt: "TILT ACTIVE", error: "RUNTIME ERROR" },
    ru: { lab: "HTML-ЛАБОРАТОРИЯ", back: "← К ПОРТФОЛИО", rubber: "ФИЗИКА РЕЗИНЫ", portal: "ФИЗИКА ПОРТАЛОВ", previous: "Предыдущий эксперимент", next: "Следующий эксперимент", navigation: "Навигация по экспериментам", list: "Список экспериментов", specimenRubber: "ОБРАЗЕЦ / РЕЗИНА-02", specimenPortal: "ОБРАЗЕЦ / ПОРТАЛ-01", fixed: "ФИКСИРОВАННАЯ ГРАВИТАЦИЯ", sensors: "ВКЛЮЧИТЬ ДАТЧИКИ", reset: "СБРОС", resetSize: "СБРОСИТЬ РАЗМЕР", notice: "Датчики движения работают только через HTTPS или localhost.", ball: "Красный резиновый шар", portalBall: "Красный резиновый шар и два перемещаемых портала", scale: "МАСШТАБ ПОРТАЛА", collision: "КОЛЛИЗИЯ ТОЧЕК", twoSided: "ДВУСТОРОННИЕ", experiment: "{title}. Эксперимент {current} из {total}.", classic: "ОБЫЧНОЕ ДВИЖЕНИЕ", tilt: "НАКЛОН АКТИВЕН", error: "ОШИБКА ВЫПОЛНЕНИЯ" },
    fr: { lab: "LAB HTML", back: "← PORTFOLIO", rubber: "PHYSIQUE DU CAOUTCHOUC", portal: "PHYSIQUE DES PORTAILS", previous: "Expérience précédente", next: "Expérience suivante", navigation: "Navigation des expériences", list: "Liste des expériences", specimenRubber: "ÉCHANTILLON / CAOUTCHOUC-02", specimenPortal: "ÉCHANTILLON / PORTAIL-01", fixed: "GRAVITÉ FIXE", sensors: "ACTIVER LES CAPTEURS", reset: "RÉINITIALISER", resetSize: "RÉINITIALISER LA TAILLE", notice: "Les capteurs de mouvement fonctionnent seulement avec HTTPS ou localhost.", ball: "Balle en caoutchouc rouge", portalBall: "Balle rouge et deux portails mobiles", scale: "ÉCHELLE DU PORTAIL", collision: "COLLISION DES POINTS", twoSided: "DOUBLE FACE", experiment: "{title}. Expérience {current} sur {total}.", classic: "MOUVEMENT CLASSIQUE", tilt: "INCLINAISON ACTIVE", error: "ERREUR D'EXÉCUTION" },
    it: { lab: "LAB HTML", back: "← PORTFOLIO", rubber: "FISICA DELLA GOMMA", portal: "FISICA DEI PORTALI", previous: "Esperimento precedente", next: "Esperimento successivo", navigation: "Navigazione esperimenti", list: "Elenco esperimenti", specimenRubber: "CAMPIONE / GOMMA-02", specimenPortal: "CAMPIONE / PORTALE-01", fixed: "GRAVITÀ FISSA", sensors: "ATTIVA SENSORI", reset: "RIPRISTINA", resetSize: "RIPRISTINA DIMENSIONE", notice: "I sensori di movimento funzionano solo tramite HTTPS o localhost.", ball: "Palla di gomma rossa", portalBall: "Palla rossa e due portali mobili", scale: "SCALA PORTALE", collision: "COLLISIONE PUNTI", twoSided: "DOPPIO LATO", experiment: "{title}. Esperimento {current} di {total}.", classic: "MOVIMENTO CLASSICO", tilt: "INCLINAZIONE ATTIVA", error: "ERRORE DI ESECUZIONE" },
    es: { lab: "LAB HTML", back: "← PORTAFOLIO", rubber: "FÍSICA DEL CAUCHO", portal: "FÍSICA DE PORTALES", previous: "Experimento anterior", next: "Experimento siguiente", navigation: "Navegación de experimentos", list: "Lista de experimentos", specimenRubber: "MUESTRA / CAUCHO-02", specimenPortal: "MUESTRA / PORTAL-01", fixed: "GRAVEDAD FIJA", sensors: "ACTIVAR SENSORES", reset: "RESTABLECER", resetSize: "RESTABLECER TAMAÑO", notice: "Los sensores de movimiento solo funcionan mediante HTTPS o localhost.", ball: "Pelota de goma roja", portalBall: "Pelota roja y dos portales móviles", scale: "ESCALA DEL PORTAL", collision: "COLISIÓN DE PUNTOS", twoSided: "DOBLE CARA", experiment: "{title}. Experimento {current} de {total}.", classic: "MOVIMIENTO CLÁSICO", tilt: "INCLINACIÓN ACTIVA", error: "ERROR DE EJECUCIÓN" },
    kk: { lab: "HTML ЗЕРТХАНАСЫ", back: "← ПОРТФОЛИОҒА", rubber: "РЕЗЕҢКЕ ФИЗИКАСЫ", portal: "ПОРТАЛДАР ФИЗИКАСЫ", previous: "Алдыңғы тәжірибе", next: "Келесі тәжірибе", navigation: "Тәжірибелер навигациясы", list: "Тәжірибелер тізімі", specimenRubber: "ҮЛГІ / РЕЗЕҢКЕ-02", specimenPortal: "ҮЛГІ / ПОРТАЛ-01", fixed: "БЕКІТІЛГЕН ГРАВИТАЦИЯ", sensors: "ДАТЧИКТЕРДІ ҚОСУ", reset: "ҚАЛПЫНА КЕЛТІРУ", resetSize: "ӨЛШЕМДІ ҚАЛПЫНА КЕЛТІРУ", notice: "Қозғалыс датчиктері тек HTTPS немесе localhost арқылы жұмыс істейді.", ball: "Қызыл резеңке шар", portalBall: "Қызыл шар және екі жылжымалы портал", scale: "ПОРТАЛ МАСШТАБЫ", collision: "НҮКТЕЛЕР СОҚТЫҒЫСЫ", twoSided: "ЕКІ ЖАҚТЫ", experiment: "{title}. {current}/{total} тәжірибе.", classic: "КЛАССИКАЛЫҚ ҚОЗҒАЛЫС", tilt: "КӨЛБЕУ БЕЛСЕНДІ", error: "ОРЫНДАУ ҚАТЕСІ" }
  };

  const lineWavesCopy = {
    en: { title: "LINE WAVES", specimen: "SPECIMEN / LINE-WAVES", active: "WEBGL ACTIVE", paused: "WEBGL PAUSED", error: "WEBGL ERROR", unavailable: "WebGL is unavailable in this browser or disabled in its settings.", style: "OGL STYLE", instruction: "MOVE POINTER TO WARP", palette: "Effect colours", canvas: "Animated green lines reacting to the pointer", source: "SOURCE ↗", sourceLabel: "Source: React Bits" },
    ru: { title: "ЛИНЕЙНЫЕ ВОЛНЫ", specimen: "ОБРАЗЕЦ / ЛИНИИ-ВОЛНЫ", active: "WEBGL АКТИВЕН", paused: "WEBGL НА ПАУЗЕ", error: "ОШИБКА WEBGL", unavailable: "WebGL недоступен в этом браузере или отключён в настройках.", style: "СТИЛЬ OGL", instruction: "ДВИГАЙ КУРСОР ДЛЯ ИСКАЖЕНИЯ", palette: "Цвета эффекта", canvas: "Анимированные зелёные линии, реагирующие на указатель", source: "ИСТОЧНИК ↗", sourceLabel: "Источник: React Bits" },
    fr: { title: "ONDES LINÉAIRES", specimen: "ÉCHANTILLON / ONDES-LIGNES", active: "WEBGL ACTIF", paused: "WEBGL EN PAUSE", error: "ERREUR WEBGL", unavailable: "WebGL est indisponible dans ce navigateur ou désactivé dans ses réglages.", style: "STYLE OGL", instruction: "DÉPLACE LE POINTEUR POUR DÉFORMER", palette: "Couleurs de l'effet", canvas: "Lignes vertes animées réagissant au pointeur", source: "SOURCE ↗", sourceLabel: "Source : React Bits" },
    it: { title: "ONDE LINEARI", specimen: "CAMPIONE / ONDE-LINEE", active: "WEBGL ATTIVO", paused: "WEBGL IN PAUSA", error: "ERRORE WEBGL", unavailable: "WebGL non è disponibile in questo browser o è disattivato nelle impostazioni.", style: "STILE OGL", instruction: "MUOVI IL PUNTATORE PER DISTORCERE", palette: "Colori dell'effetto", canvas: "Linee verdi animate che reagiscono al puntatore", source: "FONTE ↗", sourceLabel: "Fonte: React Bits" },
    es: { title: "ONDAS LINEALES", specimen: "MUESTRA / ONDAS-LÍNEAS", active: "WEBGL ACTIVO", paused: "WEBGL EN PAUSA", error: "ERROR WEBGL", unavailable: "WebGL no está disponible en este navegador o está desactivado en los ajustes.", style: "ESTILO OGL", instruction: "MUEVE EL PUNTERO PARA DEFORMAR", palette: "Colores del efecto", canvas: "Líneas verdes animadas que reaccionan al puntero", source: "FUENTE ↗", sourceLabel: "Fuente: React Bits" },
    kk: { title: "СЫЗЫҚТЫ ТОЛҚЫНДАР", specimen: "ҮЛГІ / СЫЗЫҚ-ТОЛҚЫНДАР", active: "WEBGL БЕЛСЕНДІ", paused: "WEBGL ҮЗІЛІСТЕ", error: "WEBGL ҚАТЕСІ", unavailable: "WebGL бұл браузерде қолжетімсіз немесе баптауларда өшірілген.", style: "OGL СТИЛІ", instruction: "БҰРМАЛАУ ҮШІН КУРСОРДЫ ЖЫЛЖЫТ", palette: "ЭФФЕКТ ТҮСТЕРІ", canvas: "Көрсеткішке жауап беретін жасыл анимациялық сызықтар", source: "ДЕРЕККӨЗ ↗", sourceLabel: "Дереккөз: React Bits" }
  };

  const faultyTerminalCopy = {
    en: { title: "FAULTY TERMINAL", specimen: "SPECIMEN / FAULTY-TERMINAL", active: "WEBGL ACTIVE", paused: "WEBGL PAUSED", awaiting: "AWAITING START", error: "WEBGL ERROR", unavailable: "WebGL is unavailable in this browser or disabled in its settings.", style: "OPTIMISED WEBGL", instruction: "AUTO QUALITY / POINTER REACTIVE", frame: "Interactive Faulty Terminal effect", section: "Interactive Faulty Terminal WebGL effect", canvas: "Animated terminal pattern reacting to the pointer", warning: "HIGH GPU LOAD", warningCopy: "This animation may use more battery and graphics power on this device.", start: "START ANIMATION", profileHigh: "HIGH PERFORMANCE", profileBalanced: "BALANCED PROFILE", profileLow: "LOW-POWER PROFILE" },
    ru: { title: "ТЕРМИНАЛ СО СБОЯМИ", specimen: "ОБРАЗЕЦ / ТЕРМИНАЛ-СБОЙ", active: "WEBGL АКТИВЕН", paused: "WEBGL НА ПАУЗЕ", awaiting: "ОЖИДАЕТ ЗАПУСКА", error: "ОШИБКА WEBGL", unavailable: "WebGL недоступен в этом браузере или отключён в настройках.", style: "ОПТИМИЗИРОВАННЫЙ WEBGL", instruction: "АВТО-КАЧЕСТВО / РЕАКЦИЯ НА КУРСОР", frame: "Интерактивный эффект Faulty Terminal", section: "Интерактивный WebGL-эффект Faulty Terminal", canvas: "Анимированный терминальный узор, реагирующий на указатель", warning: "ВЫСОКАЯ НАГРУЗКА GPU", warningCopy: "На этом устройстве анимация может заметно расходовать заряд и ресурсы графики.", start: "ЗАПУСТИТЬ АНИМАЦИЮ", profileHigh: "МОЩНЫЙ ПРОФИЛЬ", profileBalanced: "СБАЛАНСИРОВАННЫЙ", profileLow: "ЭКОНОМНЫЙ ПРОФИЛЬ" },
    fr: { title: "TERMINAL DÉFAILLANT", specimen: "ÉCHANTILLON / TERMINAL-DÉFAILLANT", active: "WEBGL ACTIF", paused: "WEBGL EN PAUSE", awaiting: "EN ATTENTE DU DÉMARRAGE", error: "ERREUR WEBGL", unavailable: "WebGL est indisponible dans ce navigateur ou désactivé dans ses réglages.", style: "WEBGL OPTIMISÉ", instruction: "QUALITÉ AUTO / RÉACTION AU POINTEUR", frame: "Effet interactif Faulty Terminal", section: "Effet WebGL interactif Faulty Terminal", canvas: "Motif de terminal animé réagissant au pointeur", warning: "FORTE CHARGE GPU", warningCopy: "Cette animation peut utiliser davantage de batterie et de puissance graphique sur cet appareil.", start: "LANCER L'ANIMATION", profileHigh: "HAUTE PERFORMANCE", profileBalanced: "PROFIL ÉQUILIBRÉ", profileLow: "PROFIL ÉCONOME" },
    it: { title: "TERMINALE DIFETTOSO", specimen: "CAMPIONE / TERMINALE-DIFETTOSO", active: "WEBGL ATTIVO", paused: "WEBGL IN PAUSA", awaiting: "IN ATTESA DI AVVIO", error: "ERRORE WEBGL", unavailable: "WebGL non è disponibile in questo browser o è disattivato nelle impostazioni.", style: "WEBGL OTTIMIZZATO", instruction: "QUALITÀ AUTO / REAZIONE AL PUNTATORE", frame: "Effetto interattivo Faulty Terminal", section: "Effetto WebGL interattivo Faulty Terminal", canvas: "Motivo terminale animato che reagisce al puntatore", warning: "CARICO GPU ELEVATO", warningCopy: "Su questo dispositivo l'animazione può usare più batteria e risorse grafiche.", start: "AVVIA ANIMAZIONE", profileHigh: "ALTE PRESTAZIONI", profileBalanced: "PROFILO BILANCIATO", profileLow: "PROFILO A BASSO CONSUMO" },
    es: { title: "TERMINAL DEFECTUOSA", specimen: "MUESTRA / TERMINAL-DEFECTUOSA", active: "WEBGL ACTIVO", paused: "WEBGL EN PAUSA", awaiting: "ESPERANDO INICIO", error: "ERROR WEBGL", unavailable: "WebGL no está disponible en este navegador o está desactivado en los ajustes.", style: "WEBGL OPTIMIZADO", instruction: "CALIDAD AUTO / REACCIÓN AL PUNTERO", frame: "Efecto interactivo Faulty Terminal", section: "Efecto WebGL interactivo Faulty Terminal", canvas: "Patrón de terminal animado que reacciona al puntero", warning: "CARGA ALTA DE GPU", warningCopy: "Esta animación puede usar más batería y potencia gráfica en este dispositivo.", start: "INICIAR ANIMACIÓN", profileHigh: "ALTO RENDIMIENTO", profileBalanced: "PERFIL EQUILIBRADO", profileLow: "PERFIL DE BAJO CONSUMO" },
    kk: { title: "АҚАУЛЫ ТЕРМИНАЛ", specimen: "ҮЛГІ / АҚАУЛЫ-ТЕРМИНАЛ", active: "WEBGL БЕЛСЕНДІ", paused: "WEBGL ҮЗІЛІСТЕ", awaiting: "ІСКЕ ҚОСУДЫ КҮТУДЕ", error: "WEBGL ҚАТЕСІ", unavailable: "WebGL бұл браузерде қолжетімсіз немесе баптауларда өшірілген.", style: "ОҢТАЙЛАНДЫРЫЛҒАН WEBGL", instruction: "АВТО-САПА / КУРСОРҒА ЖАУАП", frame: "Интерактивті Faulty Terminal әсері", section: "Интерактивті Faulty Terminal WebGL әсері", canvas: "Көрсеткішке жауап беретін анимацияланған терминал өрнегі", warning: "GPU-ҒА ЖОҒАРЫ ЖҮКТЕМЕ", warningCopy: "Бұл анимация құрылғыда көбірек батарея және графикалық ресурстарды қолдануы мүмкін.", start: "АНИМАЦИЯНЫ БАСТАУ", profileHigh: "ЖОҒАРЫ ӨНІМДІЛІК", profileBalanced: "ТЕҢГЕРІМДІ ПРОФИЛЬ", profileLow: "ҮНЕМДІ ПРОФИЛЬ" }
  };
  const strings = copy[locale] || copy.en;
  const lineWaves = lineWavesCopy[locale] || lineWavesCopy.en;
  const faultyTerminal = faultyTerminalCopy[locale] || faultyTerminalCopy.en;
  const telemetry = {
    en: { pocket: ["GRAVITY X/Y", "VELOCITY", "IMPACT"], portal: ["BALL X/Y", "VELOCITY X/Y", "RADIUS", "LAST LINK", "TRANSFERS", "RATE"], coordinates: ["BLUE PORTAL", "ORANGE PORTAL"] },
    ru: { pocket: ["ГРАВИТАЦИЯ X/Y", "СКОРОСТЬ", "УДАР"], portal: ["ШАР X/Y", "СКОРОСТЬ X/Y", "РАДИУС", "ПОСЛЕДНИЙ ПЕРЕХОД", "ПЕРЕНОСЫ", "ЧАСТОТА"], coordinates: ["СИНИЙ ПОРТАЛ", "ОРАНЖЕВЫЙ ПОРТАЛ"] },
    fr: { pocket: ["GRAVITÉ X/Y", "VITESSE", "IMPACT"], portal: ["BALLE X/Y", "VITESSE X/Y", "RAYON", "DERNIER LIEN", "TRANSFERTS", "TAUX"], coordinates: ["PORTAIL BLEU", "PORTAIL ORANGE"] },
    it: { pocket: ["GRAVITÀ X/Y", "VELOCITÀ", "IMPATTO"], portal: ["PALLA X/Y", "VELOCITÀ X/Y", "RAGGIO", "ULTIMO COLLEGAMENTO", "TRASFERIMENTI", "TASSO"], coordinates: ["PORTALE BLU", "PORTALE ARANCIONE"] },
    es: { pocket: ["GRAVEDAD X/Y", "VELOCIDAD", "IMPACTO"], portal: ["PELOTA X/Y", "VELOCIDAD X/Y", "RADIO", "ÚLTIMO ENLACE", "TRANSFERENCIAS", "TASA"], coordinates: ["PORTAL AZUL", "PORTAL NARANJA"] },
    kk: { pocket: ["ГРАВИТАЦИЯ X/Y", "ЖЫЛДАМДЫҚ", "СОҚҚЫ"], portal: ["ШАР X/Y", "ЖЫЛДАМДЫҚ X/Y", "РАДИУС", "СОҢҒЫ БАЙЛАНЫС", "ӨТУЛЕР", "ЖИІЛІК"], coordinates: ["КӨК ПОРТАЛ", "ҚЫЗҒЫЛТ САРЫ ПОРТАЛ"] }
  };
  const t = (key, values = {}) => (key === "lineWaves" ? lineWaves.title : key === "faultyTerminal" ? faultyTerminal.title : strings[key] || copy.en[key] || key).replace(/\{(\w+)\}/g, (_, name) => values[name] ?? `{${name}}`);
  window.romeoLab = { locale, t, lineWaves, faultyTerminal };
  document.documentElement.lang = locale;
  document.title = `romeo558 - ${t("lab")}`;

  document.querySelectorAll("[data-i18n]").forEach(node => { node.textContent = t(node.dataset.i18n); });
  document.querySelector(".feed-nav")?.setAttribute("aria-label", t("navigation"));
  document.querySelector("[data-feed-previous]")?.setAttribute("aria-label", t("previous"));
  document.querySelector("[data-feed-next]")?.setAttribute("aria-label", t("next"));
  document.querySelector("[data-feed-dots]")?.setAttribute("aria-label", t("list"));
  document.querySelectorAll(".experiment").forEach(section => { section.dataset.title = t(section.dataset.titleKey); });

  const translateShadow = (root, portal = false) => {
    if (!root) return;
    const q = selector => root.querySelector(selector);
    q(".head span:first-child").textContent = t(portal ? "specimenPortal" : "specimenRubber");
    q(".status").textContent = t("fixed");
    q(".notice").textContent = t("notice");
    q("canvas").setAttribute("aria-label", t(portal ? "portalBall" : "ball"));
    q('[data-action="sensors"]').textContent = t("sensors");
    q('[data-action="reset"]').textContent = t("reset");
    root.querySelectorAll(".telemetry-item > span").forEach((node, index) => {
      node.textContent = telemetry[locale][portal ? "portal" : "pocket"][index];
    });
    if (!portal) return;
    q('[data-action="reset-size"]').textContent = t("resetSize");
    root.querySelectorAll(".portal-coordinates span").forEach((node, index) => {
      node.textContent = telemetry[locale].coordinates[index];
    });
    [["scale", "scale"], ["point-collision", "collision"], ["two-sided", "twoSided"]].forEach(([name, key]) => {
      const label = q(`[data-option="${name}"]`)?.closest("label");
      if (label?.lastChild) label.lastChild.nodeValue = `\n                  ${t(key)}\n                `;
    });
  };
  translateShadow(document.querySelector("pocket-physics")?.shadowRoot);
  translateShadow(document.querySelector("portal-physics")?.shadowRoot, true);

  const wavesRoot = document.querySelector("line-waves-lab")?.shadowRoot;
  if (wavesRoot) {
    wavesRoot.querySelector(".head span:first-child").textContent = lineWaves.specimen;
    wavesRoot.querySelector(".status").textContent = lineWaves.active;
    wavesRoot.querySelector("canvas").setAttribute("aria-label", lineWaves.canvas);
    wavesRoot.querySelector(".error").textContent = lineWaves.unavailable;
    wavesRoot.querySelector(".meta strong").textContent = lineWaves.style;
    wavesRoot.querySelector(".meta > span:last-child").textContent = lineWaves.instruction;
    wavesRoot.querySelector(".palette").setAttribute("aria-label", lineWaves.palette);
    wavesRoot.querySelector("[data-source-link]").textContent = lineWaves.source;
    wavesRoot.querySelector("[data-source-link]").setAttribute("aria-label", lineWaves.sourceLabel);
  }

  const terminalRoot = document.querySelector("faulty-terminal-lab")?.shadowRoot;
  if (terminalRoot) {
    terminalRoot.host.refreshCopy?.();
    document.querySelector("faulty-terminal-lab")?.closest(".experiment")?.setAttribute("aria-label", faultyTerminal.section);
  }
})();
