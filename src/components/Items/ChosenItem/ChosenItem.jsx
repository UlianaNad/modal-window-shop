import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Example,
  ExampleItem,
  HiddenOnPhone,
  StyledButton,
  StyledItemName,
  StyledOption,
} from './ChosenItem.styled';

const ChosenItem = ({ product, values, options, language }) => {
  const [scale, setScale] = useState(null);
  const [isimageclicked, setisimageclicked] = useState(true);
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
    setisimageclicked(true);
    setIsExampleOpen(false);
  };

  const handleExample = () => {
    setisimageclicked(false);
    setIsExampleOpen(true);
  };
  return (
    <section>
      <StyledItemName>{product.name}</StyledItemName>
      <p>
        <StyledOption>
          {language === 'ua' ? 'Розмір товару:' : 'Розмeр товара:'}
        </StyledOption>{' '}
        {language === 'ua' ? 'ширина' : 'ширина'}
        {product.dimensions.width} мм{' '}
        {language === 'ua' ? 'і висота' : 'и высота'}{' '}
        {product.dimensions.height} мм
      </p>
      <HiddenOnPhone>
        <p>
          <StyledOption>
            {language === 'ua' ? 'Товщина листа:' : 'Толщина листа:'}{' '}
          </StyledOption>
          {product.dimensions.thickness} мм
        </p>
        <p>
          <StyledOption>
            {language === 'ua' ? 'Ціна за 1 лист: ' : 'Цена за 1 лист: '}
          </StyledOption>
          {product.offers.price} {product.offers.priceCurrency}
        </p>
     
      <div>
        <StyledButton
          isimageclicked={isimageclicked ? 'true' : null}
          onClick={handleImage}
        >
          {language === 'ua' ? 'Обраний товар' : 'Выбраный товар'}
        </StyledButton>

        <StyledButton
          isimageclicked={isExampleOpen ? 'true' : null}
          onClick={handleExample}
        >
          {language === 'ua' ? 'Візуалізація порізки' : 'Визуализация порезки'}
        </StyledButton>
      </div>
      {isimageclicked ? (
        <img src={product.image} alt="" />
      ) : (
        <Example
          width={options?.customDimensions?.width}
          height={options?.customDimensions?.height}
        >
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
      )}
 </HiddenOnPhone>
      <div>
        <h2>{language === 'ua' ? 'Параметри розкрою' : 'Параметры разкроя'}</h2>
        <p>
          <StyledOption>
            {language === 'ua'
              ? 'Кількість листів у розкрої:'
              : 'Количество листов в разкрое:'}
          </StyledOption>
          {values.possibleAmountOfPieces ? values.possibleAmountOfPieces : 0}
          шт.
        </p>
        <p>
          <StyledOption>
            {language === 'ua'
              ? 'Ціна за 1 вирізаний лист:'
              : 'Цена за 1 вырезаный лист:'}
          </StyledOption>
          <span> {values.cutItemPrice ? values.cutItemPrice : 0} грн</span>
        </p>
        <p>
          <StyledOption>
            {language === 'ua'
              ? 'Загальна кількість листів для порізки:'
              : 'Общее количество листов для порезки:'}
          </StyledOption>
          <span>
            {values.AmountOfCustomParticles
              ? values.AmountOfCustomParticles
              : 0}
            шт.
          </span>
        </p>
        <p>
          <StyledOption>
            {language === 'ua' ? 'Загальна вартість:' : 'Общяя стоимость:'}
          </StyledOption>
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
