import React, { Component } from 'react'
import axios from 'axios';
import {Button, Modal} from 'react-bootstrap'
import Alert from 'react-bootstrap/Alert';
import TitulosLista from './TitulosLista'
import PageHeader from '../Templates/PageHeader';

const URL = 'http://localhost:45118'
const parcela = { numeroParcela: '', dataVencimento: '', valor: '' }
const initialState = {
    lista: [],
    show: false,
    titulo: { numeroTitulo: '', nomeDevedor: '', cpfDevedor: '', percentualJuros: '', percentualMulta: '', parcelas: []},
    parcelas: [parcela],
    showErrorAlert: false,
    errorMsg: ''
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
      titulo[e.target.name] = e.target.type === "number" ? parseFloat(e.target.value) : e.target.value
      this.setState({ titulo })
  }

//   handleChangeparcelas(e) {

//   }

  handleChangeParcela(e, index) {
      let parcela = {...this.state.parcelas[index]}
      parcela[e.target.name] = e.target.type === "number" ? parseFloat(e.target.value) : e.target.value
      let novoArrayparcelas = [...this.state.parcelas]
      novoArrayparcelas[index] = parcela
      this.setState({parcelas: novoArrayparcelas})
  }

  adicionarParcela = () => {
      const novoArray = this.state.parcelas.slice();
      novoArray.push(parcela);
      this.setState({ parcelas: novoArray });
  }

  handleAdd() {
      const titulo = this.state.titulo
      titulo.numeroTitulo = parseInt(titulo.numeroTitulo)
      titulo.percentualJuros = parseFloat(titulo.percentualJuros)
      titulo.percentualMulta = parseFloat(titulo.percentualMulta)
      titulo.parcelas = this.state.parcelas
      axios.post(`${URL}/api/Titulos/AdicionarTitulo`, titulo )
      .then(resp => {this.refresh(); this.handleClose();} )
      .catch(error => this.setState({showErrorAlert: true, errorMsg: error.message}))
  }

  handleClose = () => this.setState({ show: false })
  handleShow = () => this.setState({ show: true })
  handleCloseErrorAlert = () => this.setState({ showErrorAlert: false})
  
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
                        <Alert variant="danger" show={this.state.showErrorAlert}>
                            {this.state.errorMsg}
                            <br/>
                            <div className="d-flex justify-content-end">
                                <Button onClick={this.handleCloseErrorAlert}>
                                    Fechar
                                </Button>
                            </div>
                        </Alert>


                        <label>N??mero do titulo</label>
                        <input id='numeroTitulo' name='numeroTitulo' className='form-control' placeholder='N??mero do titulo' 
                        onChange={e => this.handleChange(e)} value={this.state.titulo.numeroTitulo} type='number'/>
                        <label>Nome do devedor</label>
                        <input id='nomeDevedor' name='nomeDevedor' className='form-control' placeholder='Nome do devedor' 
                        onChange={e => this.handleChange(e)} value={this.state.titulo.nomeDevedor}/>
                        <label>CPF do devedor</label>
                        <input id='cpfDevedor' name='cpfDevedor' className='form-control' placeholder='CPF do devedor' 
                        onChange={e => this.handleChange(e)} value={this.state.titulo.cpfDevedor} maxLength='11'/>
                        <label>Percentual de Juros</label>
                        <input id='percentualJuros' name='percentualJuros' className='form-control' placeholder='% Juros' 
                        onChange={e => this.handleChange(e)} value={this.state.titulo.percentualJuros} type='number'/>
                        <label>Percentual Multa</label>
                        <input id='percentualMulta' name='percentualMulta' className='form-control' placeholder='% Multa' 
                        onChange={e => this.handleChange(e)} value={this.state.titulo.percentualMulta} type='number'/>
                        {/* <label>N??mero de parcelas</label>
                        <input id='numeroparcelas' name='numeroparcelas' className='form-control' placeholder='N??mero de parcelas' 
                        onChange={e => this.handleChangeparcelas(e)} value={this.state.numeroparcelas} type='number'/>
                        <label>valor Total</label>
                        <input id='valorTotal' name='valorTotal' className='form-control' placeholder='valor Total' 
                        onChange={e => this.handleChangeparcelas(e)} value={this.state.valorTotal} type='number'/> */}
                        <br/>
                        <Button onClick={this.adicionarParcela}>Adicionar Parcela</Button>
                        {this.state.parcelas.map((p, index) => {
                            return (
                                <div>
                                    <label>Numero Parcela</label>
                                    <input id='numeroParcela' name='numeroParcela' className='form-control' placeholder='N??mero Parcela' 
                                    onChange={e => this.handleChangeParcela(e, index)} value={p.numeroParcela} type='number'/>
                                    <label>Data Vencimento</label>
                                    <input id='dataVencimento' name='dataVencimento' className='form-control' placeholder='Data Vencimento' 
                                    onChange={e => this.handleChangeParcela(e, index)} value={p.dataVencimento} type='date'/>
                                    <label>valor Parcela</label>
                                    <input id='valor' name='valor' className='form-control' placeholder='valor Parcela' 
                                    onChange={e => this.handleChangeParcela(e, index)} value={p.valor} type='number'/>
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