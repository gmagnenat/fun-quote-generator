const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show loading
function showLoadingSpinner() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}

// Hide loading
function removeLoadingSpinner() {
	quoteContainer.hidden = false;
	loader.hidden = true;
}

//Get Quote From Api
async function getQuote() {
	showLoadingSpinner();
	const proxyUrl = 'https://nameless-inlet-02329.herokuapp.com/';
	const apiUrl =
		'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
	try {
		const response = await fetch(proxyUrl + apiUrl);
		const data = await response.json();

		// Handle unkown authors
		if (data.quoteAuthor === '') {
			authorText.innerText = 'Unknown';
		} else {
			authorText.innerText = data.quoteAuthor;
		}

		// Reduce font size for long quotes
		if (data.quoteText.length > 120) {
			quoteText.classList.add('long-quote');
		} else {
			quoteText.classList.remove('long-quote');
		}
		quoteText.innerText = data.quoteText;
		removeLoadingSpinner();
	} catch (error) {
		// Catch Error here
		getQuote();
	}
}

// Tweet Quote
function tweetQuote() {
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
	window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();
// newQuote();
