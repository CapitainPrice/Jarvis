/* ══════════════════════════════════════════════════
   JARVIS Interface v4.1 — Enhanced JavaScript
   ══════════════════════════════════════════════════ */

'use strict';

// ═══════════════════════════════════════
// UTILITY HELPERS
// ═══════════════════════════════════════
const $ = id => document.getElementById(id);
const now = () => new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
const nowShort = () => new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
const esc = t => { const d = document.createElement('div'); d.textContent = t; return d.innerHTML; };

// ═══════════════════════════════════════
// SPLASH SCREEN — BOOT ANIMATION
// ═══════════════════════════════════════
function initSplashScreen() {
    const splashScreen = $('splashScreen');
    const splashAudio = $('splashAudio');
    const boot01Audio = $('boot01Audio');
    const boot02Audio = $('boot02Audio');
    const splashPercent = $('splashPercent');
    const splashStatus = $('splashStatus');

    if (!splashScreen) return;

    // ── Only run on first visit per session (not when navigating back from portfolio) ──
    const SPLASH_KEY = 'jarvis_splash_shown';
    if (sessionStorage.getItem(SPLASH_KEY)) {
        splashScreen.style.display = 'none';
        return;
    }
    sessionStorage.setItem(SPLASH_KEY, '1');

    const statusMessages = [
        { at: 2,  msg: 'INITIALIZING POWER CORE...' },
        { at: 6,  msg: 'LOADING KERNEL MODULES...' },
        { at: 12, msg: 'CALIBRATING NEURAL NETWORK...' },
        { at: 18, msg: 'QUANTUM PROCESSORS ONLINE...' },
        { at: 24, msg: 'VOICE SYNTHESIS MODULE ONLINE...' },
        { at: 30, msg: 'CONNECTING TO ELEVENLABS...' },
        { at: 36, msg: 'SECURE CHANNEL ESTABLISHED...' },
        { at: 42, msg: 'LOADING HOLOGRAPHIC INTERFACE...' },
        { at: 48, msg: 'MEMORY ALLOCATION COMPLETE...' },
        { at: 54, msg: 'SCANNING THREAT MATRIX...' },
        { at: 60, msg: 'FIREWALL PROTOCOLS ACTIVE...' },
        { at: 66, msg: 'ENCRYPTING COMM CHANNELS...' },
        { at: 72, msg: 'SYNCING DATABASE NODES...' },
        { at: 78, msg: 'LOADING HUD MODULES...' },
        { at: 84, msg: 'VERIFYING SYSTEM INTEGRITY...' },
        { at: 90, msg: 'OPTIMIZING PERFORMANCE...' },
        { at: 95, msg: 'FINAL CHECKS COMPLETE...' },
        { at: 100, msg: 'JARVIS ONLINE — WELCOME BACK' }
    ];

    // ═══════════════════════════════════════
    // DIAGNOSTIC MESSAGES (splash screen bottom-left)
    // ═══════════════════════════════════════
    const diagContainer = $('splashDiagLines');
    const diagMessages = [
        { t: 200,    msg: '> BOOT SEQUENCE v4.1.0 INITIATED', delay: 0 },
        { t: 600,    msg: '> NEURAL CORES: 4.821 NODES ACTIVE', delay: 50 },
        { t: 1000,   msg: '> MEMORY HEAP: ALLOCATING 2.1 GB...', delay: 80 },
        { t: 1500,   msg: '> QUANTUM BRIDGE: STABLE', delay: 40 },
        { t: 2000,   msg: '> VOICE ENGINE: ELEVENLABS LINK SECURED', delay: 60 },
        { t: 2600,   msg: '> NEURAL NETWORK: 98.7% EFFICIENCY', delay: 45 },
        { t: 3200,   msg: '> THREAT DETECTION: ALPHA — MONITORING', delay: 70 },
        { t: 3800,   msg: '> FIREWALL: 4-LAYER ENCRYPTION ACTIVE', delay: 55 },
        { t: 4400,   msg: '> HOLOGRAPHIC DISPLAY: RENDERING...', delay: 65 },
        { t: 5000,   msg: '> HUD INTERFACE: MODULES LOADING', delay: 50 },
        { t: 5600,   msg: '> DATA STREAM: ENCRYPTION VERIFIED', delay: 40 },
        { t: 6200,   msg: '> ARK REACTOR: POWER OPTIMAL', delay: 45 },
        { t: 6800,   msg: '> JARVIS CORE: SYNCHRONIZED', delay: 60 },
        { t: 7400,   msg: '> ALL SYSTEMS OPERATIONAL', delay: 50 },
        { t: 8000,   msg: '> READY FOR USER INTERACTION', delay: 30 }
    ];

    // Animate diagnostic messages
    const animateDiag = () => {
        diagMessages.forEach((item, idx) => {
            setTimeout(() => {
                if (!diagContainer) return;
                const line = document.createElement('div');
                line.className = 'splash-diag-line';
                line.style.opacity = '0';
                line.style.transform = 'translateX(-20px)';
                line.textContent = item.msg;
                diagContainer.appendChild(line);
                // Trigger animation
                requestAnimationFrame(() => {
                    line.style.transition = 'all 0.3s ease-out';
                    line.style.opacity = '1';
                    line.style.transform = 'translateX(0)';
                });
                // Remove old lines (keep max 6 visible)
                while (diagContainer.children.length > 6) {
                    diagContainer.firstElementChild.remove();
                }
            }, item.t);
        });
    };
    animateDiag();

    // ═══════════════════════════════════════
    // PROGRESS BARS ANIMATION
    // ═══════════════════════════════════════
    const barMemory = $('spsMemory');
    const barNeural = $('spsNeural');
    const barVoice  = $('spsVoice');
    const barSecure = $('spsSecure');
    const valMemory = $('spsMemoryVal');
    const valNeural = $('spsNeuralVal');
    const valVoice  = $('spsVoiceVal');
    const valSecure = $('spsSecureVal');

    // Progress stages with realistic patterns
    const progressStages = {
        memory:  [
            { at: 5,  val: 12 }, { at: 15, val: 28 }, { at: 30, val: 45 },
            { at: 50, val: 67 }, { at: 70, val: 82 }, { at: 85, val: 91 },
            { at: 95, val: 98 }, { at: 100, val: 100 }
        ],
        neural:  [
            { at: 8,  val: 5 },  { at: 20, val: 18 }, { at: 35, val: 35 },
            { at: 55, val: 56 }, { at: 72, val: 74 }, { at: 88, val: 89 },
            { at: 96, val: 97 },  { at: 100, val: 100 }
        ],
        voice:   [
            { at: 10, val: 0 },  { at: 25, val: 15 }, { at: 40, val: 38 },
            { at: 60, val: 55 }, { at: 75, val: 72 }, { at: 90, val: 88 },
            { at: 97, val: 96 },  { at: 100, val: 100 }
        ],
        secure:  [
            { at: 0,  val: 0 },  { at: 12, val: 8 },  { at: 28, val: 22 },
            { at: 45, val: 41 }, { at: 62, val: 58 }, { at: 78, val: 76 },
            { at: 92, val: 91 },  { at: 100, val: 100 }
        ]
    };

    // Animate progress bars smoothly
    const animateProgressBars = (percent) => {
        // Find the appropriate value for each bar based on current percent
        const getProgressVal = (stages, pct) => {
            for (let i = stages.length - 1; i >= 0; i--) {
                if (pct >= stages[i].at) return stages[i].val;
            }
            return 0;
        };

        const memVal = getProgressVal(progressStages.memory, percent);
        const neuVal = getProgressVal(progressStages.neural, percent);
        const voiVal = getProgressVal(progressStages.voice, percent);
        const secVal = getProgressVal(progressStages.secure, percent);

        if (barMemory) { barMemory.style.width = memVal + '%'; valMemory.textContent = memVal + '%'; }
        if (barNeural) { barNeural.style.width = neuVal + '%'; valNeural.textContent = neuVal + '%'; }
        if (barVoice)  { barVoice.style.width  = voiVal + '%'; valVoice.textContent  = voiVal + '%'; }
        if (barSecure) { barSecure.style.width = secVal + '%'; valSecure.textContent = secVal + '%'; }
    };

    let currentMsgIndex = 0;
    let currentPercent = 0;
    const totalDuration = 15000; // 15 segundos
    const interval = 40;
    const steps = totalDuration / interval;
    const increment = 100 / steps;

    const playAudio = () => {
        const audios = [splashAudio, boot01Audio, boot02Audio].filter(Boolean);
        if (audios.length === 0) return;

        const play = (audio) => {
            if (!audio) return Promise.resolve();
            audio.volume = 0.7; // Volume geral para não sobrecarregar
            return audio.play();
        };

        const playAll = () => {
            // Toca o som principal e o primeiro boot juntos
            play(splashAudio);
            play(boot01Audio).then(() => {
                // Prepara o segundo som para tocar perto do fim do primeiro
                if (boot01Audio && boot02Audio && !isNaN(boot01Audio.duration)) {
                    const playSecondBoot = () => {
                        const delay = boot01Audio.duration - 1; // 1 segundo antes do fim
                        if (delay > 0) {
                            setTimeout(() => play(boot02Audio), delay * 1000);
                        } else {
                            play(boot02Audio); // Se o áudio for muito curto
                        }
                        // Remove o listener para não tocar múltiplas vezes
                        boot01Audio.removeEventListener('timeupdate', checkTime);
                    };

                    const checkTime = () => {
                        if (boot01Audio.currentTime > 0.1) { // Garante que a duração foi carregada
                           playSecondBoot();
                        }
                    };

                    boot01Audio.addEventListener('timeupdate', checkTime);
                }
            }).catch(() => { /* falha no play do boot01 já foi tratada */ });
        };

        // Tenta tocar o primeiro áudio para verificar o autoplay
        const playPromise = play(splashAudio);

        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Autoplay funcionou, toca o resto
                playAll();
            }).catch(() => {
                // Autoplay bloqueado, aguarda interação
                console.info('[AUDIO] Autoplay blocked. Waiting for user interaction.');
                const playOnFirstInteraction = () => {
                    playAll();
                };
                document.body.addEventListener('click', playOnFirstInteraction, { once: true });
                document.body.addEventListener('keydown', playOnFirstInteraction, { once: true });
                document.body.addEventListener('touchstart', playOnFirstInteraction, { once: true });
            });
        } else {
             // Fallback para browsers antigos que não retornam promise
             playAll();
        }
    };
    setTimeout(playAudio, 300);

    const updateProgress = () => {
        currentPercent += increment;

        if (currentPercent >= 100) {
            currentPercent = 100;
            if (splashPercent) splashPercent.textContent = '100%';
            if (splashStatus) splashStatus.textContent = 'JARVIS ONLINE — WELCOME BACK';
            animateProgressBars(100);

            setTimeout(() => {
                splashScreen.classList.add('fade-out');
                setTimeout(() => { splashScreen.style.display = 'none'; }, 900);
            }, 600);
            return;
        }

        if (splashPercent) splashPercent.textContent = Math.floor(currentPercent) + '%';

        // Animate progress bars
        animateProgressBars(currentPercent);

        if (currentMsgIndex < statusMessages.length &&
            currentPercent >= statusMessages[currentMsgIndex].at) {
            if (splashStatus) splashStatus.textContent = statusMessages[currentMsgIndex].msg;
            currentMsgIndex++;
        }

        setTimeout(updateProgress, interval);
    };

    setTimeout(updateProgress, 200);
}

// ═══════════════════════════════════════
// 1. CLOCK + DATE
// ═══════════════════════════════════════
function initClock() {
    const tick = () => {
        const d = new Date();
        $('clockDisplay').textContent = d.toLocaleTimeString('pt-BR');
        $('dateDisplay').textContent  = d.toLocaleDateString('pt-BR');
    };
    tick();
    setInterval(tick, 1000);
}

// ═══════════════════════════════════════
// 2. CORE CANVAS VISUALIZER
//    Replaces hologram.gif with an animated
//    arc-ring / pulse / particle system
// ═══════════════════════════════════════
class CoreVisualizer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx    = this.canvas.getContext('2d');
        this.t      = 0;
        this.particles = [];
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.initParticles();
        this.loop();
    }

    resize() {
        const r = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width  = r.width;
        this.canvas.height = r.height;
        this.cx = this.canvas.width  / 2;
        this.cy = this.canvas.height / 2;
        this.R  = Math.min(this.cx, this.cy) * 0.72;
    }

    initParticles() {
        for (let i = 0; i < 60; i++) {
            this.particles.push({
                angle: Math.random() * Math.PI * 2,
                radius: this.R * (0.3 + Math.random() * 0.7),
                speed: (Math.random() - 0.5) * 0.008,
                size: Math.random() * 2 + 0.5,
                opacity: Math.random()
            });
        }
    }

    drawRing(radius, color, width, dash, speed) {
        const ctx = this.ctx;
        ctx.save();
        ctx.translate(this.cx, this.cy);
        ctx.rotate(this.t * speed);
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.strokeStyle = color;
        ctx.lineWidth   = width;
        if (dash) ctx.setLineDash(dash);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
    }

    drawArcSegments(radius, count, color, offset) {
        const ctx = this.ctx;
        ctx.save();
        ctx.translate(this.cx, this.cy);
        ctx.rotate(this.t * 0.6 + offset);
        const gapAngle = 0.15;
        const segAngle = (Math.PI * 2 - count * gapAngle) / count;
        for (let i = 0; i < count; i++) {
            const start = i * (segAngle + gapAngle);
            ctx.beginPath();
            ctx.arc(0, 0, radius, start, start + segAngle);
            ctx.strokeStyle = color;
            ctx.lineWidth   = 2;
            ctx.stroke();
        }
        ctx.restore();
    }

    drawPulseCircle() {
        const ctx = this.ctx;
        const pulse = 0.5 + 0.5 * Math.sin(this.t * 2);
        const r     = this.R * 0.18 + pulse * this.R * 0.04;
        const grad  = ctx.createRadialGradient(this.cx, this.cy, 0, this.cx, this.cy, r * 1.6);
        grad.addColorStop(0,   `rgba(0,212,255,${0.3 + 0.2 * pulse})`);
        grad.addColorStop(0.5, `rgba(0,180,220,${0.15 * pulse})`);
        grad.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(this.cx, this.cy, r * 1.6, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.cx, this.cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,230,255,${0.7 + 0.3 * pulse})`;
        ctx.lineWidth   = 2;
        ctx.stroke();
    }

    drawScanLine() {
        const ctx   = this.ctx;
        const angle = this.t * 1.2;
        const len   = this.R * 0.8;
        const ex    = this.cx + Math.cos(angle) * len;
        const ey    = this.cy + Math.sin(angle) * len;
        const grad  = ctx.createLinearGradient(this.cx, this.cy, ex, ey);
        grad.addColorStop(0,   'rgba(0,255,200,0.5)');
        grad.addColorStop(1,   'rgba(0,255,200,0)');
        ctx.beginPath();
        ctx.moveTo(this.cx, this.cy);
        ctx.lineTo(ex, ey);
        ctx.strokeStyle = grad;
        ctx.lineWidth   = 1.5;
        ctx.stroke();
    }

    drawParticles() {
        const ctx = this.ctx;
        for (const p of this.particles) {
            p.angle   += p.speed;
            p.opacity  = 0.3 + 0.7 * Math.abs(Math.sin(this.t * 0.5 + p.angle));
            const x    = this.cx + Math.cos(p.angle) * p.radius;
            const y    = this.cy + Math.sin(p.angle) * p.radius;
            ctx.beginPath();
            ctx.arc(x, y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0,212,255,${p.opacity * 0.6})`;
            ctx.fill();
        }
    }

    drawDataTicks() {
        const ctx = this.ctx;
        ctx.save();
        ctx.translate(this.cx, this.cy);
        const count = 36;
        for (let i = 0; i < count; i++) {
            const angle  = (i / count) * Math.PI * 2 - Math.PI / 2;
            const outer  = this.R;
            const inner  = i % 3 === 0 ? this.R - 10 : this.R - 5;
            const active = i % 3 === 0;
            ctx.beginPath();
            ctx.moveTo(Math.cos(angle) * inner, Math.sin(angle) * inner);
            ctx.lineTo(Math.cos(angle) * outer, Math.sin(angle) * outer);
            ctx.strokeStyle = active ? 'rgba(0,212,255,0.8)' : 'rgba(0,212,255,0.25)';
            ctx.lineWidth   = active ? 1.5 : 0.8;
            ctx.stroke();
        }
        ctx.restore();
    }

    loop() {
        const ctx = this.ctx;
        this.t += 0.018;

        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Outer grid dots (very subtle)
        ctx.fillStyle = 'rgba(0,212,255,0.03)';
        const step = 30;
        for (let x = 0; x < this.canvas.width; x += step) {
            for (let y = 0; y < this.canvas.height; y += step) {
                ctx.fillRect(x, y, 1, 1);
            }
        }

        // Rings
        this.drawRing(this.R,        'rgba(0,212,255,0.25)', 1, [4, 8], 0.1);
        this.drawRing(this.R * 0.82, 'rgba(0,212,255,0.15)', 0.8, [2, 6], -0.15);
        this.drawRing(this.R * 0.62, 'rgba(0,255,200,0.12)', 0.8, null, 0.2);

        // Arc segments
        this.drawArcSegments(this.R * 0.92, 6, 'rgba(0,220,255,0.6)', 0);
        this.drawArcSegments(this.R * 0.74, 4, 'rgba(0,255,180,0.4)', Math.PI / 4);

        // Tick marks on outer ring
        this.drawDataTicks();

        // Scan line
        this.drawScanLine();

        // Orbiting particles
        this.drawParticles();

        // Center pulse
        this.drawPulseCircle();

        requestAnimationFrame(() => this.loop());
    }
}

// ═══════════════════════════════════════
// 3. MINI CHART (canvas sparkline)
// ═══════════════════════════════════════
class MiniChart {
    constructor(canvasId) {
        this.canvas  = document.getElementById(canvasId);
        this.ctx     = this.canvas.getContext('2d');
        this.data    = Array.from({ length: 40 }, () => Math.random() * 60 + 20);
        this.draw();
        setInterval(() => this.update(), 800);
    }

    update() {
        this.data.shift();
        this.data.push(Math.random() * 60 + 20);
        this.draw();
    }

    draw() {
        const ctx = this.ctx;
        const w   = this.canvas.width;
        const h   = this.canvas.height;
        ctx.clearRect(0, 0, w, h);

        const step   = w / (this.data.length - 1);
        const maxVal = 100;

        // Gradient fill
        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0,   'rgba(0,212,255,0.3)');
        grad.addColorStop(1,   'rgba(0,212,255,0)');

        ctx.beginPath();
        this.data.forEach((v, i) => {
            const x = i * step;
            const y = h - (v / maxVal) * h;
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();

        // Line
        ctx.beginPath();
        this.data.forEach((v, i) => {
            const x = i * step;
            const y = h - (v / maxVal) * h;
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.strokeStyle = 'rgba(0,212,255,0.9)';
        ctx.lineWidth   = 1.5;
        ctx.stroke();
    }
}

// ═══════════════════════════════════════
// 4. MÉTRICAS REAIS DO SISTEMA
// ═══════════════════════════════════════
class HUDUpdater {
    constructor() {
        this.logEntries = [
            '[SYSTEM] JARVIS INITIALIZED',    '[AUDIO] VOICE RECOGNITION ACTIVE',
            '[NETWORK] ELEVENLABS CONNECTED',  '[STATUS] ALL SYSTEMS OPERATIONAL',
            '[READY] AWAITING USER INPUT',     '[SCAN] INTEGRITY CHECK OK',
            '[DATA] NEURAL CACHE UPDATED',     '[AI] PREDICTIVE MODEL LOADED',
            '[SECURITY] ENCRYPTION ACTIVE',    '[MONITOR] REAL-TIME ANALYSIS',
            '[CORE] TEMPERATURE NOMINAL',      '[TASK] QUEUE PROCESSED',
        ];
        this.logClasses  = ['','ok','warn','','ok','','warn','','','','',''];

        this._cpuHistory   = Array(10).fill(25); // Start CPU at 25%
        this._netPrevBytes = 0;
        this._netPrevTime  = performance.now();

        this.chartHistory = Array.from({length: 40}, () => 31);

        this.start();
    }

    // ── CPU: estimado medindo quanto tempo o main thread ficou ocupado ──
    _measureCPU() {
        return new Promise(resolve => {
            const samples = 5;
            let busy = 0;
            let i = 0;
            const tick = () => {
                const t0 = performance.now();
                // Pequeno trabalho síncrono para medir bloqueio
                for (let k = 0; k < 5000; k++) Math.sqrt(k);
                const elapsed = performance.now() - t0;
                busy += elapsed;
                i++;
                if (i < samples) {
                    requestAnimationFrame(tick);
                } else {
                    const pct = Math.min(100, Math.round((busy / (samples * 16.67)) * 100));
                    // Garante um valor mínimo de 5% para visibilidade
                    resolve(Math.max(5, pct));
                }
            };
            requestAnimationFrame(tick);
        });
    }

    // ── RAM real via performance.memory (Chrome/Edge) ──
    _getMemory() {
        if (performance.memory) {
            const used  = performance.memory.usedJSHeapSize;
            const total = performance.memory.jsHeapSizeLimit;
            // Usa um valor simulado acima de 20% para garantir visibilidade
            // Mesmo que o heap real seja pequeno, simula uso realístico
            let pct = Math.round((used / total) * 100);
            // Se o valor real for muito baixo (<15%), simula um valor base mais alta
            if (pct < 15) pct = 23 + Math.floor(Math.random() * 10);
            const usedMB  = (used  / 1048576).toFixed(0);
            const totalMB = (total / 1048576).toFixed(0);
            return { pct, usedMB, totalMB, real: true };
        }
        return { pct: null, real: false };
    }

    // ── Rede real via navigator.connection (quando disponível) ──
    _getNetwork() {
        const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (conn) {
            const downlink = conn.downlink || 0; // Mbps
            const rtt      = conn.rtt      || 0; // ms
            const type     = conn.effectiveType || '?';
            return { downlink, rtt, type, real: true };
        }
        return { real: false };
    }

    // ── Latência real via performance timing ──
    _getLatency() {
        const nav = performance.getEntriesByType('navigation')[0];
        if (nav) {
            const ttfb = Math.round(nav.responseStart - nav.requestStart);
            return ttfb > 0 ? ttfb : null;
        }
        return null;
    }

    async start() {
        await this._updateMetrics(); // Primeira leitura
        // Atualiza as barras imediatamente (não espera 2.2s)
        setTimeout(() => this._updateBars(), 200);
        setInterval(() => this._updateMetrics(), 2000);
        setInterval(() => this._updateBars(), 2200);
        setInterval(() => {
            if (window._miniChart) {
                window._miniChart.data.shift();
                window._miniChart.data.push(this.getAverageCPU(1));
                window._miniChart.draw();
            }
        }, 800);
        setInterval(() => this._updateCircles(), 3000);
        setInterval(() => this._addLog(), 4000);
    }

    getAverageCPU(size=5) {
        const relevantHistory = this._cpuHistory.slice(-size);
        const avg = relevantHistory.reduce((a, b) => a + b, 0) / relevantHistory.length;
        return Math.round(avg);
    }

    async _updateMetrics() {
        // ── CPU (com média móvel) ──
        const cpuPct = await this._measureCPU();
        this._cpuHistory.push(cpuPct);
        if (this._cpuHistory.length > 40) this._cpuHistory.shift();
        const avgCpu = this.getAverageCPU();

        // Atualiza barra visual da CPU
        $('b0').style.width = avgCpu + '%';
        $('p0').textContent = avgCpu + '%';
        $('b0').style.boxShadow = avgCpu > 80 ? '0 0 6px var(--red)' : '0 0 6px var(--blue)';

        const cpuEl = $('cpuVal');
        cpuEl.textContent = `CPU ${avgCpu}%`;
        cpuEl.style.color = avgCpu > 80 ? 'var(--red)' : avgCpu > 50 ? 'var(--warn)' : 'var(--text)';

        // ── MEM (sincronizada com a barra inferior) ──
        const mem = this._getMemory();
        const memEl = $('memVal');
        if (mem.real) {
            const memPct = Math.max(20, mem.pct); // Mínimo 20% para visibilidade
            $('b1').style.width = memPct + '%';
            $('p1').textContent = memPct + '%';
            memEl.textContent = `MEM ${memPct}% (${mem.usedMB}MB)`;
            memEl.style.color = memPct > 80 ? 'var(--red)' : memPct > 60 ? 'var(--warn)' : 'var(--text)';
            memEl.title = `Heap: ${mem.usedMB}MB / ${mem.totalMB}MB`;
        } else {
            const current = parseInt($('p1').textContent) || 25;
            const simMem = Math.max(20, current);
            const v = this._realisticWalk(simMem, 20, 90, 8);
            $('b1').style.width = v.toFixed(0) + '%';
            $('p1').textContent = v.toFixed(0) + '%';
            memEl.textContent = `MEM ${v.toFixed(0)}% (sim)`;
            memEl.title = 'Simulado: performance.memory não disponível';
            memEl.style.color = v.toFixed(0) > 80 ? 'var(--red)' : v.toFixed(0) > 60 ? 'var(--warn)' : 'var(--text)';
        }

        // ── REDE (sincronizada com a barra inferior) ──
        const net   = this._getNetwork();
        const netEl = $('netVal');
        if (net.real) {
            netEl.textContent = `NET ${net.downlink.toFixed(1)}Mbps · ${net.rtt}ms`;
            netEl.style.color = net.rtt > 150 ? 'var(--warn)' : 'var(--text)';
            netEl.title = `Effective type: ${net.type}`;
            // Atualiza barra visual da rede
            const currentNet = parseInt($('p2').textContent) || 75;
            const netPct = Math.max(30, currentNet);
            $('b2').style.width = netPct + '%';
            $('p2').textContent = netPct + '%';
        } else {
            const currentNet = parseInt($('p2').textContent) || 75;
            const netPct = Math.max(30, currentNet);
            const b2 = this._realisticWalk(netPct, 30, 95, 10);
            const b2Int = Math.round(b2);
            $('b2').style.width = b2Int + '%';
            $('p2').textContent = b2Int + '%';
            netEl.textContent = `NET ~${b2Int}% (sim)`;
            netEl.title = 'Simulado: navigator.connection não disponível';
            netEl.style.color = 'var(--text)';
        }

        // Atualiza barra 3 (CARGA DO SISTEMA)
        const currentLoad = parseInt($('p3').textContent) || 40;
        const b3 = this._realisticWalk(currentLoad, 20, 85, (avgCpu/10)); // Jitter proporcional à CPU
        const b3Int = Math.round(b3);
        $('b3').style.width = b3Int + '%';
        $('p3').textContent = b3Int + '%';

        // ── Core Stats Atualizados ──
        const lat = this._getLatency();
        if ($('csThink')) $('csThink').textContent = lat !== null ? `${lat}ms` : `<1ms`;
        if ($('csReq')) $('csReq').textContent = mem.real ? `${mem.usedMB}MB` : `—`;
        if ($('csTemp')) {
            const secs = Math.round(performance.now() / 1000);
            const mm   = String(Math.floor(secs / 60)).padStart(2,'0');
            const ss   = String(secs % 60).padStart(2,'0');
            $('csTemp').textContent = `${mm}:${ss}`;
        }
    }

    async _measureNetLatency() {
        try {
            const t0  = performance.now();
            await fetch(location.href, { method: 'HEAD', cache: 'no-store' });
            return Math.round(performance.now() - t0);
        } catch { return null; }
    }

    // Simulação mais fluida para os fallbacks
    _realisticWalk(currentVal, min, max, step) {
        const newVal = currentVal + (Math.random() - 0.5) * step;
        return Math.max(min, Math.min(max, newVal));
    }

    _updateBars() {
        const avgCpu = this.getAverageCPU();
        const mem = this._getMemory();

        // Barra 0 = CPU real (média móvel)
        $('b0').style.width = avgCpu + '%';
        $('p0').textContent = avgCpu + '%';
        $('b0').style.boxShadow = avgCpu > 80 ? '0 0 6px var(--red)' : '0 0 6px var(--blue)';

        // Barra 1 = MEM real ou simulação realista
        // Sempre garante um valor mínimo de 20% para visibilidade
        if (mem.real) {
            const memPct = Math.max(20, mem.pct); // Mínimo 20% para visibilidade
            $('b1').style.width = memPct + '%';
            $('p1').textContent = memPct + '%';
        } else {
            const current = parseInt($('p1').textContent) || 25;
            const v = this._realisticWalk(current, 20, 90, 8);
            $('b1').style.width = v.toFixed(0) + '%';
            $('p1').textContent = v.toFixed(0) + '%';
        }

        // Barra 2 e 3 = simulação realista derivada da CPU
        const currentNet = parseInt($('p2').textContent) || 75;
        const b2 = this._realisticWalk(currentNet, 30, 95, 10);
        const b2Int = Math.round(b2); // Garante que é um inteiro
        $('b2').style.width = b2Int + '%';
        $('p2').textContent = b2Int + '%';

        const currentLoad = parseInt($('p3').textContent) || 40;
        const b3 = this._realisticWalk(currentLoad, 20, 85, (avgCpu/10)); // Jitter proporcional à CPU
        const b3Int = Math.round(b3);
        $('b3').style.width = b3Int + '%';
        $('p3').textContent = b3Int + '%';
    }

    _updateCircles() {
        const mem = this._getMemory();
        const net = this._getNetwork();

        if ($('dc0')) $('dc0').textContent = this.getAverageCPU() + '%';
        if ($('dc1') && mem.real) $('dc1').textContent = mem.usedMB + 'M';
        if ($('dc2') && net.real) $('dc2').textContent = net.rtt + 'ms';
        if ($('dc3')) $('dc3').textContent = Math.round(performance.now() / 1000) + 's';
    }

    _addLog() {
        const log = $('logContent');
        const cpu = this.getAverageCPU();
        const mem = this._getMemory();

        let text, cls;
        if (Math.random() > 0.5) {
            const idx = Math.floor(Math.random() * this.logEntries.length);
            text = this.logEntries[idx];
            cls  = this.logClasses[idx] || '';
        } else {
            if (cpu > 80) { text = `[CPU] ALERTA DE CARGA: ${cpu}%`; cls = 'warn'; }
            else if (mem.real && mem.pct > 75) { text = `[MEM] USO ALTO: ${mem.pct}%`; cls = 'warn'; }
            else { text = `[MONITOR] CPU:${cpu}% ${mem.real ? `MEM:${mem.pct}%` : ''}`; cls = 'ok'; }
        }

        const div = document.createElement('div');
        div.className = 'log-line ' + cls;
        div.textContent = text;
        log.appendChild(div);
        if (log.children.length > 10) log.firstElementChild.remove();
    }
}

// ═══════════════════════════════════════
// 5. BOOKMARK MANAGER
// ═══════════════════════════════════════
class BookmarkManager {
    constructor() {
        this.bookmarks = JSON.parse(localStorage.getItem('jarvis_bookmarks') || '[]');

        this.overlay = document.getElementById('linksSidebar');

        const _openBtn = document.getElementById('openLinksSidebar'); if (_openBtn) _openBtn.addEventListener('click', () => this.open());
        const closeBtn = document.getElementById('closeLinksSidebar') || document.getElementById('closeBookmarks');
        if (closeBtn) closeBtn.addEventListener('click', () => this.close());
        this.overlay.addEventListener('click', e => { if (e.target === this.overlay) this.close(); });

        $('addBmBtn').addEventListener('click', () => this.add());
        $('bmNameInput').addEventListener('keydown', e => { if (e.key === 'Enter') $('bmUrlInput').focus(); });
        $('bmUrlInput').addEventListener('keydown',  e => { if (e.key === 'Enter') this.add(); });

        this.render();
    }

    save() { localStorage.setItem('jarvis_bookmarks', JSON.stringify(this.bookmarks)); }

    open()  { 
        const sb = document.getElementById('linksSidebar');
        if (sb) sb.classList.add('open');
        this.render(); 
    }
    close() { 
        const sb = document.getElementById('linksSidebar');
        if (sb) sb.classList.remove('open');
    }

    add() {
        let name   = $('bmNameInput').value.trim();
        let url    = $('bmUrlInput').value.trim();
        const target = $('bmTarget').value;

        if (!name || !url) return;

        // Garante protocolo
        if (!/^https?:\/\//i.test(url) && !url.startsWith('/') && !url.startsWith('.')) {
            url = 'https://' + url;
        }

        this.bookmarks.unshift({ id: Date.now(), name, url, target });
        this.save();

        $('bmNameInput').value = '';
        $('bmUrlInput').value  = '';

        this.render();
        window.jarvisInterface?.addSystemMessage(`[LINK] MARCADOR ADICIONADO: "${name.toUpperCase()}"`);
    }

    delete(id) {
        this.bookmarks = this.bookmarks.filter(b => b.id !== id);
        this.save();
        this.render();
    }

    render() {
        const list  = $('bmList');
        const empty = $('bmEmpty');

        // Remove old chips, keep empty state
        list.querySelectorAll('.bm-chip').forEach(el => el.remove());

        const bmStat = document.getElementById('bmStatTotal');
        if (bmStat) bmStat.textContent = `${this.bookmarks.length} link${this.bookmarks.length !== 1 ? 's' : ''}`;
        if (empty) empty.style.display = this.bookmarks.length === 0 ? 'flex' : 'none';

        this.bookmarks.forEach(bm => {
            let favicon = '';
            try {
                const u = new URL(bm.url);
                favicon = `https://www.google.com/s2/favicons?domain=${u.hostname}&sz=16`;
            } catch {}

            const card = document.createElement('div');
            card.className = 'bm-chip';
            card.innerHTML = `
                ${favicon ? `<img src="${favicon}" class="bm-chip-fav" alt="">` : ''}
                <a class="bm-chip-name" href="${esc(bm.url)}" target="${bm.target}" rel="noopener">${esc(bm.name)}</a>
                <button class="bm-chip-del" data-id="${bm.id}" title="Remover">✕</button>
            `;

            card.querySelector('.bm-chip-del').addEventListener('click', e => {
                this.delete(Number(e.currentTarget.dataset.id));
            });

            list.appendChild(card);
        });
    }
}

// ═══════════════════════════════════════
// 6. ELEVENLABS — sincroniza estado no HUD
// ═══════════════════════════════════════
class JARVISVoice {
    constructor(ui) {
        this.ui        = ui;
        this.waveSpans = document.querySelectorAll('#voiceWave span');
        this.indicator = $('voiceIndicator');
        this.statusLbl = $('voiceStatus');
        this._bind();
    }

    _bind() {
        const poll = () => {
            const el = document.querySelector('elevenlabs-convai');
            if (!el) { setTimeout(poll, 500); return; }

            const onStart = () => {
                this.statusLbl.textContent = 'JARVIS FALANDO...';
                this.indicator.classList.add('active');
                this.waveSpans.forEach(s => { s.style.animationDuration = '0.3s'; s.style.background = 'var(--orange)'; });
                this.ui.addMessage('system', '[ELEVENLABS] CONVERSA INICIADA');
            };
            const onEnd = () => {
                this.statusLbl.textContent = 'FALAR COM JARVIS';
                this.indicator.classList.remove('active');
                this.waveSpans.forEach(s => { s.style.animationDuration = '1.8s'; s.style.background = 'var(--blue)'; });
                this.ui.addMessage('system', '[ELEVENLABS] CONVERSA ENCERRADA');
            };

            ['elevenlabs-convai:call-started','conversation-started','call-started'].forEach(e => el.addEventListener(e, onStart));
            ['elevenlabs-convai:call-ended','conversation-ended','call-ended'].forEach(e => el.addEventListener(e, onEnd));

            this.ui.addMessage('system', '[ELEVENLABS] AGENTE PRONTO');
        };
        setTimeout(poll, 800);
    }
}

// ═══════════════════════════════════════
// 7. CHAT UI
// ═══════════════════════════════════════
class ChatUI {
    constructor() {
        this.container = $('chatMessages');
    }

    addMessage(type, text) {
        const div = document.createElement('div');
        div.className = `message ${type}-message`;
        div.innerHTML = `
            <div class="message-content">
                <p>${esc(text)}</p>
                <span class="message-time">${nowShort()}</span>
            </div>`;
        this.container.appendChild(div);
        this.container.scrollTop = this.container.scrollHeight;
    }

    addSystemMessage(text) { this.addMessage('system', text); }
}

// ═══════════════════════════════════════
// 8. BOOT SEQUENCE
// ═══════════════════════════════════════
function bootSequence(chatUI) {
    const messages = [
        { t: 600,  msg: '[BOOT] JARVIS CORE SYSTEMS INITIALIZED' },
        { t: 1200, msg: '[NET] NETWORK INTERFACE ONLINE' },
        { t: 1900, msg: '[AI] NEURAL NETWORK LOADED — 4.821 NODES ACTIVE' },
        { t: 2700, msg: '[VOICE] RECONHECIMENTO DE VOZ PRONTO' },
        { t: 3500, msg: '[READY] TODOS OS SISTEMAS OPERACIONAIS. BEM-VINDO.' }
    ];
    messages.forEach(({ t, msg }) => setTimeout(() => chatUI.addSystemMessage(msg), t));
}

// ═══════════════════════════════════════
// 9. N8N INTEGRATION (stub)
// ═══════════════════════════════════════
class N8NIntegration {
    constructor() {
        this.webhookUrl = '';
        this.apiKey     = '';
    }
    async send(message, context = {}) {
        if (!this.webhookUrl) return null;
        try {
            const res = await fetch(this.webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': this.apiKey ? `Bearer ${this.apiKey}` : '' },
                body: JSON.stringify({ message, timestamp: new Date().toISOString(), context })
            });
            return res.ok ? await res.json() : null;
        } catch { return null; }
    }
}

// ═══════════════════════════════════════
// 10. MAIN INIT
// ═══════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
    // Init Splash Screen FIRST
    initSplashScreen();

    // Wrap the three columns properly (HTML already has .col-left/.col-center/.col-right as direct children after top-bar)
    // The layout wrapper is .cols-wrapper — let's make sure it exists
    const container = document.querySelector('.hud-container');
    const topBar    = document.querySelector('.top-bar');
    let wrapper     = document.querySelector('.cols-wrapper');

    if (!wrapper) {
        wrapper = document.createElement('div');
        wrapper.className = 'cols-wrapper';
        const colLeft   = document.querySelector('.col-left');
        const colCenter = document.querySelector('.col-center');
        const colRight  = document.querySelector('.col-right');
        if (colLeft && colCenter && colRight) {
            container.insertBefore(wrapper, colLeft);
            wrapper.appendChild(colLeft);
            wrapper.appendChild(colCenter);
            wrapper.appendChild(colRight);
        }
    }

    // Init subsystems
    initClock();
    const chatUI   = new ChatUI();
    const core     = new CoreVisualizer('coreCanvas');
    const chart    = new MiniChart('chartCanvas');
    const hud      = new HUDUpdater();
    const bookmarks = new BookmarkManager();
    const voice    = new JARVISVoice(chatUI);

    // Boot
    bootSequence(chatUI);

    // Expose globally
    window.jarvisInterface = { addSystemMessage: t => chatUI.addSystemMessage(t) };
    window.n8nIntegration  = new N8NIntegration();

    console.info('%cJARVIS v4.1 ONLINE', 'color:#00d4ff;font-size:1.2rem;font-weight:bold');
    console.info('Atalhos: ESPAÇO = voz | ESC = parar | B = links');

    const action = data.response || data.output || data.message;

    switch (action) {
    case "OPEN_PORTFOLIO":
        window.location.href = "./portfolio.html";
        break;

    default:
        console.log("Resposta normal:", action);
    }

    document.addEventListener('keydown', e => {
        if (e.key.toLowerCase() === 'b' && document.activeElement.tagName !== 'INPUT') {
            bookmarks.open();
        }
    });
});