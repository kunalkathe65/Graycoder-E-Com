export const addProductToLocalStorage = (product, productId, next) => {
  let cart = [];
  const productInCart = {
    _id: product._id,
    category: { name: product.category.name },
    name: product.name,
    description: product.description,
    stock: product.stock,
    price: product.price,
    qty: 1,
  };
  if (typeof window !== undefined) {
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
      const isFound = cart.find((product) => product._id === productId);
      if (isFound) {
        cart.forEach((product) => {
          if (product._id === productId) {
            product.qty += 1;
          }
        });
        localStorage.setItem('cart', JSON.stringify(cart));
      } else {
        cart.push(productInCart);
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    } else {
      cart.push(productInCart);
      localStorage.setItem('cart', JSON.stringify(cart));
    }
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

export const removeProductFromLocalStorage = (productId) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart')).filter(
        (product) => product._id !== productId
      );
      localStorage.setItem('cart', JSON.stringify(cart));
      return true;
    } else {
      return false;
    }
  }
};

export const updateQtyOfProduct = (qty, productId) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
      cart.find((product) => product._id === productId).qty = qty;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  } else {
    return false;
  }
};

export const qtyOfProduct = (productId) => {
  if (typeof window !== undefined) {
    if (localStorage.getItem('cart')) {
      let cart = JSON.parse(localStorage.getItem('cart'));
      return cart.find((product) => product._id === productId).qty;
    }
  }
};

export const calculateFinalAmt = () => {
  if (typeof window !== undefined) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (localStorage.getItem('cart')) {
      let finalAmt = 0;
      for (let i = 0; i < cart.length; i++) {
        finalAmt = finalAmt + cart[i].price * cart[i].qty;
      }
      return finalAmt;
    }
  }
};
