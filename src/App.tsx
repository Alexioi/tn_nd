import { Button, Card, ConfigProvider, Flex, Input, Tabs } from "antd";
import { utils, writeFile } from "xlsx";
import { useState } from "react";
import dayjs from "dayjs";
import ruRU from "antd/locale/ru_RU";

import "./style.css";
import { NDTable, UploadData, UploadDB, type Data } from "./components";

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
              <Flex style={{ justifyContent: "center" }} gap={20} vertical>
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

                <Flex gap={10}>
                  {departments.map((el, i) => {
                    return (
                      <Button
                        key={i}
                        onClick={() => {
                          const worksheet = utils.aoa_to_sheet(
                            data
                              .filter((subEl) => {
                                if (subEl.responsible === undefined) {
                                  return false;
                                }

                                return subEl.responsible
                                  .split(", ")
                                  .includes(el);
                              })
                              .map((el) => {
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
                        }}
                      >
                        {el}
                      </Button>
                    );
                  })}
                </Flex>
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
