export interface MenuItem {
  key: string;
  label: string;
  icon?: string | React.ReactNode;
  url?: string;
  children?: MenuItem[];
}

export interface CurrentPageStage {
  title: string;
  path: string;
  permission?: {
    view: boolean;
    add: boolean;
    update: boolean;
    delete: boolean;
  };
  breadcrumb: string[];
}
