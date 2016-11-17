/// <reference path='./index.d.ts' />

import * as asinMatcher from 'asin-matcher';
const link = "https://www.amazon.ca/dp/B00IBIUZGW";

var isLink: boolean = asinMatcher.isProductLink(link);

var match = asinMatcher.match(link);
var market: string = match.market;
var asin: string = match.asin;

var market2: string = asinMatcher.getMarket(link);

var asin2: string = asinMatcher.getAsin(link);