import React from 'react';
import styled from '@emotion/styled';
import { slideUp } from '../../styles/animations';
import { Song } from '../../types';
import { Badge, Box, Button, Card, Flex, Heading, Text } from '../common/Primitives';

interface SongListItemProps {
  song: Song;
  index: number;
  onEdit: (song: Song) => void;
  onDelete: (song: Song) => void;
}

const ItemCard = styled(Card)<{ delayIndex: number }>`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  transition: transform 0.18s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.18s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.18s ease;
  animation: ${slideUp} 0.22s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: ${(props) => `${Math.min(props.delayIndex * 35, 250)}ms`};

  &:hover {
    border-color: ${({ theme }: any) => theme?.colors?.borderDark || '#cbd5e1'};
    box-shadow: ${({ theme }: any) => theme?.shadows?.md || '0 4px 6px -1px rgba(0,0,0,0.1)'};
    transform: translateY(-1.5px);
  }

  &:hover .song-index-circle {
    background-color: ${({ theme }: any) => theme?.colors?.primaryLight || '#eff6ff'};
    color: ${({ theme }: any) => theme?.colors?.primary || '#2563eb'};
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: auto 2fr 1.5fr 1.5fr 1fr auto;
    gap: 1rem;
  }
`;

const IndexCircle = styled.span`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme }: any) => theme?.colors?.textMuted || '#64748b'};
  background-color: ${({ theme }: any) => theme?.colors?.bg || '#f8fafc'};
  border-radius: 50%;
  transition: background-color 0.15s ease, color 0.15s ease;
`;

export const SongListItem: React.FC<SongListItemProps> = ({ song, index, onEdit, onDelete }) => {
  return (
    <ItemCard delayIndex={index}>
      <Flex alignItems="center" gap={2}>
        <IndexCircle className="song-index-circle">{index + 1}</IndexCircle>
        <Box display={['block', 'block', 'none']}>
          <Text fontSize={0} color="textMuted">
            ID: {song._id.slice(-6)}
          </Text>
        </Box>
      </Flex>

      <Box>
        <Heading as="h3" fontSize={2} color="text" mb={1}>
          {song.title}
        </Heading>
        <Text fontSize={0} color="textMuted" display={['none', 'none', 'block']}>
          ID: {song._id.slice(-6)}
        </Text>
      </Box>

      <Box>
        <Text fontSize={0} color="textMuted" display="block">
          Artist
        </Text>
        <Text fontSize={1} fontWeight={500} color="text">
          {song.artist}
        </Text>
      </Box>

      <Box>
        <Text fontSize={0} color="textMuted" display="block">
          Album
        </Text>
        <Text fontSize={1} color="text">
          {song.album}
        </Text>
      </Box>

      <Box justifySelf={['start', 'start', 'start']}>
        <Badge variant="primary">{song.genre}</Badge>
      </Box>

      {/* Action Buttons */}
      <Flex gap={2} justifySelf={['end', 'end', 'end']} mt={[2, 2, 0]}>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onEdit(song)}
          title={`Edit ${song.title}`}
          aria-label={`Edit ${song.title}`}
        >
          <span>✏️</span>
          <span>Edit</span>
        </Button>

        <Button
          type="button"
          variant="danger"
          size="sm"
          onClick={() => onDelete(song)}
          title={`Delete ${song.title}`}
          aria-label={`Delete ${song.title}`}
        >
          <span>🗑️</span>
          <span>Delete</span>
        </Button>
      </Flex>
    </ItemCard>
  );
};