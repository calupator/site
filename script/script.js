
import { dataProducts } from "../data.js";

const productData = JSON.parse(dataProducts);
const productContainer = document.querySelector('.products');

// productData.forEach(({ id, name, image, description, price, color, quantity, url }) => { !!! все параметры !!!
productData.forEach(({ id, name, image, description, price, url }) => {
	const productsItem = document.createElement('article');
	productsItem.classList.add('products_item');
	productsItem.setAttribute('data-id', id);

	const productsItemPhotoWrp = document.createElement('div');
	productsItemPhotoWrp.classList.add('products_item_photo_wrp');

	const productsItemLink = document.createElement('a');
	productsItemLink.classList.add('products_item_link');
	productsItemLink.href = url;

	const productsItemLinkPhoto = document.createElement('img');
	productsItemLinkPhoto.classList.add('products_item_link_photo');
	productsItemLinkPhoto.src = image;
	productsItemLinkPhoto.alt = name;
	productsItemLinkPhoto.height = 420;

	const productsItemContent = document.createElement('div');
	productsItemContent.classList.add('products_item_content');

	const productsItemName = document.createElement('h3');
	productsItemName.classList.add('products_item_name');
	productsItemName.textContent = name;

	const productsItemDesc = document.createElement('p');
	productsItemDesc.classList.add('products_item_desc');
	productsItemDesc.textContent = description;

	const productsItemPrice = document.createElement('p');
	productsItemPrice.classList.add('products_item_price');
	productsItemPrice.textContent = '$' + price;

	const productsItemBtn = document.createElement('button');
	productsItemBtn.classList.add('products_item_btn');
	productsItemBtn.type = 'button';

	const imageSVG = `<svg width="27" height="25" viewBox="0 0 27 25" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M21.876 22.2662C21.921 22.2549 21.9423 22.2339 21.96 22.2129C21.9678 22.2037 21.9756 22.1946 21.9835 22.1855C22.02 22.1438 22.0233 22.0553 22.0224 22.0105C22.0092 21.9044 21.9185 21.8315 21.8412 21.8315C21.8375 21.8315 21.8336 21.8317 21.8312 21.8318C21.7531 21.8372 21.6653 21.9409 21.6719 22.0625C21.6813 22.1793 21.7675 22.2662 21.8392 22.2662H21.876ZM8.21954 22.2599C8.31873 22.2599 8.39935 22.1655 8.39935 22.0496C8.39935 21.9341 8.31873 21.8401 8.21954 21.8401C8.12042 21.8401 8.03973 21.9341 8.03973 22.0496C8.03973 22.1655 8.12042 22.2599 8.21954 22.2599ZM21.9995 24.2662C21.9517 24.2662 21.8878 24.2662 21.8392 24.2662C20.7017 24.2662 19.7567 23.3545 19.6765 22.198C19.5964 20.9929 20.4937 19.9183 21.6953 19.8364C21.7441 19.8331 21.7928 19.8315 21.8412 19.8315C22.9799 19.8315 23.9413 20.7324 24.019 21.8884C24.0505 22.4915 23.8741 23.0612 23.4898 23.5012C23.1055 23.9575 22.5764 24.2177 21.9995 24.2662ZM8.21954 24.2599C7.01532 24.2599 6.03973 23.2709 6.03973 22.0496C6.03973 20.8291 7.01532 19.8401 8.21954 19.8401C9.42371 19.8401 10.3994 20.8291 10.3994 22.0496C10.3994 23.2709 9.42371 24.2599 8.21954 24.2599ZM21.1984 17.3938H9.13306C8.70013 17.3938 8.31586 17.1005 8.20331 16.6775L4.27753 2.24768H1.52173C0.993408 2.24768 0.560547 1.80859 0.560547 1.27039C0.560547 0.733032 0.993408 0.292969 1.52173 0.292969H4.99933C5.43134 0.292969 5.81561 0.586304 5.9281 1.01025L9.85394 15.4391H20.5576L24.1144 7.13379H12.2578C11.7286 7.13379 11.2957 6.69373 11.2957 6.15649C11.2957 5.61914 11.7286 5.17908 12.2578 5.17908H25.5886C25.9091 5.17908 26.2141 5.34192 26.3896 5.61914C26.566 5.89539 26.5984 6.23743 26.4697 6.547L22.0795 16.807C21.9193 17.1653 21.5827 17.3938 21.1984 17.3938Z" />
			</svg>`;

	const productsItemBtnSpan = document.createElement('span');
	productsItemBtnSpan.textContent = 'Add to Cart';

	productsItemLink.appendChild(productsItemLinkPhoto);
	productsItemPhotoWrp.appendChild(productsItemLink);

	productsItemContent.appendChild(productsItemName);
	productsItemContent.appendChild(productsItemDesc);
	productsItemContent.appendChild(productsItemPrice);

	productsItemBtn.insertAdjacentHTML('beforeend', imageSVG);
	productsItemBtn.appendChild(productsItemBtnSpan);

	productsItem.appendChild(productsItemPhotoWrp);
	productsItem.appendChild(productsItemContent);
	productsItem.appendChild(productsItemBtn);

	productContainer.appendChild(productsItem);
});

const cartProductsContainer = document.querySelector('.cart_products_container');

const cartProducts = document.querySelectorAll('.products_item_btn');
cartProducts.forEach(productEl => {
	productEl.addEventListener('click', addProducts)
});

let headerCartCount = document.querySelector('.count');

function removeProduct(event) {
	const parent = event.target.parentNode.closest('.cart_product');
	parent.remove();

	const count = Number.parseInt(headerCartCount.textContent) - 1;
	document.querySelector('.count').textContent = count;
	if (cartProductsContainer.children.length === 0) {
		document.querySelector('.cart_items_title').remove();
		document.querySelector('.count').remove();
	}
}

function addProducts(event) {
	const parent = event.target.parentNode.closest('.products_item');
	const currId = parent.getAttribute('data-id');
	let selectedEl = '';
	for (const key in productData) {
		if (Object.hasOwnProperty.call(productData, key)) {
			if (productData[key].id == currId) {
				selectedEl = productData[key];
				break;
			}
		}
	}

	if (cartProductsContainer.children.length === 0) {
		const cartItemsTitle = document.createElement('h2');
		cartItemsTitle.classList.add('cart_items_title');
		cartItemsTitle.textContent = 'Cart Items';
		cartItemsTitle.id = 'cart';

		const cartItems = document.querySelector('.cart_items');
		cartItems.insertBefore(cartItemsTitle, cartProductsContainer);
	}

	const cartProduct = document.createElement('li');
	cartProduct.classList.add('cart_product');

	const cartProductBtnDel = document.createElement('button');
	cartProductBtnDel.classList.add('cart_product_btn_del');
	cartProductBtnDel.type = 'button';
	cartProductBtnDel.textContent = 'Удалить';
	cartProductBtnDel.addEventListener('click', removeProduct);

	cartProduct.appendChild(cartProductBtnDel);

	const cartProductContent = document.createElement('div');
	cartProductContent.classList.add('cart_product_content');

	const cartProductImg = document.createElement('img');
	cartProductImg.classList.add('cart_product_img');
	cartProductImg.src = selectedEl.image;
	cartProductImg.alt = selectedEl.name;

	const cartProductDesc = document.createElement('div');
	cartProductDesc.classList.add('cart_product_desc');

	const cartProductName = document.createElement('h2');
	cartProductName.classList.add('cart_product_name');
	cartProductName.textContent = selectedEl.name;

	const cartProductPriceLabel = document.createElement('p');
	cartProductPriceLabel.classList.add('cart_product_price_label');
	cartProductPriceLabel.textContent = 'Price: $';

	const cartProductPrice = document.createElement('span');
	cartProductPrice.classList.add('cart_product_price');
	cartProductPrice.textContent = selectedEl.price;

	const cartProductColorLabel = document.createElement('p');
	cartProductColorLabel.classList.add('cart_product_color_label');
	cartProductColorLabel.textContent = 'Color: ';

	const cartProductColor = document.createElement('span');
	cartProductColor.classList.add('cart_product_color');
	cartProductColor.textContent = selectedEl.color;

	const cartProductSizeLabel = document.createElement('p');
	cartProductSizeLabel.classList.add('cart_product_size_label');
	cartProductSizeLabel.textContent = 'Size: ';

	const cartProductSize = document.createElement('span');
	cartProductSize.classList.add('cart_product_color');
	cartProductSize.textContent = selectedEl.size;

	const cartProductQty = document.createElement('div');
	cartProductQty.classList.add('cart_product_qty');

	const cartInputLabel = document.createElement('label');
	cartInputLabel.classList.add('cart_input_label');
	cartInputLabel.textContent = 'Quantity:';

	const cartInputQuantity = document.createElement('input');
	cartInputQuantity.classList.add('cart_input_quantity');
	cartInputQuantity.type = 'number';
	cartInputQuantity.value = 1;
	cartInputQuantity.min = 0;
	cartInputQuantity.max = selectedEl.quantity;
	// cartInputQuantity.data-cip-id="cIPJQ342845639";

	const cartInputQuantityMax = document.createElement('span');
	cartInputQuantityMax.classList.add('cart_input_quantity_max');
	cartInputQuantityMax.textContent = ' / ' + selectedEl.quantity;

	cartProduct.appendChild(cartProductContent);

	cartProductDesc.appendChild(cartProductName);
	cartProductDesc.appendChild(cartProductPriceLabel);
	cartProductColorLabel.appendChild(cartProductColor);
	cartProductDesc.appendChild(cartProductColorLabel);
	cartProductSizeLabel.appendChild(cartProductSize);
	cartProductDesc.appendChild(cartProductSizeLabel);
	cartProductDesc.appendChild(cartProductQty);
	cartProductDesc.appendChild(cartInputLabel);
	cartProductDesc.appendChild(cartInputQuantity);
	cartProductDesc.appendChild(cartInputQuantityMax);

	cartProductContent.appendChild(cartProductImg);
	cartProductContent.appendChild(cartProductDesc);

	cartProductPriceLabel.appendChild(cartProductPrice);

	cartProductsContainer.appendChild(cartProduct);

	const headerCartLink = document.querySelector('.header_cart_link');

	headerCartCount = document.querySelector('.count');

	if (!headerCartCount || headerCartCount.textContent === '') {
		headerCartCount = document.createElement('span');
		headerCartCount.classList.add('count');
		headerCartCount.textContent = 0;
		headerCartLink.appendChild(headerCartCount);
	}

	const count = Number.parseInt(headerCartCount.textContent) + 1;
	document.querySelector('.count').textContent = count;
}