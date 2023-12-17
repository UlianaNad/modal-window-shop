import React, { useCallback, useContext } from 'react';
import ChosenItem from './ChosenItem/ChosenItem';
import OptionSection from './OptionSection/OptionSection';
//import PropTypes from 'prop-types';
import {
  BodyWrapper,
  StyledModal,
  StyledOverlay,
  StyledCloseButton,
} from './Modal.styled';
import { ProductContext } from 'context/ContextProvider';

const Modal = ({close }) => {

  const {product, setLanguage} = useContext(ProductContext)
 


  const handleClickOutside = e => {
    if (e.target === e.currentTarget) {
      close();
    }
  };

  const handleFormData = useCallback(data => {
    //setOptions(data);
    window.localStorage.setItem(`customOptions${product.id}`, JSON.stringify(data));
  }, [product.id]);

  const handleClickChangeLanguage = e => {
    if (e.target.dataset.lang === 'ua') {
      setLanguage('ua');
    } else if (e.target.dataset.lang === 'ru') {
      setLanguage('ru');
    }
  };


  return (
    <StyledOverlay onClick={handleClickOutside}>
      <StyledModal>
        <div>
          <button data-lang="ua" onClick={handleClickChangeLanguage}>
            ua
          </button>
          <button data-lang="ru" onClick={handleClickChangeLanguage}>
            ru
          </button>
        </div>
        <StyledCloseButton onClick={close}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30"
            height="30"
            viewBox="0 0 72 72"
          >
            <path d="M 19 15 C 17.977 15 16.951875 15.390875 16.171875 16.171875 C 14.609875 17.733875 14.609875 20.266125 16.171875 21.828125 L 30.34375 36 L 16.171875 50.171875 C 14.609875 51.733875 14.609875 54.266125 16.171875 55.828125 C 16.951875 56.608125 17.977 57 19 57 C 20.023 57 21.048125 56.609125 21.828125 55.828125 L 36 41.65625 L 50.171875 55.828125 C 51.731875 57.390125 54.267125 57.390125 55.828125 55.828125 C 57.391125 54.265125 57.391125 51.734875 55.828125 50.171875 L 41.65625 36 L 55.828125 21.828125 C 57.390125 20.266125 57.390125 17.733875 55.828125 16.171875 C 54.268125 14.610875 51.731875 14.609875 50.171875 16.171875 L 36 30.34375 L 21.828125 16.171875 C 21.048125 15.391875 20.023 15 19 15 z"></path>
          </svg>
        </StyledCloseButton>

        <BodyWrapper>
          <ChosenItem    />
          <OptionSection
            close={close}
            handleFormData={handleFormData}
          />
        </BodyWrapper>
      </StyledModal>
    </StyledOverlay>
  );
};

export default Modal;

// Modal.propTypes = {
//   product: PropTypes.shape({
//     dimensions: PropTypes.shape({
//       width: PropTypes.number.isRequired,
//       height: PropTypes.number.isRequired,
//     }).isRequired,
//     offers: PropTypes.shape({
//       price: PropTypes.number.isRequired,
//     }).isRequired,
//   }).isRequired,
//   close: PropTypes.func.isRequired,
//   language: PropTypes.string,
// };
