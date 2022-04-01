//  filter items 
let filterBtns = document.getElementsByClassName('filter-btn')
let storeItems = document.getElementsByClassName('store-item')
for (let btn of filterBtns) {
	btn.onclick = function filterDons(event) {
		event.preventDefault()
		let filter = event.target.dataset.filter
		for (let item of storeItems) {
			if (filter == 'all') {
				item.style.display = 'block'
			}
			else {
				if (item.classList.contains(filter)) {
					item.style.display = 'block'
				}
				else item.style.display = 'none'
			}
		}
	}
}

// search items

let search = document.getElementById('search-item')
let poisk = document.getElementById('store-item-name')
search.oninput = function searchSim() {
	let searchIdentify = search.value.toLowerCase().trim()
	for (let item of storeItems) {
		if (item.textContent.includes(searchIdentify)) {
			item.style.display = 'block'
		}
		else { item.style.display = 'none' }
	}
}

// open images 

let imgs = document.getElementsByClassName('img-container')
let lightBox = document.querySelector('.lightbox-container');
let lightBoxItem = document.querySelector('.lightbox-item');
for (let img of imgs) {
	img.addEventListener('click', (event) => {
		if (event.target.closest('.store-item-icon')) return
		let source = event.target.src
		lightBox.classList.add('show')
		lightBoxItem.style.backgroundImage = `url("${source}")`



	})
}

// close images

let btnClose = document.querySelector('.lightbox-close')
btnClose.onclick = function closeModal() {
	lightBox.classList.remove('show')
}

// add item to the basket

let cards = document.querySelectorAll('.card')
let basket = document.getElementById('cart-info')
let cart = document.querySelector('.cart')
let addItemToBasket = document.querySelector('.store-item-icon')
let cartTotal = document.querySelector('.cart-total-container')
basket.addEventListener('click', () => {
	resultItems()
	cart.classList.toggle('show-cart')
})
for (let card of cards) {
	card.addEventListener('click', (event) => {

		let name = event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent
		let price = '$ ' + event.target.parentElement.parentElement.nextElementSibling.children[0].children[1].children[0].textContent
		let fullPath = event.target.parentElement.previousElementSibling.src;
		let count = 1;
		let similar = document.getElementsByClassName('cart-item')
		let pos = fullPath.indexOf('img') + 3; //use the 3 to get rid of the 'img' string
		let partPath = fullPath.slice(pos);
		const item = {};
		item.img = `img-cart${partPath}`;
		for (let i = 0; i < similar.length; i++) {
			let similarImgSrc = similar[i].children[0].src
			let pos = similarImgSrc.indexOf('img') + 8
			let partSimilarImgSrc = similarImgSrc.slice(pos)
			if (partSimilarImgSrc == partPath) {
				similar[i].children[1].children[2].children[0].textContent = +similar[i].children[1].children[2].children[0].textContent + 1
				resultItems()
				return
			}
		}

		cartTotal.insertAdjacentHTML('beforebegin', `<div class="cart-item d-flex justify-content-between text-capitalize my-3">
						<img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
						<div class="item-text">
							<p id="cart-item-title" class="font-weight-bold mb-0">${name}</p>
							<span id="cart-item-price" class="mb-0">${price}</span> <span>items <span>${count}</span></span>
						</div>
						<a href="#" id='cart-item-remove' class="cart-item-remove">
							<i class="fas fa-trash"></i>
						</a>
					</div>`)
		resultItems()
	})
}

// calculate items and price

function resultItems() {

	let similar = document.getElementsByClassName('cart-item')
	let result = 0;
	let items = 0;
	for (let i = 0; i < similar.length; i++) {
		let price = similar[i].children[1].children[1].textContent.slice(1)
		let item = similar[i].children[1].children[2].children[0].textContent;
		result += price * item;
		items += +item
	}
	cart.lastChild.previousElementSibling.previousElementSibling.children[1].children[0].textContent = result.toFixed(2)
	basket.children[1].children[1].textContent = result.toFixed(2)
	basket.children[1].children[0].textContent = items
}

// delete single item from the basket

cart.addEventListener('click', (event) => {
	event.preventDefault()
	if (event.target.classList.contains('fa-trash')) {
		if (+event.target.parentElement.previousElementSibling.children[2].children[0].textContent > 1) {
			event.target.parentElement.previousElementSibling.children[2].children[0].textContent = +event.target.parentElement.previousElementSibling.children[2].children[0].textContent - 1
		}
		else {
			event.target.closest('.cart-item').remove()
			resultItems()
		}
	}
})
let clearCart = document.getElementById('clear-cart')

// delete all items from the basket

clearCart.addEventListener('click', (event) => {
	event.preventDefault()
	while (cartTotal.previousElementSibling) {
		cartTotal.previousElementSibling.remove()
	}
	resultItems()
})

// navigation scroll onclick 

let navLinks = document.getElementsByClassName('nav-link')
for (let link of navLinks) {
	link.addEventListener('click', (event) => {
		event.preventDefault()
	})
}
let store = document.getElementById('store')
let storeLink = document.getElementById('storeLink')
storeLink.onclick = function () {
	window.scrollTo({
		left: 0,
		top: store.offsetTop - 68,
		behavior: "smooth"
	});
};

let about = document.getElementById('about')
let aboutLink = document.getElementById('aboutLink')
aboutLink.onclick = function () {
	window.scrollTo({
		left: 0,
		top: about.offsetTop - 75,
		behavior: "smooth"
	});
};

let home = document.querySelector('.container-fluid')
let homeLink = document.getElementById('homeLink')
homeLink.onclick = function () {
	window.scrollTo({
		left: 0,
		top: home.offsetTop,
		behavior: "smooth"
	});
};

let mainExplore = document.getElementById('mainExplore')
mainExplore.addEventListener('click', (event) => {
	event.preventDefault()
	window.scrollTo({
		left: 0,
		top: store.offsetTop - 25,
		behavior: "smooth"
	});
})
let logoHome = document.querySelector('.navbar-brand')
logoHome.addEventListener('click', (event) => {
	event.preventDefault()
	window.scrollTo({
		left: 0,
		top: home.offsetTop,
		behavior: "smooth"
	});
})