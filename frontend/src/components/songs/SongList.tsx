import React from 'react';
import styled from '@emotion/styled';
import { Song } from '../../types';
import { EmptyState } from '../common/EmptyState';
import { Flex, Text } from '../common/Primitives';
import { SongListItem } from './SongListItem';

interface SongListProps {
  songs: Song[];
  isFiltered: boolean;
  onEdit: (song: Song) => void;
  onDelete: (song: Song) => void;
  onClearFilters?: () => void;
}

const ListHeader = styled.div`
  display: none;
  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: 36px minmax(180px, 2.5fr) minmax(140px, 1.6fr) minmax(140px, 1.6fr) 110px 145px;
    gap: 1.25rem;
    align-items: center;
    padding: 0.5rem 1.35rem;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: ${({ theme }: any) => theme?.colors?.textMuted || '#64748b'};
  }
`;

export const SongList: React.FC<SongListProps> = ({
  songs,
  isFiltered,
  onEdit,
  onDelete,
  onClearFilters,
}) => {
  if (songs.length === 0) {
    if (isFiltered) {
      return (
        <EmptyState
          icon="🔍"
          title="No Matching Songs Found"
          description="No songs in your library match the current search or genre filter. Try adjusting your search query or clearing active filters."
          action={
            onClearFilters
              ? {
                  label: 'Clear Filters',
                  onClick: onClearFilters,
                  variant: 'outline',
                }
              : undefined
          }
        />
      );
    }

    return (
      <EmptyState
        icon="🎵"
        title="No Songs in Library"
        description="No songs yet — click &ldquo;+ Add Song&rdquo; above to add your very first track to the library."
      />
    );
  }

  return (
    <Flex flexDirection="column" gap={2}>
      {/* Precision Column Header (Desktop) */}
      <ListHeader>
        <Text>#</Text>
        <Text>Title</Text>
        <Text>Artist</Text>
        <Text>Album</Text>
        <Text>Genre</Text>
        <Text textAlign="right">Actions</Text>
      </ListHeader>

      {/* Song Cards List */}
      <Flex flexDirection="column" gap={2}>
        {songs.map((song, index) => (
          <SongListItem
            key={song._id}
            song={song}
            index={index}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </Flex>
    </Flex>
  );
};