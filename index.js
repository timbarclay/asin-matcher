var regString = '(?:www.)?ama?zo?n.(\\w{2,3}\\.?\\w{0,2})/.*/{1,3}([B|0-9][A-Z0-9]{9})(?:\\/|$)';
var regex = new RegExp(regString);

module.exports = {
    /**
     * Check whether a string is an Amazon product link
     * 
     * @param {string} url The url to test
     * @return {boolean} Whether the url is an Amazon product link
     */
    isProductLink: function(url) {
        return regex.test(url);
    },

    /**
     * Matches the string against a regular expression that captures the market and the ASIN.
     * An error will be thrown if url is not a string.
     * 
     * @param {string} url The url to match
     * @return {{market: string, asin: string}} An object containing matches for the url. Null will be returned
     * if the match is unsuccessful
     */
    match: function(url) {
        if(!url || !url.match){
            throw Error("Url must be passed in as a string");
        }
        
        var matches = url.match(regex);

        if(!matches || !matches.length || matches.length < 3){
            return null;
        }
        return {
            market: matches[1],
            asin: matches[2]
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
    }
};