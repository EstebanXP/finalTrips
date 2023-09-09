import styled from '@emotion/styled'

interface ContainerProps {
  customHeight?: string; // You can define any other props you need
}

export const Container = styled.form<ContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: ${(props) => (props.customHeight ? props.customHeight : '100%')};
  width: 1000px;
`

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  //flex-direction: row;
  gap: 5px;
  margin-top: auto;
  width: 1000px;
`
