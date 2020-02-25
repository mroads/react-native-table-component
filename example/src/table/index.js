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
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { createViewPortConfig } from 'react-native-responsive-view-port';

const { vw } = createViewPortConfig();

export interface Props {
  headerConfig: Array<any>;
  bodyConfig: Array<any>;
}

const styles = StyleSheet.create({
  container: { padding: 26 * vw, height: 700 },
});

const Table = (props: Props) => {
  const { containerStyle } = props;
  const renderBody = () => {
    const { bodyConfig, headerConfig } = props;
    return headerConfig && headerConfig.map((headerElement, index) => (
      <View key={`header-${headerElement.text}`} style={headerElement.containerStyle}>
        <Text numberOfLines={1} style={headerElement.textStyle}>
          {headerElement.text}
        </Text>
        {bodyConfig && bodyConfig.map((bodyElement, rowIndex) => (
          headerElement.renderCell ? (
            headerElement.key ?
              headerElement.renderCell(bodyElement[headerElement.key], bodyElement) :
              headerElement.renderCell(bodyElement, bodyConfig, rowIndex)
          ) : (
              <Text numberOfLines={1} style={headerElement.textStyle}>
                {bodyElement[headerElement.key]}
              </Text>
            )
        ),
        )}
      </View>
    ));
  };
  return (
    <View contentContainerStyle={[containerStyle || styles.container]} scrollEnabled>
      <ScrollView>
        <View style={{ flexDirection: 'row'  }}>
          {renderBody()}
        </View>
      </ScrollView>
    </View>
);
}

export default Table;