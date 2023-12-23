import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";

const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class SingleHoodiePage extends BasePage {

    private hoodie_size = By.xpath("//div[@class='product-variation-container']//div[@class='product-variation-content ']//ul[@class='product-variation-swatches product-variation--size']//a[@href='https://eu.puma.com/de/en/pd/ess%2B-minimal-gold-womens-hoodie/680019.html?dwvar_680019_size=0130&dwvar_680019_color=01']");
    private add_to_favorites_button = By.xpath("//button[@class='btn btn-add-to-wish-list-pdp add-to-wish-list']");
    private view_favorites_button = By.xpath("//a[@class='btn btn-mongoose wishlist-overlay-action-btn']");
    
    constructor(driver: WebDriver) {
        super(driver);
    }
    
    private async scrollIntoView(selector: By) {
        const element = await this.driver.findElement(selector);
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", element);
    }

    async chooseHoodieSize(){
        //await this.driver.sleep(1000);
        await this.scrollIntoView(this.hoodie_size);
        await this.findElementAndClick(this.hoodie_size);
    }

    async addToFavorites(){
        await this.driver.sleep(1000);
        //await this.scrollIntoView(this.add_to_favorites_button);
        await this.findElementAndClick(this.add_to_favorites_button);
    }

    async clickToViewFavorites(){  
        await this.waitAndClick(this.view_favorites_button, 10000);
    }

}


