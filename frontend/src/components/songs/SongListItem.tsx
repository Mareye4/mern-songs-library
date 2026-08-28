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
  gap: 0.85rem;
  padding: 1.05rem 1.35rem;
  border-radius: 10px;
  border: 1px solid ${({ theme }: any) => theme?.colors?.border || '#e2e8f0'};
  background-color: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(15, 23, 42, 0.03), 0 1px 2px -1px rgba(15, 23, 42, 0.02);
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.2s ease,
              background-color 0.2s ease;
  animation: ${slideUp} 0.22s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: ${(props) => `${Math.min(props.delayIndex * 35, 250)}ms`};

  &:hover {
    border-color: ${({ theme }: any) => theme?.colors?.borderDark || '#cbd5e1'};
    box-shadow: 0 4px 12px -2px rgba(15, 23, 42, 0.06), 0 2px 6px -1px rgba(15, 23, 42, 0.03);
    transform: translateY(-1.5px);
  }

  &:hover .song-index-box {
    background-color: ${({ theme }: any) => theme?.colors?.primaryLight || '#eff6ff'};
    color: ${({ theme }: any) => theme?.colors?.primary || '#2563eb'};
    border-color: #dbeafe;
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: auto minmax(190px, 2fr) minmax(130px, 1.3fr) minmax(130px, 1.3fr) auto auto;
    gap: 1.25rem;
  }
`;

const IndexBox = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.775rem;
  font-weight: 700;
  color: ${({ theme }: any) => theme?.colors?.textMuted || '#64748b'};
  background-color: ${({ theme }: any) => theme?.colors?.bg || '#f8fafc'};
  border: 1px solid ${({ theme }: any) => theme?.colors?.border || '#e2e8f0'};
  border-radius: 8px;
  flex-shrink: 0;
  transition: background-color 0.18s ease, color 0.18s ease, border-color 0.18s ease;
`;

const MetaLabel = styled(Text)`
  font-size: 0.675rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme }: any) => theme?.colors?.textMuted || '#64748b'};
  margin-bottom: 2px;
  line-height: 1;
`;

const EditButton = styled(Button)`
  font-size: 0.8rem;
  padding: 0.375rem 0.75rem;
  border-radius: 7px;
  gap: 0.35rem;
  background-color: #ffffff;
  border: 1px solid ${({ theme }: any) => theme?.colors?.border || '#e2e8f0'};
  color: ${({ theme }: any) => theme?.colors?.text || '#334155'};
  transition: all 0.18s ease;

  &:hover:not(:disabled) {
    background-color: #eff6ff;
    color: #2563eb;
    border-color: #bfdbfe;
    box-shadow: 0 1px 2px rgba(37, 99, 235, 0.1);
    transform: translateY(-1px);
  }
`;

const DeleteButton = styled(Button)`
  font-size: 0.8rem;
  padding: 0.375rem 0.75rem;
  border-radius: 7px;
  gap: 0.35rem;
  background-color: #ffffff;
  border: 1px solid #fecaca;
  color: #dc2626;
  transition: all 0.18s ease;

  &:hover:not(:disabled) {
    background-color: #fef2f2;
    color: #b91c1c;
    border-color: #f87171;
    box-shadow: 0 1px 2px rgba(220, 38, 38, 0.12);
    transform: translateY(-1px);
  }
`;

export const SongListItem: React.FC<SongListItemProps> = ({ song, index, onEdit, onDelete }) => {
  return (
    <ItemCard delayIndex={index}>
      {/* 1. Index / ID */}
      <Flex alignItems="center" gap={2}>
        <IndexBox className="song-index-box">{index + 1}</IndexBox>
        <Box display={['block', 'block', 'none']}>
          <Text fontSize={0} color="textMuted" style={{ fontFamily: 'ui-monospace, monospace' }}>
            #{song._id.slice(-5)}
          </Text>
        </Box>
      </Flex>

      {/* 2. Song Title */}
      <Box minWidth="0">
        <Heading
          as="h3"
          fontSize={2}
          fontWeight={600}
          color="text"
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            letterSpacing: '-0.01em',
          }}
          title={song.title}
        >
          {song.title}
        </Heading>
        <Text
          fontSize={0}
          color="textMuted"
          display={['none', 'none', 'block']}
          style={{ fontFamily: 'ui-monospace, monospace', opacity: 0.8 }}
        >
          ID: {song._id.slice(-6)}
        </Text>
      </Box>

      {/* 3. Artist */}
      <Box minWidth="0">
        <MetaLabel>Artist</MetaLabel>
        <Text
          fontSize={1}
          fontWeight={500}
          color="text"
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
          title={song.artist}
        >
          {song.artist}
        </Text>
      </Box>

      {/* 4. Album */}
      <Box minWidth="0">
        <MetaLabel>Album</MetaLabel>
        <Text
          fontSize={1}
          color="text"
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
          title={song.album}
        >
          {song.album}
        </Text>
      </Box>

      {/* 5. Genre Badge */}
      <Box justifySelf={['start', 'start', 'start']} flexShrink={0}>
        <Badge variant="primary">{song.genre}</Badge>
      </Box>

      {/* 6. Action Buttons */}
      <Flex gap={2} justifySelf={['end', 'end', 'end']} mt={[2, 2, 0]} flexShrink={0}>
        <EditButton
          type="button"
          size="sm"
          onClick={() => onEdit(song)}
          title={`Edit ${song.title}`}
          aria-label={`Edit ${song.title}`}
        >
          <span>✏️</span>
          <span>Edit</span>
        </EditButton>

        <DeleteButton
          type="button"
          size="sm"
          onClick={() => onDelete(song)}
          title={`Delete ${song.title}`}
          aria-label={`Delete ${song.title}`}
        >
          <span>🗑️</span>
          <span>Delete</span>
        </DeleteButton>
      </Flex>
    </ItemCard>
  );
};