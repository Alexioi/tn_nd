import { Button, Empty, Flex, Table } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import dayjs from "dayjs";

import { useData } from "../../../store";
import { ChangeNDList } from "../ChangeNDList";
import { useState } from "react";
import { getColumns } from "./colums";
import { EditButton } from "./EditButton";

dayjs.locale("ru");

const NDTable = () => {
  const { data, setData } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = getColumns(data);

  return (
    <>
      <Table
        virtual
        pagination={false}
        rowClassName={(record) => {
          if (typeof record.state === "string") {
            return record.state.toLocaleLowerCase().includes("отмененный")
              ? "row-color-warning"
              : "";
          }

          return "";
        }}
        dataSource={data.map((el, i) => {
          return {
            ...el,
            actions: (
              <Flex gap={10}>
                <EditButton index={i} item={el} />
                <Button
                  type="primary"
                  danger
                  // disabled={data.find((el) => el.isEdible) !== undefined}
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
          setIsModalOpen(!isModalOpen);
        }}
      >
        Добавить НД
      </Button>
      <ChangeNDList
        isOpen={isModalOpen}
        setIsOpen={() => {
          setIsModalOpen(false);
        }}
      />
    </>
  );
};

export { NDTable };
