import styled from 'styled-components';

export const ChoiceWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
`;
export const FieldChoiceTop = styled.div`
      width: 70px;
    height: 70px;
    background-color: aqua;
    border-radius: 5px;
    grid-column-start: 2;
`;
export const FieldChoiceLeft = styled.div`
      width: 70px;
    height: 70px;
    background-color: aqua;
    border-radius: 5px;
    grid-column-start: 1;
`;
export const FieldChoiceBottom = styled.div`
      width: 70px;
    height: 70px;
    background-color: aqua;
    border-radius: 5px;
    grid-column-start: 2;
    grid-row-start: 3;
`;
export const FieldChoiceRight = styled.div`
      width: 70px;
    height: 70px;
    background-color: aqua;
    border-radius: 5px;
    grid-column-start: 3;
    grid-row-start:2;
`;
