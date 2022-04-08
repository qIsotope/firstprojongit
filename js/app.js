
let mailArray = [];
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
let isExist = document.getElementsByClassName('redItem')

let newITEM = document.createElement('div')
newITEM.classList.add('redItem')
document.querySelector(".cart-total-container").before(newITEM);

let mailObject = {};
for (let card of cards) {
	card.addEventListener('click', (event) => {
		checkout.classList.remove('disabled')
		let modalList = document.querySelector('.modal-list')
		let name = event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent
		let price = '$ ' + event.target.parentElement.parentElement.nextElementSibling.children[0].children[1].children[0].textContent
		let fullPath = event.target.parentElement.previousElementSibling.src;
		let count = 1;
		let similar = document.getElementsByClassName('cart-item')
		let pos = fullPath.indexOf('img') + 3; //use the 3 to get rid of the 'img' string
		let partPath = fullPath.slice(pos);
		const item = {};
		item.img = `img-cart${partPath}`;
		mailObject = {
			imgPath: item.img.slice(8),
			price: price
		}
		mailArray.push(mailObject)
		for (let i = 0; i < similar.length; i++) {
			let modalImages = document.querySelectorAll('.modal-image')
			for (let imgmod of modalImages) {
				let modalPos = imgmod.src.indexOf('img') + 8
				let modalSrc = imgmod.src.slice(modalPos)
				let similarImgSrc = similar[i].children[0].src
				let pos = similarImgSrc.indexOf('img') + 8
				let partSimilarImgSrc = similarImgSrc.slice(pos)
				if (partSimilarImgSrc == partPath && partPath == modalSrc) {
					imgmod.parentElement.nextElementSibling.children[1].textContent = +imgmod.parentElement.nextElementSibling.children[1].textContent + 1;
					similar[i].children[1].children[2].children[0].textContent = +similar[i].children[1].children[2].children[0].textContent + 1
					imgmod.parentElement.nextElementSibling.children[2].children[0].textContent = '$ ' + (similar[i].children[1].children[2].children[0].textContent * event.target.parentElement.parentElement.nextElementSibling.children[0].children[1].children[0].textContent)
					resultItems()
					updateStorage()
					return
				}

			}
		}

		newITEM.innerHTML += `<div class="cart-item d-flex justify-content-between text-capitalize my-3">
						<img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
						<div class="item-text">
							<p id="cart-item-title" class="font-weight-bold mb-0">${name}</p>
							<span id="cart-item-price" class="mb-0">${price}</span> <span>items <span>${count}</span></span>
						</div>
						<a href="#" id='cart-item-remove' class="cart-item-remove">
							<i class="fas fa-trash"></i>
						</a>
					</div>`;


		// add item to modal list
		modalList.insertAdjacentHTML('beforeend', `
		<div class="modal-item">
		<div class="modal-img">
			<img class="modal-image" src="${item.img}" alt="">
		</div>
		<div class="modal-info">
			<div class="item-name">${name}</div>
			<div class="item-number">1</div>
			<div class="price-info">
				<span class="item-price">${price}</span>
				</span>
			</div>
		</div>
	</div>`)

		resultItems()
		updateStorage()
	})
}

// open/close basketlist

basket.addEventListener('click', () => {
	resultItems()
	cart.classList.toggle('show-cart')
	updateStorage()
})

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
	document.querySelector('.modal-number').textContent = `Items: ${items}`
	document.querySelector('.modal-allprice').textContent = `$ ${result.toFixed(2)}`

}

// delete single item from the basket

cart.addEventListener('click', (event) => {
	event.preventDefault()
	let modalImages = document.querySelectorAll('.modal-image')
	if (event.target.classList.contains('fa-trash')) {


		if (+event.target.parentElement.previousElementSibling.children[2].children[0].textContent > 1) {
			event.target.parentElement.previousElementSibling.children[2].children[0].textContent = +event.target.parentElement.previousElementSibling.children[2].children[0].textContent - 1
			for (let imgmod of modalImages) {
				let modalPos = imgmod.src.indexOf('img') + 8
				let modalSrc = imgmod.src.slice(modalPos)
				let basketSrc = event.target.parentElement.previousElementSibling.previousElementSibling.src.slice(modalPos)
				if (modalSrc == basketSrc) {
					imgmod.parentElement.nextElementSibling.children[1].textContent = +imgmod.parentElement.nextElementSibling.children[1].textContent - 1;
					resultItems()
					imgmod.parentElement.nextElementSibling.children[2].children[0].textContent = '$ ' + (imgmod.parentElement.nextElementSibling.children[1].textContent * event.target.parentElement.previousElementSibling.children[1].textContent.slice(1))
					updateStorage()
				}
			}
			resultItems()
			updateStorage()
		}
		else {
			if (document.querySelectorAll('.cart-item').length == 1) {
				checkout.classList.add('disabled')
			}
			event.target.closest('.cart-item').remove()
			for (let imgmod of modalImages) {
				let modalPos = imgmod.src.indexOf('img') + 8
				let modalSrc = imgmod.src.slice(modalPos)
				let basketSrc = event.target.parentElement.previousElementSibling.previousElementSibling.src.slice(modalPos)
				if (modalSrc == basketSrc) {
					imgmod.parentElement.parentElement.remove()
				}
			}
			resultItems()
			updateStorage()
		}
		let abra = document.querySelector('.redItem')
		if (abra.children.length == 0) {
			localStorage.removeItem('todos')
			localStorage.removeItem('modal')
		}


		for (let i = 0; i < mailArray.length; i++) {
			for (let imgmod of modalImages) {
				let modalPos = imgmod.src.indexOf('img') + 8
				if (mailArray[i].imgPath == event.target.parentElement.previousElementSibling.previousElementSibling.src.slice(modalPos)) {
					let myIndex = mailArray.indexOf(mailArray[i])
					if (myIndex !== -1) {
						mailArray.splice(myIndex, 1);
					}
					return
				}
			}
		}
	}


})

// delete all items from the basket

let clearCart = document.getElementById('clear-cart')
clearCart.addEventListener('click', (event) => {
	event.preventDefault()
	let newDivs = document.getElementsByClassName('cart-item')
	for (let i = 0; i < newDivs.length; i++) {
		while (newDivs.length !== 0) {
			newDivs[i].remove()
		}
	}
	let modalItems = document.querySelectorAll('.modal-item').forEach(item => item.remove())
	mailArray = [];
	resultItems()
	localStorage.removeItem('todos')
	localStorage.removeItem('modal')
	checkout.classList.add('disabled')
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
		top: store.offsetTop - 68,
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

//creating a localStorage with info about items and info about status of basket

const updateStorage = () => {
	let cartClasslist = cart.classList
	localStorage.setItem('classlists', cartClasslist.value)
	let parent = document.querySelector('.redItem')
	let modalList = document.querySelector('.modal-list')
	let modalhtml = modalList.innerHTML.trim()
	if (modalhtml.length) {
		localStorage.setItem('modal', modalhtml)
	}
	else { localStorage.removeItem('modal') }
	let html = parent.innerHTML.trim()
	if (html.length) {
		localStorage.setItem('todos', html)
	}
	else {
		localStorage.removeItem('todos')
	}
}

// getting finished todo items from the local storage

const initialState = () => {
	if (localStorage.getItem('todos') !== null) {
		document.querySelector('.redItem').innerHTML = localStorage.getItem('todos')
		resultItems()
	}
	if (localStorage.getItem('modal') !== null) {
		document.querySelector('.modal-list').innerHTML = localStorage.getItem('modal')
	}
	if (localStorage.getItem('classlists') === null) {
		cart.classList = 'cart'
	}
	else { cart.classList = localStorage.getItem('classlists') }

}
initialState()

// Validate a number phone input

let modalButton = document.querySelector('.modal-link')
let inputPhone = document.getElementById('phone')
let reg = /\([3][8][0]\)\s\d{2}\-\d{4}\-\d{3}/gm
let optionalSpan = document.querySelector('.optional-span')
let modalForm = document.querySelector('#form')
let succesOrder = document.querySelector('.succes-order')
modalForm.addEventListener('submit', (event) => {

	if (reg.test(inputPhone.value)) {
		console.log(inputPhone.value, '2')
		let coverDiv = document.querySelector('.jquery-modal')
		event.preventDefault()
		sendForm()
		succesOrder.classList.remove('closemodal')
		setTimeout(() => {
			succesOrder.classList.add('closemodal')
			coverDiv.style.display = 'none'
			document.body.style.overflow = 'auto'
			document.querySelectorAll('.modal-item').forEach((item) => item.remove())
			document.querySelectorAll('.cart-item').forEach((item) => item.remove())
			resultItems()
		}, 1000);
		localStorage.removeItem('todos')
		localStorage.removeItem('modal')

	}
	else {
		console.log(inputPhone.value, '1')
		event.preventDefault()
		optionalSpan.classList.add('displaynone')
		setTimeout(() => {
			optionalSpan.classList.remove('displaynone')
		}, 1000);
	}
})

function sendForm() {
	let formData = new FormData(modalForm)
	formData.append('Products', JSON.stringify(mailArray));

	let xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				console.log('Отправлено');
			}
		}
		else console.log('error')
	}

	xhr.open('POST', 'mail.php', true);
	xhr.send(formData);

	modalForm.reset();
}

function disable() {
	if (document.querySelectorAll('.cart-item').length !== 0) {
		checkout.classList.remove('disabled')
	}
}
disable()