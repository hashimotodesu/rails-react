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
    this.setState({
      lists: this.props.lists
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
