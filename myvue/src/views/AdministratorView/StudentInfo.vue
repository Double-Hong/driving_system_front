<template>
<p>StudentInfo</p>
</template>

<script>
import {inject} from "vue";

export default {
  name: "StudentInfo",
  setup(){
    const peopleId = inject('peopleId')
    alert(inject('peopleId'))

    return{
      peopleId,

    }
  }
}
</script>

<style scoped>

</style>