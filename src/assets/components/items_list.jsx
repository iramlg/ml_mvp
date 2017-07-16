import React from 'react';

export class ItemsList extends React.Component {
    constructor(){
        super();
        this.state = {
            
        }
    }

    render() {
        let s = this.state;
        let p = this.props;

        if (!p.list || !p.list.length)
            return (
                <p>Sem produtos para exibição</p>
            )

        return (
            <div className="itemsList">
                {p.list.map((item, i) => {
                    return (<div key={i} className="item" onClick={() => {this.props.onClickItem(item.id)}}>
                        <div className="flexes">
                            <img className="itemPicture" src={item.picture} />
                        </div>
                        <div className="flex-6">
                            <p className="itemPrice">
                                {item.price.currency} {item.price.amount} 
                                {item.free_shipping && <img className="shippingIcon" src="http://localhost:3000/img/ic_shipping.png" />}
                            </p>
                            <p className="itemTitle">{item.title}</p>
                        </div>
                        <div className="flexes">
                            <p className="itemCondition">{item.condition}</p>
                        </div>
                    </div>)
                })}
            </div>
        )
    }
}























