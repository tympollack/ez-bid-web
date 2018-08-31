<template>
    <div class="blue-grey">
        <auction-control
                :loading="loaders.getAuctionListFromServer"
                name="Get Auction List From Server"
                @click="getAuctionListFromServer"
        >
            retrieved {{ auctions.length }} auctions in {{ times.getAuctionListFromServer }}ms.
        </auction-control>
        <auction-control
                :loading="loaders.getAuctionListFromFirestore"
                name="Get Auction List From Server"
                @click="getAuctionListFromFirestore"
        >
            retrieved {{ auctions.length }} auctions in {{ times.getAuctionListFromFirestore }}ms.
        </auction-control>
        <auction-control
                :loading="loaders.saveAuctionsToFirestore"
                name="Get Auction List From Server"
                @click="saveAuctionsToFirestore"
        >
            saved {{ auctionsSaved.length }} auctions in {{ times.saveAuctionsToFirestore }}ms.
        </auction-control>
        <div>
            <v-container
                    fluid
                    grid-list-md
            >
                <v-layout
                        justify-space-around
                        row
                        wrap
                >
                    <v-flex
                            v-for="auction in auctions"
                            :key="auction.idWlAuctions"
                            xs4
                    >
                        <auction-card :auction="auction"></auction-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
    </div>
</template>

<script>
    import AuctionCard from './AuctionCard'
    import AuctionControl from './AuctionControl'

    export default {
        name: "auction-controls",

        components: {
            AuctionCard,
            AuctionControl
        },

        data () {
            return {
                auctions: [],
                auctionsSaved: 0,
                loaders: {
                    getAuctionListFromFirestore: false,
                    getAuctionListFromServer: false,
                    saveAuctionsToFirestore: false,
                },
                timers: {
                    getAuctionListFromFirestore: 0,
                    getAuctionListFromServer: 0,
                    saveAuctionsToFirestore: 0
                },
                times: {
                    getAuctionListFromFirestore: 0,
                    getAuctionListFromServer: 0,
                    saveAuctionsToFirestore: 0
                }
            }
        },

        watch: {
            'loaders.getAuctionListFromServer' (newVal) {
                if (newVal) {
                    this.timers.getAuctionListFromServer = new Date()
                    this.times.getAuctionListFromServer = 0
                } else {
                    const d = new Date()
                    this.times.getAuctionListFromServer = d - this.timers.getAuctionListFromServer
                    this.timers.getAuctionListFromServer = 0
                }
            },
            'loaders.getAuctionListFromFirestore' (newVal) {
                if (newVal) {
                    this.timers.getAuctionListFromFirestore = new Date()
                    this.times.getAuctionListFromFirestore = 0
                } else {
                    const d = new Date()
                    this.times.getAuctionListFromFirestore = d - this.timers.getAuctionListFromFirestore
                    this.timers.getAuctionListFromFirestore = 0
                }
            },
            'loaders.saveAuctionsToFirestore' (newVal) {
                if (newVal) {
                    this.timers.saveAuctionsToFirestore = new Date()
                    this.times.saveAuctionsToFirestore = 0
                } else {
                    const d = new Date()
                    this.times.saveAuctionsToFirestore = d - this.timers.saveAuctionsToFirestore
                    this.timers.saveAuctionsToFirestore = 0
                }
            },
        },

        methods: {
            getAuctionListFromFirestore () {

            },

            getAuctionListFromServer () {
                this.loaders.getAuctionListFromServer = true
                const url = 'http://localhost:3000/getAuctionList'
                const params = {}

                const callback = data => {
                    this.auctions = data.content
                    this.loaders.getAuctionListFromServer = false
                }

                fetch(url, params).then(response => response.json())
                    .then(callback)
                    .catch(error => console.log('error:', error));
            },

            saveAuctionsToFirestore () {
                this.loaders.saveAuctionsToFirestore = true

            },
        }
    }
</script>

<style scoped>

</style>