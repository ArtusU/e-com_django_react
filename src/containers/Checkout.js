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
import { checkoutURL } from "../constants";


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

    let { token } = this.props.stripe.createToken();
    authAxios
      .post('checkoutURL', {
        stripeToken: token.id
      })
      .then(res => {
        this.setState({ loading: false, success: true });
      })
      .catch(err => {
        this.setState({ loading: false, error: err });
      });
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