import React, { FC, ReactNode } from 'react'
import { View, ViewProps } from 'react-native'

import tw from "twrnc"

interface Props extends ViewProps {
  children: ReactNode;
  style?: ViewProps;
};

export const RowView: FC<Props> = ({ children, style, ...props }) => (
  <View style={[tw`flex-row items-center`, style]} {...props}>
    {children}
  </View>
)

export const RowBetweenView: FC<Props> = ({ children, style, ...props }) => (
  <View style={[tw`flex-row justify-between items-center`, style]} {...props}>
    {children}
  </View>
)

export const RowEndView: FC<Props> = ({ children, style, ...props }) => (
  <View style={[tw`flex-row justify-end items-center`, style]} {...props}>
    {children}
  </View>
)

export const ColView: FC<Props> = ({ children, style, ...props }) => (
  <View style={[tw`flex-col`, style]} {...props}>
    {children}
  </View>
)

export const ColBetweenView: FC<Props> = ({ children, style, ...props }) => (
  <View style={[tw`flex-col justify-between`, style]} {...props}>
    {children}
  </View>
)

export const ColEndView: FC<Props> = ({ children, style, ...props }) => (
  <View style={[tw`flex-col justify-end`, style]} {...props}>
    {children}
  </View>
)

export const CenterView: FC<Props> = ({ children, style, ...props }) => (
  <View style={[tw`flex-col justify-center items-center`, style]} {...props}>
    {children}
  </View>
)
