<template>
  <div class="home">
    <auction-controls></auction-controls>
  </div>
</template>

<script>
// @ is an alias to /src
import AuctionControls from '../components/AuctionControls'

export default {
  name: 'home',
  components: {
    AuctionControls
  }
}
</script>
