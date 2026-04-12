import { Collapse } from "antd";

import { Departaments } from "./Departaments";
import { Reports } from "./Reports";

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
      ]}
    />
  );
};

export { Settings };
