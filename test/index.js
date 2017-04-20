const chai = require("chai");
const should = chai.should();
const expect = chai.expect;
const asinMatcher = require("../index");

const link1 = "https://www.amazon.com.mx/TAMA-VK46CBCRH-MGD-SILVERSTAR-COCKTAIL-Drumsets/dp/B00PXWGMG6/ref=as_li_ss_tl?ie=UTF8&qid=1464692584&sr=8-1&keywords=Tama+Cocktail+Jam&linkCode=sl1&linkId=fe2af54a719349eab3cc95bd3a056175"
const link2 = "https://www.amazon.co.uk/d/Laptops/Apple-MacBook-Display-15-4-inch-Yosemite/B00YAE55CA/ref=sr_1_2?s=computers&ie=UTF8&qid=1479300154&sr=1-2&keywords=macbook+pro+15";
const link3 = "https://www.amazon.ca/dp/B00IBIUZGW";
const link4 = "https://www.amazon.com/gp/product/B00IBIUZGW";
const link5 = "https://www.amazon.co.uk/Old-Man-Sea-Ernest-Hemingway/dp/0099908409/ref=tmm_pap_swatch_0?_encoding=UTF8&qid=1479398325&sr=1-1";
const link6 = "https://www.amazon.co.uk/GoPro-CHDHY-401-EU-HERO4-SILVER/dp/B00O1XRT9W?tag=plathi21&psc=1&SubscriptionId=AKIAI3FTSIOZQ7GOWL4Q&linkCode=xm2&camp=2025&creative=165953&creativeASIN=B00O1XRT9W";

describe("asinMatcher", () => {
    describe("isProductLink", () => {
        it("correctly identifies product links", () => {
            asinMatcher.isProductLink(link1).should.equal(true);
            asinMatcher.isProductLink(link2).should.equal(true);
            asinMatcher.isProductLink(link3).should.equal(true);
            asinMatcher.isProductLink(link4).should.equal(true);
            asinMatcher.isProductLink(link5).should.equal(true);
            asinMatcher.isProductLink(link6).should.equal(true);
        });

        it("correctly fails to identify other links", () => {
            // This is an Amazon link but not a product link
            asinMatcher.isProductLink("https://www.amazon.com").should.equal(false);
            asinMatcher.isProductLink("https://www.google.co.uk/").should.equal(false);
            asinMatcher.isProductLink("asdflibjsd asodifa;weif2345").should.equal(false);
        });
    });

    describe("match", () => {
        it("correctly match url parts", () => {
            const expected = {market: "com.mx", idType: "ASIN", asin: "B00PXWGMG6"};
            asinMatcher.match(link1).should.deep.equal(expected);
            const expected2 = {market: "co.uk", idType: "ISBN", asin: "0099908409"};
            asinMatcher.match(link5).should.deep.equal(expected2);
        });

        it("returns null if the url is not matched", () => {
            const match = asinMatcher.match("this is definitely not a url");
            expect(match).to.equal(null);
        });
    });

    describe("getMarket", () => {
        it("correctly gets the market of the url", () => {
            asinMatcher.getMarket(link1).should.equal("com.mx");
            asinMatcher.getMarket(link2).should.equal("co.uk");
            asinMatcher.getMarket(link3).should.equal("ca");
            asinMatcher.getMarket(link4).should.equal("com");
            asinMatcher.getMarket(link5).should.equal("co.uk");
            asinMatcher.getMarket(link6).should.equal("co.uk");
        });

        it("returns null if the url is not matched", () => {
            const match = asinMatcher.getMarket("this is definitely not a url");
            expect(match).to.equal(null);
        });
    });

    describe("getAsin", () => {
        it("correctly gets the ASIN from the url", () => {
            asinMatcher.getAsin(link1).should.equal("B00PXWGMG6");
            asinMatcher.getAsin(link2).should.equal("B00YAE55CA");
            asinMatcher.getAsin(link3).should.equal("B00IBIUZGW");
            asinMatcher.getAsin(link4).should.equal("B00IBIUZGW");
            asinMatcher.getAsin(link5).should.equal("0099908409");
            asinMatcher.getAsin(link6).should.equal("B00O1XRT9W");
        });

        it("returns null if the url is not matched", () => {
            const match = asinMatcher.getAsin("this is definitely not a url");
            expect(match).to.equal(null);
        });
    });

    describe("getIdType", () => {
        it("correctly identifies the id type", () => {
            asinMatcher.getIdType(link1).should.equal("ASIN");
            asinMatcher.getIdType(link2).should.equal("ASIN");
            asinMatcher.getIdType(link3).should.equal("ASIN");
            asinMatcher.getIdType(link4).should.equal("ASIN");
            asinMatcher.getIdType(link5).should.equal("ISBN");
            asinMatcher.getIdType(link6).should.equal("ASIN");
        });

        it("returns null if the url is not matched", () => {
            const match = asinMatcher.getIdType("this is definitely not a url");
            expect(match).to.equal(null);
        });
    })
});