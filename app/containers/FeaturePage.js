import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

import appJson from "../../app.json";
import * as actions from "../../store";
import { selectChangeLog, isFetching } from "../../store/changelog";
import { ChangeLog } from "../components/changelog";
class FeaturePage extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    setVersion: PropTypes.func.isRequired,
    fetchChangelog: PropTypes.func.isRequired,
    releaseNote: PropTypes.object,
    fetching: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    releaseNote: {},
  };

  componentWillMount() {
    const version = appJson.expo.version;
    this.props.fetchChangelog(version);
  }

  componentDidUpdate(prevProps) {
    const { fetching } = this.props;
    if (!fetching && prevProps.fetching && !this.props.releaseNote.changes) {
      // If releaseNotes errored on retrieval, go directly to main.
      // TODO
      //this.goToMain();
    }
  }

  goToMain = () => {
    this.props.setVersion(appJson.expo.version);
    this.props.navigation.navigate("DefaultRoute");
  };

  render() {
    const { releaseNote, fetching } = this.props;
    return (
      <ChangeLog
        releaseNote={releaseNote}
        fetching={fetching}
        affirm={() => this.goToMain()}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  // TODO: setVersion doesn't do anything
  setVersion: (version) => dispatch(actions.setVersion(version)),
  fetchChangelog: (version) => dispatch(actions.fetchChangelog(version)),
});

const mapStateToProps = (state) => ({
  releaseNote: selectChangeLog(state),
  fetching: isFetching(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeaturePage);
