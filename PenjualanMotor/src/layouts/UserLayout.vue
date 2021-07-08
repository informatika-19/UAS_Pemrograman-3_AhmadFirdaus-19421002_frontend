<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          MotorApp
        </q-toolbar-title>

        <q-btn push color="white" icon="person" dense flat>
          <q-popup-proxy>
            <q-banner>
              <q-card flat>
                <q-item>
                  <q-item-section avatar>
                    <q-avatar size="20px">
                      <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>{{ $q.localStorage.getItem('dataUser').nama }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-separator />

                <div>
                  <q-btn label="Exit" icon="sensor_door" @click="logout()" color="primary" flat dense no-caps/>
                </div>
              </q-card>
            </q-banner>
          </q-popup-proxy>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Menu
        </q-item-label>

        <q-item
          class="text-primary"
          v-for="nav in navs"
          :key="nav.label"
          :to="nav.to"
          active-class="my-menu-link"
          exact
          clickable>
          <q-item-section avatar>
            <q-icon :name="nav.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ nav.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
export default {
  name: 'MyLayout',
  data () {
    return {
      cari: null,
      leftDrawerOpen: false,
      navs: [
        {
          label: 'Dashboard',
          icon: 'home',
          to: { name: 'dashboardUser' },
          leftDrawerOpen: false
        },
        {
          label: 'History Payments',
          icon: 'payments',
          to: { name: 'transaksiUser' },
          leftDrawerOpen: false
        }
      ]
    }
  },
  methods: {
    logout () {
      this.$q.localStorage.remove()
      this.$router.push({ name: 'loginPage' })
    }
  }
}
</script>
<style lang="scss">
.q-drawer {
  .q-router-link--exact-active {
    color: rgb(255, 255, 255) !important;
  }
}
.my-menu-link {
  color: #ffff;
  background: #870000;
}
</style>
