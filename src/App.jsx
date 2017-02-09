import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Comp } from './comp/components'
import Layout from './HOC/Layout'
import AboveTheFold from './HOC/AboveTheFold'

function trigger(WrappedComp){
    return observer(class Trigger extends Component{
       render(){
           if(this.props.appState.triggered){
               return (
                   <WrappedComp {...this.props}>
                       "this was triggered"
                   </WrappedComp>
               );
           }
           return (
               <WrappedComp {...this.props}/>
           );
       }
    });
}

const CompInViewport = Layout(AboveTheFold(Comp));
const CompWithLayout = Layout(Comp);
const CompWithTriggerAndLayout = trigger(Layout(Comp));

@observer
class App extends Component {
  render() {
    return (
      <div>
          <span>scroll down:</span>
          <button onClick={this.props.appState.trigger}>force trigger comps</button>
          <CompWithTriggerAndLayout id='triggerComp' appState={this.props.appState} style={{top: '300px', width: '200px', height: '250px', backgroundColor: 'green', position: 'absolute'}}/>
          <CompInViewport id='compA' appState={this.props.appState} style={{top: '1000px', width: '300px', height: '200px', backgroundColor: 'blue', position: 'absolute'}}/>
          <CompWithLayout id='compB' appState={this.props.appState} style={{top: '600px', width: '400px', height: '150px', backgroundColor: 'blue', position: 'absolute'}}/>
      </div>
    );
  }
}

export default App;
