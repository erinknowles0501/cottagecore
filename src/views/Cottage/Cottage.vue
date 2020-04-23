<template>
  <v-container>
    <div class="herb-types">
      <li v-for="herbType in herbTypes" :key="herbType.id">
        <v-card>
          <v-card-text>
            {{ herbType.name }}
          </v-card-text>
          <img
            v-if="herbType.imgPath"
            :src="require(`../../assets/images/${herbType.imgPath}.jpg`)"
          />
        </v-card>
      </li>
    </div>

    <v-container class="garden-app">
      <my-garden />
      <my-seeds />
    </v-container>
  </v-container>
</template>

<script>
import MyGarden from "./components/MyGarden";
import MySeeds from "./components/MySeeds";

import db from "@/firebase/init";

export default {
  name: "cottage-view",
  components: {
    "my-garden": MyGarden,
    "my-seeds": MySeeds
  },
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

.herb-types {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.garden-app {
  width: 100%;
  display: flex;
}
</style>
