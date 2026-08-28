import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { CreateSongInput } from '../../features/songs/types';
import { fadeIn, fadeOut, scaleIn, scaleOut } from '../../styles/animations';
import { Box, Card, Flex, Heading } from '../common/Primitives';
import { SongForm } from './SongForm';

interface SongModalProps {
  isOpen: boolean;
  title: string;
  initialValues?: Partial<CreateSongInput>;
  onSubmit: (data: CreateSongInput) => void;
  onClose: () => void;
  loading: boolean;
  errorMessage?: string | null;
  submitLabel?: string;
}

const Overlay = styled.div<{ isClosing: boolean }>`
  position: fixed;
  inset: 0;
  background-color: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  animation: ${(props) => (props.isClosing ? fadeOut : fadeIn)} 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
`;

const ModalContent = styled(Card)<{ isClosing: boolean }>`
  width: 100%;
  max-width: 520px;
  padding: 1.5rem;
  box-shadow: ${({ theme }: any) => theme?.shadows?.modal || '0 20px 25px -5px rgba(0,0,0,0.15)'};
  border-radius: ${({ theme }: any) => theme?.radii?.lg || '12px'};
  animation: ${(props) => (props.isClosing ? scaleOut : scaleIn)} 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  color: ${({ theme }: any) => theme?.colors?.textMuted || '#64748b'};
  padding: 0.25rem;
  border-radius: 4px;
  transition: color 0.15s ease, transform 0.15s ease;

  &:hover {
    color: ${({ theme }: any) => theme?.colors?.text || '#0f172a'};
    transform: scale(1.1);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const SongModal: React.FC<SongModalProps> = ({
  isOpen,
  title,
  initialValues,
  onSubmit,
  onClose,
  loading,
  errorMessage,
  submitLabel,
}) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !loading && isOpen) {
        handleTriggerClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, loading]);

  const handleTriggerClose = () => {
    if (loading) return;
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 180);
  };

  if (!isOpen && !isClosing) return null;

  return (
    <Overlay
      role="dialog"
      aria-modal="true"
      aria-labelledby="song-modal-title"
      isClosing={isClosing}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleTriggerClose();
        }
      }}
    >
      <ModalContent isClosing={isClosing}>
        {/* Modal Header */}
        <Flex
          alignItems="center"
          justifyContent="space-between"
          mb={3}
          pb={2}
          borderBottom="1px solid"
          borderColor="border"
        >
          <Heading as="h3" id="song-modal-title" fontSize={3}>
            <span>🎼</span> {title}
          </Heading>
          <CloseButton
            type="button"
            onClick={handleTriggerClose}
            disabled={loading}
            aria-label="Close modal"
          >
            &times;
          </CloseButton>
        </Flex>

        {/* Modal Body */}
        <Box>
          <SongForm
            initialValues={initialValues}
            onSubmit={onSubmit}
            onCancel={handleTriggerClose}
            loading={loading}
            errorMessage={errorMessage}
            submitLabel={submitLabel}
          />
        </Box>
      </ModalContent>
    </Overlay>
  );
};