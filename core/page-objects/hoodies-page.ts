import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";

const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class HoodiesPage extends BasePage {

    private hoodie_item = By.xpath("//a[@href='/de/en/pd/ess%2B-minimal-gold-womens-hoodie/680019.html?dwvar_680019_color=01']");

    async clickOnHoodieItem(){
        await this.driver.sleep(1000);
        await this.findElementAndClick(this.hoodie_item);
    }

}