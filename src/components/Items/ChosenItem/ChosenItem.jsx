import React, { useContext, useEffect, useState } from 'react';
//import PropTypes from 'prop-types';
import {
  Example,
  ExampleItem,
  HiddenOnPhone,
  LeftArrow,
  StyledItemName,
  StyledOption,
  StyledSpan,
  TopArrow,
  WrapInfo,
} from './ChosenItem.styled';
import { ProductContext } from 'context/ContextProvider';

const ChosenItem = () => {
  const [scale, setScale] = useState(null);
  const {
    product,
    language,
    edgeSide,
    width,
    height,
    edgeWidth,
    computedValues,
  } = useContext(ProductContext);

  useEffect(() => {
    let scaleToFit;

    if (width < 500 && height < 500) {
      scaleToFit = 0.6;
    } else if (width >= 500 && width < 1600 && height >= 500 && height < 1600) {
      scaleToFit = 0.4;
    } else if (
      (width >= 1600 || width < 2700) &&
      (height >= 1600 || height < 2700)
    ) {
      scaleToFit = 0.3;

    }


    setScale(scaleToFit);
  }, [width, height]);

  const rotate = true;

  return (
    <section>
      <StyledItemName>{product.name}</StyledItemName>

        <WrapInfo>
          <StyledOption>
            {language === 'ua' ? 'Розмір товару:' : 'Розмeр товара:'}
          </StyledOption>
          <StyledSpan>
            {language === 'ua' ? 'ширина ' : 'ширина '}
            {product.dimensions.width} мм
            {language === 'ua' ? ' і висота ' : 'и высота '}
            {product.dimensions.height} мм
          </StyledSpan>
        </WrapInfo>

        <WrapInfo>
          <StyledOption>
            {language === 'ua' ? 'Товщина листа:' : 'Толщина листа:'}
          </StyledOption>
          <StyledSpan>{product.dimensions.thickness} мм</StyledSpan>
        </WrapInfo>
        <WrapInfo>
          <StyledOption>
            {language === 'ua'
              ? 'Кількість листів у розкрої:'
              : 'Количество листов в разкрое:'}
          </StyledOption>
          <StyledSpan>
            {computedValues.possibleAmountOfPieces
              ? computedValues.possibleAmountOfPieces
              : 0}{' '}
            шт.
          </StyledSpan>
        </WrapInfo>
        <WrapInfo>
          <StyledOption>
            {language === 'ua' ? 'Ціна за 1 лист: ' : 'Цена за 1 лист: '}
          </StyledOption>
          <StyledSpan>
            {' '}
            {product.offers.price} {product.offers.priceCurrency}
          </StyledSpan>
        </WrapInfo>

        <WrapInfo>
          <StyledOption>
            {language === 'ua'
              ? 'Загальна кількість листів для порізки: '
              : 'Общее количество листов для порезки:'}
          </StyledOption>
          <StyledSpan>
            {computedValues.AmountOfCustomParticles
              ? computedValues.AmountOfCustomParticles
              : 0}{' '}
            шт.
          </StyledSpan>
        </WrapInfo>
        {edgeWidth ? (
          <WrapInfo>
            <StyledOption>
              {language === 'ua' ? 'Товщина кромки:' : 'Толщина кромки:'}
            </StyledOption>
            <StyledSpan>{edgeWidth ? edgeWidth : 0}</StyledSpan>
          </WrapInfo>
        ) : null}

      <HiddenOnPhone>
        <StyledItemName>
          {language === 'ua' ? 'Візуалізація порізки' : 'Визуализация порезки'}
        </StyledItemName>
        <Example width={width} height={height}>
          <LeftArrow></LeftArrow>
          <TopArrow></TopArrow>
          <LeftArrow rotate={rotate}></LeftArrow>
          <TopArrow rotate={rotate}></TopArrow>
          <ExampleItem width={width} height={height} scale={scale} />
          {Array.isArray(edgeSide) &&
            edgeSide.map((edge, i) => (
              <ExampleItem
                key={i}
                width={width}
                height={height}
                scale={scale}
                edgeside={edge}
              ></ExampleItem>
            ))}
        </Example>
      </HiddenOnPhone>
    </section>
  );
};

export default ChosenItem;

// ChosenItem.propTypes = {
//   product: PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     dimensions: PropTypes.shape({
//       width: PropTypes.number.isRequired,
//       height: PropTypes.number.isRequired,
//       thickness: PropTypes.number.isRequired,
//     }).isRequired,
//     offers: PropTypes.shape({
//       price: PropTypes.number.isRequired,
//       priceCurrency: PropTypes.string.isRequired,
//     }).isRequired,
//     image: PropTypes.string.isRequired,
//   }).isRequired,
//   values: PropTypes.shape({
//     possibleAmountOfPieces: PropTypes.number,
//     cutItemPrice: PropTypes.number,
//     AmountOfCustomParticles: PropTypes.number,
//     totalPrice: PropTypes.number,
//   }).isRequired,
//   options: PropTypes.shape({
//     customDimensions: PropTypes.shape({
//       width: PropTypes.number,
//       height: PropTypes.number,
//     }),
//   }),
//   language: PropTypes.string,
// };
