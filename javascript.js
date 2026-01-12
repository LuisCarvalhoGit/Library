
const myLibrary = [];
const addBtn = document.getElementById('add-button')
const mainArea = document.getElementById('main-area')
const dialog = document.querySelector('dialog')
const showButton = document.querySelector("dialog + button")
const closeButton = document.getElementById('close-dialog')
const submitForm = document.getElementById('form-modal')


function Book(title, author, pages, read) {

    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;
}

function addBookToLibrary(title, author, pages) {

    var newBook = new Book(title, author, pages, false);

    myLibrary.push(newBook)
    renderLibrary()
}

function deleteBookById(id) {

    const bookWithIndex = myLibrary.findIndex((book) => book.id == id)
    myLibrary.splice(bookWithIndex, 1)
    renderLibrary()
}

function renderLibrary() {

    mainArea.innerHTML = "";

    myLibrary.forEach(book => {
        var newCard = document.createElement('div');
        newCard.classList.add('card'); 
        newCard.innerHTML = `
            <strong>${book.title}</strong>
            <br />
            ${book.author} | ${book.pages} páginas | 
            <input type="checkbox" id="checkbox-${book.id}"/> Read
            <hr />
            <button type="button" id="${book.id}" class="delete-button-default">Delete</button>`;
        mainArea.prepend(newCard);

        document.getElementById(`${book.id}`).addEventListener('mouseenter', function() {

            this.classList.toggle('delete-button-default');
            this.classList.toggle('delete-button-active');
        })
        document.getElementById(`${book.id}`).addEventListener('mouseleave', function() {

            this.classList.toggle('delete-button-active');
            this.classList.toggle('delete-button-default');
        })

        document.getElementById(`checkbox-${book.id}`).addEventListener('click', function(event) {

            const checkboxState = this.checked

            book.read = checkboxState

        })

        document.getElementById(`${book.id}`).addEventListener('click', () => deleteBookById(book.id))
    });
}


addBookToLibrary("Atlantida", "João Ratão", 124)


showButton.addEventListener('click', function() {
    dialog.showModal()
})

closeButton.addEventListener('click', function() {
    dialog.close()
})

submitForm.addEventListener('submit', function(event) {
    event.preventDefault()

    const formData = new FormData(event.target)

    const title = formData.get('title')
    const author = formData.get('author')
    const pages = formData.get('pages')

    addBookToLibrary(title, author, pages)
})

addBtn.addEventListener('mouseenter', function() {

    this.classList.toggle('button-default');
    this.classList.toggle('button-active');

})
addBtn.addEventListener('mouseleave', function() {

    this.classList.toggle('button-active');
    this.classList.toggle('button-default');

})

deleteBtn.addEventListener('mouseenter', function() {

    this.classList.toggle('button-default');
    this.classList.toggle('button-active');

})
deleteBtn.addEventListener('mouseleave', function() {

    this.classList.toggle('button-active');
    this.classList.toggle('button-default');

})






