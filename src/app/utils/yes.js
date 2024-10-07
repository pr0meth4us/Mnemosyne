const match = 'https://www.tiktokv.com/share/video/7124371397618568454/'; // Replace with your redirecting URL

fetch(match, { redirect: 'follow' })
    .then(response => {
        if (response.redirected) {
            console.log('Original Link (After Redirect):', response.url);
            return fetch(response.url);
        } else {
            console.log('No redirect, final link:', response.url);
            return fetch(response.url);
        }
    })
    .then(finalResponse => finalResponse.text()) // Get the response as text (HTML)
    .then(html => {
        // Use a regex to find the originCover value
        const regex = /"originCover":"(.*?)"/;
        const match = html.match(regex); // Match the regex against the HTML string

        if (match && match[1]) {
            const originCover = match[1].replace(/\\u002F/g, '/'); // Decode the escaped forward slashes
            console.log('Origin Cover URL:', originCover); // Log the extracted URL
        } else {
            console.log('originCover not found in the HTML.');
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
