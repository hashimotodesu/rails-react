import React from "react"
import PropTypes from "prop-types"
class ListsIndex extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      lists: []
    };
  }
  
  componentDidMount(){
    this.getIndex();
  }

  getIndex(){
    fetch('/api/v1/lists.json')
    .then((response) => {return response.json()})
    .then((data) => {this.setState({ lists: data }) });
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
            </tr>
          </thead>
          <tbody>
            {this.state.lists.map((list) => {
              return (
                <tr key={list.id}>
                  <td>{list.id}</td>
                  <td>{list.title}</td>
                  <td>{list.description}</td>
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
