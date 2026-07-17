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

  const strings = copy[locale] || copy.en;
  const telemetry = {
    en: { pocket: ["GRAVITY X/Y", "VELOCITY", "IMPACT"], portal: ["BALL X/Y", "VELOCITY X/Y", "RADIUS", "LAST LINK", "TRANSFERS", "RATE"] },
    ru: { pocket: ["ГРАВИТАЦИЯ X/Y", "СКОРОСТЬ", "УДАР"], portal: ["ШАР X/Y", "СКОРОСТЬ X/Y", "РАДИУС", "ПОСЛЕДНИЙ ПЕРЕХОД", "ПЕРЕНОСЫ", "ЧАСТОТА"] },
    fr: { pocket: ["GRAVITÉ X/Y", "VITESSE", "IMPACT"], portal: ["BALLE X/Y", "VITESSE X/Y", "RAYON", "DERNIER LIEN", "TRANSFERTS", "TAUX"] },
    it: { pocket: ["GRAVITÀ X/Y", "VELOCITÀ", "IMPATTO"], portal: ["PALLA X/Y", "VELOCITÀ X/Y", "RAGGIO", "ULTIMO COLLEGAMENTO", "TRASFERIMENTI", "TASSO"] },
    es: { pocket: ["GRAVEDAD X/Y", "VELOCIDAD", "IMPACTO"], portal: ["PELOTA X/Y", "VELOCIDAD X/Y", "RADIO", "ÚLTIMO ENLACE", "TRANSFERENCIAS", "TASA"] },
    kk: { pocket: ["ГРАВИТАЦИЯ X/Y", "ЖЫЛДАМДЫҚ", "СОҚҚЫ"], portal: ["ШАР X/Y", "ЖЫЛДАМДЫҚ X/Y", "РАДИУС", "СОҢҒЫ БАЙЛАНЫС", "ӨТУЛЕР", "ЖИІЛІК"] }
  };
  const t = (key, values = {}) => (strings[key] || copy.en[key] || key).replace(/\{(\w+)\}/g, (_, name) => values[name] ?? `{${name}}`);
  window.romeoLab = { locale, t };
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
    [["scale", "scale"], ["point-collision", "collision"], ["two-sided", "twoSided"]].forEach(([name, key]) => {
      const label = q(`[data-option="${name}"]`)?.closest("label");
      if (label?.lastChild) label.lastChild.nodeValue = `\n                  ${t(key)}\n                `;
    });
  };
  translateShadow(document.querySelector("pocket-physics")?.shadowRoot);
  translateShadow(document.querySelector("portal-physics")?.shadowRoot, true);
})();
