<script>
import Lesson from './components/Lesson.vue'; // This allows import and register two child components 
import Checkout from './components/Checkout.vue'; // This allows import and register two child components
import Swal from 'sweetalert2';
// line 60 lessons=lessons passing props to child components  @addlesson="addLesson is listening for custom events "
// line 61 shoppingcart="shoppingCart passing props to child components and @remove lesson and @toggle component are both custom events "
export default ({
  name: "App",
  components: {Lesson, Checkout}, // This allows import and register two child components
  data() {
    return {
      lessons: [],
      shoppingCart: [],
      activeComponent: "lesson",
    }
  },
  methods: {
    toggleActiveComponent () {
      if (this.activeComponent === "lesson") {
        this.activeComponent = "checkout"
      }
      else {
        this.activeComponent = "lesson"
      }
    },
    addLesson(id) {
      let index = this.lessons.findIndex((item) => item._id === id);
      this.lessons[index].space -= 1;
      this.shoppingCart.push(this.lessons[index]);
    },
    removeLesson(id) {
      let index = this.lessons.findIndex((item) => item._id === id);
      this.lessons[index].space += 1;

      const indexInCart = this.shoppingCart.findIndex((item) => item._id === id);
      this.shoppingCart.splice(indexInCart, 1);
    },
    confirmOrder() {
      Swal.fire({
        title: 'Order placed successfully!',
        text: 'You will contact you on your phone number for further information',
        icon: 'success',
      })
      this.toggleActiveComponent();
      this.shoppingCart = [];
    }
  },
  async mounted() {
    let response = await fetch("http://localhost:3000/api/lesson", {
      method: "GET",
    });
    let data = await response.json();
    this.lessons = data;
  }
})
</script>

<template>
  <button class="cart" @click="toggleActiveComponent">Cart Items: {{ shoppingCart.length }}</button>

  <Lesson v-if="activeComponent === 'lesson'" :lessons="lessons" @addLesson="addLesson" />   
  <Checkout v-if="activeComponent === 'checkout'" :shoppingCart="shoppingCart" @removeLesson="removeLesson" @toggleComponent="toggleActiveComponent" @confirmOrder="confirmOrder" />
</template>

<style scoped>
</style>
