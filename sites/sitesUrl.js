const sites = () => {
  const urls = [
    "https://example.com",
    "https://internet-israel.com",
    "https://www.google.com",
    "https://www.facebook.com",
    "https://www.twitter.com",
    "https://www.reddit.com",
    "https://www.amazon.com",
    "https://www.apple.com",
    "https://www.microsoft.com",
    "https://www.netflix.com",
    "https://www.linkedin.com",
    "https://www.youtube.com",
    "https://www.ebay.com",
    "https://www.instagram.com",
    "https://www.pinterest.com",
    "https://www.wordpress.org",
    "https://www.wordpress.com",
    "https://www.tumblr.com",
    "https://www.imgur.com",
    "https://www.stackoverflow.com",
    "https://www.blogger.com",
    "https://www.paypal.com",
  ];
  const urlsSearch = [];
  let randomNum = Math.floor(Math.random() * urls.length);
  urlsSearch.push(urls[randomNum]);
  randomNum = randomNum === urls.length - 1 ? 0 : randomNum + 1;
  urlsSearch.push(urls[randomNum]);
  return urlsSearch;
};

module.exports = sites;
