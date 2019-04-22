import React, { Component } from 'react';
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'

class App extends Component {
  constructor() {
    super()
    this.state = {}
    this.getCategories = this.getCategories.bind(this)
  }

  componentDidMount() {
    this.getCategories()
  }

  fetch(endpoint) {
    return window.fetch(endpoint).then(response => response.json())
      .catch(error => console.log(error))
  }

  getCategories() {
    this.fetch('/api/categories').then(categories => {
      this.setState({categories: categories})
    })
  }

  render() {
    let { categories } = this.state
    return (categories ? 
      <Container text>
        <Header as='h2' icon textAlign='center' color='teal'>
          <Icon name='money' circular />
          <Header.Content>Gastos</Header.Content>
        </Header>
        <Divider hidden section />
        {categories && categories.length ?
          <Button.Group color='teal' fluid widths={categories.length}>
          {Object.keys(categories).map(key => {
            return <Button fluid key={key}>{categories[key].name}</Button>
          })}
          </Button.Group>
          : <Container textAlign='center'>No se encontraron categorias</Container>
        }
      </Container>
      : <Container text>
        <Dimmer active inverted>
          <Loader content='Loading' />
        </Dimmer>
      </Container>
    );
  }
}

export default App;
