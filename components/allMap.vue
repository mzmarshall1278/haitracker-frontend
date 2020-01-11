<template>
<div class="container">
    <div id="mapContainer"></div>
  
  <div class="marshall--text mt-3">
      <p>My Coordinates : lon {{lon}}&deg; &amp; {{lat}}&deg;  </p>
      <p>showing {{show.length}} Users</p>
  </div>

</div>
  
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default {
  name: "LeafletMap",
  data() {
    return {
      map: null
    };
  },
  computed:{
      lon(){
          return this.$store.state.singleUser.location.coordinates[0]
      },
      lat(){
          return this.$store.state.singleUser.location.coordinates[1]
      },
      team(){
          return this.$store.state.singleUser.team
      },
      show(){
           return this.team.map(m => {
               return {coords : m.userId.location.coordinates, name : m.userId.name}
          })
      }
      
  },
  mounted() {
    this.map = L.map("mapContainer").setView([ this.lon, this.lat], 6);
    L.marker([this.lon, this.lat],
//     {
//     icon: new L.DivIcon({
//         className: 'my-div-icon',
//         html:`<span style="color:teal; font-weight:bolder; font-size:2em">${'Me'}</span>`
//     })
// }
).addTo(this.map).bindPopup("Me");
    this.show.forEach(m => {
        L.marker(m.coords,
//             {
//     icon: new L.DivIcon({
//         className: 'my-div-icon',
//         html:`<span style="color:teal; font-weight:bolder; font-size:2em">${m.name}</span>`
//     })
// }
        ).addTo(this.map).bindPopup(m.name)
    });
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  },
  beforeDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }
};
</script>

<style scoped>
#mapContainer {
  /* width: 500; */
  height: 50vh;
}

</style>