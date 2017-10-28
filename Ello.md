```js
const Ello = (() => {

  const h = (type, props, ...chn) => {
    return {
      type,
      props: props || {},
      chn
    };
  };

  const isEventProp = name => /^on/.test(name);

  const extractEventName = name => name.slice(2).toLowerCase();

  const isCustomProp = name => isEventProp(name) || name === "forceUpdate";

  const setProp = (target, name, value) => {
    if (isCustomProp(name)) {
      return;
    } else if (name === "className") {
      target.setAttribute("class", value);
    } else {
      target.setAttribute(name, value);
    }
  };

  const removeProp = (target, name, value) => {
    if (isCustomProp(name)) {
      return;
    } else if (name === "className") {
      target.removeAttribute("class");
    } else {
      target.removeAttribute(name);
    }
  };

  const setProps = (target, props) => {
    Object.keys(props).forEach(name => {
      setProp(target, name, props[name]);
    });
  };

  const updateProp = (target, name, newVal, oldVal) => {
    if (!newVal) {
      removeProp(target, name, oldVal);
    } else if (!oldVal || newVal !== oldVal) {
      setProp(target, name, newVal);
    }
  };

  const updateProps = (target, newProps, oldProps = {}) => {
    const props = Object.assign({}, newProps, oldProps);
    Object.keys(props).forEach(name => {
      updateProp(target, name, newProps[name], oldProps[name]);
    });
  };

  /*-----------------------------------------------ADD EVENT LISTENERS-------------------------------------*/

  const addEventListeners = (target, props) => {
    Object.keys(props).forEach(name => {
      if (isEventProp(name)) {
        target.addEventListener(extractEventName(name), props[name]);
      }
    });
  };

  /*-----------------------------------------------CREATE ELEMENT-------------------------------------*/
 
  const createElement = node => {
    if (typeof node === "string") {
      return document.createTextNode(node);
    }
    const el = document.createElement(node.type);
    setProps(el, node.props);
    addEventListeners(el, node.props);
    node.chn.map(createElement).forEach(el.appendChild.bind(el));
    return el;
  };

  /*-----------------------------------------------------CHANGED-------------------------------------------*/
 
  function changed(node1, node2) {
    return (
      typeof node1 !== typeof node2 ||
      (typeof node1 === "string" && node1 !== node2) ||
      node1.type !== node2.type
    );
  }

  function update(parent, newNode, oldNode, index = 0) {
    //1
    if (!oldNode) {
      parent.appendChild(createElement(newNode));
      //2
    } else if (!newNode) {
      parent.removeChild(parent.childNodes[index]);
      //3
    } else if (changed(newNode, oldNode)) {
      parent.replaceChild(createElement(newNode), parent.childNodes[index]);

      //4
    } else if (newNode.type) {
      updateProps(parent.childNodes[index], newNode.props, oldNode.props);

      //5
      const newLength = newNode.chn.length;
      const oldLength = oldNode.chn.length;

      for (let i = 0; i < newLength || i < oldLength; i++) {
        update(parent.childNodes[index], newNode.chn[i], oldNode.chn[i], i);
      }
    }
  }

  /*-------MAKE FUNCTIONS ACCESSIBLE---------*/
  return {
    h,
    update
  };
})();

/*-----------------------------------------------CUSTOM-------------------------------------*/
const b = Ello.h("h2", {}, "Hello!");
Ello.update(document.body, b);

/** @jsx Ello.h */
//const a = <h2>Hello!</h2>
```

# API

# Ello.js
## Hello world!
This example will simply render heading with text "Hello world" into body.
```js
const el = Ello.h("h2", {}, "Hello world!");
Ello.update(document.body, el);
```


## Classes
```js
const el = Ello.render('h2', {className: "class-name-here" },"Hello! I have a class");
```


## JSX
```js
const el3 = (
  <button className="item">Say hi!</button>
);
```

```js
const el2 = (
  <button onClick={() => alert("hi!")}>Say hi!</button>
);
```
## Updating elements
```javascript

const a = (
  <ul>
    <li>item 1</li>
    <li>item 2</li>
  </ul>
);

const b = (
  <ul>
    <li>item 1</li>
    <li>hello!</li>
  </ul>
);


const root = document.querySelector('#root');
const reload = document.querySelector('button');

Ello.update(root, a);

reload.addEventListener('click', () => {
  Ello.update(root, b, a);
});
```



Note - You need to use:
```javascript
/** @jsx Ello.h */ 
```
to use JSX Components


-------------------------------------------------------------------------------------------------------------





