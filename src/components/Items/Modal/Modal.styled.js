import styled from 'styled-components';

export const BodyWrapper = styled.div`
  color: #001a34;
  display: flex;
  justify-content: space-between;


  ul,
  li {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  section {
    width: 45%;
    padding: 15px;

    @media (max-width: 425px) {
      width: 100%;
    } 
  }
 @media (max-width: 425px) {
    flex-direction: column;
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
  width: calc(100vw - 80px);
  height: calc(100vh - 80px);
  background-color: white;
  overflow-y: scroll;
  position: relative;
  padding: 20px;

  @media (max-width: 425px) {
    padding: 10px;
  }
`;
export const StyledCloseButton = styled.button`
position: absolute;
    right: 4px;
    display: flex;
    padding: 4px 5px;
    margin-right: 15px;
    font-size: 15px;
    font-weight: bold;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
    border-radius: 4px;
    color: #fff;
    border: 0;
    background: #ffa700;
    transition: 0.4s;
    text-transform: uppercase;
    justify-content: center;
    align-items: center;

  svg{
    fill: white;
  }

  &:hover {
    background-color: #c48000;
  }
  @media (max-width: 425px) {
    min-width: 50px;
    font-size: 12px;
    padding: 5px 10px;
    margin-bottom: 0;
    position: fixed;
    right: 30px;
    top: 40px;
  }
`;
