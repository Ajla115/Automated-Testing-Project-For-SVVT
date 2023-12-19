import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";

const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class SneakersPage extends BasePage {

    //variables for TEST4
    private locate_filters_menu = By.className('refinement-bar');
    private click_on_price_field = By.xpath("//div[@class='refinement refinement--product_price_de']//button[@class='btn refinement-title ']");
    private open_price_field =  By.xpath("//div[@class='refinement refinement--product_price_de is-open']//button[@class='btn refinement-title ']");
    private choose_price = By.id('refinementItemPrice');
   

    constructor(driver: WebDriver) {
        super(driver);
    }

    async locateAndSelectPrice(){
        await this.findElement(this.locate_filters_menu);
        //await this.findElementAndClick(this.click_on_price_field);
        //await this.waitAndClick(this.open_price_field, 20000);

    }


   
}

