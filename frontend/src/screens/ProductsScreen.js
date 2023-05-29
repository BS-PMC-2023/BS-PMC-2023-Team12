import React from 'react';
import CardProd from '../components/ProductScreen/CardProd';
import { useLocation } from 'react-router-dom';

const PRODUCTS = [
  {
    id: 1,
    img: '/camera.jpg',
    header: 'Camera',
    p: 'ציוד צילום',
    a: 'צפה בזמינות',
    href: './CamerasScreen',
  },
  {
    id: 2,
    img: '/microphone.jpg',
    header: 'Recording',
    p: 'ציוד הקלטה',
    a: 'צפה בזמינות',
    href: './RecordingScreen',
  },
  {
    id: 3,
    img: '/ipad.jpg',
    header: 'Tablets',
    p: 'טאבלטים',
    a: 'צפה בזמינות',
  },
  {
    id: 4,
    img: '/tripod.jpg',
    header: 'Tripod',
    p: 'חצובות',
    a: 'צפה בזמינות',
  },
  {
    id: 5,
    img: '/projector.jpg',
    header: 'Projectors',
    p: 'מקרנים',
    a: 'צפה בזמינות',
  },
  {
    id: 6,
    img: '/cables.jpg',
    header: 'Cables',
    p: 'כבלים',
    a: 'צפה בזמינות',
  },
  {
    id: 7,
    img: '/lights.jpg',
    header: 'Lights',
    p: 'תאורה',
    a: 'צפה בזמינות',
  },
  {
    id: 8,
    img: '/convertors.jpg',
    header: 'Convertos',
    p: 'ממירים',
    a: 'צפה בזמינות',
  },
];

const ProductsScreen = () => {
  const { search } = useLocation();

  const keyword = search ? search.split('?')[1] : '';

  const newSearch = 'http://localhost:3000/';

  const filteredProducts = PRODUCTS.filter(
    (product) =>
      product.header.toLowerCase().includes(keyword.toLowerCase()) ||
      product.p.toLowerCase().includes(keyword.toLowerCase())
  );

  if (filteredProducts.length === 0) {
    return <h1> "{keyword}" לא קיים מוצר בשם</h1>;
  }

  return (
    <div>
      <h1> </h1>
      <div className="row row-cols-3 g-4">
        {filteredProducts.map((product) => (
          <div className="col" key={product.id}>
            <CardProd
              img={product.img}
              header={product.header}
              p={product.p}
              a={product.a}
              href={newSearch + product.href}
            />
          </div>
        ))}
      </div>
      <h1> </h1>
    </div>
  );
};

export default ProductsScreen;
