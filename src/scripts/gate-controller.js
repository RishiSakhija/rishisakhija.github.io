/**
 * Gate Controller - Manages agent-style page transitions
 * Hooks into Astro ClientRouter navigation events
 */

// Import agent mapping from central location
import { AGENT_MAP, AGENT_NUMBERS, getAgentForPath } from '../data/agents';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class GateController {
  constructor() {
    this.overlay = null;
    this.statusEl = null;
    this.statusText = null;
    this.currentAgent = 'ceo';
    this.isAnimating = false;
    this.abortController = null;
    this.targetPath = '/';

    this.init();
  }

  init() {
    this.overlay = document.getElementById('gate-overlay');
    if (!this.overlay) {
      this.createOverlay();
    }

    this.statusEl = document.getElementById('gate-status');
    this.statusText = document.getElementById('gate-status-text');

    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      this.prefersReducedMotion = e.matches;
    });

    this.currentAgent = this.getAgentForPath(window.location.pathname);
    this.updateAgentDisplay();

    this.bindNavigationEvents();
  }

  createOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'gate-overlay';
    overlay.className = 'gate-overlay';
    overlay.setAttribute('role', 'status');
    overlay.setAttribute('aria-live', 'polite');
    overlay.setAttribute('aria-label', 'Page transition');
    overlay.dataset.currentAgent = 'ceo';

    overlay.innerHTML = `
      <div class="gate-panel gate-panel-left" aria-hidden="true">
        <div class="gate-panel-inner">
          <div class="gate-logo-half gate-logo-left" aria-hidden="true">R</div>
        </div>
      </div>
      <div class="gate-panel gate-panel-right" aria-hidden="true">
        <div class="gate-panel-inner">
          <div class="gate-logo-half gate-logo-right" aria-hidden="true">S</div>
        </div>
      </div>
      <div class="gate-seam" aria-hidden="true"></div>
      <div class="gate-agents" aria-hidden="true">
        <div class="gate-agent gate-agent-lead" style="--delay: 0s;"></div>
        <div class="gate-agent" style="--delay: 0.1s;"></div>
        <div class="gate-agent" style="--delay: 0.2s;"></div>
      </div>
      <div id="gate-status" class="gate-status" aria-atomic="true">
        <span id="gate-status-text"></span>
      </div>
    `;

    document.body.appendChild(overlay);
    this.overlay = document.getElementById('gate-overlay');
    this.statusEl = document.getElementById('gate-status');
    this.statusText = document.getElementById('gate-status-text');
  }

  getAgentForPath(path) {
    if (AGENT_MAP[path]) return AGENT_MAP[path];
    if (path.startsWith('/projects/') && path !== '/projects') return 'builder';
    if (path.startsWith('/lab/')) return 'analyst';
    if (path.startsWith('/blog/')) return 'writer';
    return 'agent';
  }

  updateAgentDisplay() {
    if (this.overlay) {
      this.overlay.dataset.currentAgent = this.currentAgent;
    }
  }

  bindNavigationEvents() {
    document.addEventListener('astro:before-preparation', (e) => {
      if (this.prefersReducedMotion) return;

      const targetUrl = e.detail?.url || window.location.href;
      const targetPath = new URL(targetUrl).pathname;
      const targetAgent = this.getAgentForPath(targetPath);

      this.currentAgent = targetAgent;
      this.updateAgentDisplay();
      this.targetPath = targetPath;

      this.showOverlay(targetPath);

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

    document.addEventListener('astro:after-swap', () => {
      if (this.prefersReducedMotion) return;
      this.showStatus('ready');
      setTimeout(() => this.hideOverlay(), 500);
    });

    document.addEventListener('astro:page-load', () => {
      this.onPageLoad();
    });
  }

  createOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'gate-overlay';
    overlay.className = 'gate-overlay';
    overlay.setAttribute('role', 'status');
    overlay.setAttribute('aria-live', 'polite');
    overlay.setAttribute('aria-label', 'Page transition');
    overlay.dataset.currentAgent = 'ceo';

    overlay.innerHTML = `
      <div class="gate-panel gate-panel-left" aria-hidden="true">
        <div class="gate-panel-inner">
          <div class="gate-logo-half gate-logo-left" aria-hidden="true">R</div>
        </div>
      </div>
      <div class="gate-panel gate-panel-right" aria-hidden="true">
        <div class="gate-panel-inner">
          <div class="gate-logo-half gate-logo-right" aria-hidden="true">S</div>
        </div>
      </div>
      <div class="gate-seam" aria-hidden="true"></div>
      <div class="gate-agents" aria-hidden="true">
        <div class="gate-agent gate-agent-lead" style="--delay: 0s;"></div>
        <div class="gate-agent" style="--delay: 0.1s;"></div>
        <div class="gate-agent" style="--delay: 0.2s;"></div>
      </div>
      <div id="gate-status" class="gate-status" aria-atomic="true">
        <span id="gate-status-text"></span>
      </div>
    `;

    document.body.appendChild(overlay);
    this.overlay = document.getElementById('gate-overlay');
    this.statusEl = document.getElementById('gate-status');
    this.statusText = document.getElementById('gate-status-text');
  }

  getAgentForPath(path) {
    if (AGENT_MAP[path]) return AGENT_MAP[path];
    if (path.startsWith('/projects/') && path !== '/projects') return 'builder';
    if (path.startsWith('/lab/')) return 'analyst';
    if (path.startsWith('/blog/')) return 'writer';
    return 'agent';
  }

  async runTransitionAnimation() {
    if (!this.overlay) return;

    this.overlay.classList.add('active');
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
    this.statusText.textContent = `${this.currentAgent}_${AGENT_NUMBERS[this.currentAgent] || '00'} -> ${message}`;
    this.statusEl.classList.remove('hidden');
    this.statusEl.classList.add('visible');

    this.statusEl.offsetHeight;
  }

  hideStatus() {
    if (!this.statusEl) return;
    this.statusEl.classList.remove('visible');
    this.statusEl.classList.add('hidden');
  }

  onPageLoad() {
    if (typeof window.initTerminal === 'function') window.initTerminal();
    if (typeof window.initNetworkAnimation === 'function') window.initNetworkAnimation();
    if (typeof window.initTicker === 'function') window.initTicker();

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

    this.currentAgent = this.getAgentForPath(window.location.pathname);
    this.updateAgentDisplay();
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Agent mapping - imported from central location
import { AGENT_MAP, AGENT_NUMBERS, getAgentForPath } from '../data/agents';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class GateController {
  constructor() {
    this.overlay = null;
    this.statusEl = null;
    this.statusText = null;
    this.currentAgent = 'ceo';
    this.isAnimating = false;
    this.abortController = null;
    this.targetPath = '/';

    this.init();
  }

  init() {
    this.overlay = document.getElementById('gate-overlay');
    if (!this.overlay) {
      this.createOverlay();
    }

    this.statusEl = document.getElementById('gate-status');
    this.statusText = document.getElementById('gate-status-text');

    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      this.prefersReducedMotion = e.matches;
    });

    this.currentAgent = this.getAgentForPath(window.location.pathname);
    this.updateAgentDisplay();

    this.bindNavigationEvents();
  }

  createOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'gate-overlay';
    overlay.className = 'gate-overlay';
    overlay.setAttribute('role', 'status');
    overlay.setAttribute('aria-live', 'polite');
    overlay.setAttribute('aria-label', 'Page transition');
    overlay.dataset.currentAgent = 'ceo';

    overlay.innerHTML = `
      <div class="gate-panel gate-panel-left" aria-hidden="true">
        <div class="gate-panel-inner">
          <div class="gate-logo-half gate-logo-left" aria-hidden="true">R</div>
        </div>
      </div>
      <div class="gate-panel gate-panel-right" aria-hidden="true">
        <div class="gate-panel-inner">
          <div class="gate-logo-half gate-logo-right" aria-hidden="true">S</div>
        </div>
      </div>
      <div class="gate-seam" aria-hidden="true"></div>
      <div class="gate-agents" aria-hidden="true">
        <div class="gate-agent gate-agent-lead" style="--delay: 0s;"></div>
        <div class="gate-agent" style="--delay: 0.1s;"></div>
        <div class="gate-agent" style="--delay: 0.2s;"></div>
      </div>
      <div id="gate-status" class="gate-status" aria-atomic="true">
        <span id="gate-status-text"></span>
      </div>
    `;

    document.body.appendChild(overlay);
    this.overlay = document.getElementById('gate-overlay');
    this.statusEl = document.getElementById('gate-status');
    this.statusText = document.getElementById('gate-status-text');
  }

  getAgentForPath(path) {
    if (AGENT_MAP[path]) return AGENT_MAP[path];
    if (path.startsWith('/projects/') && path !== '/projects') return 'builder';
    if (path.startsWith('/lab/')) return 'analyst';
    if (path.startsWith('/blog/')) return 'writer';
    return 'agent';
  }

  async runTransitionAnimation() {
    if (!this.overlay) return;

    this.overlay.classList.add('active');
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

    this.statusEl.offsetHeight;
  }

  hideStatus() {
    if (!this.statusEl) return;
    this.statusEl.classList.remove('visible');
    this.statusEl.classList.add('hidden');
  }

  onPageLoad() {
    if (typeof window.initTerminal === 'function') window.initTerminal();
    if (typeof window.initNetworkAnimation === 'function') window.initNetworkAnimation();
    if (typeof window.initTicker === 'function') window.initTicker();

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

    this.currentAgent = this.getAgentForPath(window.location.pathname);
    this.updateAgentDisplay();
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const AGENT_MAP = {
  '/': 'ceo',
  '/projects': 'builder',
  '/lab': 'analyst',
  '/about': 'archivist',
  '/contact': 'courier',
};

const AGENT_NUMBERS = {
  ceo: '01',
  builder: '02',
  analyst: '03',
  writer: '04',
  archivist: '05',
  courier: '06',
};

let gateController = null;

function initGateController() {
  if (!gateController) {
    gateController = new GateController();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initGateController());
} else {
  initGateController();
}

document.addEventListener('astro:page-load', () => initGateController());
document.addEventListener('astro:after-swap', () => initGateController());

window.gateController = gateController;
window.initGateController = () => initGateController();

export { GateController, initGateController, getAgentForPath, sleep };