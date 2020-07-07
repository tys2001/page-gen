<template>
  <div>
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
    <b-input-group prepend="ページID">
      <b-input v-model="draftItem.articleId" />
    </b-input-group>
    <b-input-group prepend="タイトル">
      <b-input v-model="draftItem.title" />
    </b-input-group>
    <b-input-group prepend="カテゴリ">
      <b-form-select
        v-model="draftItem.categoryId"
        :options="store.categories"
        value-field="categoryId"
        text-field="categoryName"
      />
    </b-input-group>
    <b-input-group prepend="キャプション画像">
      <ImageSelect v-model="draftItem.captionImage" />
    </b-input-group>
    <b-button @click="onClickEditContent" variant="primary" block>本文を編集する</b-button>
    <MarkdownEditor
      v-show="showMarkdownEditor"
      v-model="draftContent.markdown"
      @save="onClickSaveContent"
      @exit="onClickExitEditor"
    />
    <b-button @click="onClickAdd">add</b-button>
    <b-button @click="onClickDelete">delete</b-button>
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
            this.store.categoryDict[value]
              ? this.store.categoryDict[value].categoryName
              : ""
        }
      ],
      draftItem: {
        articleId: "",
        title: "",
        categoryId: "",
        captionImage: ""
      },
      showMarkdownEditor: false,
      draftContent: {
        markdown: "",
        html: ""
      }
    };
  },
  mounted() {},
  methods: {
    onClickRow(item) {
      this.draftItem = JSON.parse(JSON.stringify(item));
      this.showMarkdownEditor = false;
    },
    async onClickEditContent() {
      this.draftContent = await this.store.getContent(this.draftItem.articleId);
      this.showMarkdownEditor = true;
    },
    async onClickSaveContent() {
      await this.store.saveContent(this.draftItem.articleId, this.draftContent);
    },
    onClickExitEditor() {
      this.showMarkdownEditor = false;
    },
    async onClickAdd() {
      this.store.addArticle(this.draftItem);
    },
    async onClickDelete() {
      this.store.deleteArticle(this.draftItem);
    }
  }
};
</script>

<style scoped>
</style>
