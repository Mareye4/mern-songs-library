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
  background: linear-gradient(135deg, #2554e8 0%, #312e81 100%);
  box-shadow: 0 4px 12px rgba(37, 84, 232, 0.28);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const Wordmark = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const BrandTitle = styled(Heading)`
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #172033;
  line-height: 1.15;
`;

const BrandAccent = styled.span`
  color: #315fdc;
`;

const BrandTagline = styled.span`
  font-size: 10px;
  font-weight: 600;
  color: #8a97aa;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  line-height: 1;
  margin-top: 2px;
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
        {/* Brand Logo & Wordmark */}
        <Flex alignItems="center" gap="10px">
          <LogoIconBox aria-hidden="true">
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.25))' }}
            >
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" fill="#ffffff" />
              <circle cx="18" cy="16" r="3" fill="#ffffff" />
            </svg>
          </LogoIconBox>
          <Wordmark>
            <BrandTitle as="h1">
              Melo<BrandAccent>dex</BrandAccent>
            </BrandTitle>
            <BrandTagline>Music Library &amp; Insights</BrandTagline>
          </Wordmark>
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