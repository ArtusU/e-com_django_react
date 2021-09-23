import React from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import { connect } from 'react-redux';

import { Button, Card, Dimmer, Form, Grid, Container, Icon, Image, Item, Label, Loader, Message, Segment, Select, Divider } from 'semantic-ui-react'
import { productDetailURL, addToCartURL } from '../constants'
import { authAxios } from '../utils'
import { fetchCart } from '../store/actions/cart'


class ProductDetail extends React.Component {

  state = {
    loading: false,
    error: null,
    data: []
  }

  componentDidMount() {
    this.handleFetchItem();
    
  }

  handleFetchItem = () => {
    const {
      match: { params }

    } = this.props;
    this.setState({loading: true});
    axios
    .get(productDetailURL(params.productID))
    .then(res => {
      console.log(res.data)
      this.setState({
        data: res.data,
        loading: false
      })
    })
    .catch(err => {
      this.setState({ 
        error: err,
        loading: false 
      })
    })
  }

  handleAddToCart = slug => {
    this.setState({loading: true});
    authAxios
    .post(addToCartURL, {slug})
    .then(res => {
      this.props.fetchCart();
      this.setState({
        loading: false
      })
    })
    .catch(err => {
      this.setState({ 
        error: err,
        loading: false 
      })
    })
  }

  render() {
    const { data, error, loading } = this.state;
    const item = data;
    return (
      <Container>
        {error && (
          <Message
          error
          header='There was some errors with your submission'
          content={JSON.stringify(error)}
        />
        )}
        {loading && (
          <Segment>
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
    
          <Image src='/images/wireframe/short-paragraph.png' />
        </Segment>
        )}
        <Item.Group divided>
            return <Item key={item.id}>
            <Item.Image src={item.image} />
            <Item.Content>
                <Item.Header as='a'>{item.title}</Item.Header>
                <Item.Meta>
                <span className='cinema'>{item.category}</span>
                </Item.Meta>
                <Item.Description>{item.description}</Item.Description>
                <Item.Extra>
                <Button 
                  primary 
                  floated='right' 
                  icon 
                  labelPosition='right' 
                  onClick={() => this.handleAddToCart(item.slug)}
                  >
                  Add to cart
                  <Icon name='cart plus' />
                </Button>
                {item.discount_price && <Label color={
                  item.label === 'primary' 
                  ? 'blue' 
                  : item.label === 'secondary' 
                  ? 'green' : 'olive'
                  }>{item.label}</Label>}
                </Item.Extra>
            </Item.Content>
            </Item>
        </Item.Group>
      </Container>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    fetchCart: () => dispatch(fetchCart())
  }
}

export default withRouter (
  connect(
    null,
    mapDispatchToProps
    )(ProductDetail)
);