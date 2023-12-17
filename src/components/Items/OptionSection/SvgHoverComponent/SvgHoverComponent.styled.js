import styled from "styled-components";

export const StyledInfoSvg = styled.span.attrs(props => ({
  dimensions: props.dimensions,
  edge: props.edge,
  amount: props.amount,
  rotation: props.rotation,
  comment: props.comment, // Explicitly include the 'comment' prop
}))`
  margin-left: 5px;
  position: relative;

  &::after {
    content: ${props =>
      props.dimensions
        ? `"${props.dimensions}"`
        : props.edge
        ? `"${props.edge}"`
        : props.amount
        ? `"${props.amount}"`
        : props.rotation
        ? `"${props.rotation}"`
        : props.comment
        ? `"${props.comment}"`
        : "Зв'яжіться з менеджером"};
    display: none;
    position: absolute;
    font-size: 12px;
    font-weight: 100;
    min-width: 250px;
    background: rgb(248, 248, 248);
    border-radius:  5px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(225, 225, 225);
    padding: 8px;
    margin: 0px 5px;
    top: -5px;
    left: ${props =>
     props.amount || props.comment
        ? null
        : "20px"};
    right:${props =>
     props.amount || props.comment
        ? "20px"
        : "0"};
    z-index: 10;
  }

  &:hover::after{
    display: block;
  }
`;
