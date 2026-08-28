import React from 'react';
import styled from '@emotion/styled';
import { Box, Flex, Heading, Text } from './common/Primitives';

export type NavTab = 'songs' | 'statistics';

interface HeaderProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

const StyledHeader = styled.header`
  background-color: ${({ theme }: any) => theme?.colors?.surface || '#ffffff'};
  border-bottom: 1px solid ${({ theme }: any) => theme?.colors?.border || '#e2e8f0'};
  box-shadow: ${({ theme }: any) => theme?.shadows?.sm || '0 1px 2px rgba(0,0,0,0.05)'};
`;

const NavButton = styled.button<{ isActive: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: ${(props) => (props.isActive ? 600 : 500)};
  color: ${(props) => (props.isActive ? '#2563eb' : '#64748b')};
  background-color: ${(props) => (props.isActive ? '#eff6ff' : 'transparent')};
  border: 1px solid ${(props) => (props.isActive ? '#dbeafe' : 'transparent')};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  transition: all 0.15s ease-in-out;
  outline: none;

  &:hover {
    color: ${(props) => (props.isActive ? '#1d4ed8' : '#0f172a')};
    background-color: ${(props) => (props.isActive ? '#dbeafe' : '#f1f5f9')};
  }
`;

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  return (
    <StyledHeader>
      <Flex
        px={[3, 4, 6]}
        py={3}
        maxWidth="1200px"
        mx="auto"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={3}
      >
        <Flex alignItems="center" gap={2}>
          <Text fontSize={5} lineHeight={1}>
            🎵
          </Text>
          <Heading as="h1" fontSize={[3, 4]} fontWeight="bold">
            Music Management
          </Heading>
        </Flex>

        <Box as="nav">
          <Flex alignItems="center" gap={2}>
            <NavButton
              type="button"
              isActive={activeTab === 'songs'}
              onClick={() => onTabChange('songs')}
              aria-current={activeTab === 'songs' ? 'page' : undefined}
            >
              <span>🎼</span>
              <span>Songs</span>
            </NavButton>

            <NavButton
              type="button"
              isActive={activeTab === 'statistics'}
              onClick={() => onTabChange('statistics')}
              aria-current={activeTab === 'statistics' ? 'page' : undefined}
            >
              <span>📊</span>
              <span>Statistics</span>
            </NavButton>
          </Flex>
        </Box>
      </Flex>
    </StyledHeader>
  );
};