/**
 * Network Animation - Blue theme, lightweight node-and-line animation
 * Pauses when tab is hidden, respects prefers-reduced-motion
 */

class NetworkAnimation {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.options = {
      nodeCount: options.nodeCount || 40,
      connectionDistance: options.connectionDistance || 180,
      nodeMinSize: options.nodeMinSize || 1.5,
      nodeMaxSize: options.nodeMaxSize || 3.5,
      lineWidth: options.lineWidth || 0.5,
      nodeColor: options.nodeColor || 'rgba(47, 123, 255, 0.6)',
      lineColor: options.lineColor || 'rgba(47, 123, 255, 0.12)',
      hoverColor: options.hoverColor || 'rgba(0, 178, 255, 0.35)',
      speed: options.speed || 0.25,
      ...options,
    };

    this.nodes = [];
    this.mouse = { x: null, y: null, radius: 150 };
    this.animationId = null;
    this.isVisible = true;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
    this.bindEvents();
    this.start();
  }

  init() {
    this.resize();
    this.createNodes();

    // Handle visibility change
    document.addEventListener('visibilitychange', () => {
      this.isVisible = !document.hidden;
      if (this.isVisible) {
        this.start();
      } else {
        this.stop();
      }
    });

    // Handle reduced motion changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', (e) => {
      this.reducedMotion = e.matches;
      if (this.reducedMotion) {
        this.stop();
      } else if (this.isVisible) {
        this.start();
      }
    });
  }

  bindEvents() {
    // Mouse move tracking
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });

    // Touch support
    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const rect = this.canvas.getBoundingClientRect();
      const touch = e.touches[0];
      this.mouse.x = touch.clientX - rect.left;
      this.mouse.y = touch.clientY - rect.top;
    }, { passive: false });

    this.canvas.addEventListener('touchend', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });

    // Resize handling
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => this.resize(), 100);
    });
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;

    this.ctx.scale(dpr, dpr);
    this.width = rect.width;
    this.height = rect.height;

    // Recreate nodes on resize to distribute them properly
    this.createNodes();
  }

  createNodes() {
    this.nodes = [];
    for (let i = 0; i < this.options.nodeCount; i++) {
      this.nodes.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * this.options.speed,
        vy: (Math.random() - 0.5) * this.options.speed,
        size: this.options.nodeMinSize + Math.random() * (this.options.nodeMaxSize - this.options.nodeMinSize),
        baseSize: this.options.nodeMinSize + Math.random() * (this.options.nodeMaxSize - this.options.nodeMinSize),
      });
    }
  }

  start() {
    if (this.reducedMotion) return;
    if (this.animationId) return;

    this.animate();
  }

  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  animate() {
    if (!this.isVisible || this.reducedMotion) {
      this.stop();
      return;
    }

    this.update();
    this.draw();
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  update() {
    for (const node of this.nodes) {
      // Update position
      node.x += node.vx;
      node.y += node.vy;

      // Bounce off edges
      if (node.x <= 0 || node.x >= this.width) {
        node.vx *= -1;
        node.x = Math.max(0, Math.min(this.width, node.x));
      }
      if (node.y <= 0 || node.y >= this.height) {
        node.vy *= -1;
        node.y = Math.max(0, Math.min(this.height, node.y));
      }

      // Mouse interaction - gentle attraction
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = this.mouse.x - node.x;
        const dy = this.mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.mouse.radius && dist > 0) {
          const force = (this.mouse.radius - dist) / this.mouse.radius * 0.02;
          node.vx += (dx / dist) * force;
          node.vy += (dy / dist) * force;
        }
      }

      // Apply velocity damping
      node.vx *= 0.99;
      node.vy *= 0.99;

      // Clamp velocity
      const maxSpeed = this.options.speed * 1.5;
      const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
      if (speed > maxSpeed) {
        node.vx = (node.vx / speed) * maxSpeed;
        node.vy = (node.vy / speed) * maxSpeed;
      }

      // Size pulse based on mouse proximity
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = this.mouse.x - node.x;
        const dy = this.mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.mouse.radius) {
          node.size = node.baseSize * (1 + (this.mouse.radius - dist) / this.mouse.radius * 0.5);
        } else {
          node.size += (node.baseSize - node.size) * 0.1;
        }
      } else {
        node.size += (node.baseSize - node.size) * 0.1;
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw connections first (behind nodes)
    this.drawConnections();

    // Draw nodes
    this.drawNodes();
  }

  drawConnections() {
    const { connectionDistance, lineWidth, lineColor, hoverColor } = this.options;

    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const nodeA = this.nodes[i];
        const nodeB = this.nodes[j];

        const dx = nodeB.x - nodeA.x;
        const dy = nodeB.y - nodeA.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDistance) {
          const opacity = 1 - dist / connectionDistance;

          // Check if either node is near mouse
          let isNearMouse = false;
          if (this.mouse.x !== null && this.mouse.y !== null) {
            const distA = Math.sqrt((this.mouse.x - nodeA.x) ** 2 + (this.mouse.y - nodeA.y) ** 2);
            const distB = Math.sqrt((this.mouse.x - nodeB.x) ** 2 + (this.mouse.y - nodeB.y) ** 2);
            isNearMouse = distA < this.mouse.radius || distB < this.mouse.radius;
          }

          this.ctx.beginPath();
          this.ctx.moveTo(nodeA.x, nodeA.y);
          this.ctx.lineTo(nodeB.x, nodeB.y);
          this.ctx.strokeStyle = isNearMouse
            ? hoverColor.replace('0.35', (opacity * 0.35).toFixed(2))
            : lineColor.replace('0.12', (opacity * 0.12).toFixed(2));
          this.ctx.lineWidth = lineWidth;
          this.ctx.stroke();
        }
      }
    }
  }

  drawNodes() {
    const { nodeColor, hoverColor } = this.options;

    for (const node of this.nodes) {
      let isNearMouse = false;
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dist = Math.sqrt((this.mouse.x - node.x) ** 2 + (this.mouse.y - node.y) ** 2);
        isNearMouse = dist < this.mouse.radius;
      }

      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
      this.ctx.fillStyle = isNearMouse
        ? hoverColor.replace('0.35', '0.6')
        : nodeColor;
      this.ctx.fill();
    }
  }

  destroy() {
    this.stop();
    // Event listeners are automatically cleaned up when page unloads
  }
}

// Auto-initialize on any canvas with data-network-canvas attribute
function initNetworkAnimations() {
  const canvases = document.querySelectorAll('canvas[data-network-canvas]');
  canvases.forEach((canvas) => {
    if (!canvas.networkAnimation) {
      canvas.networkAnimation = new NetworkAnimation(canvas);
    }
  });
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNetworkAnimations);
} else {
  initNetworkAnimations();
}

// Also handle Astro View Transitions - re-initialize after transition
document.addEventListener('astro:after-swap', () => {
  initNetworkAnimations();
});

document.addEventListener('astro:page-load', () => {
  initNetworkAnimations();
});

// Export for manual initialization
window.initNetworkAnimation = initNetworkAnimations;

export { NetworkAnimation };