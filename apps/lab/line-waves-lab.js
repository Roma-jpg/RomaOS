    class LineWavesLab extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.simulationActive = false;
        this.animationFrame = 0;
        this.startTime = performance.now();
        this.currentMouse = [0.5, 0.5];
        this.targetMouse = [0.5, 0.5];
        this.resizeObserver = null;
        this.abortController = null;
        this.gl = null;
        this.program = null;
        this.buffer = null;
        this.uniforms = {};

        this.frame = this.frame.bind(this);
        this.resize = this.resize.bind(this);
        this.handlePointerMove = this.handlePointerMove.bind(this);
        this.handlePointerLeave = this.handlePointerLeave.bind(this);
      }

      localText(key, fallback) {
        return window.romeoLab?.lineWaves?.[key] || fallback;
      }

      connectedCallback() {
        if (this.abortController) return;

        this.shadowRoot.innerHTML = `
          <style>
            :host {
              --lw-bg: #070a08;
              --lw-white: #f4f8f3;
              --lw-muted: #809086;
              --lw-green-a: #84cc16;
              --lw-green-b: #578510;
              --lw-line: rgba(244, 248, 243, .14);
              --lw-line-strong: rgba(244, 248, 243, .22);

              display: block;
              min-width: 260px;
              min-height: 360px;
              color: var(--lw-white);
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
              border: 1px solid var(--lw-line-strong);
              background: var(--lw-bg);
              box-shadow:
                0 24px 70px rgba(0, 0, 0, .38),
                inset 0 0 0 1px rgba(0, 0, 0, .4);
              isolation: isolate;
            }

            .frame::before,
            .frame::after {
              content: "";
              position: absolute;
              left: 0;
              right: 0;
              z-index: 3;
              height: 1px;
              background: var(--lw-line);
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
                rgba(7, 10, 8, .94),
                rgba(7, 10, 8, .72)
              );
            }

            .foot {
              bottom: 0;
              min-height: 64px;
              padding: 10px 14px;
              background: linear-gradient(
                to top,
                rgba(7, 10, 8, .96),
                rgba(7, 10, 8, .76)
              );
            }

            .status {
              display: inline-flex;
              align-items: center;
              gap: 8px;
              color: var(--lw-green-a);
            }

            .status::before {
              content: "";
              width: 5px;
              height: 5px;
              border-radius: 50%;
              background: currentColor;
              box-shadow: 0 0 0 3px rgba(132, 204, 22, .1);
            }

            .stage {
              position: absolute;
              inset: 45px 0 65px;
              overflow: hidden;
              background:
                radial-gradient(
                  circle at 50% 45%,
                  rgba(132, 204, 22, .055),
                  transparent 42%
                ),
                #050706;
              touch-action: pan-y;
            }

            canvas {
              display: block;
              width: 100%;
              height: 100%;
              cursor: crosshair;
            }

            .vignette {
              position: absolute;
              inset: 0;
              z-index: 2;
              pointer-events: none;
              background:
                linear-gradient(
                  to bottom,
                  rgba(5, 7, 6, .32),
                  transparent 16%,
                  transparent 84%,
                  rgba(5, 7, 6, .38)
                ),
                radial-gradient(
                  circle at center,
                  transparent 54%,
                  rgba(0, 0, 0, .24) 100%
                );
            }

            .meta {
              display: flex;
              align-items: center;
              gap: 14px;
              min-width: 0;
              color: var(--lw-muted);
            }

            .meta strong {
              color: var(--lw-white);
              font-weight: 700;
            }

            .palette {
              display: flex;
              align-items: center;
              gap: 7px;
              color: var(--lw-muted);
            }

            .foot-right {
              display: flex;
              align-items: center;
              gap: 10px;
              flex: 0 0 auto;
            }

            .source-link {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              min-height: 25px;
              padding: 0 8px;
              border: 1px solid var(--lw-line-strong);
              color: var(--lw-muted);
              background: rgba(244, 248, 243, .025);
              font: 700 8px/1 ui-monospace, SFMono-Regular, Menlo,
                Consolas, monospace;
              letter-spacing: .08em;
              text-decoration: none;
              pointer-events: auto;
              transition: color .16s ease, border-color .16s ease,
                background .16s ease;
            }

            .source-link:hover,
            .source-link:focus-visible {
              border-color: rgba(132, 204, 22, .55);
              color: var(--lw-green-a);
              background: rgba(132, 204, 22, .07);
              outline: none;
            }

            .swatch {
              width: 16px;
              height: 16px;
              border: 1px solid rgba(244, 248, 243, .2);
            }

            .swatch.a { background: var(--lw-green-a); }
            .swatch.b { background: var(--lw-green-b); }

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
              background: rgba(132, 204, 22, .75);
            }

            .corner::before { width: 17px; height: 1px; }
            .corner::after { width: 1px; height: 17px; }

            .tl { left: 8px; top: 52px; }
            .tr { right: 8px; top: 52px; transform: rotate(90deg); }
            .bl { left: 8px; bottom: 72px; transform: rotate(-90deg); }
            .br { right: 8px; bottom: 72px; transform: rotate(180deg); }

            .error {
              position: absolute;
              inset: 45px 0 65px;
              z-index: 8;
              display: grid;
              place-items: center;
              padding: 24px;
              color: #e79498;
              background: #0b0909;
              font: 600 11px/1.5 ui-monospace, SFMono-Regular, Menlo,
                Consolas, monospace;
              text-align: center;
            }

            .error[hidden] { display: none; }

            @media (max-width: 560px) {
              .head,
              .foot {
                padding-inline: 11px;
              }

              .foot {
                font-size: 8px;
              }

              .meta {
                gap: 8px;
              }

              .meta span:last-child {
                display: none;
              }

              .foot-right {
                gap: 7px;
              }

              .palette > span {
                display: none;
              }

              .source-link {
                min-height: 23px;
                padding-inline: 7px;
                font-size: 7px;
              }
            }
          </style>

          <section class="frame" aria-label="Интерактивный фон Line Waves">
            <div class="head">
              <span>SPECIMEN / LINE-WAVES</span>
              <span class="status">WEBGL ACTIVE</span>
            </div>

            <div class="corner tl"></div>
            <div class="corner tr"></div>
            <div class="corner bl"></div>
            <div class="corner br"></div>

            <div class="stage">
              <canvas aria-label="Анимированные зелёные линии, реагирующие на указатель"></canvas>
              <div class="vignette"></div>
            </div>

            <div class="error" hidden>
              WebGL недоступен в этом браузере или отключён в настройках.
            </div>

            <div class="foot">
              <div class="meta">
                <span><strong>OGL STYLE</strong></span>
                <span>MOVE POINTER TO WARP</span>
              </div>

              <div class="foot-right">
                <div class="palette" aria-label="Цвета эффекта">
                  <span>#84CC16</span>
                  <i class="swatch a"></i>
                  <i class="swatch b"></i>
                  <span>#578510</span>
                </div>
                <a class="source-link" data-source-link href="https://reactbits.dev/backgrounds/line-waves" target="_blank" rel="noopener noreferrer" aria-label="Source: React Bits">SOURCE ↗</a>
              </div>
            </div>
          </section>
        `;

        this.canvas = this.shadowRoot.querySelector("canvas");
        this.stage = this.shadowRoot.querySelector(".stage");
        this.statusNode = this.shadowRoot.querySelector(".status");
        this.errorNode = this.shadowRoot.querySelector(".error");

        this.abortController = new AbortController();
        const { signal } = this.abortController;

        this.canvas.addEventListener("pointermove", this.handlePointerMove, { signal });
        this.canvas.addEventListener("pointerleave", this.handlePointerLeave, { signal });
        this.canvas.addEventListener("pointercancel", this.handlePointerLeave, { signal });

        this.resizeObserver = new ResizeObserver(this.resize);
        this.resizeObserver.observe(this.stage);

        try {
          this.initializeWebGL();
          this.resize();
        } catch (error) {
          console.error("Line Waves initialization error:", error);
          this.errorNode.hidden = false;
          this.statusNode.textContent = this.localText("error", "WEBGL ERROR");
        }
      }

      disconnectedCallback() {
        this.setSimulationActive(false);

        if (this.resizeObserver) {
          this.resizeObserver.disconnect();
          this.resizeObserver = null;
        }

        if (this.abortController) {
          this.abortController.abort();
          this.abortController = null;
        }

        if (this.gl) {
          this.gl.getExtension("WEBGL_lose_context")?.loseContext();
        }
      }

      hexToVec3(hex) {
        const value = hex.replace("#", "");
        return [
          parseInt(value.slice(0, 2), 16) / 255,
          parseInt(value.slice(2, 4), 16) / 255,
          parseInt(value.slice(4, 6), 16) / 255
        ];
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

      initializeWebGL() {
        const gl = this.canvas.getContext("webgl", {
          alpha: true,
          premultipliedAlpha: false,
          antialias: false,
          powerPreference: "high-performance"
        });

        if (!gl) {
          throw new Error("WebGL context unavailable");
        }

        this.gl = gl;
        gl.clearColor(0, 0, 0, 0);

        const vertexShader = `
          attribute vec2 position;

          void main() {
            gl_Position = vec4(position, 0.0, 1.0);
          }
        `;

        const fragmentShader = `
          precision highp float;

          uniform float uTime;
          uniform vec3 uResolution;
          uniform float uSpeed;
          uniform float uInnerLines;
          uniform float uOuterLines;
          uniform float uWarpIntensity;
          uniform float uRotation;
          uniform float uEdgeFadeWidth;
          uniform float uColorCycleSpeed;
          uniform float uBrightness;
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          uniform vec3 uColor3;
          uniform vec2 uMouse;
          uniform float uMouseInfluence;
          uniform bool uEnableMouse;

          #define HALF_PI 1.5707963

          float hashF(float n) {
            return fract(sin(n * 127.1) * 43758.5453123);
          }

          float smoothNoise(float x) {
            float i = floor(x);
            float f = fract(x);
            float u = f * f * (3.0 - 2.0 * f);
            return mix(hashF(i), hashF(i + 1.0), u);
          }

          float displaceA(float coord, float t) {
            float result = sin(coord * 2.123) * 0.2;
            result += sin(coord * 3.234 + t * 4.345) * 0.1;
            result += sin(coord * 0.589 + t * 0.934) * 0.5;
            return result;
          }

          float displaceB(float coord, float t) {
            float result = sin(coord * 1.345) * 0.3;
            result += sin(coord * 2.734 + t * 3.345) * 0.2;
            result += sin(coord * 0.189 + t * 0.934) * 0.3;
            return result;
          }

          vec2 rotate2D(vec2 p, float angle) {
            float c = cos(angle);
            float s = sin(angle);
            return vec2(p.x * c - p.y * s, p.x * s + p.y * c);
          }

          void main() {
            vec2 coords = gl_FragCoord.xy / uResolution.xy;
            coords = coords * 2.0 - 1.0;
            coords = rotate2D(coords, uRotation);

            float halfT = uTime * uSpeed * 0.5;
            float fullT = uTime * uSpeed;

            float mouseWarp = 0.0;
            if (uEnableMouse) {
              vec2 mPos = rotate2D(uMouse * 2.0 - 1.0, uRotation);
              float mDist = length(coords - mPos);
              mouseWarp = uMouseInfluence * exp(-mDist * mDist * 4.0);
            }

            float warpAx = coords.x + displaceA(coords.y, halfT) * uWarpIntensity + mouseWarp;
            float warpAy = coords.y - displaceA(coords.x * cos(fullT) * 1.235, halfT) * uWarpIntensity;
            float warpBx = coords.x + displaceB(coords.y, halfT) * uWarpIntensity + mouseWarp;
            float warpBy = coords.y - displaceB(coords.x * sin(fullT) * 1.235, halfT) * uWarpIntensity;

            vec2 fieldA = vec2(warpAx, warpAy);
            vec2 fieldB = vec2(warpBx, warpBy);
            vec2 blended = mix(fieldA, fieldB, mix(fieldA, fieldB, 0.5));

            float fadeTop = smoothstep(uEdgeFadeWidth, uEdgeFadeWidth + 0.4, blended.y);
            float fadeBottom = smoothstep(-uEdgeFadeWidth, -(uEdgeFadeWidth + 0.4), blended.y);
            float vMask = 1.0 - max(fadeTop, fadeBottom);

            float tileCount = mix(uOuterLines, uInnerLines, vMask);
            float scaledY = blended.y * tileCount;
            float nY = smoothNoise(abs(scaledY));

            float ridge = pow(
              step(abs(nY - blended.x) * 2.0, HALF_PI) * cos(2.0 * (nY - blended.x)),
              5.0
            );

            float lines = 0.0;
            for (float i = 1.0; i < 3.0; i += 1.0) {
              lines += pow(max(fract(scaledY), fract(-scaledY)), i * 2.0);
            }

            float pattern = vMask * lines;
            float cycleT = fullT * uColorCycleSpeed;

            float rChannel = (pattern + lines * ridge) *
              (cos(blended.y + cycleT * 0.234) * 0.5 + 1.0);
            float gChannel = (pattern + vMask * ridge) *
              (sin(blended.x + cycleT * 1.745) * 0.5 + 1.0);
            float bChannel = (pattern + lines * ridge) *
              (cos(blended.x + cycleT * 0.534) * 0.5 + 1.0);

            vec3 col = (
              rChannel * uColor1 +
              gChannel * uColor2 +
              bChannel * uColor3
            ) * uBrightness;

            float alpha = clamp(length(col), 0.0, 1.0);
            gl_FragColor = vec4(col, alpha);
          }
        `;

        const vertex = this.compileShader(gl.VERTEX_SHADER, vertexShader);
        let fragment;

        try {
          fragment = this.compileShader(gl.FRAGMENT_SHADER, fragmentShader);
        } catch (highPrecisionError) {
          console.warn(
            "Line Waves: highp fragment precision unavailable, using mediump.",
            highPrecisionError
          );

          fragment = this.compileShader(
            gl.FRAGMENT_SHADER,
            fragmentShader.replace(
              "precision highp float;",
              "precision mediump float;"
            )
          );
        }

        const program = gl.createProgram();

        gl.attachShader(program, vertex);
        gl.attachShader(program, fragment);
        gl.linkProgram(program);
        gl.deleteShader(vertex);
        gl.deleteShader(fragment);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          const log = gl.getProgramInfoLog(program);
          gl.deleteProgram(program);
          throw new Error(log || "Program linking failed");
        }

        this.program = program;
        gl.useProgram(program);

        const vertices = new Float32Array([
          -1, -1,
           3, -1,
          -1,  3
        ]);

        this.buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        const position = gl.getAttribLocation(program, "position");
        gl.enableVertexAttribArray(position);
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

        const uniformNames = [
          "uTime", "uResolution", "uSpeed", "uInnerLines", "uOuterLines",
          "uWarpIntensity", "uRotation", "uEdgeFadeWidth", "uColorCycleSpeed",
          "uBrightness", "uColor1", "uColor2", "uColor3", "uMouse",
          "uMouseInfluence", "uEnableMouse"
        ];

        for (const name of uniformNames) {
          this.uniforms[name] = gl.getUniformLocation(program, name);
        }

        gl.uniform1f(this.uniforms.uSpeed, 0.3);
        gl.uniform1f(this.uniforms.uInnerLines, 32.0);
        gl.uniform1f(this.uniforms.uOuterLines, 36.0);
        gl.uniform1f(this.uniforms.uWarpIntensity, 1.0);
        gl.uniform1f(this.uniforms.uRotation, -45 * Math.PI / 180);
        gl.uniform1f(this.uniforms.uEdgeFadeWidth, 0.0);
        gl.uniform1f(this.uniforms.uColorCycleSpeed, 1.0);
        gl.uniform1f(this.uniforms.uBrightness, 0.24);
        gl.uniform3fv(this.uniforms.uColor1, this.hexToVec3("#84CC16"));
        gl.uniform3fv(this.uniforms.uColor2, this.hexToVec3("#578510"));
        gl.uniform3fv(this.uniforms.uColor3, this.hexToVec3("#84CC16"));
        gl.uniform2f(this.uniforms.uMouse, 0.5, 0.5);
        gl.uniform1f(this.uniforms.uMouseInfluence, 2.0);
        gl.uniform1i(this.uniforms.uEnableMouse, 1);
      }

      resize() {
        if (!this.gl || !this.stage) return;

        const rect = this.stage.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const width = Math.max(1, Math.round(rect.width * dpr));
        const height = Math.max(1, Math.round(rect.height * dpr));

        if (this.canvas.width !== width || this.canvas.height !== height) {
          this.canvas.width = width;
          this.canvas.height = height;
        }

        this.gl.viewport(0, 0, width, height);
        this.gl.useProgram(this.program);
        this.gl.uniform3f(
          this.uniforms.uResolution,
          width,
          height,
          width / Math.max(height, 1)
        );
      }

      handlePointerMove(event) {
        const rect = this.canvas.getBoundingClientRect();
        if (!rect.width || !rect.height) return;

        this.targetMouse[0] = (event.clientX - rect.left) / rect.width;
        this.targetMouse[1] = 1 - (event.clientY - rect.top) / rect.height;
      }

      handlePointerLeave() {
        this.targetMouse[0] = 0.5;
        this.targetMouse[1] = 0.5;
      }

      setSimulationActive(active) {
        const shouldRun = Boolean(active) && this.isConnected && Boolean(this.gl);
        this.simulationActive = shouldRun;

        if (!shouldRun) {
          cancelAnimationFrame(this.animationFrame);
          this.animationFrame = 0;
          if (this.statusNode) this.statusNode.textContent = this.localText("paused", "WEBGL PAUSED");
          return;
        }

        if (this.statusNode) this.statusNode.textContent = this.localText("active", "WEBGL ACTIVE");
        this.resize();

        if (!this.animationFrame) {
          this.animationFrame = requestAnimationFrame(this.frame);
        }
      }

      frame(now) {
        if (!this.simulationActive || !this.gl || !this.isConnected) {
          this.animationFrame = 0;
          return;
        }

        this.currentMouse[0] += 0.05 * (this.targetMouse[0] - this.currentMouse[0]);
        this.currentMouse[1] += 0.05 * (this.targetMouse[1] - this.currentMouse[1]);

        const gl = this.gl;
        gl.useProgram(this.program);
        gl.uniform1f(this.uniforms.uTime, (now - this.startTime) * 0.001);
        gl.uniform2f(
          this.uniforms.uMouse,
          this.currentMouse[0],
          this.currentMouse[1]
        );
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 3);

        this.animationFrame = requestAnimationFrame(this.frame);
      }
    }

    if (!customElements.get("line-waves-lab")) {
      customElements.define("line-waves-lab", LineWavesLab);
    }
