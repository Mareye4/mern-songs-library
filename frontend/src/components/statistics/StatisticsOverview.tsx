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
  border: 1px solid #d7e0ee;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(15, 23, 42, 0.04);
`;

const TabButton = styled.button<{ active: boolean }>`
  background-color: ${(props) => (props.active ? '#315fdc' : '#ffffff')};
  color: ${(props) => (props.active ? '#ffffff' : '#40516b')};
  border: 1px solid ${(props) => (props.active ? '#315fdc' : '#d7e0ee')};
  box-shadow: ${(props) =>
    props.active ? '0 2px 8px rgba(49, 95, 220, 0.25)' : 'none'};
  padding: 0.5rem 0.875rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
  white-space: nowrap;
  outline: none;

  &:hover {
    ${(props) =>
      !props.active
        ? `
      border-color: #b8c9e6;
      color: #315fdc;
      background-color: #f8fafc;
    `
        : `
      background-color: #264fc7;
    `}
  }
`;

const TabCountBadge = styled.span<{ active: boolean }>`
  background-color: ${(props) =>
    props.active ? 'rgba(255, 255, 255, 0.22)' : '#eef2f8'};
  color: ${(props) => (props.active ? '#ffffff' : '#64748b')};
  padding: 0.1rem 0.45rem;
  border-radius: 9999px;
  font-size: 0.725rem;
  font-weight: 700;
`;

const SearchInput = styled.input`
  padding: 0.55rem 0.875rem;
  border-radius: 8px;
  border: 1px solid #d3ddec;
  font-size: 0.85rem;
  background-color: #ffffff;
  color: #172033;
  outline: none;
  width: 100%;
  max-width: 280px;
  transition: border-color 0.18s ease, box-shadow 0.18s ease;

  &:hover {
    border-color: #b8c9e6;
  }

  &:focus {
    border-color: #7c9fe8;
    box-shadow: 0 0 0 3px rgba(49, 95, 220, 0.08);
  }

  &::placeholder {
    color: #8a97aa;
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
  padding: 0.75rem 0.95rem;
  background-color: #ffffff;
  border: 1px solid #d7e0ee;
  border-radius: 10px;
  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.03);
  transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;

  &:hover {
    border-color: #b8c9e6;
    box-shadow: 0 6px 16px rgba(15, 23, 42, 0.05);
    transform: translateY(-1.5px);
  }
`;

const RankPill = styled.span<{ rank: number }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.725rem;
  font-weight: 700;
  flex-shrink: 0;
  line-height: 1;

  ${(props) => {
    switch (props.rank) {
      case 1:
        return `
          background: #fef3c7;
          color: #b45309;
          border: 1px solid #fde68a;
        `;
      case 2:
        return `
          background: #f1f5f9;
          color: #475569;
          border: 1px solid #e2e8f0;
        `;
      case 3:
        return `
          background: #fed7aa;
          color: #c2410c;
          border: 1px solid #fdba74;
        `;
      default:
        return `
          background: #f5f8ff;
          color: #315fdc;
          border: 1px solid #d5e0f5;
        `;
    }
  }}
`;

const MiniProgressBar = styled.div<{ percent: number }>`
  height: 6px;
  background-color: #eef1f8;
  border-radius: 999px;
  overflow: hidden;
  margin-top: 5px;
  width: 100%;

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${(props) => `${Math.max(props.percent, 4)}%`};
    background: linear-gradient(90deg, #315fdc, #5b7ce8);
    border-radius: 999px;
    transition: width 0.3s ease;
  }
`;

export const StatisticsOverview: React.FC<StatisticsOverviewProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('genres');
  const [searchTerm, setSearchTerm] = useState('');

  // Tab items definition
  const tabs: { key: TabKey; label: string; icon: string; count: number; badgeVariant: 'primary' | 'success' | 'purple' | 'warning' }[] = [
    { key: 'genres', label: 'Genres', icon: '🏷️', count: data.songsByGenre.length, badgeVariant: 'primary' },
    { key: 'artists', label: 'Artists', icon: '🎤', count: data.songsByArtist.length, badgeVariant: 'success' },
    { key: 'albumsByArtist', label: 'Albums / Artist', icon: '💿', count: data.albumsByArtist.length, badgeVariant: 'purple' },
    { key: 'songsByAlbum', label: 'Tracks / Album', icon: '🎼', count: data.songsByAlbum.length, badgeVariant: 'warning' },
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
                      <Flex alignItems="center" gap={2.5} minWidth="0" flex="1" mr={2}>
                        <RankPill rank={index + 1}>{index + 1}</RankPill>
                        <Box minWidth="0" flex="1">
                          <Text
                            fontSize={1}
                            fontWeight={600}
                            color="#0f172a"
                            style={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              letterSpacing: '-0.01em',
                            }}
                            title={item.name}
                          >
                            {item.name}
                          </Text>
                          <MiniProgressBar percent={percent} />
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
            pt={2.5}
            borderTop="1px solid"
            borderColor="border"
            flexWrap="wrap"
            gap={2}
          >
            <Text fontSize={0} color="textMuted" fontWeight={500}>
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