import React, { Component } from 'react'
import axios from 'axios';

import TitulosLista from './TitulosLista'
import PageHeader from '../Templates/PageHeader';

const URL = 'http://localhost:45118'

export default class Titulos extends Component {
  constructor(props) {
      super(props)
      this.state = { titulo: '', list: [] }

      this.handleChange = this.handleChange.bind(this)
      this.handleAdd = this.handleAdd.bind(this)

      this.refresh()
  }

  refresh() {
      axios.get(`${URL}/api/Titulos/GetAll`)
          .then(resp => this.setState({...this.state, list: resp.data}))
  }

  handleChange(e) {
      this.setState({...this.state, titulo: e.target.value})
  }

  handleAdd() {
      const titulo = this.state.titulo
      axios.post(`${URL}/api/Titulos/AdicionarTitulo`, { titulo })
      .then(resp => this.refresh())
  }
  
  render(){
      return(
          <div>
              <PageHeader name="Titulos" small="Cadastro"/>
              <TitulosLista list={this.state.list} />
          </div>
      )
  }
}