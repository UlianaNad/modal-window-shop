import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  StyledButton,
  StyledMoreButton,
  WrapButtons,
} from './OptionSection.styled';
import DetailDemansions from './DetailDimensions/DetailDemansions';

const OptionSection = ({ product, close, handleFormData, language }) => {
  const { dimensions } = product;
  const [customDimensions, setCustomDimensions] = useState({});
  const [edgeBlock, setEdgeBlock] = useState(false);
  const [patternDirection, setPatternDirection] = useState('horizontal');
  const [rotation, setRotation] = useState(90);
  const [comment, setComment] = useState('');
  const [edgeWidth, setEdgeWidth] = useState('');
  const [edgesSides, setEdgesSides] = useState({});
  const [totalAmount, setTotalAmount] = useState(null);

  useEffect(() => {
    const dataToSave = {
      customDimensions,
      totalAmount,
      patternDirection,
      comment,
      edgesSides,
      edgeWidth,
    };
    window.localStorage.setItem(
      `customOptions${product.id}`,
      JSON.stringify(dataToSave)
    );
    handleFormData(dataToSave);
  }, [
    customDimensions,
    edgeBlock,
    patternDirection,
    comment,
    handleFormData,
    edgesSides,
    edgeWidth,
    totalAmount,
    product,
  ]);

  const handleChangeInput = ({ target }) => {
    if (target.name === 'width' || target.name === 'height') {
      if (target.value >= 0 && target.value <= dimensions[target.name]) {
        setCustomDimensions(prevOptions => ({
          ...prevOptions,
          [`${target.name}`]: Number(target.value),
        }));
      } else {
        alert(`Check the ${target.name} size!`);
      }
    }

    if (target.name === 'total-amount' && target.value > 0) {
      setTotalAmount(target.value);
    }
  };

  const handleOpenEdgeBlock = () => {
    setEdgeBlock(true);
  };

  const handleCloseEdgeBlock = () => {
    setEdgeBlock(false);
    setEdgeWidth('');
    setEdgesSides({});
  };

  const handleChangeSelect = ({ target }) => {
    if (target.name === 'edge-width') {
      setEdgeWidth(target.value);
    }
  };

  const handleEdgeSide = useCallback(data => {
    setEdgesSides(data);
  }, []);

  const handleFormSubmit = e => {
    e.preventDefault();
    close();
  };

  const handleImageClick = e => {
    const newRotation = rotation === 0 ? 90 : 0;
    setRotation(newRotation);
    e.target.style.transform = `rotate(${newRotation}deg)`;
    if (rotation === 90) {
      e.target.style.width = `90px`;
      e.target.style.marginLeft = `0px`;
    } else {
      e.target.style.width = `125px`;
      e.target.style.marginLeft = `25px`;
    }
    setPatternDirection(newRotation === 0 ? 'horizontal' : 'vertical');
  };

  const handleChangeComment = e => {
    if (e.target) {
      setComment(e.target.value || '');
    }
  };

  const handleMoreDetail = e => {};

  return (
    <section className="option">
      <div className="modal-window">
        <form onSubmit={handleFormSubmit} action="" className="item-sizes-form">
          <DetailDemansions
            product={product}
            handleOpenEdgeBlock={handleOpenEdgeBlock}
            handleCloseEdgeBlock={handleCloseEdgeBlock}
            handleChangeSelect={handleChangeSelect}
            handleEdgeSide={handleEdgeSide}
            handleChangeInput={handleChangeInput}
            handleChangeComment={handleChangeComment}
            handleImageClick={handleImageClick}
            edgeBlock={edgeBlock}
            edgesSides={edgesSides}
            language={language}
          />
          <div>
            
          </div>
          <WrapButtons>
            <StyledMoreButton onClick={handleMoreDetail}>
              {language === 'ua' ? 'Додати деталь' : 'Добавить деталь'}
            </StyledMoreButton>
            <StyledButton type="submit">
              {language === 'ua'
                ? 'Відправити до корзини'
                : 'Отправить в корзину'}
            </StyledButton>
          </WrapButtons>
        </form>
      </div>
    </section>
  );
};

OptionSection.propTypes = {
  product: PropTypes.shape({
    dimensions: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired,
    offers: PropTypes.shape({
      price: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  close: PropTypes.func.isRequired,
  handleFormData: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
};

export default OptionSection;
