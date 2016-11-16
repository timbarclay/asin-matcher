var regString = '(?:www.)?ama?zo?n.(\\w{2,3}.?\\w{0,2})/.*/{1,3}(B[A-Z0-9]{9})';
var regex = new RegExp(regString);

// This is the number of matches that matching the regex should return
var matchNumber = 3;

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
     * @return {string[]} The array of matches for the url against the Amazon product url regex. The returned array will contain:
     *  0: The original string
     *  1: The market code (e.g. 'co.uk', 'com.mx' etc)
     *  2: The ASIN (e.g. 'B00YAE55CA')
     */
    match: function(url) {
        if(!url || !url.match){
            throw Error("Url must be passed in as a string");
        }
        return url.match(regex);
    },

    /**
     * Get a specific result from matching the url.
     * 
     * @param {string} url The url to match
     * @param {number} index The value you want from the match results by index. E.g. 0: The original string, 1: The market code,
     * 2: The ASIN
     * @return {string} The captured part of the url
     */
    getMatch: function(url, index) {
        if(index >= matchNumber){
            throw Error("Index cannot be greater than the number of possible matches. There should be 3 matches, so possible options are 0, 1 and 2");
        }
        if(!this.isProductLink(url)){
            return "";
        }
        
        var matches = this.match(url);
        if(!matches || !matches.length || matches.length < matchNumber){
            return "";
        }

        return matches[1];
    },

    /**
     * Get the market (e.g. the top level domain) of the url
     * 
     * @param {string} url The url to match
     * @return {string} The market of the url
     */
    getMarket: function(url) {
        this.getMatch(url, 1);
    },

    /**
     * Get the ASIN product code of the url
     * 
     * @param {string} url The url to match
     * @return {string} The ASIN product code
     */
    getAsin: function(url) {
        this.getMatch(url, 2);
    }
};