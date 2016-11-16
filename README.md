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

## Issues

Amazon product links come in all sorts of shapes and sizes. I've tested this library against a reasonable number of them and I'm using it often in other applications so I hope it's fairly reliable, but if you find an Amazon link that it doesn't behave with, please create an issue so I can look into it.