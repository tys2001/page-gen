<template>
  <div>
    <div class="thumbnail-selected" :style="{ backgroundImage: `url(${value})` }" />
    <b-button @click="onClickOpen">select</b-button>
    <b-modal ref="modal" @ok="onClickOk" scrollable size="lg">
      <div class="thumbnails-box">
        <div
          v-for="item in store.media"
          :key="item.fileName"
          class="thumbnail-outline"
          :selected="selectedMedia === item"
          @click="selectedMedia = item"
        >
          <div class="thumbnail" :style="{ backgroundImage: `url(${item.storageUrl})` }">
            <b-aspect aspect="1:1"></b-aspect>
          </div>
        </div>
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
.thumbnail-selected {
  width: 100px;
  height: 100px;
  background-color: lightgray;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  display: inline-block;
  margin: 5px;
}
.thumbnail-outline {
  width: 25%;
  display: inline-block;
}
.thumbnail {
  width: calc(100% - 10px);
  background-color: lightgray;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  margin: 5px;
}
.thumbnail-outline[selected] {
  background-color: red;
}
</style>
