<template>
  <div>
    <div>
      <img :src="photoSrc" alt="" />
    </div>
    <div>
      <label>
        Name
        <input type="text" v-model="user.name" />
      </label>
    </div>
    <div>
      <label>
        Second name
        <input type="text" v-model="user.secondName" />
      </label>
    </div>
    <div>
      <label>
        Address
        <input type="text" v-model="user.address" />
      </label>
    </div>
    <div>
      <label>
        Email
        <input type="email" v-model="user.email" />
      </label>
    </div>
    <div>
      <button @click="onSave">{{ saveBtnTitle }}</button>
      <button @click="onDelete">{{ delBtnTitle }}</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "EditUserForm",

  data() {
    return {
      user: {},
    };
  },

  computed: {
    ...mapGetters(["getList"]),
    photoSrc() {
      return this.user.photoSrc ?? require("@/assets/images/user.png");
    },
    currentUserId() {
      return this.$route.params.id;
    },
    saveBtnTitle() {
      return this.currentUserId ? "Save" : "Add";
    },
    delBtnTitle() {
      return this.currentUserId ? "Delete" : "Cancel";
    },
  },

  methods: {
    ...mapActions(["addNewUser", "deleteUser", "updateUser"]),

    onSave() {
      if (this.currentUserId) this.updateUser(this.user);
      else this.addNewUser(this.user);
      this.$router.push({ name: "home" });
    },
    onDelete() {
      if (this.currentUserId) this.deleteUser(this.currentUserId);

      this.$router.push({ name: "home" });
    },
  },

  mounted() {
    if (this.currentUserId)
      this.user = this.getList.find((item) => item.id === this.currentUserId);
  },
};
</script>

<style lang="scss" scoped></style>
