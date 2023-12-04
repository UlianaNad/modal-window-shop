import React, { useCallback, useMemo, useState } from 'react';
import ChosenItem from './ChosenItem/ChosenItem';
import OptionSection from './OptionSection/OptionSection';
import PropTypes from 'prop-types';
import { BodyWrapper, StyledModal, StyledOverlay, StyledCloseButton } from './Modal.styled';



const Modal = ({ product, close }) => {
  const { dimensions, offers } = product;
  const [options, setOptions] = useState({})
  const [language, setLanguage] = useState('ua')

  const computedValues = useMemo(() => {
    const{customDimensions} = options
   
    const startSquare = dimensions.width * dimensions.height;

    const customSquare = customDimensions?.width * customDimensions?.height;
  
    const possibleAmountOfPieces = Math.ceil(startSquare / customSquare);

    const cutItemPrice =
      options.totalAmount !== null
        ? Math.round(offers.price / possibleAmountOfPieces)
        : null;
    const AmountOfCustomParticles = Math.ceil(
      options.totalAmount / possibleAmountOfPieces
    );
    const totalPrice =
      options.totalAmount && AmountOfCustomParticles > 0
        ? Math.round(offers.price * AmountOfCustomParticles)
        : null;

    return {
      possibleAmountOfPieces,
      cutItemPrice,
      AmountOfCustomParticles,
      totalPrice,
    };
  }, [options, dimensions, offers]);


  const handleClickOutside = (e) =>{
    if(e.target === e.currentTarget){
      close()
    }
  }

  const handleFormData = useCallback((data) =>{
    setOptions(data)
    
  },[])

  const handleClickChangeLanguage = (e) => {
    if (e.target.dataset.lang === "ua") {
      setLanguage('ua');
    } else if (e.target.dataset.lang === "ru") {
      setLanguage('ru');
    }
  };
  

  return (

    <StyledOverlay onClick={handleClickOutside}>
      <StyledModal>
        <div>
          <button data-lang="ua" onClick={handleClickChangeLanguage}>ua</button>
          <button data-lang="ru" onClick={handleClickChangeLanguage}>ru</button>
        </div>
      <StyledCloseButton onClick={close}>{language==="ua" ? "Закрити" : "Закрыть"}</StyledCloseButton>

        <BodyWrapper>
          <ChosenItem  language={language} product={product} values={computedValues} options={options}/>
          <OptionSection language={language}  product={product} close={close} handleFormData={handleFormData}/>
        </BodyWrapper>
        
      </StyledModal>
    </StyledOverlay>

  );
};

export default Modal;

Modal.propTypes = {
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
  language: PropTypes.string, 
};

