export function extractDateOfBirth(str: string) {
  // Regular expression to match the date of birth
  var dobRegex = /Date of birth: (\d{1,2})(?:st|nd|rd|th) ([a-zA-Z]+) (\d{4})/;

  // Match the date of birth using the regular expression
  var match = str.match(dobRegex);

  if (match && match.length === 4) {
    // Extract day, month, and year from the matched groups
    var day = parseInt(match[1]);
    var monthName = match[2];
    var year = parseInt(match[3]);

    // Convert month name to a number (0-indexed)
    var monthIndex = new Date(Date.parse(monthName + " 1, 2000")).getMonth();

    // Create a new Date object with the extracted date of birth in UTC
    var dobUTC = new Date(Date.UTC(year, monthIndex, day));

    return dobUTC;
  } else {
    return null; // Return null if no match is found
  }
}

export function extractNationality(inputString: string) {
  // Define the regular expression pattern to match the nationality
  var pattern = /Nationality: (.*?)Weight:/;

  // Use RegExp.exec() to find the first occurrence of the pattern
  var match = pattern.exec(inputString);

  // Check if a match is found
  if (match) {
    // Extract and return the nationality
    return match[1];
  } else {
    return null;
  }
}

export function extractWeight(inputString: string) {
  // Define the regular expression pattern to match the weight
  var pattern = /Weight: (.*?)kg\s+Height:/;

  // Use RegExp.exec() to find the first occurrence of the pattern
  var match = pattern.exec(inputString);

  // Check if a match is found
  if (match) {
    // Extract and return the weight
    return parseInt(match[1]);
  } else {
    return null;
  }
}

export function extractHeight(inputString: string) {
  // Define the regular expression pattern to match the height
  var pattern = /Height: (.*?)\s+mPlace of birth:/;

  // Use RegExp.exec() to find the first occurrence of the pattern
  var match = pattern.exec(inputString);

  // Check if a match is found
  if (match) {
    // Extract and return the height
    return parseFloat(match[1]);
  } else {
    return null;
  }
}

export function removeSpaces(inputString: string) {
  return inputString.replace("&nbsp;","").trim().replace(/\u00A0/, " ");
}
