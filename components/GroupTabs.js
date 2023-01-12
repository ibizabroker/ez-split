import React, { useState } from 'react';
import { Tab, Text, TabView } from '@rneui/themed';
import AppBarWithBack from './AppBarWithBack';

const GroupTabs = () => {
  const [index, setIndex] = useState(0);

  return (
    <>
      <AppBarWithBack ez={'EZ '} split={'Split'} />
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: '#332940',
          height: 3,
        }}
        containerStyle={{
          backgroundColor: '#121212',
          borderBottomWidth: 1,
          borderBottomColor: '#808080'
        }}
      >
        <Tab.Item
          title="Expenses"
          titleStyle={{
            fontFamily: 'Montserrat', 
            fontSize: 14,
            color: index === 0 ? '#FFFFFF' : '#808080'
          }}
        />
        <Tab.Item
          title="Balances"
          titleStyle={{ 
            fontFamily: 'Montserrat', 
            fontSize: 14,
            color: index === 1 ? '#FFFFFF' : '#808080'
          }}
        />
        <Tab.Item
          title="Export"
          titleStyle={{ 
            fontFamily: 'Montserrat', 
            fontSize: 14,
            color: index === 2 ? '#FFFFFF' : '#808080'
          }}
        />
      </Tab>

      <TabView 
        value={index} 
        onChange={setIndex} 
        animationType="timing"
        minSwipeRatio={0.2}
        minSwipeSpeed={0.8}
      >
        <TabView.Item style={{ backgroundColor: '#121212', width: '100%' }}>
          <Text h1>Expenses</Text>
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: '#121212', width: '100%' }}>
          <Text h1>Balances</Text>
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: '#121212', width: '100%' }}>
          <Text h1>Export</Text>
        </TabView.Item>
      </TabView>
    </>
  );
};

export default GroupTabs;