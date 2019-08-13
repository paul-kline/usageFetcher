import puppeteer, { Browser, Page } from "puppeteer";
// import {puppeteer, Browser, Page } from "puppeteer";

import axios, { AxiosRequestConfig, AxiosPromise } from "axios";

export async function fetcher(url: string): Promise<Page> {
  //   const brows = await browserReady;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  return page;
}
