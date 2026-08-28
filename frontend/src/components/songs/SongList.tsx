import React from 'react';
import { Song } from '../../types';
import { EmptyState } from '../common/EmptyState';
import { Flex } from '../common/Primitives';
import { SongListItem } from './SongListItem';

interface SongListProps {
  songs: Song[];
  isFiltered: boolean;
  onEdit: (song: Song) => void;
  onDelete: (song: Song) => void;
  onClearFilters?: () => void;
}

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
    <Flex flexDirection="column" gap={3}>
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
  );
};