/**
 * Terminal Animation - Single instance module with proper lifecycle management
 * - Single initialization guarded by global token
 * - Full cleanup on astro:before-swap
 * - Single init on astro:page-load
 * - Static fallback for no-JS and prefers-reduced-motion
 */

const TERMINAL_SCRIPT = [
  { type: 'command', text: 'whoami', prompt: '$' },
  { type: 'output', text: '> Rishi Sakhija: AI/ML builder, agents & automation' },
  { type: 'command', text: 'cat focus.txt', prompt: '$' },
  { type: 'output', text: '> agents | automation | search | prompt engineering' },
  { type: 'command', text: 'agents --status', prompt: '$' },
  { type: 'output', text: '> supervisor: online | builder: online | analyst: standby' },
  { type: 'command', text: 'ls projects/', prompt: '$' },
  { type: 'output', text: '> ai-search-engine/  agentic-team/  virtual-shelf/' },
  { type: 'command', text: 'echo $STATUS', prompt: '$' },
  { type: 'output', text: '> open to work, remote, building daily' },
];

const TERMINAL_CONFIG = {
  typeSpeedMin: 35,
  typeSpeedMax: 50,
  eraseSpeed: 20,
  pauseAfterLine: 1400,
  pauseBeforeErase: 800,
};

// Global token to ensure single initialization
const INIT_TOKEN = Symbol('term.init');
let currentToken = null;

class TerminalAnimation {
  constructor(root) {
    this.root = root;
    this.animated = root?.querySelector('[data-terminal-animated]');
    this.static = root?.querySelector('[data-terminal-static]');
    this.body = root?.querySelector('[data-terminal-body]');
    this.script = TERMINAL_SCRIPT;
    this.config = TERMINAL_CONFIG;

    this.currentLineIndex = 0;
    this.currentCharIndex = 0;
    this.isTyping = false;
    this.isErasing = false;
    this.isPaused = false;
    this.lineElement = null;
    this.contentElement = null;
    this.cursorElement = null;
    this.observer = null;
    this.timeoutId = null;
    this.prefersReducedMotion = false;

    this.init();
  }

  init() {
    if (!this.root || !this.body) return;

    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (this.prefersReducedMotion) {
      this.showStatic();
      return;
    }

    // Intersection Observer to pause when off-screen
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) this.resume();
          else this.pause();
        });
      },
      { rootMargin: '100px' }
    );
    this.observer.observe(this.root);

    // Pause when tab is hidden
    this._visibilityHandler = () => {
      if (document.hidden) this.pause();
      else this.resume();
    };
    document.addEventListener('visibilitychange', this._visibilityHandler);

    this.start();
  }

  showStatic() {
    if (this.animated) this.animated.hidden = true;
    if (this.static) this.static.hidden = false;
  }

  showAnimated() {
    if (this.animated) this.animated.hidden = false;
    if (this.static) this.static.hidden = true;
  }

  start() {
    this.showAnimated();
    this.typeNextLine();
  }

  pause() {
    this.isPaused = true;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  resume() {
    if (!this.isPaused) return;
    this.isPaused = false;
    this.continueAfterPause();
  }

  continueAfterPause() {
    if (this.isErasing) this.eraseLine();
    else if (this.isTyping) this.typeCurrentLine();
    else this.typeNextLine();
  }

  async typeNextLine() {
    if (this.isPaused) return;
    if (this.currentLineIndex >= this.script.length) {
      this.currentLineIndex = 0;
    }

    const lineData = this.script[this.currentLineIndex];
    await this.typeLine(lineData);

    if (!this.isPaused) await this.wait(this.config.pauseAfterLine);
    if (!this.isPaused) await this.wait(this.config.pauseBeforeErase);
    if (!this.isPaused) await this.eraseLine();
    if (!this.isPaused) {
      this.currentLineIndex++;
      this.typeNextLine();
    }
  }

  typeLine(lineData) {
    return new Promise((resolve) => {
      this.isTyping = true;

      this.lineElement = document.createElement('div');
      this.lineElement.className = 'terminal-line';
      this.lineElement.dataset.lineIndex = String(this.currentLineIndex);

      if (lineData.type === 'command') {
        const prompt = document.createElement('span');
        prompt.className = 'terminal-prompt';
        prompt.textContent = lineData.prompt || '$';
        this.lineElement.appendChild(prompt);

        this.contentElement = document.createElement('span');
        this.contentElement.className = 'terminal-command';
        this.lineElement.appendChild(this.contentElement);
      } else {
        this.contentElement = document.createElement('span');
        this.contentElement.className = 'terminal-output';
        this.lineElement.appendChild(this.contentElement);
      }

      this.cursorElement = document.createElement('span');
      this.cursorElement.className = 'terminal-cursor';
      this.lineElement.appendChild(this.cursorElement);

      this.body?.appendChild(this.lineElement);
      if (this.body) this.body.scrollTop = this.body.scrollHeight;

      this.currentCharIndex = 0;
      this.typeCurrentLine(resolve);
    });
  }

  typeCurrentLine(resolve) {
    if (this.isPaused) {
      this.timeoutId = setTimeout(() => this.typeCurrentLine(resolve), 50);
      return;
    }

    const lineData = this.script[this.currentLineIndex];
    const fullText = lineData.text;

    if (this.currentCharIndex <= fullText.length) {
      if (this.contentElement) {
        this.contentElement.textContent = fullText.slice(0, this.currentCharIndex);
      }
      this.currentCharIndex++;

      const speed = this.config.typeSpeedMin + Math.random() * (this.config.typeSpeedMax - this.config.typeSpeedMin);
      this.timeoutId = setTimeout(() => this.typeCurrentLine(resolve), speed);
    } else {
      this.isTyping = false;
      resolve();
    }
  }

  eraseLine() {
    return new Promise((resolve) => {
      this.isErasing = true;
      const lineData = this.script[this.currentLineIndex];
      const fullText = lineData.text;

      const doErase = () => {
        if (this.isPaused) {
          this.timeoutId = setTimeout(doErase, 50);
          return;
        }

        if (this.currentCharIndex >= 0) {
          if (this.contentElement) {
            this.contentElement.textContent = fullText.slice(0, this.currentCharIndex);
          }
          this.currentCharIndex--;
          this.timeoutId = setTimeout(doErase, this.config.eraseSpeed);
        } else {
          if (this.lineElement && this.lineElement.parentNode) {
            this.lineElement.remove();
          }
          this.lineElement = null;
          this.contentElement = null;
          this.cursorElement = null;
          this.isErasing = false;
          resolve();
        }
      };
      doErase();
    });
  }

  wait(ms) {
    return new Promise((resolve) => {
      this.timeoutId = setTimeout(resolve, ms);
    });
  }

  destroy() {
    if (this.observer) this.observer.disconnect();
    if (this._visibilityHandler) document.removeEventListener('visibilitychange', this._visibilityHandler);
    if (this.timeoutId) clearTimeout(this.timeoutId);
    this.timeoutId = null;
  }
}

// Single initialization function with token guard
function initTerminal() {
  // Check if already initialized with current token
  if (window[INIT_TOKEN] === currentToken) return;

  // Clean up any existing instances
  const roots = document.querySelectorAll('[data-terminal-root]');
  roots.forEach((root) => {
    if (root.terminalAnimation) {
      root.terminalAnimation.destroy();
      root.terminalAnimation = null;
    }
  });

  // Set new token
  currentToken = INIT_TOKEN;
  window[INIT_TOKEN] = currentToken;

  // Initialize new instance
  const root = document.querySelector('[data-terminal-root]');
  if (root) {
    root.terminalAnimation = new TerminalAnimation(root);
  }
}

// Cleanup function for page transitions
function cleanupTerminal() {
  const roots = document.querySelectorAll('[data-terminal-root]');
  roots.forEach((root) => {
    if (root.terminalAnimation) {
      root.terminalAnimation.destroy();
      root.terminalAnimation = null;
    }
  });
  // Clear token so next init creates new instance
  currentToken = null;
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTerminal);
} else {
  initTerminal();
}

// Page transition lifecycle
document.addEventListener('astro:before-swap', cleanupTerminal);
document.addEventListener('astro:page-load', initTerminal);
document.addEventListener('astro:after-swap', initTerminal);

export { initTerminal, cleanupTerminal };