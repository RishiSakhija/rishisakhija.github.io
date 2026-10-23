/**
 * Terminal Animation - Typing/erasing effect with cursor
 * Pauses when tab hidden or off-screen, respects prefers-reduced-motion
 */

// Terminal Animation Controller
class TerminalAnimation {
  constructor(root) {
    this.root = root;
    this.animated = root?.querySelector('[data-terminal-animated]');
    this.static = root?.querySelector('[data-terminal-static]');
    this.body = root?.querySelector('[data-terminal-body]');
    this.script = window.TERMINAL_SCRIPT_INJECTED || [];
    this.config = window.TERMINAL_CONFIG_INJECTED || {
      typeSpeedMin: 35,
      typeSpeedMax: 50,
      eraseSpeed: 20,
      pauseAfterLine: 1400,
      pauseBeforeErase: 800,
    };

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

    this.init();
  }

  init() {
    if (!this.root || !this.body) return;

    // Check reduced motion preference
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (this.prefersReducedMotion) {
      this.showStatic();
      return;
    }

    // Set up Intersection Observer to pause when off-screen
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.resume();
          } else {
            this.pause();
          }
        });
      },
      { rootMargin: '100px' }
    );

    this.observer.observe(this.root);

    // Pause when tab is hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pause();
      } else {
        this.resume();
      }
    });

    // Start animation
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
    if (this.isErasing) {
      this.eraseCurrentLine();
    } else if (this.isTyping) {
      this.typeCurrentLine();
    } else {
      this.typeNextLine();
    }
  }

  async typeNextLine() {
    if (this.isPaused) return;
    if (this.currentLineIndex >= this.script.length) {
      this.currentLineIndex = 0; // Loop
    }

    const lineData = this.script[this.currentLineIndex];
    await this.typeLine(lineData);

    if (!this.isPaused) {
      await this.wait(this.config.pauseAfterLine);
    }

    if (!this.isPaused) {
      await this.wait(this.config.pauseBeforeErase);
    }

    if (!this.isPaused) {
      await this.eraseLine();
    }

    if (!this.isPaused) {
      this.currentLineIndex++;
      this.typeNextLine();
    }
  }

  typeLine(lineData) {
    return new Promise((resolve) => {
      this.isTyping = true;

      // Create line element
      this.lineElement = document.createElement('div');
      this.lineElement.className = 'terminal-line';
      this.lineElement.dataset.lineIndex = this.currentLineIndex;

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

      // Add cursor
      this.cursorElement = document.createElement('span');
      this.cursorElement.className = 'terminal-cursor';
      this.lineElement.appendChild(this.cursorElement);

      this.body.appendChild(this.lineElement);

      // Scroll to bottom
      this.body.scrollTop = this.body.scrollHeight;

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
      this.contentElement.textContent = fullText.slice(0, this.currentCharIndex);
      this.currentCharIndex++;

      // Randomize typing speed slightly
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
          this.contentElement.textContent = fullText.slice(0, this.currentCharIndex);
          this.currentCharIndex--;
          this.timeoutId = setTimeout(doErase, this.config.eraseSpeed);
        } else {
          // Remove line element
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
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}

// Global init function for re-initialization after view transitions
window.initTerminal = function() {
  // Find all terminal roots
  const terminals = document.querySelectorAll('[data-terminal-root]');
  terminals.forEach((root) => {
    // Clean up any existing instance
    if (root.terminalAnimation) {
      root.terminalAnimation.destroy();
    }
    root.terminalAnimation = new TerminalAnimation(root);
  });
};

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', window.initTerminal);
} else {
  window.initTerminal();
}

// Re-initialize on Astro View Transitions
document.addEventListener('astro:page-load', window.initTerminal);
document.addEventListener('astro:after-swap', window.initTerminal);

export { TerminalAnimation };