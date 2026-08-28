import React, { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { Statistics } from '../../features/statistics/types';
import { Badge, Box, Card, Flex, Grid, Heading, Text } from '../common/Primitives';
import { AlbumBreakdownChart } from './AlbumBreakdownChart';
import { ArtistBreakdownChart } from './ArtistBreakdownChart';
import { GenreBreakdownChart } from './GenreBreakdownChart';
import { StatCard } from './StatCard';

interface StatisticsOverviewProps {
  data: Statistics;
}

type TabKey = 'genres' | 'artists' | 'albumsByArtist' | 'songsByAlbum';

const ExplorerCard = styled(Card)`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const TabButton = styled.button<{ active: boolean }>`
  background-color: ${(props) =>
    props.active
      ? (props.theme as any)?.colors?.primary || '#2563eb'
      : (props.theme as any)?.colors?.bg || '#f8fafc'};
  color: ${(props) => (props.active ? '#ffffff' : (props.theme as any)?.colors?.text || '#0f172a')};
  border: 1px solid
    ${(props) =>
      props.active
        ? (props.theme as any)?.colors?.primary || '#2563eb'
        : (props.theme as any)?.colors?.border || '#e2e8f0'};
  padding: 0.5rem 0.875rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.15s ease;
  white-space: nowrap;

  &:hover {
    border-color: ${(props) => (props.theme as any)?.colors?.primary || '#2563eb'};
    ${(props) =>
      !props.active &&
      `background-color: ${(props.theme as any)?.colors?.primaryLight || '#eff6ff'};
       color: ${(props.theme as any)?.colors?.primary || '#2563eb'};`}
  }
`;

const TabCountBadge = styled.span<{ active: boolean }>`
  background-color: ${(props) =>
    props.active ? 'rgba(255, 255, 255, 0.25)' : (props.theme as any)?.colors?.border || '#e2e8f0'};
  color: ${(props) => (props.active ? '#ffffff' : (props.theme as any)?.colors?.textMuted || '#64748b')};
  padding: 0.1rem 0.45rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
`;

const SearchInput = styled.input`
  padding: 0.5rem 0.875rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }: any) => theme?.colors?.border || '#e2e8f0'};
  font-size: 0.85rem;
  background-color: #ffffff;
  color: ${({ theme }: any) => theme?.colors?.text || '#0f172a'};
  outline: none;
  width: 100%;
  max-width: 280px;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &:focus {
    border-color: ${({ theme }: any) => theme?.colors?.primary || '#2563eb'};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
  }

  &::placeholder {
    color: ${({ theme }: any) => theme?.colors?.textMuted || '#94a3b8'};
  }
`;

const ScrollListContainer = styled.div`
  max-height: 380px;
  overflow-y: auto;
  padding-right: 0.35rem;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
`;

const DenseItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.65rem 0.85rem;
  background-color: #ffffff;
  border: 1px solid ${({ theme }: any) => theme?.colors?.border || '#f1f5f9'};
  border-radius: 8px;
  transition: transform 0.15s ease, border-color 0.15s ease, background-color 0.15s ease;

  &:hover {
    border-color: ${({ theme }: any) => theme?.colors?.borderDark || '#cbd5e1'};
    background-color: #f8fafc;
    transform: translateX(2px);
  }
`;

const RankPill = styled.span<{ rank: number }>`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 700;
  flex-shrink: 0;
  background-color: ${(props) =>
    props.rank === 1
      ? '#fef3c7'
      : props.rank === 2
      ? '#f1f5f9'
      : props.rank === 3
      ? '#ffedd5'
      : '#f8fafc'};
  color: ${(props) =>
    props.rank === 1
      ? '#b45309'
      : props.rank === 2
      ? '#475569'
      : props.rank === 3
      ? '#c2410c'
      : '#64748b'};
  border: 1px solid
    ${(props) =>
      props.rank === 1
        ? '#fde68a'
        : props.rank === 2
        ? '#e2e8f0'
        : props.rank === 3
        ? '#fed7aa'
        : '#e2e8f0'};
`;

const MiniProgressBar = styled.div<{ percent: number; color?: string }>`
  height: 4px;
  background-color: #f1f5f9;
  border-radius: 2px;
  overflow: hidden;
  margin-top: 4px;
  width: 100%;

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${(props) => `${Math.max(props.percent, 4)}%`};
    background-color: ${(props) => props.color || '#2563eb'};
    border-radius: 2px;
  }
`;

export const StatisticsOverview: React.FC<StatisticsOverviewProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('genres');
  const [searchTerm, setSearchTerm] = useState('');

  // Tab items definition
  const tabs: { key: TabKey; label: string; icon: string; count: number; badgeVariant: 'primary' | 'success' | 'purple' | 'warning'; color: string }[] = [
    { key: 'genres', label: 'Genres', icon: '🏷️', count: data.songsByGenre.length, badgeVariant: 'primary', color: '#2563eb' },
    { key: 'artists', label: 'Artists', icon: '🎤', count: data.songsByArtist.length, badgeVariant: 'success', color: '#059669' },
    { key: 'albumsByArtist', label: 'Albums / Artist', icon: '💿', count: data.albumsByArtist.length, badgeVariant: 'purple', color: '#7c3aed' },
    { key: 'songsByAlbum', label: 'Tracks / Album', icon: '🎼', count: data.songsByAlbum.length, badgeVariant: 'warning', color: '#d97706' },
  ];

  const activeTabConfig = tabs.find((t) => t.key === activeTab)!;

  // Compute active list with search filter
  const activeItems = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    if (activeTab === 'genres') {
      const items = data.songsByGenre.map((item) => ({ name: item.genre, count: item.count, label: item.count === 1 ? 'song' : 'songs' }));
      const max = Math.max(...items.map((i) => i.count), 1);
      const filtered = term ? items.filter((i) => i.name.toLowerCase().includes(term)) : items;
      return { items: filtered, max, total: items.length };
    }

    if (activeTab === 'artists') {
      const items = data.songsByArtist.map((item) => ({ name: item.artist, count: item.count, label: item.count === 1 ? 'song' : 'songs' }));
      const max = Math.max(...items.map((i) => i.count), 1);
      const filtered = term ? items.filter((i) => i.name.toLowerCase().includes(term)) : items;
      return { items: filtered, max, total: items.length };
    }

    if (activeTab === 'albumsByArtist') {
      const items = data.albumsByArtist.map((item) => ({ name: item.artist, count: item.albumCount, label: item.albumCount === 1 ? 'album' : 'albums' }));
      const max = Math.max(...items.map((i) => i.count), 1);
      const filtered = term ? items.filter((i) => i.name.toLowerCase().includes(term)) : items;
      return { items: filtered, max, total: items.length };
    }

    // songsByAlbum
    const items = data.songsByAlbum.map((item) => ({ name: item.album, count: item.count, label: item.count === 1 ? 'track' : 'tracks' }));
    const max = Math.max(...items.map((i) => i.count), 1);
    const filtered = term ? items.filter((i) => i.name.toLowerCase().includes(term)) : items;
    return { items: filtered, max, total: items.length };
  }, [activeTab, data, searchTerm]);

  return (
    <Flex flexDirection="column" gap="2rem">
      {/* ── 1. Top Summary KPI Row ──────────────────────────────── */}
      <Grid
        gridTemplateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(4, 1fr)']}
        gridGap="1rem"
      >
        <StatCard label="Total Songs" value={data.totalSongs} icon="🎵" accentColor="#2563eb" description="Catalogued tracks" />
        <StatCard label="Total Artists" value={data.totalArtists} icon="🎤" accentColor="#059669" description="Unique creators" />
        <StatCard label="Total Albums" value={data.totalAlbums} icon="💿" accentColor="#7c3aed" description="Distinct releases" />
        <StatCard label="Total Genres" value={data.totalGenres} icon="🏷️" accentColor="#d97706" description="Musical styles" />
      </Grid>

      {/* ── 2. Visual Analytics / Charts Row ────────────────────── */}
      <Flex flexDirection="column" gap={3}>
        <Heading as="h3" fontSize={3}>
          📈 Visual Analytics
        </Heading>
        <Grid
          gridTemplateColumns={['1fr', '1fr', 'repeat(3, 1fr)']}
          gridGap="1.25rem"
          alignItems="start"
        >
          <GenreBreakdownChart data={data.songsByGenre} />
          <ArtistBreakdownChart data={data.songsByArtist} />
          <AlbumBreakdownChart data={data.songsByAlbum} />
        </Grid>
      </Flex>

      {/* ── 3. Compact Detailed Data Explorer ───────────────────── */}
      <Flex flexDirection="column" gap={3}>
        <Flex alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={2}>
          <Heading as="h3" fontSize={3}>
            📋 Detailed Breakdowns
          </Heading>
          <Text fontSize={0} color="textMuted">
            Explore ranked metrics across genres, artists, and albums
          </Text>
        </Flex>

        <ExplorerCard>
          {/* Controls Bar: Tabs + Search */}
          <Flex
            alignItems="center"
            justifyContent="space-between"
            flexWrap="wrap"
            gap={3}
            pb={3}
            borderBottom="1px solid"
            borderColor="border"
          >
            {/* Category Tabs */}
            <Flex gap={2} flexWrap="wrap">
              {tabs.map((tab) => (
                <TabButton
                  key={tab.key}
                  active={activeTab === tab.key}
                  onClick={() => {
                    setActiveTab(tab.key);
                    setSearchTerm('');
                  }}
                  type="button"
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                  <TabCountBadge active={activeTab === tab.key}>{tab.count}</TabCountBadge>
                </TabButton>
              ))}
            </Flex>

            {/* In-tab Live Filter */}
            <SearchInput
              type="text"
              placeholder={`Filter ${activeTabConfig.label.toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Flex>

          {/* List Content */}
          {activeItems.items.length === 0 ? (
            <Box py={4} textAlign="center">
              <Text fontSize={2} mb={1}>🔍</Text>
              <Text fontSize={1} fontWeight={500} color="text">
                {searchTerm ? `No matches found for "${searchTerm}"` : `No ${activeTabConfig.label.toLowerCase()} available`}
              </Text>
              {searchTerm && (
                <Text fontSize={0} color="textMuted" mt={1}>
                  Try a different search keyword or switch tabs.
                </Text>
              )}
            </Box>
          ) : (
            <ScrollListContainer>
              <Grid
                gridTemplateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
                gridGap="0.75rem"
              >
                {activeItems.items.map((item, index) => {
                  const percent = Math.round((item.count / activeItems.max) * 100);
                  return (
                    <DenseItem key={item.name}>
                      <Flex alignItems="center" gap={2} minWidth="0" flex="1" mr={2}>
                        <RankPill rank={index + 1}>{index + 1}</RankPill>
                        <Box minWidth="0" flex="1">
                          <Text
                            fontSize={1}
                            fontWeight={500}
                            color="text"
                            style={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                            title={item.name}
                          >
                            {item.name}
                          </Text>
                          <MiniProgressBar percent={percent} color={activeTabConfig.color} />
                        </Box>
                      </Flex>

                      <Badge variant={activeTabConfig.badgeVariant} style={{ flexShrink: 0 }}>
                        {item.count} {item.label}
                      </Badge>
                    </DenseItem>
                  );
                })}
              </Grid>
            </ScrollListContainer>
          )}

          {/* Footer Summary */}
          <Flex
            alignItems="center"
            justifyContent="space-between"
            pt={2}
            borderTop="1px solid"
            borderColor="border"
            flexWrap="wrap"
            gap={2}
          >
            <Text fontSize={0} color="textMuted">
              Showing {activeItems.items.length} of {activeItems.total} {activeTabConfig.label.toLowerCase()}
              {searchTerm && ` (filtered from "${searchTerm}")`}
            </Text>
            <Text fontSize={0} color="textMuted" fontWeight={500}>
              Ranked by frequency (descending)
            </Text>
          </Flex>
        </ExplorerCard>
      </Flex>
    </Flex>
  );
};