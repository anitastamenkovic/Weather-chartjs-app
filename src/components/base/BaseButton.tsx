import { MouseEvent } from "react";
import { BaseButtonProps } from "../../types";

import styles from "../../style/components/base/BaseButton.module.css";

export const BaseButton: React.FC<BaseButtonProps> = ({
  type,
  children,
  onClick,
  customClass,
  active,
  name,
}) => {
  const onClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    type === "submit" ? event.preventDefault() : event.stopPropagation();
    onClick(name);
  };
  return (
    <button
      type={"button" || type}
      onClick={onClickHandler}
      className={`${styles.button} ${
        customClass === "list" ? styles["list-button"] : ""
      } ${customClass === "primary" ? styles["primary-button"] : ""} ${
        active === name ? styles["active-button"] : ""
      }`}
    >
      {children}
    </button>
  );
};
