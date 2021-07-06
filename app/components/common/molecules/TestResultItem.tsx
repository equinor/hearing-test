import React from 'react';
import { SafeAreaView, View, Dimensions } from 'react-native';
import ImageModal from 'react-native-image-modal';
import { TestResult } from '../../../types';
import Typography from '../atoms/Typography';
import IconButton from '../EDS/IconButton';

const TestResultItem = (props: {
  data: TestResult;
  resetSelectedItem: Function;
  hideTop?: boolean;
}) => {
  return (
    <View style={{ flex: 1, paddingTop: 4, backgroundColor: 'white' }}>
      <SafeAreaView>
        {props.hideTop ? (
          <></>
        ) : (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 24,
            }}
          >
            <IconButton icon="chevron-left" onPress={props.resetSelectedItem} />
            <Typography variant="h2">
              {new Date(props.data.dateTaken).toLocaleDateString('nb-NO')}
            </Typography>
            <View style={{ width: 48, height: 48 }} />
          </View>
        )}
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 4,
            marginTop: 40,
            marginBottom: 20,
          }}
        >
          <Typography variant="p" style={{ paddingLeft: 18 }}>
            {props.data.name}
          </Typography>
          <View style={{ alignItems: 'center' }}>
            <ImageModal
              resizeMode="contain"
              imageBackgroundColor="#ffffff"
              style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').width * 0.8,
              }}
              source={{
                uri: props.data.audiogram,
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default TestResultItem;
