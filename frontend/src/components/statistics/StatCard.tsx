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

const StyledStatCard = styled(Card)<{ accentColor: string }>`
  position: relative;
  overflow: hidden;
  padding: 1.25rem 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-top: 3px solid ${(props) => props.accentColor};
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.2s ease;
  animation: ${scaleIn} 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }: any) => theme?.colors?.borderDark || '#cbd5e1'};
    border-top-color: ${(props) => props.accentColor};
    box-shadow: ${({ theme }: any) => theme?.shadows?.md || '0 8px 16px -2px rgba(0,0,0,0.08)'};
  }

  &:hover .stat-icon-box {
    transform: scale(1.08);
    background-color: ${({ theme }: any) => theme?.colors?.primaryLight || '#eff6ff'};
  }
`;

const IconBox = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 8px;
  background-color: ${({ theme }: any) => theme?.colors?.bg || '#f8fafc'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.35rem;
  flex-shrink: 0;
  transition: transform 0.2s ease, background-color 0.2s ease;
`;

const StatLabel = styled(Text)`
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }: any) => theme?.colors?.textMuted || '#64748b'};
`;

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon = '📊',
  description,
  accentColor = '#2563eb',
}) => {
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

    const duration = 350;
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
    <StyledStatCard accentColor={accentColor}>
      <Flex alignItems="flex-start" justifyContent="space-between" gap={2}>
        <Box flex="1" minWidth="0">
          <StatLabel mb={1}>{label}</StatLabel>
          <Text
            fontSize={[4, 5]}
            fontWeight={700}
            color={accentColor}
            lineHeight={1.15}
            style={{ wordBreak: 'break-word' }}
          >
            {displayValue}
          </Text>
        </Box>
        <IconBox className="stat-icon-box">{icon}</IconBox>
      </Flex>

      {description && (
        <Text fontSize={0} color="textMuted" mt={2} pt={1} borderTop="1px solid #f1f5f9">
          {description}
        </Text>
      )}
    </StyledStatCard>
  );
};