document.getElementById('search-btn').addEventListener('click', async () => {
    const searchResult = document.getElementById('search-field');
    const searchText = searchResult.value;
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    displayBookDetails(data.docs);
});

const displayBookDetails = books => {
    // console.log(books);
    const searchedBooks = document.getElementById('books-cards');
    books.forEach(book => {
        // console.log(book.title);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="col">
            <div class="card h-100">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" atl="Book cover" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional    content. This content is a little bit longer.</p>
            </div>
            </div>
        </div>
        `;
        searchedBooks.appendChild(div);
    });
}