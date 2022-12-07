import React from "react";

export default class Content extends React.Component{

    constructor(props){
        super(props);
    }

    /*render(){
        return (
            <div>
                <img src={require('../assets/monster-hunter-background.jpg')} className="background-img"/>
                <div className="content-bar"></div>
                <div className="content">
                    <h1>Lista de Caçadores</h1>
                    <Table />
                </div>
            </div>
        )
    }*/

    render(){
        return (
            <div>
                <img src={require('../assets/monster-hunter-background.jpg')} className="background-img"/>
                <div className="content-bar"></div>
                <div className="content">
                    <h1>Lista de Caçadores</h1>
                    <Table />
                </div>
            </div>
        )
    }
}

class Table extends React.Component{

    state = {data: [],};

    constructor(props){
        super(props);
        fetch('https://bu.furb.br/mcardoso/progWeb/apiRestAval.php/cadastro')
            .then(res => res.json())
            .then(data => this.setState({ data: data }));
    }

    render(){
        return(
            <table className="table">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Caçador</th>
                    <th>Clã</th>
                    <th>Cabana</th>
                    <th>Contato</th>
                </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows(){
        const x =  this.state.data.map(record => 
            <tr>
                <td>{record.id}</td>
                <td>{record.nome}</td>
                <td>{record.departamento}</td>
                <td>{record.endereco}</td>
                <td>{record.email}</td>
            </tr>
        );
        return x;
    }
}