import React, { useEffect, useState } from 'react';
import { ChoiceWrap, FieldChoiceBottom, FieldChoiceLeft, FieldChoiceRight, FieldChoiceTop } from './EdgePriview.styled';

const EdgePreview = () => {
  const [checkedValues, setValue] = useState([]);

  useEffect(() => {
    window.localStorage.setItem("checkedValues", JSON.stringify(checkedValues))
  },[checkedValues]);
  
  const handleChange = ({ target }) => {
    const { value, checked } = target;
    setValue((prev) =>
      checked ? [...prev, value] : [...prev.filter((choice) => choice !== value)]
    );
  };

  const renderCheckbox = (name, label) => (
    <>
      <input
        onChange={handleChange}
        className="validate-variable-product-one-required"
        type="checkbox"
        name={name}
        value={name}
      />
      <label htmlFor={`rounded_corners_${name}`}>
        <span>{label}</span>
      </label>
    </>
  );

  console.log(checkedValues);
  return (
    <div className="edge-preview">
      <label className="label">
        <span>Виберіть сторони для кромки:</span>
      </label>
      <div className="height-width-container">
        <div className="height-width">
          <div className="control">
            <ChoiceWrap>
              {[
                { name: 'top-choice', label: 'Вгорі' },
                { name: 'left-choice', label: 'Ліворуч' },
                { name: 'choice-bottom', label: 'Внизу' },
                { name: 'choice-right', label: 'Праворуч' },
             
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
