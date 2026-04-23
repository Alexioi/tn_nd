import { Empty, Table } from "antd";
import dayjs from "dayjs";

import { useData, useSettings } from "../../../store";
import { getColumns } from "./colums";
import { Menu } from "./Menu";

dayjs.locale("ru");

const NDTable = () => {
  const { data } = useData();
  const { organizations, states, statuses } = useSettings();

  const columns = getColumns(data, organizations, states, statuses);

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
            responsible:
              el.responsible === "" ? "Все подразделения" : el.responsible,
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
    </>
  );
};

export { NDTable };
