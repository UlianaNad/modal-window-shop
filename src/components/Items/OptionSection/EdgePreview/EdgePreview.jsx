import React, { useEffect, useState } from 'react';
import { ChoiceWrap, FieldChoiceBottom, FieldChoiceLeft, FieldChoiceRight, FieldChoiceTop, SpanLabel, StyledInputCheckbox } from './EdgePreview.styled';
import PropTypes from 'prop-types';
import { StyledBlockName } from '../OptionSection.styled';

const EdgePreview = ({handleEdgeSide}) => {
  const [checkedValues, setValue] = useState([]);

  useEffect(() => {
    handleEdgeSide(checkedValues)
  },[checkedValues, handleEdgeSide]);
  
  const handleChange = ({ target }) => {
    const { value, checked } = target;
    setValue((prev) =>
      checked ? [...prev, value] : [...prev.filter((choice) => choice !== value)]
    );
  };

  const renderCheckbox = (name, label) => (
    <>
      <StyledInputCheckbox
        onChange={handleChange}
        className="validate-variable-product-one-required"
        type="checkbox"
        name={name}
        value={name}
      />
      <label htmlFor={`rounded_corners_${name}`}>
        <SpanLabel>{label}</SpanLabel>
      </label>
    </>
  );

  console.log(checkedValues);
  return (
    <div className="edge-preview">
      <label className="label">
        <StyledBlockName>Виберіть сторони для кромки:</StyledBlockName>
      </label>
      <div className="height-width-container">
        <div className="height-width">
          <div className="control">
            <ChoiceWrap>
              {[
                { name: 'top-choice' },
                { name: 'left-choice'  },
                { name: 'choice-bottom' },
                { name: 'choice-right' },
             
              ].map(({ name, label }) => (
                <React.Fragment key={name}>
                  {name === 'top-choice' && (
                    <FieldChoiceTop>{renderCheckbox(name, label)}</FieldChoiceTop>
                  )}
                  {name === 'left-choice' && (
                    <FieldChoiceLeft>{renderCheckbox(name, label)}</FieldChoiceLeft>
                  )}
                   {name === 'choice-bottom' && (
                    <FieldChoiceBottom>{renderCheckbox(name, label)}</FieldChoiceBottom>
                  )}
                  {name === 'choice-right' && (
                    <FieldChoiceRight>{renderCheckbox(name, label)}</FieldChoiceRight>
                  )}
                 
                </React.Fragment>
              ))}
            </ChoiceWrap>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EdgePreview;

EdgePreview.propTypes = {
  handleEdgeSide: PropTypes.func.isRequired,
};