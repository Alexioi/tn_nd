import { ConfigProvider, Flex, Tabs } from "antd";
import { useState } from "react";
import ruRU from "antd/locale/ru_RU";

import "./style.css";
import { Main, Settings, UploadData, type Data } from "./components";

const App = () => {
  const [data, setData] = useState<Data>([]);

  return (
    <ConfigProvider
      locale={ruRU}
      theme={{
        components: {
          Table: {
            borderColor: "#000000",
          },
        },
      }}
    >
      <Tabs
        items={[
          {
            key: "1",
            label: "Список НД",
            children: <Main />,
          },
          {
            key: "2",
            label: "Импорт",
            children: (
              <>
                <UploadData data={data} setData={setData} />
              </>
            ),
          },
          {
            key: "3",
            label: "Настройки",
            children: (
              <Flex justify="center">
                <Settings />
              </Flex>
            ),
          },
        ]}
      />
    </ConfigProvider>
  );
};

export default App;
