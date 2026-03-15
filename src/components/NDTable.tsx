import { Button, Empty, Flex, Table } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import dayjs from "dayjs";

import type { Data, Item } from "./UploudData";
import { changeNDRow } from "./changeNDRow";
import { useMemo } from "react";

dayjs.locale("ru");

type Props = {
  data: Data;
  departments: string[];
  setData(data: Data): void;
};

const NDTable = ({ data, departments, setData }: Props) => {
  const filters = useMemo(() => {
    return data.map((el) => ({
      value: el.designation,
      text: el.designation,
    }));
  }, [data]);

  const columns = [
    {
      title: "№",
      dataIndex: "number",
      key: "number",
      fixed: true,
      width: 50,
      align: "center",
    },
    {
      title: "Обозначение НД",
      dataIndex: "designation",
      key: "designation",
      fixed: true,
      width: 250,
      align: "center",
      filterSearch: true,
      filters,
      onFilter: (value: any, record: any) => {
        if (typeof record.designation !== "string") {
          return false;
        }

        return record.designation.includes(value as string);
      },
    },
    {
      title: "Наименование НД",
      dataIndex: "name",
      key: "name",
      width: 250,
      align: "center",
    },
    {
      title: "Сведения об утверждении документа",
      children: [
        {
          title: "Орган/оганизация утвердивший НД",
          dataIndex: "approvingOrganization",
          key: "approvingOrganization",
          width: 200,
          align: "center",
        },
        {
          title: "Дата утверждения",
          dataIndex: "approvingDate",
          key: "approvingDate",
          width: 150,
          align: "center",
        },
      ],
    },
    {
      title: "Дата введения и срок действия",
      children: [
        {
          title: "Дата начала действия",
          dataIndex: "startDate",
          key: "startDate",
          width: 150,
          align: "center",
        },
        {
          title: "Дата окончания действия",
          dataIndex: "endDate",
          key: "endDate",
          width: 150,
          align: "center",
        },
      ],
    },
    ,
    {
      title: "Состояние НД",
      dataIndex: "state",
      key: "state",
      width: 150,
      align: "center",
    },
    {
      title: "Статус НД",
      dataIndex: "status",
      key: "status",
      width: 200,
      align: "center",
    },
    {
      title: "Сведения об изменениях",
      dataIndex: "informationAboutChanges",
      key: "informationAboutChanges",
      width: 250,
      align: "center",
    },
    {
      title: "Примечание",
      dataIndex: "note",
      key: "note",
      width: 250,
      align: "center",
    },
    {
      title:
        "Структурное подразделение, отвественное за исполнение требований НД",
      dataIndex: "responsible",
      key: "responsible",
      width: 200,
      align: "center",
    },
    {
      title: "Действие",
      dataIndex: "actions",
      key: "actions",
      fixed: "end",
      width: 120,
      align: "center",
    },
  ];

  const changeData = (index: number, item: Item) => {
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
    <>
      <Table
        virtual
        pagination={false}
        rowClassName={(record) => {
          if (typeof record.note === "string") {
            return record.note.toLocaleLowerCase().includes("отменено")
              ? "row-color-warning"
              : "";
          }

          return "";
        }}
        dataSource={data.map((el, i) => {
          if (el.isEdible) {
            return changeNDRow({ item: el, index: i, departments, changeData });
          }

          return {
            ...el,
            actions: (
              <Flex gap={10}>
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
                  disabled={data.find((el) => el.isEdible) !== undefined}
                  type="primary"
                >
                  <EditFilled />
                </Button>
                <Button
                  type="primary"
                  danger
                  disabled={data.find((el) => el.isEdible) !== undefined}
                  onClick={() => {
                    setData(
                      data
                        .filter((_, index) => {
                          return i !== index;
                        })
                        .map((el, index) => {
                          return { ...el, number: index + 1 };
                        }),
                    );
                  }}
                >
                  <DeleteFilled />
                </Button>
              </Flex>
            ),
          };
        })}
        // @ts-ignore
        columns={columns}
        scroll={{ x: 2000, y: 400 }}
        style={{ width: "100%", whiteSpace: "pre-wrap" }}
        size="small"
        bordered
        locale={{
          emptyText: <Empty description="Нет данных" />,
        }}
      />
      <Button
        type="primary"
        onClick={() => {
          setData([
            ...data,
            {
              key: data.length,
              number: data.length + 1,
              designation: "Новый НД",
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
