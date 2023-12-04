import React, { useCallback, useEffect, useState } from 'react';
import EdgePreview from './EdgePreview/EdgePreview';
import PropTypes from 'prop-types';
import {
  PatternRotation,
  StyledBlockName,
  StyledButton,
  StyledDimensions,
  StyledDivDimens,
  StyledImg,
  StyledInput,
  StyledLi,
  StyledP,
  StyledSelect,
  StyledTextArea,
} from './OptionSection.styled';

const OptionSection = ({ product, close, handleFormData, language }) => {
  const { dimensions } = product;
  const [customDimensions, setCustomDimensions] = useState({});
  const [edgeBlock, setEdgeBlock] = useState(false);
  const [patternDirection, setPatternDirection] = useState('horizontal');
  const [rotation, setRotation] = useState(0);
  const [comment, setComment] = useState('');
  const [edgeWidth, setEdgeWidth] = useState('')
  const [edgesSides, setEdgesSides] = useState({})
  const [totalAmount, setTotalAmount] = useState(null)

  useEffect(() => {
    const dataToSave = {
      customDimensions,
      totalAmount,
      patternDirection,
      comment,
      edgesSides,
      edgeWidth,
    };
    window.localStorage.setItem(`customOptions${product.id}`, JSON.stringify(dataToSave));
    handleFormData(dataToSave)
  }, [customDimensions, edgeBlock, patternDirection, comment, handleFormData, edgesSides, edgeWidth, totalAmount, product]);

  const handleChangeInput = ({ target }) => {
    if (target.name === 'width' || target.name === 'height') {
      if (target.value >= 0 && target.value <= dimensions[target.name]) {
        setCustomDimensions(prevOptions => ({
          ...prevOptions,
          [`${target.name }`]: Number(target.value),
        }));
      } else {
        alert(`Check the ${target.name} size!`);
      }
    }

    if (target.name === 'total-amount' && target.value > 0) {
      setTotalAmount(target.value)
    }
  };

  const handleOpenEdgeBlock = () => {
    setEdgeBlock(true);
  };

  const handleCloseEdgeBlock = () => {
    setEdgeBlock(false);
    setEdgeWidth('')
    setEdgesSides({})
  };


  const handleChangeSelect = ({ target }) => {
    if (target.name === 'edge-width'){
        setEdgeWidth(target.value)
    }
  };

  const handleEdgeSide = useCallback((data) => {
      setEdgesSides(data)
    },[]);


  const handleFormSubmit = e => {
    e.preventDefault();
    close();
  };

  const handleImageClick = e => {
    const newRotation = rotation === 0 ? 90 : 0;
    setRotation(newRotation);
    e.target.style.transform = `rotate(${newRotation}deg)`;
    if (rotation === 0) {
      e.target.style.width = `110px`;
      e.target.style.marginTop = `25px`;
    } else {
      e.target.style.width = `180px`;
      e.target.style.marginTop = `5px`;
    }
    setPatternDirection(newRotation === 0 ? 'horizontal' : 'vertical');
  };

  const handleChangeComment = e => {
    if (e.target) {
      setComment(e.target.value || '');
    }
  };

  return (
    <section className="option">
      <div className="modal-window">
        <form onSubmit={handleFormSubmit} action="" className="item-sizes-form">
          <div className="item-sizes-block">
            <StyledBlockName>{language ==="ua" ? "Розміри:" : "Рaзмeры:"}</StyledBlockName>
            <StyledDimensions>
              <StyledLi>
                <StyledDivDimens>
                  {/* Ширина */}
                  <StyledInput
                    onChange={handleChangeInput}
                    type="number"
                    name="width"
                    id="width"
                    className="width"
                    placeholder={language ==="ua" ? "Ширина, мм" : "Ширина, мм"}
                  />
                </StyledDivDimens>
                <StyledP>
                  Max: <span>{dimensions.width} mm</span>
                </StyledP>
              </StyledLi>
              <StyledLi>
                <StyledDivDimens>
                  {/* Висота */}
                  <StyledInput
                    onChange={handleChangeInput}
                    type="number"
                    name="height"
                    id="height"
                    className="height"
                    placeholder={language ==="ua" ? "Висота, мм" : "Высота, мм"}
                  />
                </StyledDivDimens>
                <StyledP>
                  Max: <span>{dimensions.height} mm</span>
                </StyledP>
              </StyledLi>
            </StyledDimensions>
            <p>
            {language ==="ua" ? "Загальна кількість деталей по заданим розмірам:" : "Общее количество деталей по заданым размерам:"}
              <StyledInput
                onChange={handleChangeInput}
                type="number"
                name="total-amount"
                placeholder='шт.'
              />
            </p>
           
          </div>
          <div className="edge-block">
            <StyledBlockName>Кромка:</StyledBlockName>
            <StyledButton type="button" onClick={handleOpenEdgeBlock}>
            {language ==="ua" ? "Так" : "Да"}
            </StyledButton>
            <StyledButton type="button" onClick={handleCloseEdgeBlock}>
            {language ==="ua" ? "Ні" : "Нет"}
            </StyledButton>
            {edgeBlock ? (
              <div>
                <EdgePreview language={language} handleEdgeSide={handleEdgeSide} />
                <div className="field position">
                  <StyledBlockName>{language ==="ua" ? "Вибрати ширину кромки:" : "Выбрать ширину кромки:"}</StyledBlockName>
                  <StyledSelect
                    onChange={handleChangeSelect}
                    name="edge-width"
                    id="edge-width"
                  >
                    <option value="">{language ==="ua" ? "Вибрати ширину кромки" : "Выбрать ширину кромки"} </option>
                    <option value="22*0.6">22*0.6 </option>
                    <option value="22*2">22*2</option>
                    <option value="42*2">42*2</option>
                  </StyledSelect>
                </div>
              </div>
            ) : null}
          </div>
          <PatternRotation>
            <StyledBlockName>{language ==="ua" ? "Обертання текстури:" : "Вращение текстуры:"}</StyledBlockName>
            <StyledImg
              onClick={handleImageClick}
              src={require('./pattern.jpg')}
              alt="pattern"
            />
          </PatternRotation>
          <div className="comment">
            <StyledBlockName>
            {language ==="ua" ? "Залиште свій коментар щодо замовлення:" : "Оставьте свой коментарий к заказу:"}
            </StyledBlockName>
            <StyledTextArea
              onChange={handleChangeComment}
              name="comment"
              id=""
              cols="50"
              rows="6"
            ></StyledTextArea>
          </div>
          <StyledButton type="submit">{language ==="ua" ? "Відправити до корзини" : "Отправить в корзину"}</StyledButton>
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
