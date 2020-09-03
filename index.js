/* eslint-disable prettier/prettier */
/* eslint-disable guard-for-in */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */

/* Copyright (C) mroads, LLC - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Sumit Kumar Dubey <sumit.dubey@mroads.com>,June 2019.
 * @format
 * @flow
 */

import React from 'react';
import { StyleSheet, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { createViewPortConfig } from 'react-native-responsive-view-port';

const { vw } = createViewPortConfig();

export interface TableProps {
  containerStyle?: Object;
  headerConfig: Array<any>;
  bodyConfig: Array<any>;
}

export interface ColumnProps {
  headerElement: Object;
  bodyConfig: Array<any>;
}

const styles = StyleSheet.create({
  container: { padding: 26 * vw, height: 700 },
});

const Column = (props: ColumnProps) => {
  const { headerElement, bodyConfig, onPress } = props;
  return (
    <TouchableOpacity style={headerElement.containerStyle} onPress={() => onPress && onPress(headerElement)}>
      <Text numberOfLines={1} style={headerElement.textStyle}>
        {headerElement.text}
      </Text>
      {bodyConfig && bodyConfig.map((bodyElement, rowIndex) => (
        headerElement.renderCell ? (
          headerElement.key ?
            headerElement.renderCell(bodyElement[headerElement.key], bodyElement, rowIndex) :
            headerElement.renderCell(bodyElement, bodyConfig, rowIndex)
        ) : (
            <Text key={`headerText${rowIndex}`} numberOfLines={1} style={headerElement.textStyle}>
              {bodyElement[headerElement.key]}
            </Text>
          )
      ),
      )}
    </TouchableOpacity>
  );
};

const Table = (props: TableProps) => {
  const { containerStyle, ...remainingProps } = props;

  const onHeaderElementPress = ele => {
    const { onHeaderPress } = props;
    onHeaderPress && onHeaderPress(ele);
  }

  const renderBody = () => {
    const { bodyConfig, headerConfig } = props;
    return headerConfig && headerConfig.map((headerElement) => <Column key={`headerText${headerElement.key}`} headerElement={headerElement} bodyConfig={bodyConfig} onPress={ele => onHeaderElementPress(ele)} />);
  };

  return (
    <ScrollView {...remainingProps} contentContainerStyle={[containerStyle || styles.container]}>
      <View style={{ flexDirection: 'row' }}>
        {renderBody()}
      </View>
    </ScrollView>
  );
}

export default Table;