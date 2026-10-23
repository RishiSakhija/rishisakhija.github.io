/**
 * Transition Controller - Manages agent-style page transitions
 * Hooks into Astro ClientRouter navigation events
 */

const AGENT_MAP = {
  '/': 'supervisor',
  '/projects': 'builder',
  '/research': 'analyst',
  '/blog': 'writer',
  '/about': 'archivist',
  '/stack': 'engineer',
  '/contact': 'courier',
};

const AGENT_NUMBERS = {
  supervisor: '01',
  builder: '02',
  analyst: '03',
  writer: '04',
  archivist: '05',
  engineer: '06',
  courier: '07',
};

function getAgentForPath(path) {
  // Exact match
  if (AGENT_MAP[path]) return AGENT_MAP[path];

  // Dynamic routes
  if (path.startsWith('/projects/') && path !== '/projects') return 'builder';
  if (path.startsWith('/blog/')) return 'writer';
  if (path.startsWith('/research/')) return 'analyst';

  return 'agent';
}

function getAgentNumber(agent) {
  return AGENT_NUMBERS[agent] || '00';
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class TransitionController {
  constructor() {
    this.overlay = null;
    this.statusEl = null;
    this.statusText = null;
    this.currentAgent = 'supervisor';
    this.isAnimating = false;
    this.abortController = null;
    this.prefersReducedMotion = false;

    this.init();
  }

  init() {
    // Create overlay if it doesn't exist (astro:transitions may have created it)
    this.overlay = document.getElementById('transition-overlay');
    if (!this.overlay) {
      this.createOverlay();
    }

    this.statusEl = document.getElementById('transition-status');
    this.statusText = document.getElementById('transition-status-text');

    // Handle reduced motion
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      this.prefersReducedMotion = e.matches;
    });

    // Initial agent
    this.currentAgent = this.getAgentForPath(window.location.pathname);
    this.updateAgentDisplay();

    // Hook into Astro navigation events
    this.bindNavigationEvents();

    // Re-initialize components on page load
    document.addEventListener('astro:page-load', () => this.onPageLoad());
    document.addEventListener('astro:after-swap', () => this.onAfterSwap());
  }

  bindNavigationEvents() {
    // before-preparation: wrap the loader to show overlay during navigation
    document.addEventListener('astro:before-preparation', (e) => {
      if (this.prefersReducedMotion) return;

      const targetUrl = e.detail?.url || window.location.href;
      const targetPath = new URL(targetUrl).pathname;
      const targetAgent = this.getAgentForPath(targetPath);

      this.currentAgent = targetAgent;
      this.updateAgentDisplay();

      // Show overlay and status immediately
      this.showOverlay(targetPath);

      // Wrap the loader to keep overlay visible during navigation
      const originalLoader = e.detail?.loader;
      if (originalLoader) {
        e.detail.loader = async () => {
          await Promise.all([
            originalLoader(),
            this.runTransitionAnimation()
          ]);
        };
      }
    });

    // after-swap: play the "reveal" half
    document.addEventListener('astro:after-swap', () => {
      if (this.prefersReducedMotion) return;
      this.showStatus('ready');
      setTimeout(() => this.hideOverlay(), 500);
    });

    // page-load: re-initialize all components
    document.addEventListener('astro:page-load', () => {
      this.onPageLoad();
    });
  }

  createOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'transition-overlay';
    overlay.className = 'transition-overlay';
    overlay.setAttribute('role', 'status');
    overlay.setAttribute('aria-live', 'polite');
    overlay.setAttribute('aria-label', 'Page transition');
    overlay.dataset.currentAgent = 'supervisor';

    overlay.innerHTML = `
      <!-- Dark overlay background -->
      <div class="transition-bg" aria-hidden="true"></div>

      <!-- Diagonal sweep line with red leading edge -->
      <svg class="transition-sweep" viewBox="0 0 100 100" aria-hidden="true" preserveAspectRatio="none">
        <defs>
          <linearGradient id="sweep-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="var(--blue)"/>
            <stop offset="50%" stop-color="var(--blue-glow)"/>
            <stop offset="100%" stop-color="var(--blue)"/>
          </linearGradient>
        </defs>
        <!-- Sweep line -->
        <line class="sweep-line" x1="0" y1="100" x2="100" y2="0" stroke="url(#sweep-gradient)" stroke-width="4" stroke-linecap="round"/>
        <!-- Red leading edge -->
        <circle class="sweep-edge" cx="0" cy="100" r="6" fill="var(--red)">
          <animate attributeName="cx" from="0" to="100" dur="0.8s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1"/>
          <animate attributeName="cy" from="100" to="0" dur="0.8s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1"/>
        </circle>
      </svg>

      <!-- Agent nodes traveling along sweep -->
      <div class="transition-nodes" aria-hidden="true">
        <div class="transition-node" style="--delay: 0.1s;"></div>
        <div class="transition-node" style="--delay: 0.2s;"></div>
        <div class="transition-node" style="--delay: 0.3s;"></div>
        <div class="transition-node" style="--delay: 0.4s;"></div>
        <div class="transition-node" style="--delay: 0.5s;"></div>
        <div class="transition-node" style="--delay: 0.6s;"></div>
      </div>

      <!-- Status chip -->
      <div id="transition-status" class="transition-status" aria-atomic="true">
        <span id="transition-status-text"></span>
      </div>
    `;

    document.body.appendChild(overlay);
    this.overlay = document.getElementById('transition-overlay');
    this.statusEl = document.getElementById('transition-status');
    this.statusText = document.getElementById('transition-status-text');
  }

  getAgentForPath(path) {
    if (AGENT_MAP[path]) return AGENT_MAP[path];

    if (path.startsWith('/projects/') && path !== '/projects') return 'builder';
    if (path.startsWith('/blog/')) return 'writer';
    if (path.startsWith('/research/')) return 'analyst';

    return 'agent';
  }

  updateAgentDisplay() {
    if (this.overlay) {
      this.overlay.dataset.currentAgent = this.currentAgent;
    }
  }

  async runTransitionAnimation() {
    if (!this.overlay) return;

    this.overlay.classList.add('active');

    // Wait for the sweep animation (~800ms) plus a small buffer
    await sleep(900);

    this.overlay.classList.remove('active');
  }

  showOverlay(targetPath) {
    if (!this.overlay) return;

    this.showStatus(`routing to ${targetPath}`);
    this.overlay.classList.add('active');
  }

  hideOverlay() {
    if (!this.overlay) return;
    this.overlay.classList.remove('active');
    this.hideStatus();
  }

  showStatus(message) {
    if (!this.statusEl || !this.statusText) return;

    const agentNumber = AGENT_NUMBERS[this.currentAgent] || '00';
    this.statusText.textContent = `${this.currentAgent}_${agentNumber} -> ${message}`;
    this.statusEl.classList.remove('hidden');
    this.statusEl.classList.add('visible');

    // Force reflow
    this.statusEl.offsetHeight;
  }

  hideStatus() {
    if (!this.statusEl) return;
    this.statusEl.classList.remove('visible');
    this.statusEl.classList.add('hidden');
  }

  onPageLoad() {
    // Re-initialize all dynamic components
    if (typeof window.initTerminal === 'function') {
      window.initTerminal();
    }
    if (typeof window.initNetworkAnimation === 'function') {
      window.initNetworkAnimation();
    }

    // Re-initialize scroll reveals
    const revealElements = document.querySelectorAll('.reveal:not(.visible)');
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    revealElements.forEach((el) => revealObserver.observe(el));

    // Update agent for current page
    this.currentAgent = this.getAgentForPath(window.location.pathname);
    this.updateAgentDisplay();
  }

  onAfterSwap() {
    // Clean up any running animations from the old page
    // The overlay will be hidden by the hideOverlay call in after-swap
  }
}

// Initialize
let transitionController = null;

function initTransitionController() {
  if (!transitionController) {
    transitionController = new TransitionController();
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTransitionController);
} else {
  initTransitionController();
}

// Re-initialize on page load (for view transitions)
document.addEventListener('astro:page-load', initTransitionController);
document.addEventListener('astro:after-swap', initTransitionController);

// Export for debugging
window.transitionController = transitionController;
window.initTransitionController = initTransitionController;