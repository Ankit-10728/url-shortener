

function checkUrl(url) {
    try {
        url = url.trim();
        new url(url);
        return true;
    } catch (error) {
        return false;
    }
}

export { checkUrl }