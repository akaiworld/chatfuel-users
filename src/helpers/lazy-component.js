import React from 'react';
import Loadable from 'react-loadable';

import Loading from './loading.js';

export default function LazyLoad( loader ){
	return Loadable({
		loader,
		loading: Loading,
		delay: 300,
		render( _module, props ){
			let Component = props.render ? _module[ props.render ] : _module;
			return <Component {...props} />;
		},
	});
}