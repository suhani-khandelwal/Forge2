import puppeteer from 'puppeteer';

export async function scrapeProductReviews(url) {
  let browser;
  try {
    console.log(`  [Scraper] 🌐 Opening browser for: ${url}`);
    
    browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    
    // Stealth: Set realistic headers & User Agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    await page.setExtraHTTPHeaders({ 'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8' });

    // Navigate to the target product/review URL
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });

    // Wait for content (Adjust selectors based on Amazon/Nykaa/Flipkart)
    // We'll use a broad selector to grab common review/description text
    console.log(`  [Scraper] 🔍 Analyzing page content...`);
    
    const results = await page.evaluate(() => {
      // 1. Get Product Name
      const title = document.querySelector('h1')?.innerText || document.title;
      
      // 2. Get Reviews or Description (Targeting common Review/Text containers)
      const reviewSelectors = [
        '.review-text', '.review-content', '#customer_review', 
        '.product-description', '.pdp-details', '#productDescription',
        '[data-hook="review-body"]', '.review-list-item'
      ];
      
      let reviews = [];
      reviewSelectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
          if (el.innerText.length > 20) {
            reviews.push(el.innerText.trim());
          }
        });
      });

      // 3. Fallback: Get all <div>/<span> text over 100 characters if no reviews found
      if (reviews.length === 0) {
        document.querySelectorAll('div, span, p').forEach(el => {
          if (el.innerText.length > 150 && el.children.length < 5) {
            reviews.push(el.innerText.trim());
          }
        });
      }

      return {
        title,
        reviews: reviews.slice(0, 15) // Top 15 signals
      };
    });

    console.log(`  [Scraper] ✅ Processed: "${results.title}"`);
    return results;

  } catch (err) {
    console.error(`  [Scraper] ❌ Failed to scrape ${url}: ${err.message}`);
    throw new Error(`Cloud Scraper Failed: ${err.message}`);
  } finally {
    if (browser) await browser.close();
  }
}
