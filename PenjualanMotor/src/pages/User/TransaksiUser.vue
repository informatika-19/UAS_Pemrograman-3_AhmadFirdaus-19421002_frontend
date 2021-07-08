<template>
  <q-page padding>
    <div class="row q-mb-md col-gutter-md">
      <div class="col-md-12 col-xs-12 col-lg-12">
        <div class="row">
          <div class="col-auto">
            <div class="left blue"></div>
          </div>
          <div class="col">
            <q-banner inline-actions class="text-blue-grey-14">
              <div class="text-h6">Data Transaksi</div>
              <div>Data Transaksi Pembelian dan Pemesanan Anda</div>
            </q-banner>
          </div>
        </div>
      </div>
    </div>
    <q-card flat>
      <q-table
        flat
        title="Treats"
        :rows="data"
        :columns="columns"
        row-key="name"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="namaMotor" :props="props">
              {{ props.row.dataMotor[0].namaMotor }}
            </q-td>
            <q-td key="hargaMotor" :props="props">
              Rp.{{ props.row.hargaMotor }}
            </q-td>
            <q-td key="jumlah" :props="props">
              {{ props.row.jumlah }}
            </q-td>
            <q-td key="totalHarga" :props="props">
              Rp.{{ props.row.totalHarga }}
            </q-td>
            <q-td key="pembayaran" :props="props">
              {{ props.row.pembayaran }}
            </q-td>
            <q-td key="status" :props="props">
              <q-badge v-if="props.row.status === 1" color="orange" class="q-pa-sm">
                Belum Di konfirmasi
              </q-badge>
              <q-badge v-else-if="props.row.status === 2" color="blue" class="q-pa-sm">
                Sedang Dalam Pengiriman
              </q-badge>
              <q-badge v-else color="green" class="q-pa-sm">
                Sudah diterima
              </q-badge>
            </q-td>
            <q-td key="aksi" :props="props">
              <q-btn :disable="props.row.status !== 2" label="Terima Barang" @click="confirm(props.row._id)" class="q-ml-sm" color="green" unelevated />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      columns: [
        { name: 'namaMotor', align: 'center', label: 'Nama Motor', field: 'namaMotor', sortable: true },
        { name: 'hargaMotor', align: 'center', label: 'Harga', field: 'hargaMotor', sortable: true },
        { name: 'jumlah', align: 'center', label: 'Jumlah', field: 'jumlah', sortable: true },
        { name: 'totalHarga', align: 'center', label: 'Total', field: 'totalHarga', sortable: true },
        { name: 'pembayaran', align: 'center', label: 'Metode Pembayaran', field: 'pembayaran', sortable: true },
        { name: 'status', align: 'center', label: 'Status', field: 'status' },
        { name: 'aksi', align: 'center', label: 'Aksi', field: 'aksi' }
      ],
      data: [],
      detail: false,
      activeData: null
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$api.get(`transaksi/getTransaksiId/${this.$q.localStorage.getItem('dataUser')._id}`)
        .then((res) => {
          console.log(res)
          if (res.data.sukses) {
            this.data = res.data.data
          }
        })
    },
    confirm (id) {
      this.$q.dialog({
        title: 'Konfirmasi',
        message: 'Apakah Anda Yakin Mengkonfirmasi Order Telah Diterima',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$api.put(`transaksi/konfirmasiuser/${id}`)
          .then((res) => {
            if (res.data.sukses) {
              this.$showNotif(res.data.pesan, 'positive')
              this.getData()
            } else {
              this.$showNotif(res.data.pesan, 'negative')
            }
          })
      })
    }
  }
}
</script>

<style scoped>
.left {
  width: 3px;
  height: 100%;
  background-color: aqua;
}
</style>
