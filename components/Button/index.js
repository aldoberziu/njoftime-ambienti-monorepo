import Link from "next/link.js";
import styles from "./Button.module.scss";
import Text from "../Text/index.js";

const Button = ({ children, className, href, disabled, text, onClick, ...rest }) => {
  const classNames = [`${styles.button}`];
  if (className) classNames.push(className);
  if (disabled) classNames.push('disabled');
  return (
    <Link
      className={classNames.join(" ")}
      href={href || ""}
      onClick={() => {
        onClick && onClick();
      }}
      {...rest}
    >
      <Text ui1>
        {text}
        {children}
      </Text>
    </Link>
  );
};

export default Button;
