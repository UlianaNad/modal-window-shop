import React from 'react';
import ChosenItem from './ChosenItem/ChosenItem';
import OptionSection from './OptionSection/OptionSection';
import styled from 'styled-components';




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
      <button onClick={close}>close</button>
        <BodyWrapper>
          <ChosenItem product={product} />
          <OptionSection product={product} close={close} />
        </BodyWrapper>
      </StyledModal>
    </StyledOverlay>

  );
};

export default Modal;


const BodyWrapper = styled.div`
padding: 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: nowrap;
  ul,
  li {
    padding: 0;
    margin: 0;
    list-style:none;
  }
  section {
    width: 45%;
    border: 1px solid black;
    padding: 15px;
  }
`;

export const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;
export const StyledModal = styled.div`
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
  background-color: white;
`;