import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Box, Button, Card, Flex, Heading, Text } from './Primitives';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
  title?: string;
}

const ErrorCard = styled(Card)`
  padding: 2rem 1.5rem;
  text-align: center;
  background-color: ${({ theme }: any) => theme?.colors?.dangerLight || '#fef2f2'};
  border: 1px solid ${({ theme }: any) => theme?.colors?.dangerBorder || '#fecaca'};
  border-radius: ${({ theme }: any) => theme?.radii?.lg || '12px'};
`;

const DetailsToggle = styled.button`
  background: none;
  border: none;
  font-size: 0.8rem;
  color: #991b1b;
  text-decoration: underline;
  cursor: pointer;
  padding: 0;
  margin-top: 0.5rem;

  &:hover {
    color: #7f1d1d;
  }
`;

export const ErrorState: React.FC<ErrorStateProps> = ({
  message,
  onRetry,
  title = 'Something went wrong',
}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <ErrorCard my={3}>
      <Flex flexDirection="column" alignItems="center" gap={2}>
        <Text fontSize={6}>⚠️</Text>
        <Heading as="h3" fontSize={3} color="dangerText">
          {title}
        </Heading>
        <Text fontSize={2} color="dangerHover" maxWidth="480px" mx="auto">
          We encountered an issue connecting to the server. Please check your connection and try again.
        </Text>

        <div>
          <DetailsToggle type="button" onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? 'Hide technical details' : 'Show technical details'}
          </DetailsToggle>
        </div>

        {showDetails && (
          <Box
            bg="#ffffff"
            border="1px solid"
            borderColor="dangerBorder"
            borderRadius="md"
            p={2}
            mt={1}
            maxWidth="500px"
            width="100%"
            textAlign="left"
          >
            <Text fontSize={0} color="textMuted" fontFamily="mono" style={{ wordBreak: 'break-all' }}>
              Error: {message}
            </Text>
          </Box>
        )}

        {onRetry && (
          <Button variant="danger" onClick={onRetry} mt={2}>
            🔄 Try Again
          </Button>
        )}
      </Flex>
    </ErrorCard>
  );
};