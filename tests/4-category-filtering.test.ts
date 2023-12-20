import { HomePage } from "../core/page-objects/home-page";
import { Builder, By, WebDriver } from "selenium-webdriver";
import { createDriver, quitDriver } from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";
import { SneakersPage } from "../core/page-objects/sneakers-page";

const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

let driver: WebDriver;
let homePage: HomePage;
let sneakersPage: SneakersPage;

beforeAll(async () => {
    driver = await createDriver(testData.url.home_page);
    homePage = new HomePage(driver);
    sneakersPage = new SneakersPage(driver);
    
},10000);

test("category filtering", async () => {
    await homePage.acceptAllCookies();
    await homePage.clickOnXButton();
    await homePage.hoverOverWomenMenu();
    await homePage.chooseMenuItem();
    await sneakersPage.clickOnPriceButton();
    await sneakersPage.chooseOnePriceOption();
    await sneakersPage.clickToClosePriceFilter();
    await sneakersPage.clickToSeeAllOptions();
    //await sneakersPage.checkPricesInRange();
    await sneakersPage.verifyFiltration();

},1000000);

afterAll(async () => {
    await quitDriver(driver);
},30000);

