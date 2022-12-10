import React from "react";
import Popup from "./Popup";

export default class Content extends React.Component{

    state = {
        editData: {
            id: '',
            nome: '',
            departamento: '',
            endereco: '',
            email: ''
        }, 
        popupOpen: false,
        popupConfig: {
            error: false,
            innerHTML: ''
        }
    }

    openErrorDelete(message){
        const config = {
            error: true,
            innerHTML:
                <div>
                    <h1>Erro</h1>
                    <p>{message}</p>
                </div> 
        }
        this.openDialog(true, config);
    }

    openSuccessDelete(message){
        const config = {
            error: false,
            innerHTML:
                <div>
                    <h1>Sucesso</h1>
                    <p>{message}</p>
                </div> 
        }
        this.openDialog(true, config);
    }

    editClick(data){
        if(data){
            this.setState({editData: data});
            window.scrollTo(0,0);
        }
    }

    deleteClick(id){
        fetch(`https://bu.furb.br/mcardoso/progWeb/apiRestAval.php/cadastro/${id}`, 
            { method: 'DELETE' }
        ).then(response => response.json()
        ).then(data => {
            if(data.status === 'Ok'){
                this.openSuccessDelete(data.mensagem);
            } else {
                this.openErrorDelete(data.mensagem);
            }
        })
    }

    formCancelClick(){
        this.setState({editData: {
            id: '',
            nome: '',
            departamento: '',
            endereco: '',
            email: ''
        }});
    }

    openDialog(open, config){
        this.setState({popupOpen: open});
        if(config){
            this.setState({popupConfig: config});
        }
    }

    render(){
        return (
            <div>
                <div className="content-bar"></div>
                <div className="content">
                    <h1>Lista de Caçadores</h1>
                    <Editor 
                        data={this.state.editData}
                        cancelClick={() => this.formCancelClick()}
                        openDialog={(open, config) => this.openDialog(open, config)}
                    />
                    <Popup 
                        trigger={this.state.popupOpen}
                        closeDialog={open => this.openDialog(!open)}
                        config={this.state.popupConfig}
                    >
                    </Popup>
                    <div>Passe o mouse em cima dos regsitros para editar.</div><br></br>
                    <Table 
                        editClick={data => this.editClick(data)}
                        deleteClick={id => this.deleteClick(id)}
                    />
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
            <Row 
                record={record}
                editClick={data => this.props.editClick(data)}
                deleteClick={id => this.props.deleteClick(id)}
            />
        );
        return x;
    }
}

class Row extends React.Component{
    state = {over: false};
    record = this.props.record;

    getRowClass() {
        return this.state.over?"selected":"unselected";
    }

    getButtonsClass() {
        return this.state.over?"tableButtons-visible":"tableButtons-invisible";
    }

    render(){
        return(
            <tr
            onMouseEnter={()=>this.setState({over: !this.state.over})}
            onMouseLeave={()=>this.setState({over: !this.state.over})}
            className={this.getRowClass()}
            >
                <td>{this.record.id}</td>
                <td>{this.record.nome}</td>
                <td>{this.record.departamento}</td>
                <td>{this.record.endereco}</td>
                <td>{this.record.email}</td>
                <td className={this.getButtonsClass()} onClick={() => this.props.editClick(this.record)}>Editar</td>
                <td className={this.getButtonsClass()} onClick={() => this.props.deleteClick(this.record.id)}>Excluir</td>
            </tr>
        );
    }
}

class Editor extends React.Component{

    openInvalidNameError(){
        const config = {
            error: true,
            innerHTML:
                <div>
                    <h1>Erro</h1>
                    <p>Informe um nome válido!</p>
                </div> 
        }
        this.props.openDialog(true, config);
    }

    openUnableToSaveError(message){
        const config = {
            error: true,
            innerHTML:
                <div>
                    <h1>Erro</h1>
                    <p>{message}</p>
                </div> 
        }
        this.props.openDialog(true, config);
    }

    openSuccessMessage(message){
        const config = {
            error: false,
            innerHTML:
                <div>
                    <h1>Sucesso</h1>
                    <p>{message}</p>
                </div> 
        }
        this.props.openDialog(true, config);
    }

    isNameValid(name){
        return name && name !== '';
    }

    getUrl(id){
        if(id && id !== ''){
            return `https://bu.furb.br/mcardoso/progWeb/apiRestAval.php/cadastro/${id}`;
        }
        return 'https://bu.furb.br/mcardoso/progWeb/apiRestAval.php/cadastro';
    }

    saveClick(event){
        const elements = event.currentTarget.parentElement.getElementsByTagName('input');
        const record = {
            nome: elements[1].value,
            departamento: elements[2].value,
            endereco: elements[3].value,
            email: elements[4].value
        }
        if(elements[0].value && elements[0].value!==''){
            record.id = elements[0].value;
        }
        if(!this.isNameValid(record.nome)){
            this.openInvalidNameError();
            return;
        }
        const url = this.getUrl(record.id);

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8;',
            },
            body: JSON.stringify(record),
        }).then(response => response.json()
        ).then(data => {
            if(data.status === 'Ok'){
                this.openSuccessMessage(data.mensagem);
            } else {
                this.openUnableToSaveError(data.mensagem);
            }
        })

    }

    render(){
        return (
            <div className="editor">
                <label>Id: </label>
                <input key={this.props.data.id?this.props.data.id:1} type="text" id="id" readOnly={true} disabled defaultValue={this.props.data.id}></input>
                <label>Caçador: </label>
                <input key={this.props.data.nome?this.props.data.nome:'nome'} type="text" id="cacador" defaultValue={this.props.data.nome}></input><br></br>
                <label>Clã: </label>
                <input key={this.props.data.departamento?this.props.data.departamento:'departamento'} type="text" id="cla" size="50" defaultValue={this.props.data.departamento}></input><br></br>
                <label>Cabana: </label>
                <input key={this.props.data.endereco?this.props.data.endereco:'endereco'} type="text" id="cabana" size="50" defaultValue={this.props.data.endereco}></input><br></br>
                <label>Contato: </label>
                <input key={this.props.data.email?this.props.data.email:'email'} type="text" id="contato" size="25" defaultValue={this.props.data.email}></input><br></br>
                <button className="saveButton" onClick={e => this.saveClick(e)}>Salvar</button>
                <button className="cancelButton" onClick={() => this.props.cancelClick()}>Cancelar</button>
            </div>
        );
    }
}