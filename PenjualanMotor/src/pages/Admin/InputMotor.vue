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
              <div class="text-h6">Input Motorcyles</div>
            </q-banner>
          </div>
        </div>
      </div>
    </div>
    <q-card flat>
      <q-card-section class="row">
        <q-form
          @submit = onSubmit()
          class="q-col-q-gutter-md q-col-lg-6 col-md-6 col-xs-12"
          >
          <q-input
            filled
            v-model="form.namaMotor"
            label="Nama Motor"
            :rules="[ val => val && val.length > 0 || 'Mohon Isi Judul']"
          />
          <div class="bg-grey-2 q-pa-sm rounded-borders q-mb-md">
            Tipe Motor:
            <q-option-group
              name="tipeMotor"
              v-model="form.tipeMotor"
              :options="options"
              color="primary"
              inline
            />
          </div>
          <q-input
            filled
            v-model="form.hargaMotor"
            type="number"
            label="Harga Motor"
            :rules="[ val => val  > 0 || 'Mohon Isi Harga']"
          />
          <q-input
            filled
            v-model="form.tahunMotor"
            label="tahun"
            :rules="[ val => val && val.length > 0 || 'Mohon Isi tahun']"
          />

          <q-input
            filled
            v-model="form.kecepatanMotor"
            suffix="CC"
            label="Kecepatan"
            :rules="[ val => val && val.length > 0 || 'Mohon Isi kecepatan']"
          />

          <q-file class="q-mb-md" accept=".jpg, image/*" color="teal" filled v-model="image" label="Upload Gambar">
            <template v-slot:prepend>
              <q-icon name="cloud_upload"/>
            </template>
          </q-file>

          <div>
            <q-btn label="Submit" type="submit" color="primary"/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      form: {
        namaMotor: null,
        hargaMotor: 0,
        tahunMotor: null,
        tipeMotor: null,
        kecepatanMotor: null
      },

      options: [
        {
          label: 'Bebek',
          value: 'bebek'
        },
        {
          label: 'Matic',
          value: 'matic'
        },
        {
          label: 'Off-Road',
          value: 'ofroad'
        }
      ],
      image: null
    }
  },
  methods: {
    onSubmit () {
      const formData = new FormData()
      formData.append('image', this.image)
      formData.append('data', JSON.stringify(this.form))
      this.$api.post('motor/insert', formData)
        .then(res => {
          if (res.data.sukses) {
            this.$showNotif(res.data.pesan, 'positive')
            this.$router.push({ name: 'dataMotor' })
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
