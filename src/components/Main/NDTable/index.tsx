import { Button, Empty, Table } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

import { useData } from "../../../store";
import { ChangeNDList } from "../ChangeNDList";
import { getColumns } from "./colums";
import { Menu } from "./Menu";

dayjs.locale("ru");

const NDTable = () => {
  const { data } = useData();
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
            designation: <Menu index={i} item={el} />,
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
        title="Добавить НД"
        isOpen={isModalOpen}
        setIsOpen={() => {
          setIsModalOpen(false);
        }}
        item={{
          key: 0,
          number: 0,
          designation: "",
          name: "",
          approvingOrganization: "",
          approvingDate: "",
          startDate: "",
          endDate: "",
          dateAndNumber: "",
          state: "",
          status: "",
          informationAboutChanges: "",
          note: "",
          responsible: "",
        }}
      />
    </>
  );
};

export { NDTable };
