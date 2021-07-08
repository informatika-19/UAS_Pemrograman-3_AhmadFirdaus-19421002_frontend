<template>
  <q-page padding class="row items-center justify-center">
    <div class="row full-width">
      <div class="col-md-10 offset-md-1 col-xs-12 q-pl-md">
        <q-card flat class="text-blue-grey-14">
          <div class="row items-center">
            <div class="col-md-6 flex flex-center col-sm-12 col-xs-12">
              <div class="row q-pt-md q-pb-md">
                <div class="col-md-8 offset-md-1 flex flex-center">
                  <q-img src="~assets/logo.jpg"
                    style="width: 250px; height: 200px"></q-img>
                  <p style="font-weight: bold; font-size: 14px;">Tempat Dimana Belanja Motor Sangat Mudah</p>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-xs-12">
              <q-card-section>
                <div class="text-h4">MotorcycleApps</div>
                <div>Login Akun Anda</div>
              </q-card-section>
              <q-form
                @submit="login">
                <q-card-section>
                  <q-input v-model="username" label = "Username"></q-input>
                  <q-input type="password" v-model="password" label = "Password"></q-input>
                </q-card-section>
                <q-card-section>
                  <q-btn class="full-width" type="submit" unelevated color="primary" label="Login"/>
                  <q-btn class="full-width q-pt-md" :to="{ name: 'registerPage' }" flat unelevated color="primary" label="register"/>
                </q-card-section>
              </q-form>
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      username: null,
      password: null
    }
  },
  methods: {
    login () {
      this.$api.post('user/login', {
        username: this.username,
        password: this.password
      }).then(res => {
        if (res.data.sukses) {
          console.log(res)
          this.$q.localStorage.set('dataUser', res.data.data)
          if (res.data.data.level === 1) {
            this.$router.push({ name: 'dashboardAdmin' })
          } else {
            this.$router.push({ name: 'dashboardUser' })
          }
        } else {
          this.$showNotif(res.data.pesan, 'negative')
        }
      })
    }
  }
}
</script>
