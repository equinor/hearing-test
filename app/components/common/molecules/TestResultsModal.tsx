import React, { useState, useEffect } from 'react';

import { Modal, View } from 'react-native';
import TestLogPage from '../../../containers/TestLogPage';
import { TestResult } from '../../../types';
import Typography from '../atoms/Typography';
import IconButton from '../EDS/IconButton';
import TestResultItem from './TestResultItem';

const TestResultsModal = (props: { visible: boolean; setVisible: Function }) => {
  const [activePage, setActivePage] = useState(<></>);

  function setInvisible() {
    props.setVisible(false);
  }
  const setPage = (page: 'testLogPage' | 'testResultItem', data?: TestResult) => {
    if (page === 'testLogPage') {
      setActivePage(<TestLogPage showResults={d => setPage('testResultItem', d)} />);
    } else {
      setActivePage(<TestResultItem data={data} backToList={() => setPage('testLogPage')} />);
    }
  };

  // Once setPage is defined, we can set default active page
  useEffect(
    () => setActivePage(<TestLogPage showResults={data => setPage('testResultItem', data)} />),
    []
  );

  return (
    <Modal
      animationType="slide"
      presentationStyle="overFullScreen"
      transparent
      visible={props.visible}
      onDismiss={setInvisible}
      onRequestClose={setInvisible}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 24,
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
            setPage('testLogPage');
          }}
        />
        <Typography variant="h1">Din hørsel</Typography>
        <IconButton icon="close" onPress={setInvisible} />
      </View>
      {activePage}
    </Modal>
  );
};

export default TestResultsModal;
