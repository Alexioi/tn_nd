import { Button } from "antd";
import { EditFilled } from "@ant-design/icons";
import { useState } from "react";

import { ChangeNDList } from "../ChangeNDList";
import type { Item } from "../../../store";

type Props = {
  item: Item;
  index: number;
};

const EditButton = ({ item, index }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        type="primary"
      >
        <EditFilled />
      </Button>
      <ChangeNDList
        item={item}
        index={index}
        isOpen={isOpen}
        setIsOpen={() => {
          setIsOpen(false);
        }}
      />
    </>
  );
};

export { EditButton };
