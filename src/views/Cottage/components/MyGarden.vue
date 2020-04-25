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

      this.updatePlots();
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
      console.log("filtering plots");
      this.plots = this.plots.filter(plot => {
        console.log(plot.number);
        return plot.number !== plotNumber;
      });
      console.log("plots filtered");

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
            // if plot id not already in data,
            // push
            // otherwise, update.
            // TODO: this can be refactored, I can feel it. Something about set plot[id] = newPlot and then it'll create if it doesn't exist and update if it does.
            let newPlot = doc.data();
            newPlot.id = doc.id;
            if (this.plots.find(plot => plot.id === newPlot.id)) {
              this.plots[
                this.plots.findIndex(plot => plot.id === newPlot.id)
              ] = newPlot;
            } else {
              this.plots.push(newPlot);
            }
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

      // give the plot object data about what herbType is growing in the plot so it's easily accessible
      this.plots.forEach(plot => {
        let growing = this.herbTypes.find(herb => {
          return herb.id === plot.contains;
        });
        plot.growing = growing;
      });

      this.organizePlots();

      console.log("plots: ", this.plots);
      console.log("herbTypes: ", this.herbTypes);
    },
    organizePlots() {
      // create plot objects for empty plots so it's easier to squish the data around
      // then sort the plots (otherwise all the defined ones are at the start, out of order)
      for (let i = 0; i < 25; i++) {
        if (!this.plots.find(plot => plot.number === i)) {
          this.plots.push({ number: i, contains: null });
        }
      }
      this.plots.sort((a, b) => {
        return a.number > b.number;
      });
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
