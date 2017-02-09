import React, { Component } from 'react';


class Comp extends Component {
    render() {
        return (
            <div style={this.props.style}>
                <span> Comp id: {this.props.id} </span>
                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export  {Comp};
