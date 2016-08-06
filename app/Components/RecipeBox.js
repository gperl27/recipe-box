var React = require('react');

var DATA = [
	{'id': "1", name: "Pie", ingredients: ["dough", "apples"]},
	{'id': "2", name: "Salad", ingredients: ["lettuce", "dressing"]}
];

var RecipeBox = React.createClass({
	getInitialState: function() {
		return {
			recipes: DATA,
			id: 3,
			active: false
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
	remove: function(recipe){
		var remove = this.state.recipes.splice(recipe, 1);
		this.setState({
			recipes: this.state.recipes
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
	render: function() {
		console.log(this.state.active);
		return (
			<div>
				<RecipeList recipes={this.state.recipes} remove={this.remove}/>
				<button onClick={this.clickHandler}>
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
	render: function() {
		return (
			<div className="well">
				<RecipeName name={this.state.name} />
				<IngredientsList ingredients={this.state.ingredients}/>
				<button onClick={this.props.remove}>Delete</button>
				<button onClick={this.clickHandler}>Edit</button>
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
		console.log(typeof this.props.ingredients);
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
			<div>
				{ this.state.active ? 
					<form onSubmit={this.handleSubmit}>
						<input
							type="text"
							name="value"
							value={this.state.value}
							onChange={this.handleChange}
						/>
						<input
							type="text"
							name="ingredient"
							value={this.state.ingredient}
							onChange={this.handleChange}
						/>
						<button>ADD RECIPE</button>
						<button onClick={this.clickHandler}>EXIT</button>
					</form>
				: null }
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
			<div>
				{ this.state.active ?
					<form onSubmit={this.handleSubmit}>

						<input
							type="text"
							name="value"
							value={this.state.value}
							onChange={this.handleChange}
						/>
						<input
							type="text"
							name="ingredient"
							value={this.state.ingredient}
							onChange={this.handleChange}
						/>
						<button>EDIT</button>
						<button onClick={this.clickHandler}>CANCEL</button>
					</form>
				: null }
			</div>
		)
	}
});

module.exports = RecipeBox;