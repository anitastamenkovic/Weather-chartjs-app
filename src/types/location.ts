export interface ListProps {
  items: { id: string; name: string; flag?: string; checked?: boolean }[];
  onClick: (item: string) => void;
  active?: string;
  hasCheckbox?: boolean;
  onChange?: (
    id: string,
    name: string,
    event: React.FormEvent<HTMLInputElement>
  ) => void;
}

export interface ListItemProps {
  onClick: (title: string) => void;
  children: React.ReactNode;
  customClass: string;
  active?: string;
  name: string;
}

export interface CountryDataType {
  id: string;
  name: string;
  flag: string;
}

export interface CitiesProps {
  id: string;
  name: string;
  checked: boolean;
}
