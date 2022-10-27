import Layout from '@/layout'
export default {
  path: '/approvals',
  component: Layout,
  children: [
    {
      path: 'approvals',
      name: 'Approvals',
      component: () => import('@/views/approvals/index'),
      meta: { title: '审批', icon: 'dashboard' }
    }
  ]
}
