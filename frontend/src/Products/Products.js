// https://reactjs.org/docs/thinking-in-react.html

import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class ProductCategoryRow extends React.Component {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan="2">
          {category}
        </th>
      </tr>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ?
      product.name :
      <span style={{color: 'red'}}>
        {product.name}
      </span>;

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const rows = [];
    let lastCategory = null;

    console.log(`ProductTable: filterText = ${this.props.filterText}`);

    this.props.products.filter(product => {
      // return (this.props.inStockOnly) && (product.name.toLocaleLowerCase().indexOf(this.props.filterText) >= 0);
      const isNameMatch = product.name.toLocaleLowerCase().indexOf(this.props.filterText) >= 0;
      if(this.props.inStockOnly) {
        return isNameMatch && product.stocked;
      }
      return isNameMatch;

    }).forEach(product => {
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category} />
        );
      }

      rows.push(
        <ProductRow
          product={product}
          key={product.name} />
      );
      lastCategory = product.category;
    });

    return (
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleTextChange(e) {
    this.props.handleTextChange(e.target.value);
  }

  handleCheckboxChange(e) {
    console.log(`e.target.checked = ${e.target.checked}`);
    this.props.handleCheckboxChange(e.target.checked);
  }

  render() {
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;

    return (
      <form>
        {/*value={filterText}*/}
        <input type="text" placeholder="Search..." onChange={this.handleTextChange} />
        <p>
          {/*checked={inStockOnly}*/}
          <input type="checkbox"  onChange={this.handleCheckboxChange} />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterText: '',
      inStockOnly: false
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleTextChange(filterText)  {
    console.log(`FilterableProductTable: filterText = ${filterText}`);
    this.setState({
      filterText: filterText
    });
  }

  handleCheckboxChange(isOn) {
    this.setState({
      inStockOnly: isOn
    });

    if(this.state.inStockOnly) {
      console.log('+++ checkbox is on');
    }
    else {
      console.log('--- checkbox is off');
    }
  }

  render() {
    // const filterText = this.state.filterText;

    return (
      <div>
        <SearchBar handleTextChange={this.handleTextChange} handleCheckboxChange={this.handleCheckboxChange}/>
        <ProductTable products={PRODUCTS} filterText={this.state.filterText} inStockOnly={this.state.inStockOnly} />
      </div>
    );
  }
}


const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

// ReactDOM.render(
//   <FilterableProductTable products={PRODUCTS} />,
//   document.getElementById('container')
// );



export default FilterableProductTable;
