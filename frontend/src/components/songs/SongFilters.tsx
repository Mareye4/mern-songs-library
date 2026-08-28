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

const StyledSelect = styled.select`
  padding: 0.625rem 0.875rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }: any) => theme?.colors?.border || '#e2e8f0'};
  font-size: 0.9rem;
  color: ${({ theme }: any) => theme?.colors?.text || '#0f172a'};
  background-color: ${({ theme }: any) => theme?.colors?.surface || '#ffffff'};
  outline: none;
  cursor: pointer;
  min-width: 160px;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &:focus {
    border-color: ${({ theme }: any) => theme?.colors?.primary || '#2563eb'};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
  }
`;

const FilterLabel = styled(Text)`
  text-transform: uppercase;
  letter-spacing: 0.04em;
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
  // Local state for debounced search
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
    <Card p={[3, 4]}>
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
            <FilterLabel fontSize={0} color="textMuted" fontWeight={600}>
              Filters:
            </FilterLabel>
            {!hasActiveFilters && (
              <Text fontSize={1} color="textMuted">
                Showing all songs
              </Text>
            )}
            {selectedGenre && (
              <Badge variant="primary">
                Genre: {selectedGenre}{' '}
                <span
                  style={{ marginLeft: '4px', cursor: 'pointer' }}
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
                  style={{ marginLeft: '4px', cursor: 'pointer' }}
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
    </Card>
  );
};