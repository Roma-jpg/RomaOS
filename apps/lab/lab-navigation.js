    (() => {
      const feed = document.querySelector("[data-experiment-feed]");
      const previousButton = document.querySelector("[data-feed-previous]");
      const nextButton = document.querySelector("[data-feed-next]");
      const currentNode = document.querySelector("[data-feed-current]");
      const totalNode = document.querySelector("[data-feed-total]");
      const dotsNode = document.querySelector("[data-feed-dots]");
      const headerNameNode = document.querySelector("[data-current-name]");
      const headerIndexNode = document.querySelector("[data-current-index]");
      const announcerNode = document.querySelector("[data-feed-announcer]");

      if (!feed) return;

      let experiments = [];
      let dotButtons = [];
      let activeIndex = 0;
      let wheelDelta = 0;
      let wheelResetTimer = 0;
      let lastWheelNavigation = 0;
      let lastButtonNavigation = 0;
      let touchStart = null;

      const pad = value => String(value).padStart(2, "0");

      const i18n = window.romeoLab || { t: key => key };
      const experimentTitle = (section, index) =>
        section.dataset.title ||
        section.getAttribute("aria-label") ||
        `Experiment ${index + 1}`;

      const simulationIn = section => section.firstElementChild;

      function setSimulationState(section, active) {
        const simulation = simulationIn(section);

        if (
          simulation &&
          typeof simulation.setSimulationActive === "function"
        ) {
          try {
            simulation.setSimulationActive(active && !document.hidden);
          } catch (error) {
            // A broken experiment must never prevent the feed controls from
            // switching to another card.
            console.error("Experiment state update error:", error);
          }
        }
      }

      function rebuild() {
        experiments = Array.from(feed.querySelectorAll(":scope > .experiment"));
        if (!experiments.length) return;

        activeIndex = Math.max(
          0,
          Math.min(
            experiments.findIndex(section => section.classList.contains("is-active")),
            experiments.length - 1
          )
        );

        dotsNode.replaceChildren();

        dotButtons = experiments.map((section, index) => {
          const button = document.createElement("button");
          button.className = "feed-dot";
          button.type = "button";
          button.setAttribute(
            "aria-label",
            `${pad(index + 1)} - ${experimentTitle(section, index)}`
          );
          button.addEventListener("click", () => showExperiment(index));
          dotsNode.append(button);
          return button;
        });

        render(false);
      }

      function render(announce = true) {
        const total = experiments.length;
        if (!total) return;

        experiments.forEach((section, index) => {
          const isActive = index === activeIndex;

          section.classList.toggle("is-active", isActive);
          section.classList.toggle("is-before", index < activeIndex);
          section.setAttribute("aria-hidden", String(!isActive));
          section.inert = !isActive;

          setSimulationState(section, isActive);
        });

        dotButtons.forEach((button, index) => {
          const isActive = index === activeIndex;
          button.classList.toggle("is-active", isActive);
          button.setAttribute("aria-current", isActive ? "true" : "false");
        });

        const current = pad(activeIndex + 1);
        const totalText = pad(total);
        const title = experimentTitle(experiments[activeIndex], activeIndex);

        currentNode.textContent = current;
        totalNode.textContent = totalText;
        headerNameNode.textContent = title;
        headerIndexNode.textContent = `${current} / ${totalText}`;

        previousButton.disabled = activeIndex === 0;
        // Нижняя стрелка работает как непрерывная лента: после последнего
        // эксперимента возвращает к первому, а не выглядит сломанной.
        nextButton.disabled = false;

        if (announce) {
          announcerNode.textContent = i18n.t("experiment", {
            title,
            current: activeIndex + 1,
            total
          });
        }
      }

      function showExperiment(index) {
        const nextIndex = Math.max(
          0,
          Math.min(index, experiments.length - 1)
        );

        if (nextIndex === activeIndex) return;
        activeIndex = nextIndex;
        render();
      }

      function move(direction) {
        if (direction > 0 && activeIndex === experiments.length - 1) {
          showExperiment(0);
          return;
        }

        showExperiment(activeIndex + direction);
      }

      function moveFromButton(direction) {
        const now = performance.now();
        if (now - lastButtonNavigation < 180) return;

        lastButtonNavigation = now;
        move(direction);
      }

      function bindNavigationButton(button, direction) {
        let handledPointerTap = false;

        button.addEventListener("pointerup", event => {
          if (event.pointerType === "mouse") return;

          event.preventDefault();
          handledPointerTap = true;
          moveFromButton(direction);
          window.setTimeout(() => {
            handledPointerTap = false;
          }, 250);
        });

        button.addEventListener("click", () => {
          if (handledPointerTap) {
            handledPointerTap = false;
            return;
          }

          moveFromButton(direction);
        });
      }

      bindNavigationButton(previousButton, -1);
      bindNavigationButton(nextButton, 1);

      window.addEventListener("keydown", event => {
        const path = event.composedPath();
        const isTyping = path.some(node =>
          node instanceof HTMLElement &&
          (
            node.matches("input, textarea, select") ||
            node.isContentEditable
          )
        );

        if (isTyping || event.altKey || event.ctrlKey || event.metaKey) return;

        const previousKeys = ["ArrowUp", "ArrowLeft", "PageUp"];
        const nextKeys = ["ArrowDown", "ArrowRight", "PageDown"];

        if (previousKeys.includes(event.key)) {
          event.preventDefault();
          move(-1);
        } else if (nextKeys.includes(event.key)) {
          event.preventDefault();
          move(1);
        } else if (event.key === "Home") {
          event.preventDefault();
          showExperiment(0);
        } else if (event.key === "End") {
          event.preventDefault();
          showExperiment(experiments.length - 1);
        }
      });

      window.addEventListener("wheel", event => {
        if (event.ctrlKey || event.metaKey) return;

        event.preventDefault();
        wheelDelta += event.deltaY;

        clearTimeout(wheelResetTimer);
        wheelResetTimer = window.setTimeout(() => {
          wheelDelta = 0;
        }, 150);

        const now = performance.now();

        if (
          Math.abs(wheelDelta) < 54 ||
          now - lastWheelNavigation < 420
        ) {
          return;
        }

        move(wheelDelta > 0 ? 1 : -1);
        wheelDelta = 0;
        lastWheelNavigation = now;
      }, { passive: false });

      window.addEventListener("pointerdown", event => {
        if (event.pointerType !== "touch") return;

        const path = event.composedPath();
        const startsOnInteractivePhysics = path.some(node =>
          node instanceof HTMLElement &&
          node.matches("canvas, button, input, label, select, textarea")
        );

        if (startsOnInteractivePhysics) {
          touchStart = null;
          return;
        }

        touchStart = {
          pointerId: event.pointerId,
          x: event.clientX,
          y: event.clientY,
          time: performance.now()
        };
      }, { passive: true });

      window.addEventListener("pointerup", event => {
        if (
          !touchStart ||
          event.pointerId !== touchStart.pointerId
        ) {
          return;
        }

        const dx = event.clientX - touchStart.x;
        const dy = event.clientY - touchStart.y;
        const duration = performance.now() - touchStart.time;
        touchStart = null;

        if (
          duration > 750 ||
          Math.abs(dy) < 72 ||
          Math.abs(dy) < Math.abs(dx) * 1.2
        ) {
          return;
        }

        move(dy < 0 ? 1 : -1);
      }, { passive: true });

      window.addEventListener("pointercancel", () => {
        touchStart = null;
      }, { passive: true });

      document.addEventListener("visibilitychange", () => {
        experiments.forEach((section, index) => {
          setSimulationState(section, index === activeIndex);
        });
      });

      const observer = new MutationObserver(() => rebuild());
      observer.observe(feed, { childList: true });

      rebuild();
    })();
