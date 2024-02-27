export interface BaseButtonProps {
  type?: string;
  children: React.ReactNode;
  onClick: (name?: string) => void;
  customClass?: string;
  active?: string;
  name?: string;
}

export interface BaseCheckboxProps {
  label: string;
  checked?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface BaseHeadingProps {
  children: React.ReactNode;
  test?: boolean;
}
