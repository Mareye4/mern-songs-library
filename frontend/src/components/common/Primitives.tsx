import styled from '@emotion/styled';
import {
  border,
  BorderProps,
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
  grid,
  GridProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  shadow,
  ShadowProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
} from 'styled-system';

// ── Box ────────────────────────────────────────────────────────────────────
export interface BoxProps
  extends SpaceProps,
    LayoutProps,
    ColorProps,
    TypographyProps,
    FlexboxProps,
    BorderProps,
    ShadowProps,
    PositionProps {
  cursor?: string;
  transition?: string;
  gap?: any;
}

export const Box = styled.div<BoxProps>`
  box-sizing: border-box;
  ${space}
  ${layout}
  ${color}
  ${typography}
  ${flexbox}
  ${border}
  ${shadow}
  ${position}
  ${(props) => props.cursor && `cursor: ${props.cursor};`}
  ${(props) => props.transition && `transition: ${props.transition};`}
  ${(props) =>
    props.gap !== undefined &&
    `gap: ${typeof props.gap === 'number' ? `${props.gap * 4}px` : props.gap};`}
`;

// ── Flex ───────────────────────────────────────────────────────────────────
export interface FlexProps extends BoxProps {}

export const Flex = styled(Box)<FlexProps>`
  display: flex;
`;

// ── Grid ───────────────────────────────────────────────────────────────────
export interface GridContainerProps extends BoxProps, GridProps {}

export const Grid = styled(Box)<GridContainerProps>`
  display: grid;
  ${grid}
`;

// ── Text & Heading ─────────────────────────────────────────────────────────
export interface TextProps extends BoxProps {
  as?: React.ElementType;
}

export const Text = styled(Box)<TextProps>``;

export const Heading = styled(Text)`
  font-weight: 700;
  color: ${({ theme }: any) => theme?.colors?.text || '#0f172a'};
`;

// ── Card ───────────────────────────────────────────────────────────────────
export const Card = styled(Box)`
  background-color: ${({ theme }: any) => theme?.colors?.surface || '#ffffff'};
  border: 1px solid ${({ theme }: any) => theme?.colors?.border || '#e2e8f0'};
  border-radius: ${({ theme }: any) => theme?.radii?.md || '8px'};
  box-shadow: ${({ theme }: any) => theme?.shadows?.sm || '0 1px 2px 0 rgba(0,0,0,0.05)'};
  transition: box-shadow 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
`;

// ── Button ─────────────────────────────────────────────────────────────────
export interface ButtonProps
  extends SpaceProps,
    LayoutProps,
    TypographyProps,
    BorderProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  font-family: inherit;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
  outline: none;
  border: 1px solid transparent;

  ${(props) => (props.fullWidth ? 'width: 100%;' : '')}

  ${(props) => {
    switch (props.size) {
      case 'sm':
        return `
          padding: 0.35rem 0.75rem;
          font-size: 0.8rem;
        `;
      case 'lg':
        return `
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
        `;
      case 'md':
      default:
        return `
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        `;
    }
  }}

  ${(props) => {
    switch (props.variant) {
      case 'danger':
        return `
          background-color: #dc2626;
          color: #ffffff;
          &:hover:not(:disabled) {
            background-color: #b91c1c;
            transform: translateY(-1px);
            box-shadow: 0 2px 4px rgba(220, 38, 38, 0.25);
          }
          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: #0f172a;
          border-color: #e2e8f0;
          &:hover:not(:disabled) {
            background-color: #f8fafc;
            border-color: #cbd5e1;
            transform: translateY(-1px);
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          }
          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `;
      case 'ghost':
        return `
          background-color: transparent;
          color: #64748b;
          &:hover:not(:disabled) {
            background-color: #f1f5f9;
            color: #0f172a;
          }
        `;
      case 'secondary':
        return `
          background-color: #f1f5f9;
          color: #0f172a;
          border-color: #e2e8f0;
          &:hover:not(:disabled) {
            background-color: #e2e8f0;
            transform: translateY(-1px);
          }
          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `;
      case 'primary':
      default:
        return `
          background-color: #2563eb;
          color: #ffffff;
          box-shadow: 0 1px 2px rgba(37, 99, 235, 0.2);
          &:hover:not(:disabled) {
            background-color: #1d4ed8;
            transform: translateY(-1px);
            box-shadow: 0 3px 6px rgba(37, 99, 235, 0.3);
          }
          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }

  ${space}
  ${layout}
  ${typography}
  ${border}
`;

// ── Badge ──────────────────────────────────────────────────────────────────
export interface BadgeProps {
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'purple' | 'neutral';
}

export const Badge = styled.span<BadgeProps>`
  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1;
  transition: all 0.15s ease;

  ${(props) => {
    switch (props.variant) {
      case 'success':
        return `
          background-color: #f0fdf4;
          color: #15803d;
          border: 1px solid #bbf7d0;
        `;
      case 'warning':
        return `
          background-color: #fffbeb;
          color: #b45309;
          border: 1px solid #fde68a;
        `;
      case 'danger':
        return `
          background-color: #fef2f2;
          color: #b91c1c;
          border: 1px solid #fecaca;
        `;
      case 'purple':
        return `
          background-color: #f5f3ff;
          color: #6d28d9;
          border: 1px solid #ddd6fe;
        `;
      case 'neutral':
        return `
          background-color: #f1f5f9;
          color: #475569;
          border: 1px solid #e2e8f0;
        `;
      case 'primary':
      default:
        return `
          background-color: #eff6ff;
          color: #1d4ed8;
          border: 1px solid #dbeafe;
        `;
    }
  }}
`;

// ── Input & Label ──────────────────────────────────────────────────────────
export const Input = styled.input`
  width: 100%;
  padding: 0.625rem 0.875rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  font-size: 0.9rem;
  color: #0f172a;
  background-color: #ffffff;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
  }

  &:disabled {
    background-color: #f8fafc;
    color: #94a3b8;
    cursor: not-allowed;
  }
`;

export const Label = styled.label`
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 0.35rem;
`;