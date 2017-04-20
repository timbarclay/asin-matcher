/// <reference path='./index.d.ts' />

import * as asinMatcher from 'asin-matcher';
const link = "https://www.amazon.ca/dp/B00IBIUZGW";

const isLink: boolean = asinMatcher.isProductLink(link);

const match = asinMatcher.match(link);
const market: string = match.market;
const asin: string = match.asin;
const idType: string = match.idType;

const market2: string = asinMatcher.getMarket(link);

const asin2: string = asinMatcher.getAsin(link);

const idType2: string = asinMatcher.getIdType(link);