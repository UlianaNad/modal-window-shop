import React from 'react';
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
  WrapperButtons,
} from '../OptionSection.styled';
import EdgePreview from '../EdgePreview/EdgePreview';

const DetailDemansions = ({
  product,
  language,
  handleChangeInput,
  handleOpenEdgeBlock,
  handleCloseEdgeBlock,
  edgeBlock,
  handleEdgeSide,
  handleImageClick,
  handleChangeComment,
  handleChangeSelect,
}) => {
  const { dimensions } = product;
  return (
    <div>
      <div className="item-sizes-block">
        <StyledBlockName>
          {language === 'ua' ? 'Розміри:' : 'Рaзмeры:'}
        </StyledBlockName>
        <StyledDimensions>
          <StyledLi>
            <StyledDivDimens>
              <StyledInput
                onChange={handleChangeInput}
                type="number"
                name="width"
                id="width"
                className="width"
                placeholder={language === 'ua' ? 'Ширина, мм' : 'Ширина, мм'}
              />
            </StyledDivDimens>
            <StyledP>
              Max: <span>{dimensions.width} mm</span>
            </StyledP>
          </StyledLi>
          <StyledLi>
            <StyledDivDimens>
              <StyledInput
                onChange={handleChangeInput}
                type="number"
                name="height"
                id="height"
                className="height"
                placeholder={language === 'ua' ? 'Висота, мм' : 'Высота, мм'}
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
        </StyledBlockName>
        <StyledInput
          onChange={handleChangeInput}
          type="number"
          name="total-amount"
          placeholder="шт."
        />
      </div>
      <div className="edge-block">
        <StyledBlockName>Кромка:</StyledBlockName>
        <WrapperButtons>
          <StyledButton type="button" onClick={handleOpenEdgeBlock}>
            {language === 'ua' ? 'Так' : 'Да'}
          </StyledButton>
          <StyledButton type="button" onClick={handleCloseEdgeBlock}>
            {language === 'ua' ? 'Ні' : 'Нет'}
          </StyledButton>
        </WrapperButtons>
        {edgeBlock ? (
          <div>
            <EdgePreview language={language} handleEdgeSide={handleEdgeSide} />
            <div className="field position">
              <StyledBlockName>
                {language === 'ua'
                  ? 'Вибрати ширину кромки:'
                  : 'Выбрать ширину кромки:'}
              </StyledBlockName>
              <StyledSelect
                onChange={handleChangeSelect}
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
          {language === 'ua' ? 'Обертання текстури:' : 'Вращение текстуры:'}
        </StyledBlockName>
        <StyledImg
          onClick={handleImageClick}
          src={require('./pattern.jpg')}
          alt="pattern"
        />
      </PatternRotation>
      <div className="comment">
        <StyledBlockName>
          {language === 'ua'
            ? 'Залиште свій коментар щодо замовлення:'
            : 'Оставьте свой коментарий к заказу:'}
        </StyledBlockName>
        <StyledTextArea
          onChange={handleChangeComment}
          name="comment"
          id=""
          cols="50"
          rows="6"
        ></StyledTextArea>
      </div>
    </div>
  );
};

export default DetailDemansions;
