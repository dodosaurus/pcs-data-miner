import { test, expect } from "@playwright/test";
import { Output } from "./pcs.types";
import { extractDateOfBirth, extractHeight, extractNationality, extractWeight } from "./helpers";
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

  await page.getByRole("button", { name: "Accept All" }).click();

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/ProCyclingStats Best Rider Ranking/);

  // get list of rows from table
  const tbl = page.locator("//table/tbody/tr");
  const chs = await tbl.all();

  //iterate through elements a print out ranking and name of cyclists at first
  for (const ch of chs) {
    let one_cyclist = {
      ranking: "",
      name: "",
      team: "",
      points: "",
      birthdate: "",
      country: "",
      height: 0,
      weight: 0
    };

    //get general info from first table
    one_cyclist.ranking = await ch.locator("td").nth(0).innerText();
    one_cyclist.name = (await ch.locator("td").nth(3).innerText()).trimStart();
    one_cyclist.team = await ch.locator("td").nth(4).innerText();
    one_cyclist.points = await ch.locator("td").nth(5).innerText();

    //click on each cyclist name to navigate to specific page a get the other info (country, birthdate, height, weight, top 5 results (list))
    await ch.locator("td").nth(3).locator("a").click();

    let cyclist_info = page.locator("//div[@class='rdr-info-cont']");
    let txt = await cyclist_info.innerText()
    txt = txt.replace(/(\r\n|\n|\r)/gm,"")
    
    //date of birth
    let date_of_birth = extractDateOfBirth(txt);
    let local_date = date_of_birth ? (new Date(date_of_birth)).toLocaleDateString("en-GB") : "";
    one_cyclist.birthdate = local_date;

    //country
    let country = extractNationality(txt);
    one_cyclist.country = country ? country : "";

    //weight
    let weight = extractWeight(txt);
    one_cyclist.weight = weight ? weight : 0;

    //height
    let height = extractHeight(txt);
    one_cyclist.height = height ? height : 0;

    output.cyclists.push(one_cyclist);

    //back to table
    await page.goto("https://procyclingstats.com/rankings.php");
  }

  // console.log(output);

  //export to JSON file
  fs.writeFileSync("output.json", JSON.stringify(output));
});
