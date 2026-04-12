import { Collapse } from "antd";

import { Departaments } from "./Departaments";
import { Reports } from "./Reports";
import { States } from "./States";
import { Statuses } from "./Statuses";

const Settings = () => {
  return (
    <Collapse
      style={{ width: "100%", maxWidth: "800px" }}
      items={[
        {
          key: "1",
          label: "Добавить отдел",
          children: <Departaments />,
        },
        {
          key: "2",
          label: "Настройки отчета",
          children: <Reports />,
        },
        {
          key: "3",
          label: "Добавить орган/оганизация утвердивший НД",
          children: <Reports />,
        },
        {
          key: "4",
          label: "Добавить состояние НД",
          children: <States />,
        },
        {
          key: "5",
          label: "Добавить статус НД",
          children: <Statuses />,
        },
      ]}
    />
  );
};

export { Settings };
