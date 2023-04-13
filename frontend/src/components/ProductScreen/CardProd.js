import React from 'react';

const CardProd = (props) => {
  return (
    <div className='card_prod'>
        <div class="card" >
            <img src="/SCE.png" class="card-img-top" alt="pic"/>
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    </div>
    
  );
};

export default CardProd;
