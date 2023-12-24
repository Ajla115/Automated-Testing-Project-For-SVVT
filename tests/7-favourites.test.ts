import { HomePage } from "../core/page-objects/home-page";
import { Builder, By, WebDriver } from "selenium-webdriver";
import { createDriver, quitDriver } from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";
import { LoginPage } from "../core/page-objects/login-page";
import { FavoritesPage } from "../core/page-objects/favorites-page";
import { ShoeItemPage } from "../core/page-objects/shoe-item-page";

const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

let driver: WebDriver;
let homePage: HomePage;
let favoritesPage : FavoritesPage;
let shoeitemPage: ShoeItemPage;

beforeAll(async () => {
    driver = await createDriver(testData.url.home_page);
    homePage = new HomePage(driver);
    favoritesPage = new FavoritesPage(driver);
    shoeitemPage = new ShoeItemPage(driver);
},10000);

/*Prethodno obrisati ovaj item iz favorites jer ako nisam onda ga kroz ovo izbrise iz favorites*/
//Msm da ne bi trebalo ovo iznad biti problem sa ovim emailom
test("add to favorites", async () => {
    await homePage.acceptAllCookies();
    await homePage.clickOnXButton();
    //await homePage.clickOnFavorites();
    await homePage.clickOnAShoeItem();
    await shoeitemPage.clickOnASize();
    await shoeitemPage.addToFavorites();
    await favoritesPage.provideLoginEmail();
    await favoritesPage.clickOnRememberLoginCheckbox();
    await favoritesPage.clickOnContinueWithPasswordButton();
    await favoritesPage.provideLoginPassword();
    await favoritesPage.clickOnLoginButton();
    await shoeitemPage.verifyIfAddedToFavorites();
},500000);

/*test("check favorites", async () => {
    await homePage.acceptAllCookies();
    await homePage.clickOnXButton();
    await homePage.clickOnFavorites();
    await favoritesPage.provideLoginEmail();
    await favoritesPage.clickOnRememberLoginCheckbox();
    await favoritesPage.clickOnContinueWithPasswordButton();
    await favoritesPage.provideLoginPassword();
    await favoritesPage.clickOnLoginButton();
    await favoritesPage.verifyFavoritesPage();
},500000);*/

afterAll(async () => {
    await quitDriver(driver);
},30000);
