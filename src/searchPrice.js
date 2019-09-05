import React, {Component} from 'react';
import App from './App.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';


class SearchPrice extends Component{
    constructor(props){
        super(props);
        this.fetchAPI();
        //console.log("Search Bar props " + this.props.drink_name)
    }
    state = {
        list: [],
        return_home: false,
        price_high: this.props.state.price_high,
        price_low: this.props.state.price_low,
       }

    returnHome = (e) =>{
        e.preventDefault();
        this.setState({[e.target.name]: true})
    }

    addValue = (e) => {
        console.log(e.target.name)
        e.preventDefault();
        this.setState({[e.target.name]: true})
        this.fetchAPI();
      }
  
      updateInput = (e) => {
        this.setState({
          [e.target.name]: e.target.value,
        })
        console.log(`Update Input::` + e.target.name + " "+ e.target.value)
      }

    fetchAPI() {
        console.log(`price api`)
        if(this.state.price_low === '')
            this.setState({price_low: 0})
        if(this.state.price_high === '')
            this.setState({price_high: 1000})
        console.log("price high " + this.state.price_high + " price low " + this.state.price_low)
        fetch('http://localhost/bars/searchPrice?price_low='+this.state.price_low+'&price_high='+this.state.price_high)
        .then(response => response.json())
          .then((data) => {
            console.log(data)
            this.setState({list: data.bars});
        })
        .catch(console.log());
        console.log(this.state.list)
        
    }

    render(){
        if(this.state.return_home){
            return(
                <App return_home={this.state.return_home}/>
            )
        }
        else if(this.state.price_low !== '' && this.state.price_high !== ''){
            return(
            <div>
                <form name="return_home" onSubmit={this.returnHome}>
                      <input type="submit" name="Return"/>
                </form>
                <Container>
              <Row>
                <Col></Col>
                <Col xs={8}> 
                <center><h3>Search Between Prices</h3></center>
                  <Form name="search_price" onSubmit={this.addValue}>              
                    <Form.Group search_price="formSearchPrice">
                      <Form.Control type="text" name="price_low" placeholder="Enter Low Price" onChange={this.updateInput}/>
                      <p></p>
                      <Form.Control type="text" name="price_high" placeholder="Enter High Price" onChange={this.updateInput}/>
                      <p></p>
                      <center><Button variant="primary" type="submit">Submit</Button></center>
                      <br></br>
                      <br></br>
                    </Form.Group>
                  </Form>
                  </Col>
                  <Col></Col>
                </Row>
              </Container>
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
                    <form name="return_home" onSubmit={this.returnHome}>
                      <input type="submit" name="Return"/>
                    </form>
                    <center><h1>Drink list</h1></center>
                    <center><h3>List is Empty</h3></center>
                </div> 
            )
        }        
    }   
}

export default SearchPrice;