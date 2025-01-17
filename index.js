//Para ejecutar y extraer el critical css poner en consola URL=https://direccion node index.js
const puppeteer = require('puppeteer')
const URL = process.env.URL || 'https://www.mundopsicologos.com'

;(async () => {
  const browser = await puppeteer.launch({headless: true})
  const page = await browser.newPage()

  await page.coverage.startCSSCoverage()
  await page.goto(URL, {waitUntil: 'load'}) // domcontentload, load, networkidle0

  const cssCoverage = await page.coverage.stopCSSCoverage()

  let criticalCSS = ''
  for (const entry of cssCoverage) {
    for (const range of entry.ranges) {
      criticalCSS += entry.text.slice(range.start, range.end) + "\n"
    }
  }
  
  console.log(criticalCSS)

  await page.close()
  await browser.close()
})()
