//retreive cards and searcg counter ids
const searchedBooks = document.getElementById('books-cards');
const searchCount = document.getElementById('search-count');

//handle search button click
document.getElementById('search-btn').addEventListener('click', async () => {
    const searchResult = document.getElementById('search-field');
    const searchText = searchResult.value;
    
    //show error message if the search field is empty
    if(searchText === '') {
        searchCount.textContent = '';
        searchedBooks.textContent = '';
        toggleAlert1('none');
        toggleAlert2('block');
    }
    //if there is input then display search results 
    else {
        toggleAlert2('none');
        toggleSpinner('block');
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        displayBookDetails(data.docs);
        displaySearchCount(data);
    }

});
//display total results shown
const displaySearchCount = data => {
    searchCount.textContent = '';
    const smallElement = document.createElement('small');
    smallElement.innerText = `
        Showing ${data.docs.length} best matched results of ${data.numFound}
    `;
    searchCount.appendChild(smallElement);
}

//show book details
const displayBookDetails = books => {
    //if an empty array is returned show proper error message.
    if(books.length === 0) {
        searchCount.textContent = '';
        searchedBooks.textContent = '';
        toggleAlert1('block');
        toggleSpinner('none');
    }
    //if arry of books are returned then show them in cards 
    else {
        searchCount.textContent = '';
        searchedBooks.textContent = ''
        toggleAlert1('none');
        toggleAlert2('none');
        toggleSpinner('none');
        books.forEach(book => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="col">
                <div class="card h-100">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" atl="Book cover" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <h6 class="card-title">${'First published: '+book.first_publish_year}</h6>
                    <p class="card-text">${book.author_name}</p>
                </div>
                </div>
            </div>
            `;
            searchedBooks.appendChild(div);
        });
    }
}

// display/hide alert 1
const toggleAlert1 = alert => {
    document.getElementById('alert1').style.display = alert; 
}
// display/hide alert 2
const toggleAlert2 = alert => {
    document.getElementById('alert2').style.display = alert; 
}
//display/hide spinner
const toggleSpinner = spinner => {
    document.getElementById('spinner').style.display = spinner; 
}