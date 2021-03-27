import DeviceReadings from './components/DeviceReadings'
import DeviceList from './components/DeviceList'

export const routes = [
  {
    path: '/home',
    component: DeviceList
  },
  {
    path: '/device/:id/readings',
    component: DeviceReadings
  },
  {
    path: '',
    redirect: '/home'
  }
];
