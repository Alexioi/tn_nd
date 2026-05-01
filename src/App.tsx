import { ConfigProvider, Flex, Tabs } from "antd";
import ruRU from "antd/locale/ru_RU";

import { Main, Settings, UploadData } from "./components";

const App = () => {
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
            children: <UploadData />,
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
