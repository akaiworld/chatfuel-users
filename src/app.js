import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from 'react-router-dom';

import LazyLoad from './helpers/lazy-component.js';
import { NotFound } from './helpers/loading.js';

// styling
import 'normalize.css';
import './lib/font-awesome/css/font-awesome.min.css';
import './css/style.css';

// in real app should be defined dynamically
import bot_logo from './assets/bot-logo.jpg';

// pages
const UsersPage = LazyLoad(() => import('./pages/users-page.js'));
const UserPage = LazyLoad(() => import('./pages/user-page.js'));

const routes = [
	{
		path: '/users',
		exact: true,
		menu: props => <UsersPage render="menu" {...props} />,
		content: props => <UsersPage render="content" {...props} />,
	},
	{
		path: '/user/:user_id',
		menu: props => <UserPage render="menu" {...props} />,
		content: props => <UserPage render="content" {...props} />,
	},
	{
		path: '/',
		exact: true,
		menu: () => <Redirect to="/users" />,
		content: null,
	},
	{
		menu: null,
		content: () => <NotFound />,
	},
]

const supportsHistory = 'pushState' in window.history;

class App extends Component {
	render() {
		return (
			<Router
				forceRefresh={!supportsHistory}
			>
				<div>
					<div className="menu">
						<div className="breadcrumb chatfuel-logo"></div>
						<div className="breadcrumb bot">
							<div className="bot-logo" style={{backgroundImage: `url(${bot_logo})`}}></div>
							<div className="bot-name">Borstch Bot</div>
						</div>
						<Switch>
							{routes.map((route, i) => (
								<Route
									key={i.toString()}
									path={route.path}
									exact={route.exact}
									component={route.menu}
								/>
						        ))}
					        </Switch>
					</div>
					<div className="page-content">
						<Switch>
							{routes.map((route, i) => (
								<Route
									key={i.toString()}
									path={route.path}
									exact={route.exact}
									component={route.content}
								/>
						        ))}
					        </Switch>
				       </div>
				</div>
			</Router>
		);
	}
}
    

export default App;
