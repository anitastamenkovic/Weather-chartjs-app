import { BaseHeadingProps } from "../../types";

import styles from "../../style/components/base/BaseHeading.module.css";

export const BaseHeading: React.FC<BaseHeadingProps> = ({ children, test }) => {
  return (
    <h1 className={`${styles.heading} ${styles.test}: ${test}`}>{children}</h1>
  );
};
