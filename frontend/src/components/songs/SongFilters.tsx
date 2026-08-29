import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Badge, Box, Button, Card, Flex, Text } from '../common/Primitives';

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
  box-shadow: 0 2px 8px -2px rgba(15, 23, 42, 0.04), 0 1px 3px -1px rgba(15, 23, 42, 0.02);
`;

const SearchInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 0.875rem;
  color: #94a3b8;
  font-size: 0.95rem;
  pointer-events: none;
  display: flex;
  align-items: center;
  line-height: 1;
`;

const StyledSearchInput = styled.input`
  width: 100%;
  padding: 0.65rem 0.875rem 0.65rem 2.4rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }: any) => theme?.colors?.border || '#e2e8f0'};
  font-size: 0.875rem;
  color: #0f172a;
  background-color: #ffffff;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.18s ease, box-shadow 0.18s ease, background-color 0.18s ease;

  &:hover {
    border-color: #cbd5e1;
  }

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
  }

  &::placeholder {
    color: #94a3b8;
    font-size: 0.85rem;
  }
`;

const StyledSelect = styled.select`
  padding: 0.65rem 1rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }: any) => theme?.colors?.border || '#e2e8f0'};
  font-size: 0.875rem;
  font-weight: 500;
  color: #0f172a;
  background-color: #ffffff;
  outline: none;
  cursor: pointer;
  min-width: 165px;
  transition: border-color 0.18s ease, box-shadow 0.18s ease;

  &:hover {
    border-color: #cbd5e1;
  }

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
  }
`;

const FilterLabel = styled(Text)`
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.725rem;
  font-weight: 600;
  color: #64748b;
`;

const ClearButton = styled(Button)`
  font-size: 0.8rem;
  padding: 0.5rem 0.85rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background-color: #ffffff;
  color: #475569;
  transition: all 0.18s ease;

  &:hover:not(:disabled) {
    background-color: #f1f5f9;
    color: #0f172a;
    border-color: #cbd5e1;
  }
`;

const FilterChip = styled(Badge)`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.65rem;
  font-size: 0.775rem;
  border-radius: 9999px;
`;

const DismissIcon = styled.span`
  cursor: pointer;
  font-weight: bold;
  font-size: 0.85rem;
  margin-left: 2px;
  line-height: 1;
  opacity: 0.7;
  transition: opacity 0.15s ease, transform 0.15s ease;

  &:hover {
    opacity: 1;
    transform: scale(1.15);
  }
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
        {/* Main Controls Row */}
        <Flex
          flexDirection={['column', 'column', 'row']}
          alignItems={['stretch', 'stretch', 'center']}
          justifyContent="space-between"
          gap={3}
        >
          {/* Search Box with Glass Icon */}
          <Box flex="1">
            <SearchInputWrapper>
              <SearchIcon>🔍</SearchIcon>
              <StyledSearchInput
                type="text"
                placeholder="Search by song title, artist, album, or genre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search songs"
              />
            </SearchInputWrapper>
          </Box>

          {/* Genre Filter & Clear */}
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
              <ClearButton
                type="button"
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  onClearFilters();
                }}
              >
                ✕ Clear
              </ClearButton>
            )}
          </Flex>
        </Flex>

        {/* Active Filter Chips & Match Count Row */}
        <Flex
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={2}
          pt={2.5}
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
              <FilterChip variant="primary">
                <span>Genre: <strong>{selectedGenre}</strong></span>
                <DismissIcon
                  onClick={() => onGenreChange('')}
                  role="button"
                  tabIndex={0}
                  aria-label="Remove genre filter"
                >
                  &times;
                </DismissIcon>
              </FilterChip>
            )}
            {searchQuery && (
              <FilterChip variant="neutral">
                <span>Search: &ldquo;<strong>{searchQuery}</strong>&rdquo;</span>
                <DismissIcon
                  onClick={() => {
                    setSearchTerm('');
                    onSearchChange('');
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label="Remove search filter"
                >
                  &times;
                </DismissIcon>
              </FilterChip>
            )}
          </Flex>

          <Text fontSize={1} color="textMuted" fontWeight={500}>
            Showing <Text as="strong" color="text" fontWeight={700}>{totalMatches}</Text> matching {totalMatches === 1 ? 'song' : 'songs'}
          </Text>
        </Flex>
      </Flex>
    </FilterCard>
  );
};