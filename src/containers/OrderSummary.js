import React from 'react';
import { Button, Container, Header, Icon, Label, Menu, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { authAxios } from '../utils';
import {
  orderSummaryURL
} from '../constants';


class OrderSummary extends React.Component {
  state = {
    data: null,
    error: null,
    lading: false
  };

  componentDidMount() {
    this.handleFetchOrder()
  }

  handleFetchOrder = () => {
    this.setState({
      loading: true
    });
    authAxios
    .get(orderSummaryURL)
    .then(res => {
      this.setState({
        data: res.data,
        loading: false
      });
    })
    .catch(err => {
      if (err.response.status === 400) {
        this.setState({
          error: "You currently do not have an order.",
          loading: false
        });
      } else {
        this.setState({
          error: err,
          loading: false
        });
      }
    });
  };


    render() {
      const { data, error, loading } = this.state;
        return (
          <Container>
            <Header as='h3'>Order Summary</Header>
            {data && (
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Item #</Table.HeaderCell>
                    <Table.HeaderCell>Item name</Table.HeaderCell>
                    <Table.HeaderCell>Item price</Table.HeaderCell>
                    <Table.HeaderCell>Item quantity</Table.HeaderCell>
                    <Table.HeaderCell>Total item price</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {data.order_items.map((orderItem, i) => {
                    return (
                      <Table.Row key={orderItem.id}>
                        <Table.Cell>
                          {i}
                        </Table.Cell>
                        <Table.Cell>{orderItem.item}</Table.Cell>
                        <Table.Cell>£{orderItem.item_obj.price}</Table.Cell>
                        <Table.Cell>{ orderItem.quantity }</Table.Cell>
                        <Table.Cell>
                          {orderItem.item.discount_price && (
                            <Label color="green" ribbon>
                              ON DISCOUNT
                            </Label>
                          )}
                          £{orderItem.final_price}
                          <Icon
                            name="trash"
                            color="red"
                            style={{ float: "right", cursor: "pointer" }}
                          />
                        </Table.Cell>
                      </Table.Row>
                    )
                  })}
                  <Table.Row>
                    <Table.Cell />
                    <Table.Cell />
                    <Table.Cell />
                    <Table.Cell textAlign="right" colSpan="2">
                      Order Total: £{data.total}
                    </Table.Cell>
                  </Table.Row>
                
                </Table.Body>

                <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan='5' textAlign='right'>
                    <Link to='/checkout'><Button color='yellow'>
                      Checkout
                      </Button></Link>
                    </Table.HeaderCell>
                </Table.Row>
                </Table.Footer>
              </Table>
            )}
          </Container>
        )
    }
}

export default OrderSummary;