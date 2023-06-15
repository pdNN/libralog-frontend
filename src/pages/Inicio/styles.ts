import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledBox = styled(Box)`
  box-shadow: ${({ theme }) => theme.shadows[10]};
  width: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  padding: 15px;
  border-radius: 15px;

  h1 {
    text-align: center;
    color: ${({ theme }) => theme.palette.primary.main};
    font-weight: 500;
    font-size: 1.5rem;
  }
  h2 {
    font-weight: 500;
    font-size: 1rem;
  }
  hr {
    width: 50px;
    height: 2px;
    background-color: #fafafa;
    margin: 10px 0;
  }
  p {
    text-align: justify;
    height: 100%;
    width: 100%;
    margin: 0%;
    font-size: 1rem;
  }
` as typeof Box;
