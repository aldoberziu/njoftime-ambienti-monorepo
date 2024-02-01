import Link from "next/link.js";
import styles from "./Button.module.scss";
import Text from "../Text/index.js";

const Button = ({ children, nextLink, className, href, disabled, text, onClick, ...rest }) => {
  const classNames = [`${styles.button}`];
  if (className) classNames.push(className);
  if (disabled) classNames.push("disabled");

  if (nextLink) {
    return (
      <Link className={classNames.join(" ")} href={href || ""} {...rest}>
        <Text ui1>
          {text}
          {children}
        </Text>
      </Link>
    );
  } else {
    return (
      <div
        className={classNames.join(" ")}
        {...rest}
        onClick={() => {
          onClick && onClick();
        }}
      >
        <Text ui1>
          {text}
          {children}
        </Text>
      </div>
    );
  }
};

export default Button;
