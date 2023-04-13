import React from 'react';
import CardProd from '../components/ProductScreen/CardProd';

const ProductsScreen = () => {
  return(
    <div class="row row-cols-3 row-cols-2 ">
        <div class="col">
            <CardProd></CardProd>
        </div>
        <div class="col">
            <CardProd></CardProd>
        </div>
        <div class="col">
            <CardProd></CardProd>
        </div>
        <div class="col">
            <CardProd></CardProd>
        </div>
    </div>
  );
   
};

export default ProductsScreen;
