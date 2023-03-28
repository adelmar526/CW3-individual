<script>
export default {
  name: "Lesson",
  props: ["lessons"],
  methods: {
    addLesson(id) {
      console.log("child", id);
      this.$emit("addLesson", id); // listening for custom events
    },
  },
};
</script>

<template>
  <section class="lessons-section">
    <!-- individual lesson item -->
    <article v-for="(lesson, index) in lessons" :key="lesson.id" class="lesson">
      <div class="lesson-left">
        <img src="https://picsum.photos/300/200" class="lesson-image" />
        <h1 class="lesson-title">{{ lesson.topic }}</h1>
        <button
          :class="lesson.space === 0 ? 'disabled-purchase-btn' : 'purchase-btn'"
          @click="addLesson(lesson._id)"
        >
          Purchase Lesson
        </button>
      </div>
      <div class="lesson-right">
        <p class="lesson-description" v-html="lesson.description"></p>
        <p>
          <span class="fa fa-map-marker"></span>
          <span>{{ lesson.location }}</span>
        </p>
        <p>
          <span class="fa fa-money"></span>
          <span>{{ lesson.price }}</span>
        </p>
        <p>
          <span class="fa fa-users"></span>
          <span>{{ lesson.space }}</span>
        </p>
        <p v-if="lesson.space === 0">Out of stock more will come</p>
        <p v-else-if="lesson.space < 5">Only {{ lesson.space }} left!</p>
        <p v-else>Hurry buy your lessons now!</p>
      </div>
    </article>
  </section>
</template>
