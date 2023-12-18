import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";


export class ShoeItemPage extends BasePage {

    //TEST 2
    private shoes_size = By.id('attributes-container-size');
    private add_to_cart_button = By.className("add-to-cart btn btn-primary btn-full-width");
    
    constructor(driver: WebDriver) {
        super(driver);
    }

    async  clickOnASize(){
        await this.findElementAndClick(this.shoes_size);
    }

    async clickOnAddToCart(){
        await this.findElementAndClick(this.add_to_cart_button);
    }


   



    

}
