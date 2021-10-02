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


class Profile extends React.Component {
  state = { activeItem: 'billingAddress' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  
  render() {
    const { activeItem } = this.state

    return (
      <Grid>
        <Grid.Row>
        <Grid.Column width={6}>
            <Menu pointing vertical fluid>
              <Menu.Item
                name="Billing Address"
                active={activeItem === "billingAddress"}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name="Shipping Address"
                active={activeItem === "shippingAddress"}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name="Payment history"
                active={activeItem === "paymentHistory"}
                onClick={this.handleItemClick}
              />
            </Menu>
          </Grid.Column>
          <Grid.Column width={10}>
            <Header>Header</Header>
            <Divider />
            {
              activeItem === 'billingAddress' ? (
                <p>Billing Address Form</p>
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