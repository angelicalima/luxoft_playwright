const { expect } = require('@playwright/test');

exports.FlightSearchElements = class FlightSearchElements {

  constructor(page) {
    this.page = page;
    this.nightThemeSwitch = page.locator('[data-test-id="switch"] span').first() 
    this.fromField = page.locator('[data-test-id="origin-autocomplete-field"]') 
    this.toField = page.locator('[data-test-id="destination-autocomplete-field"]')
    this.searchFlightsBtn = page.locator('[data-test-id="form-submit"]')
    this.departureDateField = page.locator('[data-test-id="departure-date-field"]')
    this.departureDateInput = page.locator('[data-test-id="departure-date-input"]')
    this.returnDateInput = page.locator('[data-test-id="return-date-input"]')
    this.returnDateField = page.locator('[data-test-id="return-date-field"]')
    this.passengerAdultsField = page.locator('[data-test-id="passengers-adults-field"] a')
    this.passengerField= page.locator('[data-test-id="passengers-field"]')
  }

  async setFrom(area, airport){
    await this.fromField.fill(area)
    await this.page.locator(`text=${airport}`).click();
  }

  async setTo(area, airport){
    await this.toField.fill(area)
    await this.page.locator(`text=${airport}`).click();
  }

  async setDepartureDate(departureDate){
    const date = new Date(departureDate);
    const monthShort = date.toLocaleString('en-US', { month: 'short' });
    const day = ('0' + date.getDate()).slice(-2) 
    const year = date.getFullYear()
    const month =  String(date.getMonth() + 1).padStart(2, '0')
    await this.departureDateField.click()
    await this.page.locator('[class="calendar-caption__select"]').first().selectOption(`${year}-${month}`);
    await this.page.locator(`[aria-label*='${monthShort} ${day}']`).click();
  }

  async setAdultPassenger(number){
    await this.passengerField.click()
    if(number === 0){
      await this.passengerAdultsField.first().click()
    }
    for(var i=1; i<number; i++){
      await this.passengerAdultsField.nth(1).click()
    }
  }
}
