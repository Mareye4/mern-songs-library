import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { slideDown, slideUp } from '../../styles/animations';
import { Box, Flex, Text } from './Primitives';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastProps {
  toast: ToastMessage | null;
  onDismiss: () => void;
  duration?: number;
}

const ToastWrapper = styled(Box)<{ type: ToastType; isExiting: boolean }>`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1100;
  max-width: 420px;
  min-width: 280px;
  padding: 0.875rem 1.25rem;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  animation: ${(props) => (props.isExiting ? slideDown : slideUp)} 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  border: 1px solid;

  ${(props) => {
    switch (props.type) {
      case 'success':
        return `
          border-color: #bbf7d0;
          background-color: #f0fdf4;
        `;
      case 'error':
        return `
          border-color: #fecaca;
          background-color: #fef2f2;
        `;
      case 'info':
      default:
        return `
          border-color: #dbeafe;
          background-color: #eff6ff;
        `;
    }
  }}
`;

const DismissButton = styled.button`
  background: none;
  border: none;
  font-size: 1.15rem;
  line-height: 1;
  color: #64748b;
  cursor: pointer;
  padding: 0.15rem;
  margin-left: 0.5rem;
  transition: color 0.15s ease, transform 0.15s ease;

  &:hover {
    color: #0f172a;
    transform: scale(1.15);
  }
`;

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss, duration = 3500 }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!toast) {
      setIsExiting(false);
      return;
    }

    setIsExiting(false);

    const timer = setTimeout(() => {
      handleStartExit();
    }, duration);

    return () => clearTimeout(timer);
  }, [toast, duration]);

  const handleStartExit = () => {
    setIsExiting(true);
    setTimeout(() => {
      onDismiss();
    }, 220);
  };

  if (!toast) return null;

  const getIcon = (type: ToastType) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'info':
      default:
        return 'ℹ️';
    }
  };

  const getTextColor = (type: ToastType) => {
    switch (type) {
      case 'success':
        return '#15803d';
      case 'error':
        return '#991b1b';
      case 'info':
      default:
        return '#1d4ed8';
    }
  };

  return (
    <ToastWrapper type={toast.type} isExiting={isExiting} role="status" aria-live="polite">
      <Flex alignItems="center" justifyContent="space-between" gap={2}>
        <Flex alignItems="center" gap={2}>
          <Text fontSize={3}>{getIcon(toast.type)}</Text>
          <Text fontSize={1} fontWeight={600} color={getTextColor(toast.type)}>
            {toast.message}
          </Text>
        </Flex>
        <DismissButton type="button" onClick={handleStartExit} aria-label="Dismiss notification">
          &times;
        </DismissButton>
      </Flex>
    </ToastWrapper>
  );
};