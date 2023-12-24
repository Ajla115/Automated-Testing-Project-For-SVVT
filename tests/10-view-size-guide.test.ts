import { HomePage } from "../core/page-objects/home-page";
import { Builder, By, WebDriver } from "selenium-webdriver";
import { createDriver, quitDriver } from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";
import { ShoeItemPage } from "../core/page-objects/shoe-item-page";

const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

let driver: WebDriver;
let homePage: HomePage;
let shoeitemPage: ShoeItemPage;

beforeAll(async () => {
    driver = await createDriver(testData.url.home_page);
    homePage = new HomePage(driver);
    shoeitemPage = new ShoeItemPage (driver);
},500000);

test("view size guide", async () => {
    await homePage.acceptAllCookies();
    await homePage.clickOnXButton();
    await homePage.clickOnAShoeItem();
    await shoeitemPage.clickOnASizeGuide();
    await shoeitemPage.verifyOpenedSizeGuide();
},500000);

afterAll(async () => {
    await quitDriver(driver);
},30000);

