<template>
  <VueSimplemde v-if="shown" v-model="markdown" :configs="configs" ref="simpleMde" />
  <b-button v-else @click="onClickShow">edit content</b-button>
</template>

<script>
import VueSimplemde from "vue-simplemde";
export default {
  components: {
    VueSimplemde
  },
  props: {
    articleId: String
  },
  data() {
    return {
      store: this.$store,
      shown: false,
      markdown: "",
      configs: {
        toolbar: [
          {
            name: "save",
            action: this.onClickSave,
            className: "fa fa-save",
            title: "Save"
          },
          {
            name: "exit",
            action: this.onClickExit,
            className: "fa fa-reply",
            title: "Exit"
          },
          "|",
          "preview",
          "side-by-side",
          "fullscreen"
        ]
      }
    };
  },
  methods: {
    async onClickShow() {
      this.shown = true;
      const content = await this.store.getContent(this.articleId);
      this.markdown = content.markdown;
    },
    async onClickSave() {
      this.store.saveContent(this.articleId, {
        markdown: this.markdown
      });
    },
    async onClickExit() {
      this.shown = false;
      this.markdown = "";
    }
  },
  watch: {
    articleId() {
      this.shown = false;
      this.markdown = "";
    }
  }
};
</script>

<style scoped>
@import "~simplemde/dist/simplemde.min.css";
</style>
