import styled from '@emotion/styled'

export const Container = styled.div`
  height: calc(
    100vh - (headerHeight + footerHeight)
  ); /* Adjust headerHeight and footerHeight */
  flex: 1;
  padding: 1.5rem 1.5rem;
`

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
