import { boot } from 'quasar/wrappers'
import { Notify } from 'quasar'

const showNotif = (message, jenis) => {
  Notify.create({
    message: message,
    color: jenis,
    timeout: 2000
  })
}

export default boot(({ app }) => {
  // Set i18n instance on app
  app.config.globalProperties.$showNotif = showNotif
})

export { showNotif }
