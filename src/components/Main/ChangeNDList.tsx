import { DatePicker, Flex, Input, Modal, Select, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useState } from "react";

import { useData, useSettings, type Item } from "../../store";

type Props = {
  isOpen: boolean;
  title: string;
  item: Item;
  index?: number;
  setIsOpen(): void;
};

const ChangeNDList = ({ isOpen, item, index, title, setIsOpen }: Props) => {
  const now = dayjs();

  const { data, setData } = useData();
  const { departments, states, statuses } = useSettings();

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
  const [responsible, setResponsible] = useState(item?.responsible);
  const [dateAndNumber, setDateAndNumber] = useState(item.dateAndNumber);

  const changeData = (item: any, index?: number) => {
    if (index === undefined) {
      setData([
        ...data,
        { ...item, key: data.length + 1, number: data.length + 1 },
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
      title={title}
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
      onCancel={setIsOpen}
      okText="Применить"
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
        options={states.map((el) => {
          return {
            value: el,
            labal: el,
          };
        })}
        onSelect={(label) => {
          setState(label);
        }}
      />
      <Typography.Text>Статус НД</Typography.Text>
      <Select
        style={{ width: "100%" }}
        defaultValue={status}
        options={statuses.map((el) => {
          return {
            value: el,
            labal: el,
          };
        })}
        onSelect={(label) => {
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
        defaultValue={
          responsible !== "" && responsible !== undefined
            ? responsible.split(", ")
            : []
        }
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
