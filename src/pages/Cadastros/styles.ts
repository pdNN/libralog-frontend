import { Button, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledStack = styled(Grid)`
  width: 100%;
  margin: 0 0 30px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: 24px;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.primary.main};
  }
` as typeof Grid;

export const StyledButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    margin-right: 8px;
  }
` as typeof Button;

export const StyledGrid = styled(Grid)`
  width: 100%;
` as typeof Grid;

export const StyledGridItem = styled(Grid)`
  width: 100%;
` as typeof Grid;
