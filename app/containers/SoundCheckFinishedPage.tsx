import { View, Image, StyleSheet } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';
import Typography from '../components/common/atoms/Typography';
import thumbsUp from '../assets/thumbs-up.png';
import { GRAY_BACKGROUND } from '../stylesheets/colors';
import ButtonEDS from '../components/common/EDS/Button';
import { navigate } from '../navigation/service';

const styles = StyleSheet.create({
  component: {
    display: 'flex',
    flex: 1,
    backgroundColor: GRAY_BACKGROUND,
    padding: 54,
    paddingTop: 80,
  },
});

const SoundCheckFinishedPage = () => {
  return (
    <View style={styles.component}>
      <View style={{ display: 'flex', height: '100%' }}>
        <View style={{ alignItems: 'center' }}>
          <Image source={thumbsUp} style={{ height: 250, resizeMode: 'contain' }} />
        </View>
        <View style={{ marginTop: 32 }}>
          <Typography variant="p" style={{ textAlign: 'center', height: 18 * 4 }} numberOfLines={4}>
            Bra jobba! Du er klar for å ta hørselstesten.
          </Typography>
        </View>
        <View
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column-reverse',
            justifyContent: 'flex-start',
            paddingBottom: 32,
          }}
        >
          <ButtonEDS text="Start testen" onPress={() => navigate('TestRoute')} />
          <ButtonEDS text="Ta ny lydsjekk" onPress={() => navigate('SoundCheckRoute')} outlined />
        </View>
      </View>
    </View>
  );
};

const mapDispatchToProps = () => ({
  // TODO
});

const mapStateToProps = () => ({
  // TODO
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SoundCheckFinishedPage);
