class PocketPhysics extends HTMLElement {
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
              --pp-red: #e9343d;
              --pp-line: rgba(244, 248, 243, .14);
              --pp-line-strong: rgba(244, 248, 243, .22);

              display: block;
              min-width: 260px;
              min-height: 340px;
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
                  circle at 52% 38%,
                  rgba(108, 255, 131, .035),
                  transparent 42%
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
              inset: auto 0 66px;
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
              display: flex;
              align-items: center;
              justify-content: space-between;
              font: 700 10px/1 ui-monospace, SFMono-Regular, Menlo,
                Consolas, monospace;
              letter-spacing: .1em;
              text-transform: uppercase;
            }

            .head {
              top: 0;
              height: 44px;
              padding: 0 16px;
              pointer-events: none;
            }

            .foot {
              bottom: 0;
              min-height: 66px;
              gap: 14px;
              padding: 11px 14px;
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

            .status.active {
              color: var(--pp-green);
            }

            .status.active::before {
              background: var(--pp-green);
              box-shadow: 0 0 0 3px rgba(108, 255, 131, .1);
            }

            canvas {
              position: absolute;
              inset: 45px 0 67px;
              display: block;
              width: 100%;
              height: calc(100% - 112px);
              touch-action: none;
              cursor: grab;
            }

            canvas.dragging {
              cursor: grabbing;
            }

            .telemetry {
              display: grid;
              grid-template-columns: repeat(3, auto);
              gap: 15px;
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

            button:active {
              transform: translateY(1px);
            }

            button[hidden] {
              display: none;
            }

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
            .bl { left: 8px; bottom: 74px; transform: rotate(-90deg); }
            .br { right: 8px; bottom: 74px; transform: rotate(180deg); }

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

            .notice[hidden] {
              display: none;
            }

            @media (max-width: 520px) {
              .foot {
                gap: 8px;
                padding-inline: 10px;
              }

              .telemetry {
                grid-template-columns: repeat(2, auto);
                gap: 8px 12px;
              }

              .telemetry-item:nth-child(3) {
                display: none;
              }

              button {
                padding-inline: 9px;
                font-size: 8px;
              }
            }
          </style>

          <section class="chamber" aria-label="Pocket Physics">
            <div class="head">
              <span>SPECIMEN / RUBBER-02</span>
              <span class="status">FIXED GRAVITY</span>
            </div>

            <div class="corner tl"></div>
            <div class="corner tr"></div>
            <div class="corner bl"></div>
            <div class="corner br"></div>

            <div class="notice" hidden>
              Датчики движения работают только через HTTPS или localhost.
            </div>

            <canvas aria-label="Красный резиновый шар"></canvas>

            <div class="foot">
              <div class="telemetry" aria-live="polite">
                <div class="telemetry-item">
                  <span>GRAVITY X/Y</span>
                  <output data-output="gravity">0.00 / 1.00</output>
                </div>

                <div class="telemetry-item">
                  <span>VELOCITY</span>
                  <output data-output="velocity">0 px/s</output>
                </div>

                <div class="telemetry-item">
                  <span>IMPACT</span>
                  <output data-output="impact">0%</output>
                </div>
              </div>

              <div class="controls">
                <button data-action="sensors" type="button" hidden>
                  ENABLE SENSORS
                </button>
                <button data-action="reset" type="button">
                  RESET
                </button>
              </div>
            </div>
          </section>
        `;

        this.canvas = this.shadowRoot.querySelector("canvas");
        this.ctx = this.canvas.getContext("2d", { alpha: true });
        this.statusNode = this.shadowRoot.querySelector(".status");
        this.noticeNode = this.shadowRoot.querySelector(".notice");
        this.sensorButton = this.shadowRoot.querySelector('[data-action="sensors"]');
        this.resetButton = this.shadowRoot.querySelector('[data-action="reset"]');
        this.gravityOutput = this.shadowRoot.querySelector('[data-output="gravity"]');
        this.velocityOutput = this.shadowRoot.querySelector('[data-output="velocity"]');
        this.impactOutput = this.shadowRoot.querySelector('[data-output="impact"]');

        this.world = {
          width: 1,
          height: 1,
          dpr: 1
        };

        this.ball = {
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          radius: 43,
          dragging: false,
          pointerId: null,
          dragOffsetX: 0,
          dragOffsetY: 0,
          releaseVX: 0,
          releaseVY: 0,
          slingX: 0,
          slingY: 0,
          lastPointerX: 0,
          lastPointerY: 0,
          lastPointerTime: 0,
          lastMoveAt: 0
        };

        this.deformation = {
          amount: 0,
          velocity: 0,
          angle: -Math.PI / 2,
          impact: 0
        };

        this.gravity = {
          x: 0,
          y: 1550,
          normalizedX: 0,
          normalizedY: 1,
          sensorActive: false,
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

        this.abortController = null;
        this.resizeObserver = null;
        this.animationFrame = 0;
        this.lastFrame = performance.now();
        this.needsInitialPlacement = true;
        this.simulationActive = true;
        this.resumeSensorListeners = false;

        this.frame = this.frame.bind(this);
        this.resizeCanvas = this.resizeCanvas.bind(this);
        this.updateOrientation = this.updateOrientation.bind(this);
        this.updateMotion = this.updateMotion.bind(this);
        this.beginDrag = this.beginDrag.bind(this);
        this.moveDrag = this.moveDrag.bind(this);
        this.endDrag = this.endDrag.bind(this);
        this.requestSensors = this.requestSensors.bind(this);
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
          if (
            this.ball.dragging &&
            event.pointerId === this.ball.pointerId
          ) {
            this.ball.dragging = false;
            this.ball.pointerId = null;
            this.ball.slingX = 0;
            this.ball.slingY = 0;
            this.canvas.classList.remove("dragging");
          }
        }, { signal });

        this.sensorButton.addEventListener("click", this.requestSensors, { signal });
        this.resetButton.addEventListener("click", this.reset, { signal });

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

        this.ball.radius = this.clamp(
          Math.min(this.world.width, this.world.height) * 0.09,
          34,
          49
        );

        if (this.needsInitialPlacement) {
          this.reset();
          this.needsInitialPlacement = false;
          return;
        }

        const scaleX = oldWidth > 1 ? this.world.width / oldWidth : 1;
        const scaleY = oldHeight > 1 ? this.world.height / oldHeight : 1;

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
      }

      reset() {
        this.ball.x = this.world.width * 0.62;
        this.ball.y = Math.max(
          this.ball.radius + 12,
          this.world.height * 0.19
        );
        this.ball.vx = -35;
        this.ball.vy = 0;
        this.ball.releaseVX = 0;
        this.ball.releaseVY = 0;
        this.ball.slingX = 0;
        this.ball.slingY = 0;

        this.deformation.amount = 0;
        this.deformation.velocity = 0;
        this.deformation.impact = 0;
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
        this.statusNode.textContent = text;
        this.statusNode.classList.toggle("active", active);
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
        this.gravity.sensorActive = true;
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
          const randomAngle = Math.random() * Math.PI * 2;
          dirX = Math.cos(randomAngle);
          dirY = Math.sin(randomAngle);
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

      isInsideBall(x, y) {
        return this.length(
          x - this.ball.x,
          y - this.ball.y
        ) <= this.ball.radius * 1.18;
      }

      beginDrag(event) {
        const pointer = this.pointerPosition(event);
        if (!this.isInsideBall(pointer.x, pointer.y)) return;

        event.preventDefault();
        this.canvas.setPointerCapture(event.pointerId);

        this.ball.dragging = true;
        this.ball.pointerId = event.pointerId;
        this.ball.dragOffsetX = this.ball.x - pointer.x;
        this.ball.dragOffsetY = this.ball.y - pointer.y;
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

        this.canvas.classList.add("dragging");
      }

      moveDrag(event) {
        if (
          !this.ball.dragging ||
          event.pointerId !== this.ball.pointerId
        ) {
          return;
        }

        event.preventDefault();

        const pointer = this.pointerPosition(event);
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
          pointer.x + this.ball.dragOffsetX;
        const desiredY =
          pointer.y + this.ball.dragOffsetY;

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

        this.ball.x = clampedX;
        this.ball.y = clampedY;

        if (squeezeDistance > 0.5) {
          /*
            Вектор направлен от виртуальной позиции курсора обратно
            внутрь камеры. При отпускании он становится импульсом.
          */
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

        this.ball.lastPointerX = pointer.x;
        this.ball.lastPointerY = pointer.y;
        this.ball.lastPointerTime = now;
        this.ball.lastMoveAt = now;
      }

      endDrag(event) {
        if (
          !this.ball.dragging ||
          event.pointerId !== this.ball.pointerId
        ) {
          return;
        }

        event.preventDefault();

        try {
          this.canvas.releasePointerCapture(event.pointerId);
        } catch (_) {}

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

          this.deformation.velocity += this.clamp(
            slingImpulse / 900,
            0,
            2
          );

          this.deformation.impact = Math.max(
            this.deformation.impact,
            this.clamp(slingImpulse / 1800, 0, 1)
          );
        }

        this.ball.slingX = 0;
        this.ball.slingY = 0;
        this.ball.dragging = false;
        this.ball.pointerId = null;
        this.canvas.classList.remove("dragging");
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

        const gravityIntoWall =
          this.gravity.x * nx +
          this.gravity.y * ny < 0;

        const resting =
          impactSpeed < 62 &&
          gravityIntoWall;

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

      resolveBounds(dt) {
        const hits = {
          nx: 0,
          ny: 0,
          impact: 0,
          maxImpact: 0
        };

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
      }

      physicsStep(dt) {
        if (this.ball.dragging) {
          this.ball.releaseVX *= Math.exp(-2.5 * dt);
          this.ball.releaseVY *= Math.exp(-2.5 * dt);
          this.updateDeformation(dt);
          return;
        }

        this.ball.vx += this.gravity.x * dt;
        this.ball.vy += this.gravity.y * dt;

        const airDamping = Math.exp(-0.12 * dt);
        this.ball.vx *= airDamping;
        this.ball.vy *= airDamping;

        const speed = this.length(
          this.ball.vx,
          this.ball.vy
        );

        if (speed > 3400) {
          const scale = 3400 / speed;
          this.ball.vx *= scale;
          this.ball.vy *= scale;
        }

        this.ball.x += this.ball.vx * dt;
        this.ball.y += this.ball.vy * dt;

        this.resolveBounds(dt);
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

      drawBall() {
        const { ctx } = this;
        const speed = this.length(
          this.ball.vx,
          this.ball.vy
        );

        const hasCollisionShape =
          Math.abs(this.deformation.amount) > 0.012;

        let rotation = 0;
        let scaleX = 1;
        let scaleY = 1;

        if (hasCollisionShape) {
          rotation =
            this.deformation.angle -
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
            ? Math.atan2(
                this.ball.vy,
                this.ball.vx
              )
            : 0;

          scaleX = 1 + flightStretch;
          scaleY = 1 / scaleX;
        }

        scaleX = this.clamp(scaleX, 0.78, 1.24);
        scaleY = this.clamp(scaleY, 0.68, 1.18);

        ctx.save();
        ctx.translate(this.ball.x, this.ball.y);
        ctx.rotate(rotation);
        ctx.scale(scaleX, scaleY);

        ctx.shadowColor = "rgba(0, 0, 0, .46)";
        ctx.shadowBlur = 20;
        ctx.shadowOffsetY = 11;

        /*
          Однотонная красная резина.
          Никаких источников света и бликов - только тень по ободу.
        */
        ctx.beginPath();
        ctx.arc(
          0,
          0,
          this.ball.radius,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = "#e9343d";
        ctx.fill();

        ctx.shadowColor = "transparent";

        const rimShadow = ctx.createRadialGradient(
          0,
          0,
          this.ball.radius * 0.58,
          0,
          0,
          this.ball.radius
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

      draw() {
        this.ctx.clearRect(
          0,
          0,
          this.world.width,
          this.world.height
        );

        this.drawBackgroundGrid();
        this.drawGravityMarker();
        this.drawBall();
      }

      updateTelemetry() {
        this.gravityOutput.value =
          `${this.gravity.normalizedX.toFixed(2)} / ` +
          `${this.gravity.normalizedY.toFixed(2)}`;

        this.velocityOutput.value =
          `${Math.round(
            this.length(
              this.ball.vx,
              this.ball.vy
            )
          )} px/s`;

        this.impactOutput.value =
          `${Math.round(
            this.deformation.impact * 100
          )}%`;
      }

      frame(now) {
        if (!this.isConnected || !this.simulationActive) {
          this.animationFrame = 0;
          return;
        }

        const elapsed = this.clamp(
          (now - this.lastFrame) / 1000,
          0,
          0.033
        );

        this.lastFrame = now;

        const steps = Math.max(
          1,
          Math.ceil(elapsed / (1 / 180))
        );

        const stepDT = elapsed / steps;

        for (let i = 0; i < steps; i++) {
          this.physicsStep(stepDT);
        }

        this.draw();
        this.updateTelemetry();

        this.animationFrame =
          requestAnimationFrame(this.frame);
      }
    }

    if (!customElements.get("pocket-physics")) {
      customElements.define(
        "pocket-physics",
        PocketPhysics
      );
    }
