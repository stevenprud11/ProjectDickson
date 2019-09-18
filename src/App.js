import React, {Component} from 'react';
import Style from './index.css';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SearchDrink from './searchDrink';
import SearchBarCat from './searchBarCat';
import SearchPrice from './searchPrice';
import BarSearch from './barSearch';
import { exportDefaultSpecifier } from '@babel/types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';




class App extends Component {
    constructor(props){
      super(props);
      this.fetchAPI();
      if(this.props.return_home){
        this.setState({
          search_drink: false,
          search_bar_cat: false,
          search_drink: false,
          search_bar: false,
        })
      }
    }
    state = {
        list: [],
        drink_name: '',
        category: '',
        bar_name: '',
        price_low: '0',
        price_high: '1000',
        search_drink: false,
        search_bar_cat: false,
        search_price: false,
        search_bar: false,
        history: '',
        //styles: { width: '700px', }
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

    addValue = (e) => {
      console.log(e.target.name)
      e.preventDefault();
      this.setState({[e.target.name]: true})
      this.fetchAPI();
    }

    updateInput = (e) => {
      console.log(`target name update` + e.target.name)
      console.log(`target value update` + e.target.value)
      this.setState({
        [e.target.name]: e.target.value,
      })
    }

    createNav = () => {
      return(
        <div>
          <Router>
          <nav>
              <div class="logo mr-auto">
                <h4>Project Dickson</h4>
              </div>
              <ul class="nav-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/">Search</Link>
                </li>
                <li>
                    <Link to="/">Drink</Link>
                </li>
                <li>
                    <Link to="/">Category</Link>
                </li>
                <li>
                    <Link to="/">Price</Link>
                </li>
              </ul>
            </nav>
            {/* <Route exact path="/" component={App}/> */}

            </Router>
        </div>
      )
    }

    createBarSearch = () => {
      return(
        <div class="search">
              <div> 
                <center><h3 class="search_title">Search By Bar</h3></center>
                <Form name="search_bar" onSubmit={this.addValue}>
                    <center>
                    <input class="text_box" type="text" name="bar_name" placeholder="Enter Name of Bar"  onChange={this.updateInput}/>
                    </center>    
                    <p></p>
                    <center><Button variant="primary" type="submit">Submit</Button></center>
                </Form>
                <br></br>
              </div>
      </div>
      )
    }


    

    render() {
      if(this.state.search_drink===true){
        return(
          <SearchDrink state={this.state}/>
        )
      }
      else if(this.state.search_bar===true){
        return(
          <BarSearch state={this.state}/>
        )
      }
      else if(this.state.search_bar_cat===true){
        return(
          <SearchBarCat state={this.state}/>
        )
      }
      else if(this.state.search_price===true){
        return(
          <SearchPrice state={this.state}/>
        )
      }
      else{
        return (
          <div class="render">
            {this.createNav()}
            <br></br>
            {this.createBarSearch()}

            <Container>
              <Row>
                <Col></Col>
                <Col xs={8}> 
                  <div> 
                    <center><h3>Search By Drink</h3></center>
                    <Form name="search_drink" onSubmit={this.addValue}>              
                      <Form.Group search_drink="formSearchDrink">
                        <Form.Control type="text" name="drink_name" placeholder="Enter Name of Drink"  onChange={this.updateInput}/>
                        <p></p>
                        <center><Button variant="primary" type="submit">Submit</Button></center>
                      </Form.Group>
            </Form>
            <br></br>
                  </div>
                </Col>
                <Col></Col>
              </Row>
            </Container>




            <Container>
              <Row>
                <Col></Col>
                <Col xs={8}>
                <center><h3>Search By Category and Bar</h3> </center>
                  <Form name="search_bar_cat" onSubmit={this.addValue}>              
              <Form.Group search_bar_cat="formSearchBarCat">
                <Form.Control type="text" name="category" placeholder="Enter Category of Drink" onChange={this.updateInput}/>
                <p></p>
                <Form.Control type="text" name="bar_name" placeholder="Enter Name of Bar" onChange={this.updateInput}/>
                <p></p>
                <center><Button variant="primary" type="submit">Submit</Button></center>
                <br></br>
              </Form.Group>
            </Form>
                </Col>
                <Col></Col>
              </Row>
            </Container>



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
              <center><h3>Bar List</h3></center>
                <Row>
                  <Col> </Col>
                    <Col xs={10}>
                        {this.state.list.map((bar) => (
                                    <div className="card"> 
                                    <div className="card-body">
                                        <h5 className="card-title">{bar.bar_name}</h5>
                                        <h6 className="card-info">{bar.location}</h6>
                                    </div>
                                    </div>
                                    
                        ))}
                    </Col>
                <Col> </Col>
              </Row>
            </Container>



            <Container>
                <Row>
                  <Col></Col>
                  <Col xs={8}>
                    <br></br>
                    <h6>
                    Howdy, my name is Steven Prudhomme and I am a CS student at the University of Arkansas. 
                    I found a love for programming my sophomore year in High School and have continued to program
                    ever since. This is my first real-world project that I have taken on personally. The goal of this
                    web application is to help college students at the University of Arkansas find prices of drinks 
                    at various bars on Dickson St. before they go out for a night of fun. This application is made
                    by using a Postgres SQL Database, a Node.js app that connects to the database, and a React.js app 
                    that connects to the Node.js app via APIs. If you would like to contact me feel free to at 
                    stevenprud11@gmail.com. 
                    
                    Thanks for visiting my site. :)
                    </h6>
                  </Col>
                  <Col></Col>
                  </Row>
                </Container>
          </div>
        )
  
      }
  }
}

export default App;
