import Layout from '@/layout'
const attendancesRouter = {
  path: '/attendances',
  component: Layout,
  children: [
    {
      path: 'attendances',
      name: 'attendances',
      component: () => import('@/views/attendances/index'),
      meta: { title: '考勤', icon: 'dashboard' }
    }
  ]
}

export default attendancesRouter
