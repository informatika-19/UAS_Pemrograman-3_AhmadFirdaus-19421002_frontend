<template>
  <q-page padding>
    <div class="row q-mb-md col-gutter-md">
      <div class="col-md-12 col-xs-12 col-lg-12">
        <div class="row">
          <div class="col-auto">
            <div class="left primary"></div>
          </div>
          <div class="col">
            <q-banner inline-actions class="text-primary">
              <div class="text-h6">Data Motorcycles</div>
              <div>Data All About Motorcycles For Sell</div>
            </q-banner>
          </div>
          <q-space/>
          <div class="flex flex-center">
            <q-btn label="Input Motorcycle" :to="{name: 'inputMotor'}" no-caps color="primary" dense icon="add"/>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="q-pa-md">
    <q-table
      grid
      title="Treats"
      :rows="data"
      :columns="columns"
      row-key="name"
      :filter="filter"
      hide-header
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
  </div> -->
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
              {{ props.row.namaMotor }}
            </q-td>
            <q-td key="hargaMotor" :props="props">
              {{ props.row.hargaMotor }}
            </q-td>
            <q-td key="tipeMotor" :props="props">
              {{ props.row.tipeMotor }}
            </q-td>
            <q-td key="kecepatanMotor" :props="props">
              {{ props.row.kecepatanMotor }} CC
            </q-td>
            <q-td key="tahunMotor" :props="props">
              {{ props.row.tahunMotor }}
            </q-td>
            <q-td key="image" :props="props">
              <q-img
                  :src="`http://localhost:3000/${props.row.image}`"
                  spinner-color="white"
                />
            </q-td>
            <q-td key="aksi" :props="props">
              <div class="row q-gutter-md">
                <q-btn :to=" { name: 'editMotor', params: { id: props.row._id} }" label="Edit" icon="edit" color="warning" unelevated/>
                <q-btn @click="deleteMotor(props.row._id)" label="Hapus" icon="delete" color="negative" unelevated/>
              </div>
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
      filter: null,
      columns: [
        { name: 'namaMotor', align: 'left', label: 'Nama Motor', field: 'namaMotor', sortable: true },
        { name: 'hargaMotor', align: 'left', label: 'Harga', field: 'hargaMotor', sortable: true },
        { name: 'tipeMotor', align: 'left', label: 'Tipe', field: 'tipeMotor', sortable: true },
        { name: 'kecepatanMotor', align: 'left', label: 'Kecepatan', field: 'kecepatanMotor', sortable: true },
        { name: 'tahunMotor', align: 'left', label: 'Tahun', field: 'tahunMotor', sortable: true },
        { name: 'image', align: 'center', label: 'Gambar', field: 'image' },
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' }
      ],
      data: []
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
            this.data = res.data.data
            console.log(this.data)
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
    },
    deleteMotor (id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Apakah anda Yakin',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$api.delete(`motor/deleteMotor/${id}`)
          .then(res => {
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
