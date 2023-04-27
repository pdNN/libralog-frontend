import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledDefaultBox = styled(Box)`
  box-shadow: ${({ theme }) => theme.shadows[10]};
  width: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  padding: 15px;
  border-radius: 15px;
` as typeof Box;
