import React, { FC, ReactNode } from 'react'
import { Text, TextProps } from 'react-native'
interface Props extends TextProps {
  children: ReactNode;
  style?: TextProps;
  color?: string;
};

export const H1: FC<Props> = ({ children, style, color, ...props }) => (
  <Text style={[{ fontFamily: "bold", fontSize: 36, }, { color }, style]} {...props}>
    {children}
  </Text >)

export const B24: FC<Props> = ({ children, style, color, ...props }) => (
  <Text style={[{ fontFamily: "bold", fontSize: 24, }, { color }, style]} {...props}>
    {children}
  </Text >)

export const H2: FC<Props> = ({ children, style, color, ...props }) => (
  <Text style={[{ fontFamily: "medium", fontSize: 30, }, { color }, style]} {...props}>
    {children}
  </Text >)
  
export const H3: FC<Props> = ({ children, style, color, ...props }) => (
  <Text style={[{ fontFamily: "medium", fontSize: 24, lineHeight: 30 }, { color }, style]} {...props}>
    {children}
  </Text >)

export const H4: FC<Props> = ({ children, style, color, ...props }) => (
  <Text style={[{ fontFamily: "medium", fontSize: 20, }, { color }, style]} {...props}>
    {children}
  </Text >)

export const H5: FC<Props> = ({ children, style, color, ...props }) => (
  <Text style={[{ fontFamily: "medium", fontSize: 18, }, { color }, style]} {...props}>
    {children}
  </Text >)

export const H6: FC<Props> = ({ children, style, color, ...props }) => (
  <Text style={[{ fontFamily: "medium", fontSize: 16, }, { color }, style]} {...props}>
    {children}
  </Text >)

export const H7: FC<Props> = ({ children, style, color, ...props }) => (
  <Text style={[{ fontFamily: "medium", fontSize: 14, }, { color }, style]} {...props}>
    {children}
  </Text >)

export const H16: FC<Props> = ({ children, style, color, ...props }) => (
  <Text style={[{ fontFamily: "medium", fontSize: 16, }, { color }, style]} {...props}>
    {children}
  </Text >)

export const H18: FC<Props> = ({ children, style, color, ...props }) => (
  <Text style={[{ fontFamily: "medium", fontSize: 18, }, { color }, style]} {...props}>
    {children}
  </Text >)

export const H20: FC<Props> = ({ children, style, color, ...props }) => (
  <Text style={[{ fontFamily: "medium", fontSize: 20, }, { color }, style]} {...props}>
    {children}
  </Text >)

export const H24: FC<Props> = ({ children, style, color, ...props }) => (
  <Text style={[{ fontFamily: "medium", fontSize: 24, }, { color }, style]} {...props}>
    {children}
  </Text >)

export const H30: FC<Props> = ({ children, style, color, ...props }) => (
  <Text style={[{ fontFamily: "medium", fontSize: 30, }, { color }, style]} {...props}>
    {children}
  </Text >)

export const R20: FC<Props> = ({ children, style, color, ...props }) => (
  <Text style={[{ fontFamily: "regular", fontSize: 20, }, { color }, style]} {...props}>
    {children}
  </Text >)

export const R18: FC<Props> = ({ children, style, color, ...props }) => (
  <Text style={[{ fontFamily: "regular", fontSize: 18, }, { color }, style]} {...props}>
    {children}
  </Text >)

export const R16: FC<Props> = ({ children, style, color, ...props }) => (
  <Text style={[{ fontFamily: "regular", fontSize: 16, }, { color }, style]} {...props}>
    {children}
  </Text >)

export const R24: FC<Props> = ({ children, style, color, ...props }) => (
  <Text style={[{ fontFamily: "regular", fontSize: 24, }, { color }, style]} {...props}>
    {children}
  </Text >)

export const M16: FC<Props> = ({ children, style, color, ...props }) => (
  <Text style={[{ fontFamily: "medium", fontSize: 16, }, { color }, style]} {...props}>
    {children}
  </Text >)

export const M18: FC<Props> = ({ children, style, color, ...props }) => (
  <Text style={[{ fontFamily: "medium", fontSize: 18, }, { color }, style]} {...props}>
    {children}
  </Text >)

export const M20: FC<Props> = ({ children, style, color, ...props }) => (
  <Text style={[{ fontFamily: "medium", fontSize: 20, }, { color }, style]} {...props}>
    {children}
  </Text >)

export const M10: FC<Props> = ({ children, style, color, ...props }) => (
  <Text style={[{ fontFamily: "medium", fontSize: 10, }, { color }, style]} {...props}>
    {children}
  </Text >)

export const M14: FC<Props> = ({ children, style, color, ...props }) => (
  <Text style={[{ fontFamily: "medium", fontSize: 14, }, { color }, style]} {...props}>
    {children}
  </Text >)

export const R14: FC<Props> = ({ children, style, color, ...props }) => (
  <Text style={[{ fontFamily: "regular", fontSize: 14, }, { color }, style]} {...props}>
    {children}
  </Text >)

export const R13: FC<Props> = ({ children, style, color, ...props }) => (
  <Text style={[{ fontFamily: "regular", fontSize: 13, }, { color }, style]} {...props}>
    {children}
  </Text >)

export const R12: FC<Props> = ({ children, style, color, ...props }) => (
  <Text style={[{ fontFamily: "regular", fontSize: 12, }, { color }, style]} {...props}>
    {children}
  </Text >)

export const M12: FC<Props> = ({ children, style, color, ...props }) => (
  <Text style={[{ fontFamily: "medium", fontSize: 12, }, { color }, style]} {...props}>
    {children}
  </Text >)

export const M24: FC<Props> = ({ children, style, color, ...props }) => (
  <Text style={[{ fontFamily: "medium", fontSize: 24, }, { color }, style]} {...props}>
    {children}
  </Text >)

export const M30: FC<Props> = ({ children, style, color, ...props }) => (
  <Text style={[{ fontFamily: "medium", fontSize: 30, }, { color }, style]} {...props}>
    {children}
  </Text >)

export const L30: FC<Props> = ({ children, style, color, ...props }) => (
  <Text style={[{ fontFamily: "light", fontSize: 30, }, { color }, style]} {...props}>
    {children}
  </Text >)

