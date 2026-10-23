/**
 * Transition Controller - Manages agent-style page transitions
 * Handles sweep line, agent nodes, and status chip
 */

class TransitionController {
  constructor() {
    this.overlay = document.getElementById('transition-overlay');
    this.statusEl = document.getElementById('transition-status');
    this.statusText = document.getElementById('transition-status-text');
    this.currentAgent = this.overlay?.dataset.currentAgent || 'supervisor';
    this.isAnimating = false;
    this.animationPromise = null;
    this.abortController = null;

    this.init();
  }

  init() {
    if (!this.overlay) return;

    // Listen for Astro View Transition events
    document.addEventListener('astro:before-preparation', (e) => this.onBeforePreparation(e));
    document.addEventListener('astro:before-swap', (e) => this.onBeforeSwap(e));
    document.addEventListener('astro:after-swap', (e) => this.onAfterSwap(e));
    document.addEventListener('astro:page-load', (e) => this.onPageLoad(e));

    // Handle reduced motion
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      this.prefersReducedMotion = e.matches;
    });

    // Update agent on initial load
    this.currentAgent = this.getAgentForPath(window.location.pathname);
    this.overlay.dataset.currentAgent = this.currentAgent;
  }

  onBeforePreparation(e) {
    if (this.prefersReducedMotion) return;

    const targetUrl = e.detail?.url || window.location.href;
    const targetPath = new URL(targetUrl).pathname;
    const targetAgent = this.getAgentForPath(targetPath);

    this.startTransition(targetAgent, targetPath);
  }

  onBeforeSwap(e) {
    if (this.prefersReducedMotion) return;
    // Sweep line and nodes are handled by CSS animation triggered by .active class
  }

  onAfterSwap(e) {
    if (this.prefersReducedMotion) return;
    this.showStatus('ready', this.currentAgent);
    setTimeout(() => this.hideStatus(), 600);
  }

  onPageLoad(e) {
    if (this.prefersReducedMotion) return;
    this.completeTransition();
  }

  getAgentForPath(path) {
    const agents = {
      '/': 'supervisor',
      '/projects': 'builder',
      '/research': 'analyst',
      '/blog': 'writer',
      '/about': 'archivist',
      '/stack': 'engineer',
      '/contact': 'courier',
    };

    // Exact match first
    if (agents[path]) return agents[path];

    // Dynamic routes
    if (path.startsWith('/projects/') && path !== '/projects') {
      return 'builder';
    }
    if (path.startsWith('/blog/')) return 'writer';
    if (path.startsWith('/research/')) return 'analyst';

    return 'agent';
  }

  async startTransition(targetAgent, targetPath) {
    if (this.isAnimating) {
      // Cancel previous animation
      this.abortController?.abort();
    }

    this.isAnimating = true;
    this.abortController = new AbortController();

    // Update current agent
    this.currentAgent = targetAgent;
    this.overlay.dataset.currentAgent = targetAgent;

    // Show status chip
    this.showStatus(`routing to ${targetPath}`, targetAgent);

    // Activate overlay (triggers CSS animations)
    this.overlay.classList.add('active');

    // Wait for animation to complete or be aborted
    this.animationPromise = new Promise((resolve) => {
      const cleanup = () => {
        this.overlay.classList.remove('active');
        this.hideStatus();
        this.isAnimating = false;
        resolve();
      };

      // Animation duration ~800ms, give it some buffer
      const timeout = setTimeout(cleanup, 900);

      this.abortController.signal.addEventListener('abort', () => {
        clearTimeout(timeout);
        cleanup();
      });
    });

    return this.animationPromise;
  }

  async completeTransition() {
    if (this.animationPromise) {
      await this.animationPromise;
    }
    this.isAnimating = false;
  }

  showStatus(message, agent) {
    if (!this.statusEl || !this.statusText) return;

    const agentNumber = this.getAgentNumber(agent);
    this.statusText.textContent = `${agent}_${agentNumber} -> ${message}`;
    this.statusEl.classList.remove('hidden');
    this.statusEl.classList.add('visible');

    // Force reflow for animation
    this.statusEl.offsetHeight;
  }

  hideStatus() {
    if (!this.statusEl) return;
    this.statusEl.classList.remove('visible');
    this.statusEl.classList.add('hidden');
  }

  getAgentNumber(agent) {
    const numbers = {
      supervisor: '01',
      builder: '02',
      analyst: '03',
      writer: '04',
      archivist: '05',
      engineer: '06',
      courier: '07',
    };
    return numbers[agent] || '00';
  }
}

// Initialize transition controller
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

// Re-initialize on Astro View Transitions
document.addEventListener('astro:page-load', initTransitionController);
document.addEventListener('astro:after-swap', initTransitionController);

// Export for debugging
window.transitionController = transitionController;