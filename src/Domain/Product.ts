import $ from 'jquery';
import { Base } from './common/display.abstract';

export class Product extends Base {
  private static readonly productsContainer = $('#productContainer');
  private static readonly innerProductsContainer = $('#products');

  constructor(
    id: number,
    public name: string,
    public price: number,
    public imageUrl: string
  ) {
    super(id);
  }

  applyDiscount(discountPercentage: number) {
    this.price -= (this.price * discountPercentage) / 100;
  }

  getProductId() {
    return this.id;
  }

  static displayProductOnScreen(products: Product[]) {
    Product.productsContainer.prepend('<h3>Products</h3>');

    products.forEach(product => {
      const productCard = `
                    <div class="product-card">
                        <img src="${product.imageUrl}" alt="${
        product.name
      }" class="product-image">
                        <div class="product-details">
                            <div class="product-name">${product.name}</div>
                            <div class="product-price">$${product.price}</div>
                            <button class="add-to-cart-btn" data-product-id="${product.getProductId()}">Add to Cart</button>
                        </div>
                    </div>`;

      Product.innerProductsContainer.append(productCard);
    });
  }

  static genrateDummyProducts() {
    let products: Product[] = [];

    for (let i = 1; i <= 20; i++) {
      const productName = `Product ${i}`;
      const productPrice = Math.floor(Math.random() * 1000) + 100;
      const imageUrl = `https://picsum.photos/200?random=${i}`;
      const product = new Product(i, productName, productPrice, imageUrl);
      products.push(product);
    }

    return products;
  }
}
