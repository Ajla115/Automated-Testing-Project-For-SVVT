import { HomePage } from "../core/page-objects/home-page";
import { Builder, By, WebDriver } from "selenium-webdriver";
import { createDriver, quitDriver } from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";
import { FavoritesPage } from "../core/page-objects/favorites-page";
import { HoodiesPage } from "../core/page-objects/hoodies-page";
import { SingleHoodiePage } from "../core/page-objects/single-hoodie-page";

const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

let driver: WebDriver;
let homePage: HomePage;
let favoritesPage : FavoritesPage;
let hoodiesPage : HoodiesPage;
let singlehoodiePage: SingleHoodiePage;

beforeAll(async () => {
    driver = await createDriver(testData.url.home_page);
    homePage = new HomePage(driver);
    favoritesPage = new FavoritesPage(driver);
    hoodiesPage = new HoodiesPage(driver);
    singlehoodiePage = new SingleHoodiePage(driver);
},10000);

test("add and remove from favourites", async () => {
    await homePage.acceptAllCookies();
    await homePage.clickOnXButton();
    await homePage.clickOnSearchBar();
    await homePage.enterItem2ToSearchFor();
    await homePage.startSearch();
    await hoodiesPage.clickOnHoodieItem();
    await singlehoodiePage.chooseHoodieSize();
    await singlehoodiePage.addToFavorites();
    await favoritesPage.provideLoginEmail2();
    await favoritesPage.clickOnRememberLoginCheckbox();
    await favoritesPage.clickOnContinueWithPasswordButton();
    await favoritesPage.provideLoginPassword();
    await favoritesPage.clickOnLoginButton();
    await singlehoodiePage.clickToViewFavorites();
    await favoritesPage.removeFromFavourites();
    await favoritesPage.locateConfirmRemovalPrompt();
    await favoritesPage.confirmRemovalOfItem();
    await favoritesPage.closeRemoveItemPrompt();
    await favoritesPage.verifyEmptyFavoritesList();
},500000);

/*test("just remove from favourites", async () => {
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
},500000);*/

afterAll(async () => {
    await quitDriver(driver);
},30000);
