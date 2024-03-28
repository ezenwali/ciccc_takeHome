import $ from 'jquery';
import type { Customer } from './Customer';
import type { Product } from './Product';
import { Base } from './common/display.abstract';

type productInCart = {
  product: Product;
  qty: number;
};

export class Cart extends Base {
  private static readonly cartContainer = $('#cart');
  private static readonly body = $('body');
  private static readonly tax = 0.12;

  constructor(
    id: number,
    public customer: Customer,
    public products: productInCart[]
  ) {
    super(id);
  }

  calculateTotalPrice(): number {
    const totalPrice = this.products.reduce((accum, current) => {
      return accum + current.product.price * current.qty;
    }, 0);

    return totalPrice;
  }

  addProduct(_product: productInCart) {
    //check if product in cart and incre3ase qty by one
    const { product } = _product;
    const index = this.products.findIndex(
      item => item.product.getProductId() === product.getProductId()
    );

    if (index !== -1) {
      this.products[index].qty++;
    } else {
      this.products.push(_product);
      Cart.body.prepend(`<div id="success-message">Add ${product.name}</div>`);
    }
  }

  static updateCartDisplay(cart: Cart) {
    Cart.cartContainer.empty(); /// empty screen
    Cart.cartContainer.css({
      border: '1px solid #ddd'
    });

    const totalCost = cart.calculateTotalPrice();
    const tax = totalCost * Cart.tax; // Assuming 10% tax rate
    const finalCost = totalCost + tax;

    // Check if cart has any products
    if (cart.products.length > 0) {
      Cart.cartContainer.append('<h3>Cart</h3>');
      Cart.cartContainer.append(
        `<div class="cart-total">Total Cost: $${totalCost.toFixed(2)}</div>`
      );
      Cart.cartContainer.append(
        `<div class="cart-tax">Tax (12%): $${tax.toFixed(2)}</div>`
      );
      Cart.cartContainer.append(
        `<div class="cart-final-cost">Final Cost: $${finalCost.toFixed(
          2
        )}</div>`
      );
      cart.products.forEach(({ product, qty }) => {
        const productItem = `
          <div class="cart-item">
            <span class="product-name">${product.name}</span>
            <span class="product-quantity">Quantity: ${qty}</span>
            <span class="product-price">$${product.price}</span>
          </div>`;

        // Append product HTML to the cart
        Cart.cartContainer.append(productItem);
      });
    } else {
      Cart.cartContainer.append('<p>Your cart is empty.</p>');
    }
  }
}
