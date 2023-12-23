import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";

const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class FavoritesPage extends BasePage {

    //TEST 7
    private login_email = By.id("login-form-email");
    private remember_login_box = By.className("custom-control-input");
    private continue_with_password_button = By.className("btn btn-block btn-secondary col-12");
    private login_password = By.id("login-form-password");
    private login_button = By.className("btn btn-block btn-secondary col-12");
    private verify_favorites_page = By.className('breadcrumb-item');

    public item_saved_in_favorites = By.xpath("//div[@class='line-item-header']");

    //TEST 8
    private bin_icon = By.className("remove-from-wishlist");
    private remove_item_prompt = By.id("removeProductLineItemModal");
    private confirm_removal = By.className("btn btn-primary wish-delete-confirmation-btn");
    //private close_remove_item_prompt = By.className('modal-header delete-confirmation-header');
   // private close_icon = By.className("close");
   private close_remove_item_prompt = By.xpath("//div[@class='modal-header delete-confirmation-header']//button[@class='close']");
   private empty_favorites_list = By.xpath("//h1[@class='wishlist-empty-message']");

   constructor(driver: WebDriver) {
    super(driver);
    }

    async provideLoginEmail(){
        await this.fillInputField(this.login_email, testData.data.login_email);
    }

    async clickOnRememberLoginCheckbox(){
        await this.findElementAndClick(this.remember_login_box);
    }

    async clickOnContinueWithPasswordButton(){
        await this.findElementAndClick(this.continue_with_password_button);
    }

    async provideLoginPassword(){
        await this.fillInputField(this.login_password, testData.credentials.login_password);
    }

    async clickOnLoginButton(){
        await this.findElementAndClick(this.login_button);
    }

    async verifyFavoritesPage(){
        await this.waitForElement(this.verify_favorites_page, 20000);
        // Get all matching elements
        const elements = await this.findElement(this.verify_favorites_page);
        // Check if there are at least three elements
        if (elements.length >= 3) {
        // Get the text content of the third element
        const thirdElementText = await elements[2].getText();
        // Compare the text with the expected value from testData    
        await this.checkMatchingElements(thirdElementText, testData.verification_message.favorites);
        }
    }

    //TEST 8
    async removeFromFavourites(){
        await this.findElementAndClick(this.bin_icon);
    }

    async locateConfirmRemovalPrompt(){
        await this.findElement(this.remove_item_prompt);
    }

    async confirmRemovalOfItem(){
        await this.findElementAndClick(this.confirm_removal);
    }

    async closeRemoveItemPrompt(){
        await this.driver.sleep(1000);
        await this.findElementAndClick(this.close_remove_item_prompt);
        //await this.findElementAndClick(this.close_icon);
    }

    //TEST 8
    async verifyEmptyFavoritesList(){
        await this.driver.sleep(1000);
        await this.checkMatchingElements(this.empty_favorites_list, testData.verification_message.empty_favorites_list);
    }
    
}
