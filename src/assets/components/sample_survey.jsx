import React from 'react';
import { HeaderSearch } from './header_search.jsx'
import { ItemsList } from './items_list.jsx'
import { ProductDetails } from './product_details.jsx'

export class ContainerLogic extends React.Component {
	constructor(){
		super();
		this.state = {
			list: false,
			product: false
		}
	}

	componentDidUpdate(prevProps, prevState) {
		window.location
	}

	componentDidMount() {
		if (window.location.pathname === '/items' && window.location.search) {
			this.handleSearch(window.location.search.split('=')[1], true)
		} else if (window.location.pathname.includes('items/')) {
			this.handleSelectItem(window.location.pathname.split('items/')[1], true)
		}
		window.onpopstate = (event) => {
			if (window.location.pathname === '/items' && window.location.search) {
				this.handleSearch(window.location.search.split('=')[1], true)
			} else if (window.location.pathname.includes('items/')) {
				this.handleSelectItem(window.location.pathname.split('items/')[1], true)
			} else {
				this.setState({
					list: false,
					product: false
				})
			}
		};
	}

	handleSearch(term, fromHistory) {
		if (!term.length)
			return;

		this.setState({
			loading: true
		})

		let query = {
			search: term
		}

		$.ajax({
			url: 'http://localhost:3000/api/items?' + $.param(query),
			type: 'GET',
			success: (res) => {
				if (res.items)
					if (!fromHistory)
						history.pushState({}, 'search '+  term, '/items?search=' + term);

					return this.setState({
						list: res.items,
						product: false,
						loading: false
					})

				this.setState({
					list: false,
					product: false,
					loading: false
				})
			}
		});
	}

	handleSelectItem(id, fromHistory) {
		this.setState({
			loading: true
		})

		$.ajax({
			url: 'http://localhost:3000/api/items/' + id,
			type: 'GET',
			success: (res) => {
				if (res.item)
					this.setState({
						product: res.item,
						list: false,
						loading: false
					})
					if (!fromHistory)
						history.pushState({}, res.item.title , '/items/' + id);
			}
		});
	}

	render() {
		let s = this.state;

		return (
			<div className="">
				<HeaderSearch onSearch={this.handleSearch.bind(this)} />
				<div className="row">
					{s.loading ? 
						<div className="col-md-offset-1 col-md-10">
							<div className="productDetails">
								<p>Carregando ...</p>
							</div>
						</div>
					:
						<div className="col-md-offset-1 col-md-10">
							{s.product ? 
								<ProductDetails 
									product={s.product} />
							: s.list && 
								<ItemsList 
									onClickItem={this.handleSelectItem.bind(this)}
									list={s.list} />
							}
						</div>
					}
				</div>
			</div>
		)
	}
}