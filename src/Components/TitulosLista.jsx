import React from 'react'

const TitulosLista = props => {
    const renderRows = () => {
        const lista = props.lista || []
        return lista.map(titulo => (
            <tr key={titulo.numeroTitulo}>
                <td>{titulo.numeroTitulo}</td>
                <td>{titulo.nomeDevedor}</td>
                <td>{titulo.qtdeParcelas}</td>
                <td>{titulo.valorOriginal}</td>
                <td>{titulo.diasEmAtraso}</td>
                <td>{titulo.valorAtualizado}</td>
            </tr>
        )) 
    }
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Número Titúlo</th>
                    <th>Nome do Devevor</th>
                    <th>Qtde. Parcelas</th>
                    <th>Valor Original</th>
                    <th>Dias em atraso</th>
                    <th>Valor Atualizado</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    )
}

export default TitulosLista