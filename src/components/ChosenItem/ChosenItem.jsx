import React from 'react';
import PropTypes from 'prop-types';

const ChosenItem = ({ products }) => {
  return (
    <section>
        <ul>
      {products.map(product => (
        <li key={product.id}>
          <h2 className="item-name">{product.name}</h2>
          <p>
            Розмір товару: товщина {product.dimensions.height} мм і висота{' '}
            {product.dimensions.height} мм
          </p>
          <p>Товщина листа {product.dimensions.thickness} мм</p>
          <p>Кількість листів</p>
          <p>
            Ціна за шт {product.offers.price}
            {product.offers.priceCurrency}
          </p>
          <p>Товщина кромки</p>
          <img src={product.image} alt="" />
        </li>
      ))}
    </ul>
    </section>
  );
};

ChosenItem.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      dimensions: PropTypes.shape({
        height: PropTypes.number.isRequired,
        thickness: PropTypes.number.isRequired,
      }).isRequired,
      offers: PropTypes.shape({
        price: PropTypes.number.isRequired,
        priceCurrency: PropTypes.string.isRequired,
      }).isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ChosenItem;
