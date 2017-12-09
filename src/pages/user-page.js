import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { autorun } from 'mobx';
import { observer } from 'mobx-react';

import { PageLoading, NotFound, LoadingIndicator } from '../helpers/loading.js';
import { getUser, saveName } from '../models/users.js';

// manages page state
export class content extends Component {
	constructor( props ){
		super( props );
		
		this.state = {
			user: null,
			loading: true,
		}
	}
	componentDidMount(){
		this.loadUser( this.props.match.params.user_id );
	}
	loadUser( id ){
		getUser( id ).then( user => {
			this.setState({ 
				user,
				loading: false,
			});
		}, 
			() => this.setState({ users: false })
		);
	}

	render(){
		return this.state.loading ? <PageLoading /> : 
			this.state.user === false ? <NotFound /> : 
			<User user={this.state.user} />;
	}
}

// manages info state
export class User extends Component {
	constructor( props ){
		super( props );
		
		this.state = {
			user: props.user,
			updated_ts: false,
			saving: false,
		}
		this.prepareBindings();
	}
	prepareBindings(){
		this.setName = this.setName.bind(this);
		this.saveName = this.saveName.bind(this);
	}
	setName( e ){
		this.setState({
			user: Object.assign({}, this.state.user, { name: e.target.value }),
			updated_ts: Date.now(),
			saving: false,
		});
	}
	saveName(){
		this.setState({
			saving: true,
		});
		const updated_ts = this.state.updated_ts;
		saveName( this.state.user.id, this.state.user.name ).then(() => {
			this.setState({
				saving: false,
				updated_ts: updated_ts == this.state.updated_ts ? false : this.state.updated_ts,
			});
		});
	}

	render(){
		return <DisplayPage 
			saving={ this.state.saving }
			user={ this.state.user }
			setName={ this.setName }
			saveName={ this.saveName }
			updated_ts={ this.state.updated_ts }
		/>
	}
}

// displays page
const DisplayPage = ( props ) => <div className="user-page">
	<div className="user-card-wrap">
		<div className="user-avatar">
			<img src={props.user.avatarUrl} />
		</div>
		<div className="info-wrap">
			<input type="text" className="name" 
				onChange={props.setName} 
				onKeyUp={props.setName} 
				value={props.user.name} 
			/>
			<div className="sign">Type a different name for this user</div>
			{ props.updated_ts ? 
				<div className="save-btn" onClick={props.saveName}>
					{ props.saving ? <LoadingIndicator /> : null }
					{ props.saving ? 'Saving...' : 'Save' }
				</div> : null
			}
		</div>
	</div>
</div>

// displays menu
export const menu = observer(class extends Component {
	constructor( props ){
		super( props );
		
		this.state = {
			user: false,
		}
		
		this.loadUser( props.match.params.user_id );
		autorun(() => this.loadUser( props.match.params.user_id ));
	}
	loadUser( id ){
		getUser( id ).then( user => this.setState({ user }));
	}

	render() {
		return [
			<div className="breadcrumb" key="1">
				<i className="fa fa-chevron-right" aria-hidden="true"></i>
			</div>,
			<div className="breadcrumb link" key="2">
				<Link to="/users">
					Users
				</Link>
			</div>,
			<div className="breadcrumb" key="3">
				<i className="fa fa-chevron-right" aria-hidden="true"></i>
			</div>,
			<div className="breadcrumb" key="4">
				{this.state.user ? this.state.user.name : <LoadingIndicator />}
			</div>
		];
	}
});