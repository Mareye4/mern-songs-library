import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Box, Flex, Heading, Text } from '../components/common/Primitives';
import { ErrorState } from '../components/common/ErrorState';
import { LoadingState } from '../components/common/LoadingState';
import { StatisticsOverview } from '../components/statistics/StatisticsOverview';
import { fetchStatisticsRequest } from '../features/statistics/statisticsSlice';

export const StatisticsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.statistics);

  useEffect(() => {
    dispatch(fetchStatisticsRequest());
  }, [dispatch]);

  const handleRetry = () => {
    dispatch(fetchStatisticsRequest());
  };

  return (
    <Flex flexDirection="column" gap={4}>
      {/* Page Header */}
      <Box>
        <Heading as="h2" fontSize={[4, 5]}>
          <span>📊</span> Library Statistics
        </Heading>
        <Text fontSize={1} color="textMuted" mt={1}>
          Comprehensive overview of songs, artists, albums, and genre distribution.
        </Text>
      </Box>

      {/* Main Content Area */}
      {loading && !data && <LoadingState variant="stats" />}

      {error && (
        <ErrorState
          title="Unable to load statistics"
          message={error}
          onRetry={handleRetry}
        />
      )}

      {(!loading || data) && !error && data && <StatisticsOverview data={data} />}
    </Flex>
  );
};