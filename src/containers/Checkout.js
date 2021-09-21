import React, { Component } from "react";
import {
  CardElement,
  injectStripe,
  Elements,
  StripeProvider
} from "react-stripe-elements";
import {
  Button,
  Container,
  Dimmer,
  Divider,
  Form,
  Header,
  Image,
  Item,
  Label,
  Loader,
  Message,
  Segment,
  Select
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { authAxios } from "../utils";
import { checkoutURL, orderSummaryURL } from "../constants";


class OrderPreview extends Component {
  state = {
    data: null,
    loading: false,
    error: null
  };

  componentDidMount() {
    this.handleFetchOrder();
  }

  handleFetchOrder = () => {
    this.setState({ loading: true });
    authAxios
      .get(orderSummaryURL)
      .then(res => {
        console.log(res.data)
        this.setState({ data: res.data, loading: false });
      })
      .catch(err => {
        if (err.response.status === 404) {
          this.props.history.push("/products");
        } else {
          this.setState({ error: err, loading: false });
        }
      });
  };

  render() {
    const {data, error, loading } = this.state;
    return (
      <React.Fragment>
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

            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
          </Segment>
        )}
        { data && 
          <React.Fragment>
            <Item.Group relaxed>
            {data.order_items.map((orderItem, i) => {
              console.log(orderItem)
              return (
                <Item key={i}>
                  <Item.Image 
                  size='tiny' 
                  src={`http://127.0.0.1:8000${orderItem.item_obj.image}`}
                  />
                  <Item.Content verticalAlign='middle'>
                    <Item.Header 
                      as='a'
                      >
                      {orderItem.quantity} x {orderItem.item_obj.title}
                    </Item.Header>
                    <Item.Extra>
                      <Label>
                        £{orderItem.final_price}
                      </Label>
                    </Item.Extra>
                  </Item.Content>
                </Item>

                // <Table.Row key={orderItem.id}>
                //   <Table.Cell>
                //     {i}
                //   </Table.Cell>
                //   <Table.Cell>{orderItem.item}</Table.Cell>
                //   <Table.Cell>£{orderItem.item_obj.price}</Table.Cell>
                //   <Table.Cell>{ orderItem.quantity }</Table.Cell>
                //   <Table.Cell>
                //     {orderItem.item.discount_price && (
                //       <Label color="green" ribbon>
                //         ON DISCOUNT
                //       </Label>
                //     )}
                //     £{orderItem.final_price}
                //     <Icon
                //       name="trash"
                //       color="red"
                //       style={{ float: "right", cursor: "pointer" }}
                //     />
                //   </Table.Cell>
                // </Table.Row>
              )
            })}
            
              
            </Item.Group>

            <Item.Group>
              <Item>
                <Item.Content>
                  <Item.Header>
                    Order Total: £{data.total}
                  </Item.Header>,
                </Item.Content>
              </Item>
            </Item.Group>
          </React.Fragment>
        }
        
      </React.Fragment>
    )
  };
};


class CheckoutForm extends Component {
  state = {
    data: null,
    loading: false,
    error: null,
    success: false
  }

  submit = ev => {
    ev.preventDefault();
    this.setState({ loading: true });
    if (this.props.stripe) {
      this.props.stripe.createToken().then(result => {
        if (result.error) {
          this.setState({ error: result.error.message, loading: false });
        } else {
          this.setState({ error: null });
          authAxios
            .post(checkoutURL, {
              stripeToken: result.token.id
            })
            .then(res => {
              this.setState({ loading: false, success: true });
            })
            .catch(err => {
              this.setState({ loading: false, error: err });
            });
        }
      });
    } else {
      console.log("Stripe is not loaded");
    }
  };


  render() {
    const { error, loading, success } = this.state;
    
    return (
      <div>
        { error && (
          <Message
          error
          header="There was some errors with your submission"
          content={JSON.stringify(error)} 
          />
        )}
        { success && (
          <Message positive>
            <Message.Header>Your payment was successful</Message.Header>
            <p>
              Go to your <b>profile</b> to see your order delivery status.
            </p>
          </Message>
        )}

        <OrderPreview />

        <Divider />

        <Header>Would you like to complete the purchase?</Header>
        <CardElement />
        <Button
          loading={loading}
          disabled={loading}
          primary
          onClick={this.submit}
          style={{ marginTop: "20px"}}
          >
            Submit
        </Button>
      </div>
    );
  }
}


const InjectedForm = withRouter(injectStripe(CheckoutForm));

const WrappedForm = () => (
  <Container text>
    <StripeProvider apiKey="pk_test_51HVHJwGjLUpjNrZJDqvwOaunx2iEyXPdWmePrvoXFBbr8qDXcp9csZyVXNkxOYZCAfcDWWbFXo8QE7teREJEAaTC00yl1qLyO4">
      <div>
          <h1>Complete your order</h1>
          <Elements>
          <InjectedForm />
          </Elements>
      </div>
    </StripeProvider>
  </Container>
);

export default WrappedForm;