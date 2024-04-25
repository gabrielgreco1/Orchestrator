import puppeteer from "puppeteer";
import { config } from "dotenv";

class LinkedInJobsPage {
  constructor(page, browser) {
    this.page = page;
    this.browser = browser
    this.searchInputSelector = "input.jobs-search-box__text-input";
    this.jobsLinkSelector =
      "a.global-nav__primary-link[data-test-app-aware-link][aria-current='page']";
    this.jobsContainerSelector = "ul.scaffold-layout__list-container"; // Seletor do contêiner de vagas
  }

  async open() {
    await this.page.goto("https://br.linkedin.com");
  }

  async login() {
    try {
      await this.page.type("#session_key", "gabrielargreco@gmail.com");
      await this.page.type("#session_password", "Cs>lol123");
      await this.page.click(
        ".btn-md.btn-primary.flex-shrink-0.cursor-pointer.sign-in-form__submit-btn--full-width"
      );
      await new Promise((resolve) => setTimeout(resolve, 20000));
    } catch (err) {
      await this.browser.close();
      // let stack = err.stack
      // err.message = 'Erro ao logar'
      // err.stack = stack
      throw err
      // throw new Error('Erro ao logar automação pausada')
    }
  }

  async getJobsPage() {
    try {
      console.log("Entering jobs page");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await this.page.goto("https://www.linkedin.com/jobs/");
    } catch (err) {
      console.log("Erro ao tentar entrar no link de jobs: ", err);
      console.log("Fechando automação..")
    }
  }

  async inputSearchQuery(term) {
    try {
      await this.page.waitForSelector(this.searchInputSelector, {
        visible: true,
      });
      await this.page.click(this.searchInputSelector, { clickCount: 3 });
      await this.page.type(this.searchInputSelector, term);
      await this.page.keyboard.press("Enter");
      console.log("Search inserted");
    } catch (error) {
      console.error(`Error during search input: ${error}`);
    }
  }

  async scrollJobsContainer() {
    await this.page.evaluate((selector) => {
      const scrollableContainer = document.querySelector(selector);
      if (scrollableContainer) {
        // Rola para o final do contêiner
        scrollableContainer.scrollTop = scrollableContainer.scrollHeight;
      }
    }, this.jobsContainerSelector);
  }

  async getJobsQuantity() {
    try {
      await this.page.waitForSelector(
        "div.jobs-search-results-list__subtitle span",
        { visible: true }
      );
      const resultsText = await this.page.evaluate(
        () =>
          document.querySelector("div.jobs-search-results-list__subtitle span")
            .innerText
      );
      console.log("Quantidade de resultados:", resultsText);
    } catch (error) {
      console.error(`Error retrieving job quantity: ${error}`);
    }
  }

  async scrapeJobs() {
    try {
      await this.page.waitForSelector("ul.scaffold-layout__list-container", {
        visible: true,
      });
      const jobsData = await this.page.evaluate(() => {
        const jobs = [];
        document
          .querySelectorAll("ul.scaffold-layout__list-container > li")
          .forEach((job) => {
            const title = job.querySelector("strong")?.innerText;
            const company = job.querySelector(
              "span.job-card-container__primary-description"
            )?.innerText;
            const location = job.querySelector(
              "li.job-card-container__metadata-item"
            )?.innerText;
            jobs.push({ title, company, location });
          });
        return jobs;
      });

      jobsData.forEach((job) => {
        console.log(`Vaga: ${job.title}`);
        console.log(`Empresa: ${job.company}`);
        console.log(`Localização: ${job.location}\n`);
      });
    } catch (e) {
      console.log("Erro ao screppar jobs: ", e);
    }
  }
}

export default async function run_automation() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const linkedinJobsPage = new LinkedInJobsPage(page, browser);
  await linkedinJobsPage.open();
  await linkedinJobsPage.login();
  await linkedinJobsPage.getJobsPage();
  await linkedinJobsPage.inputSearchQuery('rpa');
  console.log("Scrolling");
  await new Promise((resolve) => setTimeout(resolve, 2000));
  await linkedinJobsPage.scrollJobsContainer();
  console.log("Scrolled");
  await new Promise((resolve) => setTimeout(resolve, 5000));
  await linkedinJobsPage.getJobsQuantity();
  await linkedinJobsPage.scrapeJobs();
  await browser.close();
}
