import React, { useState } from 'react';
import styled from '@emotion/styled';
import { GENRES } from '../../constants/genres';
import { CreateSongInput } from '../../features/songs/types';
import { Box, Button, Flex, Input, Label, Text } from '../common/Primitives';

interface SongFormProps {
  initialValues?: Partial<CreateSongInput>;
  onSubmit: (data: CreateSongInput) => void;
  onCancel: () => void;
  loading: boolean;
  errorMessage?: string | null;
  submitLabel?: string;
}

const SpinnerSmall = styled.span`
  width: 14px;
  height: 14px;
  border: 2px solid #ffffff;
  border-top-color: transparent;
  border-radius: 50%;
  display: inline-block;
  animation: spin 0.6s linear infinite;
`;

const SelectInput = styled.select`
  width: 100%;
  padding: 0.625rem 0.875rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  font-size: 0.9rem;
  color: #0f172a;
  background-color: #ffffff;
  outline: none;
  box-sizing: border-box;
  cursor: pointer;
  transition: border-color 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
  }

  &:disabled {
    background-color: #f8fafc;
    color: #94a3b8;
    cursor: not-allowed;
  }
`;

export const SongForm: React.FC<SongFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
  loading,
  errorMessage,
  submitLabel = 'Save Song',
}) => {
  const [title, setTitle] = useState(initialValues?.title || '');
  const [artist, setArtist] = useState(initialValues?.artist || '');
  const [album, setAlbum] = useState(initialValues?.album || '');
  const [genre, setGenre] = useState(initialValues?.genre || '');
  const [validationError, setValidationError] = useState<string | null>(null);

  // Check if initial genre is a legacy/custom value not in the standard GENRES list
  const isLegacyGenre = Boolean(
    initialValues?.genre && !(GENRES as readonly string[]).includes(initialValues.genre)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const trimmedTitle = title.trim();
    const trimmedArtist = artist.trim();
    const trimmedAlbum = album.trim();
    const trimmedGenre = genre.trim();

    if (!trimmedTitle || !trimmedArtist || !trimmedAlbum || !trimmedGenre) {
      setValidationError('All fields (Title, Artist, Album, Genre) are required.');
      return;
    }

    onSubmit({
      title: trimmedTitle,
      artist: trimmedArtist,
      album: trimmedAlbum,
      genre: trimmedGenre,
    });
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Flex flexDirection="column" gap={3}>
        {/* Inline Client/Server Error Banner */}
        {(validationError || errorMessage) && (
          <Box
            bg="dangerLight"
            border="1px solid"
            borderColor="dangerBorder"
            borderRadius="md"
            p={3}
          >
            <Flex alignItems="center" gap={2}>
              <Text fontSize={2}>⚠️</Text>
              <Text fontSize={1} color="dangerHover" fontWeight={500}>
                {validationError || errorMessage}
              </Text>
            </Flex>
          </Box>
        )}

        <Box>
          <Label htmlFor="song-title">Song Title *</Label>
          <Input
            id="song-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Bohemian Rhapsody"
            disabled={loading}
            autoFocus
          />
        </Box>

        <Box>
          <Label htmlFor="song-artist">Artist *</Label>
          <Input
            id="song-artist"
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            placeholder="e.g. Queen"
            disabled={loading}
          />
        </Box>

        <Box>
          <Label htmlFor="song-album">Album *</Label>
          <Input
            id="song-album"
            type="text"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
            placeholder="e.g. A Night at the Opera"
            disabled={loading}
          />
        </Box>

        <Box>
          <Label htmlFor="song-genre">Genre *</Label>
          <SelectInput
            id="song-genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            disabled={loading}
          >
            <option value="">Select a genre...</option>
            {isLegacyGenre && initialValues?.genre && (
              <option value={initialValues.genre}>
                {initialValues.genre} (Legacy value)
              </option>
            )}
            {GENRES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </SelectInput>
        </Box>

        {/* Action Buttons */}
        <Flex
          justifyContent="flex-end"
          gap={2}
          mt={2}
          pt={3}
          borderTop="1px solid"
          borderColor="border"
        >
          <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading && <SpinnerSmall />}
            <span>{loading ? 'Saving...' : submitLabel}</span>
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};