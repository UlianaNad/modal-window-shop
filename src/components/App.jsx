import React, { useContext } from 'react';
import Modal from './Items/Modal';
import styled from 'styled-components';
import { products } from './data/data';
import { useState } from 'react';
import { ProductContext } from 'context/ContextProvider';


export const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const {chosenProduct} = useContext(ProductContext)

  const toggleModal = product => {
    const body = document.body;
    if (!isOpen) {
      body.classList.add('modal-open');
    } else {
      body.classList.remove('modal-open');
    }

    setIsOpen(prev => !prev);
    chosenProduct(product);
  };

  return (
    <AppWrapper>
      <StyledUl>
        {products.map(product => (
          <Item onClick={() => toggleModal(product)} key={product.id}>
            {product.name}
            <br />
            <img src={product.image} alt={product.name} />
          </Item>
        ))}
      </StyledUl>
      {isOpen ? <Modal close={toggleModal} /> : null}
      <div height='1200px' ></div>
    </AppWrapper>
  );
};

const AppWrapper = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: nowrap;
  font-family: Helvetica, Arial, sans-serif;

  section {
    width: 45%;
    padding: 15px;

    @media (max-width: 425px) {
      width: 90%;
    } 
  }
`;

const StyledUl = styled.ul`

`;

const Item = styled.li`
  padding: 10px;
  border: 1px solid green;
  border-radius: 10px;
  margin: 5px;
  list-style: none;
`;
