var React = require('react');
var update = require('immutability-helper');

var DATA = [
	{'id': 0, name: "Pie", ingredients: ["dough", "apples"]},
	{'id': 1, name: "Salad", ingredients: ["lettuce", "dressing"]}
];

var RecipeBox = React.createClass({
	getInitialState: function() {
		return {
			recipes: DATA,
			active: false,
			id: 1
		}
	},
	add: function(recipe, ingredients) {
		var idIncrement = this.state.id + 1;
		ingredients = ingredients.split(",");
		recipe = this.state.recipes.concat({
			id: idIncrement,
			name: recipe,
			ingredients: ingredients
		});

		this.setState({
			recipes: recipe,
			id: idIncrement
		});
	},
	remove: function(index){
		index = this.state.recipes.indexOf(index);
		this.setState({
			recipes: update(this.state.recipes, {$splice: [[index, 1]]})
		})
	},
	clickHandler: function(){
		this.setState({
			active: true
		});
	},
	handleClick: function(){
		this.setState({
			active: false
		});
	},
	render: function() {
		return (
			<div className="recipe-container">
				<RecipeList recipes={this.state.recipes} remove={this.remove}/>
				<button className="btn btn-success add" onClick={this.clickHandler}>
					ADD
				</button>
				{ this.state.active ? <AddRecipe add={this.add} active={this.state.active} toggle={this.handleClick}/> : null }
			</div>
		)
	}
});

var RecipeList = React.createClass({
	render: function() {
		var remove = this.props.remove;
		var edit = this.props.edit;
		var list = this.props.recipes.map(function(recipe){
			return (
				<Recipe recipes={recipe} key={recipe.id} remove={remove}/>
			)
		});
		return (
			<ul>{list}</ul>
		)
	}
});

var Recipe = React.createClass({
	getInitialState: function(){
		return{
			name: this.props.recipes.name,
			ingredients: this.props.recipes.ingredients,
			active: false
		}
	},
	edit: function(recipe,ingredients){
		ingredients = ingredients.split(",");
		this.setState({
			name: recipe,
			ingredients: ingredients
		});
	},
	clickHandler: function(){
		this.setState({
			active: true
		});
	},
	handleClick: function(){
		this.setState({
			active: false
		})
	},
	remove: function() {
		this.props.remove(this.props.recipes);
	},
	render: function() {
		return (
			<div className="well recipe">
				<RecipeName name={this.state.name} />
				<button className="x-button btn btn-danger" onClick={this.remove}>X</button>
				<IngredientsList ingredients={this.state.ingredients}/>
				<button className="btn btn-info edit-button"  onClick={this.clickHandler}><span className="glyphicon glyphicon-pencil aria-hidden='true'"></span></button>
				{ this.state.active ? <EditRecipe edit={this.edit} active={this.state.active} toggle={this.handleClick}/> : null }
			</div>
		)
	}
});

var RecipeName = React.createClass({
	render: function(){
		return (
			<h3>{this.props.name}</h3>
		)
	}
});

var IngredientsList = React.createClass({

	render: function() {
		var list = this.props.ingredients.map(function(ingredient){
			return (
				<Ingredients ingredient={ingredient} key={ingredient}/>
			)
		});
		return (
			<ul>{list}</ul>
		)
	}
});


var Ingredients = React.createClass({
	render: function(){
		return (
			<li>{this.props.ingredient}</li>
		)
	}
});

var AddRecipe = React.createClass({
	getInitialState: function() {
		return {
			value: "",
			ingredient: "",
			active: this.props.active
		}
	},
	handleChange: function(event){
		var nextState = {};
		nextState[event.target.name] = event.target.value;
		this.setState(nextState);

	},
	handleSubmit: function(event){
		event.preventDefault();
		this.props.add(this.state.value, this.state.ingredient);
		this.setState({
			value: "",
			ingredient: ""
		});
	},
	clickHandler: function(){
		this.setState({
			active: false
		});
		this.props.toggle();
	},
	render: function() {
		return (
			<div className="popup-background">
				<div className="popup">
					{ this.state.active ? 
						<form onSubmit={this.handleSubmit}>
							<h4>Add a Recipe</h4>
							<label>Name</label>
							<input
								className="form-control"
								type="text"
								name="value"
								value={this.state.value}
								onChange={this.handleChange}
							/>
							<label>Ingredients</label>
							<input
								className="form-control"
								type="text"
								name="ingredient"
								value={this.state.ingredient}
								onChange={this.handleChange}
							/>
							<button className="btn btn-primary">Add Recipe</button>
							<button className="btn btn-warning" onClick={this.clickHandler}>Close</button>
						</form>
					: null }
				</div>
			</div>
			
		)
	}
});

var EditRecipe = React.createClass({
	getInitialState: function() {
		return {
			value: "",
			ingredient: "",
			active: this.props.active
		}
	},
	handleChange: function(event){
		var nextState = {};
		nextState[event.target.name] = event.target.value;
		this.setState(nextState);

	},
	handleSubmit: function(event){
		event.preventDefault();
		this.props.edit(this.state.value, this.state.ingredient);
		this.setState({
			value: "",
			ingredient: ""
		});
	},
	clickHandler: function(){
		this.setState({
			active: false
		});
		this.props.toggle();
	},
	render: function() {
		return (
			<div className="ingredient-popup">
				{ this.state.active ?
					<form onSubmit={this.handleSubmit}>
						<h4>Edit this recipe</h4>
						<label> Name </label>
						<input
							className="form-control"
							type="text"
							name="value"
							value={this.state.value}
							onChange={this.handleChange}
						/>
						<label> Ingredients </label>
						<input
							placeholder="Separate, by, commas"
							className="form-control"
							type="text"
							name="ingredient"
							value={this.state.ingredient}
							onChange={this.handleChange}
						/>
						<button className="ing-btn btn btn-primary">Save</button>
						<button className="ing-btn btn btn-warning" onClick={this.clickHandler}>Cancel</button>
					</form>
				: null }
			</div>
		)
	}
});

module.exports = RecipeBox;