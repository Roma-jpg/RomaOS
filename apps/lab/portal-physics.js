class PortalPhysics extends HTMLElement {
      constructor() {
        super();

        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
          <style>
            :host {
              --pp-bg: #0d120f;
              --pp-white: #f4f8f3;
              --pp-muted: #809086;
              --pp-green: #6cff83;
              --pp-blue: #42a5ff;
              --pp-orange: #ff9147;
              --pp-red: #e9343d;
              --pp-line: rgba(244, 248, 243, .14);
              --pp-line-strong: rgba(244, 248, 243, .22);

              display: block;
              min-width: 280px;
              min-height: 360px;
              color: var(--pp-white);
              font-family: Inter, ui-sans-serif, system-ui, -apple-system,
                BlinkMacSystemFont, "Segoe UI", sans-serif;
              contain: layout paint style;
            }

            * { box-sizing: border-box; }

            button,
            canvas {
              -webkit-tap-highlight-color: transparent;
            }

            .chamber {
              position: relative;
              width: 100%;
              height: 100%;
              min-height: inherit;
              overflow: hidden;
              border: 1px solid var(--pp-line-strong);
              background:
                radial-gradient(
                  circle at 50% 40%,
                  rgba(108, 255, 131, .025),
                  transparent 44%
                ),
                linear-gradient(
                  rgba(255, 255, 255, .018),
                  rgba(255, 255, 255, .006)
                ),
                var(--pp-bg);
              box-shadow:
                0 24px 70px rgba(0, 0, 0, .34),
                inset 0 0 0 1px rgba(0, 0, 0, .32);
              isolation: isolate;
            }

            .chamber::before {
              content: "";
              position: absolute;
              inset: 44px 0 auto;
              z-index: 3;
              height: 1px;
              background: var(--pp-line);
              pointer-events: none;
            }

            .chamber::after {
              content: "";
              position: absolute;
              inset: auto 0 126px;
              z-index: 3;
              height: 1px;
              background: var(--pp-line);
              pointer-events: none;
            }

            .head,
            .foot {
              position: absolute;
              left: 0;
              right: 0;
              z-index: 4;
              font: 700 10px/1 ui-monospace, SFMono-Regular, Menlo,
                Consolas, monospace;
              letter-spacing: .1em;
              text-transform: uppercase;
            }

            .head {
              top: 0;
              height: 44px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 0 16px;
              pointer-events: none;
            }

            .foot {
              bottom: 0;
              min-height: 126px;
              display: grid;
              align-content: center;
              gap: 10px;
              padding: 10px 14px;
            }

            .foot-top {
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 14px;
              min-width: 0;
            }

            .status {
              display: flex;
              align-items: center;
              gap: 8px;
              color: var(--pp-muted);
            }

            .status::before {
              content: "";
              width: 5px;
              height: 5px;
              border-radius: 50%;
              background: var(--pp-muted);
              box-shadow: 0 0 0 3px rgba(128, 144, 134, .08);
            }

            .status.active { color: var(--pp-green); }

            .status.active::before {
              background: var(--pp-green);
              box-shadow: 0 0 0 3px rgba(108, 255, 131, .1);
            }

            .status.classic {
              color: var(--pp-white);
              animation: classic-move 680ms steps(2, end) infinite;
            }

            .status.classic::before {
              background: var(--pp-orange);
              box-shadow:
                0 0 0 3px rgba(255, 145, 71, .1),
                0 0 12px rgba(66, 165, 255, .28);
              animation: classic-dot 680ms steps(2, end) infinite;
            }

            @keyframes classic-move {
              0%, 100% {
                letter-spacing: .1em;
                translate: 0 0;
              }
              50% {
                letter-spacing: .145em;
                translate: -1px 0;
              }
            }

            @keyframes classic-dot {
              0%, 100% { background: var(--pp-orange); }
              50% { background: var(--pp-blue); }
            }

            canvas {
              position: absolute;
              inset: 45px 0 127px;
              display: block;
              width: 100%;
              height: calc(100% - 172px);
              touch-action: none;
              cursor: default;
            }

            canvas.drag-ball,
            canvas.drag-point {
              cursor: grabbing;
            }

            .telemetry {
              display: grid;
              grid-template-columns: repeat(6, auto);
              gap: 12px;
              min-width: 0;
              overflow: hidden;
              pointer-events: none;
            }

            .telemetry-item {
              display: grid;
              gap: 4px;
              white-space: nowrap;
            }

            .telemetry-item span {
              color: var(--pp-muted);
              font-size: 8px;
            }

            .telemetry-item output {
              color: var(--pp-white);
              font-size: 10px;
            }

            .controls {
              display: flex;
              flex-shrink: 0;
              gap: 7px;
            }

            .options {
              display: flex;
              align-items: center;
              flex-wrap: wrap;
              gap: 8px 16px;
              min-height: 24px;
              padding-top: 9px;
              border-top: 1px solid var(--pp-line);
            }

            .toggle {
              display: inline-flex;
              align-items: center;
              gap: 7px;
              color: var(--pp-muted);
              font: 700 8px/1 ui-monospace, SFMono-Regular, Menlo,
                Consolas, monospace;
              letter-spacing: .09em;
              white-space: nowrap;
              cursor: pointer;
              user-select: none;
            }

            .toggle input {
              position: absolute;
              width: 1px;
              height: 1px;
              opacity: 0;
              pointer-events: none;
            }

            .toggle-mark {
              position: relative;
              width: 13px;
              height: 13px;
              flex: 0 0 auto;
              border: 1px solid var(--pp-line-strong);
              background: rgba(244, 248, 243, .02);
            }

            .toggle input:checked + .toggle-mark {
              border-color: rgba(108, 255, 131, .58);
              background: rgba(108, 255, 131, .08);
            }

            .toggle input:checked + .toggle-mark::after {
              content: "";
              position: absolute;
              inset: 3px;
              background: var(--pp-green);
            }

            .toggle:hover {
              color: var(--pp-white);
            }

            button {
              appearance: none;
              min-height: 34px;
              border: 1px solid var(--pp-line-strong);
              border-radius: 0;
              padding: 0 11px;
              color: var(--pp-white);
              background: rgba(244, 248, 243, .025);
              font: 700 9px/1 ui-monospace, SFMono-Regular, Menlo,
                Consolas, monospace;
              letter-spacing: .09em;
              text-transform: uppercase;
              cursor: pointer;
              transition:
                border-color .16s ease,
                color .16s ease,
                background .16s ease;
            }

            button:hover {
              border-color: rgba(108, 255, 131, .48);
              color: var(--pp-green);
              background: rgba(108, 255, 131, .035);
            }

            button:active { transform: translateY(1px); }
            button[hidden] { display: none; }

            .corner {
              position: absolute;
              z-index: 4;
              width: 17px;
              height: 17px;
              pointer-events: none;
            }

            .corner::before,
            .corner::after {
              content: "";
              position: absolute;
              background: rgba(108, 255, 131, .68);
            }

            .corner::before {
              width: 17px;
              height: 1px;
            }

            .corner::after {
              width: 1px;
              height: 17px;
            }

            .tl { left: 8px; top: 52px; }
            .tr { right: 8px; top: 52px; transform: rotate(90deg); }
            .bl { left: 8px; bottom: 134px; transform: rotate(-90deg); }
            .br { right: 8px; bottom: 134px; transform: rotate(180deg); }

            .notice {
              position: absolute;
              z-index: 6;
              left: 50%;
              top: 58px;
              translate: -50% 0;
              width: min(88%, 380px);
              padding: 10px 12px;
              border: 1px solid rgba(238, 53, 61, .28);
              color: #e79498;
              background: rgba(30, 10, 12, .9);
              font: 600 10px/1.45 ui-monospace, SFMono-Regular, Menlo,
                Consolas, monospace;
              letter-spacing: .04em;
              text-align: center;
            }

            .notice[hidden] { display: none; }

            @media (max-width: 760px) {
              .telemetry {
                grid-template-columns: repeat(4, auto);
                gap: 8px 11px;
              }

              .telemetry-item:nth-child(5),
              .telemetry-item:nth-child(6) {
                display: none;
              }
            }

            @media (max-width: 560px) {
              .foot {
                padding-inline: 10px;
              }

              .foot-top {
                gap: 8px;
              }

              .telemetry {
                grid-template-columns: repeat(2, auto);
              }

              .telemetry-item:nth-child(3),
              .telemetry-item:nth-child(4) {
                display: none;
              }

              .options {
                gap: 8px 11px;
              }

              .toggle {
                font-size: 7px;
              }

              button {
                padding-inline: 8px;
                font-size: 8px;
              }
            }
          </style>

          <section class="chamber" aria-label="Portal Physics">
            <div class="head">
              <span>SPECIMEN / PORTAL-01</span>
              <span class="status">FIXED GRAVITY</span>
            </div>

            <div class="corner tl"></div>
            <div class="corner tr"></div>
            <div class="corner bl"></div>
            <div class="corner br"></div>

            <div class="notice" hidden>
              Датчики движения работают только через HTTPS или localhost.
            </div>

            <canvas
              aria-label="Красный резиновый шар и два перемещаемых портала"
            ></canvas>

            <div class="foot">
              <div class="foot-top">
                <div class="telemetry" aria-live="polite">
                  <div class="telemetry-item">
                    <span>BALL X/Y</span>
                    <output data-output="position">0 / 0</output>
                  </div>

                  <div class="telemetry-item">
                    <span>VELOCITY X/Y</span>
                    <output data-output="velocity">0 / 0</output>
                  </div>

                  <div class="telemetry-item">
                    <span>RADIUS</span>
                    <output data-output="radius">0 px</output>
                  </div>

                  <div class="telemetry-item">
                    <span>LAST LINK</span>
                    <output data-output="last">NONE</output>
                  </div>

                  <div class="telemetry-item">
                    <span>TRANSFERS</span>
                    <output data-output="transfers">0</output>
                  </div>

                  <div class="telemetry-item">
                    <span>RATE</span>
                    <output data-output="rate">0.0 /s</output>
                  </div>
                </div>

                <div class="controls">
                  <button data-action="sensors" type="button" hidden>
                    ENABLE SENSORS
                  </button>
                  <button data-action="reset-size" type="button" hidden>
                    RESET SIZE
                  </button>
                  <button data-action="reset" type="button">
                    RESET
                  </button>
                </div>
              </div>

              <div class="options">
                <label class="toggle">
                  <input data-option="scale" type="checkbox">
                  <span class="toggle-mark"></span>
                  PORTAL SCALE
                </label>

                <label class="toggle">
                  <input data-option="point-collision" type="checkbox" checked>
                  <span class="toggle-mark"></span>
                  POINT COLLISION
                </label>

                <label class="toggle">
                  <input data-option="two-sided" type="checkbox">
                  <span class="toggle-mark"></span>
                  TWO-SIDED
                </label>
              </div>
            </div>
          </section>
        `;

        this.canvas = this.shadowRoot.querySelector("canvas");
        this.ctx = this.canvas.getContext("2d", { alpha: true });

        this.statusNode = this.shadowRoot.querySelector(".status");
        this.noticeNode = this.shadowRoot.querySelector(".notice");
        this.sensorButton = this.shadowRoot.querySelector('[data-action="sensors"]');
        this.resetSizeButton = this.shadowRoot.querySelector('[data-action="reset-size"]');
        this.resetButton = this.shadowRoot.querySelector('[data-action="reset"]');

        this.scaleToggle = this.shadowRoot.querySelector('[data-option="scale"]');
        this.pointCollisionToggle = this.shadowRoot.querySelector('[data-option="point-collision"]');
        this.twoSidedToggle = this.shadowRoot.querySelector('[data-option="two-sided"]');

        this.positionOutput = this.shadowRoot.querySelector('[data-output="position"]');
        this.velocityOutput = this.shadowRoot.querySelector('[data-output="velocity"]');
        this.radiusOutput = this.shadowRoot.querySelector('[data-output="radius"]');
        this.lastOutput = this.shadowRoot.querySelector('[data-output="last"]');
        this.transfersOutput = this.shadowRoot.querySelector('[data-output="transfers"]');
        this.rateOutput = this.shadowRoot.querySelector('[data-output="rate"]');

        this.world = {
          width: 1,
          height: 1,
          dpr: 1
        };

        this.ball = {
          x: 0,
          y: 0,
          previousX: 0,
          previousY: 0,
          vx: 0,
          vy: 0,
          radius: 40,
          defaultRadius: 40,
          dragging: false,
          releaseVX: 0,
          releaseVY: 0,
          slingX: 0,
          slingY: 0,
          lastPointerX: 0,
          lastPointerY: 0,
          lastPointerTime: 0,
          lastMoveAt: 0,
          lastPortal: null,
          clearLastPortal: true
        };

        this.deformation = {
          amount: 0,
          velocity: 0,
          angle: -Math.PI / 2,
          impact: 0
        };

        this.portals = [
          {
            id: "BLUE",
            color: "#42a5ff",
            glow: "rgba(66, 165, 255, .28)",
            a: { x: 0, y: 0 },
            b: { x: 0, y: 0 },
            flash: 0
          },
          {
            id: "ORANGE",
            color: "#ff9147",
            glow: "rgba(255, 145, 71, .28)",
            a: { x: 0, y: 0 },
            b: { x: 0, y: 0 },
            flash: 0
          }
        ];

        this.portalPointRadius = 7;
        this.transferCount = 0;
        this.lastTransferLabel = "NONE";
        this.transferTimes = [];
        this.transferRate = 0;
        this.classicMoveActive = false;

        this.settings = {
          scale: false,
          pointCollisions: true,
          twoSided: false
        };

        this.sensorDisplay = {
          text: "FIXED GRAVITY",
          active: false
        };

        /*
          Пока шар проходит сквозь портал, его физический центр продолжает
          двигаться в пространстве входного портала. Видимая часть за
          плоскостью одновременно рисуется у выхода. Перенос физического
          центра завершается лишь после того, как сфера прошла полностью.
        */
        this.transit = {
          active: false,
          sourceIndex: -1,
          targetIndex: -1,
          entrySide: 1,
          scaleRatio: 1,
          targetRadius: 40
        };

        this.gravity = {
          x: 0,
          y: 1550,
          normalizedX: 0,
          normalizedY: 1,
          orientationSeen: false
        };

        this.sensorState = {
          listenersAttached: false,
          lowPassX: 0,
          lowPassY: 0,
          lowPassZ: 0,
          lowPassReady: false,
          lastShakeTime: 0
        };

        this.drag = {
          type: null,
          pointerId: null,
          portalIndex: -1,
          pointKey: null,
          offsetX: 0,
          offsetY: 0
        };

        this.abortController = null;
        this.resizeObserver = null;
        this.animationFrame = 0;
        this.lastFrame = performance.now();
        this.needsInitialPlacement = true;
        this.simulationActive = true;
        this.resumeSensorListeners = false;

        this.frame = this.frame.bind(this);
        this.resizeCanvas = this.resizeCanvas.bind(this);
        this.beginDrag = this.beginDrag.bind(this);
        this.moveDrag = this.moveDrag.bind(this);
        this.endDrag = this.endDrag.bind(this);
        this.updateOrientation = this.updateOrientation.bind(this);
        this.updateMotion = this.updateMotion.bind(this);
        this.requestSensors = this.requestSensors.bind(this);
        this.resetSize = this.resetSize.bind(this);
        this.reset = this.reset.bind(this);
      }

      connectedCallback() {
        if (this.abortController) return;

        this.abortController = new AbortController();
        const { signal } = this.abortController;

        this.canvas.addEventListener("pointerdown", this.beginDrag, { signal });
        this.canvas.addEventListener("pointermove", this.moveDrag, { signal });
        this.canvas.addEventListener("pointerup", this.endDrag, { signal });
        this.canvas.addEventListener("pointercancel", this.endDrag, { signal });

        this.canvas.addEventListener("lostpointercapture", event => {
          if (event.pointerId === this.drag.pointerId) {
            this.finishDragWithoutThrow();
          }
        }, { signal });

        this.sensorButton.addEventListener("click", this.requestSensors, { signal });
        this.resetSizeButton.addEventListener("click", this.resetSize, { signal });
        this.resetButton.addEventListener("click", this.reset, { signal });

        this.scaleToggle.addEventListener("change", () => {
          this.settings.scale = this.scaleToggle.checked;
          this.resetSizeButton.hidden = !this.settings.scale;
          this.cancelPortalTransit();
        }, { signal });

        this.pointCollisionToggle.addEventListener("change", () => {
          this.settings.pointCollisions = this.pointCollisionToggle.checked;
        }, { signal });

        this.twoSidedToggle.addEventListener("change", () => {
          this.settings.twoSided = this.twoSidedToggle.checked;
          this.cancelPortalTransit();
        }, { signal });

        this.resizeObserver = new ResizeObserver(this.resizeCanvas);
        this.resizeObserver.observe(this.canvas);

        const parentExperiment = this.closest(".experiment");
        this.simulationActive =
          !parentExperiment ||
          parentExperiment.classList.contains("is-active");

        this.resizeCanvas();

        if (this.simulationActive) {
          this.setupSensors();
          this.lastFrame = performance.now();
          this.animationFrame = requestAnimationFrame(this.frame);
        }
      }

      setSimulationActive(active) {
        const shouldRun = Boolean(active);

        if (
          shouldRun === this.simulationActive &&
          (shouldRun ? Boolean(this.animationFrame) : !this.animationFrame)
        ) {
          return;
        }

        this.simulationActive = shouldRun;

        if (!shouldRun) {
          this.resumeSensorListeners =
            this.resumeSensorListeners ||
            this.sensorState.listenersAttached;

          this.detachSensorListeners();
          cancelAnimationFrame(this.animationFrame);
          this.animationFrame = 0;
          this.lastFrame = performance.now();
          return;
        }

        requestAnimationFrame(() => {
          if (!this.isConnected || !this.simulationActive) return;

          this.resizeCanvas();

          if (this.resumeSensorListeners) {
            this.attachSensorListeners();
            this.resumeSensorListeners = false;
          } else if (!this.sensorState.listenersAttached) {
            this.setupSensors();
          }

          this.lastFrame = performance.now();

          if (!this.animationFrame) {
            this.animationFrame = requestAnimationFrame(this.frame);
          }
        });
      }

      disconnectedCallback() {
        cancelAnimationFrame(this.animationFrame);
        this.animationFrame = 0;

        if (this.resizeObserver) {
          this.resizeObserver.disconnect();
          this.resizeObserver = null;
        }

        if (this.abortController) {
          this.abortController.abort();
          this.abortController = null;
        }

        this.detachSensorListeners();
      }

      clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
      }

      lerp(a, b, t) {
        return a + (b - a) * t;
      }

      length(x, y) {
        return Math.hypot(x, y);
      }

      dot(ax, ay, bx, by) {
        return ax * bx + ay * by;
      }

      resizeCanvas() {
        const rect = this.canvas.getBoundingClientRect();
        const oldWidth = this.world.width;
        const oldHeight = this.world.height;

        this.world.width = Math.max(1, rect.width);
        this.world.height = Math.max(1, rect.height);
        this.world.dpr = Math.min(window.devicePixelRatio || 1, 2.5);

        this.canvas.width = Math.round(this.world.width * this.world.dpr);
        this.canvas.height = Math.round(this.world.height * this.world.dpr);

        this.ctx.setTransform(
          this.world.dpr,
          0,
          0,
          this.world.dpr,
          0,
          0
        );

        const previousDefaultRadius =
          this.ball.defaultRadius || this.ball.radius;

        const nextDefaultRadius = this.clamp(
          Math.min(this.world.width, this.world.height) * 0.078,
          31,
          45
        );

        if (this.needsInitialPlacement) {
          this.ball.defaultRadius = nextDefaultRadius;
          this.ball.radius = nextDefaultRadius;
          this.reset();
          this.needsInitialPlacement = false;
          return;
        }

        const radiusScale =
          previousDefaultRadius > 0
            ? nextDefaultRadius / previousDefaultRadius
            : 1;

        this.ball.defaultRadius = nextDefaultRadius;
        this.ball.radius = this.clamp(
          this.ball.radius * radiusScale,
          10,
          this.maximumBallRadius()
        );

        const scaleX = oldWidth > 1
          ? this.world.width / oldWidth
          : 1;

        const scaleY = oldHeight > 1
          ? this.world.height / oldHeight
          : 1;

        this.ball.x = this.clamp(
          this.ball.x * scaleX,
          this.ball.radius,
          this.world.width - this.ball.radius
        );

        this.ball.y = this.clamp(
          this.ball.y * scaleY,
          this.ball.radius,
          this.world.height - this.ball.radius
        );

        this.ball.previousX = this.ball.x;
        this.ball.previousY = this.ball.y;

        for (const portal of this.portals) {
          for (const point of [portal.a, portal.b]) {
            point.x = this.clamp(
              point.x * scaleX,
              this.portalPointRadius,
              this.world.width - this.portalPointRadius
            );

            point.y = this.clamp(
              point.y * scaleY,
              this.portalPointRadius,
              this.world.height - this.portalPointRadius
            );
          }
        }
      }

      maximumBallRadius() {
        return Math.max(
          28,
          Math.min(this.world.width, this.world.height) * 0.32
        );
      }

      resetSize() {
        this.cancelPortalTransit();

        this.ball.radius = this.ball.defaultRadius;
        this.ball.x = this.clamp(
          this.ball.x,
          this.ball.radius,
          this.world.width - this.ball.radius
        );
        this.ball.y = this.clamp(
          this.ball.y,
          this.ball.radius,
          this.world.height - this.ball.radius
        );
        this.ball.previousX = this.ball.x;
        this.ball.previousY = this.ball.y;
      }

      reset() {
        this.ball.radius = this.ball.defaultRadius;
        this.ball.x = this.world.width * 0.5;
        this.ball.y = Math.max(
          this.ball.radius + 16,
          this.world.height * 0.16
        );
        this.ball.previousX = this.ball.x;
        this.ball.previousY = this.ball.y;
        this.ball.vx = 95;
        this.ball.vy = 0;
        this.ball.releaseVX = 0;
        this.ball.releaseVY = 0;
        this.ball.slingX = 0;
        this.ball.slingY = 0;
        this.ball.lastPortal = null;
        this.ball.clearLastPortal = true;

        this.transit.active = false;
        this.transit.sourceIndex = -1;
        this.transit.targetIndex = -1;
        this.transit.entrySide = 1;
        this.transit.scaleRatio = 1;
        this.transit.targetRadius = this.ball.radius;

        this.deformation.amount = 0;
        this.deformation.velocity = 0;
        this.deformation.impact = 0;

        this.portals[0].a.x = this.world.width * 0.20;
        this.portals[0].a.y = this.world.height * 0.35;
        this.portals[0].b.x = this.world.width * 0.24;
        this.portals[0].b.y = this.world.height * 0.67;

        this.portals[1].a.x = this.world.width * 0.70;
        this.portals[1].a.y = this.world.height * 0.34;
        this.portals[1].b.x = this.world.width * 0.82;
        this.portals[1].b.y = this.world.height * 0.59;

        this.portals[0].flash = 0;
        this.portals[1].flash = 0;

        this.transferCount = 0;
        this.lastTransferLabel = "NONE";
        this.transferTimes.length = 0;
        this.transferRate = 0;
        this.setClassicMove(false);
      }

      portalBasis(portal) {
        const dx = portal.b.x - portal.a.x;
        const dy = portal.b.y - portal.a.y;
        const length = Math.hypot(dx, dy);

        if (length < 0.001) {
          return {
            length: 0,
            tx: 1,
            ty: 0,
            nx: 0,
            ny: 1
          };
        }

        const tx = dx / length;
        const ty = dy / length;

        return {
          length,
          tx,
          ty,
          nx: -ty,
          ny: tx
        };
      }

      screenAngleRadians() {
        const angle =
          screen.orientation &&
          typeof screen.orientation.angle === "number"
            ? screen.orientation.angle
            : typeof window.orientation === "number"
              ? window.orientation
              : 0;

        return angle * Math.PI / 180;
      }

      rotateToScreen(x, y) {
        const angle = this.screenAngleRadians();
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        return {
          x: x * cos - y * sin,
          y: x * sin + y * cos
        };
      }

      setSensorStatus(text, active = false) {
        this.sensorDisplay.text = text;
        this.sensorDisplay.active = active;

        if (this.classicMoveActive) return;

        this.statusNode.textContent = text;
        this.statusNode.classList.toggle("active", active);
        this.statusNode.classList.remove("classic");
      }

      setClassicMove(active) {
        if (active === this.classicMoveActive) return;

        this.classicMoveActive = active;

        if (active) {
          this.statusNode.textContent = "CLASSIC MOVE";
          this.statusNode.classList.add("active", "classic");
          return;
        }

        this.statusNode.textContent = this.sensorDisplay.text;
        this.statusNode.classList.toggle(
          "active",
          this.sensorDisplay.active
        );
        this.statusNode.classList.remove("classic");
      }

      registerTransfer() {
        const now = performance.now();
        this.transferTimes.push(now);
      }

      updateTransferRate(now) {
        const cutoff = now - 1000;

        while (
          this.transferTimes.length > 0 &&
          this.transferTimes[0] < cutoff
        ) {
          this.transferTimes.shift();
        }

        this.transferRate = this.transferTimes.length;
        this.setClassicMove(this.transferRate > 5);
      }

      updateOrientation(event) {
        if (event.beta == null || event.gamma == null) return;

        const rawX = Math.sin(event.gamma * Math.PI / 180);
        const rawY = Math.sin(event.beta * Math.PI / 180);
        const aligned = this.rotateToScreen(rawX, rawY);

        this.gravity.normalizedX = this.clamp(aligned.x, -1, 1);
        this.gravity.normalizedY = this.clamp(aligned.y, -1, 1);
        this.gravity.x = this.gravity.normalizedX * 1550;
        this.gravity.y = this.gravity.normalizedY * 1550;
        this.gravity.orientationSeen = true;

        this.setSensorStatus("TILT ACTIVE", true);
      }

      updateMotion(event) {
        const source =
          event.accelerationIncludingGravity ||
          event.acceleration;

        if (!source) return;

        const x = Number(source.x) || 0;
        const y = Number(source.y) || 0;
        const z = Number(source.z) || 0;

        if (!this.sensorState.lowPassReady) {
          this.sensorState.lowPassX = x;
          this.sensorState.lowPassY = y;
          this.sensorState.lowPassZ = z;
          this.sensorState.lowPassReady = true;
          return;
        }

        const smoothing = 0.82;

        this.sensorState.lowPassX = this.lerp(
          x,
          this.sensorState.lowPassX,
          smoothing
        );

        this.sensorState.lowPassY = this.lerp(
          y,
          this.sensorState.lowPassY,
          smoothing
        );

        this.sensorState.lowPassZ = this.lerp(
          z,
          this.sensorState.lowPassZ,
          smoothing
        );

        const highX = x - this.sensorState.lowPassX;
        const highY = y - this.sensorState.lowPassY;
        const highZ = z - this.sensorState.lowPassZ;
        const magnitude = this.length(highX, highY, highZ);
        const now = performance.now();

        if (
          magnitude < 2.6 ||
          now - this.sensorState.lastShakeTime < 34 ||
          this.ball.dragging
        ) {
          return;
        }

        this.sensorState.lastShakeTime = now;

        const aligned = this.rotateToScreen(highX, -highY);
        let dirX = aligned.x;
        let dirY = aligned.y;
        let planar = this.length(dirX, dirY);

        if (planar < 0.8) {
          const angle = Math.random() * Math.PI * 2;
          dirX = Math.cos(angle);
          dirY = Math.sin(angle);
          planar = 1;
        }

        dirX /= planar;
        dirY /= planar;

        const impulse = this.clamp(
          (magnitude - 2.2) * 72,
          45,
          680
        );

        this.ball.vx += dirX * impulse;
        this.ball.vy += dirY * impulse;

        const kick = this.clamp(Math.abs(highZ) * 16, 0, 150);
        this.ball.vx += (Math.random() - 0.5) * kick;
        this.ball.vy += (Math.random() - 0.5) * kick;

        this.deformation.velocity += this.clamp(
          impulse / 620,
          0,
          1.2
        );

        this.deformation.impact = Math.max(
          this.deformation.impact,
          this.clamp(impulse / 680, 0, 1)
        );
      }

      attachSensorListeners() {
        if (this.sensorState.listenersAttached) return;

        window.addEventListener(
          "deviceorientation",
          this.updateOrientation,
          true
        );

        window.addEventListener(
          "devicemotion",
          this.updateMotion,
          true
        );

        this.sensorState.listenersAttached = true;
        this.setSensorStatus("SENSORS READY", true);
      }

      detachSensorListeners() {
        if (!this.sensorState.listenersAttached) return;

        window.removeEventListener(
          "deviceorientation",
          this.updateOrientation,
          true
        );

        window.removeEventListener(
          "devicemotion",
          this.updateMotion,
          true
        );

        this.sensorState.listenersAttached = false;
      }

      async requestSensors() {
        try {
          let orientationGranted = true;
          let motionGranted = true;

          if (
            typeof DeviceOrientationEvent !== "undefined" &&
            typeof DeviceOrientationEvent.requestPermission === "function"
          ) {
            orientationGranted =
              await DeviceOrientationEvent.requestPermission() === "granted";
          }

          if (
            typeof DeviceMotionEvent !== "undefined" &&
            typeof DeviceMotionEvent.requestPermission === "function"
          ) {
            motionGranted =
              await DeviceMotionEvent.requestPermission() === "granted";
          }

          if (!orientationGranted && !motionGranted) {
            this.setSensorStatus("ACCESS DENIED", false);
            return;
          }

          this.attachSensorListeners();
          this.sensorButton.hidden = true;
        } catch (error) {
          console.error(error);
          this.setSensorStatus("SENSOR ERROR", false);
        }
      }

      setupSensors() {
        const hasOrientation =
          typeof DeviceOrientationEvent !== "undefined";

        const hasMotion =
          typeof DeviceMotionEvent !== "undefined";

        const needsGesture =
          (
            hasOrientation &&
            typeof DeviceOrientationEvent.requestPermission === "function"
          ) ||
          (
            hasMotion &&
            typeof DeviceMotionEvent.requestPermission === "function"
          );

        if (
          !window.isSecureContext &&
          location.hostname !== "localhost"
        ) {
          this.noticeNode.hidden = false;
          this.setSensorStatus("HTTPS REQUIRED", false);
          return;
        }

        if (!hasOrientation && !hasMotion) {
          this.setSensorStatus("FIXED GRAVITY", false);
          return;
        }

        if (needsGesture) {
          this.sensorButton.hidden = false;
          this.setSensorStatus("SENSORS LOCKED", false);
          return;
        }

        this.attachSensorListeners();
      }

      pointerPosition(event) {
        const rect = this.canvas.getBoundingClientRect();

        return {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
        };
      }

      endpointHit(x, y) {
        const hitRadius = Math.max(15, this.portalPointRadius * 2.2);

        for (let portalIndex = this.portals.length - 1; portalIndex >= 0; portalIndex--) {
          const portal = this.portals[portalIndex];

          for (const pointKey of ["b", "a"]) {
            const point = portal[pointKey];

            if (
              this.length(x - point.x, y - point.y) <= hitRadius
            ) {
              return {
                portalIndex,
                pointKey,
                point
              };
            }
          }
        }

        return null;
      }

      ballHit(x, y) {
        return this.length(
          x - this.ball.x,
          y - this.ball.y
        ) <= this.ball.radius * 1.18;
      }

      beginDrag(event) {
        const pointer = this.pointerPosition(event);
        const endpoint = this.endpointHit(pointer.x, pointer.y);

        event.preventDefault();

        if (endpoint) {
          this.canvas.setPointerCapture(event.pointerId);

          this.drag.type = "point";
          this.drag.pointerId = event.pointerId;
          this.drag.portalIndex = endpoint.portalIndex;
          this.drag.pointKey = endpoint.pointKey;
          this.drag.offsetX = endpoint.point.x - pointer.x;
          this.drag.offsetY = endpoint.point.y - pointer.y;

          this.canvas.classList.add("drag-point");
          return;
        }

        if (!this.ballHit(pointer.x, pointer.y)) return;

        this.canvas.setPointerCapture(event.pointerId);

        this.drag.type = "ball";
        this.drag.pointerId = event.pointerId;
        this.drag.offsetX = this.ball.x - pointer.x;
        this.drag.offsetY = this.ball.y - pointer.y;

        this.cancelPortalTransit();

        this.ball.dragging = true;
        this.ball.releaseVX = 0;
        this.ball.releaseVY = 0;
        this.ball.slingX = 0;
        this.ball.slingY = 0;
        this.ball.lastPointerX = pointer.x;
        this.ball.lastPointerY = pointer.y;
        this.ball.lastPointerTime = performance.now();
        this.ball.lastMoveAt = this.ball.lastPointerTime;
        this.ball.vx = 0;
        this.ball.vy = 0;

        this.canvas.classList.add("drag-ball");
      }

      moveDrag(event) {
        if (
          this.drag.type === null ||
          event.pointerId !== this.drag.pointerId
        ) {
          return;
        }

        event.preventDefault();

        const pointer = this.pointerPosition(event);

        if (this.drag.type === "point") {
          const portal = this.portals[this.drag.portalIndex];
          const point = portal[this.drag.pointKey];

          point.x = this.clamp(
            pointer.x + this.drag.offsetX,
            this.portalPointRadius,
            this.world.width - this.portalPointRadius
          );

          point.y = this.clamp(
            pointer.y + this.drag.offsetY,
            this.portalPointRadius,
            this.world.height - this.portalPointRadius
          );

          return;
        }

        const now = performance.now();
        const dt = this.clamp(
          (now - this.ball.lastPointerTime) / 1000,
          1 / 240,
          0.08
        );

        const pointerVX =
          (pointer.x - this.ball.lastPointerX) / dt;

        const pointerVY =
          (pointer.y - this.ball.lastPointerY) / dt;

        this.ball.releaseVX = this.lerp(
          this.ball.releaseVX,
          pointerVX,
          0.44
        );

        this.ball.releaseVY = this.lerp(
          this.ball.releaseVY,
          pointerVY,
          0.44
        );

        const desiredX =
          pointer.x + this.drag.offsetX;

        const desiredY =
          pointer.y + this.drag.offsetY;

        const clampedX = this.clamp(
          desiredX,
          this.ball.radius,
          this.world.width - this.ball.radius
        );

        const clampedY = this.clamp(
          desiredY,
          this.ball.radius,
          this.world.height - this.ball.radius
        );

        const squeezeX = clampedX - desiredX;
        const squeezeY = clampedY - desiredY;
        const squeezeDistance = this.length(squeezeX, squeezeY);

        const previousBallX = this.ball.x;
        const previousBallY = this.ball.y;

        this.ball.previousX = previousBallX;
        this.ball.previousY = previousBallY;
        this.ball.x = clampedX;
        this.ball.y = clampedY;

        /*
          Во время удержания скорость нужна не физике, а определению
          направления входа в портал и правильной ориентации второй части.
        */
        this.ball.vx = pointerVX;
        this.ball.vy = pointerVY;

        if (squeezeDistance > 0.5) {
          this.ball.slingX = squeezeX;
          this.ball.slingY = squeezeY;

          this.deformation.angle = Math.atan2(
            squeezeY,
            squeezeX
          );

          this.deformation.amount = Math.max(
            this.deformation.amount,
            this.clamp(
              squeezeDistance / this.ball.radius * 0.36,
              0,
              0.34
            )
          );

          this.deformation.velocity = Math.max(
            this.deformation.velocity,
            0.25
          );

          this.deformation.impact = Math.max(
            this.deformation.impact,
            this.clamp(
              squeezeDistance / this.ball.radius,
              0,
              1
            )
          );
        } else {
          this.ball.slingX = 0;
          this.ball.slingY = 0;
        }

        /*
          Транзит обновляется и при отключённой физике, поэтому удерживаемый
          шар тоже непрерывно показывается с другой стороны портала.
        */
        this.updatePortalTransit(false);

        this.ball.lastPointerX = pointer.x;
        this.ball.lastPointerY = pointer.y;
        this.ball.lastPointerTime = now;
        this.ball.lastMoveAt = now;
      }

      endDrag(event) {
        if (
          this.drag.type === null ||
          event.pointerId !== this.drag.pointerId
        ) {
          return;
        }

        event.preventDefault();

        try {
          this.canvas.releasePointerCapture(event.pointerId);
        } catch (_) {}

        if (this.drag.type === "ball") {
          const stillTime =
            performance.now() - this.ball.lastMoveAt;

          const stillDamping = Math.exp(-stillTime / 80);

          this.ball.vx = this.clamp(
            this.ball.releaseVX * stillDamping,
            -2600,
            2600
          );

          this.ball.vy = this.clamp(
            this.ball.releaseVY * stillDamping,
            -2600,
            2600
          );

          const slingDistance = this.length(
            this.ball.slingX,
            this.ball.slingY
          );

          if (slingDistance > 0.5) {
            const slingImpulse = this.clamp(
              slingDistance * 26,
              0,
              2200
            );

            this.ball.vx +=
              this.ball.slingX / slingDistance * slingImpulse;

            this.ball.vy +=
              this.ball.slingY / slingDistance * slingImpulse;
          }

          this.ball.slingX = 0;
          this.ball.slingY = 0;
          this.ball.dragging = false;

          /*
            Если пользователь протащил шар полностью через портал,
            завершение произойдёт сразу после отпускания.
          */
          this.updatePortalTransit(true);
        }

        this.finishDragWithoutThrow();
      }

      finishDragWithoutThrow() {
        this.drag.type = null;
        this.drag.pointerId = null;
        this.drag.portalIndex = -1;
        this.drag.pointKey = null;

        this.ball.dragging = false;
        this.ball.slingX = 0;
        this.ball.slingY = 0;

        this.canvas.classList.remove(
          "drag-ball",
          "drag-point"
        );
      }

      applyCollision(
        nx,
        ny,
        penetration,
        dt,
        accumulator
      ) {
        if (penetration <= 0) return;

        this.ball.x += nx * penetration;
        this.ball.y += ny * penetration;

        const normalVelocity =
          this.ball.vx * nx +
          this.ball.vy * ny;

        const impactSpeed = Math.max(0, -normalVelocity);

        if (normalVelocity >= 0) return;

        const gravityIntoSurface =
          this.gravity.x * nx +
          this.gravity.y * ny < 0;

        const resting =
          impactSpeed < 62 &&
          gravityIntoSurface;

        const restitution = resting
          ? 0
          : this.lerp(
              0.68,
              0.82,
              this.clamp(impactSpeed / 1400, 0, 1)
            );

        this.ball.vx -=
          (1 + restitution) *
          normalVelocity *
          nx;

        this.ball.vy -=
          (1 + restitution) *
          normalVelocity *
          ny;

        const newNormalVelocity =
          this.ball.vx * nx +
          this.ball.vy * ny;

        let tangentX =
          this.ball.vx -
          newNormalVelocity * nx;

        let tangentY =
          this.ball.vy -
          newNormalVelocity * ny;

        const friction = resting
          ? Math.exp(-10 * dt)
          : 0.986;

        tangentX *= friction;
        tangentY *= friction;

        this.ball.vx =
          newNormalVelocity * nx +
          tangentX;

        this.ball.vy =
          newNormalVelocity * ny +
          tangentY;

        accumulator.nx += nx * impactSpeed;
        accumulator.ny += ny * impactSpeed;
        accumulator.impact += impactSpeed;
        accumulator.maxImpact = Math.max(
          accumulator.maxImpact,
          impactSpeed
        );
      }

      resolveWallCollisions(dt, hits) {
        this.applyCollision(
          1,
          0,
          this.ball.radius - this.ball.x,
          dt,
          hits
        );

        this.applyCollision(
          -1,
          0,
          this.ball.x + this.ball.radius - this.world.width,
          dt,
          hits
        );

        this.applyCollision(
          0,
          1,
          this.ball.radius - this.ball.y,
          dt,
          hits
        );

        this.applyCollision(
          0,
          -1,
          this.ball.y + this.ball.radius - this.world.height,
          dt,
          hits
        );
      }

      resolvePortalPointCollisions(dt, hits) {
        if (!this.settings.pointCollisions) return;

        const combinedRadius =
          this.ball.radius +
          this.portalPointRadius;

        for (const portal of this.portals) {
          for (const point of [portal.a, portal.b]) {
            let dx = this.ball.x - point.x;
            let dy = this.ball.y - point.y;
            let distance = Math.hypot(dx, dy);

            if (distance >= combinedRadius) continue;

            if (distance < 0.0001) {
              const angle = Math.random() * Math.PI * 2;
              dx = Math.cos(angle);
              dy = Math.sin(angle);
              distance = 1;
            }

            const nx = dx / distance;
            const ny = dy / distance;
            const penetration = combinedRadius - distance;

            this.applyCollision(
              nx,
              ny,
              penetration,
              dt,
              hits
            );
          }
        }
      }

      commitImpact(hits) {
        if (hits.impact <= 0) return;

        this.deformation.angle = Math.atan2(
          hits.ny,
          hits.nx
        );

        const targetSquash = this.clamp(
          hits.maxImpact / 1850,
          0,
          0.34
        );

        this.deformation.amount = Math.max(
          this.deformation.amount,
          targetSquash * 0.62
        );

        this.deformation.velocity += this.clamp(
          hits.maxImpact / 900,
          0,
          2.15
        );

        this.deformation.impact = Math.max(
          this.deformation.impact,
          this.clamp(
            hits.maxImpact / 1450,
            0,
            1
          )
        );
      }

      signedDistanceToPortal(x, y, portal, basis) {
        return this.dot(
          x - portal.a.x,
          y - portal.a.y,
          basis.nx,
          basis.ny
        );
      }

      ballIsClearOfPortal(portal) {
        const basis = this.portalBasis(portal);
        if (basis.length < 0.001) return true;

        const distance = Math.abs(
          this.signedDistanceToPortal(
            this.ball.x,
            this.ball.y,
            portal,
            basis
          )
        );

        return distance > this.ball.radius * 1.3;
      }

      portalOpeningClearance(radius = this.ball.radius) {
        return radius + this.portalPointRadius + 1;
      }

      portalScaleFor(sourceBasis, targetBasis) {
        if (
          !this.settings.scale ||
          sourceBasis.length < 0.001
        ) {
          return {
            ratio: 1,
            radius: this.ball.radius
          };
        }

        const rawRatio =
          targetBasis.length / sourceBasis.length;

        const radius = this.clamp(
          this.ball.radius * rawRatio,
          10,
          this.maximumBallRadius()
        );

        return {
          ratio: radius / this.ball.radius,
          radius
        };
      }

      mappedPortalPoint(
        x,
        y,
        source,
        target,
        sourceBasis,
        targetBasis,
        scaleRatio = 1
      ) {
        const along = this.dot(
          x - source.a.x,
          y - source.a.y,
          sourceBasis.tx,
          sourceBasis.ty
        );

        const u = sourceBasis.length > 0
          ? along / sourceBasis.length
          : 0.5;

        const normalDistance = this.signedDistanceToPortal(
          x,
          y,
          source,
          sourceBasis
        );

        return {
          x:
            target.a.x +
            targetBasis.tx * targetBasis.length * u -
            targetBasis.nx * normalDistance * scaleRatio,
          y:
            target.a.y +
            targetBasis.ty * targetBasis.length * u -
            targetBasis.ny * normalDistance * scaleRatio,
          u,
          normalDistance
        };
      }

      mappedPortalVector(
        x,
        y,
        sourceBasis,
        targetBasis
      ) {
        const tangent = this.dot(
          x,
          y,
          sourceBasis.tx,
          sourceBasis.ty
        );

        const normal = this.dot(
          x,
          y,
          sourceBasis.nx,
          sourceBasis.ny
        );

        return {
          x:
            targetBasis.tx * tangent -
            targetBasis.nx * normal,
          y:
            targetBasis.ty * tangent -
            targetBasis.ny * normal
        };
      }

      findPortalEntryCandidate(portal, portalIndex) {
        const sourceBasis = this.portalBasis(portal);
        const targetIndex = portalIndex === 0 ? 1 : 0;
        const target = this.portals[targetIndex];
        const targetBasis = this.portalBasis(target);
        const scale = this.portalScaleFor(
          sourceBasis,
          targetBasis
        );

        const sourceClearance =
          this.portalOpeningClearance(this.ball.radius);

        const targetClearance =
          this.portalOpeningClearance(scale.radius);

        if (
          sourceBasis.length <= sourceClearance * 2 ||
          targetBasis.length <= targetClearance * 2
        ) {
          return null;
        }

        if (
          this.ball.lastPortal === portalIndex &&
          !this.ball.clearLastPortal
        ) {
          if (this.ballIsClearOfPortal(portal)) {
            this.ball.clearLastPortal = true;
          } else {
            return null;
          }
        }

        const previousDistance = this.signedDistanceToPortal(
          this.ball.previousX,
          this.ball.previousY,
          portal,
          sourceBasis
        );

        const distance = this.signedDistanceToPortal(
          this.ball.x,
          this.ball.y,
          portal,
          sourceBasis
        );

        const normalVelocity = this.dot(
          this.ball.vx,
          this.ball.vy,
          sourceBasis.nx,
          sourceBasis.ny
        );

        const sides = this.settings.twoSided
          ? [1, -1]
          : [1];

        const along = this.dot(
          this.ball.x - portal.a.x,
          this.ball.y - portal.a.y,
          sourceBasis.tx,
          sourceBasis.ty
        );

        const u = along / sourceBasis.length;
        const targetAlong = u * targetBasis.length;

        if (
          along <= sourceClearance ||
          along >= sourceBasis.length - sourceClearance ||
          targetAlong <= targetClearance ||
          targetAlong >= targetBasis.length - targetClearance
        ) {
          return null;
        }

        for (const entrySide of sides) {
          const previousSigned =
            previousDistance * entrySide;

          const signedDistance =
            distance * entrySide;

          const signedVelocity =
            normalVelocity * entrySide;

          /*
            Положительная сторона использует заполненную стрелку.
            Отрицательная доступна только в TWO-SIDED и отмечена контурной.
          */
          if (
            previousSigned <= 0 ||
            signedDistance > this.ball.radius ||
            signedDistance < -this.ball.radius ||
            signedVelocity >= -8
          ) {
            continue;
          }

          return {
            sourceIndex: portalIndex,
            targetIndex,
            entrySide,
            signedDistance,
            scaleRatio: scale.ratio,
            targetRadius: scale.radius
          };
        }

        return null;
      }

      beginPortalTransit() {
        if (this.transit.active) return false;

        const candidates = [];

        for (let index = 0; index < this.portals.length; index++) {
          const candidate = this.findPortalEntryCandidate(
            this.portals[index],
            index
          );

          if (candidate) candidates.push(candidate);
        }

        if (candidates.length === 0) return false;

        candidates.sort(
          (a, b) =>
            a.signedDistance -
            b.signedDistance
        );
        const selected = candidates[0];

        this.transit.active = true;
        this.transit.sourceIndex = selected.sourceIndex;
        this.transit.targetIndex = selected.targetIndex;
        this.transit.entrySide = selected.entrySide;
        this.transit.scaleRatio = selected.scaleRatio;
        this.transit.targetRadius = selected.targetRadius;

        this.portals[selected.sourceIndex].flash = Math.max(
          this.portals[selected.sourceIndex].flash,
          0.35
        );

        this.portals[selected.targetIndex].flash = Math.max(
          this.portals[selected.targetIndex].flash,
          0.22
        );

        return true;
      }

      cancelPortalTransit() {
        this.transit.active = false;
        this.transit.sourceIndex = -1;
        this.transit.targetIndex = -1;
        this.transit.entrySide = 1;
        this.transit.scaleRatio = 1;
        this.transit.targetRadius = this.ball.radius;
      }

      updatePortalTransit(allowComplete = true) {
        if (!this.transit.active) {
          this.beginPortalTransit();
          return false;
        }

        const sourceIndex = this.transit.sourceIndex;
        const targetIndex = this.transit.targetIndex;
        const source = this.portals[sourceIndex];
        const target = this.portals[targetIndex];
        const sourceBasis = this.portalBasis(source);
        const targetBasis = this.portalBasis(target);
        const entrySide = this.transit.entrySide;
        const sourceClearance =
          this.portalOpeningClearance(this.ball.radius);
        const targetClearance =
          this.portalOpeningClearance(
            this.transit.targetRadius
          );

        if (
          sourceBasis.length <= sourceClearance * 2 ||
          targetBasis.length <= targetClearance * 2
        ) {
          this.cancelPortalTransit();
          return false;
        }

        const distance = this.signedDistanceToPortal(
          this.ball.x,
          this.ball.y,
          source,
          sourceBasis
        );

        const signedDistance =
          distance * entrySide;

        const along = this.dot(
          this.ball.x - source.a.x,
          this.ball.y - source.a.y,
          sourceBasis.tx,
          sourceBasis.ty
        );

        const u = along / sourceBasis.length;
        const targetAlong = u * targetBasis.length;

        /*
          Если портал двинули из-под шара или шар полностью вернулся назад,
          транзит просто прекращается. Никакой отдельной обработки
          пересечений порталов здесь намеренно нет.
        */
        if (
          along <= sourceClearance ||
          along >= sourceBasis.length - sourceClearance ||
          targetAlong <= targetClearance ||
          targetAlong >= targetBasis.length - targetClearance ||
          signedDistance > this.ball.radius + 1
        ) {
          this.cancelPortalTransit();
          return false;
        }

        if (signedDistance > -this.ball.radius) {
          return false;
        }

        if (!allowComplete) {
          return false;
        }

        const mappedCenter = this.mappedPortalPoint(
          this.ball.x,
          this.ball.y,
          source,
          target,
          sourceBasis,
          targetBasis,
          this.transit.scaleRatio
        );

        const mappedPrevious = this.mappedPortalPoint(
          this.ball.previousX,
          this.ball.previousY,
          source,
          target,
          sourceBasis,
          targetBasis,
          this.transit.scaleRatio
        );

        const mappedVelocity = this.mappedPortalVector(
          this.ball.vx,
          this.ball.vy,
          sourceBasis,
          targetBasis
        );

        const deformationVector = {
          x: Math.cos(this.deformation.angle),
          y: Math.sin(this.deformation.angle)
        };

        const mappedDeformation = this.mappedPortalVector(
          deformationVector.x,
          deformationVector.y,
          sourceBasis,
          targetBasis
        );

        this.ball.radius = this.transit.targetRadius;
        this.ball.x = mappedCenter.x;
        this.ball.y = mappedCenter.y;
        this.ball.previousX = mappedPrevious.x;
        this.ball.previousY = mappedPrevious.y;
        this.ball.vx = mappedVelocity.x;
        this.ball.vy = mappedVelocity.y;

        this.deformation.angle = Math.atan2(
          mappedDeformation.y,
          mappedDeformation.x
        );

        this.ball.lastPortal = targetIndex;
        this.ball.clearLastPortal = false;

        source.flash = 1;
        target.flash = 1;

        this.transferCount++;
        this.lastTransferLabel =
          `${source.id} > ${target.id}`;
        this.registerTransfer();

        this.cancelPortalTransit();
        return true;
      }

      updateDeformation(dt) {
        const spring = 170;
        const damping = 18;

        const acceleration =
          -spring * this.deformation.amount -
          damping * this.deformation.velocity;

        this.deformation.velocity += acceleration * dt;
        this.deformation.amount +=
          this.deformation.velocity * dt;

        this.deformation.amount = this.clamp(
          this.deformation.amount,
          -0.115,
          0.38
        );

        if (
          Math.abs(this.deformation.amount) < 0.0004 &&
          Math.abs(this.deformation.velocity) < 0.004
        ) {
          this.deformation.amount = 0;
          this.deformation.velocity = 0;
        }

        this.deformation.impact *= Math.exp(-4.2 * dt);

        for (const portal of this.portals) {
          portal.flash *= Math.exp(-8 * dt);
        }
      }

      physicsStep(dt) {
        if (this.ball.dragging) {
          this.ball.releaseVX *= Math.exp(-2.5 * dt);
          this.ball.releaseVY *= Math.exp(-2.5 * dt);
          this.updatePortalTransit(false);
          this.updateDeformation(dt);
          return;
        }

        this.ball.previousX = this.ball.x;
        this.ball.previousY = this.ball.y;

        this.ball.vx += this.gravity.x * dt;
        this.ball.vy += this.gravity.y * dt;

        const airDamping = Math.exp(-0.12 * dt);
        this.ball.vx *= airDamping;
        this.ball.vy *= airDamping;

        const speed = this.length(
          this.ball.vx,
          this.ball.vy
        );

        const maximumSpeed = 10000;

        if (speed > maximumSpeed) {
          const scale = maximumSpeed / speed;
          this.ball.vx *= scale;
          this.ball.vy *= scale;
        }

        this.ball.x += this.ball.vx * dt;
        this.ball.y += this.ball.vy * dt;

        this.updatePortalTransit();

        const hits = {
          nx: 0,
          ny: 0,
          impact: 0,
          maxImpact: 0
        };

        this.resolveWallCollisions(dt, hits);
        this.resolvePortalPointCollisions(dt, hits);
        this.commitImpact(hits);
        this.updateDeformation(dt);
      }

      drawBackgroundGrid() {
        const { ctx } = this;

        ctx.save();
        ctx.strokeStyle = "rgba(244, 248, 243, .028)";
        ctx.lineWidth = 1;

        const size = 42;

        for (
          let x = size;
          x < this.world.width;
          x += size
        ) {
          ctx.beginPath();
          ctx.moveTo(x + 0.5, 0);
          ctx.lineTo(x + 0.5, this.world.height);
          ctx.stroke();
        }

        for (
          let y = size;
          y < this.world.height;
          y += size
        ) {
          ctx.beginPath();
          ctx.moveTo(0, y + 0.5);
          ctx.lineTo(this.world.width, y + 0.5);
          ctx.stroke();
        }

        ctx.restore();
      }

      drawGravityMarker() {
        const { ctx } = this;
        const centerX = 31;
        const centerY = this.world.height - 30;
        const gx = this.gravity.normalizedX;
        const gy = this.gravity.normalizedY;
        const magnitude = this.clamp(
          this.length(gx, gy),
          0,
          1
        );
        const lineLength = 15 * magnitude;

        ctx.save();
        ctx.translate(centerX, centerY);

        ctx.strokeStyle = "rgba(244, 248, 243, .18)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(0, 0, 18, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = "rgba(108, 255, 131, .9)";
        ctx.fillStyle = "rgba(108, 255, 131, .9)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(gx * lineLength, gy * lineLength);
        ctx.stroke();

        if (magnitude > 0.05) {
          const angle = Math.atan2(gy, gx);
          const tipX = gx * lineLength;
          const tipY = gy * lineLength;

          ctx.beginPath();
          ctx.moveTo(tipX, tipY);
          ctx.lineTo(
            tipX - Math.cos(angle - 0.55) * 4,
            tipY - Math.sin(angle - 0.55) * 4
          );
          ctx.lineTo(
            tipX - Math.cos(angle + 0.55) * 4,
            tipY - Math.sin(angle + 0.55) * 4
          );
          ctx.closePath();
          ctx.fill();
        }

        ctx.restore();
      }

      drawPortal(portal) {
        const { ctx } = this;
        const basis = this.portalBasis(portal);
        const pulse = portal.flash;

        ctx.save();

        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.shadowColor = portal.glow;
        ctx.shadowBlur = 8 + pulse * 18;

        ctx.strokeStyle = portal.color;
        ctx.globalAlpha = 0.48 + pulse * 0.36;
        ctx.lineWidth = 6 + pulse * 2;
        ctx.beginPath();
        ctx.moveTo(portal.a.x, portal.a.y);
        ctx.lineTo(portal.b.x, portal.b.y);
        ctx.stroke();

        ctx.shadowBlur = 0;
        ctx.globalAlpha = 0.96;
        ctx.strokeStyle = portal.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(portal.a.x, portal.a.y);
        ctx.lineTo(portal.b.x, portal.b.y);
        ctx.stroke();

        if (basis.length > 18) {
          const ticks = 4;

          ctx.globalAlpha = 0.36 + pulse * 0.3;
          ctx.strokeStyle = portal.color;
          ctx.lineWidth = 1;

          for (let i = 1; i < ticks; i++) {
            const u = i / ticks;
            const x =
              portal.a.x +
              basis.tx * basis.length * u;
            const y =
              portal.a.y +
              basis.ty * basis.length * u;
            const half = 3 + pulse * 2;

            ctx.beginPath();
            ctx.moveTo(
              x - basis.nx * half,
              y - basis.ny * half
            );
            ctx.lineTo(
              x + basis.nx * half,
              y + basis.ny * half
            );
            ctx.stroke();
          }

          /*
            Небольшая стрелка положительной нормали.
            Это лицо портала и направление, в котором шар вылетает.
          */
          const centerX =
            (portal.a.x + portal.b.x) * 0.5;
          const centerY =
            (portal.a.y + portal.b.y) * 0.5;

          const arrowStart = 9;
          const arrowLength = 22 + pulse * 4;
          const arrowHead = 5;

          const startX =
            centerX + basis.nx * arrowStart;
          const startY =
            centerY + basis.ny * arrowStart;
          const tipX =
            centerX + basis.nx * arrowLength;
          const tipY =
            centerY + basis.ny * arrowLength;

          ctx.globalAlpha = 0.78 + pulse * 0.18;
          ctx.strokeStyle = portal.color;
          ctx.fillStyle = portal.color;
          ctx.lineWidth = 1.5;

          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(tipX, tipY);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(tipX, tipY);
          ctx.lineTo(
            tipX -
              basis.nx * arrowHead +
              basis.tx * arrowHead * 0.72,
            tipY -
              basis.ny * arrowHead +
              basis.ty * arrowHead * 0.72
          );
          ctx.lineTo(
            tipX -
              basis.nx * arrowHead -
              basis.tx * arrowHead * 0.72,
            tipY -
              basis.ny * arrowHead -
              basis.ty * arrowHead * 0.72
          );
          ctx.closePath();
          ctx.fill();

          if (this.settings.twoSided) {
            const reverseStartX =
              centerX - basis.nx * arrowStart;
            const reverseStartY =
              centerY - basis.ny * arrowStart;
            const reverseTipX =
              centerX - basis.nx * arrowLength;
            const reverseTipY =
              centerY - basis.ny * arrowLength;

            ctx.globalAlpha = 0.74 + pulse * 0.16;
            ctx.strokeStyle = portal.color;
            ctx.lineWidth = 1.35;

            ctx.beginPath();
            ctx.moveTo(reverseStartX, reverseStartY);
            ctx.lineTo(reverseTipX, reverseTipY);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(reverseTipX, reverseTipY);
            ctx.lineTo(
              reverseTipX +
                basis.nx * arrowHead +
                basis.tx * arrowHead * 0.72,
              reverseTipY +
                basis.ny * arrowHead +
                basis.ty * arrowHead * 0.72
            );
            ctx.lineTo(
              reverseTipX +
                basis.nx * arrowHead -
                basis.tx * arrowHead * 0.72,
              reverseTipY +
                basis.ny * arrowHead -
                basis.ty * arrowHead * 0.72
            );
            ctx.closePath();
            ctx.stroke();
          }
        }

        for (const point of [portal.a, portal.b]) {
          ctx.globalAlpha = 1;
          ctx.shadowColor = portal.glow;
          ctx.shadowBlur = 7 + pulse * 8;

          ctx.beginPath();
          ctx.arc(
            point.x,
            point.y,
            this.portalPointRadius + pulse * 1.5,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = "#0d120f";
          ctx.fill();

          ctx.shadowBlur = 0;
          ctx.lineWidth = 2;
          ctx.strokeStyle = portal.color;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(
            point.x,
            point.y,
            1.8,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = portal.color;
          ctx.fill();
        }

        ctx.restore();
      }

      clipPortalSide(portal, basis, side = 1) {
        const { ctx } = this;
        const reach =
          Math.max(this.world.width, this.world.height) * 5 + 1000;

        const startX =
          portal.a.x - basis.tx * reach;
        const startY =
          portal.a.y - basis.ty * reach;
        const endX =
          portal.b.x + basis.tx * reach;
        const endY =
          portal.b.y + basis.ty * reach;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.lineTo(
          endX + basis.nx * side * reach * 2,
          endY + basis.ny * side * reach * 2
        );
        ctx.lineTo(
          startX + basis.nx * side * reach * 2,
          startY + basis.ny * side * reach * 2
        );
        ctx.closePath();
        ctx.clip();
      }

      drawBallAt(
        x,
        y,
        vx,
        vy,
        deformationAngle = this.deformation.angle,
        radius = this.ball.radius
      ) {
        const { ctx } = this;
        const speed = this.length(vx, vy);

        const hasCollisionShape =
          Math.abs(this.deformation.amount) > 0.012;

        let rotation = 0;
        let scaleX = 1;
        let scaleY = 1;

        if (hasCollisionShape) {
          rotation =
            deformationAngle -
            Math.PI / 2;

          scaleX =
            1 +
            this.deformation.amount * 0.57;

          scaleY =
            1 -
            this.deformation.amount;
        } else {
          const flightStretch = this.ball.dragging
            ? 0.018
            : this.clamp(
                speed / 23000,
                0,
                0.095
              );

          rotation = speed > 4
            ? Math.atan2(vy, vx)
            : 0;

          scaleX = 1 + flightStretch;
          scaleY = 1 / scaleX;
        }

        scaleX = this.clamp(scaleX, 0.78, 1.24);
        scaleY = this.clamp(scaleY, 0.68, 1.18);

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.scale(scaleX, scaleY);

        ctx.shadowColor = "rgba(0, 0, 0, .46)";
        ctx.shadowBlur = 20;
        ctx.shadowOffsetY = 11;

        ctx.beginPath();
        ctx.arc(
          0,
          0,
          radius,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = "#e9343d";
        ctx.fill();

        ctx.shadowColor = "transparent";

        const rimShadow = ctx.createRadialGradient(
          0,
          0,
          radius * 0.58,
          0,
          0,
          radius
        );

        rimShadow.addColorStop(
          0,
          "rgba(48, 0, 4, 0)"
        );

        rimShadow.addColorStop(
          0.72,
          "rgba(48, 0, 4, 0)"
        );

        rimShadow.addColorStop(
          1,
          "rgba(48, 0, 4, .38)"
        );

        ctx.fillStyle = rimShadow;
        ctx.fill();

        ctx.lineWidth = 1.4;
        ctx.strokeStyle = "rgba(72, 4, 8, .72)";
        ctx.stroke();

        ctx.restore();
      }

      drawSplitBall() {
        if (!this.transit.active) {
          this.drawBallAt(
            this.ball.x,
            this.ball.y,
            this.ball.vx,
            this.ball.vy
          );
          return;
        }

        const source = this.portals[this.transit.sourceIndex];
        const target = this.portals[this.transit.targetIndex];
        const sourceBasis = this.portalBasis(source);
        const targetBasis = this.portalBasis(target);

        if (
          sourceBasis.length < 0.001 ||
          targetBasis.length < 0.001
        ) {
          this.drawBallAt(
            this.ball.x,
            this.ball.y,
            this.ball.vx,
            this.ball.vy
          );
          return;
        }

        const mappedCenter = this.mappedPortalPoint(
          this.ball.x,
          this.ball.y,
          source,
          target,
          sourceBasis,
          targetBasis,
          this.transit.scaleRatio
        );

        const mappedVelocity = this.mappedPortalVector(
          this.ball.vx,
          this.ball.vy,
          sourceBasis,
          targetBasis
        );

        const deformationVector = {
          x: Math.cos(this.deformation.angle),
          y: Math.sin(this.deformation.angle)
        };

        const mappedDeformation = this.mappedPortalVector(
          deformationVector.x,
          deformationVector.y,
          sourceBasis,
          targetBasis
        );

        const mappedDeformationAngle = Math.atan2(
          mappedDeformation.y,
          mappedDeformation.x
        );

        /*
          На входе остаётся только часть сферы перед лицевой плоскостью.
          Та же геометрия, преобразованная в базис выхода, показывается
          перед лицом второго портала. Обе половины меняются непрерывно.
        */
        this.ctx.save();
        this.clipPortalSide(
          source,
          sourceBasis,
          this.transit.entrySide
        );
        this.drawBallAt(
          this.ball.x,
          this.ball.y,
          this.ball.vx,
          this.ball.vy
        );
        this.ctx.restore();

        this.ctx.save();
        this.clipPortalSide(
          target,
          targetBasis,
          this.transit.entrySide
        );
        this.drawBallAt(
          mappedCenter.x,
          mappedCenter.y,
          mappedVelocity.x,
          mappedVelocity.y,
          mappedDeformationAngle,
          this.transit.targetRadius
        );
        this.ctx.restore();
      }

      draw() {
        this.ctx.clearRect(
          0,
          0,
          this.world.width,
          this.world.height
        );

        this.drawBackgroundGrid();
        this.drawGravityMarker();
        this.drawSplitBall();

        /*
          Рамки, точки и стрелки рисуются поверх шара, как граница
          отверстия. Это делает срез визуально читаемым.
        */
        for (const portal of this.portals) {
          this.drawPortal(portal);
        }
      }

      updateTelemetry() {
        this.positionOutput.value =
          `${Math.round(this.ball.x)} / ` +
          `${Math.round(this.ball.y)}`;

        this.velocityOutput.value =
          `${Math.round(this.ball.vx)} / ` +
          `${Math.round(this.ball.vy)}`;

        this.radiusOutput.value =
          `${this.ball.radius.toFixed(1)} px`;

        this.lastOutput.value =
          this.lastTransferLabel;

        this.transfersOutput.value =
          String(this.transferCount);

        this.rateOutput.value =
          `${this.transferRate.toFixed(1)} /s`;
      }

      frame(now) {
        if (!this.isConnected || !this.simulationActive) {
          this.animationFrame = 0;
          return;
        }

        try {
          const elapsed = this.clamp(
            (now - this.lastFrame) / 1000,
            0,
            0.033
          );

          this.lastFrame = now;

          /*
            Помимо временного шага учитываем реальное расстояние за кадр.
            На сверхвысокой скорости это не даёт шару перескакивать через
            маленькие коллайдеры и плоскости порталов.
          */
          const speed = this.length(
            this.ball.vx,
            this.ball.vy
          );

          const timeSteps = Math.ceil(
            elapsed / (1 / 180)
          );

          const maximumTravelPerStep = Math.max(
            4,
            this.ball.radius * 0.32
          );

          const motionSteps = Math.ceil(
            speed * elapsed / maximumTravelPerStep
          );

          const steps = this.clamp(
            Math.max(1, timeSteps, motionSteps),
            1,
            96
          );

          const stepDT = elapsed / steps;

          for (let i = 0; i < steps; i++) {
            this.physicsStep(stepDT);
          }

          this.updateTransferRate(now);
          this.draw();
          this.updateTelemetry();

          this.animationFrame =
            requestAnimationFrame(this.frame);
        } catch (error) {
          console.error("Portal Physics runtime error:", error);
          this.statusNode.textContent = "RUNTIME ERROR";
          this.statusNode.classList.remove("active", "classic");
        }
      }
    }

    if (!customElements.get("portal-physics")) {
      customElements.define(
        "portal-physics",
        PortalPhysics
      );
    }
