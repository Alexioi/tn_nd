import { Button, DatePicker, Empty, Table } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import type { Data } from "./UploudData";

const columns = [
  {
    title: "№",
    dataIndex: "number",
    key: "number",
  },
  {
    title: "Обозначение НД",
    dataIndex: "designation",
    key: "designation",
  },
  {
    title: "Наименование НД",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Орган/оганизация утвердивший НД",
    dataIndex: "approvingOrganization",
    key: "approvingOrganization",
  },
  {
    title: "Дата утверждения",
    dataIndex: "approvingDate",
    key: "approvingDate",
  },
  {
    title: "Дата начала действия",
    dataIndex: "startDate",
    key: "startDate",
  },
  {
    title: "Дата окончания действия",
    dataIndex: "endDate",
    key: "endDate",
  },
  {
    title: "Состояние НД",
    dataIndex: "state",
    key: "state",
  },
  {
    title: "Статус НД",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Сведения об изменениях",
    dataIndex: "informationAboutChanges",
    key: "informationAboutChanges",
  },

  {
    title: "Примечание",
    dataIndex: "note",
    key: "note",
  },
  {
    title:
      "Структурное подразделение, отвественное за исполнение требований НД",
    dataIndex: "responsible",
    key: "responsible",
  },
  {
    title: "Действие",
    dataIndex: "actions",
    key: "actions",
  },
];

dayjs.locale("ru");

type Props = {
  data: Data;
  setData(data: Data): void;
};

const NDTable = ({ data, setData }: Props) => {
  const [date, setDate] = useState("");

  return (
    <>
      <Table
        virtual
        pagination={false}
        dataSource={data.map((el, i) => {
          if (el.isEdible) {
            return {
              ...el,
              startDate: (
                <DatePicker
                  defaultValue={dayjs(el.startDate, "DD/MM/YYYY")}
                  onChange={(date) => {
                    setDate(`${date?.format("DD/MM/YYYY")}`);
                  }}
                />
              ),
              actions: (
                <Button
                  type="primary"
                  onClick={() => {
                    setData(
                      data.map((el, index) => {
                        if (i === index) {
                          return {
                            ...el,
                            startDate: date,
                            isEdible: undefined,
                          };
                        }

                        return { ...el };
                      }),
                    );
                  }}
                >
                  Сохранить
                </Button>
              ),
            };
          }

          return {
            ...el,
            actions: (
              <Button
                onClick={() => {
                  setData(
                    data.map((el, index) => {
                      if (i === index) {
                        return { ...el, isEdible: true };
                      }

                      return { ...el, isEdible: undefined };
                    }),
                  );
                }}
              >
                Изменить
              </Button>
            ),
          };
        })}
        columns={columns}
        scroll={{ y: 400 }}
        style={{ width: "100%", whiteSpace: "pre-wrap" }}
        size="small"
        bordered
        locale={{
          emptyText: <Empty description="Нет данных" />,
        }}
      />
      <Button
        onClick={() => {
          setData([
            ...data,
            {
              key: data.length,
              number: data.length + 1,
              designation: "",
              name: "",
              approvingOrganization: "",
              approvingDate: "",
              startDate: "",
              endDate: "",
              state: "",
              status: "",
              informationAboutChanges: "",
              note: "",
              responsible: "",
            },
          ]);
        }}
      >
        Добавить НД
      </Button>
    </>
  );
};

export { NDTable };
