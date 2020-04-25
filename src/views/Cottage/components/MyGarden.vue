<template>
  <v-container class="garden-grid">
    <v-card
      v-for="plot in plots"
      :key="plot.number"
      @click="selectPlot(plot.number)"
      @dragover.prevent
      @drop.prevent="dropSeed($event, plot.number)"
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
import { store, mutations } from "../store";

export default {
  name: "my-garden",
  data() {
    return {
      //   plots: [],
      //   herbTypes: [],
      isLoaded: false
    };
  },
  computed: {
    plots: {
      get() {
        if (this.isLoaded) {
          return store.plots;
        }
      },
      set() {
        console.log("plots set!");
        mutations.updatePlots();
      }
    }
  },
  async created() {
    console.log("created!");
    await mutations.updatePlots();

    this.isLoaded = true;
  },
  methods: {
    async selectPlot(plotNumber) {
      await db
        .collection("gardens")
        .doc("u2fAtwrhZnGGHp8GYkLT")
        .collection("plots")
        .doc(plotNumber + "")
        .delete()
        .then(console.log("Document successfully deleted!"))
        .catch(error => console.log("Error deleting document: ", error));

      this.plots[this.plots.findIndex(plot => plot.number === plotNumber)] = {
        number: plotNumber,
        contains: null
      };

      mutations.updatePlots();
    },
    dropSeed(e, plotNumber) {
      const seedData = JSON.parse(e.dataTransfer.getData("seedData"));
      db.collection("gardens")
        .doc("u2fAtwrhZnGGHp8GYkLT")
        .collection("plots")
        .doc(plotNumber + "")
        .set({
          number: plotNumber,
          contains: seedData.typeCuid
        })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });

      // if a plot (defined in the db or not) is overwritten (ie if something is dragged onto it), update the object instead of creating a new one...?
      // or just destroy the original since we're pulling this.plots
      this.plots = this.plots.filter(plot => {
        return plot.number !== plotNumber;
      });

      mutations.updatePlots();
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
