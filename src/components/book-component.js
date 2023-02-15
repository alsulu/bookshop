import { BooksApi } from '../api';
import appConstants from '../common/constants';
//import { render } from '../router';
import { goTo, routes } from '../router';
import { getBook, setBook } from '../service/books';
import { getCartByUser, addToCart } from '../api/cartApi';

class BookComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});
        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'book-container');

        wrapper.innerHTML = `
            <img class="book-container__cover" alt="book image">
            <h4 class="book-container__title"></h4>
            <p class="book-container__subtitle"></p>
            <p class="book-container__price"></p>
            <button class="book-container__button">Add to Cart</button>
        `

        /*const style = document.createElement('style');

        style.textContent = `
        `

        shadow.appendChild(style);*/
        shadow.appendChild(wrapper);
    }

    connectedCallback() {
        const shadow = this.shadowRoot;
        const id = this.getAttribute('id');
        const isAdded = this.getAttribute('isAdded') || false;
        //const search = this.getAttribute('search');
        const book = getBook(id);
        let count = 0;

        
        //if (book.isbn13 === id) {
            const wrapper = shadow.querySelector('.book-container');
            //console.log(book);

            const cover = shadow.querySelector('.book-container__cover');
            cover.setAttribute('src', book.image);
            const title = shadow.querySelector('.book-container__title');
            title.textContent = book.title;
            const subtitle = shadow.querySelector('.book-container__subtitle');
            subtitle.textContent = book.subtitle;
            const price = shadow.querySelector('.book-container__price');
            price.textContent = book.price;
            const button = shadow.querySelector('.book-container__button');
            if (isAdded) {
                button.innerText = "Added"
                button.setAttribute("disabled", true)
            }
            /*getCartByUser(1)
                .then(data => {
                    console.log(data); 
                    data.forEach(el=> {if (el.bookId === id) {
                        button.innerText = "Added"
                        button.setAttribute("disabled", true)
                    }})
                })
                .catch (err => console.log(err.message))*/
            
            button.addEventListener('click', e => {
                count++
                e.stopPropagation()
                if (isAdded) {
                    /*button.innerText = "Added"
                    button.setAttribute("disabled", true)*/
                    console.log("added")
                }
                else {
                    addToCart({"bookId": id, "count": 1, "userId": 1})
                    button.innerText = "Added"
                    button.setAttribute("disabled", true)
                }
            })
            
            wrapper.addEventListener('click', (e) => {
                e.stopPropagation()
                const url = routes.Book.reverse({book: id})
                goTo(url)
            })
        //}
    }

    /*updateBook(book) {
        const shadow = this.shadowRoot;
    
        const title = shadow.querySelector('.book-container__title');
        title.textContent = book.title;
        const author = shadow.querySelector('.book-container__author')
        author.textContent = book.authors;
        const price = shadow.querySelector('.book-container__price');
        price.textContent = book.price;
        const descripion = shadow.querySelector('.book-container__descripion');
        descripion.textContent = book.desc;
        const publisher = shadow.querySelector('.book-container__publisher');
        publisher.textContent = "Publisher:" + book.publisher;
        const isbn13 = shadow.querySelector('.book-container__isbn13');
        isbn13.textContent = "ISBN13:" + book.isbn13;

        const cover = shadow.querySelector('.book-container__cover');
        cover.setAttribute('src', book.image);
        const cart = document.querySelector('.book-container__cart-btn');
        cart.setAttribute('data-art', book.isbn13);
        const wishlist = document.querySelector('.book-container__wishlist-btn');
        wishlist.setAttribute('data-art', book.isbn13);
        
        const similar = shadow.querySelector('.book-container__similar__content');
        getBooksBySearch(book.desc)
            .then((books) => {
                const fragment = document.createDocumentFragment();
                books.array.forEach(el => {
                    if (!getBook(el.isbn13))
                        setBook(el);

                    const div = document.createElement(div);
                    div.innerHTML = `
                        <img class="book-container__similar__content__cover" src="${el.image}" alt="similar book">
                        <h4 class="book-container__similar__content__title">${el.title}</h4>
                        <p class="book-container__similar__content__subtitle">${el.subtitle}</p>
                        <p class="book-container__similar__content__price">${el.price}</p>
                    `;
                    fragment.appendChild(div);
                })
                similar.appendChild(fragment)
            })
            .catch(error => console.log(error))
    }
    */

}

customElements.define('book-component', BookComponent)