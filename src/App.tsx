import { Button, Card, ConfigProvider, Flex, Tabs, Typography } from "antd";
import { utils, writeFile } from "xlsx-js-style";
import { useState } from "react";
import dayjs from "dayjs";
import ruRU from "antd/locale/ru_RU";

import "./style.css";
import {
  DownloadReport,
  NDTable,
  Settings,
  UploadData,
  UploadDB,
  type Data,
} from "./components";

const App = () => {
  const [data, setData] = useState<Data>([]);
  const [departments, setDepartaments] = useState<string[]>([]);

  const exportData = () => {
    const worksheet = utils.aoa_to_sheet(
      data.map((el) => {
        return [
          el.designation,
          el.name,
          el.approvingOrganization,
          el.approvingDate,
          el.startDate,
          el.endDate,
          el.dateAndNumber,
          el.state,
          el.status,
          el.informationAboutChanges,
          el.note,
          el.responsible,
        ];
      }),
    );

    const workbook = utils.book_new();

    utils.book_append_sheet(workbook, worksheet, "НД");

    const settings = utils.aoa_to_sheet([departments]);

    utils.book_append_sheet(workbook, settings, "Настройки");

    const now = dayjs();

    writeFile(workbook, `${now.format("YYYY-MM-DD_HH-mm")}_НД.ods`);
  };

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
            children: (
              <Flex
                style={{ justifyContent: "center" }}
                gap={20}
                vertical
                align="center"
              >
                <NDTable
                  data={data}
                  setData={setData}
                  departments={departments}
                />

                <Card>
                  <Flex gap={30} justify="center">
                    <UploadDB
                      setData={setData}
                      setDepartaments={setDepartaments}
                    />
                    <Button onClick={exportData}>Скачать базу данных</Button>
                  </Flex>
                </Card>

                <Card style={{ width: "100%", maxWidth: "800px" }}>
                  <Flex justify="center">
                    <Typography.Title level={3}>
                      Выгрузить НД по отделам
                    </Typography.Title>
                  </Flex>

                  <Flex gap={10} wrap justify="center">
                    <DownloadReport data={data} />
                    {departments.map((el, i) => {
                      return (
                        <DownloadReport key={i} departament={el} data={data} />
                      );
                    })}
                  </Flex>
                </Card>
              </Flex>
            ),
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
                <Settings
                  departments={departments}
                  setDepartaments={setDepartaments}
                />
              </Flex>
            ),
          },
        ]}
      />
    </ConfigProvider>
  );
};

export default App;
