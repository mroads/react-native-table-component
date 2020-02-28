# react-native-table-component

This is a custom table component which can be used to create a tabular data of n entries based upon our requirements.

## Installation

Use the package manager to install.

```bash
$ npm install react-native-table-component-mroads --save
```
 or

```bash
$ yarn add react-native-table-component-mroads
```
## Usage

| Prop           | Required|     Default     |   Type   | Description                                                                                                 |
| :---------------- | :-------------: | :-------------: | :------: | :---------------------------------------------------------------------------------------------------------- |
| header     |     true      |     -      |  `Array<header>`  | It is an array of the number of columns that is going to be present in the table.|
| data     |     true      |     -      |  `Array<data>`  | It is an array of Objects containing the entries that needs to go in the table.|
| containerStyle     |     false      |     -      |  -  | The style of the container in which the table exists.|

Description of the Props passed:

1. header: It is an array of the number of columns you are going to have in your table. Refer below the structure of the Array that needs to be maintained. Make sure you use the same name of the items referred below.

|Property|Description|Type| 
| :---------------- | :-------------: | :-------------: | 
| text | The name of the column you want |   String    | 
| containerStyle    |   The style of the individual column you want     |     Object      |  
|renderCell    |   A callback function that gets executed for every individual entry of the column   |     Component     |  
|key    |   A unique value that identifies every single column in the DOM.   |     -     |  

2. data: It is an array of key value pairs that contain the entries of a single row.

|property|description|
| :---------------- | :-------------: |
|{ Col1.key: "value you give" }, | It shohuld be of the same type as of the header. |
NOTE: The number of key value pairs should be equal to the number of columns you have.


## Example
![](https://s5.gifyu.com/images/ezgif.com-video-to-gif-11255917ab9fa8769.gif)

```javascript
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
import CustomTable from 'react-native-table-component';


class App extends React.Component {
  tableHead = [ 
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
```