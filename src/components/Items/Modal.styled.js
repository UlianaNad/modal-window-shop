import styled from 'styled-components';

export const BodyWrapper = styled.div`
  color: #001a34;

  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: nowrap;
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

  @media (max-width: 425px) {
    width: 100%;
    height: 100%;
  }

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
  right: 10px;
  display: inline-block;
  padding: 10px 20px;
  margin-bottom: 10px;
  margin-right: 10px;
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
  min-width: 160px;
  overflow: hidden;
  transition: 0.4s;
  text-transform: uppercase;

  &:hover {
    background-color: #c48000;
  }
  @media (max-width: 425px) {
    width:150px;
    margin-bottom: 10px;
  }
`;
