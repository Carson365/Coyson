let visibleBooks = [
    { name: "Testing", id: 1},
    { name: "Different", id: 2},
    { name: "Names", id: 3},
    { name: "To", id: 4},
    { name: "Try", id: 5},
    { name: "The", id: 6},
    { name: "Search", id: 7},
    { name: "Bar", id: 8}
];

function handleOnLoad() {
    populateCards();
}

function populateCards() {
    visibleBooks.forEach((book) => {
        document.getElementsByClassName('main')[0].innerHTML +=`
        <div class="card">
            <img class="card-img-top" src="https://m.media-amazon.com/images/I/91U6rc7u0yL.jpg" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${book.name}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
        `;
    });
}

document.getElementById('bookSearch').addEventListener("input", function(e) {
    console.log(e.target.value);

    // Clear the previous search results
    let searchArr = [];

    visibleBooks.forEach(book => {
        let searchVal = {
            id: book.id,
            score: similarity(e.target.value, book.name)
        };
        searchArr.push(searchVal);
    });

    // Sort the results by score
    searchArr.sort((b, a) => a.score - b.score);

    // Get the sorted list of shop IDs
    const sortedIds = searchArr.map(item => item.id);

    console.log(searchArr)

    // Sort the original allShops array based on the sorted IDs
    visibleBooks.sort((a, b) => {
        return sortedIds.indexOf(a.id) - sortedIds.indexOf(b.id);
    });

    populateCards()
});

function similarity(s1, s2) {
    let maxLength = Math.max(s1.length, s2.length);
    if (maxLength === 0) return 1.0;
    return 1 - levenshteinDistance(s1, s2) / maxLength;
}

function levenshteinDistance(s1, s2) {
    const dp = Array(s1.length + 1).fill(null).map(() => Array(s2.length + 1).fill(null));
    
    for (let i = 0; i <= s1.length; i++) {
        dp[i][0] = i;
    }
    
    for (let j = 0; j <= s2.length; j++) {
        dp[0][j] = j;
    }
    
    for (let i = 1; i <= s1.length; i++) {
        for (let j = 1; j <= s2.length; j++) {
            const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
            dp[i][j] = Math.min(
                dp[i - 1][j] + 1,     // Deletion
                dp[i][j - 1] + 1,     // Insertion
                dp[i - 1][j - 1] + cost // Substitution
            );
        }
    }
    
    return dp[s1.length][s2.length];
}