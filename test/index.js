const should = require("chai").should();
const expect = require("chai").expect;
const asinMatcher = require("../index");

const link1 = "https://www.amazon.com.mx/TAMA-VK46CBCRH-MGD-SILVERSTAR-COCKTAIL-Drumsets/dp/B00PXWGMG6/ref=as_li_ss_tl?ie=UTF8&qid=1464692584&sr=8-1&keywords=Tama+Cocktail+Jam&linkCode=sl1&linkId=fe2af54a719349eab3cc95bd3a056175"
const link2 = "https://www.amazon.co.uk/d/Laptops/Apple-MacBook-Display-15-4-inch-Yosemite/B00YAE55CA/ref=sr_1_2?s=computers&ie=UTF8&qid=1479300154&sr=1-2&keywords=macbook+pro+15";
const link3 = "https://www.amazon.ca/dp/B00IBIUZGW";
const link4 = "https://www.amazon.com/gp/product/B00IBIUZGW";

describe("asinMatcher", () => {
    describe("isProductLink", () => {
        it("correctly identifies product links", () => {
            asinMatcher.isProductLink(link1).should.equal(true);
            asinMatcher.isProductLink(link2).should.equal(true);
            asinMatcher.isProductLink(link3).should.equal(true);
            asinMatcher.isProductLink(link4).should.equal(true);
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
            var expected = {
                market: "com.mx", 
                asin: "B00PXWGMG6"
            };
            asinMatcher.match(link1).should.deep.equal(expected);
        });

        it("returns null if the url is not matched", () => {
            var match = asinMatcher.match("this is definitely not a url");
            expect(match).to.equal(null);
        });
    });

    describe("getMarket", () => {
        it("correctly gets the market of the url", () => {
            asinMatcher.getMarket(link1).should.equal("com.mx");
            asinMatcher.getMarket(link2).should.equal("co.uk");
            asinMatcher.getMarket(link3).should.equal("ca");
            asinMatcher.getMarket(link4).should.equal("com");
        });

        it("returns null if the url is not matched", () => {
            var match = asinMatcher.getMarket("this is definitely not a url");
            expect(match).to.equal(null);
        });
    });

    describe("getAsin", () => {
        it("correctly gets the ASIN from the url", () => {
            asinMatcher.getAsin(link1).should.equal("B00PXWGMG6");
            asinMatcher.getAsin(link2).should.equal("B00YAE55CA");
            asinMatcher.getAsin(link3).should.equal("B00IBIUZGW");
            asinMatcher.getAsin(link4).should.equal("B00IBIUZGW");
        });

        it("returns null if the url is not matched", () => {
            var match = asinMatcher.getAsin("this is definitely not a url");
            expect(match).to.equal(null);
        });
    });
});