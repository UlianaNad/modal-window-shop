import styled from 'styled-components';

export const StyledDivDimens = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
export const StyledDimensions = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 425px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const StyledLi = styled.li`
  min-width: 220px;
`;
export const StyledInput = styled.input`
  width: 245px;
  height: 25px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(225, 225, 225);
  padding: 8px 6px;
  outline: none;
  color: rgb(87, 75, 65);
  margin-bottom: 5px;
  display: block;
  background: rgb(248, 248, 248);
  border-radius: 0px;

  &focus,
  &:hover {
    border-color: rgba(0, 161, 82, 0.5);
    box-shadow: 0 0 5px 1px #00a152;
  }
`;
export const StyledP = styled.p`
  font-size: 10px;
  color: grey;
`;

export const StyledBlockName = styled.p`
  color: #001a34;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 10px;
`;

export const PatternRotation = styled.div`
  /* height: 140px; */
`;
export const StyledImg = styled.img`
    display: block;
    /* margin-top: -30px; */
    margin-left: 25px;
    width: 125px;
    transform: rotate(90deg);
    transition: all 0.5s;
`;
export const StyledButton = styled.button`
  display: inline-block;
  padding: 10px 20px;
  margin-bottom: 10px;
  margin-top: 5px;
  font-size: 15px;
  font-weight: bold;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  border-radius: 4px;
  color: #fff;
  border: 0;
  background-color: #00a152;
  min-width: 259px;
  position: relative;
  overflow: hidden;
  transition: 0.4s;
  text-transform: uppercase;

  &:hover {
    background-color: #204b37;
  }
  @media (max-width: 425px) {
    min-width: 47%;
    font-size: 12px;
    padding: 5px 10px;
    margin-right: 0;
  }
`;
export const StyledMoreButton = styled.div`
  display: inline-block;
  padding: 10px 20px;
  margin-bottom: 10px;
  margin-top: 5px;
  font-size: 15px;
  font-weight: bold;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  border-radius: 4px;
  color: #fff;
  border: 0;
  background-color: #ffa700;

  position: relative;
  overflow: hidden;
  transition: 0.4s;
  text-transform: uppercase;

  &:hover {
    background-color: #c48000;
  }
  @media (max-width: 425px) {
    font-size: 12px;
    padding: 5px 10px;
    margin-right: 0;
    min-width: 0;
  }
`;
export const StyledSelect = styled.select`
  width: 250px;
  height: 45px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(225, 225, 225);
  padding: 10px 20px;
  outline: none;
  color: rgb(87, 75, 65);
  display: block;
  background: rgb(248, 248, 248);
  border-radius: 0px;
  @media (max-width: 425px) {
    width: 100%;
  }
`;
export const StyledTextArea = styled.textarea`
  min-width: 515px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(225, 225, 225);
  padding: 8px 6px;
  outline: none;
  color: rgb(87, 75, 65);
  margin-bottom: 5px;
  display: block;
  background: rgb(248, 248, 248);
  border-radius: 0px;

  &focus,
  &:hover {
    border-color: rgba(0, 161, 82, 0.5);
    box-shadow: 0 0 5px 1px #00a152;
  }
  @media (max-width: 425px) {
    width: 95%;
    min-width: 0;
  }
`;
export const WrapButtons = styled.div`
  display: flex;
  flex-direction: column;
`;

export const WrapperButtons = styled.div`
display: flex;
justify-content: space-between;
  /* @media (max-width: 425px) {
    display: flex;
    gap: 10px;
  } */
`;

export const Wrapper = styled.div`
  margin-top: 30px;
`;