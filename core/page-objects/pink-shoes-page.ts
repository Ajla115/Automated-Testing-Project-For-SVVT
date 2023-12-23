//ul[@class='breadcrumb']//li[@class='breadcrumb-item']
import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";

const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class PinkShoesPage extends BasePage {

    //private search_confirmation_message = By.xpath("ul[@class='breadcrumb']//li[@class='breadcrumb-item']");
    private search_confirmation_message = By.className("breadcrumb-item");

    constructor(driver: WebDriver) {
        super(driver);
    }

    async verifySearchPage(){
        await this.waitForElement(this.search_confirmation_message, 20000);
        // Get all matching elements
        const elements = await this.findElement(this.search_confirmation_message);
        // Check if there are at least three elements
        if (elements.length >= 3) {
        // Get the text content of the third element
        const thirdElementText = await elements[2].getText();

        // Compare the text with the expected value from testData    
        await this.checkMatchingElements(thirdElementText, testData.verification_message.search_complete);
    }
}

}