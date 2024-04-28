import { test, expect } from "@playwright/test";
import { Output } from "./pcs.types";
const fs = require("fs");

const output: Output = {
  timestamp: "",
  cyclists: [],
  races: [],
};

test("main", async ({ page }) => {
  //write current time
  const current_time = new Date(Date.now());
  output.timestamp = current_time.toISOString();

  //go to page
  await page.goto("https://procyclingstats.com/rankings.php");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/ProCyclingStats Best Rider Ranking/);

  // get list of rows from table
  const locator = page.locator("//table/tbody/tr");
  const chs = await locator.all();

  //iterate through elements a print out ranking and name of cyclists at first
  for (const ch of chs) {
    let one_cyclist = {
      ranking: "",
      name: "",
      team: "",
      points: "",
    };

    //get general info from first table
    one_cyclist.ranking = await ch.locator("td").nth(0).innerText();
    one_cyclist.name = (await ch.locator("td").nth(3).innerText()).trimStart();
    one_cyclist.team = await ch.locator("td").nth(4).innerText();
    one_cyclist.points = await ch.locator("td").nth(5).innerText();

    //click on each cyclist name a get the other info (country, birthdate, height, weight, top 5 results (list))
    // await ch.click();

    output.cyclists.push(one_cyclist);
  }

  console.log(output);

  //export to JSON file
  fs.writeFileSync("output.json", JSON.stringify(output));
});
