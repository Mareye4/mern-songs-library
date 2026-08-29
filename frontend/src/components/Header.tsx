import React from 'react';
import styled from '@emotion/styled';
import { Box, Flex, Heading } from './common/Primitives';

export type NavTab = 'songs' | 'statistics';

interface HeaderProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

const StyledHeader = styled.header`
  background-color: #ffffff;
  border-bottom: 1px solid ${({ theme }: any) => theme?.colors?.border || '#e2e8f0'};
  box-shadow: 0 1px 3px 0 rgba(15, 23, 42, 0.03);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const LogoIconBox = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 9px;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.15rem;
  box-shadow: 0 2px 6px rgba(37, 99, 235, 0.25);
  flex-shrink: 0;
`;

const NavSegmentedGroup = styled(Flex)`
  background-color: #f1f5f9;
  padding: 3px;
  border-radius: 9px;
  border: 1px solid #e2e8f0;
  gap: 2px;
`;

const NavButton = styled.button<{ isActive: boolean }>`
  padding: 0.45rem 0.95rem;
  border-radius: 7px;
  font-size: 0.85rem;
  font-weight: ${(props) => (props.isActive ? 600 : 500)};
  color: ${(props) => (props.isActive ? '#0f172a' : '#64748b')};
  background-color: ${(props) => (props.isActive ? '#ffffff' : 'transparent')};
  border: 1px solid ${(props) => (props.isActive ? '#e2e8f0' : 'transparent')};
  box-shadow: ${(props) => (props.isActive ? '0 1px 3px rgba(15, 23, 42, 0.06)' : 'none')};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
  outline: none;

  &:hover {
    color: #0f172a;
    ${(props) => !props.isActive && `background-color: rgba(255, 255, 255, 0.6);`}
  }
`;

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  return (
    <StyledHeader>
      <Flex
        px={[3, 4, 6]}
        py={2.5}
        maxWidth="1200px"
        mx="auto"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={3}
      >
        {/* Brand Logo & Title */}
        <Flex alignItems="center" gap={2.5}>
          <LogoIconBox>
            <span style={{ color: '#ffffff', lineHeight: 1 }}>🎵</span>
          </LogoIconBox>
          <Box>
            <Heading as="h1" fontSize={[3, 4]} fontWeight={700} style={{ letterSpacing: '-0.02em', color: '#0f172a' }}>
              Music Management
            </Heading>
          </Box>
        </Flex>

        {/* Navigation Tabs */}
        <Box as="nav">
          <NavSegmentedGroup alignItems="center">
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
          </NavSegmentedGroup>
        </Box>
      </Flex>
    </StyledHeader>
  );
};