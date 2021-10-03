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
import { addressListURL, addressCreateURL, countryListURL, userIDURL } from '../constants';
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
    addresses: [],
    countries: [],
    formData: { default: false },
    saving: false,
    success: false,
    userID: null
  }

  componentDidMount() {
    this.handleFetchAddresses();
    this.handleFetchCountries();
    this.handleFetchUserID();
  }

  handleItemClick = name => this.setState({ activeItem: name })

  handleFormatCountries = countries => {
    const keys = Object.keys(countries);
    return keys.map(k => {
      return {
        key: k,
        text: countries[k],
        value: k
      };
    });
  };

  handleFetchUserID = () => {
    authAxios
      .get(userIDURL)
      .then(res => {
        console.log(res.data)
        this.setState({ userID: res.data.userID });
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };

  handleFetchCountries = () => {
    authAxios.get(countryListURL)
    .then(res => {
      this.setState({ countries: this.handleFormatCountries(res.data) });
    })
    .catch(err => {
      this.setState({error: err });
    });
  };

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

  handleToggleDefault = () => {
    const { formData } = this.state;
    const updatedFormdata = {
      ...formData,
      default: !formData.default
    };
    this.setState({
      formData: updatedFormdata
    });
  };

  handleChange = e => {
    const { formData } = this.state;
    const updatedFormdata = {
      ...formData,
      [e.target.name]: e.target.value
    }
    this.setState({
      formData: updatedFormdata
    });
  };

  handleSelectChange = (e, { name, value }) => {
    const { formData } = this.state;
    const updatedFormdata = {
      ...formData,
      [name]: value
    };
    this.setState({
      formData: updatedFormdata
    });
  };

  handleCreateAddress = e => {
    this.setState({ saving: true })
    e.preventDefault();
    const { activeItem, formData, userID } = this.state;
    authAxios
      .post(addressCreateURL, {
        ...formData,
        user: userID,
        address_type: activeItem === "billingAddress" ? "B" : "S"
      })
      .then(res => {
        this.setState({
          saving: false,
          success: true,
        });
        this.props.callback();
      })
      .catch(err => {
        this.setState({ error: err });
      });
  };


  render() {
    const { activeItem, error, loading, addresses, countries, saving, success } = this.state;

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
              <Form onSubmit={this.handleCreateAddress} success={success}>
                <Form.Input
                  required
                  name="street_address"
                  placeholder="Street address"
                  onChange={this.handleChange}
                />
                <Form.Input
                  required
                  name="apartment_address"
                  placeholder="Apartment address"
                  onChange={this.handleChange}
                />
                <Form.Field required>
                  <Select
                    loading={countries.length < 1 }
                    fluid
                    clearable
                    search
                    options={countries}
                    name="country"
                    placeholder="Country"
                    onChange={this.handleSelectChange}
                  />
                </Form.Field>
                <Form.Input
                  required
                  name="zip"
                  placeholder="Zip code"
                  onChange={this.handleChange}
                />
                <Form.Checkbox
                  name="default"
                  label="Make this the default address?"
                  onChange={this.handleToggleDefault}
                />
                {success && (
                  <Message success header="Success!" content="Your address was saved" />
                )}
                <Form.Button disabled={saving} loading={saving} primary>
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