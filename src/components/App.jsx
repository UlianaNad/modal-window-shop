import React from 'react';
import Modal from './Items/Modal';
import styled from 'styled-components';
import { products } from './data/data';
import { useState } from 'react';


export const App = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [product, setProduct] = useState(null)

  const toggleModal = (product) => {
    setIsOpen(prev => !prev)
    setProduct(product)
  }

  return (
    <Wrapper>
      <ul>
        {products.map(product => 
          <Item onClick={()=>toggleModal(product)}  key={product.id}>{product.name}
          <br />
          <img src={product.image} alt={product.name} />
          </Item>
          )}
      </ul>
      {isOpen ? (<Modal product={product} close={toggleModal}/>) : null}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: nowrap;
  ul,
  li {
    padding: 5px;
    list-style:none;
  }
  section {
    width: 45%;
    border: 1px solid black;
    padding: 15px;
  }
  `;
  const Item = styled.li`
  border: 1px solid green;
  border-radius: 10px;
  margin: 5px;
  `;
