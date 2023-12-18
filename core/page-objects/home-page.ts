import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";

const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class HomePage extends BasePage {

    //variables for TESTS 2 - 6
    //TEST 5
    private accept_cookies_button = By.id("onetrust-accept-btn-handler");
    private x_button = By.id("wps-overlay-close-button");
    private user_icon = By.className("p-header-actions-item-inner js-cmp-user-menu-toggle");

    //TEST 6
    private login_button = By.className("btn btn-primary p-user-menu-authenticate-button");

    //TEST 2
    //private shoes_item =  By.cssSelector("a[data-pid='4099685699278']");
    private shoes_item = By.className("product-recommendation-link");
    //even though it is used multiple times, this is how it works
    private shoes_size = By.id('attributes-container-size');

    //TEST 4
    //private women_menu = By.className("p-nav-list");
    //private women_menu = By.xpath("/html/body/div[5]/header/div[1]/div/div[2]/div/div[1]/div[2]/nav/ul/li[1]/a");
    private women_menu = By.xpath('//*[@id="siteHeader"]/div[1]/div/div[2]/div/div[1]/div[2]/nav/ul/li[1]/a');
    //private menu_item = By.cssSelector('a[data-category-id="womens"]');
    //private menu_item = By.xpath("/html/body/div[5]/header/div[1]/div/div[2]/div/div[1]/div[2]/nav/ul/li[1]/div/ul/li[2]/div/div/ul/li[1]/a");
    private menu_item = By.xpath('//*[@id="siteHeader"]/div[1]/div/div[2]/div/div[1]/div[2]/nav/ul/li[1]/div/ul/li[2]/div/div/ul/li[1]/a');

    //TEST 1
    private search_bar = By.className("p-header-search-inner js-already-under-validation-rules");
    private search_item = By.className("p-header-search-field searchInput js-cmp-search-bar-input hf-validated hf-valid hf-in-range hf-user-valid");
    private start_search_icon = By.className("p-header-search-icon js-cmp-search-bar-open-search-page");

    //TEST 7
    private favorites_icon = By.className("p-header-actions-icon p-header-actions-icon--wishlist js-cmp js-wishlist-icon");

    //TEST 9
    private footer_tag= By.id("collapse-1");
    private return_policy = By.className("p-footer-link");
    private return_policy_page_verification = By.className("container content-asset-container content-page");

    constructor(driver: WebDriver) {
        super(driver);
    }

    //functions for TESTS 2 - 6
    async acceptAllCookies(){
        await this.findElementAndClick(this.accept_cookies_button);
    }

    async clickOnXButton(){
        await this.findElementAndClick(this.x_button);
    }

    async openMenuWithQuickLinks() {
        await this.findElementAndClick(this.user_icon);
    }

    async clickOnLoginButton(){
        await this.findElementAndClick(this.login_button);
    }

    //TEST 2
    async clickOnAShoeItem(){
        await this.findElementAndClick(this.shoes_item);
    }

    //TEST 4
    async hoverOverWomenMenu(){
        await this.findElement(this.women_menu);
    }

    async chooseMenuItem(){
        await this.findElementAndClick(this.menu_item);
    }

    //TEST 1
    async clickOnSearchBar(){
        await this.findElementAndClick(this.search_bar);
    }

    async enterItemToSearchFor(){
        await this.fillInputField(this.search_item, testData.data.search_item);
    }

    async startSearch(){
        await this.waitForElement(this.start_search_icon, 500000);
        await this.findElementAndClick(this.start_search_icon);
    }

    //TEST 7
    async clickOnFavorites(){
        await this.findElementAndClick(this.favorites_icon);
    }

    //TEST 9
    async clickOnReturnPolicy(){
        await this.findElement(this.footer_tag);

        //da li se moze ovo kako drugacije ovdje napisati
        const elements = await this.driver.findElements(this.return_policy);

        if (elements.length >= 9) {
            await elements[8].click(); //  9th element (index 8 )
        } else { //error handling
            console.error("Not enough elements with class 'p-footer-link'");
        }
    }

    async verifyReturnPolicyPage(){
        await this.waitForElement(this.return_policy_page_verification, 10000);
        await this.checkMatchingElements(this.return_policy_page_verification, testData.verification_message.return_policy);
    }
        
    


 
   



    

}
