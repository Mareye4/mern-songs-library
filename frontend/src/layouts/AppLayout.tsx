import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { Header, NavTab } from '../components/Header';
import { Box, Flex, Text } from '../components/common/Primitives';

interface AppLayoutProps {
  children: ReactNode;
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

const StyledFooter = styled.footer`
  background-color: ${({ theme }: any) => theme?.colors?.surface || '#ffffff'};
  border-top: 1px solid ${({ theme }: any) => theme?.colors?.border || '#e2e8f0'};
`;

export const AppLayout: React.FC<AppLayoutProps> = ({ children, activeTab, onTabChange }) => {
  return (
    <Flex flexDirection="column" minHeight="100vh">
      <Header activeTab={activeTab} onTabChange={onTabChange} />
      <Box as="main" flex="1" width="100%" maxWidth="1200px" mx="auto" px={[3, 4, 5]} py={[3, 4, 5]}>
        {children}
      </Box>
      <StyledFooter>
        <Box py={3} px={4} textAlign="center">
          <Text fontSize={1} color="textMuted">
            Addis Software MERN Stack Test &copy; {new Date().getFullYear()}
          </Text>
        </Box>
      </StyledFooter>
    </Flex>
  );
};