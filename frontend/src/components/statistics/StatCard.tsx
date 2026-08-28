import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { scaleIn } from '../../styles/animations';
import { Box, Card, Flex, Text } from '../common/Primitives';

interface StatCardProps {
  label: string;
  value: number | string;
  icon?: string;
  description?: string;
  accentColor?: string;
}

const StyledStatCard = styled(Card)`
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.2s ease;
  animation: ${scaleIn} 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }: any) => theme?.colors?.borderDark || '#cbd5e1'};
    box-shadow: ${({ theme }: any) => theme?.shadows?.md || '0 8px 16px -2px rgba(0,0,0,0.08)'};
  }

  &:hover .stat-icon-box {
    transform: scale(1.08);
    background-color: ${({ theme }: any) => theme?.colors?.primaryLight || '#eff6ff'};
  }
`;

const IconBox = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background-color: ${({ theme }: any) => theme?.colors?.bg || '#f8fafc'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
  transition: transform 0.2s ease, background-color 0.2s ease;
`;

const StatLabel = styled(Text)`
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon = '📊',
  description,
  accentColor = '#2563eb',
}) => {
  // Count-up animation for numeric values
  const [displayValue, setDisplayValue] = useState<number | string>(
    typeof value === 'number' ? 0 : (value ?? '')
  );

  useEffect(() => {
    if (typeof value !== 'number' || isNaN(value)) {
      setDisplayValue(value ?? '');
      return;
    }

    if (value === 0) {
      setDisplayValue(0);
      return;
    }

    const duration = 350; // 350ms smooth count-up
    const steps = 12;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <StyledStatCard p={[3, 4]}>
      <Flex alignItems="center" gap={3}>
        <IconBox className="stat-icon-box">{icon}</IconBox>

        <Box flex="1">
          <StatLabel
            fontSize={0}
            fontWeight={600}
            color="textMuted"
            mb={1}
          >
            {label}
          </StatLabel>
          <Text fontSize={[5, 6]} fontWeight={700} color={accentColor} lineHeight={1.1}>
            {displayValue}
          </Text>
          {description && (
            <Text fontSize={0} color="textMuted" mt={1}>
              {description}
            </Text>
          )}
        </Box>
      </Flex>
    </StyledStatCard>
  );
};