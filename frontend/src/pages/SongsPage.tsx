import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Badge, Box, Button, Flex, Heading, Text } from '../components/common/Primitives';
import { DeleteConfirmModal } from '../components/songs/DeleteConfirmModal';
import { ErrorState } from '../components/common/ErrorState';
import { LoadingState } from '../components/common/LoadingState';
import { SongFilters } from '../components/songs/SongFilters';
import { SongList } from '../components/songs/SongList';
import { SongModal } from '../components/songs/SongModal';
import { Toast, ToastMessage } from '../components/common/Toast';
import { GENRES } from '../constants/genres';
import {
  clearError,
  clearFilters,
  createSongRequest,
  deleteSongRequest,
  fetchSongsRequest,
  setFilterGenre,
  setFilterSearch,
  updateSongRequest,
} from '../features/songs/songSlice';
import { CreateSongInput } from '../features/songs/types';
import { Song } from '../types';

export const SongsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { songs, loading, error, filters } = useAppSelector((state) => state.songs);

  // Modal UI state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingSong, setEditingSong] = useState<Song | null>(null);
  const [deletingSong, setDeletingSong] = useState<Song | null>(null);

  // Toast feedback state
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Track pending submission to close modal on success and trigger feedback
  const isSubmittingRef = useRef<'create' | 'update' | 'delete' | null>(null);

  // Initial fetch with active filters
  useEffect(() => {
    dispatch(fetchSongsRequest(filters));
  }, [dispatch]);

  // When filters change, trigger fetchSongsRequest
  const handleSearchChange = (search: string) => {
    dispatch(setFilterSearch(search));
    dispatch(fetchSongsRequest({ genre: filters.genre, search }));
  };

  const handleGenreChange = (genre: string) => {
    dispatch(setFilterGenre(genre));
    dispatch(fetchSongsRequest({ genre, search: filters.search }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    dispatch(fetchSongsRequest({ genre: '', search: '' }));
  };

  // Derive unique list of available genres for filter dropdown
  const availableGenres = useMemo(() => {
    const songGenres = songs.map((s) => s.genre).filter(Boolean);
    const combined = Array.from(new Set([...(GENRES as readonly string[]), ...songGenres]));
    return combined.sort((a, b) => a.localeCompare(b));
  }, [songs]);

  // Handle auto-closing modals and triggering Toast feedback
  useEffect(() => {
    if (!loading && isSubmittingRef.current) {
      if (!error) {
        if (isSubmittingRef.current === 'create') {
          setIsFormModalOpen(false);
          setEditingSong(null);
          setToast({
            id: String(Date.now()),
            type: 'success',
            message: 'Song added to library successfully!',
          });
        } else if (isSubmittingRef.current === 'update') {
          setIsFormModalOpen(false);
          setEditingSong(null);
          setToast({
            id: String(Date.now()),
            type: 'success',
            message: 'Song updated successfully!',
          });
        } else if (isSubmittingRef.current === 'delete') {
          setDeletingSong(null);
          setToast({
            id: String(Date.now()),
            type: 'success',
            message: 'Song deleted successfully!',
          });
        }
        isSubmittingRef.current = null;
      } else {
        // Trigger error toast as secondary feedback alongside inline modal error
        setToast({
          id: String(Date.now()),
          type: 'error',
          message: error || 'Action failed. Please check form errors.',
        });
        isSubmittingRef.current = null;
      }
    }
  }, [loading, error]);

  const handleOpenCreate = () => {
    dispatch(clearError());
    setEditingSong(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (song: Song) => {
    dispatch(clearError());
    setEditingSong(song);
    setIsFormModalOpen(true);
  };

  const handleCloseFormModal = () => {
    dispatch(clearError());
    setIsFormModalOpen(false);
    setEditingSong(null);
    isSubmittingRef.current = null;
  };

  const handleFormSubmit = (data: CreateSongInput) => {
    if (editingSong) {
      isSubmittingRef.current = 'update';
      dispatch(updateSongRequest({ id: editingSong._id, data }));
    } else {
      isSubmittingRef.current = 'create';
      dispatch(createSongRequest(data));
    }
  };

  const handleOpenDelete = (song: Song) => {
    dispatch(clearError());
    setDeletingSong(song);
  };

  const handleCloseDeleteModal = () => {
    dispatch(clearError());
    setDeletingSong(null);
    isSubmittingRef.current = null;
  };

  const handleDeleteConfirm = () => {
    if (deletingSong) {
      isSubmittingRef.current = 'delete';
      dispatch(deleteSongRequest(deletingSong._id));
    }
  };

  const isFiltered = Boolean(filters.genre || filters.search);

  return (
    <Flex flexDirection="column" gap={4}>
      {/* Page Header */}
      <Flex
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={3}
      >
        <Box>
          <Flex alignItems="center" gap={2}>
            <Heading as="h2" fontSize={[4, 5]}>
              Songs Library
            </Heading>
            {!loading && (
              <Badge variant="primary">
                {songs.length} {songs.length === 1 ? 'song' : 'songs'}
              </Badge>
            )}
          </Flex>
          <Text fontSize={1} color="textMuted" mt={1}>
            Manage, search, filter, and explore songs in your library.
          </Text>
        </Box>

        <Flex gap={2} alignItems="center">
          <Button
            type="button"
            variant="outline"
            onClick={() => dispatch(fetchSongsRequest(filters))}
            disabled={loading}
          >
            <span>🔄</span>
            <span>Refresh</span>
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={handleOpenCreate}
          >
            <span>➕</span>
            <span>Add Song</span>
          </Button>
        </Flex>
      </Flex>

      {/* Search and Filters */}
      <SongFilters
        searchQuery={filters.search}
        selectedGenre={filters.genre}
        availableGenres={availableGenres}
        onSearchChange={handleSearchChange}
        onGenreChange={handleGenreChange}
        onClearFilters={handleClearFilters}
        totalMatches={songs.length}
      />

      {/* Main Content Area */}
      {loading && songs.length === 0 && !isFiltered && (
        <LoadingState variant="list" count={5} />
      )}

      {error && !isFormModalOpen && !deletingSong && (
        <ErrorState
          title="Unable to load songs"
          message={error}
          onRetry={() => dispatch(fetchSongsRequest(filters))}
        />
      )}

      {(!loading || songs.length > 0 || isFiltered) && (!error || isFormModalOpen || deletingSong) && (
        <SongList
          songs={songs}
          isFiltered={isFiltered}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
          onClearFilters={handleClearFilters}
        />
      )}

      {/* Create / Edit Modal */}
      <SongModal
        isOpen={isFormModalOpen}
        title={editingSong ? 'Edit Song' : 'Add New Song'}
        initialValues={editingSong || undefined}
        onSubmit={handleFormSubmit}
        onClose={handleCloseFormModal}
        loading={loading}
        errorMessage={isFormModalOpen ? error : null}
        submitLabel={editingSong ? 'Update Song' : 'Create Song'}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingSong)}
        songTitle={deletingSong?.title || ''}
        songArtist={deletingSong?.artist || ''}
        onConfirm={handleDeleteConfirm}
        onClose={handleCloseDeleteModal}
        loading={loading}
        errorMessage={deletingSong ? error : null}
      />

      {/* Toast Feedback Notification */}
      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </Flex>
  );
};