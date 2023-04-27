import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1,
  h2 {
    text-align: center;
    color: var(--text-color-2);
  }

  span {
    color: var(--main-color);
    font-weight: 600;
    font-size: 15px;
    margin-top: 15px;
    cursor: pointer;
  }
`;
