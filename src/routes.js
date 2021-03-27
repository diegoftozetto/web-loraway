import DeviceReadings from './components/DeviceReadings'
import DeviceList from './components/DeviceList'

export const routes = [
  {
    path: '/',
    component: DeviceList
  },
  {
    path: '/device/:id/readings',
    component: DeviceReadings
  },
  {
    path: '',
    redirect: '/'
  }
];
