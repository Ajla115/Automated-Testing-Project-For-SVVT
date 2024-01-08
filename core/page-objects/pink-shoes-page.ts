//ul[@class='breadcrumb']//li[@class='breadcrumb-item']
import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";

const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class PinkShoesPage extends BasePage {

    private search_confirmation_message = By.className("breadcrumb-item");

    constructor(driver: WebDriver) {
        super(driver);
    }

    async verifySearchPage(){
        await this.waitForElement(this.search_confirmation_message, 20000);

        const elements = await this.findElement(this.search_confirmation_message);

        if (elements.length >= 3) {

        const thirdElementText = await elements[2].getText();
  
        await this.checkMatchingElements(thirdElementText, testData.verification_message.search_complete);
    }
}

}