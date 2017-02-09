import {observer} from 'mobx-react';
import {computed} from 'mobx';
import React from 'react';


export default function AboveTheFold(wrapped) {
    return observer(class _AboveTheFold extends wrapped {
            static displayName = 'AboveTheFold(' + (wrapped.displayName || wrapped.name) +')';
            render() {
                console.log('rendered!')
                if (this.isInViewport) {
                    return super.render();
                }
                return (
                    <div style={Object.assign({}, this.props.style, {backgroundColor: 'red'})}>
                    </div>
                )
            }
            @computed get isInViewport(){
                console.log('scroll computation')
                return this.props.appState.scrollY > 400;
            }
        }
    )
}