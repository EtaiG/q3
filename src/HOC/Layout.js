import ReactDOM from 'react-dom';
import {inject, observer} from 'mobx-react';

export default function Layout(wrapped){
    return inject('layoutAPI')(observer(class _Layout extends wrapped {
        static displayName = 'Layout(' + (wrapped.displayName || wrapped.name) +')';
        componentDidMount(){
            this.props.layoutAPI.registerToLayout(this.props.id, this);
        }
        componenWillUnmount(){
            this.props.layoutAPI.unregisterLayout(this.props.id);
        }
        componentDidUpdate(){
            this.props.layoutAPI.requestLayout(this.props.id);
        }
        measure(){
            console.log('measuring: ' + this.props.id);
            let domNode = ReactDOM.findDOMNode(this);
            let measurements = {
                height: domNode.offsetHeight,
                width: domNode.offsetWidth
            };
            return measurements;
        }
        patch(measurements){
            console.log('patch: ' + this.props.id);
            console.log(measurements);
            //run patcher
        }
        // render(){
        //     return super.render()
        // }
    }));
}