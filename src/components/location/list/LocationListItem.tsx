import { BaseButton } from "../../base";

import { ListItemProps } from "../../../types";

export const ListItem: React.FC<ListItemProps> = ({
  onClick,
  children,
  customClass,
  active,
  name,
}) => {
  return (
    <BaseButton
      customClass={customClass}
      active={active}
      name={name}
      onClick={() => onClick(name)}
    >
      {children}
    </BaseButton>
  );
};
