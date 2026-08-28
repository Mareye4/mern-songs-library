import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { SongsByAlbum } from '../../features/statistics/types';
import { EmptyState } from '../common/EmptyState';
import { Card, Flex, Heading, Text } from '../common/Primitives';

interface AlbumBreakdownChartProps {
  data: SongsByAlbum[];
}

const ChartCard = styled(Card)`
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TOP_N = 10;

export const AlbumBreakdownChart: React.FC<AlbumBreakdownChartProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <EmptyState
        compact
        icon="💿"
        title="No Album Data"
        description="Add songs with albums to see album rankings."
      />
    );
  }

  // Sort descending by count and slice Top N
  const { chartData, totalAlbums, hiddenCount } = useMemo(() => {
    const sorted = [...data].sort((a, b) => b.count - a.count);
    const total = sorted.length;
    const topItems = sorted.slice(0, TOP_N);
    const hidden = Math.max(0, total - TOP_N);

    const formatted = topItems.map((item) => ({
      name: item.album.length > 16 ? `${item.album.slice(0, 14)}...` : item.album,
      fullName: item.album,
      count: item.count,
    }));

    return {
      chartData: formatted,
      totalAlbums: total,
      hiddenCount: hidden,
    };
  }, [data]);

  // Dynamic height based on number of bars (min 240px, ~38px per bar + padding)
  const chartHeight = Math.max(240, chartData.length * 36 + 50);

  return (
    <ChartCard>
      <Flex alignItems="center" justifyContent="space-between" pb={2} borderBottom="1px solid" borderColor="border" flexWrap="wrap" gap={1}>
        <Heading as="h4" fontSize={2}>
          💿 Top Albums by Track Count
        </Heading>
        <Flex alignItems="center" gap={2}>
          <Text fontSize={0} color="textMuted" fontWeight={500}>
            {hiddenCount > 0
              ? `Top ${TOP_N} of ${totalAlbums} albums (+${hiddenCount} more)`
              : `${totalAlbums} ${totalAlbums === 1 ? 'album' : 'albums'}`}
          </Text>
        </Flex>
      </Flex>

      <div style={{ width: '100%', height: chartHeight }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{ top: 10, right: 25, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
            <XAxis
              type="number"
              allowDecimals={false}
              tick={{ fontSize: 11, fill: '#64748b' }}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={105}
              tick={{ fontSize: 11, fill: '#64748b' }}
            />
            <Tooltip
              formatter={(value: any) => [`${value} ${Number(value) === 1 ? 'track' : 'tracks'}`, 'Album Tracks']}
              labelFormatter={(_label, payload) => payload?.[0]?.payload?.fullName || _label}
              contentStyle={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                fontSize: '0.85rem',
              }}
            />
            <Bar
              dataKey="count"
              fill="#7c3aed"
              radius={[0, 4, 4, 0]}
              maxBarSize={24}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
};