import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { fadeIn, fadeOut, scaleIn, scaleOut } from '../../styles/animations';
import { Box, Button, Card, Flex, Heading, Text } from '../common/Primitives';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  songTitle: string;
  songArtist: string;
  onConfirm: () => void;
  onClose: () => void;
  loading: boolean;
  errorMessage?: string | null;
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
  max-width: 460px;
  padding: 1.75rem;
  text-align: center;
  box-shadow: ${({ theme }: any) => theme?.shadows?.modal || '0 20px 25px -5px rgba(0,0,0,0.15)'};
  border-radius: ${({ theme }: any) => theme?.radii?.lg || '12px'};
  animation: ${(props) => (props.isClosing ? scaleOut : scaleIn)} 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
`;

const IconCircle = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background-color: #fee2e2;
  color: #dc2626;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin: 0 auto 1rem auto;
  animation: ${scaleIn} 0.25s cubic-bezier(0.16, 1, 0.3, 1);
`;

const SpinnerSmall = styled.span`
  width: 14px;
  height: 14px;
  border: 2px solid #ffffff;
  border-top-color: transparent;
  border-radius: 50%;
  display: inline-block;
  animation: spin 0.6s linear infinite;
`;

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  songTitle,
  songArtist,
  onConfirm,
  onClose,
  loading,
  errorMessage,
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
      aria-labelledby="delete-modal-title"
      isClosing={isClosing}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleTriggerClose();
        }
      }}
    >
      <ModalContent isClosing={isClosing}>
        <IconCircle>🗑️</IconCircle>

        <Heading as="h3" id="delete-modal-title" fontSize={3} mb={2}>
          Delete Song
        </Heading>

        <Text fontSize={2} color="textMuted" lineHeight="1.6" mb={3}>
          Are you sure you want to delete{' '}
          <Text as="strong" color="text" fontWeight="bold">
            &ldquo;{songTitle}&rdquo;
          </Text>{' '}
          by{' '}
          <Text as="strong" color="text" fontWeight="bold">
            {songArtist}
          </Text>
          ? This action cannot be undone.
        </Text>

        {errorMessage && (
          <Box
            bg="dangerLight"
            border="1px solid"
            borderColor="dangerBorder"
            borderRadius="md"
            p={2}
            mb={3}
            textAlign="left"
          >
            <Text fontSize={1} color="dangerHover">
              ⚠️ {errorMessage}
            </Text>
          </Box>
        )}

        <Flex justifyContent="center" gap={2}>
          <Button type="button" variant="outline" onClick={handleTriggerClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="button" variant="danger" onClick={onConfirm} disabled={loading}>
            {loading && <SpinnerSmall />}
            <span>{loading ? 'Deleting...' : 'Delete Song'}</span>
          </Button>
        </Flex>
      </ModalContent>
    </Overlay>
  );
};