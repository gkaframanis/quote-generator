const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");


let apiQuotes = [];

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show New Quote
function newQuote() {
    // When we press the button we bypass the getQuotes, so we need to put loading() also here.
    loading();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if author field is null and replace it with "Unknown"
    if(quote.author){
        quoteAuthor.textContent = quote.author;
    }
    else {
        quoteAuthor.textContent = "Unknown";
    }

    // Check the quote to determine the styling
    if (quote.text.length > 120) {
        quoteText.classList.add("long-quote");
    }
    else {
        quoteText.classList.remove("long-quote");
    }

    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes From API https://type.fit/api/quotes
async function getQuotes() {
    loading();
    const apiUrl = "https://type.fit/api/quotes";
    try {
        // Without async - await it would try to set the response before we have some data.
        const response = await fetch(apiUrl);
        // We change its value here, that's why we used let.
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch error here

    }
};

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();