# ASIN Matcher

A set of simple utility methods that help identify Amazon product links and extract useful information from them.

## Installation

    npm install --save asin-matcher

## Usage
```javascript
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
```

The npm package includes a `d.ts` type definition file so if you're using TypeScript (version 2) you won't need to import types separetely.

## Tests

    npm test

## Amazon product links

Amazon product links come in all sorts of shapes and sizes. Here's a (non exhaustive) list of examples (not including query strings):

| Form                          | Example                                                                    |
|-------------------------------|----------------------------------------------------------------------------|
| domain/title/dp/ISBN          | https://www.amazon.co.uk/Old-Man-Sea-Ernest-Hemingway/dp/0099908409/       |
| domain/title/dp/ASIN          | https://www.amazon.co.uk/Old-Man-Sea-Ernest-Hemingway-ebook/dp/B00FU7V8IG/ |
| domain/d/category/title/ASIN  | https://www.amazon.co.uk/d/Digital-Music/3-Netsky/B01CV5VI7U/              |
| domain/dp/ASIN                | https://www.amazon.ca/dp/B00IBIUZGW                                        |
| domain/gp/product/ASIN        | https://www.amazon.com/gp/product/B00IBIUZGW                               |
| domain/gp/product/ISBN        | https://www.amazon.com/gp/product/0099908409                               |

Plenty of different combinations of path sections can optionally go between the domain name and the part of the path that represents the ASIN. Plus the ASIN can either be a standard Amazon product reference (10 alphanumeric characters starting with a 'B') or an ISBN-10 if the product is a book (10 numerical characters). 

I've tested this library against a reasonable number of product links and I use it frequently in other applications so I hope it's fairly reliable, but if you find an Amazon link that it doesn't behave with, please [create an issue](https://github.com/timbarclay/asin-matcher/issues) so I can look into it.