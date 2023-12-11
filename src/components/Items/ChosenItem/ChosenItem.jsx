import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Example,
  ExampleItem,
  HiddenOnPhone,
  LeftArrow,
  StyledItemName,
  StyledOption,
  TopArrow,
} from './ChosenItem.styled';

const ChosenItem = ({ product, values, options, language }) => {
  const [scale, setScale] = useState(null);

  useEffect(() => {
    const originalWidth = options?.customDimensions?.width || 1;
    const originalHeight = options?.customDimensions?.height || 1;

    let scaleToFit;

    if (originalWidth < 500 && originalHeight < 500) {
      scaleToFit = 0.6;
    } else if (
      (originalWidth >= 500 && originalWidth < 1600) &&
      (originalHeight >= 500 && originalHeight < 1600)
    ) {
      scaleToFit = 0.4;
      console.log(scaleToFit);
    } else if (
      (originalWidth >= 1600 || originalWidth < 2700) &&
      (originalHeight >= 1600 || originalHeight < 2700)
    ) {
      scaleToFit = 0.3;
      console.log(scaleToFit);
    }

    // Ensure a minimum scale factor to prevent the size from becoming too small
    // scaleToFit = Math.max(scaleToFit, 0.1);

    setScale(scaleToFit);
  }, [options]);

  const rotate = true;
  return (
    <section>
      <StyledItemName>{product.name}</StyledItemName>
      <StyledOption>
        {language === 'ua' ? 'Розмір товару:' : 'Розмeр товара:'}
      </StyledOption>
      {language === 'ua' ? 'ширина ' : 'ширина '}
      {product.dimensions.width} мм
      {language === 'ua' ? ' і висота ' : 'и высота '}
      <StyledOption>
        {language === 'ua' ? 'Товщина листа:' : 'Толщина листа:'}
      </StyledOption>
      {product.dimensions.thickness} мм
      <StyledOption>
        {language === 'ua'
          ? 'Кількість листів у розкрої:'
          : 'Количество листов в разкрое:'}
      </StyledOption>
      {values.possibleAmountOfPieces ? values.possibleAmountOfPieces : 0} шт.
      <StyledOption>
        {language === 'ua' ? 'Ціна за 1 лист: ' : 'Цена за 1 лист: '}
      </StyledOption>
      {product.offers.price} {product.offers.priceCurrency}
      <div>
        <StyledOption>
          {language === 'ua'
            ? 'Загальна кількість листів для порізки: '
            : 'Общее количество листов для порезки:'}
        </StyledOption>
        <span>
          {values.AmountOfCustomParticles ? values.AmountOfCustomParticles : 0}{' '}
          шт.
        </span>
        {options?.edgeWidth ? (
          <div>
            <StyledOption>
              {language === 'ua' ? 'Товщина кромки:' : 'Толщина кромки:'}
            </StyledOption>
            <span>{options?.edgeWidth ? options?.edgeWidth : 0}</span>
          </div>
        ) : null}
      </div>
      <HiddenOnPhone>
        <StyledItemName>
          {language === 'ua' ? 'Візуалізація порізки' : 'Визуализация порезки'}
        </StyledItemName>
        <Example
          width={options?.customDimensions?.width}
          height={options?.customDimensions?.height}
        >
          <LeftArrow></LeftArrow>
          <TopArrow></TopArrow>
          <LeftArrow rotate={rotate}></LeftArrow>
          <TopArrow rotate={rotate}></TopArrow>
          <ExampleItem
            width={options?.customDimensions?.width}
            height={options?.customDimensions?.height}
            scale={scale}
          />
          {Array.isArray(options?.edgesSides) &&
            options.edgesSides.map((edge, i) => (
              <ExampleItem
                key={i}
                width={options?.customDimensions?.width}
                height={options?.customDimensions?.height}
                scale={scale}
                edgesSides={edge}
              ></ExampleItem>
            ))}
        </Example>
      </HiddenOnPhone>
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
  values: PropTypes.shape({
    possibleAmountOfPieces: PropTypes.number,
    cutItemPrice: PropTypes.number,
    AmountOfCustomParticles: PropTypes.number,
    totalPrice: PropTypes.number,
  }).isRequired,
  options: PropTypes.shape({
    customDimensions: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
    }),
  }),
  language: PropTypes.string,
};
