import React from 'react';

const CardProd = (props) => {
  return (
        <div class="card_prod" >
            <img src={props.img} class="card-img-top" alt="pic"/>
            <div class="card-body">
                <h5 class="card-title-card-prod">{props.header}</h5>
                <p class="card-text">{props.p}</p>
                <a href={props.href} class="btn btn-primary">{props.a}</a>
            </div>
        </div>
    
  );
};

export default CardProd;
