
const routes = [
  {
    path: '/',
    meta: {
      authUser: true
    },
    component: () => import('layouts/UserLayout.vue'),
    children: [
      { path: '', name: 'dashboardUser', component: () => import('pages/User/DashboardUser.vue') },
      { path: 'transaksiuser', name: 'transaksiUser', component: () => import('pages/User/TransaksiUser.vue') }
    ]
  },
  {
    path: '/',
    meta: {
      authAdmin: true
    },
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: 'dashboardAdmin', name: 'dashboardAdmin', component: () => import('pages/Admin/DataTransaksi.vue') },
      { path: 'inputMotor', name: 'inputMotor', component: () => import('pages/Admin/InputMotor.vue') },
      { path: 'dataUser', name: 'dataUser', component: () => import('pages/Admin/DataUser.vue') },
      { path: 'dataMotor', name: 'dataMotor', component: () => import('pages/Admin/DataMotor.vue') },
      { path: 'editMotor/:id', name: 'editMotor', component: () => import('pages/Admin/EditMotor.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: 'login', name: 'loginPage', component: () => import('pages/Guest/Login.vue') },
      { path: 'register', name: 'registerPage', component: () => import('pages/Guest/Register.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
