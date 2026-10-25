import { test, expect } from '@playwright/test';

test('screenshots at 1440px and 390px', async ({ page }) => {
  // Test at 1440px
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:4321');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'screenshots/home-1440.png', fullPage: true });

  // Check terminal has typed text
  const terminalLines = await page.locator('.terminal-line').count();
  const terminalCursors = await page.locator('.terminal-cursor').count();
  console.log('Terminal lines:', terminalLines);
  console.log('Terminal cursors:', terminalCursors);

  // Check CTA buttons
  const viewProjectsBtn = await page.locator('a:has-text("View Projects")').first();
  const getInTouchBtn = await page.locator('a:has-text("Get in Touch")').first();
  console.log('View Projects visible:', await viewProjectsBtn.isVisible());
  console.log('Get in Touch visible:', await getInTouchBtn.isVisible());

  // Check for duplicate name
  const heroStatusText = await page.locator('.hero-status').textContent();
  console.log('Hero status text:', heroStatusText);

  // Check red status dot
  const redDot = await page.locator('.status-dot, .red-dot').first();
  console.log('Red dot exists:', await redDot.count());

  // Check project tech tags
  const projectCards = await page.locator('.card').all();
  for (const card of projectCards) {
    const title = await card.locator('.card-title').textContent();
    const tags = await card.locator('.chip').allTextContents();
    console.log(`Project: ${title}, Tags: ${tags.join(', ')}`);
  }

  // Check footer - use the main footer with role="contentinfo"
  const footerText = await page.locator('footer[role="contentinfo"]').textContent();
  console.log('Footer contains 2026:', footerText.includes('2026'));
  console.log('Footer contains email:', footerText.includes('rishisakhija7@gmail.com'));

  // Now test at 390px
  await page.setViewportSize({ width: 390, height: 800 });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/home-390.png', fullPage: true });

  // Check CTA buttons at mobile
  console.log('Mobile - View Projects visible:', await viewProjectsBtn.isVisible());
  console.log('Mobile - Get in Touch visible:', await getInTouchBtn.isVisible());

  // Navigate to /about and check transition
  await page.goto('http://127.0.0.1:4321/about');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/about-1440.png', fullPage: true });

  // Go back to home
  await page.goto('http://127.0.0.1:4321');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/home-after-nav-1440.png', fullPage: true });

  // Check terminal still works after navigation
  const terminalLinesAfter = await page.locator('.terminal-line').count();
  const terminalCursorsAfter = await page.locator('.terminal-cursor').count();
  console.log('Terminal lines after nav:', terminalLinesAfter);
  console.log('Terminal cursors after nav:', terminalCursorsAfter);
});

test('transition test - capture frames', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:4321/about');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

  // Start recording navigation to contact
  const contactLink = page.locator('a[href="/contact"]').first();
  
  // Capture frames at different intervals
  const startTime = Date.now();
  await contactLink.click();
  
  // Capture at ~200ms
  await page.waitForTimeout(200);
  await page.screenshot({ path: 'screenshots/transition-200ms.png', fullPage: true });
  
  await page.waitForTimeout(300); // 500ms total
  await page.screenshot({ path: 'screenshots/transition-500ms.png', fullPage: true });
  
  await page.waitForTimeout(300); // 800ms total
  await page.screenshot({ path: 'screenshots/transition-800ms.png', fullPage: true });
  
  await page.waitForTimeout(400); // 1200ms total
  await page.screenshot({ path: 'screenshots/transition-1200ms.png', fullPage: true });
  
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'screenshots/contact-final.png', fullPage: true });
});