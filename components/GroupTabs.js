import React, { useState } from 'react';
import { Tab, TabView } from '@rneui/themed';
import AppBarWithBack from './AppBarWithBack';
import Expenses from '../screens/Expenses';
import Balances from '../screens/Balances';
import Export from '../screens/Export';

const GroupTabs = ({ route }) => {
  const [index, setIndex] = useState(0);
  const { group } = route.params;

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
          <Expenses group={group}/>
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: '#121212', width: '100%' }}>
          <Balances group={group}/>
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: '#121212', width: '100%' }}>
          <Export group={group}/>
        </TabView.Item>
      </TabView>
    </>
  );
};

export default GroupTabs;