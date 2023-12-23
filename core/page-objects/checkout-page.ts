import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";

const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class CheckoutPage extends BasePage {

    //Smoke test 
    private shipping_first_name = By.xpath("//input[@id='shippingFirstName']");
    private shipping_lastname = By.xpath("//input[@id='shippingLastName']");
    private shipping_address = By.xpath("//input[@id='shippingAddressOne']")
    private house_number = By.xpath("//input[@id ='shippingSuite']");
    private zip_code = By.xpath('//input[@id="shippingZipCode"]');
    private city = By.xpath('//input[@id="shippingAddressCity"]');
    private open_country_prompt = By.xpath('//select[@id="shippingCountry"]');
    private choose_country = By.xpath('//option[@data-checkout-url="https://eu.puma.com/hr/en/checkout/start"]');
    private stay_on_german_online_store = By.xpath('//a[@class="btn btn-secondary notification-btn"]');

    constructor(driver: WebDriver) {
        super(driver);
    }
    
    async enterFirstName(){
        await this.fillInputField(this.shipping_first_name, testData.credentials.shipping_first_name);
    }

    async enterLastName(){
        await this.fillInputField(this.shipping_lastname, testData.credentials.shipping_lastname);
    }

    async enterAddress(){
        await this.fillInputField(this.shipping_address, testData.credentials.shipping_address);
    }

    async enterHouseNumber(){
        await this.fillInputField(this.house_number, testData.credentials.house_number);
    }

    async enterZipCode(){
        await this.fillInputField(this.zip_code, testData.credentials.zip_code)
    }

    async enterCity(){
        await this.fillInputField(this.city, testData.credentials.city);
    }

    async chooseCountry(){
        //await this.driver.sleep(1000);
        await this.scrollIntoView(this.open_country_prompt);
        await this.findElementAndClick(this.open_country_prompt);
        await this.findElementAndClick(this.choose_country);
    }

    private async scrollIntoView(selector: By) {
        const element = await this.driver.findElement(selector);
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", element);
    }

    async stayOnGermanOnlineStore(){
        await this.driver.sleep(1000);
        await this.findElementAndClick(this.stay_on_german_online_store);
    }





}