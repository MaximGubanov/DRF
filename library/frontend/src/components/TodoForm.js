import React from "react";


class TodoForm extends React.Component {

    constructor(props) {
    super(props)
    this.state = {
            text: '', 
            projects: '', 
            created_by: '', 
        }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }
    
    handleSubmit(event) {
        
        this.props.createTodo(
                this.state.text, 
                this.state.projects, 
                this.state.created_by
            )
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>

                <div className="form-group">
                    <label for="name">text</label>
                    <input type="text" className="form-control" name="text" value={this.state.text} onChange={(event)=>this.handleChange(event)} />
                </div>

                <div className="form-group">
                    <label for="project">projects</label>
                        <select name="projects" className='form-control' value={this.state.projects} onChange={(event) => this.handleChange(event)}>
                            {this.props.projects.map((item) => <option value={item.url}>{item.name}</option>)}
                        </select>
                </div>

                <div className="form-group">
                    <label for="created_by">created_by</label>
                        <select name="created_by" className='form-control' value={this.state.created_by} onChange={(event) => this.handleChange(event)}>
                            {this.props.users.map((item) => <option value={item.url}>{item.username}</option>)}
                        </select>
                </div>

                <input type="submit" className="btn btn-primary" value="Save" />

            </form>
        );
    }
}

export default TodoForm;