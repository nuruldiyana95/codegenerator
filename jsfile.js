const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show loading  
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}
// Show new quote ada loading maksudnya kalau dia take time nak load function loading akan 
//keluar dulu
function newQuote() {
    loading();
// Picka random quote
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

// Check if kalau author field blank replace dgn unknown 

    if (!quote.author) {
        authorText.textContent = 'Unknown';

    }else{
        authorText.textContent = quote.author;
    }
    // check quote length untuk specific styling 

    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');

    }else{
        quoteText.classList.remove('long-quote');
    }
    // set quote, hide loader
    // authorText.textContent = quote.author;
    quoteText.textContent = quote.text;
    complete();

}

// Quotes dari API async function untuk load tanpa perlu web browser stop dulu 
// try catch untuk complete API request, incase tak jalan boleh add try catch error 
async function getQuotes() {
    loading();
    const apiUrl ='https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();

        // api quotes tu global variable, jadi dia fetch data ke json object untuk response 
        // takkan response selagi tak fetch data dari api, kalau tak buat async function 
        // lepas tu just set const response dan takde await dia akan cause error sebb dia 
        // reponse dulu baru fetch data. Tu sebab kita make sure ada data yg  kita fetch dulu
    } catch (error) {


    // alert(error)
    // Catch error
    }
}

// Tweet quote , nnti dia akan ada quote and space sikit bila masuk dalam tweeter
// ?text= untuk masukkan variable dalam url 
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContet} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}
// Event listeners untuk button tu berfungsi 
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// onload sebab nak run quote function bila page load 

getQuotes();
//loading();