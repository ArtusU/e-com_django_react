import React from 'react'
import axios from 'axios'
import { Button, Dimmer, Container, Icon, Image, Item, Label, Loader, Message, Segment } from 'semantic-ui-react'
import { productListURL } from '../constants'

const paragraph = <Image src='/images/wireframe/short-paragraph.png' />

class ProductList extends React.Component {

  state = {
    loading: false,
    error: null,
    data: []
  }

  componentDidMount() {
    this.setState({loading: true});
    axios
    .get(productListURL)
    .then(res => {
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
  render() {
    const { data, error, loading } = this.state;
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
            <Item>
            <Item.Image src='/images/wireframe/image.png' />
        
            <Item.Content>
                <Item.Header as='a'>My Neighbor Totoro</Item.Header>
                <Item.Meta>
                <span className='cinema'>IFC Cinema</span>
                </Item.Meta>
                <Item.Description>{paragraph}</Item.Description>
                <Item.Extra>
                <Button primary floated='right' icon labelPosition='right'>
                    Add to cart
                    <Icon name='cart plus' />
                </Button>
                <Label>Limited</Label>
                </Item.Extra>
            </Item.Content>
            </Item>
        
            
        </Item.Group>
      </Container>
    )
  }
}

export default ProductList