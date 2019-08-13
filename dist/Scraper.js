"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var puppeteer_1 = __importDefault(require("puppeteer"));
var config_1 = require("./config");
// import { Page } from "puppeteer";
function login() {
    return __awaiter(this, void 0, void 0, function () {
        var loginURL, browser, page, userID_id, password_id, login_id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("login started..");
                    loginURL = "https://myaccount.cableone.net/Login.aspx";
                    return [4 /*yield*/, puppeteer_1.default.launch()];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _a.sent();
                    return [4 /*yield*/, page.goto(loginURL)];
                case 3:
                    _a.sent();
                    userID_id = "ctl00_ContentPlaceHolder4_txtUserName";
                    password_id = "ctl00_ContentPlaceHolder4_txtPassword";
                    return [4 /*yield*/, page.waitForSelector("#" + userID_id)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, page.focus("#" + userID_id)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, page.keyboard.type(config_1.getUser())];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, page.focus("#" + password_id)];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, page.keyboard.type(config_1.getPsw())];
                case 8:
                    _a.sent();
                    //now that we visited page, enter credentials.
                    console.log("user and password entered, waiting for next load...");
                    login_id = "ctl00_ContentPlaceHolder4_btnLogin";
                    return [4 /*yield*/, Promise.all([page.click("#" + login_id), page.waitForNavigation()])];
                case 9:
                    _a.sent();
                    console.log("next page arrived");
                    //
                    //   await page.screenshot({ path: "./example.png" });
                    //   closeBrowser();
                    console.log("login complete with page.");
                    return [2 /*return*/, page];
            }
        });
    });
}
function scrapeUsage() {
    return __awaiter(this, void 0, void 0, function () {
        var loginURL, browser, page, userID_id, password_id, login_id, asof_id, startDate_id, endDate_id, daysRemaining_id, dataPlanTotal_id, dataUsed_id, dataRemaining_id, obj, _a, _b, _c;
        var _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    console.log("login started..");
                    loginURL = "https://myaccount.cableone.net/Login.aspx";
                    return [4 /*yield*/, puppeteer_1.default.launch()];
                case 1:
                    browser = _e.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _e.sent();
                    return [4 /*yield*/, page.goto(loginURL)];
                case 3:
                    _e.sent();
                    userID_id = "ctl00_ContentPlaceHolder4_txtUserName";
                    password_id = "ctl00_ContentPlaceHolder4_txtPassword";
                    return [4 /*yield*/, page.waitForSelector("#" + userID_id)];
                case 4:
                    _e.sent();
                    return [4 /*yield*/, page.focus("#" + userID_id)];
                case 5:
                    _e.sent();
                    return [4 /*yield*/, page.keyboard.type(config_1.getUser())];
                case 6:
                    _e.sent();
                    return [4 /*yield*/, page.focus("#" + password_id)];
                case 7:
                    _e.sent();
                    return [4 /*yield*/, page.keyboard.type(config_1.getPsw())];
                case 8:
                    _e.sent();
                    //now that we visited page, enter credentials.
                    console.log("user and password entered, waiting for next load...");
                    login_id = "ctl00_ContentPlaceHolder4_btnLogin";
                    return [4 /*yield*/, Promise.all([page.click("#" + login_id), page.waitForNavigation()])];
                case 9:
                    _e.sent();
                    console.log("next page arrived");
                    //
                    //   await page.screenshot({ path: "./example.png" });
                    //   closeBrowser();
                    console.log("login complete with page.");
                    asof_id = "ctl00_plhMain_lblAsOFDate";
                    startDate_id = "ctl00_plhMain_lblDataStartTotal";
                    endDate_id = "ctl00_plhMain_lblDataEndTotal";
                    daysRemaining_id = "ctl00_plhMain_lblDaysRemaing";
                    dataPlanTotal_id = "ctl00_plhMain_lblDataguideline";
                    dataUsed_id = "ctl00_plhMain_lblDataUsed";
                    dataRemaining_id = "ctl00_plhMain_lblDataRemaining";
                    obj = {};
                    console.log("SCRAPING\n\n");
                    return [4 /*yield*/, page.waitForSelector("#" + asof_id)];
                case 10:
                    _e.sent();
                    _b = (_a = Promise).all;
                    return [4 /*yield*/, page.$eval("#" + asof_id, function (e) { return e.innerHTML; })];
                case 11:
                    _c = [
                        _e.sent()
                    ];
                    return [4 /*yield*/, page.$eval("#" + startDate_id, function (e) { return e.innerHTML; })];
                case 12:
                    _c = _c.concat([
                        _e.sent()
                    ]);
                    return [4 /*yield*/, page.$eval("#" + endDate_id, function (e) { return e.innerHTML; })];
                case 13:
                    _c = _c.concat([
                        _e.sent()
                    ]);
                    return [4 /*yield*/, page.$eval("#" + daysRemaining_id, function (e) { return e.innerHTML; })];
                case 14:
                    _c = _c.concat([
                        _e.sent()
                    ]);
                    return [4 /*yield*/, page.$eval("#" + dataPlanTotal_id, function (e) { return e.innerHTML; })];
                case 15:
                    _c = _c.concat([
                        _e.sent()
                    ]);
                    return [4 /*yield*/, page.$eval("#" + dataUsed_id, function (e) { return e.innerHTML; })];
                case 16:
                    _c = _c.concat([
                        _e.sent()
                    ]);
                    return [4 /*yield*/, page.$eval("#" + dataRemaining_id, function (e) { return e.innerHTML; })];
                case 17: return [4 /*yield*/, _b.apply(_a, [_c.concat([
                            _e.sent()
                        ])])];
                case 18:
                    _d = _e.sent(), obj.asofDate = _d[0], obj.startDate = _d[1], obj.endDate = _d[2], obj.daysRemaining = _d[3], obj.dataTotal = _d[4], obj.dataUsed = _d[5], obj.dataRemaining = _d[6];
                    console.log("ALL FIELDS READ");
                    console.log(obj);
                    console.log("CLOSING BROWSER");
                    try {
                        page.close();
                        // browser.close();
                    }
                    catch (e) {
                        console.log("some error", e);
                    }
                    //   try {
                    //     closeBrowser();
                    //   } catch (error) {
                    //     console.log("some error closing browser");
                    //   }
                    return [2 /*return*/, obj];
            }
        });
    });
}
function processData(raw) {
    var r = {};
    var asof = raw.asofDate.match(/\d+\/\d+\/\d+/);
    if (asof) {
        r.asofDate = new Date(asof[0]);
    }
    r.from = new Date(raw.startDate);
    r.to = new Date(raw.endDate);
    r.daysLeft = Number.parseInt(raw.daysRemaining);
    var tot = raw.dataTotal.match(/\d+\.?\d+/);
    if (tot) {
        r.totalData = Number.parseFloat(tot[0]);
    }
    var used = raw.dataUsed.match(/\d+\.?\d+/);
    if (used) {
        r.dataUsed = Number.parseFloat(used[0]);
    }
    var left = raw.dataRemaining.match(/\d+\.?\d+/);
    if (left) {
        r.dataLeft = Number.parseFloat(left[0]);
    }
    if (r.dataLeft && r.daysLeft) {
        r.dailyBudget = r.dataLeft / r.daysLeft;
    }
    if (r.asofDate && r.from && r.dataUsed) {
        var total_days = Math.round((r.asofDate.getTime() - r.from.getTime()) / 1000 / 60 / 60 / 24);
        r.averageDailyUsage = r.dataUsed / total_days;
    }
    console.log("\n\nfinal result\n\n", r);
    return r;
}
function scrape() {
    return __awaiter(this, void 0, void 0, function () {
        var result, processed;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, scrapeUsage()];
                case 1:
                    result = _a.sent();
                    console.log("scrape useage complete");
                    processed = processData(result);
                    return [2 /*return*/, processed];
            }
        });
    });
}
exports.scrape = scrape;
//# sourceMappingURL=Scraper.js.map