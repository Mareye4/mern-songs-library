import React from 'react';
import styled from '@emotion/styled';
import { Statistics } from '../../features/statistics/types';
import { Badge, Card, Flex, Grid, Heading, Text } from '../common/Primitives';
import { AlbumBreakdownChart } from './AlbumBreakdownChart';
import { ArtistBreakdownChart } from './ArtistBreakdownChart';
import { GenreBreakdownChart } from './GenreBreakdownChart';
import { StatCard } from './StatCard';

interface StatisticsOverviewProps {
  data: Statistics;
}

const SectionCard = styled(Card)`
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SectionHeader = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${({ theme }: any) => theme?.colors?.border || '#e2e8f0'};
`;

const ListItem = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 0;
  border-bottom: 1px solid #f1f5f9;
  font-size: 0.9rem;

  &:last-child {
    border-bottom: none;
  }
`;

export const StatisticsOverview: React.FC<StatisticsOverviewProps> = ({ data }) => {
  return (
    <Flex flexDirection="column" gap="2rem">
      {/* ── 1. Top Summary Metric Cards ───────────────────────── */}
      <Grid
        gridTemplateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(4, 1fr)']}
        gridGap="1rem"
      >
        <StatCard label="Total Songs" value={data.totalSongs} icon="🎵" accentColor="#2563eb" />
        <StatCard label="Total Artists" value={data.totalArtists} icon="🎤" accentColor="#059669" />
        <StatCard label="Total Albums" value={data.totalAlbums} icon="💿" accentColor="#7c3aed" />
        <StatCard label="Total Genres" value={data.totalGenres} icon="🏷️" accentColor="#d97706" />
      </Grid>

      {/* ── 2. Visual Analytics / Charts ───────────────────────── */}
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

      {/* ── 3. Detailed Data Breakdowns ────────────────────────── */}
      <Flex flexDirection="column" gap={3}>
        <Heading as="h3" fontSize={3}>
          📋 Detailed Breakdowns
        </Heading>
        <Grid
          gridTemplateColumns={['1fr', '1fr', 'repeat(2, 1fr)']}
          gridGap="1.25rem"
        >
          {/* 1. Songs by Genre */}
          <SectionCard>
            <SectionHeader>
              <Heading as="h4" fontSize={2}>
                🏷️ Songs per Genre
              </Heading>
              <Text fontSize={0} color="textMuted" fontWeight={500}>
                {data.songsByGenre.length} genres
              </Text>
            </SectionHeader>
            {data.songsByGenre.length === 0 ? (
              <Text color="textMuted" fontSize={1} py={2}>
                No genre data available.
              </Text>
            ) : (
              <Flex flexDirection="column">
                {data.songsByGenre.map((item) => (
                  <ListItem key={item.genre}>
                    <Text fontWeight={500} color="text">
                      {item.genre}
                    </Text>
                    <Badge variant="primary">
                      {item.count} {item.count === 1 ? 'song' : 'songs'}
                    </Badge>
                  </ListItem>
                ))}
              </Flex>
            )}
          </SectionCard>

          {/* 2. Songs by Artist */}
          <SectionCard>
            <SectionHeader>
              <Heading as="h4" fontSize={2}>
                🎤 Songs per Artist
              </Heading>
              <Text fontSize={0} color="textMuted" fontWeight={500}>
                {data.songsByArtist.length} artists
              </Text>
            </SectionHeader>
            {data.songsByArtist.length === 0 ? (
              <Text color="textMuted" fontSize={1} py={2}>
                No artist data available.
              </Text>
            ) : (
              <Flex flexDirection="column">
                {data.songsByArtist.map((item) => (
                  <ListItem key={item.artist}>
                    <Text fontWeight={500} color="text">
                      {item.artist}
                    </Text>
                    <Badge variant="success">
                      {item.count} {item.count === 1 ? 'song' : 'songs'}
                    </Badge>
                  </ListItem>
                ))}
              </Flex>
            )}
          </SectionCard>

          {/* 3. Albums by Artist */}
          <SectionCard>
            <SectionHeader>
              <Heading as="h4" fontSize={2}>
                💿 Albums per Artist
              </Heading>
              <Text fontSize={0} color="textMuted" fontWeight={500}>
                {data.albumsByArtist.length} artists
              </Text>
            </SectionHeader>
            {data.albumsByArtist.length === 0 ? (
              <Text color="textMuted" fontSize={1} py={2}>
                No album data available.
              </Text>
            ) : (
              <Flex flexDirection="column">
                {data.albumsByArtist.map((item) => (
                  <ListItem key={item.artist}>
                    <Text fontWeight={500} color="text">
                      {item.artist}
                    </Text>
                    <Badge variant="purple">
                      {item.albumCount} {item.albumCount === 1 ? 'album' : 'albums'}
                    </Badge>
                  </ListItem>
                ))}
              </Flex>
            )}
          </SectionCard>

          {/* 4. Songs by Album */}
          <SectionCard>
            <SectionHeader>
              <Heading as="h4" fontSize={2}>
                🎼 Songs per Album
              </Heading>
              <Text fontSize={0} color="textMuted" fontWeight={500}>
                {data.songsByAlbum.length} albums
              </Text>
            </SectionHeader>
            {data.songsByAlbum.length === 0 ? (
              <Text color="textMuted" fontSize={1} py={2}>
                No album song data available.
              </Text>
            ) : (
              <Flex flexDirection="column">
                {data.songsByAlbum.map((item) => (
                  <ListItem key={item.album}>
                    <Text fontWeight={500} color="text">
                      {item.album}
                    </Text>
                    <Badge variant="warning">
                      {item.count} {item.count === 1 ? 'song' : 'songs'}
                    </Badge>
                  </ListItem>
                ))}
              </Flex>
            )}
          </SectionCard>
        </Grid>
      </Flex>
    </Flex>
  );
};