<template>
  <div v-if="smoothie" class="container edit-smoothie">
    <h2>Edit {{ smoothie.title }} smoothie</h2>
    <form @submit.prevent="editSmoothie">
      <div class="field title">
        <label for="title">Smoothied Title:</label>
        <input type="text" name="title" v-model="smoothie.title">
      </div>
      <div v-for="(ing, index) in smoothie.ingredients" :key="index" class="field">
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" v-model="smoothie.ingredients[index]">
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add an ingredient</label>
        <input @keydown.tab.prevent="addIng" v-model="another" type="text" name="add-ingredient">
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Update Smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/init'

import slugify from 'slugify'

export default {
  name: 'EditSmoothie',
  data() {
    return {
      smoothie: null,
      another: null,
      feedback: null
    }
  },
  created() {
    let ref = db.collection('smoothies').where('slug', '==', this.$route.params.smoothie_slug)
    ref.get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        this.smoothie = doc.data()
        this.smoothie.id = doc.id
      })
    })
    .catch(err => {
      console.log(err)
    })
  },
  methods: {
    addIng() {
        if (this.another) {
          this.smoothie.ingredients.push(this.another);
          this.another = null;
          this.feedback = null;
        } else {
          this.feedback = "You must enter a value to add an in";
        }
      },
      deleteIng(ingredient) {
        this.smoothie.ingredients = this.smoothie.ingredients.filter(ing => {
          return ing !== ingredient
        })
      },
      editSmoothie() {
        if (!this.smoothie.title) {
          this.feedback = "You must add a title";
        } else if (this.smoothie.ingredients.length < 1) {
          this.feedback = "You must add at least one ingredient";
        } else {
          this.feedback = null;
          // create slug
          this.smoothie.slug = slugify(this.smoothie.title, {
            replacement: '-',
            remove: /[$*_+~.()'"!\-:@]/g,
            lower: true
          })
          db.collection("smoothies").doc(this.smoothie.id).update({
            ingredients: this.smoothie.ingredients,
            slug: this.smoothie.slug,
            title: this.smoothie.title
          }).then(() => {
            this.$router.push({ name: 'Index'})
          }).catch(err => {
            console.log(err)
          })
        }
      }
  }
}
</script>

<style>
.edit-smoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.edit-smoothie h2 {
  font-size: 2em;
  margin: 20px auto;
}
.edit-smoothie .field {
  margin: 20px auto;
  position: relative;
}
.edit-smoothie .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #AAA;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
