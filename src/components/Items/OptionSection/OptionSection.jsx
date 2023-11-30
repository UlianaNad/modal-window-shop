import React, { useCallback, useEffect, useMemo, useState } from 'react';
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

const OptionSection = ({ product, close }) => {
  const { dimensions, offers } = product;

  const [customOptions, setCustomOptions] = useState({});
  const [edgeBlock, setEdgeBlock] = useState(false);
  const [patternDirection, setPatternDirection] = useState('horizontal');
  const [rotation, setRotation] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const dataToSave = {
      customOptions,
      patternDirection,
      comment,
    };
    window.localStorage.setItem('customOptions', JSON.stringify(dataToSave));
  }, [customOptions, edgeBlock, patternDirection, comment]);

  const handleChangeInput = ({ target }) => {
    if (target.name === 'width' || target.name === 'height') {
      if (target.value >= 0 && target.value <= dimensions[target.name]) {
        setCustomOptions(prevOptions => ({
          ...prevOptions,
          [`custom${
            target.name.charAt(0).toUpperCase() + target.name.slice(1)
          }`]: target.value,
        }));
      } else {
        alert(`Check the ${target.name} size!`);
      }
    }

    if (target.name === 'total-amount' && target.value > 0) {
      setCustomOptions(prevOptions => ({
        ...prevOptions,
        totalAmount: target.value,
      }));
    }
  };

  const handleOpenEdgeBlock = () => {
    setEdgeBlock(true);
  };

  const handleCloseEdgeBlock = () => {
    setEdgeBlock(false);
    setCustomOptions({
      ...customOptions,
      edgeWidth: null,
      edgeSides: null,
    });
  };

  const handleChangeSelect = ({ target }) => {
    if (target.name === 'edge-width') {
      setCustomOptions({
        ...customOptions,
        edgeWidth: target.value,
      });
    }
  };

  const handleEdgeSide = useCallback(
    data => {
      setCustomOptions({
        ...customOptions,
        edgeSides: data,
      });
    },
    [customOptions]
  );

  const computedValues = useMemo(() => {
    const startSquare = dimensions.width * dimensions.height;
    const customSquare = customOptions.customHeight * customOptions.customWidth;
    const possibleAmountOfPieces = Math.ceil(startSquare / customSquare);
    const cutItemPrice =
      customOptions.totalAmount !== null
        ? Math.round(offers.price / possibleAmountOfPieces)
        : null;
    const AmountOfCustomParticles = Math.ceil(
      customOptions.totalAmount / possibleAmountOfPieces
    );
    const totalPrice =
      customOptions.totalAmount && AmountOfCustomParticles > 0
        ? Math.round(offers.price * AmountOfCustomParticles)
        : null;

    return {
      possibleAmountOfPieces,
      cutItemPrice,
      AmountOfCustomParticles,
      totalPrice,
    };
  }, [customOptions, dimensions, offers]);

  const handleFormSubmit = e => {
    e.preventDefault();

    console.log('Before setting customOptions:', {
      edgeBlock,
      patternDirection,
      comment,
    });

    if (edgeBlock && patternDirection !== undefined && comment !== undefined) {
      setCustomOptions(prevOptions => ({
        ...prevOptions,
        ...computedValues,
      }));
    }

    console.log('After setting customOptions:', customOptions);

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
            <StyledBlockName>Розміри:</StyledBlockName>
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
                    placeholder="Ширина, мм"
                  />
                  {/* <span className="input-group-dimension-addon">mm</span> */}
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
                    placeholder="Довжина, мм"
                  />
                  {/* <span className="input-group-dimension-addon">mm</span> */}
                </StyledDivDimens>
                <StyledP>
                  Max: <span>{dimensions.height} mm</span>
                </StyledP>
              </StyledLi>
            </StyledDimensions>
            <p>
              Загальна кількість деталей по заданим розмірам:
              <input
                onChange={handleChangeInput}
                type="number"
                name="total-amount"
              />
              шт.
            </p>
            <p>
              Кількість листів у розкрої:
              <span className="cut_piece">
                {' '}
                {computedValues.possibleAmountOfPieces
                  ? computedValues.possibleAmountOfPieces
                  : 0}
              </span>
              шт.
            </p>
            <p>
              Ціна за 1 вирізаний лист:
              <span>
                {' '}
                {computedValues.cutItemPrice
                  ? computedValues.cutItemPrice
                  : 0}{' '}
              </span>
              грн
            </p>

            <p>
              Загальна кількість листів для порізки
              <span>
                {' '}
                {computedValues.AmountOfCustomParticles
                  ? computedValues.AmountOfCustomParticles
                  : 0}
              </span>
              шт. i їх загальна вартість
              <span>
                {' '}
                {computedValues.totalPrice ? computedValues.totalPrice : 0}
              </span>
              грн
            </p>
          </div>
          <div className="edge-block">
            <StyledBlockName>Кромка:</StyledBlockName>
            <StyledButton type="button" onClick={handleOpenEdgeBlock}>
              Так
            </StyledButton>
            <StyledButton type="button" onClick={handleCloseEdgeBlock}>
              Ні
            </StyledButton>
            {edgeBlock ? (
              <div>
                <EdgePreview handleEdgeSide={handleEdgeSide} />
                <div className="field position">
                  <StyledBlockName>Вибрати ширину кромки:</StyledBlockName>
                  <StyledSelect
                    onChange={handleChangeSelect}
                    name="edge-width"
                    id="edge-width"
                  >
                    <option value="">Виберіть ширину кромки </option>
                    <option value="22*0.6">22*0.6 </option>
                    <option value="22*2">22*2</option>
                    <option value="42*2">42*2</option>
                  </StyledSelect>
                </div>
              </div>
            ) : null}
          </div>
          <PatternRotation>
            <StyledBlockName>Обертання текстури:</StyledBlockName>
            <StyledImg
              onClick={handleImageClick}
              src={require('./pattern.jpg')}
              alt="pattern"
            />
          </PatternRotation>
          <div className="comment">
            <StyledBlockName>
              Залиште свій коментар щодо замовлення:
            </StyledBlockName>
            <StyledTextArea
              onChange={handleChangeComment}
              name="comment"
              id=""
              cols="50"
              rows="6"
            ></StyledTextArea>
          </div>
          <StyledButton type="submit">Відправити до корзини</StyledButton>
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
};

export default OptionSection;
