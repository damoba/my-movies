import styles from "./Message.module.css";

import React, { FunctionComponent } from "react";

interface Props {
  text: string;
  style: {
    background: string;
  } | null;
}

const Message: FunctionComponent<Props> = ({ text, style }) => {
  return (
    <div className={styles.container} style={style}>
      <p>{text}</p>
    </div>
  );
};

export default Message;
