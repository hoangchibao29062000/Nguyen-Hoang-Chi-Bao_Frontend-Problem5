import styled from "styled-components";

export interface SkeletonProps {
  width?: number | string; // Chiều rộng của skeleton (có thể là pixel hoặc phần trăm)
  height?: number | string; // Chiều cao của skeleton
  borderRadius?: number | string; // Bo góc của skeleton
  animation?: 'wave' | 'pulse' | 'none'; // Loại hiệu ứng
  backgroundColor?: string; // Màu nền của skeleton
}

const toCssValue = (value?: number | string) => {
  if (typeof value === 'number') {
    return `${value}px`; // Nếu là số, thêm đơn vị px
  }
  return value; // Nếu là chuỗi, giữ nguyên
};

const SkeletonStyle = styled('div')<{ propSkeleton: SkeletonProps }>(({ theme, propSkeleton }) => ({
  backgroundColor: propSkeleton.backgroundColor || theme.palette.action.hover,
  borderRadius: toCssValue(propSkeleton.borderRadius || theme.shape.borderRadius),
  height: toCssValue(propSkeleton.height || '1em'), // Mặc định chiều cao là 1em
  width: toCssValue(propSkeleton.width || '100%'), // Mặc định chiều rộng là 100%
}));

export function Skeleton(props: SkeletonProps) {
  return (
    <SkeletonStyle propSkeleton={props} />
  );
}


