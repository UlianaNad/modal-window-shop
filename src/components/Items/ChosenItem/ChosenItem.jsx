import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Example,
  ExampleItem,
  StyledButton,
  StyledOption,
} from './ChosenItem.styled';

const ChosenItem = ({ product, values, options }) => {
  console.log(options);
  const [scale, setScale] = useState(null);
  const [isImageOpen, setIsImageOpen] = useState(true);
  const [isExampleOpen, setIsExampleOpen] = useState(false);

  useEffect(() => {
    const originalWidth = options?.customDimensions?.width || 1;
    const originalHeight = options?.customDimensions?.height || 1;

    let scaleToFit;

    if (originalWidth < 500 && originalHeight < 500) {
      scaleToFit = 0.4;
    } else if (
      originalWidth >= 500 &&
      originalWidth < 1500 &&
      originalHeight >= 500 &&
      originalHeight < 1500
    ) {
      scaleToFit = 0.5;
    } else if (
      originalWidth >= 1500 &&
      originalHeight >= 1500 &&
      originalWidth <= 3000 &&
      originalHeight <= 3000
    ) {
      scaleToFit = 0.7;
    } else if (originalWidth > 3000 && originalHeight > 3000) {
      scaleToFit = 0.3;
    }

    // Ensure a minimum scale factor to prevent the size from becoming too small
    scaleToFit = Math.max(scaleToFit, 0.1);

    setScale(scaleToFit);
  }, [options]);

  const handleImage = () => {
    setIsImageOpen(true);
    setIsExampleOpen(false);
  };

  const handleExample = () => {
    setIsImageOpen(false);
    setIsExampleOpen(true);
  };
  return (
    <section>
      <h2 className="item-name">{product.name}</h2>
      <p>
        <StyledOption>Розмір товару:</StyledOption> товщина{' '}
        {product.dimensions.width} мм і висота {product.dimensions.height} мм
      </p>
      <p>
        <StyledOption>Товщина листа: </StyledOption>
        {product.dimensions.thickness} мм
      </p>
      <p>
        <StyledOption>Ціна за 1 лист: </StyledOption>
        {product.offers.price} {product.offers.priceCurrency}
      </p>
      <div>
        <StyledButton
          isOpenImg={isImageOpen ? isImageOpen : null}
          onClick={handleImage}
        >
          Обраний товар
        </StyledButton>

        <StyledButton
          isOpenImg={isExampleOpen ? isExampleOpen : null}
          onClick={handleExample}
        >
          Візуалізація порізки
        </StyledButton>
      </div>
      {isImageOpen ? (
        <img src={product.image} alt="" />
      ) : (
        <Example
          width={options?.customDimensions?.width}
          height={options?.customDimensions?.height}
        >
          {Array.isArray(options?.edgesSides) &&
            options.edgesSides.map((edge, i) => (
              <ExampleItem
                key={i}
                width={options?.customDimensions?.width}
                height={options?.customDimensions?.height}
                scale={scale}
                edge={edge}
              ></ExampleItem>
            ))}
        </Example>
      )}

      <div>
        <h2>Параметри розкрою</h2>
        <p>
          <StyledOption>Кількість листів у розкрої:</StyledOption>
          {values.possibleAmountOfPieces
            ? values.possibleAmountOfPieces
            : 0}{' '}
          шт.
        </p>
        <p>
          <StyledOption>Ціна за 1 вирізаний лист:</StyledOption>
          <span> {values.cutItemPrice ? values.cutItemPrice : 0} грн</span>
        </p>
        <p>
          <StyledOption>Загальна кількість листів для порізки:</StyledOption>
          <span>
            {values.AmountOfCustomParticles
              ? values.AmountOfCustomParticles
              : 0}
            шт.
          </span>
        </p>
        <p>
          <StyledOption>Загальна вартість:</StyledOption>
          <span> {values.totalPrice ? values.totalPrice : 0}</span> грн
        </p>
      </div>
    </section>
  );
};

export default ChosenItem;

ChosenItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    dimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      thickness: PropTypes.number.isRequired,
    }).isRequired,
    offers: PropTypes.shape({
      price: PropTypes.number.isRequired,
      priceCurrency: PropTypes.string.isRequired,
    }).isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};
