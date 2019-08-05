<template>
  <div class="test">
    <svg id="svg" style="width:500px;height:500px;" />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    var s = window.Snap("#svg");
    // Lets create big circle in the middle:
    var bigCircle = s.circle(150, 150, 100);
    // By default its black, lets change its attributes
    bigCircle.attr({
      fill: "#bada55",
      stroke: "#000",
      strokeWidth: 5
    });
  }
};
</script>


<style></style>