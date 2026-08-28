import React from 'react';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { Box, Card, Flex, Grid } from './Primitives';

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

export const SkeletonBox = styled(Box)<{ height?: string | number; width?: string | number; radius?: string }>`
  height: ${(props) => (typeof props.height === 'number' ? `${props.height}px` : props.height || '20px')};
  width: ${(props) => (typeof props.width === 'number' ? `${props.width}px` : props.width || '100%')};
  border-radius: ${(props) => props.radius || '6px'};
  background: linear-gradient(
    90deg,
    #f1f5f9 25%,
    #e2e8f0 37%,
    #f1f5f9 63%
  );
  background-size: 400% 100%;
  animation: ${shimmer} 1.4s ease infinite;
`;

export const SongItemSkeleton: React.FC = () => {
  return (
    <Card p={[3, 4]}>
      <Flex alignItems="center" justifyContent="space-between" gap={3} flexWrap="wrap">
        <Flex alignItems="center" gap={3} flex="1">
          <SkeletonBox width="32px" height="32px" radius="50%" />
          <Box flex="1">
            <SkeletonBox width="45%" height="18px" mb={2} />
            <SkeletonBox width="30%" height="12px" />
          </Box>
        </Flex>
        <Flex gap={2} alignItems="center">
          <SkeletonBox width="70px" height="24px" radius="9999px" />
          <SkeletonBox width="55px" height="30px" radius="8px" />
          <SkeletonBox width="55px" height="30px" radius="8px" />
        </Flex>
      </Flex>
    </Card>
  );
};

export const StatisticsSkeleton: React.FC = () => {
  return (
    <Flex flexDirection="column" gap={4}>
      {/* 4 Metric Cards */}
      <Grid gridTemplateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(4, 1fr)']} gridGap="1rem">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} p={4}>
            <Flex alignItems="center" gap={3}>
              <SkeletonBox width="48px" height="48px" radius="8px" />
              <Box flex="1">
                <SkeletonBox width="60%" height="14px" mb={2} />
                <SkeletonBox width="40%" height="28px" />
              </Box>
            </Flex>
          </Card>
        ))}
      </Grid>

      {/* 3 Chart Skeletons */}
      <Grid gridTemplateColumns={['1fr', '1fr', 'repeat(3, 1fr)']} gridGap="1.25rem">
        {[1, 2, 3].map((i) => (
          <Card key={i} p={4} height="320px">
            <SkeletonBox width="50%" height="20px" mb={4} />
            <SkeletonBox width="100%" height="220px" radius="8px" />
          </Card>
        ))}
      </Grid>
    </Flex>
  );
};

interface LoadingStateProps {
  message?: string;
  variant?: 'list' | 'stats' | 'card';
  count?: number;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  variant = 'list',
  count = 4,
}) => {
  if (variant === 'stats') {
    return <StatisticsSkeleton />;
  }

  return (
    <Flex flexDirection="column" gap={3}>
      {Array.from({ length: count }).map((_, index) => (
        <SongItemSkeleton key={index} />
      ))}
    </Flex>
  );
};