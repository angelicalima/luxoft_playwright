const { FlightSearchElements } = require('./common/flightSearchElements');

exports.Search = class Search {
  
  constructor(page) {
    this.page = page;
    this.flightSearchElements = new FlightSearchElements(page)
  }

  async goto() {
    await this.page.goto('/search');
  }

}
