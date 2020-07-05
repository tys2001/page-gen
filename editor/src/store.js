import firebase from "firebase";

export default {
  async create() {
    firebase.initializeApp({
      apiKey: "AIzaSyB_m5uvIdIKbvW1ZWEphFQ_M22ERLLtLG0",
      authDomain: "tysfb-ac05c.firebaseapp.com",
      databaseURL: "https://tysfb-ac05c.firebaseio.com",
      projectId: "tysfb-ac05c",
      storageBucket: "tysfb-ac05c.appspot.com",
      messagingSenderId: "746165169108",
      appId: "1:746165169108:web:26381f1f5d41b674bb8441",
      measurementId: "G-G1YYLRWCGS"
    });
    const firestore = firebase.firestore();
    const storageRef = firebase.storage().ref();
    const obj = {
      articles: [],
      categories: [],
      menu: [],
      media: [],
      setting: {},
      categoryDict: {},
      async loadArticles() {
        const docs = await firestore.collection("articles").get();
        this.articles = [];
        docs.forEach(doc => {
          const data = doc.data();
          this.articles.push(data);
        });
      },
      async addArticle(data) {
        await firestore.collection("articles").doc(data.articleId).set(data);
        this.loadArticles();
      },
      async deleteArticle(data) {
        await firestore.collection("articles").doc(data.articleId).delete();
        this.loadArticles();
      },
      async loadCategories() {
        const docs = await firestore.collection("categories").get();
        this.categories = [];
        docs.forEach(doc => {
          const data = doc.data();
          this.categories.push(data);
          this.categoryDict[doc.id] = data;
        });
      },
      async addCategory(data) {
        await firestore.collection("categories").doc(data.categoryId).set(data);
        this.loadArticles();
      },
      async deleteCategory(data) {
        await firestore.collection("categories").doc(data.categoryId).delete();
        this.loadArticles();
      },
      async loadMenu() {
        const docs = await firestore.collection("menu").orderBy("sortNo").get();
        this.menu = [];
        docs.forEach(doc => {
          const data = doc.data();
          this.menu.push(data);
        });
      },
      async addMenu(data) {
        await firestore.collection("menu").doc(data.menuId).set(data);
        this.loadMenu();
      },
      async deleteMenu(data) {
        await firestore.collection("menu").doc(data.menuId).delete();
        this.loadMenu();
      },
      async loadSetting() {
        const doc = await firestore.collection("settings").doc("setting").get();
        this.setting = doc.data();
      },
      async saveSetting(data) {
        await firestore.collection("settings").doc("setting").set(data);
        this.loadSetting();
      },
      async loadMedia() {
        const docs = await firestore.collection("media").get();
        this.media = [];
        docs.forEach(doc => {
          const data = doc.data();
          this.media.push(data);
        });
      },
      async addMedia(file) {
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);
        const storageUrl = await fileRef.getDownloadURL();
        await firestore.collection("media").doc(file.name)
          .set({
            fileName: file.name,
            storageUrl: storageUrl
          });
        this.loadMedia();
      },
      async deleteMedia(fileName) {
        const fileRef = storageRef.child(fileName);
        await fileRef.delete();
        await firestore.collection("media").doc(fileName).delete();
        this.loadMedia();
      }
    };
    await Promise.all([
      obj.loadArticles(),
      obj.loadCategories(),
      obj.loadMenu(),
      obj.loadSetting(),
      obj.loadMedia()
    ]);
    return obj;
  }
}