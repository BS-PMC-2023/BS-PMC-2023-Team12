import React from 'react';
import CardProd from '../components/ProductScreen/CardProd';
import { Routes, Route, useParams } from 'react-router-dom';
import { Form } from 'react-bootstrap';

const products = [
  {
    
    img: "camera.jpg",
    header: "Camera",
    p: "ציוד צילום",
<<<<<<< HEAD
=======
    a:"צפה בזמינות",
>>>>>>> master
    href: "./CamerasScreen"
  },
  {
    img: "/microphone.jpg",
    header: "Recording",
    p:"ציוד הקלטה" ,
    a:"צפה בזמינות",
    href: "./RecordingScreen"
  },
  {
    img:"/ipad.jpg" ,
    header:"Apple" ,
    p:"טאבלטים" ,
    a:"צפה בזמינות",
    href: "./AppleScreen"
  },
  {
    img:"/tripod.jpg" ,
    header:"Tripod" ,
    p:"חצובות" ,
    a:"צפה בזמינות",
    href: "./TripodScreen"
  },
  {
    img:"/projector.jpg" ,
    header:"Projectors" ,
    p:"מקרנים" ,
    a:"צפה בזמינות",
    href: "./ProjectorsScreen"
  },
  {
    img:"/cables.jpg" ,
    header:"Cables" ,
    p:"כבלים" ,
    a:"צפה בזמינות",
    href: "./CablesScreen"
  },
  {
    img:"/lights.jpg" ,
    header:"Lights" ,
    p:"תאורה" ,
    a:"צפה בזמינות",
    href: "./LightsScreen"
  },
  {
    img:"/convertors.jpg" ,
    header:"Convertos" ,
    p:"ממירים" ,
    a:"צפה בזמינות",
    href: "./ConvertorsScreen"
  }
];

const ProductsScreen = () => {
  const [keyword, setKeyword] = React.useState('');
  const [filteredProducts, setFilteredProducts] = React.useState([]);

  React.useEffect(() => {
    if (keyword === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => product.p === keyword);
      setFilteredProducts(filtered);
    }
  }, [keyword]);

  const productCards = filteredProducts.map((product) => (
    <div className="col" key={product.id}>
      <CardProd
        img={product.img}
        header={product.header}
        p={product.p}
        a={product.a}
        href={product.href}
      />
    </div>
  ));

  return (
    <div>
      <Form>
        <Form.Group controlId="searchForm">
          <Form.Control
            type="text"
            placeholder="Search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </Form.Group>
      </Form>
      <div className="row row-cols-3 g-4">{productCards}</div>
    </div>
  );
};

export default ProductsScreen;
