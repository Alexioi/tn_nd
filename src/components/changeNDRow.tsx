import { Button, DatePicker, Input } from "antd";
import { useState } from "react";
import dayjs from "dayjs";

import { type Item } from "./UploudData";
import TextArea from "antd/es/input/TextArea";

type Props = {
  item: Item;
  index: number;
  changeData(index: number, item: Item): void;
};

const changeNDRow = ({ item, index, changeData }: Props) => {
  const [startDate, setStartDate] = useState(item.startDate);
  const [designation, setDesignation] = useState(item.designation);
  const [name, setName] = useState(item.name);
  const [approvingOrganization, setApprovingOrganization] = useState(
    item.approvingOrganization,
  );
  const [approvingDate, setApprovingDate] = useState(item.approvingDate);

  return {
    ...item,
    designation: (
      <TextArea
        defaultValue={designation}
        onChange={(date) => {
          setDesignation(date.target.value);
        }}
      />
    ),
    name: (
      <TextArea
        defaultValue={name}
        onChange={(date) => {
          setName(date.target.value);
        }}
      />
    ),
    approvingOrganization: (
      <Input
        defaultValue={approvingOrganization}
        onChange={(date) => {
          setApprovingOrganization(date.target.value);
        }}
      />
    ),
    startDate: (
      <DatePicker
        defaultValue={dayjs(item.startDate, "DD/MM/YYYY")}
        onChange={(date) => {
          setStartDate(`${date?.format("DD/MM/YYYY")}`);
        }}
      />
    ),
    approvingDate: (
      <DatePicker
        defaultValue={dayjs(item.approvingDate, "DD/MM/YYYY")}
        onChange={(date) => {
          setApprovingDate(`${date?.format("DD/MM/YYYY")}`);
        }}
      />
    ),
    actions: (
      <Button
        type="primary"
        onClick={() => {
          changeData(index, {
            ...item,
            startDate,
            designation,
            name,
            approvingOrganization,
            approvingDate,
          });
        }}
      >
        Сохранить
      </Button>
    ),
  };
};

export { changeNDRow };
