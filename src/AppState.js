import { observable } from 'mobx';

class AppState {
  @observable scrollY = 0;
  @observable triggered = false;

  constructor() {
    window.onscroll = () => {
      this.scrollY = scrollY;
    }
  }

  trigger = () => {
    this.triggered = !this.triggered;
  }
}

export default AppState;
