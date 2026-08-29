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
  border-radius: ${({ theme }: any) => theme?.radii?.lg || '12px'};
  box-shadow: ${({ theme }: any) => theme?.shadows?.sm || '0 1px 3px 0 rgba(15, 23, 42, 0.04)'};
  transition: box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.2s ease,
              transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
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
          padding: 0.375rem 0.75rem;
          font-size: 0.8rem;
          border-radius: 7px;
        `;
      case 'lg':
        return `
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          border-radius: 10px;
        `;
      case 'md':
      default:
        return `
          padding: 0.55rem 1.15rem;
          font-size: 0.875rem;
          border-radius: 8px;
        `;
    }
  }}

  ${(props) => {
    switch (props.variant) {
      case 'danger':
        return `
          background-color: #ffffff;
          color: #dc2626;
          border-color: #fecaca;
          &:hover:not(:disabled) {
            background-color: #fef2f2;
            border-color: #f87171;
            color: #b91c1c;
            transform: translateY(-1px);
            box-shadow: 0 1px 3px rgba(220, 38, 38, 0.12);
          }
          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `;
      case 'outline':
        return `
          background-color: #ffffff;
          color: #334155;
          border-color: #e2e8f0;
          &:hover:not(:disabled) {
            background-color: #f8fafc;
            border-color: #cbd5e1;
            color: #0f172a;
            transform: translateY(-1px);
            box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
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
          color: #1e293b;
          border-color: #e2e8f0;
          &:hover:not(:disabled) {
            background-color: #e2e8f0;
            color: #0f172a;
            transform: translateY(-1px);
          }
          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `;
      case 'primary':
      default:
        return `
          background: linear-gradient(180deg, #2563eb 0%, #1d4ed8 100%);
          color: #ffffff;
          border: 1px solid #1d4ed8;
          box-shadow: 0 1px 3px rgba(37, 99, 235, 0.25);
          &:hover:not(:disabled) {
            background: linear-gradient(180deg, #1d4ed8 0%, #1e40af 100%);
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
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
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1;
  transition: all 0.15s ease;

  ${(props) => {
    switch (props.variant) {
      case 'success':
        return `
          background-color: #ecfdf5;
          color: #065f46;
          border: 1px solid #a7f3d0;
        `;
      case 'warning':
        return `
          background-color: #fffbeb;
          color: #92400e;
          border: 1px solid #fde68a;
        `;
      case 'danger':
        return `
          background-color: #fef2f2;
          color: #991b1b;
          border: 1px solid #fecaca;
        `;
      case 'purple':
        return `
          background-color: #f5f3ff;
          color: #5b21b6;
          border: 1px solid #ddd6fe;
        `;
      case 'neutral':
        return `
          background-color: #f1f5f9;
          color: #334155;
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
  padding: 0.65rem 0.875rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  font-size: 0.875rem;
  color: #0f172a;
  background-color: #ffffff;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.18s ease, box-shadow 0.18s ease;

  &:hover {
    border-color: #cbd5e1;
  }

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
  }

  &::placeholder {
    color: #94a3b8;
  }

  &:disabled {
    background-color: #f8fafc;
    color: #94a3b8;
    cursor: not-allowed;
  }
`;

export const Label = styled.label`
  display: block;
  font-size: 0.825rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 0.35rem;
`;