<template>
  <div>
    <div>
      <label>
        Name
        <input type="text" v-model="author.name" />
      </label>
    </div>
    <div>
      <label>
        Genre
        <input type="text" v-model="author.genre" />
      </label>
    </div>
    <div>
      <label>
        Year of born
        <input type="number" v-model="author.yearOfBorn" />
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
      author: {},
      rawPhotoData: null,
    };
  },

  computed: {
    photoSrc() {
      return this.rawPhotoData || this.author.photo;
    },
    receivedAuthorId() {
      return this.$route.params.id;
    },
    btnLabel() {
      return this.receivedAuthorId ? "Update" : "Add";
    },
  },

  methods: {
    ...mapActions("authors", ["getAuthorById", "addAuthor", "updateAuthor"]),

    createLogoImage(event) {
      const file = event.target.files[0];
      let reader = new FileReader();
      const self = this;
      reader.onload = (e) => {
        self.rawPhotoData = e.target.result;
        self.author.photo = e.target.result;
        console.log("self.author.photo");
        console.log(self.author.photo);
      };
      reader.readAsDataURL(file);
    },

    async onSave() {
      try {
        if (!this.receivedAuthorId) await this.addAuthor(this.author);
        else await this.updateAuthor(this.author);
        this.$router.push({ name: "authors" });
      } catch (err) {
        console.log(err);
      }
    },
  },

  async mounted() {
    if (this.receivedAuthorId) {
      try {
        this.author = await this.getAuthorById(this.receivedAuthorId);
        console.log("this.author");
        console.log(this.author);
      } catch (err) {
        console.log(err);
      }
    }
  },
};
</script>

<style lang="scss" scoped></style>
