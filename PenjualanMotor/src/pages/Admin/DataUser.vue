<template>
  <q-page padding>
    <div class="row q-mb-md col-gutter-md">
      <div class="col-md-12 col-xs-12 col-lg-12">
        <div class="row">
          <div class="col-auto">
            <div class="left primary"></div>
          </div>
          <div class="col">
            <q-banner inline-actions class="text-blue-grey-14">
              <div class="text-h6">Data User</div>
              <div>Data Customer</div>
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
        row-key="username"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="username" :props="props">
              {{ props.row.username }}
            </q-td>
            <q-td key="nama" :props="props">
                {{ props.row.nama }}
            </q-td>
            <q-td key="email" :props="props">
                {{ props.row.email }}
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
        { name: 'username', align: 'center', label: 'Username', field: 'username', sortable: true },
        { name: 'nama', align: 'center', label: 'Nama Lengkap', field: 'nama', sortable: true },
        { name: 'email', align: 'center', label: 'Email', field: 'email' }
      ],
      data: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$api.get('user/getUser')
        .then(res => {
          if (res.data.sukses) {
            console.log(res.data.data)
            this.data = res.data.data
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
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
