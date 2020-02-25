/* eslint-disable prettier/prettier */
/* eslint-disable guard-for-in */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */

/* Copyright (C) mroads, LLC - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Sameer Srivastav <sameer@mroads.com>,June 2019.
 * @format
 * @flow
 */

import React from 'react';
import { StyleSheet, FlatList, ScrollView } from 'react-native';
import { Container, Text, Content, Row, Grid, Col, View } from 'native-base';

const vw = 1;
const vh = 1;

export interface Props {
  headerConfig: Array<any>;
  bodyConfig: Array<any>;
  bodyText?: number;
  headerText?: number;
  onPress?: Function;
  theme?: string;
}

const fonts = {
  bodyText: 24 * vh,
  headerText: 26 * vh,
};

const styles = StyleSheet.create({
  container: { padding: 26 * vw, height: 700 },
});


// eslint-disable-next-line react/prefer-stateless-function
export default class Table extends React.Component<Props> {
  renderBody = () => {
    const { bodyConfig, headerConfig } = this.props;
    return headerConfig && headerConfig.map((headerElement, index) => (
      <Col key={`header-${headerElement.text}`} style={headerElement.containerStyle}>
        <Text numberOfLines={1} style={headerElement.textStyle}>
          {headerElement.text}
        </Text>
        {bodyConfig && bodyConfig.map((bodyElement, rowIndex) => (
          // eslint-disable-next-line no-nested-ternary
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
      </Col>
    ));
  };

  render() {
    const { theme, containerStyle } = this.props;
    return (
      <Container>
        <Content contentContainerStyle={[containerStyle || styles.container, { backgroundColor: theme === 'dark' ? '#2A2A2A' : 'transparent' }]} scrollEnabled>
          <ScrollView>
            <Grid>
              {this.renderBody()}
            </Grid>
          </ScrollView>

        </Content>
      </Container>
    );
  }
}

