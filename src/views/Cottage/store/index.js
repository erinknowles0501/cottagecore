import db from "@/firebase/init";

export const store = {
  herbTypes: [],
  plots: [],
  mySeeds: [],
  helloWorld: "YES YES YES"
};

export const mutations = {
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
          if (store.plots.find(plot => plot.id === newPlot.id)) {
            store.plots[
              store.plots.findIndex(plot => plot.id === newPlot.id)
            ] = newPlot;
          } else {
            store.plots.push(newPlot);
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
          store.herbTypes.push(herbType);
        });
      });

    // give the plot object data about what herbType is growing in the plot so it's easily accessible
    store.plots.forEach(plot => {
      let growing = store.herbTypes.find(herb => {
        return herb.id === plot.contains;
      });
      plot.growing = growing;
    });

    this.organizePlots();

    // console.log("plots: ", store.plots);
    // console.log("herbTypes: ", store.herbTypes);
  },

  organizePlots() {
    // create plot objects for empty plots so it's easier to squish the data around
    // then sort the plots (otherwise all the defined ones are at the start, out of order)
    for (let i = 0; i < 25; i++) {
      if (!store.plots.find(plot => plot.number === i)) {
        store.plots.push({ number: i, contains: null });
      }
    }
    store.plots.sort((a, b) => {
      return a.number > b.number;
    });
  },

  async updateSeeds() {
    //
  }
};
