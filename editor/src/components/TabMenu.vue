<template>
  <div>
    <b-tabs pills card>
      <b-tab title="投稿" active>
        <ArticleEdit />
      </b-tab>
      <b-tab title="カテゴリ">
        <CategoryEdit />
      </b-tab>
      <b-tab title="メニュー">
        <MenuEdit />
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
import CategoryEdit from "@/components/CategoryEdit.vue";
import MenuEdit from "@/components/MenuEdit.vue";
import MediaEdit from "@/components/MediaEdit.vue";
import SettingEdit from "@/components/SettingEdit.vue";
export default {
  components: {
    ArticleEdit,
    CategoryEdit,
    MenuEdit,
    MediaEdit,
    SettingEdit
  }
};
</script>

<style scoped>
</style>
