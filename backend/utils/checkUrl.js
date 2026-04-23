function checkUrl(url) {
    try {
        if (!url.startsWith("http")) {
            url = "https://" + url;
        }
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

export { checkUrl }