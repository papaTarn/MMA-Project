import { IconPath } from '@/shared/enum/icon.enum';
import { MenuItem } from '@/shared/model/menu.model';

export const mockMenuItems: MenuItem[] = [
  { key: 'a651ed9b-6621-4df8-b632-e74502de9aaf', label: 'หน้าหลัก', icon: IconPath.HouseLine, url: '/home' },
  {
    key: 'd9185417-6641-4b1f-92fe-010b555bdad8',
    label: 'ฝ่ายขาย',
    icon: IconPath.ChartPieSlice,
    children: [
      {
        key: '9f337757-bb46-4865-b627-12ae0977ffbb',
        label: 'การจัดการบัญชี',
        icon: IconPath.Users,
        url: '/demo-table',
      },
    ],
  },
  {
    key: 'ffe12b8d-548a-4376-b41e-9b2fbcd302da',
    label: 'ฝ่ายบริการ',
    icon: IconPath.Wrench,
    children: [],
  },
  {
    key: '58d3883b-6a36-48a2-a25d-470ac26ace6a',
    label: 'ฝ่ายอะไหล่',
    icon: IconPath.GearSix,
    children: [],
  },
  {
    key: 'c3a098f6-4d56-45d6-871a-5227704c27bb',
    label: 'ฝ่ายการเงิน',
    icon: IconPath.Coins,
    children: [],
  },
  {
    key: 'ef72095b-ed3c-4acc-b428-91c568ad1b4b',
    label: 'ข่าวสาร',
    icon: IconPath.Newspaper,
    children: [],
  },
  {
    key: '3bf0b089-2cbf-4633-9c67-ccfb11337b5e',
    label: 'การอบรมและการนัดหมาย',
    icon: IconPath.GraduationCap,
    children: [],
  },
  {
    key: '8a33e2fe-7299-4f1a-865e-fdef7d42ac1b',
    label: 'การจัดการบัญชี',
    icon: IconPath.Users,
    children: [],
  },
  {
    key: '488bff84-95ee-4fd2-8ac0-4234a36bd859',
    label: 'การจัดการร้านค้า',
    icon: IconPath.Package,
    children: [],
  },
  {
    key: 'a8264288-052e-49ef-96fb-e9b02f8ec7d4',
    label: 'ศูนย์วิเคราะห์ธุรกิจเชิงลึก',
    icon: IconPath.FileText,
    children: [],
  },
  {
    key: '26c2030e-5627-4533-8238-26183db3617b',
    label: 'Five stars',
    icon: IconPath.ShootingStar,
    children: [],
  },
  { key: '1ecfda1d-bfc3-474f-a471-ce467dd22e8f', icon: IconPath.Gear, label: 'การตั้งค่า' },
];
