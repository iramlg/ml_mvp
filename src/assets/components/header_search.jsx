import React from 'react';

export class HeaderSearch extends React.Component {
    constructor(){
        super();
        this.state = {
            text: '',
        }
    }

    componentWillMount() {
        
    }

    handleKeyPress(event) {
        if(event.key == 'Enter'){
            this.onClickSearch();
        }
    }

    onClickSearch() {
        this.props.onSearch(this.state.text);
    }

    onChangeText(event) {
        this.setState({
            text: event.target.value
        })
    }

    render() {
        let s = this.state;

        return (
            <div className="headerSearch">
                <div className="row">
                    <div className="col-md-offset-1 col-md-1">
                        <img className="pull-right logoHeader" src="http://localhost:3000/img/Logo_ML.png" />
                    </div>
                    <div className="col-md-9">
                        <div className="form-group">
                            <div className="input-group">
                                <input onKeyPress={this.handleKeyPress.bind(this)} onChange={this.onChangeText.bind(this)} type="text" className="form-control inputSearch" placeholder="Nunca dejes de buscar" />
                                <div onClick={this.onClickSearch.bind(this)} className="input-group-addon">
                                    <img src="http://localhost:3000/img/ic_Search.png" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}