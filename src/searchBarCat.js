import React, {Component} from 'react';
import App from './App';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';


class SearchBarCat extends Component{
    constructor(props){
        super(props);
        this.fetchAPI();
        //console.log("Search Bar props " + this.props.drink_name)
    }
    state = {
        list: [],
        return_home: false,
        bar_name: this.props.state.bar_name,
        category: this.props.state.category
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
      }

    fetchAPI() {
        fetch('http://localhost/bars/searchCategory?bar_name='+this.state.bar_name+'&drink_category='+this.state.category)
        .then(response => response.json())
          .then((data) => {
            //console.log(data)
            this.setState({list: data.bars});
        })
        .catch(console.log());
    }

    render(){
        if(this.state.return_home){
            return(
                <App return_home={this.state.return_home}/>
            )
        }
        else if(this.state.bar_name !== '' && this.state.category !== ''){
            return(
            <div>
                <form name="return_home" onSubmit={this.returnHome}>
                      <input type="submit" name="Return"/>
                </form>
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

export default SearchBarCat;