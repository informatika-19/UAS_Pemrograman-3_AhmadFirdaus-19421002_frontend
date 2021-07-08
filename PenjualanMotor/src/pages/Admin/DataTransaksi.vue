<template>
  <q-page padding>
    <div class="row q-mb-md col-gutter-md">
      <div class="col-md-12 col-xs-12 col-lg-12">
        <div class="row">
          <div class="col-auto">
            <div class="left blue"></div>
          </div>
          <div class="col">
            <q-banner inline-actions class="text-primary">
              <div class="text-h6">Data Payments</div>
              <div>All History Payments User</div>
            </q-banner>
          </div>
        </div>
      </div>
    </div>
    <q-card flat>
      <q-table
        flat
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
            <q-td key="kecepatanMotor" :props="props">
              {{ props.row.dataMotor[0].kecepatanMotor }}
            </q-td>
            <q-td key="totalHarga" :props="props">
              Rp.{{ props.row.totalHarga }}
            </q-td>
            <q-td key="nama" :props="props">
              {{ props.row.dataUser[0].nama }}
            </q-td>
            <q-td key="status" :props="props">
              <q-badge v-if="props.row.status === 1" color="orange" class="q-pa-sm">
                Belum Di konfirmasi
              </q-badge>
              <q-badge v-else-if="props.row.status === 2" color="blue" class="q-pa-sm">
                Sedang Dalam Pengiriman
              </q-badge>
              <q-badge v-else color="blue" class="q-pa-sm">
                Sudah diterima
              </q-badge>
            </q-td>
            <q-td key="aksi" :props="props">
              <q-btn label="Detail" @click="openDetail(props.row)" color="primary" unelevated />
              <q-btn :disable="props.row.status !== 1" label="Konfirmasi" @click="confirm(props.row._id)" class="q-ml-sm" color="green" unelevated />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card>
    <q-dialog
      v-model="detail"
      v-if="detail"
      >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Detail Transaksi</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row">
            <div class="col">
              <div class="text-caption">
                Nama Pembeli
              </div>
              <div class="text-weight-bold">
                {{ activeData.dataUser[0].nama }}
              </div>
            </div>
            <div class="col">
              <div class="text-caption">
                Nama Motor
              </div>
              <div class="text-weight-bold">
                {{ activeData.dataMotor[0].namaMotor }}
              </div>
            </div>
            <div class="col">
              <div class="text-caption">
                Harga
              </div>
              <div class="text-weight-bold">
                Rp.{{ activeData.hargaMotor }}
              </div>
            </div>
            <div class="col">
              <div class="text-caption">
                Jumlah
              </div>
              <div class="text-weight-bold">
                {{ activeData.jumlah }}
              </div>
            </div>
            <div class="col">
              <div class="text-caption">
                Total
              </div>
              <div class="text-weight-bold">
                Rp.{{ activeData.totalHarga }}
              </div>
            </div>
          </div>
          <div class="row">
            <q-img :src="`http://localhost:3000/${activeData.image}`"></q-img>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
        { name: 'kecepatanMotor', align: 'center', label: 'kecepatanMotor', field: 'kecepatanMotor' },
        { name: 'totalHarga', align: 'center', label: 'Total', field: 'totalHarga', sortable: true },
        { name: 'nama', align: 'center', label: 'Nama Pembeli', field: 'nama', sortable: true },
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
      this.$api.get('transaksi/getTransaksi')
        .then((res) => {
          console.log(res)
          if (res.data.sukses) {
            this.data = res.data.data
          }
        })
    },
    openDetail (data) {
      this.activeData = data
      console.log(data)
      this.detail = true
    },
    confirm (id) {
      this.$q.dialog({
        title: 'Konfirmasi',
        message: 'Apakah Anda Yakin Mengkonfirmasi Order',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$api.put(`transaksi/konfirmasiadmin/${id}`)
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
