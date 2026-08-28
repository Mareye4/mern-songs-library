import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { SongsByGenre } from '../../features/statistics/types';
import { EmptyState } from '../common/EmptyState';
import { Card, Flex, Heading, Text } from '../common/Primitives';

interface GenreBreakdownChartProps {
  data: SongsByGenre[];
}

const ChartCard = styled(Card)`
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CHART_COLORS = [
  '#2563eb', // Blue
  '#059669', // Emerald
  '#7c3aed', // Purple
  '#d97706', // Amber
  '#dc2626', // Red
  '#0284c7', // Sky
  '#10b981', // Green
  '#94a3b8', // Gray for "Other"
];

const MAX_INDIVIDUAL_GENRES = 6;

export const GenreBreakdownChart: React.FC<GenreBreakdownChartProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <EmptyState
        compact
        icon="🍩"
        title="No Genre Data"
        description="Add songs with genre tags to see the genre breakdown."
      />
    );
  }

  // Sort descending by count and group into "Other" if more than MAX_INDIVIDUAL_GENRES
  const { chartData, totalGenres, otherCount } = useMemo(() => {
    const sorted = [...data].sort((a, b) => b.count - a.count);
    const total = sorted.length;

    if (total <= MAX_INDIVIDUAL_GENRES + 1) {
      return {
        chartData: sorted.map((item) => ({ name: item.genre, value: item.count })),
        totalGenres: total,
        otherCount: 0,
      };
    }

    const topItems = sorted.slice(0, MAX_INDIVIDUAL_GENRES);
    const remainingItems = sorted.slice(MAX_INDIVIDUAL_GENRES);
    const remainingSum = remainingItems.reduce((acc, curr) => acc + curr.count, 0);

    const result = topItems.map((item) => ({ name: item.genre, value: item.count }));
    if (remainingSum > 0) {
      result.push({ name: `Other (${remainingItems.length})`, value: remainingSum });
    }

    return {
      chartData: result,
      totalGenres: total,
      otherCount: remainingItems.length,
    };
  }, [data]);

  return (
    <ChartCard>
      <Flex alignItems="center" justifyContent="space-between" pb={2} borderBottom="1px solid" borderColor="border" flexWrap="wrap" gap={1}>
        <Heading as="h4" fontSize={2}>
          🍩 Genre Distribution
        </Heading>
        <Text fontSize={0} color="textMuted" fontWeight={500}>
          {otherCount > 0 ? `${totalGenres} genres (${otherCount} in Other)` : `${totalGenres} genres`}
        </Text>
      </Flex>

      <div style={{ width: '100%', height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              formatter={(value: any) => [`${value} ${Number(value) === 1 ? 'song' : 'songs'}`, 'Count']}
              contentStyle={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                fontSize: '0.85rem',
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => <span style={{ color: '#0f172a', fontSize: '0.8rem', fontWeight: 500 }}>{value}</span>}
            />
            <Pie
              data={chartData}
              cx="50%"
              cy="45%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
            >
              {chartData.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
};