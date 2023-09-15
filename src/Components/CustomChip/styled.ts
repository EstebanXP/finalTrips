import styled from '@emotion/styled'
import Chip from '@mui/material/Chip';

export const StyledChip = styled(Chip)<{ chipColor: string }>`
  background-color: ${(props) => props.chipColor};
  margin-right: 5px;
  border: 1px solid ${(props) => props.chipColor === "#FFFFFF" ? "black" : "transparent"};
`;