import React, {Component} from 'react';
import { Modal, View } from 'react-native';
import TestLogPage from '../../../containers/TestLogPage';
import { TestResult } from '../../../types';
import Typography from '../atoms/Typography';
import IconButton from '../EDS/IconButton';
import TestResultItem from './TestResultItem';

class TestResultsModal extends Component<{visible:boolean, setVisible:CallableFunction}> {
    setPage = (page:"testLogPage" | 'testResultItem', data?:TestResult) => {
        if (page === 'testLogPage') {
            this.setState({activePage: this.testLogPage})
        } else {
            this.setState({activePage: <TestResultItem data={data} backToList={() => this.setPage('testLogPage')}/>})
        }
    }
    testLogPage = <TestLogPage showResults={(data) => this.setPage('testResultItem', data)}/>

    state = {
        activePage: this.testLogPage
    }

    setInvisible = () => {
        this.props.setVisible(false);
    }

    render() {
        return <Modal animationType="slide" presentationStyle="overFullScreen" transparent={true} visible={this.props.visible} onDismiss={this.setInvisible}onRequestClose={this.setInvisible}>
          <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', padding:24, borderBottomWidth:1, borderStyle:'solid', borderColor:'#DCDCDC', marginTop:110, backgroundColor:'white', borderTopRightRadius:12, borderTopLeftRadius:12,shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,  
        elevation: 5,}}>
            <IconButton icon="list" onPress={() => {this.setPage('testLogPage')}} />
            <Typography variant="h1">Din hørsel</Typography>
            <IconButton icon="close" onPress={this.setInvisible} />
          </View>
          {this.state.activePage}
        </Modal>
    }
}

export default TestResultsModal;