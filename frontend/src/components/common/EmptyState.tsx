import React from 'react';
import styled from '@emotion/styled';
import { Button, Card, Flex, Heading, Text } from './Primitives';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'outline' | 'secondary';
  };
  compact?: boolean;
}

const EmptyCard = styled(Card)<{ compact?: boolean }>`
  padding: ${(props) => (props.compact ? '2rem 1.25rem' : '3.5rem 1.5rem')};
  text-align: center;
  border: 1px dashed ${({ theme }: any) => theme?.colors?.border || '#e2e8f0'};
  background-color: ${({ theme }: any) => theme?.colors?.surface || '#ffffff'};
  border-radius: ${({ theme }: any) => theme?.radii?.lg || '12px'};
`;

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = '📂',
  title,
  description,
  action,
  compact = false,
}) => {
  return (
    <EmptyCard compact={compact}>
      <Flex flexDirection="column" alignItems="center" gap={compact ? 1 : 2}>
        <Text fontSize={compact ? 5 : 7} display="block" mb={1}>
          {icon}
        </Text>
        <Heading as="h3" fontSize={compact ? 2 : 3} color="text">
          {title}
        </Heading>
        <Text fontSize={compact ? 1 : 2} color="textMuted" maxWidth="480px" mx="auto" mb={action ? 3 : 0}>
          {description}
        </Text>
        {action && (
          <Button
            type="button"
            variant={action.variant || 'outline'}
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        )}
      </Flex>
    </EmptyCard>
  );
};