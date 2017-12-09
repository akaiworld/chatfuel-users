import React, { Component } from 'react';

export default function Loading( props ){
	if( props.error ){
		return <span>Error!</span>;
	}else if( props.pastDelay ){
		return <LoadingIndicator />;
	}else{
		return null;
	}
}

export function LoadingIndicator(){
	return <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>;
}


export const PageLoading = ({ text }) => <div className="page-info">
	<h1><LoadingIndicator />{' '}{ text || 'Loading...' }</h1>
</div>;

export const NotFound =({ text }) => <div className="page-info">
	<h1>{ text || 'Not Found' }</h1>
</div>;