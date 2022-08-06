// playwright-dev-page.js
const { FlightSearchElements } = require('./common/flightSearchElements');

exports.Index = class Index {

  constructor(page) {
    this.page = page;
    this.flightSearchElements = new FlightSearchElements(page)
  }

  async goto() {
    await this.page.goto('/');
  }

}
