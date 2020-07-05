<template>
  <div>
    <b-input-group prepend="サイト名">
      <b-input v-model="draftItem.siteName" />
    </b-input-group>
    <b-input-group prepend="トップ画像">
      <ImageSelect v-model="draftItem.topImage" />
    </b-input-group>
    <b-button @click="onClickSave">save</b-button>
  </div>
</template>

<script>
import ImageSelect from "@/components/ImageSelect.vue";
export default {
  components: {
    ImageSelect
  },
  data() {
    return {
      store: this.$store,
      draftItem: {
        siteName: "",
        topImage: ""
      }
    };
  },
  mounted() {
    this.draftItem = this.store.setting;
  },
  methods: {
    async onClickSave() {
      this.store.saveSetting(this.draftItem);
    }
  }
};
</script>

<style scoped>
</style>
