<template>
  <div class="form-list">
    <b-input-group prepend="サイト名">
      <b-input v-model="draftItem.siteName" />
    </b-input-group>
    <b-input-group prepend="トップ画像">
      <ImageSelect v-model="draftItem.topImage" />
    </b-input-group>
    <div>
      <b-button v-b-toggle.editCategory block variant="primary">カテゴリ編集</b-button>
      <b-collapse id="editCategory">
        <b-card>
          <b-table
            :items="draftItem.categories"
            :fields="categoryFields"
            show-empty
            empty-text="カテゴリがありません"
          >
            <template v-slot:cell(categoryId)="data">
              <b-input v-model="data.item.categoryId" />
            </template>
            <template v-slot:cell(categoryName)="data">
              <b-input v-model="data.item.categoryName" />
            </template>
            <template v-slot:cell(buttons)="data">
              <b-button-group size="sm">
                <b-button @click="onClickDeleteCategory(data.item)">
                  <b-icon icon="trash-fill"></b-icon>
                </b-button>
                <b-button @click="onClickSwapUpCategory(data.item)">
                  <b-icon icon="caret-up-square-fill"></b-icon>
                </b-button>
                <b-button @click="onClickSwapDownCategory(data.item)">
                  <b-icon icon="caret-down-square-fill"></b-icon>
                </b-button>
              </b-button-group>
            </template>
          </b-table>
          <b-button @click="draftItem.categories.push({})" variant="primary" block>追加</b-button>
        </b-card>
      </b-collapse>
    </div>
    <div>
      <b-button v-b-toggle.editMenu block variant="primary">メニュー編集</b-button>
      <b-collapse id="editMenu">
        <b-card>
          <b-table
            :items="draftItem.menuItems"
            :fields="menuItemFields"
            show-empty
            empty-text="メニューがありません"
          >
            <template v-slot:cell(label)="data">
              <b-input v-model="data.item.label" />
            </template>
            <template v-slot:cell(href)="data">
              <b-input v-model="data.item.href" />
            </template>
            <template v-slot:cell(buttons)="data">
              <b-button-group size="sm">
                <b-button @click="onClickDeleteMenuItem(data.item)">
                  <b-icon icon="trash-fill"></b-icon>
                </b-button>
                <b-button @click="onClickSwapUpMenuItem(data.item)">
                  <b-icon icon="caret-up-square-fill"></b-icon>
                </b-button>
                <b-button @click="onClickSwapDownMenuItem(data.item)">
                  <b-icon icon="caret-down-square-fill"></b-icon>
                </b-button>
              </b-button-group>
            </template>
          </b-table>
          <b-button @click="draftItem.menuItems.push({})" variant="primary" block>追加</b-button>
        </b-card>
      </b-collapse>
    </div>
    <b-button @click="onClickSave" variant="primary">save</b-button>
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
        topImage: "",
        categories: [],
        menuItems: []
      },
      categoryFields: [
        { key: "categoryId", label: "カテゴリID" },
        { key: "categoryName", label: "カテゴリ名" },
        { key: "buttons", label: "" }
      ],
      menuItemFields: [
        { key: "label", label: "ラベル" },
        { key: "href", label: "リンク先" },
        { key: "buttons", label: "" }
      ]
    };
  },
  mounted() {
    this.draftItem = JSON.parse(JSON.stringify(this.store.setting));
  },
  methods: {
    async onClickSave() {
      this.store.saveSetting(this.draftItem);
    },
    onClickDeleteCategory(item) {
      this.draftItem.categories = this.draftItem.categories.filter(
        d => d !== item
      );
    },
    onClickSwapUpCategory(item) {
      const index = this.draftItem.categories.indexOf(item);
      if (index === 0) return;
      this.draftItem.categories.splice(
        index - 1,
        2,
        this.draftItem.categories[index],
        this.draftItem.categories[index - 1]
      );
    },
    onClickSwapDownCategory(item) {
      const index = this.draftItem.categories.indexOf(item);
      if (index === this.draftItem.categories.length - 1) return;
      this.draftItem.categories.splice(
        index,
        2,
        this.draftItem.categories[index + 1],
        this.draftItem.categories[index]
      );
    },
    onClickDeleteMenuItem(item) {
      this.draftItem.menuItems = this.draftItem.menuItems.filter(
        d => d !== item
      );
    },
    onClickSwapUpMenuItem(item) {
      const index = this.draftItem.menuItems.indexOf(item);
      if (index === 0) return;
      this.draftItem.menuItems.splice(
        index - 1,
        2,
        this.draftItem.menuItems[index],
        this.draftItem.menuItems[index - 1]
      );
    },
    onClickSwapDownMenuItem(item) {
      const index = this.draftItem.menuItems.indexOf(item);
      if (index === this.draftItem.menuItems.length - 1) return;
      this.draftItem.menuItems.splice(
        index,
        2,
        this.draftItem.menuItems[index + 1],
        this.draftItem.menuItems[index]
      );
    }
  }
};
</script>

<style scoped>
.form-list > * {
  margin-bottom: 10px;
}
</style>
