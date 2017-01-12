const flatman = require('./flatman');
const el = flatman.el;
const page = flatman.page;
const Component = flatman.Component;

class C extends Component {
  constructor(props) {
    super(props);
  }

  text(value) {
    this.node.document.text(value);
  }

  render() {
    return el('div', { className : 'component' }, ['test']);
  }
}

class About extends Component {
  constructor(props) {
    super(props);
    this.onRender = this.onRender.bind(this);
  }

  onRender() {
    console.log('render');
  }

  render() {
    return el('div', { onRender : this.onRender, className : 'about' });
  }
}

page('test.html').body([
  el('div', { id : 'test', dataId : 'sdkajfhadksjfh', className : 'test' }, [
    el(C, ['text'])
  ]),
  el('div', { style : { display : 'none' } }),
  el(About, [
    el('div', { className : 'test' }),
    el('div', { className : 'test' }, [
      el('div'),
      el('a', [ el('span', ['text']) ])
    ]),
  ])
]).write();
