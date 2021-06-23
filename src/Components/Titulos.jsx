import React, { Component } from 'react'
import axios from 'axios';
import {Button, Modal} from 'react-bootstrap'
import TitulosLista from './TitulosLista'
import PageHeader from '../Templates/PageHeader';

const URL = 'http://localhost:45118'
const parcela = { NumeroParcela: '', DataVencimento: '', Valor: '' }
const initialState = {
    lista: [],
    show: false,
    titulo: { NumeroTitulo: '', NomeDevedor: '', CpfDevedor: '', PercentualJuros: '', PercentualMulta: '', Parcelas: []},
    numeroParcelas: 1, 
    valorTotal: '',
    parcelas: [parcela],
}

export default class Titulos extends Component {
  constructor(props) {
      super(props)
      this.state = { ...initialState }

      this.handleChange = this.handleChange.bind(this)
      this.handleAdd = this.handleAdd.bind(this)

      this.refresh()
  }

  refresh() {
      this.setState({titulo: initialState.titulo})
      axios.get(`${URL}/api/Titulos/GetAll`)
          .then(resp => this.setState({...this.state, lista: resp.data}))
  }

  handleChange(e) {
      const titulo = {...this.state.titulo}
      titulo[e.target.name] = e.target.value
      this.setState({ titulo })
  }

//   handleChangeParcelas(e) {

//   }

  handleChangeParcela(e, index) {
      const novoArrayParcelas = [...this.state.parcelas]
      novoArrayParcelas[index][e.target.name] = e.target.value
      this.setState({parcelas: novoArrayParcelas})
  }

  adicionarParcela = () => {
      this.setState({parcelas: [...this.state.parcelas, {parcela}]})
  }

  handleAdd() {
      const titulo = this.state.titulo
      axios.post(`${URL}/api/Titulos/AdicionarTitulo`, { titulo })
      .then(resp => {this.refresh(); this.handleClose();} )
  }

  handleClose = () => this.setState({ show: false })
  handleShow = () => this.setState({ show: true })
  
  render(){
      return(
          <div>
              <PageHeader name="Titulos" small="Cadastro"/>
              <Button variant="primary" onClick={this.handleShow}>
                Adcionar novo Titulo
              </Button>
              <TitulosLista lista={this.state.lista} />

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Adicionar Titulo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label>Número do titulo</label>
                        <input id='NumeroTitulo' name='NumeroTitulo' className='form-control' placeholder='Número do titulo' 
                        onChange={e => this.handleChange(e)} value={this.state.titulo.NumeroTitulo}/>
                        <label>Nome do devedor</label>
                        <input id='NomeDevedor' name='NomeDevedor' className='form-control' placeholder='Nome do devedor' 
                        onChange={e => this.handleChange(e)} value={this.state.titulo.NomeDevedor}/>
                        <label>CPF do devedor(Somente Números)</label>
                        <input id='CpfDevedor' name='CpfDevedor' className='form-control' placeholder='CPF do devedor(Somente Números)' 
                        onChange={e => this.handleChange(e)} value={this.state.titulo.CpfDevedor} type='number' maxLength='11'/>
                        <label>Percentual de Juros</label>
                        <input id='PercentualJuros' name='PercentualJuros' className='form-control' placeholder='% Juros' 
                        onChange={e => this.handleChange(e)} value={this.state.titulo.PercentualJuros} type='number'/>
                        <label>Percentual Multa</label>
                        <input id='PercentualMulta' name='PercentualMulta' className='form-control' placeholder='% Multa' 
                        onChange={e => this.handleChange(e)} value={this.state.titulo.PercentualMulta} type='number'/>
                        {/* <label>Número de Parcelas</label>
                        <input id='numeroParcelas' name='numeroParcelas' className='form-control' placeholder='Número de Parcelas' 
                        onChange={e => this.handleChangeParcelas(e)} value={this.state.numeroParcelas} type='number'/>
                        <label>Valor Total</label>
                        <input id='valorTotal' name='valorTotal' className='form-control' placeholder='Valor Total' 
                        onChange={e => this.handleChangeParcelas(e)} value={this.state.valorTotal} type='number'/> */}
                        <br/>
                        <Button onClick={this.adicionarParcela}>Adicionar Parcela</Button>
                        {this.state.parcelas.map((p, index) => {
                            return (
                                <div>
                                    <label>Numero Parcela</label>
                                    <input id='NumeroParcela' name='NumeroParcela' className='form-control' placeholder='Número Parcela' 
                                    onChange={e => this.handleChangeParcela(e, index)} value={p.NumeroParcela} type='number'/>
                                    <label>Data Vencimento</label>
                                    <input id='DataVencimento' name='DataVencimento' className='form-control' placeholder='Data Vencimento' 
                                    onChange={e => this.handleChangeParcela(e, index)} value={p.DataVencimento} type='date'/>
                                    <label>Valor Parcela</label>
                                    <input id='Valor' name='Valor' className='form-control' placeholder='Valor Parcela' 
                                    onChange={e => this.handleChangeParcela(e, index)} value={p.Valor} type='number'/>
                                    <br/>
                                </div>
                            )
                        })}
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleAdd}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
          </div>
      )
  }
}