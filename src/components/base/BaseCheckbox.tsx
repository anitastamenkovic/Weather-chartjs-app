import { BaseCheckboxProps } from "../../types";

import styles from "../../style/components/base/BaseCheckbox.module.css";

export const BaseCheckbox: React.FC<BaseCheckboxProps> = ({
  label,
  checked,
  onChange,
}) => {
  return (
    <div className={styles["checkbox-container"]}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={styles.checkbox}
      />
      <label className={styles.label}>{label}</label>
    </div>
  );
};
