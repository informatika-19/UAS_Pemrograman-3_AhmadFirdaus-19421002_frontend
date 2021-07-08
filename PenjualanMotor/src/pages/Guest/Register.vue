<template>
  <q-page padding class="bg-blue-grey-1">
    <div class="row">
      <q-card class="fixed-center col-md-4 col-xs-12">
        <q-card-section>
          <div class="text-h6">
            Halaman register
          </div>
          <q-form
            @submit="onSubmit"
            >
            <q-input
              v-model="username"
              label="Username"
              :rules="[
              val => val && val.length > 0 || 'Isi Username']"/>
            <q-input
              v-model="namalengkap"
              label="Nama Lengkap"
              :rules="[
              val => val && val.length > 0 || 'Isi Nama']"/>
            <q-input
              v-model="email"
              label="Email"
              :rules="[
                val => val && val.length > 0 || 'Isi Email']"/>
            <q-input
              v-model="password"
              label="Password"
              :rules="[
              val => val && val.length > 0 || 'Isi Password']"/>
            <div class="q-gutter-md">
              <q-btn label="Register" @click="onSubmit()" type="submit" unelevated color="primary"/>
              <q-btn label="Login" :to="{ name: 'loginPage' }" unelevated flat color="primary"/>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      username: null,
      email: null,
      password: null,
      namalengkap: null
    }
  },
  methods: {
    onSubmit () {
      // console.log('heii')
      // console.log(this.$api)
      this.$api.post('user/register', {
        username: this.username,
        nama: this.namalengkap,
        email: this.email,
        password: this.password
      }).then(res => {
        if (res.data.sukses) {
          this.$showNotif(res.data.pesan, 'positive')
          this.$router.push({ name: 'loginPage' })
        } else {
          this.$showNotif(res.data.pesan, 'negative')
        }
      })
    }
  }
}
</script>
