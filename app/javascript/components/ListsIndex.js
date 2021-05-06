import React from "react"
import PropTypes from "prop-types"
class ListsIndex extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      lists: []
    };
  
    this.getIndex = this.getIndex.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.deleteList = this.deleteList.bind(this);
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
    fetch(`http://localhost:3000/api/v1/lists/${id}`, 
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
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ListsIndex
