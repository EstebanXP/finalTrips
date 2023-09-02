import styled from '@emotion/styled'

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center; /* Horizontally center */
  align-items: center; /* Vertically center */
  gap: 20px;
  width: 100%;
`

export const StyledFormContainer = styled.div`
  position: relative;
  padding: 20px 15px;
  background-color: white;
  border: 1px solid black;
  height: 40vh;
  width: 428px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`
export const StyledTitleContainer = styled.div`
  position: absolute; /* Positioned absolutely relative to the container */
  top: 0; /* Align at the top */
`
export const StyledSignUpContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
`
export const TitleContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
`
export const SignUpTextContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  gap: 10px;
`
