<template>
  <v-container>
    <li v-for="herbType in herbTypes" :key="herbType.id">
      <v-card>
        <v-card-text>
          {{ herbType.name }}
        </v-card-text>
        <img
          v-if="herbType.imgPath"
          :src="require(`../assets/images/${herbType.imgPath}.jpg`)"
        />
      </v-card>
    </li>
  </v-container>
</template>

<script>
import db from "@/firebase/init";

export default {
  name: "cottage-view",
  data() {
    return {
      herbTypes: []
    };
  },
  created() {
    db.collection("herbTypes")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let herbType = doc.data();
          herbType.id = doc.id;
          this.herbTypes.push(herbType);
        });
      });
  }
};
</script>

<style scoped>
li {
  list-style: none;
}

.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
