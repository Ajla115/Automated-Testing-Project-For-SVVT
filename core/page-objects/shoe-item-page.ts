import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";

const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class ShoeItemPage extends BasePage {

    //TEST 2
    //private shoes_size = By.id('attributes-container-size');
    //private shoes_size = By.xpath("//ul[@class='product-variation-swatches product-variation--size']//li[@class='product-variation-swatch selected text']//a[@href='https://eu.puma.com/de/en/pd/palermo-special/397549.html?dwvar_397549_size=0230&dwvar_397549_color=01']");
    private shoes_size = By.xpath("//a[@href='https://eu.puma.com/de/en/pd/palermo-special/397549.html?dwvar_397549_size=0230&dwvar_397549_color=01']");
    //private add_to_cart_button = By.className("add-to-cart btn btn-primary btn-full-width");
    //private add_to_cart_button = By.xpath("//button[@class='add-to-cart btn btn-primary btn-full-width']");
    private add_to_cart_button = By.xpath('//div[@class="add-to-cart-btn-block col-10 col-sm-8"]//button[@class="add-to-cart btn btn-primary btn-full-width"]');
    private added_to_cart_prompt = By.xpath("//div[@id='exampleModal']//div[@class='modal-dialog']//div[@class='modal-content']");
    private added_item_verification_message = By.className("bag-overlay-quantity-added");
    
    constructor(driver: WebDriver) {
        super(driver);
    }

    //TEST 2
    async  clickOnASize(){
        await this.findElementAndClick(this.shoes_size);
    }

    async clickOnAddToCart(){
        await this.scrollIntoView(this.add_to_cart_button);
        //await this.waitAndClick(this.add_to_cart_button, 500000);
        await this.findElementAndClick(this.add_to_cart_button);
    }

    private async scrollIntoView(selector: By) {
        const element = await this.driver.findElement(selector);
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", element);
    }

    async verifyAddedToCart(){
        await this.findElement(this.added_to_cart_prompt);
        await this.waitForElement(this.added_item_verification_message, 20000);
        await this.checkMatchingElements(this.added_item_verification_message, testData.verification_message.added_to_cart);
    }


   



    

}
