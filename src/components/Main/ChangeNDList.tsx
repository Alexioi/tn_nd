import { DatePicker, Flex, Input, Modal, Select, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useState } from "react";

import type { Item } from "./UploudData";
import { useData, useSettings } from "../../store";

type Props = {
  isOpen: boolean;
  setIsOpen(): void;
  item?: Item;
  index?: number;
};

const ChangeNDList = ({ isOpen, item, index, setIsOpen }: Props) => {
  const now = dayjs();

  const { data, setData } = useData();
  const { departments } = useSettings();

  const [startDate, setStartDate] = useState(
    item === undefined ||
      item.startDate === "" ||
      item.startDate === "Invalid Date"
      ? now.format("DD.MM.YYYY")
      : item.startDate,
  );
  const [designation, setDesignation] = useState(
    item === undefined ? "" : item.designation,
  );
  const [name, setName] = useState(item === undefined ? "" : item.name);
  const [approvingOrganization, setApprovingOrganization] = useState(
    item === undefined ? "" : item.approvingOrganization,
  );
  const [approvingDate, setApprovingDate] = useState(
    item === undefined ||
      item.approvingDate === "" ||
      item.approvingDate === "Invalid Date"
      ? now.format("DD.MM.YYYY")
      : item.approvingDate,
  );
  const [endDate, setEndDate] = useState(
    item === undefined ? "" : item.endDate,
  );
  const [state, setState] = useState(item === undefined ? "" : item.state);
  const [status, setStatus] = useState(item === undefined ? "" : item.status);
  const [informationAboutChanges, setInformationAboutChanges] = useState(
    item === undefined ? "" : item.informationAboutChanges,
  );
  const [note, setNote] = useState(item === undefined ? "" : item.note);
  const [responsible, setResponsible] = useState(item?.responsible);
  const [dateAndNumber, setDateAndNumber] = useState(
    item === undefined ? "" : item.dateAndNumber,
  );

  const changeData = (item: any, index?: number) => {
    if (index === undefined) {
      setData([
        ...data,
        { key: data.length + 1, number: data.length + 1, ...item },
      ]);

      return;
    }

    setData(
      data.map((el, i) => {
        if (i === index) {
          return {
            ...item,
            isEdible: undefined,
          };
        }

        return { ...el };
      }),
    );
  };

  return (
    <Modal
      title="Modal"
      open={isOpen}
      onOk={() => {
        changeData(
          {
            ...item,
            startDate,
            designation,
            name,
            approvingOrganization,
            approvingDate,
            endDate,
            dateAndNumber,
            state,
            status,
            informationAboutChanges,
            note,
            responsible,
          },
          index,
        );
        setIsOpen();
      }}
      onCancel={() => {}}
      okText="确认"
      cancelText=""
    >
      <Typography.Text>Обозначение НД</Typography.Text>
      <TextArea
        defaultValue={designation}
        onChange={(date) => {
          setDesignation(date.target.value);
        }}
      />
      <Typography.Text>Наименование НД</Typography.Text>
      <TextArea
        defaultValue={name}
        onChange={(date) => {
          setName(date.target.value);
        }}
      />
      <Typography.Text>Орган/оганизация утвердивший НД</Typography.Text>
      <Input
        defaultValue={approvingOrganization}
        onChange={(date) => {
          setApprovingOrganization(date.target.value);
        }}
      />
      <Flex gap={10}>
        <div>
          <Typography.Text>Дата начала действия</Typography.Text>
          <DatePicker
            defaultValue={dayjs(startDate, "DD.MM.YYYY")}
            onChange={(date) => {
              setStartDate(`${date?.format("DD.MM.YYYY")}`);
            }}
            style={{ width: "100%" }}
          />
        </div>
        <div>
          <Typography.Text>Дата утверждения</Typography.Text>
          <DatePicker
            defaultValue={dayjs(approvingDate, "DD.MM.YYYY")}
            onChange={(date) => {
              console.log(`${date?.format("DD.MM.YYYY")}`);
              setApprovingDate(`${date?.format("DD.MM.YYYY")}`);
            }}
            style={{ width: "100%" }}
          />
        </div>
      </Flex>
      <Typography.Text>Дата окончания действия</Typography.Text>
      <TextArea
        defaultValue={endDate}
        onChange={(date) => {
          setEndDate(date.target.value);
        }}
      />
      <Typography.Text>Дата, номер приказа</Typography.Text>
      <TextArea
        defaultValue={dateAndNumber}
        onChange={(date) => {
          setDateAndNumber(date.target.value);
        }}
      />
      <Typography.Text>Состояние НД</Typography.Text>
      <Select
        style={{ width: "100%" }}
        defaultValue={state}
        options={[{ value: "Отмененный", label: "Отмененный" }]}
        onSelect={(_, { label }) => {
          setState(label);
        }}
      />
      <Typography.Text>Статус НД</Typography.Text>
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
      <Typography.Text>Сведения об изменениях</Typography.Text>
      <TextArea
        defaultValue={informationAboutChanges}
        onChange={(date) => {
          setInformationAboutChanges(date.target.value);
        }}
      />
      <Typography.Text>Примечание</Typography.Text>
      <TextArea
        defaultValue={note}
        onChange={(date) => {
          setNote(date.target.value);
        }}
      />
      <Typography.Text>
        Структурное подразделение, отвественное за исполнение требований НД
      </Typography.Text>
      <Select
        mode="multiple"
        size="small"
        placeholder=""
        defaultValue={responsible !== undefined ? responsible.split(", ") : []}
        onChange={(data) => {
          setResponsible(data.join(", "));
        }}
        style={{ width: "100%" }}
        options={departments.map((el) => {
          return { value: el };
        })}
      />
    </Modal>
  );
};

export { ChangeNDList };
