import styled from 'styled-components';

export const StyledOption = styled.span`
  font-weight: 600;
`;
export const Example = styled.div`
    width: 400px;
    height: 400px;
    background-color: lightgrey;
    position: relative;
 
  /* Horizontal line */
  &::before {
    content: '${(props) => (props.width !== undefined && props.width !== 0 ? props.width + 'px' : '350px')}';
    position: absolute;
    top: 10px; /* Move the top of the pseudo-element to the middle of the parent */
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 2px;
    background-color: grey; /* Change the color as needed */
    z-index: 1; /* Ensure the line is above the item's content */
  }

  /* Vertical line */
  &::after {
    content: '${(props) => (props.height !== undefined && props.height !== 0 ? props.height + 'px' : '350px')}';
    position: absolute;
    top: 50%;
    left: 10px; /* Move the left side of the pseudo-element to the middle of the parent */
    transform: translateY(-50%); /* Center the pseudo-element horizontally */
    width: 2px;
    height:  80%;
    background-color: grey; /* Change the color as needed */
    z-index: 1; /* Ensure the line is above the item's content */
  }
`;

export const ExampleItem = styled.div`
  width: ${(props) => (props.width !== undefined && props.width !== 0 ? props.width * props.scale + 'px' : '350px')};
  height: ${(props) => (props.height !== undefined && props.height !== 0 ? props.height * props.scale + 'px' : '350px')};
  background-color: white;
  border-top: ${(props) => (props.edge  === "top-choice" ? "5px solid green" : "1px solid")};
  border-bottom: ${(props) => (props.edge  === "choice-bottom" ? "5px solid green" : "1px solid")};
  border-left: ${(props) => (props.edge  === "left-choice" ? "5px solid green" : "1px solid")};
  border-right: ${(props) => (props.edge  === "choice-right" ? "5px solid green" : "1px solid")};
 

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%) scale(${(props) => props.scale || 1});
`;



export const StyledButton = styled.button`
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
  background-color: ${(props) => (props.isOpenImg ? '#ffa700' : 'grey')};

  min-width: 160px;
  overflow: hidden;
  transition: 0.4s;
  text-transform: uppercase;

  &:hover {
    background-color: #c48000;
  }
`;