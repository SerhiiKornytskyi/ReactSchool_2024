import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const StyledPaginator = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 25px;
  font-size: 20px;
`;

export const StyledPaginatorItem = styled(Link)<{ visible: boolean }>`
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
`;
