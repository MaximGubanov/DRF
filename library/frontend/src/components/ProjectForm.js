import React from "react";


class ProjectForm extends React.Component {

    constructor(props) {
    super(props)
    this.state = {
            name: '', 
            repo: '', 
            created_at: '', 
            created_by: '', 
            updated_at: null,
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
        
        this.props.createProject(
                this.state.name, 
                this.state.repo, 
                this.state.created_at,
                this.state.created_by,
                this.state.updated_at
            )
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>

                <div className="form-group">
                    <label for="name">name</label>
                    <input type="text" className="form-control" name="name" value={this.state.name} onChange={(event)=>this.handleChange(event)} />
                </div>

                <div className="form-group">
                    <label for="repo">repo</label>
                    <input type="text" className="form-control" name="repo" value={this.state.repo} onChange={(event)=>this.handleChange(event)} />
                </div>

                <div className="form-group">
                    <label for="created_at">created_at</label>
                    <input type="date" className="form-control" name="created_at" value={this.state.created_at} onChange={(event)=>this.handleChange(event)} />
                </div>

                <div className="form-group">
                    <label for="updated_at">updated_at</label>
                    <input type="date" className="form-control" name="updated_at" value={this.state.updated_at} onChange={(event)=>this.handleChange(event)} />
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

export default ProjectForm;