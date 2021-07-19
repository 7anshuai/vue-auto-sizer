# vue-auto-sizer

Vue component that automatically adjusts the width and height of a single child.

> Note: vue-auto-sizer is a vue clone of [react-virtualized-auto-sizer](https://github.com/bvaughn/react-virtualized/blob/master/docs/AutoSizer.md)

## Usage

### Installtion

```bash
$ npm install @7anshuai/vue-auto-sizer
```

### Prop Types

| Property      | Type     | Required? | Description                                                                                                                                                     |
| :------------ | :------- | :-------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| defaultHeight | Number   |           | Height passed to child for initial render; useful for server-side rendering. This value will be overridden with an accurate height after mounting.              |
| defaultWidth  | Number   |           | Width passed to child for initial render; useful for server-side rendering. This value will be overridden with an accurate width after mounting.                |
| disableHeight | Boolean  |           | Fixed `height`; if specified, the child's `height` property will not be managed                                                                                 |
| disableWidth  | Boolean  |           | Fixed `width`; if specified, the child's `width` property will not be managed                                                                                   |
| nonce         | String   |           | Nonce of the inlined stylesheets for [Content Security Policy](https://www.w3.org/TR/2016/REC-CSP2-20161215/#script-src-the-nonce-attribute)                    |
| onResize      | Function |           | Callback to be invoked on-resize; it is passed the following named parameters: `({ height: number, width: number })`.                                           |

### Examples

Some vue components require explicit dimensions but sometimes you just want a component to just grow to fill all of the available space.
The `AutoSizer` component can be useful in this case.

One word of caution about using `AutoSizer` with flexbox containers.
Flex containers don't prevent their children from growing and `AutoSizer` greedily grows to fill as much space as possible.
Combining the two can cause a loop.
The simple way to fix this is to nest `AutoSizer` inside of a `block` element (like a `<div>`) rather than putting it as a direct child of the flex container.
Read more about common `AutoSizer` questions [here](#questions).

```vue
<template>
  <div id="app">
    <h1>
      <img alt="Vue logo" src="./assets/logo.png">
    </h1>

    <p>
      vue-auto-sizer is a vue clone of <a href="https://github.com/bvaughn/react-virtualized/blob/master/docs/AutoSizer.md">React virtualized auto sizer</a>
    </p>

    <div class="auto-sizer-wrapper">
      <auto-sizer v-slot="{ size: { height, width} }">
        <div :style="{ height: height + 'px', width: width + 'px' }">
          Auto sized content...
        </div>
      </auto-sizer>
    </div>
  </div>
</template>

<script>
import AutoSizer from '@7anshuai/vue-auto-sizer'

export default {
  name: 'App',
  components: {
    AutoSizer
  },
  methods: {
    onResize ({ height, width }) {
      console.log(height, width)
    }
  }
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.auto-sizer-wrapper {
  flex: 1 1 auto;
}
</style>
```
## Development
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Compiles and minifies for npm package
```
yarn build:lib
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
