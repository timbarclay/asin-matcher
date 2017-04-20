const urlRegString = '(?:www.)?ama?zo?n.(\\w{2,3}\\.?\\w{0,2})/.*/{1,3}([B|0-9][A-Z0-9]{9})(?:\\/|\\?|$)';
const asinRegString = '^B.{9}$';
const isbn10RegString = '^\\d{10}$'

const urlRegex = new RegExp(urlRegString);
const asinRegex = new RegExp(asinRegString);
const isbn10Regex = new RegExp(isbn10RegString);

const idTypes = {
    ASIN: "ASIN",
    ISBN: "ISBN"
};

function getIdType(asin) {
    if (asinRegex.test(asin)) {
        return idTypes.ASIN;
    }
    if (isbn10Regex.test(asin)) {
        return idTypes.ISBN;
    }
    return null;
}

module.exports = {
    /**
     * Check whether a string is an Amazon product link
     * 
     * @param {string} url The url to test
     * @return {boolean} Whether the url is an Amazon product link
     */
    isProductLink: function(url) {
        return urlRegex.test(url);
    },

    /**
     * Matches the string against a regular expression that captures the market and the ASIN.
     * An error will be thrown if url is not a string.
     * 
     * @param {string} url The url to match
     * @return {{market: string, asin: string, idType: string}} An object containing matches for the url. Null will be returned
     * if the match is unsuccessful. idType will be either ASIN or ISBN indicating which type of id was used in the url
     */
    match: function(url) {
        if(!url || !url.match){
            throw Error("Url must be passed in as a string");
        }
        
        const matches = url.match(urlRegex);

        if(!matches || !matches.length || matches.length < 3){
            return null;
        }
        const asin = matches[2];
        return {
            market: matches[1],
            asin: asin,
            idType: getIdType(asin)
        };
    },

    /**
     * Get the market (e.g. the top level domain) of the url
     * 
     * @param {string} url The url to match
     * @return {string} The market of the url
     */
    getMarket: function(url) {
        const match = this.match(url);
        return match ? match.market : null;
    },

    /**
     * Get the ASIN product code of the url
     * 
     * @param {string} url The url to match
     * @return {string} The ASIN product code
     */
    getAsin: function(url) {
        const match = this.match(url);
        return match ? match.asin : null;
    },

    /**
     * Get the ID type of the url
     * 
     * @param {string} url the url to match
     * @return {string} A string representing the type of ID used in the url. Options are ASIN and ISBN
     */
    getIdType: function(url) {
        const match = this.match(url);
        return match ? match.idType : null;
    }
};