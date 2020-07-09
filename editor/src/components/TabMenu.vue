<template>
  <div>
    <b-tabs pills card>
      <b-tab title="投稿" active>
        <ArticleEdit />
      </b-tab>
      <b-tab title="メディア">
        <MediaEdit />
      </b-tab>
      <b-tab title="設定">
        <SettingEdit />
      </b-tab>
      <b-tab title="公開">not implemented</b-tab>
    </b-tabs>
  </div>
</template>

<script>
import ArticleEdit from "@/components/ArticleEdit.vue";
import MediaEdit from "@/components/MediaEdit.vue";
import SettingEdit from "@/components/SettingEdit.vue";
export default {
  components: {
    ArticleEdit,
    MediaEdit,
    SettingEdit
  }
};
</script>

<style scoped>
</style>
