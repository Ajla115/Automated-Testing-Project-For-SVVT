import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";


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
 
   



    

}
