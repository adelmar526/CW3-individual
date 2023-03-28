<script>
export default {
  name: "Checkout",
  props: ["shoppingCart"],
  data() {
    return {
      name: "",
      phone: "",
    }
  },
  computed: {
    canCheckout() {
      return this.name.length && this.phone.length && this.shoppingCart.length;
    },
    showNoItemsInCartMessage() {
      return this.shoppingCart.length === 0;
    }
  },
  methods: {
    removeLesson(id) {
      this.$emit("removeLesson", id);
    },
    toggleComponent() {
      this.$emit("toggleComponent");
    },
    confirmOrder() {
      this.$emit("confirmOrder")
    }
  }
};
</script>

<template>
  <!-- order container -->
  <article class="order-container">
    <div class="order-item" v-for="item in shoppingCart" :key="item._id">
      <h1>{{ item.topic }}</h1>
      <button @click="removeLesson(item._id)">X</button>
    </div>
    <div v-if="showNoItemsInCartMessage" class="empty-cart">Please go back and purchase a lesson to confirm your order!</div>
  </article>

  <!-- confirm section -->
  <article class="confirm-container">
    <h1>Confirm your order</h1>
    <div class="input-group">
      <label for="name">Enter your name:</label>
      <input v-model="name" type="text" placeholder="John Doe." />
    </div>
    <div class="input-group">
      <label for="name">Enter your phone number:</label>
      <input v-model="phone" type="text" placeholder="123456789" />
    </div>

    <button
      :class="canCheckout ? 'confirm-btn' : 'disabled-confirm-btn'"
      @click="confirmOrder"
    >
      Confirm
    </button>
    <button class="cancel-btn" @click="toggleComponent">Cancel</button>
  </article>
</template>
