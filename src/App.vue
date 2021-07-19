<template>
  <div id="app">
    <h1>
      <img alt="Vue logo" src="./assets/logo.png">
    </h1>

    <p>
      vue-auto-sizer is a vue clone of <a href="https://github.com/bvaughn/react-virtualized/blob/master/source/AutoSizer/AutoSizer.example.js">React virtualized auto sizer</a>
    </p>

    <label>
      <input type="checkbox" v-model="hideDescription" aria-label="Hide description (to show resize)?" />
      Hide description (to show resize)?
    </label>

    <p v-if="!hideDescription">
      This component decorates <code>List</code>, <code>Table</code>, or
      any other component and automatically manages its width and height.
      It uses Sebastian Decima's
      <a
        href="https://github.com/sdecima/javascript-detect-element-resize"
        target="_blank">
        element resize event
      </a>
      to determine the appropriate size. In this example
      <code>AutoSizer</code> grows to fill the remaining width and height
      of this flex column.
    </p>
    <div class="auto-sizer-wrapper">
      <AutoSizer class="my-component" v-slot="{ size: { height, width } }" :onResize="onResize">
        <div :style="{ 'background-color': '#eee', height: height + 'px', width: width + 'px' }">
          Welcome to Your Vue.js App
        </div>
      </AutoSizer>
    </div>
  </div>
</template>

<script>
import AutoSizer from './components/AutoSizer.vue'

export default {
  name: 'App',
  components: {
    AutoSizer
  },
  data () {
    return {
      hideDescription: false
    }
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
}

.auto-sizer-wrapper {
  flex: 1 1 auto;
}
</style>
