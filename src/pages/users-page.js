import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { getList } from '../models/users.js';

import { PageLoading } from '../helpers/loading.js';

// manages page state
export class content extends Component {
	constructor( props ){
		super( props );
		this.state = {
			users: [],
			next: false,
			prev: false,
			loading: true,
		}
		this.prepareBindings();
	}
	prepareBindings(){
		this.loadUsersList = this.loadUsersList.bind(this);
		this.pagination = this.pagination.bind(this);
	}
	componentDidMount(){
		this.loadUsersList();
	}
	loadUsersList( url ){
		getList( url ).then( 
			data => this.setState( Object.assign({}, data, { loading: false }) ), 
			() => this.setState({	
					users: false,
					loading: false,
				})
		);
	}
	pagination( direction ){
		return () => {
			this.setState({ 
				loading: true,
			});
			this.loadUsersList( this.state[ direction ] )
		}
	}

	render(){
		return this.state.loading ? <PageLoading /> : 
			<UsersList 
				users={this.state.users} 
				pagination={this.pagination}
				prev={this.state.prev}
				next={this.state.next}
			/>;
	}
}


// displays users list
const UsersList = props => <div className="users-page">
	<div className="users-list">
		{props.users.map(( user, i ) => (
			<User user={user}  key={i} />
		))}
	</div>
	<div className="pagination">
		{ props.prev ? <div className="page-btn prev" onClick={props.pagination('prev')}>
			<i className="fa fa-long-arrow-left" aria-hidden="true"></i>
			Previous page
		</div> : null }
		{ props.next ? <div className="page-btn next" onClick={props.pagination('next')}>
			Next page
			<i className="fa fa-long-arrow-right" aria-hidden="true"></i>
		</div> : null }
	</div>
</div>;

// displays user card
const User = ({ user }) => <div className="user-card-wrap">
	<Link to={'/user/'+user.id} className="user-card">
		<div className="user-avatar" style={{backgroundImage: `url(${user.avatarUrl})`}}></div>
		<div className="name">{user.name}</div>
	</Link>
</div>;

// displays menu
export const menu = () => ([
	<div className="breadcrumb" key="1">
		<i className="fa fa-chevron-right" aria-hidden="true"></i>
	</div>,
	<div className="breadcrumb" key="2">
		Users
	</div>
])