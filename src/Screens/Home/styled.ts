import styled from '@emotion/styled'

export const Container = styled.div`
  height: calc(100vh); /* Adjust headerHeight and footerHeight */
  display: flex;
  padding: 1.5rem 1.5rem;
  flex-direction: row;
`

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`
export const LeftContainer = styled.div`
  height: 100%;
  flex:1;
`

export const RightContainer = styled.div`
  flex:2;
`
