/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import CustomTable from './src/table/index';


class App extends React.Component {
  tableHead = [
    {
      text: 'Profile Pic',
      containerStyle: styles.coloumnContainerStyle,
      textStyle: { fontSize: 20, textAlign: 'center' },
      renderCell: () => (
        <View
          style={styles.tableData}
        >
          <Text style={styles.bodyContent}>--</Text>
        </View>
      ),
    }, 
    {
      text: 'Name',
      containerStyle: styles.coloumnContainerStyle,
      textStyle: { fontSize: 20, textAlign: 'center' },
      renderCell: data => (
        <View
          style={styles.tableData}
        >
          <Text style={styles.bodyContent}>{data.name}</Text>
        </View>
      ),
    },
    {
      text: 'Age',
      containerStyle: styles.coloumnContainerStyle,
      textStyle: { fontSize: 20, textAlign: 'center' },
      renderCell: data => (
        <View
          style={styles.tableData}
        >
          <Text style={styles.bodyContent}>{data.age}</Text>
        </View>
      ),
    },
    {
      text: 'Designation',
      containerStyle: styles.coloumnContainerStyle,
      textStyle: { fontSize: 20, textAlign: 'center' },
      renderCell: data => (
        <View
          style={styles.tableData}
        >
          <Text style={styles.bodyContent}>{data.desg}</Text>
        </View>
      ),
    },
    {
      text: 'Location',
      containerStyle: styles.coloumnContainerStyle,
      textStyle: { fontSize: 20, textAlign: 'center' },
      renderCell: data => (
        <View
          style={styles.tableData}
        >
          <Text style={styles.bodyContent}>{data.location}</Text>
        </View>
      ),
    },
    {
      text: 'Show Details',
      containerStyle: styles.coloumnContainerStyle,
      textStyle: { fontSize: 20, textAlign: 'center' },
      renderCell: data => (
        <View style={styles.tableData}>
          <Button
            title="Show More"
            onPress={() => this.selectedStateHandler(data)}
        />
        </View>
      ),
    },
    {
      text: 'Drop',
      containerStyle: styles.coloumnContainerStyle,
      textStyle: { fontSize: 20, textAlign: 'center' },
      renderCell: data => (
        <View style={styles.tableData}>
          <Button
          title="Remove"
          color="red"
          onPress={() => this.removeEntryHandler(data)}
        />
        </View>
      ),
    },
  ];

  state = {
    tableData : [
      {
        name: 'Allen',
        age: '32',
        desg: 'Norwegian DJ',
        location: 'Northampton',
        uniqueID: 1,
        fullName: 'Allen Walker',
      },
      {
        name: 'Enrique',
        age: '37',
        desg: 'Singer-Songwriter',
        location: 'Madrid',
        uniqueID: 2,
        fullName: 'Enrique Iglesias',
      },
      {
        name: 'Selena',
        age: '27',
        desg: 'American Singer',
        location: 'Texas',
        uniqueID: 3,
        fullName: 'Selena Gomez',
      },
      {
        name: 'Taylor',
        age: '35',
        desg: 'American Singer',
        location: 'Pennsylvania',
        uniqueID: 4,
        fullName: 'Taylor Swift',
      },
    ],
    selectedState: null,
  };

  removeEntryHandler = data => {
    const { tableData } = this.state;
    const tempData = [...tableData];
    const index = tempData.findIndex(t => t.uniqueID === data.uniqueID);
    tempData.splice(index, 1);
    this.setState({ tableData: tempData });
  }

  selectedStateHandler = data => {
    const { selectedState, tableData } = this.state;
    const index = tableData.find(t => t.uniqueID === data.uniqueID);
    this.setState({ selectedState: index });
  }

  render(){
    const { tableData, selectedState } = this.state;
    return(
      <View style={{ flex: 1 }}>
        <CustomTable 
          headerConfig={this.tableHead}
          bodyConfig={tableData}
        />
        {selectedState ? <View style={{ height: 400, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 35 }}>Full Name: {selectedState.fullName}</Text>
          <Text style={{ fontSize: 35 }}>Age: {selectedState.age}</Text>
          <Text style={{ fontSize: 35 }}>Location: {selectedState.location}</Text>
          <Text style={{ fontSize: 35 }}>Designation: {selectedState.desg}</Text>
        </View> : null }
      </View>
    );
  }
}


const styles = StyleSheet.create({
  coloumnContainerStyle: {
    flex: 1,
    marginRight: 13.3,
  },
  tableHeader: {
    fontSize: 16,
    color: '#A4A4A4',
    letterSpacing: 0,
    marginBottom: 13.3,
  },
  tableData: { height: 54, justifyContent: 'center' },
  buttonStyle: { marginBottom: 100 },
  notificationImg: { height: 34, width: 34 },
  bodyContent: { width: '100%', textAlign: 'center' },
});

export default App;
