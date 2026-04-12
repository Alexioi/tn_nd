import { Dropdown, Flex, Typography, type MenuProps } from "antd";
import { DeleteFilled, EditFilled, MoreOutlined } from "@ant-design/icons";

import { useData, type Item } from "../../../store";
import { ChangeNDList } from "../ChangeNDList";
import { useState } from "react";

type Props = {
  item: Item;
  index: number;
};

const Menu = ({ item, index }: Props) => {
  const { data, setData } = useData();
  const [isOpen, setIsOpen] = useState(false);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Редактировать",
      icon: <EditFilled />,
      onClick: () => {
        setIsOpen(true);
      },
    },
    {
      key: "2",
      label: "Удалить",
      icon: <DeleteFilled />,
      danger: true,
      onClick: () => {
        setData(
          data
            .filter((_, i) => {
              return i !== index;
            })
            .map((el, i) => {
              return { ...el, number: i + 1 };
            }),
        );
      },
    },
  ];

  return (
    <Flex justify="space-between">
      <Typography.Text strong>{item.designation}</Typography.Text>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <MoreOutlined size={50} />
      </Dropdown>
      <ChangeNDList
        item={item}
        index={index}
        isOpen={isOpen}
        setIsOpen={() => {
          setIsOpen(false);
        }}
      />
    </Flex>
  );
};

export { Menu };
