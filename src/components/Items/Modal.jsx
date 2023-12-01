import React, { useCallback, useMemo, useState } from 'react';
import ChosenItem from './ChosenItem/ChosenItem';
import OptionSection from './OptionSection/OptionSection';
import PropTypes from 'prop-types';
import { BodyWrapper, StyledModal, StyledOverlay, StyledCloseButton } from './Modal.styled';



const Modal = ({ product, close }) => {
  console.log(product);
  const { dimensions, offers } = product;
  const [options, setOptions] = useState({})

  const computedValues = useMemo(() => {
    const{customDimensions} = options
   
    const startSquare = dimensions.width * dimensions.height;

    const customSquare = customDimensions?.width * customDimensions?.height;
  
    const possibleAmountOfPieces = Math.ceil(startSquare / customSquare);
    console.log(possibleAmountOfPieces);
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
  console.log(options);
  return (

    <StyledOverlay onClick={handleClickOutside}>
      <StyledModal>
      <StyledCloseButton onClick={close}>Закрити</StyledCloseButton>
        <BodyWrapper>
          <ChosenItem product={product} values={computedValues} options={options}/>
          <OptionSection product={product} close={close} handleFormData={handleFormData}/>
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
};

