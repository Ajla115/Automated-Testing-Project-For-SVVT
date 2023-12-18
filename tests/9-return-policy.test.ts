import { HomePage } from "../core/page-objects/home-page";
import { Builder, By, WebDriver } from "selenium-webdriver";
import { createDriver, quitDriver } from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";
import { LoginPage } from "../core/page-objects/login-page";
import { FavoritesPage } from "../core/page-objects/favorites-page";
import { ReturnPolicyPage } from "../core/page-objects/return-policy-page";



const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));


let driver: WebDriver;
let homePage: HomePage;
let returnpolicyPage: ReturnPolicyPage;


beforeAll(async () => {
    driver = await createDriver(testData.url.home_page);
    homePage = new HomePage(driver);
    returnpolicyPage = new ReturnPolicyPage(driver);
},10000);

test("view return policy", async () => {
    await homePage.acceptAllCookies();
    await homePage.clickOnXButton();
    await homePage.clickOnReturnPolicy(); 
    await returnpolicyPage.verifyReturnPolicyPage();
    
},500000);

afterAll(async () => {
    await quitDriver(driver);
},30000);
