import styled, { css } from 'styled-components/macro'

export const WrapperSingleCurrency = styled.a`
  cursor: pointer;
  & :hover {
    opacity: 0.8;
  }
  & :not(:last-child){
    margin-bottom: 1.1rem;
  }
`;
