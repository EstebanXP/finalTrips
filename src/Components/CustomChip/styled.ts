import styled from '@emotion/styled'
import Chip from '@mui/material/Chip';

export const StyledChip = styled(Chip)<{ chipColor: string }>`
  background-color: ${(props) => props.chipColor};
  border: 1px solid ${(props) => props.chipColor === "#FFFFFF" ? "black" : "transparent"};
`;