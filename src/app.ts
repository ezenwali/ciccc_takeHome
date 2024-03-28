import $ from 'jquery';
import { Cart } from './Domain/Cart';
import { Customer } from './Domain/Customer';
import { Product } from './Domain/Product';

$(function () {
  // current user
  let user: Customer;
  let cartObj: Cart;
  const products = Product.genrateDummyProducts();

  // Selecting various html tags using their id hence #product
  const inputFieldName = $('#name');
  const form = $('form');
  const inputFieldPassword = $('#password');
  const body = $('body');

  //error listener
  body.on('DOMSubtreeModified', () => {
    setTimeout(() => {
      $('#error-message').remove();
      $('#success-message').remove();
    }, 5000);
  });

  //Adding event listerners to the input fields to listen for change
  let userName = '';
  let password = '';

  inputFieldName.on('change', () => {
    const inputValue = String(inputFieldName.val()).trim();

    if (inputValue) {
      userName = inputValue;
    }
  });

  inputFieldPassword.on('change', () => {
    const passowrdValue = String(inputFieldName.val()).trim();

    if (passowrdValue) {
      password = passowrdValue;
    }
  });

  form.on('submit', function (event) {
    event.preventDefault();

    try {
      user = new Customer(userName, password);
      cartObj = new Cart(1, user, []);

      Cart.updateCartDisplay(cartObj);
      if (user) {
        form.remove();
        body.prepend(
          `<div id="success-message">${user.sendWelcomeNote()}</div>`
        );

        // display product
        Product.displayProductOnScreen(products);
        $('.add-to-cart-btn').on('click', function () {
          const productId = $(this).data('product-id');

          const product = products.find(product => {
            return product.getProductId() == Number(productId);
          });

          if (product) {
            cartObj.addProduct({ product, qty: 1 });
            Cart.updateCartDisplay(cartObj);
          }
        });
      }
    } catch (error: any) {
      const errorMessage: string = error.message || 'An error occurred';
      body.prepend(`<div id="error-message">${errorMessage}</div>`);
    }
  });
});
