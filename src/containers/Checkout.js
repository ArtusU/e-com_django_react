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


class CheckoutForm extends Component {
  render() {
    return (
      <div>
        <Header>Would you like to complete the purchase?</Header>
          <CardElement />
        <Button primary onClick={this.submit} style={{ marginTop: "20px"}}>Submit</Button>
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