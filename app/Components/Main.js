var React = require('react');
var RecipeBox = require('./RecipeBox')
require('../styles.scss');




var Main = React.createClass({
	render : function() {
		return (
			<div className="container">
				<h1>Recipe Box</h1>
				<h2>By Greg Perlman</h2>
				<RecipeBox recipes />
			</div>
		);
	}
});

module.exports = Main;