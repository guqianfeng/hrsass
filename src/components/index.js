import PageTools from '@/components/PageTools'
import UploadExcel from '@/components/UploadExcel'
import ImageUpload from '@/components/ImageUpload'
import ScreenFull from '@/components/ScreenFull'
import ThemePicker from '@/components/ThemePicker'
import Lang from '@/components/Lang'
import TagsView from '@/components/TagsView'
export default {
  install(Vue) {
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
    Vue.component('ImageUpload', ImageUpload)
    Vue.component('ScreenFull', ScreenFull)
    Vue.component('ThemePicker', ThemePicker)
    Vue.component('Lang', Lang)
    Vue.component('TagsView', TagsView)
  }
}
