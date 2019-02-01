<template>
  <div class="container add-smoothie">
    <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>
    <form @submit.prevent="AddSmoothie">
      <div class="field title">
        <label for="title">Smoothied Title:</label>
        <input type="text" name="title" v-model="title">
      </div>
      <div v-for="(ing, index) in ingredients" :key="index">
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" v-model="ingredients[index]">
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add an ingredient</label>
        <input @keydown.tab.prevent="addIng" v-model="another" type="text" name="add-ingredient">
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Add Smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";

export default {
  name: "AddSmoothie",
  data() {
    return {
      title: null,
      another: null,
      feedback: null,
      slug: "",
      ingredients: []
    };
  },
  methods: {
    AddSmoothie() {
      if (!this.title) {
        this.feedback = "You must add a title";
      } else if (this.ingredients.length < 1) {
        this.feedback = "You must add at least one ingredient";
      } else {
        this.feedback = null;
        this.generateSlug();
        console.log(this.slug);
        // db.collections("smoothie").add({
        //   ingredients: this.ingredients,
        //   slug: this.sl
        // });
      }
    },
    addIng() {
      if (this.another) {
        this.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "You must enter a value to add an in";
      }
    },
    generateSlug() {
      this.slug = str.toLowerCase(str.replace(" ", "-"));
    }
  }
};
</script>

<style>
.add-smoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.add-smoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}
.add-smoothie .field {
  margin: 20px auto;
}
</style>
