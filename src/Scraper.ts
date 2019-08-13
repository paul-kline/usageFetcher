import puppeteer, { Browser, Page } from "puppeteer";
import { fetcher } from "./Utils";
import { getPsw, getUser } from "./config";
// import { Page } from "puppeteer";

async function login() {
  console.log("login started..");
  //get login page:
  const loginURL = "https://myaccount.cableone.net/Login.aspx";
  //   const page = await fetcher(loginURL);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(loginURL);

  //make sure the element we care about has loaded:
  const userID_id = "ctl00_ContentPlaceHolder4_txtUserName";
  const password_id = "ctl00_ContentPlaceHolder4_txtPassword";
  await page.waitForSelector("#" + userID_id);

  await page.focus("#" + userID_id);
  await page.keyboard.type(getUser());
  await page.focus("#" + password_id);
  await page.keyboard.type(getPsw());
  //now that we visited page, enter credentials.
  console.log("user and password entered, waiting for next load...");
  const login_id = "ctl00_ContentPlaceHolder4_btnLogin";
  await Promise.all([page.click("#" + login_id), page.waitForNavigation()]);
  console.log("next page arrived");
  //
  //   await page.screenshot({ path: "./example.png" });
  //   closeBrowser();
  console.log("login complete with page.");
  return page;
}

interface Usage {
  asofDate: string;
  startDate: string;
  endDate: string;
  daysRemaining: string;
  dataTotal: string;
  dataUsed: string;
  dataRemaining: string;
}
async function scrapeUsage(): Promise<Usage> {
  console.log("login started..");
  //get login page:
  const loginURL = "https://myaccount.cableone.net/Login.aspx";
  //   const page = await fetcher(loginURL);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(loginURL);

  //make sure the element we care about has loaded:
  const userID_id = "ctl00_ContentPlaceHolder4_txtUserName";
  const password_id = "ctl00_ContentPlaceHolder4_txtPassword";
  await page.waitForSelector("#" + userID_id);

  await page.focus("#" + userID_id);
  await page.keyboard.type(getUser());
  await page.focus("#" + password_id);
  await page.keyboard.type(getPsw());
  //now that we visited page, enter credentials.
  console.log("user and password entered, waiting for next load...");
  const login_id = "ctl00_ContentPlaceHolder4_btnLogin";
  await Promise.all([page.click("#" + login_id), page.waitForNavigation()]);
  console.log("next page arrived");
  //
  //   await page.screenshot({ path: "./example.png" });
  //   closeBrowser();
  console.log("login complete with page.");

  //NEXT PAGE

  //Usage overview as of x/x/xxxx id
  const asof_id = "ctl00_plhMain_lblAsOFDate";
  const startDate_id = "ctl00_plhMain_lblDataStartTotal";
  const endDate_id = "ctl00_plhMain_lblDataEndTotal";
  const daysRemaining_id = "ctl00_plhMain_lblDaysRemaing";
  const dataPlanTotal_id = "ctl00_plhMain_lblDataguideline";
  const dataUsed_id = "ctl00_plhMain_lblDataUsed";
  const dataRemaining_id = "ctl00_plhMain_lblDataRemaining";
  //   const f = page.$eval;
  const obj: any = {};
  console.log("SCRAPING\n\n");
  await page.waitForSelector("#" + asof_id);

  [
    obj.asofDate,
    obj.startDate,
    obj.endDate,
    obj.daysRemaining,
    obj.dataTotal,
    obj.dataUsed,
    obj.dataRemaining
  ] = await Promise.all([
    await page.$eval("#" + asof_id, e => e.innerHTML),
    await page.$eval("#" + startDate_id, e => e.innerHTML),
    await page.$eval("#" + endDate_id, e => e.innerHTML),
    await page.$eval("#" + daysRemaining_id, e => e.innerHTML),
    await page.$eval("#" + dataPlanTotal_id, e => e.innerHTML),
    await page.$eval("#" + dataUsed_id, e => e.innerHTML),
    await page.$eval("#" + dataRemaining_id, e => e.innerHTML)
  ]);
  console.log("ALL FIELDS READ");
  console.log(obj);
  console.log("CLOSING BROWSER");
  try {
    page.close();
    // browser.close();
  } catch (e) {
    console.log("some error", e);
  }

  //   try {
  //     closeBrowser();
  //   } catch (error) {
  //     console.log("some error closing browser");
  //   }
  return obj as Usage;
}

interface Processed {
  from?: Date;
  to?: Date;
  asof?: Date;
  daysLeft?: number;
  totalData?: number;
  dataUsed?: number;
  dataLeft?: number;
  averageDailyUsage?: number;
  dailyBudget?: number;
}
function processData(raw: Usage): Processed {
  const r: any = {};
  const asof = raw.asofDate.match(/\d+\/\d+\/\d+/);
  if (asof) {
    r.asofDate = new Date(asof[0]);
  }

  r.from = new Date(raw.startDate);
  r.to = new Date(raw.endDate);
  r.daysLeft = Number.parseInt(raw.daysRemaining);
  const tot = raw.dataTotal.match(/\d+\.?\d+/);
  if (tot) {
    r.totalData = Number.parseFloat(tot[0]);
  }

  const used = raw.dataUsed.match(/\d+\.?\d+/);
  if (used) {
    r.dataUsed = Number.parseFloat(used[0]);
  }

  const left = raw.dataRemaining.match(/\d+\.?\d+/);
  if (left) {
    r.dataLeft = Number.parseFloat(left[0]);
  }

  if (r.dataLeft && r.daysLeft) {
    r.dailyBudget = r.dataLeft / r.daysLeft;
  }
  if (r.asofDate && r.from && r.dataUsed) {
    const total_days = Math.round((r.asofDate.getTime() - r.from.getTime()) / 1000 / 60 / 60 / 24);
    r.averageDailyUsage = r.dataUsed / total_days;
  }

  console.log("\n\nfinal result\n\n", r);
  return r as Processed;
}
export async function scrape(): Promise<Processed | null> {
  //   const page = await login().catch(e => {
  //     console.log("LOGIN FUNCTION ERROR");
  //     return { error: e };
  //   });
  //   if ((page as any).error) {
  //     // console.log("page error!!!!", page);
  //     // return null;
  //   }
  //   const result = await scrapeUsage(page as Page);
  const result = await scrapeUsage();
  console.log("scrape useage complete");
  const processed = processData(result);
  return processed;
}
