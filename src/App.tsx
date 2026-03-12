import { Button, Card, ConfigProvider, Flex, Input, Tabs } from "antd";
import { utils, writeFile } from "xlsx";
import { useState } from "react";
import ruRU from "antd/locale/ru_RU";

import "./style.css";
import { NDTable, UploadData, UploadDB, type Data } from "./components";

const App = () => {
  const [data, setData] = useState<Data>([]);
  const [departments, setDepartaments] = useState<string[]>([]);

  function exportData() {
    const worksheet = utils.aoa_to_sheet(
      data.map((el) => {
        return [
          el.designation,
          el.name,
          el.approvingOrganization,
          el.approvingDate,
          el.startDate,
          el.endDate,
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

    writeFile(workbook, "НД.ods");
  }

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
              <Flex style={{ justifyContent: "center" }} gap={20} vertical>
                <NDTable
                  data={data}
                  setData={setData}
                  departments={departments}
                />

                <UploadDB setData={setData} />

                <Button onClick={exportData}>Скачать базу данных</Button>
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
              <>
                <Card>
                  Добавление отдела
                  <Flex vertical gap={10}>
                    {departments.map((el, i) => {
                      return (
                        <Input
                          key={i}
                          onChange={(value) => {
                            const newDepartaments = departments.map(
                              (subEl, index) => {
                                if (i === index) {
                                  return value.target.value;
                                }

                                return subEl;
                              },
                            );

                            setDepartaments(newDepartaments);
                          }}
                          value={el}
                        />
                      );
                    })}
                    <Button
                      onClick={() => {
                        console.log(departments);
                        setDepartaments([...departments, ""]);
                      }}
                    >
                      добавить
                    </Button>
                  </Flex>
                </Card>
              </>
            ),
          },
        ]}
      />
    </ConfigProvider>
  );
};

export default App;
