import React, { useState } from 'react';

import { Modal, View } from 'react-native';
import TestLogPage from '../../../containers/TestLogPage';
import { TestResult } from '../../../types';
import Typography from '../atoms/Typography';
import IconButton from '../EDS/IconButton';
import TestResultItem from './TestResultItem';

const TestResultsModal = (props: { visible: boolean; setInvisible: Function }) => {
  const [selectedItem, setSelectedItem] = useState<TestResult | null>(null);

  return (
    <Modal
      animationType="slide"
      presentationStyle="overFullScreen"
      transparent
      visible={props.visible}
      onDismiss={() => props.setInvisible()}
      onRequestClose={() => props.setInvisible()}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 24,
          paddingVertical: 12,
          borderBottomWidth: 1,
          borderStyle: 'solid',
          borderColor: '#DCDCDC',
          marginTop: 110,
          backgroundColor: 'white',
          borderTopRightRadius: 12,
          borderTopLeftRadius: 12,
          shadowColor: '#000',
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 3,
          elevation: 5,
        }}
      >
        <IconButton
          icon="list"
          onPress={() => {
            setSelectedItem(null);
          }}
        />
        <Typography variant="h1">Din hørsel</Typography>
        <IconButton icon="close" onPress={() => props.setInvisible()} />
      </View>
      {selectedItem ? (
        <TestResultItem data={selectedItem} resetSelectedItem={() => setSelectedItem(null)} />
      ) : (
        <TestLogPage setSelectedItem={(d: TestResult) => setSelectedItem(d)} />
      )}
    </Modal>
  );
};

export default TestResultsModal;
