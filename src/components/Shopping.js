import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import Header from './Header'
import { addItem, unDoItem, reDoItem, toggleItem, filterItem } from '../actions'
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const styles = StyleSheet.create({

    container: {
        top: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    safeAreaContainer: {
        margin: 10,
        height: '50%',
    },
    listEmpty: {
        textAlign: 'center',
        marginTop: 50,
        color: 'rgb(88, 86, 214)'
    },
    inputView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    shoppingText: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
    },
    acionButton: {
        borderColor: 'grey',
        borderRadius: 5,
        borderWidth: 1,
        width: 100,
        height: 50,
        margin: 5,
        justifyContent: 'center'
    },
    shoppingButton: {
        borderColor: 'grey',
        borderRadius: 5,
        borderWidth: 1,
        width: 200,
        height: 50,
        margin: 5,
        justifyContent: 'center'
    },
    shoppingInput: {
        width: 200,
        height: 50,
        borderRadius: 5,
        borderColor: 'grey',
        borderWidth: 1,
        margin: 5,

    },
    itemView: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    itemText: {
        fontSize: 20,
        color: 'black',
        textAlign: 'left',
    },
    itemTextStrike: {
        fontSize: 20,
        color: 'black',
        textAlign: 'left',
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid'
    },

})
class Shopping extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            refresh: false,
            filtering: false,
            currentFilter: 'SHOWALL',
        }

        this.renderItem = this.renderItem.bind(this);
        this.addFunction = this.addFunction.bind(this);
        this.undoFunction = this.undoFunction.bind(this);
        this.redoFunction = this.redoFunction.bind(this);
        this.toggleIFunction = this.toggleIFunction.bind(this);
        this.filterFunction = this.filterFunction.bind(this);
    }

    async addFunction() {
        this.setState({ refresh: true })
        await this.props.addItem(this.state.name)
        if (this.state.currentFilter !== 'SHOWALL') {
            this.filterFunction(this.state.currentFilter);
        }
        this.setState({ refresh: false, name: '' })
    }
    async undoFunction() {
        this.setState({ refresh: true })
        await this.props.unDoItem()
        if (this.state.currentFilter !== 'SHOWALL') {
            this.filterFunction(this.state.currentFilter);
        }
        this.setState({ refresh: false })
    }

    async redoFunction() {
        this.setState({ refresh: true })
        await this.props.reDoItem()
        if (this.state.currentFilter !== 'SHOWALL') {
            this.filterFunction(this.state.currentFilter);
        }
        this.setState({ refresh: false })
    }
    async toggleIFunction(itemId) {
        this.setState({ refresh: true })
        await this.props.toggleItem(itemId);
        if (this.state.currentFilter !== 'SHOWALL') {
            this.filterFunction(this.state.currentFilter);
        }
        this.setState({ refresh: false })
    }

    async filterFunction(filter) {
        this.setState({ refresh: true, currentFilter: filter })
        await this.props.filterItem(filter, this.props.currentList);
        if (filter === 'SHOWALL') {
            this.setState({ filtering: false });
        } else {
            this.setState({ filtering: true });
        }
        this.setState({ refresh: false })


    }
    renderItem({ item }) {
        if (item.length === 0) {
            return;
        }
        return (
            <TouchableOpacity onPress={() => { this.toggleIFunction(item.id) }} style={styles.itemView}>
                <Text style={styles.itemText}>•</Text><Text style={item.completed === false ? styles.itemText : styles.itemTextStrike}> {item.text}</Text>
            </TouchableOpacity>
        );
    }
    render() {
        return (
            <View>
                <View style={styles.container}>
                    <Header />
                    <View style={styles.inputView}>
                        <TextInput
                            onChangeText={text => this.setState({ name: text })}
                            value={this.state.name}
                            style={styles.shoppingInput}
                        />
                        <TouchableOpacity onPress={() => { this.addFunction(this.state.name) }} style={styles.shoppingButton}><Text style={styles.shoppingText}>Add Shopping List</Text></TouchableOpacity>
                    </View>
                </View>
                <SafeAreaView style={styles.safeAreaContainer}>
                    <FlatList
                        data={!this.state.filtering ? this.props.currentList : this.props.filterStateObj.filterState}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id.toString()}
                        refreshing={this.state.refresh}
                        ListEmptyComponent={
                            <View style={{ height: 100, flex: 1 }}>
                                <Text style={styles.listEmpty}>  NO DATA  </Text>
                            </View>
                        }
                    />
                </SafeAreaView>
                <View style={styles.inputView}>
                    <Text style={styles.itemText}>Show:</Text>
                    <TouchableOpacity onPress={() => { this.filterFunction('SHOWALL'); }} style={styles.acionButton}><Text style={styles.shoppingText}>All</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.filterFunction('ACTIVE'); }} style={styles.acionButton}><Text style={styles.shoppingText}>Active</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.filterFunction('COMPLETED'); }} style={styles.acionButton}><Text style={styles.shoppingText}>Completed</Text></TouchableOpacity>
                </View>
                <View style={styles.inputView}>
                    <TouchableOpacity onPress={() => { this.undoFunction(); }} style={styles.acionButton}><Text style={styles.shoppingText}>Undo</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.redoFunction(); }} style={styles.acionButton}><Text style={styles.shoppingText}>Redo</Text></TouchableOpacity>
                </View>
            </View>


        );
    }
}
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        addItem,
        unDoItem,
        reDoItem,
        toggleItem,
        filterItem,
    }, dispatch)
);

const mapStateToProps = state => {
    return {
        currentList: state.cartRc.currentState,
        filterList: state.filterRc.filterState,
        filterStateObj: state.filterRc,
    }

};

Shopping.propTypes = {
    addItem: PropTypes.func.isRequired,
    unDoItem: PropTypes.func.isRequired,
    reDoItem: PropTypes.func.isRequired,
    toggleItem: PropTypes.func.isRequired,
    filterItem: PropTypes.func.isRequired,
};

Shopping.defaultProps = {
    currentList: [],
    filterList: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Shopping);
