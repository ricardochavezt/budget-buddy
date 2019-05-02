import React, { Component } from 'react';
import { Container, Header, Icon, Divider, Form, Message } from 'semantic-ui-react'

class Home extends Component {
  constructor() {
    super()
      this.state = { loading: true }
    this.getCategories = this.getCategories.bind(this)
  }

  componentDidMount() {
    this.getCategories()
  }

  handleChange = (e, {name, value}) => this.setState({[name]: value})

    onSubmit = () => {
        this.setState({ loading: true, registerSuccess: false })
        const { amount, category_id, comment } = this.state
        this.post('/api/expenses', {
            amount: amount,
            category_id: category_id,
            comment: comment,
            made_at: new Date()
        }).then(json => {
            this.setState({
                loading: false, registerSuccess: true,
                amount: '', category_id: '', comment: ''
            })
        })
    }

  get(endpoint) {
    return window.fetch(endpoint).then(response => response.json())
      .catch(error => console.log(error))
  }

  post(endpoint, body) {
      return window.fetch(endpoint, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      }).then(response => response.json()).catch(error => console.log(error))
  }

  getCategories() {
      this.get('/api/categories').then(categories => {
          let categoryOptions = categories.map( c => {
              return {key: c.id, text: c.name, value: c.id}
          })
          this.setState({
              categories: categoryOptions,
              loading: false
          })
      })
  }

  render() {
    let { categories } = this.state
    return (
      <Container text>
        <Header as='h2' icon textAlign='center' color='teal'>
          <Icon name='money' circular />
          <Header.Content>Gastos</Header.Content>
        </Header>
        <Divider hidden section />
        <Form loading={this.state.loading} success={this.state.registerSuccess} onSubmit={this.onSubmit}>
            <Message success content='Registrado!' />
            <Form.Input name='amount' label='Monto' placeholder='Monto' type='number' step='0.01' required onChange={this.handleChange} />
            <Form.Select name='category_id' label='Categoría' placeholder='Categoría' options={categories} required onChange={this.handleChange} />
            <Form.Input name='comment' label='Comentario' placeholder='(opcional)' onChange={this.handleChange} />
            <Form.Button type='submit' color='teal' fluid>Registrar</Form.Button>
        </Form>
      </Container>
    );
  }
}

export default Home;
