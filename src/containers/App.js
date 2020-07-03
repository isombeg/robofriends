import React, {Component} from 'react';
import {connect} from 'react-redux'
import CardList from '../components/CardList';
import SearchBox from '../SearchBox'
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';

import {setSearchField} from '../actions'

const mapStateToProps = state => {
    return {
        searchField: state.searchField
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value))
    }
}

class App extends Component{
    constructor(){
        super();
        this.state = {
            robots: [],
        }
    }
    
    componentDidMount(){
        console.log(this.props.store);
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({robots: users}));
    }
    
    render(){
        const filteredRobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.props.searchField.toLowerCase())
        });
        if (this.state.robots.length === 0){
            return <h1>Loading</h1>
        }
        else return (
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchChange={this.props.onSearchChange}/>
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots}/>
                    </ErrorBoundary>
                </Scroll>
            </div>
        );
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(App);