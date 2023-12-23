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
    private shoes_size = By.xpath("//a[@href='https://eu.puma.com/de/en/pd/fenty-x-puma-creeper-phatty-unisex-sneakers/396403.html?dwvar_396403_size=0180&dwvar_396403_color=01']");
    //private add_to_cart_button = By.className("add-to-cart btn btn-primary btn-full-width");
    //private add_to_cart_button = By.xpath("//button[@class='add-to-cart btn btn-primary btn-full-width']");
    private add_to_cart_button = By.xpath('//div[@class="add-to-cart-btn-block col-10 col-sm-8"]//button[@class="add-to-cart btn btn-primary btn-full-width"]');
    //private added_to_cart_prompt = By.xpath("//div[@id='exampleModal']//div[@class='modal-dialog']//div[@class='modal-content']");
    private added_to_cart_prompt = By.xpath("//div[@id='addToBagOverlay']//div[@class='modal-dialog']//div[@class='modal-content']//div[@class='modal-body']");
    //private added_item_verification_message = By.className("bag-overlay-quantity-added");
    //private added_item_verification_message = By.xpath("//div[@class='bag-overlay addToBagOverlay']//h2[@class='bag-overlay-quantity-added']");
    private added_item_verification_message = By.xpath("//h2[@class='bag-overlay-quantity-added']");
    

    //TEST 3
    private view_cart_button = By.xpath('//a[@href="https://eu.puma.com/de/en/cart"]');

    //TEST 7
    private add_to_favorites_button = By.xpath("//button[@class='btn btn-add-to-wish-list-pdp add-to-wish-list']");
    private open_added_to_favorites_prompt = By.xpath("//div[@class='wishlist-overlay']");
    private added_to_favorites = By.xpath("//h2[@class='wishlist-overlay-item-added ']");

    //Smoke test
    private change_color_of_sneakers = By.id("swatch-16");
    private choose_shoe_size = By.id("swatch-0210");
    private sizes_window = By.xpath('//div[@id="attributes-container-size"]');
    private choose_quantity = By.xpath("//select[@id='qty-select-4065454926487']");
    private close_added_to_cart_prompt = By.xpath('//div[@class="modal fade addToBagOverlay modal-fs-mobile show"]//div[@class="modal-dialog"]//div[@class="modal-content"]//button[@class="close"]');


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

    async openAddToCartPrompt(){
        await this.driver.sleep(1000);
        //await this.waitForElement(this.added_to_cart_prompt, 50000);
        await this.findElement(this.added_to_cart_prompt);
        //await this.waitForElement(this.added_item_verification_message, 20000);
        //await this.checkMatchingElements(this.added_item_verification_message, testData.verification_message.added_to_cart);
    }

    async verifyAddedToCart(){
        await this.driver.sleep(1000);
        await this.waitForElement(this.added_item_verification_message, 10000);
        await this.checkMatchingElements(this.added_item_verification_message, testData.verification_message.added_to_cart);
    }

    async clickToViewCart(){
        await this.driver.sleep(1000);
        await this.findElementAndClick(this.view_cart_button);
    }


    //TEST 7

    async addToFavorites(){
        await this.driver.sleep(1000);
        await this.scrollIntoView(this.add_to_favorites_button);
        await this.findElementAndClick(this.add_to_favorites_button);

    }

    async verifyIfAddedToFavorites(){
        await this.driver.sleep(1000);
        await this.waitForElement(this.open_added_to_favorites_prompt, 20000);  
        await this.checkMatchingElements(this.added_to_favorites, testData.verification_message.added_to_favorites);
    }
    
    //Smoke test
    async changeColorOfSneakers(){
        await this.findElementAndClick(this.change_color_of_sneakers);
        await this.driver.sleep(1000);
    }

    async clickToChooseShoeSize(){

        await this.scrollIntoView(this.sizes_window);
        await this.findElementAndClick(this.choose_shoe_size);
    }
    
    async clickToChooseQuantity(){
        await this.findElementAndClick(this.choose_quantity);
    }

    async clickOnAddToCart2(){
        await this.waitAndClick(this.add_to_cart_button, 20000);
        //await this.findElementAndClick(this.add_to_cart_button);
    }

    async closeAddedToCartPrompt(){
        //await this.driver.sleep(1000);
        await this.waitAndClick(this.close_added_to_cart_prompt, 20000);
        await this.findElementAndClick(this.close_added_to_cart_prompt);
    }
}


   



    


