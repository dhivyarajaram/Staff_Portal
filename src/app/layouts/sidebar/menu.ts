import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  
  {
    id: 2,
    label: 'MENUITEMS.DASHBOARD.TEXT',
    icon: 'ri-dashboard-2-line',
    isCollapsed: true,
    link: '/analytics'
  },
  {
    id: 8,
    label: 'My Profile',
    icon: 'ri-apps-2-line',
    isCollapsed: true,
   
  },
  
  {
    id: 55,
    label: 'Salary',
    icon: 'ri-account-circle-line',
    isCollapsed: true,
    subItems: [
      {
        id: 56,
        label: 'Payslip',
        parentId: 49,
        
      },
      {
        id: 59,
        label: 'Form 16',
        parentId: 49,
        isCollapsed: true,
      },
      
    ]
  },
  {
    id: 55,
    label: 'Others',
    icon: 'ri-pages-line',
    isCollapsed: true,
    subItems: [
      {
        id: 56,
        label: 'Medical Insurance',
        parentId: 49,
        
      },
      {
        id: 59,
        label: 'Training Videos',
        parentId: 49,
        isCollapsed: true,
      },
      
    ]
  },
  {
    id: 82,
    label: 'LMS',
    icon: 'ri-pencil-ruler-2-line',
    isCollapsed: true,
  },
  {
    id: 131,
    label: 'PMS',
    icon: 'ri-rocket-line',
    isCollapsed: true,
  },
  

];
