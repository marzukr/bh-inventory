import React, { Component } from 'react';

class Inventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "Loading...",
        }
    }

    async getData() {
        try {
            const response = await fetch("/api/user/protected", {
                method: "GET",
            });
            const resData = await response.json();
            if(response.status === 401) {
                this.props.history.push("/");
            }
            else if(response.status === 200) {
                const newData = resData.email + " has accessed the inventory page.";
                return this.setState({ data: newData });
            }
        }
        catch(e) {
            return this.setState({ data: String(e) });
        }
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        return (
            <div>
                {this.state.data}
				<h1 className="title is-1" style={{fontFamily:'Garamond'}}> >> log() new Device</h1>
				<div className="control" style={{display:'inline-flex'}}>
					<input className="input is-primary" type="text" placeholder="type" />
					<input className="input is-info" type="text" placeholder="subtype" />
					<input className="input is-success" type="text" placeholder="Donor?" />
					<input className="input is-warning" type="text" placeholder="status" />
				</div>
				<input className="button is-dark is-fullwidth" type="submit" value="Add" />
			</div>
        );
    }
}

export default Inventory;