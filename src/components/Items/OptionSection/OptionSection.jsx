import React, { useContext, useState } from 'react';
//import PropTypes from 'prop-types';
import {
  PatternRotation,
  StyledBlockName,
  StyledButton,
  StyledDimensions,
  StyledDivDimens,
  StyledImg,
  StyledInput,
  StyledLi,
  StyledMoreButton,
  StyledP,
  StyledSelect,
  StyledTextArea,
  WrapButtons,
  Wrapper,
  WrapperButtons,
} from './OptionSection.styled';
import { ProductContext } from 'context/ContextProvider';
import EdgePreview from './EdgePreview/EdgePreview';
import SvgHoverComponent from './SvgHoverComponent/SvgHoverComponent';

const OptionSection = ({ close }) => {
  const [rotation, setRotation] = useState(90);
  const [edgeBlock, setEdgeBlock] = useState(false);
  const [formCount, setFormCount] = useState(1);

  const {
    product,
    language,
    setEdgeSide,
    setWidth,
    setHeight,
    setPatternDirection,
    setEdgeWidth,
    setCustomAmount,
    setComment,
    hoverContent,
    createDetailList,
    clearStates,
   
  } = useContext(ProductContext);

  const { dimensions } = product;

  const handleOpenEdgeBlock = () => {
    setEdgeBlock(true);
  };

  const handleCloseEdgeBlock = () => {
    setEdgeBlock(false);
    setEdgeWidth(null);
    setEdgeSide([]);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    createDetailList(formCount);
    close();
  };

  const handleImageClick = e => {
    const newRotation = rotation === 0 ? 90 : 0;
    setRotation(newRotation);
    e.target.style.transform = `rotate(${newRotation.toString()}deg)`;
    if (rotation === 90) {
      e.target.style.width = `90px`;
      e.target.style.marginLeft = `0px`;
    } else {
      e.target.style.width = `125px`;
      e.target.style.marginLeft = `25px`;
    }
    setPatternDirection(newRotation !== 0 ? 'horizontal' : 'vertical');
  };

  const handleDetailCounter = () => {
    setFormCount(prevCount => prevCount + 1);
    createDetailList(formCount);
    clearStates()
  };

  return (
    <section className="option">
      <div className="modal-window">
        
          <form  onSubmit={handleFormSubmit}>
          {[...Array(formCount)].map((_, index) => (
              <div key={index}>
                <Wrapper>
                  <StyledBlockName>Деталь {index + 1}</StyledBlockName>
                  <StyledBlockName>
                    {language === 'ua' ? 'Розміри деталі:' : 'Рaзмeры детали:'}
                    <SvgHoverComponent
                      dimensions={hoverContent.dimensionsContent}
                    />
                  </StyledBlockName>
                  <StyledDimensions>
                    <StyledLi>
                      <StyledDivDimens>
                        <StyledInput
                          width={true}
                          onChange={e => setWidth(e.target.value)}
                          type="number"
                          name="width"
                          id="width"
                          className="width"
                          placeholder={
                            language === 'ua' ? 'Ширина, мм' : 'Ширина, мм'
                          }
                        />
                      </StyledDivDimens>
                      <StyledP>
                        Max: <span>{dimensions.width} mm</span>
                      </StyledP>
                    </StyledLi>
                    <StyledLi>
                      <StyledDivDimens>
                        <StyledInput
                          width={true}
                          onChange={e => setHeight(e.target.value)}
                          type="number"
                          name="height"
                          id="height"
                          className="height"
                          placeholder={
                            language === 'ua' ? 'Висота, мм' : 'Высота, мм'
                          }
                        />
                      </StyledDivDimens>
                      <StyledP>
                        Max: <span>{dimensions.height} mm</span>
                      </StyledP>
                    </StyledLi>
                  </StyledDimensions>
                  <StyledBlockName>
                    {language === 'ua'
                      ? 'Загальна кількість деталей по заданим розмірам:'
                      : 'Общее количество деталей по заданым размерам:'}
                    <SvgHoverComponent
                      amount={hoverContent.totalAmountContent}
                    />
                  </StyledBlockName>
                  <StyledInput
                    onChange={e => setCustomAmount(e.target.value)}
                    type="number"
                    name="total-amount"
                    placeholder="шт."
                  />
                </Wrapper>
                <div className="edge-block">
                  <StyledBlockName>
                    Кромка:
                    <SvgHoverComponent edge={hoverContent.edgeContent} />
                  </StyledBlockName>
                  <WrapperButtons>
                    <StyledButton
                      width={true}
                      type="button"
                      onClick={handleOpenEdgeBlock}
                    >
                      {language === 'ua' ? 'Так' : 'Да'}
                    </StyledButton>
                    <StyledButton
                      width={true}
                      type="button"
                      onClick={handleCloseEdgeBlock}
                    >
                      {language === 'ua' ? 'Ні' : 'Нет'}
                    </StyledButton>
                  </WrapperButtons>
                  {edgeBlock ? (
                    <div>
                      <EdgePreview />
                      <div className="field position">
                        <StyledBlockName>
                          {language === 'ua'
                            ? 'Вибрати ширину кромки:'
                            : 'Выбрать ширину кромки:'}
                        </StyledBlockName>
                        <StyledSelect
                          onChange={e => setEdgeWidth(e.target.value)}
                          name="edge-width"
                          id="edge-width"
                        >
                          <option value="">
                            {language === 'ua'
                              ? 'Вибрати ширину кромки'
                              : 'Выбрать ширину кромки'}{' '}
                          </option>
                          <option value="22*0.6">22*0.6 </option>
                          <option value="22*2">22*2</option>
                          <option value="42*2">42*2</option>
                        </StyledSelect>
                      </div>
                    </div>
                  ) : null}
                </div>
                <PatternRotation>
                  <StyledBlockName>
                    {language === 'ua'
                      ? 'Обертання текстури:'
                      : 'Вращение текстуры:'}
                    <SvgHoverComponent
                      rotation={hoverContent.rotationContent}
                    />
                  </StyledBlockName>
                  <StyledImg
                    onClick={handleImageClick}
                    src={require('./wood.jpg')}
                    alt="pattern"
                  />
                </PatternRotation>
                <div>
                  <StyledBlockName>
                    {language === 'ua'
                      ? 'Залиште свій коментар щодо замовлення:'
                      : 'Оставьте свой коментарий к заказу:'}
                    <SvgHoverComponent comment={hoverContent.commentContent} />
                  </StyledBlockName>
                  <StyledTextArea
                    onChange={e => setComment(e.target.value)}
                    name="comment"
                    id=""
                    cols="50"
                    rows="6"
                  ></StyledTextArea>
                </div>
              </div>
              ))}
            <WrapButtons>
              <StyledMoreButton onClick={handleDetailCounter}>
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



export default OptionSection;
