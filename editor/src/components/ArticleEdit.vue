<template>
  <div>
    <div v-if="!draftItem">
      <b-table
        :items="store.articles"
        :fields="fields"
        @row-clicked="onClickRow"
        caption="ページ一覧"
        caption-top
        selectable
        select-mode="single"
        show-empty
        empty-text="ページがありません"
        hover
      />
      <b-button @click="onClickAddArticle" variant="primary" block>新規作成</b-button>
    </div>
    <div v-else class="edit-area">
      <b-button @click="onClickExitEdit" variant="primary" block>戻る</b-button>
      <b-input-group prepend="ページID">
        <b-input v-model="draftItem.articleId" />
      </b-input-group>
      <b-input-group prepend="タイトル">
        <b-input v-model="draftItem.title" />
      </b-input-group>
      <b-input-group prepend="カテゴリ">
        <b-form-select
          v-model="draftItem.categoryId"
          :options="store.setting.categories"
          value-field="categoryId"
          text-field="categoryName"
        />
      </b-input-group>
      <b-input-group prepend="キャプション画像">
        <ImageSelect v-model="draftItem.captionImage" />
      </b-input-group>
      <b-button @click="onClickEditContent" variant="primary" block>本文を編集する</b-button>
      <MarkdownEditor :articleId="draftItem.articleId" ref="markDownEditor" />
      <b-button @click="onClickAdd" variant="primary">add</b-button>
      <b-button @click="onClickDelete" variant="danger">delete</b-button>
    </div>
  </div>
</template>

<script>
import ImageSelect from "@/components/ImageSelect.vue";
import MarkdownEditor from "@/components/MarkdownEditor.vue";
export default {
  components: {
    ImageSelect,
    MarkdownEditor
  },
  data() {
    return {
      store: this.$store,
      fields: [
        { key: "articleId", label: "ID", sortable: true },
        { key: "title", label: "タイトル", sortable: true },
        {
          key: "categoryId",
          label: "カテゴリ",
          sortable: true,
          formatter: value =>
            this.categoryDict[value]
              ? this.categoryDict[value].categoryName
              : ""
        }
      ],
      draftItem: null
    };
  },
  mounted() {},
  methods: {
    onClickAddArticle() {
      this.draftItem = {
        articleId: "",
        title: "",
        categoryId: "",
        captionImage: ""
      };
    },
    onClickRow(item) {
      this.draftItem = JSON.parse(JSON.stringify(item));
    },
    onClickExitEdit() {
      this.draftItem = null;
    },
    onClickEditContent() {
      this.$refs.markDownEditor.open();
    },
    async onClickAdd() {
      await this.store.addArticle(this.draftItem);
      this.draftItem = null;
    },
    async onClickDelete() {
      if (!confirm("このページを削除しますか？")) return;
      await this.store.deleteArticle(this.draftItem);
      this.draftItem = null;
    }
  },
  computed: {
    categoryDict() {
      const dict = {};
      for (let category of this.store.setting.categories) {
        dict[category.categoryId] = category;
      }
      return dict;
    }
  }
};
</script>

<style scoped>
.edit-area > * {
  margin-bottom: 10px;
}
</style>
