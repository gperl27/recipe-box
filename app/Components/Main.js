var React = require('react');
require('../styles.scss');


var Main = React.createClass({
	render : function() {
		return (
			<div className="container">
				<h1>FCC Leaderboard</h1>
				<h2>By Greg Perlman</h2>
			</div>
		);
	}
});

module.exports = Main;