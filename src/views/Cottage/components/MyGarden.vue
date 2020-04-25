<template>
  <v-container class="garden-grid">
    <v-card
      v-for="(plot, index) in plots"
      :key="index"
      @click="selectPlot(index)"
      @dragover.prevent
      @drop.prevent="dropSeed($event, index)"
    >
      <!-- v-if this plot has data, display that seed -->
      <!-- <p v-if="isLoaded && plots.find(plot => plot.number === index)"> -->
      <!-- this didn't work because 'plot' in this case doesn't refer to (plot in this.plots),
		  it refers to (n in 25) and doesn't have any of that data! Omg what a pain it was 
		  to not remember that. -->
      <!-- TODO TODO TODO: have this be (plot in this.plots). After promises resolve and you have the data, 
		  create local this.plots with the rest of the numbers. -->
      <p v-if="isLoaded && plot.growing">
        {{ plot.growing.name }}
      </p>
      <p v-else>plot {{ plot.number }}</p>
    </v-card>
  </v-container>
</template>

<script>
// what if instead of [0,1,2,3.....25] we had...
/* [
 * [0,1,2,3,4],
 * [5,6,7,8,9],
 * [10,11,12,13,14]
 * etc etc. So an array with five arrays with five plots each. THEN....might make it easier to navigate with arrow keys...
 * ...or like whatever. If you're on [16] and you press up, you're on [16-5]. If you press down, [16+5].
 * */
import db from "@/firebase/init";

export default {
  name: "my-garden",
  data() {
    return {
      plots: [],
      herbTypes: [],
      isLoaded: false
    };
  },
  async created() {
    await this.updatePlots();

    this.isLoaded = true;
  },
  methods: {
    selectPlot(index) {
      console.log(index);
    },
    dropSeed(e, index) {
      const seedData = JSON.parse(e.dataTransfer.getData("seedData"));
      db.collection("gardens")
        .doc("u2fAtwrhZnGGHp8GYkLT")
        .collection("plots")
        .doc(index + "")
        .set({
          number: index,
          contains: seedData.typeCuid
        })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });

      this.updatePlots();
    },
    async updatePlots() {
      await db
        .collection("gardens")
        .doc("u2fAtwrhZnGGHp8GYkLT")
        .collection("plots")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let plot = doc.data();
            plot.id = doc.id;
            this.plots.push(plot);
          });
        });

      await db
        .collection("herbTypes")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let herbType = doc.data();
            herbType.id = doc.id;
            this.herbTypes.push(herbType);
          });
        });

      this.plots.forEach(plot => {
        let growing = this.herbTypes.find(herb => {
          return herb.id === plot.contains;
        });
        plot.growing = growing;
      });

      // create plot objects for empty plots so it's easier to squish the data around
      // then sort the plots (otherwise all the defined ones are at the start, out of order)
      for (let i = 0; i < 25; i++) {
        if (!this.plots.find(plot => plot.number === i)) {
          console.log("I!", i);
          this.plots.push({ number: i, contains: null });
        }
      }
      this.plots.sort((a, b) => {
        return a.number > b.number;
      });

      console.log("plots: ", this.plots);
      console.log("herbTypes: ", this.herbTypes);
    },
    async updateSeeds() {
      //
    }
  }
};
</script>

<style scoped>
.garden-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  width: 50vw;
  height: 50vw;
}

.garden-grid .v-card {
  display: block;
  padding: 1em;
  margin: 2px;
  font-size: 0.8em;
}

.garden-grid .v-card:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
