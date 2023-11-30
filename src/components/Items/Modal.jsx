import React from 'react';
import ChosenItem from './ChosenItem/ChosenItem';
import OptionSection from './OptionSection/OptionSection';
import PropTypes from 'prop-types';
import { BodyWrapper, StyledModal, StyledOverlay, StyledCloseButton } from './Modal.styled';



const Modal = ({ product, close }) => {
  console.log(product);

  const handleClickOutside = (e) =>{
    if(e.target === e.currentTarget){
      close()
    }
  }

  return (

    <StyledOverlay onClick={handleClickOutside}>
      <StyledModal>
      <StyledCloseButton onClick={close}>Закрити</StyledCloseButton>
        <BodyWrapper>
          <ChosenItem product={product} />
          <OptionSection product={product} close={close} />
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

