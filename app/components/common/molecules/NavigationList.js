import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as colors from '../../../stylesheets/colors';

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: colors.GRAY_BACKGROUND,
  },
  itemContainer: {
    backgroundColor: 'white',
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: colors.GRAY_3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: colors.BLACK_LIGHT,
    alignSelf: 'center',
  },
  textStyle: {
    fontSize: 16,
    color: colors.BLACK_GRAY,
    flex: 1,
    paddingHorizontal: 15,
  },
});

export default class NavigationList extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string,
        label: PropTypes.string,
        route: PropTypes.string,
        params: PropTypes.object,
      })
    ).isRequired,
    fetching: PropTypes.bool,
    navigation: PropTypes.object,
    onRefresh: PropTypes.func,
  };

  static defaultProps = {
    fetching: false,
    navigation: null,
    onRefresh: null,
  };

  handleClick = index => {
    const item = this.props.items[index];
    this.props.navigation.navigate(item.route, item.params);
  };

  renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => this.handleClick(index)} underlayColor={colors.GRAY_3}>
      <View style={styles.itemContainer}>
        <Text style={styles.textStyle}>{item.label}</Text>
        <Icon name="chevron-right" style={styles.icon} size={26} />
      </View>
    </TouchableOpacity>
  );

  render() {
    const { items, onRefresh, fetching } = this.props;
    return (
      <ScrollView
        style={styles.scrollView}
        refreshControl={onRefresh && <RefreshControl refreshing={fetching} onRefresh={onRefresh} />}
      >
        <FlatList data={items} keyExtractor={item => item.key} renderItem={this.renderItem} />
      </ScrollView>
    );
  }
}
