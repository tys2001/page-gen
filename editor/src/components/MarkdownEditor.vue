<template>
  <div class="mde-container" fullscreen>
    <div class="toolbar">
      <div class="tool-icon" @click="$emit('save')">
        <b-icon icon="upload"></b-icon>
      </div>
      <div class="tool-icon" @click="$emit('exit')">
        <b-icon icon="door-closed"></b-icon>
      </div>
      <div class="tool-icon">
        <b-icon icon="image"></b-icon>
      </div>
    </div>
    <textarea :value="value" @input="$emit('input', $event.target.value)" class="writer" />
    <div v-html="html" class="viewer content-body"></div>
  </div>
</template>

<script>
import marked from "marked";
export default {
  props: {
    value: String
  },
  data() {
    return {
      store: this.$store,
      shown: false,
      html: ""
    };
  },
  methods: {},
  watch: {
    value(newValue) {
      this.html = marked(newValue);
    }
  }
};
</script>

<style scoped>
.mde-container {
  width: 100%;
  height: 300px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 50px 1fr;
  background-color: white;
}
.mde-container[fullscreen] {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
.toolbar {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  display: flex;
  padding: 5px;
  background-color: gray;
}
.tool-icon {
  width: 40px;
  height: 40px;
  border-radius: 5px;
  text-align: center;
  font-size: 20px;
  line-height: 40px;
  color: white;
  cursor: pointer;
}
.tool-icon:hover {
  background-color: lightgray;
}
.writer {
  grid-column-start: 1;
  grid-row-start: 2;
  overflow-x: hidden;
  overflow-y: auto;
  resize: none;
  word-break: break-all;
  padding: 20px;
  border: none;
  border-right: 1px solid lightgray;
}
.writer:focus {
  outline: none;
}
.viewer {
  grid-column-start: 2;
  grid-row-start: 2;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 20px;
}
</style>
