import styled from 'styled-components';

export const StyledOption = styled.span`
  font-weight: 600;
  font-size: 13px;
`;
export const Example = styled.div`
    width: 400px;
    height: 400px;
    background-color: rgb(0,161,82, 0.1);
    position: relative;
 
  /* Horizontal line */
  &::before {
    content: '${(props) => (props.width !== undefined && props.width !== 0 ? props.width + 'mm' : '350mm')}';
    position: absolute;
    display: flex;
    justify-content: center;
    top: 10px; 
    left: 50%;
    color: rgb(0,161,82);
    font-weight: 600;
    transform: translateX(-50%);
    width: 80%;
    height: 2px;
    background-color: grey; 
    z-index: 1; 
  }

  /* Vertical line */
  &::after {
    content: '${(props) => (props.height !== undefined && props.height !== 0 ? props.height + 'mm' : '350mm')}';
    position: absolute;
    display: flex;
    justify-content: center;
    color: rgb(0,161,82);
    font-weight: 600;
    top: 50%;
    left: 10px; 
    transform: translateY(-50%);
    width: 2px;
    height:  80%;
    background-color: grey; 
    z-index: 1; 
    writing-mode: vertical-lr; 
  text-orientation: mixed;
  }
`;

export const ExampleItem = styled.div`
  width: ${(props) => (props.width !== undefined && props.width !== 0 ? props.width * props.scale + 'px' : '350px')};
  height: ${(props) => (props.height !== undefined && props.height !== 0 ? props.height * props.scale + 'px' : '350px')};
  background-color: transparent;
  border-top: ${(props) => (props.edgesSides  === "top-choice" ? "10px solid rgb(0,161,82)" : "1px solid rgb(0,161,82, 0.5)")};
  border-bottom: ${(props) => (props.edgesSides  === "choice-bottom" ? "10px solid rgb(0,161,82)" : "1px solid rgb(0,161,82, 0.5)")};
  border-left: ${(props) => (props.edgesSides  === "left-choice" ? "10px solid rgb(0,161,82)" : "1px solid rgb(0,161,82, 0.5)")};
  border-right: ${(props) => (props.edgesSides  === "choice-right" ? "10px solid rgb(0,161,82)" : "1px solid rgb(0,161,82, 0.5)")};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%) scale(${(props) => props.scale || 1});
`;



export const StyledButton = styled.button.attrs(props => ({
  isimageclicked: props.isimageclicked ? 'true' : null,
}))`
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
  background-color: ${(props) => (props.isimageclicked ? '#ffa700' : 'grey')};

  min-width: 160px;
  overflow: hidden;
  transition: 0.4s;
  text-transform: uppercase;

  &:hover {
    background-color: #c48000;
  }
  @media (max-width: 425px) {
    min-width: 100%;
  }
`;
StyledButton.shouldForwardProp = prop => prop !== 'isimageclicked';

export const StyledItemName = styled.h1`
    margin-top: 30px;
    color: #00a152;
    text-transform: uppercase;
    font-weight: 400;
    font-size: 15px;
`;