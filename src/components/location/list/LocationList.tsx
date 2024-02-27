import { ListItem } from ".";
import { BaseCheckbox } from "../../base";

import { ListProps } from "../../../types";

import styles from "../../../style/components/location/list/LocationList.module.css";

export const List: React.FC<ListProps> = ({
  items,
  onClick,
  active,
  hasCheckbox = false,
  onChange,
}) => {
  return (
    <div className={styles["list-container"]}>
      {items.map((item) => (
        <ListItem
          key={item.name}
          onClick={() => onClick(item.name)}
          customClass="list"
          active={active}
          name={item.name}
        >
          {hasCheckbox && (
            <BaseCheckbox
              label={item.name}
              checked={item.checked}
              onChange={(event) => {
                if (onChange) onChange(item.id, item.name, event);
              }}
            />
          )}
          {!hasCheckbox && (
            <div className={styles["country-container"]}>
              <img className={styles["country-flag"]} src={item.flag} alt="" />
              <span>{item.name}</span>
            </div>
          )}
        </ListItem>
      ))}
    </div>
  );
};
