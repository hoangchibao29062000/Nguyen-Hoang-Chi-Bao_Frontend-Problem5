import { Input, inputClasses } from '@mui/base/Input';
import styled from 'styled-components';
interface GridItemProps {
  disableHover?: boolean; // Props để kiểm soát việc hover
}

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};


// Container chính của giao diện
export const ContainerHome = styled.div`
  display: flex;
`;

// Phần bên trái chứa nav
export const LeftSectionHome = styled.div`
  width: 200px;
  background-color: #f0f0f0;
`;

// Phần nav
export const NavHome = styled.nav`
  padding: 20px;
`;

// Các mục trong nav
export const NavItemHome = styled.div`
  padding: 10px;
  cursor: pointer;
`;

// Phần bên phải chứa grid các ô
export const RightSectionHome = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Grid chứa 25 ô
export const GridHome = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  background: url('https://gdgcnorwtiyqgevtpbhq.supabase.co/storage/v1/object/public/soccer-trade/public/mat-sab.png');
  background-size: 500px 500px;
  background-position: center;
  background-repeat: no-repeat;
`;

export const StyledInput = styled(Input)(
  ({ theme }) => `

  .${inputClasses.input} {
    width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      outline: 0;
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }
  }
`,
);

// Ô trong grid
export const GridItemHome = styled.div<GridItemProps>`
  width: 100px;
  height: 100px;
  /* background-color: lightblue; */
  &:hover {
    background-color: yellow; /* Màu nền khi hover */
  }

  /* Sử dụng props disableHover để ngăn hover */
  ${(props) =>
    props.disableHover &&
    `
    pointer-events: none; /* Ngăn sự kiện hover */
    background-color: transparent; /* Màu nền khi không hover */
  `}
`;
