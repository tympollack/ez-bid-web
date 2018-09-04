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
                name="Get Auction List From Firestore"
                @click="getAuctionListFromFirestore"
        >
            retrieved {{ auctions.length }} auctions in {{ times.getAuctionListFromFirestore }}ms.
        </auction-control>
        <auction-control
                :loading="loaders.saveAuctionsToFirestore"
                name="Save Auctions to Firestore"
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
    import firebase from 'firebase/app'
    import 'firebase/functions'

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
                const url = 'http://localhost:5000/ezbidfta867/us-central1/helloWorld'
                const params = {
                    method: 'GET',
                    mode: 'no-cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    redirect: 'follow',
                    referrer: 'no-referrer',
                }

                const callback = data => {
                    console.log(data)
                }

                fetch(url, params).then(response => response.json())
                    .then(callback)
                    .catch(error => console.log('error:', error))
            },

            getAuctionListFromServer () {
                this.loaders.getAuctionListFromServer = true
                const url = 'http://localhost:5000/ezbidfta867/us-central1/getAuctionList'
                const params = {
                    // method: 'GET',
                    // mode: 'no-cors',
                    // cache: 'no-cache',
                    // credentials: 'same-origin',
                    // headers: {
                    //     'Content-Type': 'application/x-www-form-urlencoded'
                    // },
                    // redirect: 'follow',
                    // referrer: 'no-referrer',
                }

                const callback = data => {
                    console.log('getAuctionListFromServer data: ', data)
                    this.auctions = data.content
                    this.loaders.getAuctionListFromServer = false
                }

                fetch(url, params).then(response => response.json())
                    .then(callback)
                    .catch(error => console.log('error:', error))
            },

            saveAuctionsToFirestore () {
                const helloWorld = firebase.functions().httpsCallable('helloWorld')
                helloWorld({}).then(result =>
                    console.log(result)
                )
            },
        }
    }
</script>

<style scoped>

</style>