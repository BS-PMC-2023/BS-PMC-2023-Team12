import React from 'react';
import CardProd from '../components/ProductScreen/CardProd';

const ProductsScreen = () => {
  return(
      <div class="row row-cols-3 g-4 ">
        <div class="col">
            <CardProd 
            //img="/SCE.png" 
            img="camera.jpg"
            header="Camera" 
            p="ציוד צילום" 
            a="צפה בזמינות"
            href="./CamerasScreen"
            />
        </div>
        <div class="col">
            <CardProd
            img="/microphone.jpg" 
            header="Recording" 
            p="ציוד הקלטה" 
            a="צפה בזמינות"
            href="./RecordingScreen"
            />
        </div>
        <div class="col">
            <CardProd
            img="/ipad.jpg" 
            header="Apple" 
            p="טאבלטים" 
            a="צפה בזמינות"/>
        </div>
        <div class="col">
            <CardProd
            img="/tripod.jpg" 
            header="Tripod" 
            p="חצובות" 
            a="צפה בזמינות"/>
        </div>
        <div class="col">
            <CardProd
            img="/projector.jpg" 
            header="Projectors" 
            p="מקרנים" 
            a="צפה בזמינות"/>
        </div>
        <div class="col">
            <CardProd
            img="/cables.jpg" 
            header="Cables" 
            p="כבלים" 
            a="צפה בזמינות"/>
        </div>
        <div class="col">
            <CardProd
            img="/lights.jpg" 
            header="Lights" 
            p="תאורה" 
            a="צפה בזמינות"/>
        </div>
        <div class="col">
            <CardProd
            img="/convertors.jpg" 
            header="Convertos" 
            p="ממירים" 
            a="צפה בזמינות"/>
        </div>
      </div>
  );
   
};

export default ProductsScreen;
