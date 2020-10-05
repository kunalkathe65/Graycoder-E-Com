export const addProductToLocalStorage = (product, next) => {
  let cart = [];
  const productInCart = {
    _id: product._id,
    category: { name: product.category.name },
    name: product.name,
    description: product.description,
    stock: product.stock,
    price: product.price,
  };
  if (typeof window !== undefined) {
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }
    cart.push(productInCart);
    localStorage.setItem('cart', JSON.stringify(cart));
    next();
  }
};

export const addProductsInCart = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem('cart')) {
      return JSON.parse(localStorage.getItem('cart'));
    } else {
      return false;
    }
  }
};

export const removeFromLocalStorage = (productId) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart')).filter(
        (product) => product._id !== productId
      );
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  }
};
