import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import {
  Button,
  Card,
  Dimmer,
  Divider,
  Form,
  Grid,
  Header,
  Image,
  Label,
  Loader,
  Menu,
  Message,
  Segment,
  Select,
  Table
} from 'semantic-ui-react';
import { addressListURL } from '../constants';
import { authAxios } from '../utils';


// class AddressForm extends React.Component {

//   render() {
//     return (
      
//     );
//   }
// }

class Profile extends React.Component {
  state = { 
    activeItem: 'billingAddress',
    error: null,
    loading: false,
    addresses: []
  }

  componentDidMount() {
    this.handleFetchAddresses();
  }

  handleItemClick = name => this.setState({ activeItem: name })

  handleFetchAddresses = () => {
    this.setState({ loading: true })
    authAxios.get(addressListURL)
    .then(res => {
      this.setState({ addresses: res.data, loading: false })
    })
    .catch(err => {
      this.setState({error: err });
    });
  };

  
  render() {
    const { activeItem, error, loading, addresses } = this.state

    return (
      <Grid container columns={2} divided>
        <Grid.Row columns={1}>
          <Grid.Column>
          {error && (
              <Message
                error
                header="There was an error"
                content={JSON.stringify(error)}
              />
            )}
            {loading && (
              <Segment>
                <Dimmer active inverted>
                  <Loader inverted>Loading</Loader>
                </Dimmer>
                <Image src="/images/wireframe/short-paragraph.png" />
              </Segment>
            )}
            {addresses.map(a => {
              return <div>
                a.street_address
              </div>
            })}

          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={6}>
            <Menu pointing vertical fluid>
              <Menu.Item
                name="Billing Address"
                active={activeItem === "billingAddress"}
                onClick={() => this.handleItemClick("billingAddress")}
              />
              <Menu.Item
                name="Shipping Address"
                active={activeItem === "shippingAddress"}
                onClick={() => this.handleItemClick("shippingAddress")}
              />
              <Menu.Item
                name="Payment history"
                active={activeItem === "paymentHistory"}
                onClick={() => this.handleItemClick("paymentHistory")}
              />
            </Menu>
          </Grid.Column>
          <Grid.Column width={10}>
            <Header>Header</Header>
            <Divider />
            {
              activeItem === 'billingAddress' ? (
              <Form>
                <Form.Input
                  required
                  name="street_address"
                  placeholder="Street address"
                />
                <Form.Input
                  required
                  name="apartment_address"
                  placeholder="Apartment address"
                />
                <Form.Field required>
                  <Select
                    fluid
                    clearable
                    search
                    name="country"
                    placeholder="Country"
                  />
                </Form.Field>
                <Form.Input
                  required
                  name="zip"
                  placeholder="Zip code"
                />
                <Form.Checkbox
                  name="default"
                  label="Make this the default address?"
                />
                <Form.Button>
                  Save
                </Form.Button>
              </Form>
              ):(
                <p>Shipping Address Form</p>
              )
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Profile;