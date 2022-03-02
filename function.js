const parseUrl = function(url) {
    url = decodeURIComponent(url)
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = 'https://' + url;
    }
    return url;
};
module.exports = parseUrl