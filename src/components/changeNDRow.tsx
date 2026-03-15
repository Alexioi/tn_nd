import { Button, DatePicker, Input, Select } from "antd";
import { useLayoutEffect, useState } from "react";
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
  const [startDate, setStartDate] = useState(item.startDate);
  const [designation, setDesignation] = useState(item.designation);
  const [name, setName] = useState(item.name);
  const [approvingOrganization, setApprovingOrganization] = useState(
    item.approvingOrganization,
  );
  const [approvingDate, setApprovingDate] = useState(item.approvingDate);
  const [endDate, setEndDate] = useState(item.endDate);
  const [state, setState] = useState(item.state);
  const [status, setStatus] = useState(item.status);
  const [informationAboutChanges, setInformationAboutChanges] = useState(
    item.informationAboutChanges,
  );
  const [note, setNote] = useState(item.note);
  const [responsible, setResponsible] = useState(item.responsible);

  useLayoutEffect(() => {
    setStartDate(item.startDate);
    setDesignation(item.designation);
    setName(item.name);
    setApprovingOrganization(item.approvingOrganization);
    setApprovingDate(item.approvingDate);
    setEndDate(item.endDate);
    setState(item.state);
    setStatus(item.status);
    setInformationAboutChanges(item.informationAboutChanges);
    setNote(item.note);
    setResponsible(item.responsible);
  }, [item.designation]);

  return {
    ...item,
    designation: (
      <TextArea
        value={designation}
        onChange={(date) => {
          setDesignation(date.target.value);
        }}
      />
    ),
    name: (
      <TextArea
        value={name}
        onChange={(date) => {
          setName(date.target.value);
        }}
      />
    ),
    approvingOrganization: (
      <Input
        value={approvingOrganization}
        onChange={(date) => {
          setApprovingOrganization(date.target.value);
        }}
      />
    ),
    startDate: (
      <DatePicker
        value={dayjs(item.startDate, "DD/MM/YYYY")}
        onChange={(date) => {
          setStartDate(`${date?.format("DD/MM/YYYY")}`);
        }}
      />
    ),
    approvingDate: (
      <DatePicker
        value={dayjs(item.approvingDate, "DD/MM/YYYY")}
        onChange={(date) => {
          setApprovingDate(`${date?.format("DD/MM/YYYY")}`);
        }}
      />
    ),
    endDate: (
      <TextArea
        value={endDate}
        onChange={(date) => {
          setEndDate(date.target.value);
        }}
      />
    ),
    state: (
      <TextArea
        value={state}
        onChange={(date) => {
          setState(date.target.value);
        }}
      />
    ),
    status: (
      <Select
        style={{ width: "100%" }}
        value={status}
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
        value={informationAboutChanges}
        onChange={(date) => {
          setInformationAboutChanges(date.target.value);
        }}
      />
    ),
    note: (
      <TextArea
        value={note}
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
        Сохранить
      </Button>
    ),
  };
};

export { changeNDRow };
