const scraper = require("./scraper.service");
const parser = require("./parser.service");

const finder = async (url, keyword) => {
  const html = await scraper(url);
  let found = parser(html, keyword);
  found = found === "0" ? "not found" : "found";
  return {
    timestamp: new Date().toLocaleString(),
    keyword,
    url,
    found,
  };
};

module.exports = finder;
