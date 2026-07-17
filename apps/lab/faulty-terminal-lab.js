(() => {
  if (customElements.get("faulty-terminal-lab")) return;

  const QUALITY_PROFILES = Object.freeze({
    high: {
      steps: [
        { pixels: 600000, fps: 45 },
        { pixels: 440000, fps: 36 },
        { pixels: 320000, fps: 30 }
      ]
    },
    balanced: {
      steps: [
        { pixels: 400000, fps: 36 },
        { pixels: 300000, fps: 30 },
        { pixels: 220000, fps: 24 }
      ]
    },
    low: {
      steps: [
        { pixels: 280000, fps: 24 },
        { pixels: 210000, fps: 20 },
        { pixels: 150000, fps: 16 }
      ]
    }
  });

  class FaultyTerminalLab extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });

      this.abortController = null;
      this.resizeObserver = null;
      this.visibilityObserver = null;
      this.gl = null;
      this.program = null;
      this.buffer = null;
      this.uniforms = {};
      this.animationFrame = 0;
      this.lastDrawAt = 0;
      this.elapsed = 0;
      this.simulationRequested = false;
      this.isIntersecting = true;
      this.userApproved = false;
      this.hasError = false;
      this.qualityStep = 0;
      this.frameSamples = [];
      this.targetMouse = [0.5, 0.5];
      this.smoothMouse = [0.5, 0.5];

      this.frame = this.frame.bind(this);
      this.resize = this.resize.bind(this);
      this.handlePointerMove = this.handlePointerMove.bind(this);
      this.handleStart = this.handleStart.bind(this);
    }

    localText(key, fallback) {
      return window.romeoLab?.faultyTerminal?.[key] || fallback;
    }

    detectProfile() {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      const memory = Number(navigator.deviceMemory) || 0;
      const cores = Number(navigator.hardwareConcurrency) || 0;
      const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      const reducedData = Boolean(connection?.saveData);
      const lowPower =
        reducedMotion ||
        reducedData ||
        (memory > 0 && memory <= 4) ||
        (cores > 0 && cores <= 4);

      if (lowPower) return "low";
      if (memory >= 8 && cores >= 8) return "high";
      return "balanced";
    }

    get profile() {
      return QUALITY_PROFILES[this.deviceProfile];
    }

    get currentQuality() {
      return this.profile.steps[this.qualityStep];
    }

    get canAnimate() {
      return (
        this.simulationRequested &&
        this.isIntersecting &&
        !document.hidden &&
        !this.hasError &&
        (!this.requiresApproval || this.userApproved)
      );
    }

    connectedCallback() {
      if (this.abortController) return;

      this.deviceProfile = this.detectProfile();
      this.requiresApproval = this.deviceProfile === "low";
      this.simulationRequested =
        this.closest(".experiment")?.getAttribute("aria-hidden") !== "true";

      this.shadowRoot.innerHTML = `
        <style>
          :host {
            --ft-bg: #050806;
            --ft-panel: #09100b;
            --ft-white: #edf7ef;
            --ft-muted: #7f9084;
            --ft-green: #86e890;
            --ft-green-dim: #3b9450;
            --ft-line: rgba(237, 247, 239, .14);
            --ft-line-strong: rgba(237, 247, 239, .22);

            display: block;
            min-width: 260px;
            min-height: 360px;
            color: var(--ft-white);
            font-family: Inter, ui-sans-serif, system-ui, -apple-system,
              BlinkMacSystemFont, "Segoe UI", sans-serif;
            contain: layout paint style;
          }

          * { box-sizing: border-box; }

          .frame {
            position: relative;
            width: 100%;
            height: 100%;
            min-height: inherit;
            overflow: hidden;
            border: 1px solid var(--ft-line-strong);
            background: var(--ft-bg);
            box-shadow:
              0 24px 70px rgba(0, 0, 0, .38),
              inset 0 0 0 1px rgba(0, 0, 0, .38);
            isolation: isolate;
          }

          .frame::before,
          .frame::after {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            z-index: 4;
            height: 1px;
            background: var(--ft-line);
            pointer-events: none;
          }

          .frame::before { top: 44px; }
          .frame::after { bottom: 64px; }

          .head,
          .foot {
            position: absolute;
            left: 0;
            right: 0;
            z-index: 5;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 14px;
            font: 700 10px/1 ui-monospace, SFMono-Regular, Menlo,
              Consolas, monospace;
            letter-spacing: .1em;
            text-transform: uppercase;
            pointer-events: none;
          }

          .head {
            top: 0;
            height: 44px;
            padding: 0 16px;
            background: linear-gradient(
              to bottom,
              rgba(5, 8, 6, .95),
              rgba(5, 8, 6, .73)
            );
          }

          .foot {
            bottom: 0;
            min-height: 64px;
            padding: 10px 14px;
            color: var(--ft-muted);
            background: linear-gradient(
              to top,
              rgba(5, 8, 6, .96),
              rgba(5, 8, 6, .76)
            );
          }

          .status {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: var(--ft-green);
            white-space: nowrap;
          }

          .status::before {
            content: "";
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: currentColor;
            box-shadow: 0 0 0 3px rgba(134, 232, 144, .1);
          }

          .status[data-state="waiting"] { color: #e4bd79; }
          .status[data-state="paused"] { color: var(--ft-muted); }
          .status[data-state="error"] { color: #e79498; }

          .stage {
            position: absolute;
            inset: 45px 0 65px;
            overflow: hidden;
            background:
              radial-gradient(circle at 50% 45%, rgba(102, 220, 116, .16), transparent 48%),
              repeating-linear-gradient(0deg, rgba(134, 232, 144, .065) 0 1px, transparent 1px 4px),
              linear-gradient(135deg, #061109, #020503 68%);
            touch-action: pan-y;
          }

          .stage::after {
            content: "";
            position: absolute;
            inset: 0;
            z-index: 2;
            pointer-events: none;
            background:
              linear-gradient(to bottom, rgba(3, 6, 4, .34), transparent 15%, transparent 85%, rgba(3, 6, 4, .42)),
              radial-gradient(circle at center, transparent 52%, rgba(0, 0, 0, .32) 100%);
          }

          canvas {
            display: block;
            width: 100%;
            height: 100%;
            cursor: crosshair;
          }

          .gate,
          .error {
            position: absolute;
            inset: 45px 0 65px;
            z-index: 8;
            display: grid;
            place-items: center;
            padding: 24px;
          }

          .gate[hidden],
          .error[hidden] { display: none; }

          .gate-card {
            width: min(330px, 100%);
            display: grid;
            justify-items: center;
            gap: 12px;
            padding: 20px;
            border: 1px solid rgba(228, 189, 121, .35);
            background: rgba(7, 12, 8, .9);
            box-shadow: 0 18px 50px rgba(0, 0, 0, .38);
            text-align: center;
            font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          }

          .gate-card > span {
            color: #e4bd79;
            font-size: 9px;
            font-weight: 700;
            letter-spacing: .12em;
          }

          .gate-card > p {
            max-width: 260px;
            margin: 0;
            color: var(--ft-muted);
            font-size: 10px;
            line-height: 1.5;
          }

          .start-button {
            min-height: 34px;
            padding: 0 14px;
            border: 1px solid rgba(134, 232, 144, .56);
            color: var(--ft-green);
            background: rgba(134, 232, 144, .06);
            cursor: pointer;
            font: 700 9px/1 ui-monospace, SFMono-Regular, Menlo,
              Consolas, monospace;
            letter-spacing: .09em;
            text-transform: uppercase;
            transition: color .16s ease, background .16s ease, transform .16s ease;
          }

          .start-button:hover,
          .start-button:focus-visible {
            color: var(--ft-white);
            background: rgba(134, 232, 144, .18);
            outline: none;
          }

          .start-button:active { transform: translateY(1px); }

          .error {
            color: #e79498;
            background: #0b0909;
            font: 600 11px/1.5 ui-monospace, SFMono-Regular, Menlo,
              Consolas, monospace;
            text-align: center;
          }

          .meta {
            display: flex;
            align-items: center;
            gap: 14px;
            min-width: 0;
          }

          .meta strong {
            color: var(--ft-white);
            font-weight: 700;
          }

          .profile {
            flex: 0 0 auto;
            color: var(--ft-green-dim);
            white-space: nowrap;
          }

          .corner {
            position: absolute;
            z-index: 6;
            width: 17px;
            height: 17px;
            pointer-events: none;
          }

          .corner::before,
          .corner::after {
            content: "";
            position: absolute;
            background: rgba(134, 232, 144, .75);
          }

          .corner::before { width: 17px; height: 1px; }
          .corner::after { width: 1px; height: 17px; }
          .tl { left: 8px; top: 52px; }
          .tr { right: 8px; top: 52px; transform: rotate(90deg); }
          .bl { left: 8px; bottom: 72px; transform: rotate(-90deg); }
          .br { right: 8px; bottom: 72px; transform: rotate(180deg); }

          @media (max-width: 560px) {
            .head,
            .foot { padding-inline: 11px; }
            .foot { font-size: 8px; }
            .meta { gap: 8px; }
            .meta span:last-child { display: none; }
            .profile { font-size: 7px; }
          }
        </style>

        <section class="frame" aria-label="Интерактивный эффект Faulty Terminal">
          <div class="head">
            <span>SPECIMEN / FAULTY-TERMINAL</span>
            <span class="status" data-state="paused">WEBGL PAUSED</span>
          </div>

          <div class="corner tl"></div>
          <div class="corner tr"></div>
          <div class="corner bl"></div>
          <div class="corner br"></div>

          <div class="stage">
            <canvas aria-label="Анимированный терминальный узор, реагирующий на указатель"></canvas>
          </div>

          <div class="gate" data-start-gate hidden>
            <div class="gate-card">
              <span data-warning>HIGH GPU LOAD</span>
              <p data-warning-copy>This animation may use more battery and graphics power on this device.</p>
              <button class="start-button" type="button" data-start-button>START ANIMATION</button>
            </div>
          </div>

          <div class="error" hidden>WebGL is unavailable in this browser or disabled in its settings.</div>

          <div class="foot">
            <div class="meta">
              <span><strong>OPTIMISED WEBGL</strong></span>
              <span>AUTO QUALITY / POINTER REACTIVE</span>
            </div>
            <span class="profile" data-profile>ADAPTIVE PROFILE</span>
          </div>
        </section>
      `;

      this.canvas = this.shadowRoot.querySelector("canvas");
      this.stage = this.shadowRoot.querySelector(".stage");
      this.statusNode = this.shadowRoot.querySelector(".status");
      this.gateNode = this.shadowRoot.querySelector("[data-start-gate]");
      this.errorNode = this.shadowRoot.querySelector(".error");
      this.profileNode = this.shadowRoot.querySelector("[data-profile]");

      this.abortController = new AbortController();
      const { signal } = this.abortController;
      this.canvas.addEventListener("pointermove", this.handlePointerMove, { signal });
      this.shadowRoot
        .querySelector("[data-start-button]")
        .addEventListener("click", this.handleStart, { signal });

      this.resizeObserver = new ResizeObserver(this.resize);
      this.resizeObserver.observe(this.stage);

      if ("IntersectionObserver" in window) {
        this.visibilityObserver = new IntersectionObserver(entries => {
          this.isIntersecting = entries[0]?.isIntersecting ?? true;
          this.updateAnimationState();
        }, { threshold: 0.01 });
        this.visibilityObserver.observe(this);
      }

      this.refreshCopy();
      this.updateAnimationState();
    }

    disconnectedCallback() {
      this.stopAnimation();
      this.resizeObserver?.disconnect();
      this.visibilityObserver?.disconnect();
      this.resizeObserver = null;
      this.visibilityObserver = null;
      this.abortController?.abort();
      this.abortController = null;

      if (this.gl) {
        this.gl.getExtension("WEBGL_lose_context")?.loseContext();
      }
      this.gl = null;
    }

    setSimulationActive(active) {
      this.simulationRequested = Boolean(active);
      this.updateAnimationState();
    }

    refreshCopy() {
      if (!this.shadowRoot) return;

      const text = (selector, key, fallback) => {
        const node = this.shadowRoot.querySelector(selector);
        if (node) node.textContent = this.localText(key, fallback);
      };

      text(".head span:first-child", "specimen", "SPECIMEN / FAULTY-TERMINAL");
      text(".meta strong", "style", "OPTIMISED WEBGL");
      text(".meta > span:last-child", "instruction", "AUTO QUALITY / POINTER REACTIVE");
      text("[data-warning]", "warning", "HIGH GPU LOAD");
      text("[data-warning-copy]", "warningCopy", "This animation may use more battery and graphics power on this device.");
      text("[data-start-button]", "start", "START ANIMATION");
      text(".error", "unavailable", "WebGL is unavailable in this browser or disabled in its settings.");

      this.shadowRoot.querySelector(".frame")?.setAttribute(
        "aria-label",
        this.localText("frame", "Interactive Faulty Terminal effect")
      );

      this.canvas?.setAttribute(
        "aria-label",
        this.localText("canvas", "Animated terminal pattern reacting to the pointer")
      );
      this.profileNode && (this.profileNode.textContent = this.localText(
        `profile${this.deviceProfile[0].toUpperCase()}${this.deviceProfile.slice(1)}`,
        "ADAPTIVE PROFILE"
      ));
      this.updateStatus();
    }

    updateStatus() {
      if (!this.statusNode) return;

      let key = "paused";
      let fallback = "WEBGL PAUSED";
      let state = "paused";

      if (this.hasError) {
        key = "error";
        fallback = "WEBGL ERROR";
        state = "error";
      } else if (this.requiresApproval && !this.userApproved) {
        key = "awaiting";
        fallback = "AWAITING START";
        state = "waiting";
      } else if (this.animationFrame) {
        key = "active";
        fallback = "WEBGL ACTIVE";
        state = "active";
      }

      this.statusNode.dataset.state = state;
      this.statusNode.textContent = this.localText(key, fallback);
    }

    handleStart() {
      this.userApproved = true;
      this.gateNode.hidden = true;
      this.updateAnimationState();
    }

    handlePointerMove(event) {
      const bounds = this.canvas.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;

      this.targetMouse[0] = (event.clientX - bounds.left) / bounds.width;
      this.targetMouse[1] = 1 - (event.clientY - bounds.top) / bounds.height;
    }

    updateAnimationState() {
      if (!this.isConnected || this.hasError) return;

      if (this.requiresApproval && !this.userApproved) {
        this.gateNode.hidden = false;
        this.stopAnimation();
        this.updateStatus();
        return;
      }

      this.gateNode.hidden = true;

      if (!this.canAnimate) {
        this.stopAnimation();
        this.updateStatus();
        return;
      }

      try {
        this.ensureWebGL();
        this.resize();
        this.startAnimation();
      } catch (error) {
        console.error("Faulty Terminal initialization error:", error);
        this.hasError = true;
        this.gateNode.hidden = true;
        this.errorNode.hidden = false;
        this.stopAnimation();
        this.updateStatus();
      }
    }

    ensureWebGL() {
      if (this.gl) return;

      const gl = this.canvas.getContext("webgl", {
        alpha: true,
        antialias: false,
        depth: false,
        stencil: false,
        preserveDrawingBuffer: false,
        powerPreference: this.deviceProfile === "high" ? "high-performance" : "low-power"
      });

      if (!gl) throw new Error("WebGL context unavailable");
      this.gl = gl;
      gl.disable(gl.DEPTH_TEST);
      gl.disable(gl.BLEND);
      gl.clearColor(0, 0, 0, 0);

      const vertexShader = `
        attribute vec2 position;
        varying vec2 vUv;
        void main() {
          vUv = position * .5 + .5;
          gl_Position = vec4(position, 0.0, 1.0);
        }
      `;

      const highp = gl.getShaderPrecisionFormat(
        gl.FRAGMENT_SHADER,
        gl.HIGH_FLOAT
      )?.precision > 0;
      const fragmentPrecision = highp ? "highp" : "mediump";

      // This follows the original Faulty Terminal field much more closely:
      // the animated FBM drives every glyph's brightness. The expensive part
      // is contained by the capped render buffer and target FPS above.
      const fragmentShader = `
        precision ${fragmentPrecision} float;

        varying vec2 vUv;
        uniform vec2 uMouse;
        uniform float uTime;

        float time;

        float noise(vec2 p) {
          return sin(p.x * 10.0) *
            sin(p.y * (3.0 + sin(time * .090909))) + .2;
        }

        mat2 rotate(float angle) {
          float c = cos(angle);
          float s = sin(angle);
          return mat2(c, -s, s, c);
        }

        float fbm(vec2 p) {
          p *= 1.1;
          float f = 0.0;
          float amp = .5;

          f += amp * noise(p);
          p = rotate(time * .02) * p * 2.0;
          amp *= .454545;

          f += amp * noise(p);
          p = rotate(time * .02) * p * 2.0;
          amp *= .454545;

          f += amp * noise(p);
          return f;
        }

        float pattern(vec2 p, out vec2 q, out vec2 r) {
          mat2 drift = rotate(.1 * time);
          mat2 tilt = rotate(.1);
          q = vec2(fbm(p + 1.0), fbm(drift * p + 1.0));
          r = vec2(fbm(tilt * q), fbm(q));
          return fbm(p + r);
        }

        void sampleField(vec2 p, out vec2 glyphP, out float intensity) {
          vec2 grid = vec2(64.0, 32.0);
          vec2 cell = floor(p * grid) / grid;
          vec2 q;
          vec2 r;
          intensity = pattern(cell * .1, q, r) * 1.3 - .03;

          vec2 mouseDelta = cell - uMouse;
          float mouseInfluence = exp(-dot(mouseDelta, mouseDelta) * 64.0) * 2.0;
          intensity += mouseInfluence;
          intensity += sin(length(mouseDelta) * 20.0 - uTime * 5.0) * .1 * mouseInfluence;
          glyphP = p * grid;
        }

        float glyphShape(vec2 p, float intensity) {
          p = fract(p);
          p *= 1.2;

          float px = p.x * 5.0;
          float py = (1.0 - p.y) * 5.0;
          float x = fract(px);
          float y = fract(py);
          float i = floor(py) - 2.0;
          float j = floor(px) - 2.0;
          float field = (i * i + j * j) * .0625;
          float on = step(.1, intensity - field);
          float brightness = on * (.2 + y * .8) * (.75 + x * .25);

          return step(0.0, p.x) * step(p.x, 1.0) *
            step(0.0, p.y) * step(p.y, 1.0) * brightness;
        }

        float onOff(float a, float b, float c) {
          return step(c, sin(uTime + a * cos(uTime * b)));
        }

        float displace(vec2 look) {
          float y = look.y - mod(uTime * .25, 1.0);
          float window = 1.0 / (1.0 + 50.0 * y * y);
          return sin(look.y * 20.0 + uTime) * .0125 *
            onOff(4.0, 2.0, .8) * (1.0 + cos(uTime * 60.0)) * window;
        }

        void main() {
          time = mod(uTime * .333333, 100.0);
          vec2 uv = vUv;
          vec2 p = uv;
          p.x += displace(p);

          vec2 glyphP;
          float intensity;
          sampleField(p, glyphP, intensity);
          float middle = glyphShape(glyphP, intensity);
          float glow =
            glyphShape(glyphP + vec2(-.002, 0.0), intensity) +
            glyphShape(glyphP + vec2(.002, 0.0), intensity) +
            glyphShape(glyphP + vec2(0.0, -.002), intensity) +
            glyphShape(glyphP + vec2(0.0, .002), intensity);
          float scan = step(mod(uv.y + time * 20.0, 1.0), .2) * .4 + 1.0;
          float vignette = 1.0 - dot(vUv - .5, vUv - .5) * .72;
          vec3 terminal = vec3(.88, .98, .90) * middle +
            glow * .08 * vec3(.70, 1.0, .76) * scan;
          terminal *= vignette;
          terminal += vec3(.01, .03, .014) * (1.0 - vignette);
          gl_FragColor = vec4(terminal, .98);
        }
      `;

      const vertex = this.compileShader(gl.VERTEX_SHADER, vertexShader);
      const fragment = this.compileShader(gl.FRAGMENT_SHADER, fragmentShader);
      const program = gl.createProgram();
      gl.attachShader(program, vertex);
      gl.attachShader(program, fragment);
      gl.linkProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const log = gl.getProgramInfoLog(program);
        gl.deleteProgram(program);
        throw new Error(log || "Shader program link failed");
      }

      this.program = program;
      this.buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 3, -1, -1, 3]),
        gl.STATIC_DRAW
      );

      const position = gl.getAttribLocation(program, "position");
      gl.useProgram(program);
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

      this.uniforms = {
        mouse: gl.getUniformLocation(program, "uMouse"),
        time: gl.getUniformLocation(program, "uTime")
      };
    }

    compileShader(type, source) {
      const shader = this.gl.createShader(type);
      this.gl.shaderSource(shader, source);
      this.gl.compileShader(shader);

      if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
        const log = this.gl.getShaderInfoLog(shader);
        this.gl.deleteShader(shader);
        throw new Error(log || "Shader compilation failed");
      }

      return shader;
    }

    resize() {
      if (!this.gl || !this.stage) return;

      const bounds = this.stage.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;

      const maxPixels = this.currentQuality.pixels;
      const pixelRatio = Math.min(
        window.devicePixelRatio || 1,
        Math.sqrt(maxPixels / (bounds.width * bounds.height))
      );
      const width = Math.max(1, Math.round(bounds.width * pixelRatio));
      const height = Math.max(1, Math.round(bounds.height * pixelRatio));

      if (this.canvas.width === width && this.canvas.height === height) return;

      this.canvas.width = width;
      this.canvas.height = height;
      this.gl.viewport(0, 0, width, height);
    }

    startAnimation() {
      if (this.animationFrame || !this.canAnimate) return;
      this.lastDrawAt = 0;
      this.animationFrame = requestAnimationFrame(this.frame);
      this.updateStatus();
    }

    stopAnimation() {
      if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
      this.animationFrame = 0;
      this.lastDrawAt = 0;
    }

    frame(now) {
      this.animationFrame = 0;
      if (!this.canAnimate || !this.gl) {
        this.updateStatus();
        return;
      }

      const targetInterval = 1000 / this.currentQuality.fps;
      const sinceLastDraw = this.lastDrawAt ? now - this.lastDrawAt : targetInterval;

      if (sinceLastDraw >= targetInterval * .92) {
        const delta = Math.min(sinceLastDraw, 120);
        this.lastDrawAt = now;
        this.elapsed += delta * .001;
        this.smoothMouse[0] += (this.targetMouse[0] - this.smoothMouse[0]) * .09;
        this.smoothMouse[1] += (this.targetMouse[1] - this.smoothMouse[1]) * .09;

        this.gl.useProgram(this.program);
        this.gl.uniform2f(this.uniforms.mouse, this.smoothMouse[0], this.smoothMouse[1]);
        this.gl.uniform1f(this.uniforms.time, this.elapsed);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);

        this.frameSamples.push(sinceLastDraw);
        if (this.frameSamples.length >= 72) {
          const average = this.frameSamples.reduce((sum, value) => sum + value, 0) / this.frameSamples.length;
          this.frameSamples.length = 0;

          if (
            average > targetInterval * 1.45 &&
            this.qualityStep < this.profile.steps.length - 1
          ) {
            this.qualityStep += 1;
            this.resize();
          }
        }
      }

      this.animationFrame = requestAnimationFrame(this.frame);
    }
  }

  customElements.define("faulty-terminal-lab", FaultyTerminalLab);
})();
