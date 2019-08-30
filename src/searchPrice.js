import React, {Component} from 'react';
import App from './App.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class SearchPrice extends Component{
    constructor(props){
        super(props);
        //console.log("Search Bar props " + this.props.drink_name)
    }
    state = {
        list: [],
        return_home: false,
       }

    returnHome = (e) =>{
        e.preventDefault();
        this.setState({[e.target.name]: true})
    }

    fetchAPI() {
        if(this.props.state.price_low === '')
            this.props.setState(this.props.state.price_low=0)
        if(this.props.state.price_high === '')
            this.props.setState(this.props.state.price_high=1000)
        
        fetch('http://localhost/bars/searchPrice?price_low='+this.props.state.price_low+'&price_high='+this.props.state.price_high)
        .then(response => response.json())
          .then((data) => {
            //console.log(data)
            this.setState({list: data.bars});
        })
        .catch(console.log());
    }

    render(){
        this.fetchAPI();
        if(this.state.return_home){
            return(
                <App return_home={this.state.return_home}/>
            )
        }
        else if(this.props.state.price_low !== '' && this.props.state.price_high !== ''){
            return(
            <div>
                <form name="return_home" onSubmit={this.returnHome}>
                      <input type="submit" name="Return"/>
                </form>
                <Container>
              <center><h3>Drink List</h3></center>
                <Row>
                  <Col> </Col>
                    <Col xs={10}>
                    {this.state.list.map((drink) => (
                        <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{drink.bar_name}</h5>
                            <h6 className="card-url">{drink.drink_name} ${drink.price}</h6>
                        </div>
                        </div>  
                ))}
                    </Col>
                <Col> </Col>
              </Row>
            </Container>
            </div>
            )
        }
        else{
            return (
                <div>
                    <center><h1>Drink list</h1></center>
                    <center><h3>List is Empty</h3></center>
                </div> 
            )
        }        
    }   
}

export default SearchPrice;