<template>
  <div>
    <div>
      <label>
        Title
        <input type="text" v-model="book.title" />
      </label>
    </div>
    <div>
      <label>
        Price
        <input type="number" v-model="book.price" />
      </label>
    </div>
    <div>
      <label>
        Year
        <input type="number" v-model="book.year" />
      </label>
    </div>
    <div>
      <label>
        Photo
        <input type="file" @input="createLogoImage" />
      </label>
      <img id="img" :src="photoSrc" alt="" />
    </div>
    <button @click="onSave">{{ btnLabel }}</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "AuthorsListPage",

  data() {
    return {
      book: {},
      rawPhotoData: null,
    };
  },

  computed: {
    photoSrc() {
      return this.rawPhotoData || this.book.photo;
    },
    receivedBookId() {
      return this.$route.params.id;
    },
    btnLabel() {
      return this.receivedBookId ? "Update" : "Add";
    },
  },

  methods: {
    ...mapActions("books", ["getBookById", "addBook", "updateBook"]),

    createLogoImage(event) {
      const file = event.target.files[0];
      let reader = new FileReader();
      const self = this;
      reader.onload = (e) => {
        self.rawPhotoData = e.target.result;
        self.book.photo = e.target.result;
        console.log("self.book.photo");
        console.log(self.book.photo);
      };
      reader.readAsDataURL(file);
    },

    async onSave() {
      try {
        if (!this.receivedBookId) await this.addBook(this.book);
        else await this.updateBook(this.book);
        this.$router.push({ name: "books" });
      } catch (err) {
        console.log(err);
      }
    },
  },

  async mounted() {
    if (this.receivedBookId) {
      try {
        this.book = await this.getBookById(this.receivedBookId);
        console.log("this.book");
        console.log(this.book);
      } catch (err) {
        console.log(err);
      }
    }
  },
};
</script>

<style lang="scss" scoped></style>
