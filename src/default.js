import React, {Component} from 'react';
import SearchBar from './searchbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



class Default extends Component {
    constructor(props){
      super(props);
      //this.fetchAPI();
    }
    state = {
        search: '',
        list: []
    }

    updateSearch = search => {
      this.setState({ search });
    }


    fetchAPI() {
        fetch('http://localhost/bars/search')
        .then(response => response.json())
          .then((data) => {
            console.log(data)
            this.setState({list: data.bars});
        })
        .catch(console.log());
    }

    render() {
      return(
          <div>
              <center>Default List</center>
          </div>
      )
    }
}

export default Default;
