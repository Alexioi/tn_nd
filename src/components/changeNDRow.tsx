import { Button, DatePicker, Input, Select } from "antd";
import { SaveFilled } from "@ant-design/icons";
import { useState } from "react";
import dayjs from "dayjs";

import { type Item } from "./UploudData";
import TextArea from "antd/es/input/TextArea";

type Props = {
  item: Item;
  index: number;
  departments: string[];
  changeData(index: number, item: Item): void;
};

const changeNDRow = ({ item, index, departments, changeData }: Props) => {
  const now = dayjs();

  const [startDate, setStartDate] = useState(
    item.startDate === "" || item.startDate === "Invalid Date"
      ? now.format("DD.MM.YYYY")
      : item.startDate,
  );
  const [designation, setDesignation] = useState(item.designation);
  const [name, setName] = useState(item.name);
  const [approvingOrganization, setApprovingOrganization] = useState(
    item.approvingOrganization,
  );
  const [approvingDate, setApprovingDate] = useState(
    item.approvingDate === "" || item.approvingDate === "Invalid Date"
      ? now.format("DD.MM.YYYY")
      : item.approvingDate,
  );
  const [endDate, setEndDate] = useState(item.endDate);
  const [state, setState] = useState(item.state);
  const [status, setStatus] = useState(item.status);
  const [informationAboutChanges, setInformationAboutChanges] = useState(
    item.informationAboutChanges,
  );
  const [note, setNote] = useState(item.note);
  const [responsible, setResponsible] = useState(item.responsible);

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
        defaultValue={dayjs(startDate, "DD.MM.YYYY")}
        onChange={(date) => {
          setStartDate(`${date?.format("DD.MM.YYYY")}`);
        }}
      />
    ),
    approvingDate: (
      <DatePicker
        defaultValue={dayjs(approvingDate, "DD.MM.YYYY")}
        onChange={(date) => {
          console.log(`${date?.format("DD.MM.YYYY")}`);
          setApprovingDate(`${date?.format("DD.MM.YYYY")}`);
        }}
      />
    ),
    endDate: (
      <TextArea
        defaultValue={endDate}
        onChange={(date) => {
          setEndDate(date.target.value);
        }}
      />
    ),
    state: (
      <TextArea
        defaultValue={state}
        onChange={(date) => {
          setState(date.target.value);
        }}
      />
    ),
    status: (
      <Select
        style={{ width: "100%" }}
        defaultValue={status}
        options={[
          { value: "1", label: "обязательный" },
          { value: "2", label: "не обязательный" },
        ]}
        onSelect={(_, { label }) => {
          setStatus(label);
        }}
      />
    ),
    informationAboutChanges: (
      <TextArea
        defaultValue={informationAboutChanges}
        onChange={(date) => {
          setInformationAboutChanges(date.target.value);
        }}
      />
    ),
    note: (
      <TextArea
        defaultValue={note}
        onChange={(date) => {
          setNote(date.target.value);
        }}
      />
    ),
    responsible: (
      <Select
        mode="multiple"
        size="small"
        placeholder=""
        defaultValue={responsible !== undefined ? responsible.split(",") : []}
        onChange={(data) => {
          setResponsible(data.join(","));
        }}
        style={{ width: "100%" }}
        options={departments.map((el) => {
          return { value: el };
        })}
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
            endDate,
            state,
            status,
            informationAboutChanges,
            note,
            responsible,
          });
        }}
      >
        <SaveFilled />
      </Button>
    ),
  };
};

export { changeNDRow };
