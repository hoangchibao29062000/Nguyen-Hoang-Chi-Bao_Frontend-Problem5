import styled from 'styled-components';
export const ContainerLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const HeaderLayout = styled.header`
  background-color: #333;
  color: white;
  padding: 2rem;
`;

export const BodyLayout = styled.div`
  flex: 1;
  padding: 20px;
`;

export const FooterLayout = styled.footer`
  background-color: #333;
  color: white;
  padding: 20px;
`;