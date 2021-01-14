let apiQuotes = [];

// Show new Quote
function newQuote() {
	// Pick a random quote from apiQuotes array
	const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
	console.log(quote);
}

//Get Quote From Api
async function getQuote() {
	const apiUrl = 'https://type.fit/api/quotes';
	try {
		const response = await fetch(apiUrl);
		apiQuotes = await response.json();
		newQuote();
	} catch (error) {
		// Catch Error here
		console.error('whoops, no quote', error);
	}
}

// On Load
getQuote();
// newQuote();
