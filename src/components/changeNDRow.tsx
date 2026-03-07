import { Button, DatePicker } from "antd";
import { useState } from "react";
import dayjs from "dayjs";

import { type Item } from "./UploudData";

type Props = {
  item: Item;
  index: number;
  changeData(index: number, date: string): void;
};

const changeNDRow = ({ item, index, changeData }: Props) => {
  const [date, setDate] = useState(item.startDate);

  return {
    ...item,
    startDate: (
      <DatePicker
        defaultValue={dayjs(item.startDate, "DD/MM/YYYY")}
        onChange={(date) => {
          setDate(`${date?.format("DD/MM/YYYY")}`);
        }}
      />
    ),
    actions: (
      <Button
        type="primary"
        onClick={() => {
          changeData(index, date);
        }}
      >
        Сохранить
      </Button>
    ),
  };
};

export { changeNDRow };
