import React, { Component } from 'react';
import { Container } from 'native-base';
import { StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    shoppingText: {
        fontSize: 20
    },
    shopingInput: {
        width: 200,
    }
})
class Shopping extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemList: [],
            latestActionList: [],
            latestUndoList: [],
            popedItemList: [],
            totalActive: 0,
            totalComplete: 0,
            currentItemId: 0,
        }
        this.addItem = this.addItem.bind(this);
        this.undoItem = this.undoItem.bind(this);
        this.markItem = this.markItem.bind(this);
        // this.redoI
    }
    componentWillMount() {
        //  alert('test shoping')
    }
    addItem(name) {
        let item = { name: name, id: this.state.currentItemId + 1, status: 'active' };
        let itemList = this.state.itemList;
        itemList.push({ itemAction })

        let latestActionList = this.state.latestActionList;
        let itemAction = { name: 'add', item: { ...item } }
        latestActionList.push({ itemAction });

        this.setState({ itemList, latestActionList });

    }

    markItem(id, byUndo) {
        let itemList = this.state.itemList;
        let latestActionList = this.state.latestActionList;

        if (itemList[id - 1].status == 'active') {
            itemList[id - 1].status = 'complete';
        } else {
            itemList[id - 1].status = 'active'
        }
        if (!byUndo) {
            let itemAction = { name: 'mark', item: { ...itemList[id - 1] } }
            latestActionList.push({ itemAction });
        }
        if (byUndo) {
            latestActionList.pop();
            let latestUndoList = this.state.latestUndoList;
            latestUndoList.push({ name: 'unDomark', item: { ...itemList[id - 1] } });
        }
        this.setState({ itemList, latestActionList })
    }

    undoItem() {
        if (this.state.latestActionList[this.latestActionList.length - 1].name === 'add') {
            let itemList = this.state.itemList;
            let popedItem = itemList[itemList.length - 1];
            let latestUndoList = this.state.latestUndoList;

            let latestActionList = this.state.latestActionList;
            latestActionList.pop();
            latestUndoList.push({ name: 'unDoadd', item: { ...popedItem } });
            itemList.pop();
            this.setState({ itemList, popedItemList, latestActionList });
        }
        if (this.state.latestActionList[this.latestActionList.length - 1].name === 'mark') {
            let id = this.state.latestActionList[this.latestActionList.length - 1].item.id;
            this.markItem(id, true)
        }

    }

    redoItem() {

        if(this.state.latestUndoList[this.latestUndoList.length-1].name === 'unDoadd'){
            let itemList = this.state.itemList;
        }
    }



    render() {
        return (
            <Container>
                {/* <View>
                    <Text>Header</Text>
                </View> */}
                <View style={styles.inputView}>
                    <Text style={styles.shoppingText}>Shopping List</Text>
                    <TextInput

                        style={styles.shoppingInput}
                    />
                </View>
            </Container>



        );
    }
}
const mapStateToProps = state => {

}
export default Shopping;
