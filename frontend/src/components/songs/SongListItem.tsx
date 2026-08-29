import React from 'react';
import styled from '@emotion/styled';
import { slideUp } from '../../styles/animations';
import { Song } from '../../types';
import { Badge, Box, Card, Flex, Heading, Text } from '../common/Primitives';

interface SongListItemProps {
  song: Song;
  index: number;
  onEdit: (song: Song) => void;
  onDelete: (song: Song) => void;
}

const SongCard = styled(Card)<{ delayIndex: number }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.875rem;
  padding: 1.25rem;
  border-radius: 12px;
  border: 1px solid ${({ theme }: any) => theme?.colors?.border || '#e2e8f0'};
  background-color: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.02);
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.2s ease;
  animation: ${slideUp} 0.22s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: ${(props) => `${Math.min(props.delayIndex * 35, 250)}ms`};

  &:hover {
    border-color: #bfdbfe;
    box-shadow: 0 10px 20px -3px rgba(37, 99, 235, 0.08), 0 4px 6px -2px rgba(15, 23, 42, 0.04);
    transform: translateY(-2px);
  }

  &:hover .song-index-badge {
    background-color: ${({ theme }: any) => theme?.colors?.primaryLight || '#eff6ff'};
    color: ${({ theme }: any) => theme?.colors?.primary || '#2563eb'};
    border-color: #dbeafe;
  }

  &:hover .song-title-text {
    color: ${({ theme }: any) => theme?.colors?.primary || '#2563eb'};
  }
`;

const IndexBadge = styled.div`
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

const SongTitle = styled(Heading)`
  font-size: 1.025rem;
  font-weight: 700;
  color: ${({ theme }: any) => theme?.colors?.text || '#0f172a'};
  letter-spacing: -0.015em;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: color 0.18s ease;
`;

const ArtistText = styled(Text)`
  font-size: 0.875rem;
  font-weight: 600;
  color: #334155;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const AlbumText = styled(Text)`
  font-size: 0.8125rem;
  font-weight: 500;
  color: #64748b;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CardFooter = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  padding-top: 0.75rem;
  border-top: 1px solid #f1f5f9;
  gap: 0.75rem;
`;

const EditButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.375rem 0.75rem;
  border-radius: 7px;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  color: #334155;
  cursor: pointer;
  outline: none;
  transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover:not(:disabled) {
    background-color: #eff6ff;
    color: #2563eb;
    border-color: #bfdbfe;
    box-shadow: 0 1px 3px rgba(37, 99, 235, 0.1);
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const DeleteButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.375rem 0.75rem;
  border-radius: 7px;
  background-color: #ffffff;
  border: 1px solid #fecaca;
  color: #dc2626;
  cursor: pointer;
  outline: none;
  transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover:not(:disabled) {
    background-color: #fef2f2;
    color: #b91c1c;
    border-color: #f87171;
    box-shadow: 0 1px 3px rgba(220, 38, 38, 0.12);
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

export const SongListItem: React.FC<SongListItemProps> = ({ song, index, onEdit, onDelete }) => {
  return (
    <SongCard delayIndex={index}>
      {/* ── 1. Top Section: Header + Main Info + Genre Badge ── */}
      <Flex alignItems="flex-start" justifyContent="space-between" gap={2}>
        <Flex alignItems="flex-start" gap={2.5} minWidth="0" flex="1">
          <IndexBadge className="song-index-badge">{index + 1}</IndexBadge>
          <Box minWidth="0" flex="1">
            <SongTitle as="h3" className="song-title-text" title={song.title}>
              {song.title}
            </SongTitle>
            <ArtistText title={song.artist} mt="2px">
              🎤 {song.artist}
            </ArtistText>
          </Box>
        </Flex>

        {/* Genre Pill at top-right */}
        <Box flexShrink={0}>
          <Badge variant="primary">{song.genre}</Badge>
        </Box>
      </Flex>

      {/* ── 2. Middle Section: Album Info ── */}
      <Flex alignItems="center" gap={1.5} pl="42px" minWidth="0">
        <AlbumText title={song.album}>
          💿 {song.album}
        </AlbumText>
      </Flex>

      {/* ── 3. Bottom Section: Footer with Actions ── */}
      <CardFooter>
        <Text fontSize={0} color="textMuted" fontWeight={500}>
          🎵 Track in Library
        </Text>

        <Flex gap={2} alignItems="center" flexShrink={0}>
          <EditButton
            type="button"
            onClick={() => onEdit(song)}
            title={`Edit ${song.title}`}
            aria-label={`Edit ${song.title}`}
          >
            <span>✏️</span>
            <span>Edit</span>
          </EditButton>

          <DeleteButton
            type="button"
            onClick={() => onDelete(song)}
            title={`Delete ${song.title}`}
            aria-label={`Delete ${song.title}`}
          >
            <span>🗑️</span>
            <span>Delete</span>
          </DeleteButton>
        </Flex>
      </CardFooter>
    </SongCard>
  );
};