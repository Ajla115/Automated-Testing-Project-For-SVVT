import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";

const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class SneakersPage extends BasePage {

    //variables for TEST4
    private locate_filters_menu = By.className('refinement-bar');
    private click_on_price_field = By.xpath("//button[@class='btn refinement-title ']");
    private open_price_field =  By.xpath("//div[@class='refinement refinement--product_price_de is-open']//div[@class='refinement-show']");
    //private choose_price = By.id('refinementItemPrice');
    private choose_price = By.xpath("//div[@class='custom-controls-stacked']//label[@class='custom-control mode-radio']//input[@id='refinementItemPrice']");
    private close_price_filter = By.xpath("//div[@class='refinement refinement--product_price_de is-open']//div[@class='refinement-show']//button[@class='btn refinement-icon-close hidden-md-down']");
    private show_all_items = By.xpath("//button[@class='btn btn-primary show-all-button col-12 col-sm-4 col-md-2 ml-sm-2 ']");
    private standard_price = By.className("product-tile-price-standard product-tile__price--standard");
    private discounted_price = By.className("product-tile-price-new product-tile__price--new");
    private all_products = By.xpath("//div[@class='product-grid-container']");
    private confirm_filtration = By.xpath("//span[@class='filter-bar-value']");

    constructor(driver: WebDriver) {
        super(driver);
    }

        async clickOnPriceButton(){
        await this.driver.sleep(1000);
        //await this.findElement(this.locate_filters_menu);
        await this.findElementAndClick(this.click_on_price_field);
        //await this.waitAndClick(this.open_price_field, 20000);
        }

    async chooseOnePriceOption(){
        this.driver.sleep(1000);
        await this.waitForElement(this.open_price_field, 10000);
    
        /*const elements = await this.driver.findElement(this.choose_price);
        if (elements.length >= 4) {
            const thirdPrice = elements[2];
            await this.findElementAndClick(thirdPrice);  
        }*/

       await this.findElementAndClick(this.choose_price);
    }

    async clickToClosePriceFilter(){
        await this.driver.sleep(1000);
        await this.findElementAndClick(this.close_price_filter);
    }

    async clickToSeeAllOptions(){
        await this.findElementAndClick(this.show_all_items);
        console.log("23");

    }

    async verifyFiltration(){
        await this.driver.sleep(1000);
        await this.waitForElement(this.confirm_filtration, 10000);  
        await this.checkMatchingElements(this.confirm_filtration, testData.verification_message.successful_filtering);
    }

    /*async checkPricesInRange() {
        
        const productElements = await this.driver.findElements(this.show_all_items);
    
        if (!Array.isArray(productElements) || productElements.length === 0) {
            console.error('No product elements found or not iterable.');
            return;
        }
    
       
        const minPrice = 30.00;
        const maxPrice = 70.00;
    
        
        for (const product of productElements) {
            // Extract all price elements within the product
            const priceElements = await product.findElements(By.className('product-tile-price')); // Use the correct class name
    
            // Extract prices and check if any fall within the specified range
            for (const priceElement of priceElements) {
                const priceText = await priceElement.getAttribute('textContent'); // Use textContent instead of innerText
                const price = parseFloat(priceText.replace('€', '').replace(',', '.'));
    
                // Check if the price is within the specified range
                if (minPrice <= price && price <= maxPrice) {
                    console.log(`Product with price ${price} is within the range.`);
                    // You might want to break the loop if you only need one valid price per product
                    // break;
                }
            }
        }
    }*/
    
    
    
}



    




   


