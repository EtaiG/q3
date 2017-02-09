import {observable, reaction} from 'mobx';
import _ from 'lodash';

const RAF = window.requestAnimationFrame;

class LayoutStore {
    comps = WeakMap ? new WeakMap() : {};
    needsLayout = [];

    @observable layoutIndex = 0;

    constructor(){
        reaction(()=> this.layoutIndex, ()=> this.reLayout())
    }

    reLayout(){
        console.log('running layout');
        console.log(this.layoutIndex);
        let measurements = _(this.comps).pick(this.needsLayout).mapValues(c => c.measure()).value();
        _.forOwn(measurements, (m, cId) => this.comps[cId].patch(m));
        this.needsLayout = [];
    }

    /** autobound (arrow functions) - public API */
    registerToLayout = (id, comp) => {
        this.comps[id] = comp;
    }
    unregisterLayout = (id) => {
        delete this.comps[id];
    }
    requestLayout = (id) =>{
        this.needsLayout.push(id);
        if (!this.requestedLayout) {
            this.requestedLayout = true;
            RAF(() => {
                this.requestedLayout = false;
                this.layoutIndex += 1;
            });
        }
    }
}

export default LayoutStore;