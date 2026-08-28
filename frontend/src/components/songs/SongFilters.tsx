import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Badge, Box, Button, Card, Flex, Input, Text } from '../common/Primitives';

interface SongFiltersProps {
  searchQuery: string;
  selectedGenre: string;
  availableGenres: string[];
  onSearchChange: (search: string) => void;
  onGenreChange: (genre: string) => void;
  onClearFilters: () => void;
  totalMatches: number;
}

const FilterCard = styled(Card)`
  padding: 1.25rem 1.5rem;
  border-radius: 12px;
  border: 1px solid ${({ theme }: any) => theme?.colors?.border || '#e2e8f0'};
  background-color: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(15, 23, 42, 0.03);
`;

const StyledSelect = styled.select`
  padding: 0.625rem 0.875rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }: any) => theme?.colors?.border || '#e2e8f0'};
  font-size: 0.875rem;
  color: ${({ theme }: any) => theme?.colors?.text || '#0f172a'};
  background-color: #ffffff;
  outline: none;
  cursor: pointer;
  min-width: 160px;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &:focus {
    border-color: ${({ theme }: any) => theme?.colors?.primary || '#2563eb'};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
  }
`;

const FilterLabel = styled(Text)`
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.725rem;
  font-weight: 600;
  color: ${({ theme }: any) => theme?.colors?.textMuted || '#64748b'};
`;

export const SongFilters: React.FC<SongFiltersProps> = ({
  searchQuery,
  selectedGenre,
  availableGenres,
  onSearchChange,
  onGenreChange,
  onClearFilters,
  totalMatches,
}) => {
  const [searchTerm, setSearchTerm] = useState(searchQuery);

  useEffect(() => {
    setSearchTerm(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm !== searchQuery) {
        onSearchChange(searchTerm);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm, searchQuery, onSearchChange]);

  const hasActiveFilters = Boolean(searchQuery.trim() || selectedGenre);

  return (
    <FilterCard>
      <Flex flexDirection="column" gap={3}>
        <Flex
          flexDirection={['column', 'column', 'row']}
          alignItems={['stretch', 'stretch', 'center']}
          justifyContent="space-between"
          gap={3}
        >
          {/* Search Box */}
          <Box flex="1">
            <Input
              type="text"
              placeholder="🔍 Search by song title, artist, album, or genre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search songs"
            />
          </Box>

          {/* Genre Filter */}
          <Flex alignItems="center" gap={2} flexWrap="wrap">
            <StyledSelect
              value={selectedGenre}
              onChange={(e) => onGenreChange(e.target.value)}
              aria-label="Filter by genre"
            >
              <option value="">All Genres</option>
              {availableGenres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </StyledSelect>

            {hasActiveFilters && (
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={() => {
                  setSearchTerm('');
                  onClearFilters();
                }}
              >
                ✕ Clear
              </Button>
            )}
          </Flex>
        </Flex>

        {/* Active Filter Chips & Match Count */}
        <Flex
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={2}
          pt={2}
          borderTop="1px solid"
          borderColor="border"
        >
          <Flex alignItems="center" gap={2} flexWrap="wrap">
            <FilterLabel>Filters:</FilterLabel>
            {!hasActiveFilters && (
              <Text fontSize={1} color="textMuted">
                Showing all songs
              </Text>
            )}
            {selectedGenre && (
              <Badge variant="primary">
                Genre: {selectedGenre}{' '}
                <span
                  style={{ marginLeft: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                  onClick={() => onGenreChange('')}
                  role="button"
                  tabIndex={0}
                  aria-label="Remove genre filter"
                >
                  &times;
                </span>
              </Badge>
            )}
            {searchQuery && (
              <Badge variant="neutral">
                Search: &ldquo;{searchQuery}&rdquo;{' '}
                <span
                  style={{ marginLeft: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                  onClick={() => {
                    setSearchTerm('');
                    onSearchChange('');
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label="Remove search filter"
                >
                  &times;
                </span>
              </Badge>
            )}
          </Flex>

          <Text fontSize={1} color="textMuted" fontWeight={500}>
            Showing <Text as="strong" color="text">{totalMatches}</Text> matching {totalMatches === 1 ? 'song' : 'songs'}
          </Text>
        </Flex>
      </Flex>
    </FilterCard>
  );
};