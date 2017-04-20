// Type definitions for asin-matcher v0.2.0
// Project: https://github.com/timbarclay/asin-matcher
// Definitions by: Tim Barclay <https://github.com/timbarclay>

declare module "asin-matcher" {
    interface UrlMatch {
        market: string;
        asin: string;
        idType: string;
    }

    function isProductLink(url: string): boolean;

    function match(url: string): UrlMatch;

    function getMarket(url: string): string;

    function getAsin(url: string): string;

    function getIdType(url: string): string;
}