import { HomePage } from "../core/page-objects/home-page";
import { Builder, By, WebDriver } from "selenium-webdriver";
import { createDriver, quitDriver } from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";
import { LoginPage } from "../core/page-objects/login-page";
import { FavoritesPage } from "../core/page-objects/favorites-page";



const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));


let driver: WebDriver;
let homePage: HomePage;
let favoritesPage : FavoritesPage;


beforeAll(async () => {
    driver = await createDriver(testData.url.home_page);
    homePage = new HomePage(driver);
    favoritesPage = new FavoritesPage(driver);
},10000);

test("favourites", async () => {
    await homePage.acceptAllCookies();
    await homePage.clickOnXButton();
    await homePage.clickOnFavorites();
    await favoritesPage.provideLoginEmail();
    await favoritesPage.clickOnRememberLoginCheckbox();
    await favoritesPage.clickOnContinueWithPasswordButton();
    await favoritesPage.provideLoginPassword();
    await favoritesPage.clickOnLoginButton();
    await favoritesPage.removeFromFavourites();
    await favoritesPage.locateConfirmRemovalPrompt();
    await favoritesPage.confirmRemovalOfItem();
    await favoritesPage.closeRemoveItemPrompt();
},500000);


/*afterAll(async () => {
    await quitDriver(driver);
},30000);*/
