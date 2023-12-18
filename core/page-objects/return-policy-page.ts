import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";

const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class ReturnPolicyPage extends BasePage {

    //TEST 9
    private return_policy_page_verification = By.className("container content-asset-container content-page");

    constructor(driver: WebDriver) {
        super(driver);
    }

    async verifyReturnPolicyPage(){
        await this.waitForElement(this.return_policy_page_verification, 10000);
        await this.checkMatchingElements(this.return_policy_page_verification, testData.verification_message.return_policy);
    }
        
    


 
   



    

}
