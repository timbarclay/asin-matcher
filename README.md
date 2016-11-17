# ASIN Matcher

A set of simple utility methods that help identify Amazon product links and extract useful information from them.

## Installation

    npm install --save asin-matcher

## Usage

    const asinMatcher = require('asin-matcher');
    const link = "https://www.amazon.ca/dp/B00IBIUZGW";

    // isProductLink tells you if a url is an Amazon product link
    asinMatcher.isProductLink(link) // true
    asinMatcher.isProductLink("http://www.google.com") // false

    // match returns an object containing the interesting parts of the url
    asinMatcher.match(link) // {market: "ca", asin: "B00IBIUZGW"}

    // getMarket returns the market (i.e. the top level domain) of the product link
    asinMatcher.getMarket(link) // "ca"

    // getAsin returns the ASIN product link for the url
    asinMatcher.getAsin(link) // "B00IBIUZGW"

## Tests

    npm test

## Amazon product links

Amazon product links come in all sorts of shapes and sizes. Here are some examples (not including query strings):

* https://www.amazon.co.uk/Old-Man-Sea-Ernest-Hemingway/dp/0099908409/
* https://www.amazon.co.uk/d/Digital-Music/3-Netsky/B01CV5VI7U/
* https://www.amazon.co.uk/d/Laptops/Apple-MacBook-13-inch-Laptop-Intel-Core-Graphics/B00UY2U93W/
* https://www.amazon.co.uk/d/Laptops/Apple-MacBook-Display-15-4-inch-Yosemite/B00YAE55CA/
* https://www.amazon.co.uk/d/Drums-Percussion/Tama-HB5W-Drum-Hardware-Pack/B01H1SGVF6/
* https://www.amazon.co.uk/Old-Man-Sea-Ernest-Hemingway-ebook/dp/B00FU7V8IG/
* https://www.amazon.com.mx/TAMA-VK46CBCRH-MGD-SILVERSTAR-COCKTAIL-Drumsets/dp/B00PXWGMG6/
* https://www.amazon.ca/dp/B00IBIUZGW
* https://www.amazon.com/gp/product/B00IBIUZGW
* https://www.amazon.com/gp/product/0099908409

Plenty of different combinations of path sections can optionally go between the domain name and the part of the path tha represents the ASIN. Plus the ASIN can either be a standard Amazon product reference (10 alphanumeric characters starting with a 'B') or an ISBN-10 if the product is a book (10 numerical characters). 

I've tested this library against a reasonable number of product links and I use it frequently in other applications so I hope it's fairly reliable, but if you find an Amazon link that it doesn't behave with, please [create an issue](https://github.com/timbarclay/asin-matcher/issues) so I can look into it.