import styled from 'styled-components'

export const Wrapper = styled.main`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`

export const Form = styled.form`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`

export const Logo = styled.img`
  width: 25rem;
`

export const Title = styled.h1`
  font-size: 2.5rem;
`

export const Description = styled.h2`
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 1em;
`

export const Illustration = styled.img`
  margin-top: 3rem;
  width: min(30rem, 100%);
`

export const SignupLink = styled.a`
  font-size: 1.2rem;
  padding: 15px;
  text-decoration: none;

  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`
