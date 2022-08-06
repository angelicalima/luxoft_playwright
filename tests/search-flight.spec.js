const { test, expect } = require('@playwright/test');
const { Index } = require('../page-objects/index');
const { Search } = require('../page-objects/search');

test('It should persist the previous data from the index to the new tab', async ({ page }) => {
  const indexPage = new Index(page)

  await indexPage.goto()
  await indexPage.flightSearchElements.switchNightThemeOn()
  await indexPage.flightSearchElements.setFrom("New York","John F. Kennedy International Airport")
  await indexPage.flightSearchElements.setTo("Germany","Berlin")
  await indexPage.flightSearchElements.setDepartureDate("Tue, August 30")
  await indexPage.flightSearchElements.setAdultPassanger(2)
  await indexPage.flightSearchElements.searchFlightsBtn.click()

  //handling the new page
  const [newPage] = await Promise.all([
    page.waitForEvent('popup'),
  ])
  await newPage.waitForLoadState();
  const searchPage = new Search(newPage)

  await expect(searchPage.page.url()).toContain("/search")
  await expect(searchPage.flightSearchElements.fromField).toHaveValue("New York")
  await expect(searchPage.flightSearchElements.toField).toHaveValue("Berlin")
  await expect(searchPage.flightSearchElements.departureDateInput).toHaveValue("Tue, August 30")
  await expect(searchPage.flightSearchElements.returnDateInput).toBeEmpty()
  await expect(searchPage.flightSearchElements.passengerField).toContainText("2 passengers")

});
