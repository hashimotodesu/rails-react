import React from "react"
import PropTypes from "prop-types"
class ListsIndex extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      lists: [],
      form: {
        title: "",
        description: "",
      }
    };
  
    this.getIndex = this.getIndex.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.deleteList = this.deleteList.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.addList = this.addList.bind(this);
    this.formReset = this.formReset.bind(this);
  }
  
  componentDidMount(){
    this.getIndex();
  }

  getIndex(){
    fetch('/api/v1/lists.json')
    .then((response) => {return response.json()})
    .then((data) => {this.setState({ lists: data }) });
  }

  handleDelete(id){
    // fetch(`http://localhost:3000/api/v1/lists/${id}`, 
    fetch(`https://heorku-rail-react.herokuapp.com//api/v1/lists/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
    })
    .then((response) => {
      console.log('List was deleted');
      this.deleteList(id);
    })
  }

  deleteList(id){
    let lists = this.state.lists.filter((list) => list.id != id)
    this.setState({
      lists: lists
    })
  }

  handleChange(e,key){
    let target = e.target;
    let value = target.value;
    let form = this.state.form;
    form[key] = value;

    this.setState({
      form: form
    });
  }

  handleCreate(){
    let body = JSON.stringify({
      list: {
        title: this.state.form.title,
        description: this.state.form.description
      }
    })

    // fetch('http://localhost:3000/api/v1/lists', {
    fetch('https://heorku-rail-react.herokuapp.com//api/v1/lists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body,
    })

    .then((response) => {return response.json()})
    .then((list)=>{
      this.addList(list);
      this.formReset();
    })
  }

  addList(list){
    this.setState({
      lists: this.state.lists.concat(list)
    })
  }

  formReset(){
    this.setState({
      form:{
        title: "",
        description: ""
      }
    })
  }

  render () {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>function</th>
            </tr>
          </thead>
          <tbody>
            {this.state.lists.map((list) => {
              return (
                <tr key={list.id}>
                  <td>{list.id}</td>
                  <td>{list.title}</td>
                  <td>{list.description}</td>
                  <td>
                    <button onClick={() => this.handleDelete(list.id)}>delete</button>
                  </td>
                </tr>
              );
            })}
            <tr>
              <td></td>
              <td>
                <input type="text" value={this.state.form.title} onChange={e=>this.handleChange(e,'title')} />
              </td>
              <td>
                <input type="text" value={this.state.form.description} onChange={e=>this.handleChange(e,'description')} />
              </td>
              <td>
                <button onClick={() => this.handleCreate()}>add</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default ListsIndex
