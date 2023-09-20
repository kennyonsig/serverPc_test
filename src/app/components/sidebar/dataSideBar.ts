import { IUnitSideBar } from '../../interface/IUnitSideBar';

export const unitsSideBar: IUnitSideBar[] = [
  {
    nameSB: 'Дашборд',
    typeSB: 'dashboard',
    itemsSB: [{ nameItemSB: 'Test info dashboard', linkItemSB: 'link-dashboard' }]
  },
  {
    nameSB: 'CMDB',
    typeSB: 'cmdb',
    itemsSB: [
      { nameItemSB: 'Серверы и ПК', linkItemSB: 'cmdb/server-pc' },
      { nameItemSB: 'Гипервизорвы и вирт. машины', linkItemSB: 'cmdb/hypervisors-vm' },
      { nameItemSB: 'Принтеры и МФУ', linkItemSB: 'cmdb/printers-mfp' },
      { nameItemSB: 'Сетевые устройства', linkItemSB: 'cmdb/network-devices' }
    ]
  },
  {
    nameSB: 'Сеть',
    typeSB: 'web',
    itemsSB: [{ nameItemSB: 'Test info web', linkItemSB: 'web/link-web' }]
  },
  {
    nameSB: 'Справочники',
    typeSB: 'guide',
    itemsSB: [{ nameItemSB: 'Test info guide', linkItemSB: 'guide/guide-link' }]
  },
  {
    nameSB: 'Отчёты',
    typeSB: 'reports',
    itemsSB: [{ nameItemSB: 'Test info reports', linkItemSB: 'reports/reports-link' }]
  },
  {
    nameSB: 'Мониторинг',
    typeSB: 'monitoring',
    itemsSB: [{ nameItemSB: 'Test info monitoring', linkItemSB: 'monitoring/monitoring-link' }]
  },
  {
    nameSB: 'Автоматизация',
    typeSB: 'automation',
    itemsSB: [{ nameItemSB: 'Test info automation', linkItemSB: 'automation/automation-link' }]
  },
  {
    nameSB: 'Администрирование',
    typeSB: 'administration',
    itemsSB: [{ nameItemSB: 'Test info administration', linkItemSB: 'administration/administration-link' }]
  }
];
