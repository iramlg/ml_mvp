import React from 'react';

export class ProductDetails extends React.Component {
    constructor(){
        super();
        this.state = {

        }
    }

    componentDidMount() {
        
    }

    render() {
        let p = this.props;

        return (
            <div className="productDetails">
                <div className="flex-7">
                    <div className="productImageBox">
                        <img className="productImage" src={p.product.picture} />
                    </div>
                    <p className="prefixDescription">Descripción del producto</p>
                    <div className="description" dangerouslySetInnerHTML={{__html: p.product.description}}></div>
                </div>
                <div className="flex-3">
                    <p className="prefixDetails">
                        {p.product.condition} - {p.product.sold_quantity} vendidos
                    </p>
                    <h1 className="productTile">{p.product.title}</h1>
                    <p className="productPrice">
                        {p.product.price.currency} {p.product.price.amount} 
                        <span className="decimals">{p.product.price.decimals}</span>
                    </p>
                    <div className="buttonBox">
                        <button type="button" className="btn btn-primary">Comprar</button>
                    </div>
                </div>
            </div>
        )
    }
}