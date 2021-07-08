<template>
  <q-page class="q-pa-md">
    <div>
      <q-carousel
        animated
        v-model="slide"
        navigation
        infinite
        :autoplay="autoplay"
        arrows
        transition-prev="slide-right"
        transition-next="slide-left"
        @mouseenter="autoplay = false"
        @mouseleave="autoplay = true"
      >
        <q-carousel-slide :name="1" img-src="~assets/1.jpg" />
        <q-carousel-slide :name="2" img-src="~assets/2.jpg" />
        <q-carousel-slide :name="3" img-src="~assets/3.jpg" />
      </q-carousel>
    </div>
    <br>
    <div class="bg-primary flex flex-center text-h5 text-white"> Select Your Motorcycle For You Buy </div>
    <br>
    <div class="row">
      <div
        v-for="data in datas"
        :key="data._id"
        class="col-4 q-pa-sm">
        <q-card class="my-card">
          <q-img :src="`http://localhost:3000/${data.image}`" />

          <q-card-section>
            <q-btn
              @click="openDetail(data)"
              fab
              color="primary"
              icon="shopping_cart"
              class="absolute"
              style="top: 0; right: 12px; transform: translateY(-100%);"
            />

            <div class="row no-wrap items-center">
              <div class="col text-h6 ellipsis">
                {{ data.namaMotor }} / {{ data.tipeMotor }}
              </div>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-subtitle1">
              Rp. {{ data.hargaMotor }}
            </div>
            <div class="text-caption text-grey">
              Tahun: {{ data.tahunMotor }}
            </div>
            <div class="text-caption text-grey">
              Kecepatan: {{ data.kecepatanMotor }} CC
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-dialog v-model="dialog" v-if="dialog">
      <q-card style="width: 500px">
        <q-card-section>
          <div class="text-h6">Detail Pembelian Motor</div>
        </q-card-section>
        <q-card-section style="max-height: 50vh;" class="scroll">
          {{ activeData.namaMotor }} - Rp. {{ activeData.hargaMotor }}
          <q-form class="q-mt-md">
            <q-input type="number" class="q-mb-md" v-model="jumlah" label="masukan jumlah"> </q-input>
            <q-select class="q-mb-md" v-model="pembayaran" :options="metode" label="Metode Pembayaran" />
            Total yang dibayar : Rp. {{ total() }}
            <q-file class="q-mb-md q-mt-mb" accept=".jpg, image/*" color="teal" filled v-model="image" label="Upload Tanda Pembayaran">
              <template v-slot:prepend>
                <q-icon name="cloud_upload"/>
              </template>
            </q-file>
          </q-form>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="batal"/>
          <q-btn color="primary" @click="prosesTransaksi()" label="Proses"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      jumlah: 1,
      totalHarga: null,
      pembayaran: null,
      dialog: false,
      slide: ref(1),
      autoplay: ref(true),
      metode: [
        'Cash', 'Kredit'
      ],
      datas: [],
      activeData: [],
      image: null
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$api.get('motor/getMotor')
        .then((res) => {
          if (res.data.sukses) {
            this.datas = res.data.data
            console.log(this.data)
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
    },
    openDetail (data) {
      this.activeData = data
      this.dialog = true
    },
    prosesTransaksi () {
      const formData = new FormData()
      formData.append('image', this.image)
      formData.append('data', JSON.stringify({
        idUser: this.$q.localStorage.getItem('dataUser')._id,
        idMotor: this.activeData._id,
        hargaMotor: this.activeData.hargaMotor,
        pembayaran: this.pembayaran,
        totalHarga: this.totalHarga,
        jumlah: this.jumlah
      }))
      this.$api.post('transaksi/insert', formData)
        .then(res => {
          if (res.data.sukses) {
            this.$showNotif(res.data.pesan, 'positive')
            this.dialog = false
            this.image = null
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
    },
    total () {
      this.totalHarga = this.activeData.hargaMotor * this.jumlah
      return this.activeData.hargaMotor * this.jumlah
    }
  }
}
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 300px
</style>
