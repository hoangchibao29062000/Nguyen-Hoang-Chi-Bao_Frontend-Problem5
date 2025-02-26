import styled, { keyframes } from 'styled-components';

export const shine = keyframes`
  to {
    background-position-x: -200%;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ddd;
  min-height: 100vh;
  padding: 30px;
`;

export const SkeletonsContainer = styled.div`
  display: flex;
`;

export const Skeleton = styled.div`
  margin: 10px;
  width: 300px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);

  &.is-loading {
    .image,
    h2,
    p {
      background: #eee;
      background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
      border-radius: 5px;
      background-size: 200% 100%;
      animation: ${shine} 1.5s linear infinite;
    }
  }
`;

export const Image = styled.div`
  img {
    max-width: 100%;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  &.is-loading {
    height: 200px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

export const Content = styled.div`
  padding: 20px 30px;
`;
