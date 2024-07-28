import styled from "styled-components";

export const StyledFlyoutWrap = styled.div`
  padding: 15px;
  display: flex;
  position: fixed;
  bottom: 0;
  right: 0;
  box-sizing: border-box;
  color: white;
  background-color: #213547;
  border: 2px solid #888888;
  align-items: center;
  flex-direction: column;
  div {
    margin-top: 10px;
    button {
      margin: 0 5px;
    }
  }
`;
