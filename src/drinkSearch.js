import React, {Component} from 'react';
import { thisExpression } from '@babel/types';
import drinkSearchFormat from './drinkSearchFormat';


class drinkSearch extends Component {
    state = {
        list: []
    }

    componentDidMount() {
        fetch('http://localhost/bars/searchDrinks?drink_name=Vodka Sprite')
        .then(response => response.json())
        .then((data) => {
            this.setState({list: data})
            console.log(this.state.list)
        })
        .catch(console.log)
    }

    render() {
        return (
            <drinkSearchFormat drinks={this.state.list}/>
        )
    }
}

export default drinkSearch;