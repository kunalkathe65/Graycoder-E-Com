import React, { useEffect, useState } from 'react';

import Base from './Base';
import Card from './Card';
import Checkout from './Checkout';
import { addProductsInCart } from './helper/cartHelper';

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [isCartEmpty, setIsCartEmpty] = useState(false);
  const [reload, setReload] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const cart = addProductsInCart();
    cart.length > 0 ? setProducts(cart) : setIsCartEmpty(true);
  }, [reload, refresh]);

  return (
    <Base title='Cart' description='Time for checkout'>
      <div className='row'>
        {isCartEmpty ? (
          <h2 style={{ textAlign: 'center' }}>Cart is empty!</h2>
        ) : (
          <React.Fragment>
            <div className='col-xs-12 col-sm-12 col-md-4 offset-md-1 col-lg-4 offset-lg-1 col-xl-4 offset-xl-1'>
              <h2 style={{ textAlign: 'center' }}>Cart Items</h2>

              {!isCartEmpty &&
                products.map((product, index) => (
                  <Card
                    key={index}
                    product={product}
                    showRemoveBtn={true}
                    reload={reload}
                    setReload={setReload}
                    refresh={refresh}
                    setRefresh={setRefresh}
                  />
                ))}
            </div>
            {!isCartEmpty && <Checkout />}
          </React.Fragment>
        )}
      </div>
    </Base>
  );
};

export default Cart;
