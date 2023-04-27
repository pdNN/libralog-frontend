import { Container, Box, styled } from "@mui/material";

export const Wrapper = styled(Box)`
  width: 100%;
  height: 100vh;

  background: rgb(73, 149, 193);
  background: linear-gradient(
    0deg,
    ${(props) => props.theme.palette.primary.main} 0%,
    ${(props) => props.theme.palette.primary.light} 50%,
    #fafafa 100%
  );

  display: flex;
  justify-content: center;
  align-items: center;
` as typeof Box;

export const StyledContainer = styled(Container)`
  height: 70%;
  border-radius: 30px;

  padding: 50px 5% !important;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    margin-bottom: 10px;
    color: ${(props) => props.theme.palette.primary.main};
    font-weight: 500;
    text-align: center;
  }

  form {
    width: 100%;
    height: 45%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    div.MuiStack-root {
      width: 100%;
      margin-bottom: 50px;
    }
  }
` as typeof Container;

export const ImageContainer = styled(Container)`
  width: 180px;
  height: 180px;

  padding: 30px;

  margin-top: -60px;

  border-radius: 50%;

  position: absolute;
  top: 10%;

  box-shadow: ${(props) => props.theme.shadows[3]};

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 100%;
    object-fit: cover;
  }
` as typeof Container;
