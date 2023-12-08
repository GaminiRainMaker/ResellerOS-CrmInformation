/* eslint-disable prettier/prettier */
import styled from '@emotion/styled';

export const IndicatorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  width: 100%;
  svg {
    background: #cfe2e1;
    height: 60px;
    width: 60px;
    padding: 16px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    fill: #0f6c6a;

    line:nth-of-type(1) {
      animation: pulse 1s infinite linear;
    }
    line:nth-of-type(2) {
      animation: pulse 1s -0.083s infinite linear;
    }
    line:nth-of-type(3) {
      animation: pulse 1s -0.166s infinite linear;
    }
    line:nth-of-type(4) {
      animation: pulse 1s -0.249s infinite linear;
    }
    line:nth-of-type(5) {
      animation: pulse 1s -0.332s infinite linear;
    }
    line:nth-of-type(6) {
      animation: pulse 1s -0.415s infinite linear;
    }
    line:nth-of-type(7) {
      animation: pulse 1s -0.498s infinite linear;
    }
    line:nth-of-type(8) {
      animation: pulse 1s -0.581s infinite linear;
    }
  }

  @keyframes rotate {
    from {
      transform: rotate(-360deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes pulse {
    50% {
      stroke: #378483;
    }
    to {
      stroke: #f1f6f6;
    }
  }
`;
