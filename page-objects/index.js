// playwright-dev-page.js
const { FlightSearchElements } = require('./common/flightSearchElements');

exports.Index = class Index {

  constructor(page) {
    this.page = page;
    this.flightSearchElements = new FlightSearchElements(page)
    this.openNewPageCheckbox = page.locator('[data-test-id="checkbox-booking"]').locator('[type="checkbox"]')
  }

  async goto() {
    await this.page.goto('/');
  }

}
