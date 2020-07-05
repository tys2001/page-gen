<template>
  <div>
    <b-table
      :items="store.menu"
      :fields="fields"
      @row-clicked="onClickRow"
      caption="メニュー一覧"
      caption-top
      selectable
      select-mode="single"
      show-empty
      empty-text="メニューがありません"
      hover
    />
    <b-input-group prepend="メニューID">
      <b-input v-model="draftItem.menuId" />
    </b-input-group>
    <b-input-group prepend="メニュー名">
      <b-input v-model="draftItem.menuName" />
    </b-input-group>
    <b-input-group prepend="リンク先">
      <b-input v-model="draftItem.href" />
    </b-input-group>
    <b-input-group prepend="並び順">
      <b-input v-model="draftItem.sortNo" />
    </b-input-group>
    <b-button @click="onClickAdd">add</b-button>
    <b-button @click="onClickDelete">delete</b-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      store: this.$store,
      fields: [
        { key: "menuId", label: "メニューID" },
        { key: "menuName", label: "メニュー名" },
        { key: "href", label: "リンク先" },
        { key: "sortNo", label: "並び順" }
      ],
      draftItem: {
        menuId: "",
        sortNo: "",
        menuName: "",
        href: ""
      }
    };
  },
  methods: {
    onClickRow(item) {
      this.draftItem = JSON.parse(JSON.stringify(item));
    },
    async onClickAdd() {
      this.store.addMenu(this.draftItem);
    },
    async onClickDelete() {
      this.store.deleteMenu(this.draftItem);
    }
  }
};
</script>

<style scoped>
</style>
