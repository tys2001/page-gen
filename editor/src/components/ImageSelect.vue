<template>
  <div>
    <div class="thumbnail" :style="{ backgroundImage: `url(${value})` }" />
    <b-button @click="onClickOpen">select</b-button>
    <b-modal ref="modal" @ok="onClickOk" size="xl">
      <div class="thumbnails-box">
        <div
          v-for="item in store.media"
          :key="item.fileName"
          class="thumbnail"
          :style="{ backgroundImage: `url(${item.storageUrl})` }"
          :selected="selectedMedia === item"
          @click="selectedMedia = item"
        />
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: {
    value: String
  },
  data() {
    return {
      store: this.$store,
      selectedMedia: null
    };
  },
  methods: {
    onClickOpen() {
      this.selectedMedia = null;
      this.$refs.modal.show();
    },
    onClickOk() {
      this.$emit("input", this.selectedMedia.storageUrl);
    }
  }
};
</script>

<style scoped>
.image-selected {
  max-width: 100%;
}
.thumbnail {
  width: 100px;
  height: 100px;
  background-color: lightgray;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  display: inline-block;
  margin: 5px;
}
.thumbnail[selected] {
  border: 2px solid red;
}
</style>
