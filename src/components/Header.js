import React from "react";

export default class Header extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <header className="header">
                <nav className="nav">
                    <img 
                        src={require('../assets/monster-hunter-logo.png')}
                        className="nav-logo"
                        onClick={() => this.props.onClick(0)}
                    />
                    <ul className="nav-itens">
                        <li onClick={() => this.props.onClick(1)}>Caçadores</li>
                        <li onClick={() => this.props.onClick(2)}>Sobre</li>
                        <li onClick={() => this.props.onClick(3)}>Contato</li>
                    </ul>
                </nav>
            </header>
        )
    }
}