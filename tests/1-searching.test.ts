import { HomePage } from "../core/page-objects/home-page";
import { Builder, By, WebDriver } from "selenium-webdriver";
import { createDriver, quitDriver } from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";
import { PinkShoesPage } from "../core/page-objects/pink-shoes-page";

const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

let driver: WebDriver;
let homePage: HomePage;
let pinkshoesPage : PinkShoesPage;

beforeAll(async () => {
    driver = await createDriver(testData.url.home_page);
    homePage = new HomePage(driver);
    pinkshoesPage = new PinkShoesPage(driver);

},30000);

test("search bar", async () => {
    await homePage.acceptAllCookies();
    await homePage.clickOnXButton();
    await homePage.clickOnSearchBar();
    await homePage.enterItemToSearchFor();
    await homePage.startSearch();
    await pinkshoesPage.verifySearchPage(); 
},500000);

afterAll(async () => {
    await quitDriver(driver);
},30000);


