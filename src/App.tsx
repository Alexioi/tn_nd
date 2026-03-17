import { Button, Card, ConfigProvider, Flex, Input, Tabs } from "antd";
import { utils, writeFile } from "xlsx-js-style";
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
                          const dataStyle = {
                            border: {
                              top: { style: "thin", color: { rgb: "000000" } },
                              bottom: {
                                style: "thin",
                                color: { rgb: "000000" },
                              },
                              left: { style: "thin", color: { rgb: "000000" } },
                              right: {
                                style: "thin",
                                color: { rgb: "000000" },
                              },
                            },
                          };

                          const headerStyle = {
                            fill: { fgColor: { rgb: "E0E0E0" } },
                            border: {
                              top: { style: "thin", color: { rgb: "000000" } },
                              bottom: {
                                style: "thin",
                                color: { rgb: "000000" },
                              },
                              left: { style: "thin", color: { rgb: "000000" } },
                              right: {
                                style: "thin",
                                color: { rgb: "000000" },
                              },
                            },
                          };

                          const getDataArray = (data: Data) =>
                            data.map((el) => {
                              return [
                                {
                                  v: el.designation || "",
                                  t: "s",
                                  s: dataStyle,
                                },
                                {
                                  v: el.name || "",
                                  t: "s",
                                  s: dataStyle,
                                },
                                {
                                  v: el.approvingOrganization || "",
                                  t: "s",
                                  s: dataStyle,
                                },
                                {
                                  v: el.approvingDate || "",
                                  t: "s",
                                  s: dataStyle,
                                },
                                {
                                  v: el.startDate || "",
                                  t: "s",
                                  s: dataStyle,
                                },
                                {
                                  v: el.endDate || "",
                                  t: "s",
                                  s: dataStyle,
                                },
                                {
                                  v: el.state || "",
                                  t: "s",
                                  s: dataStyle,
                                },
                                {
                                  v: el.status || "",
                                  t: "s",
                                  s: dataStyle,
                                },
                                {
                                  v: el.informationAboutChanges || "",
                                  t: "s",
                                  s: dataStyle,
                                },
                                {
                                  v: el.note || "",
                                  t: "s",
                                  s: dataStyle,
                                },
                              ];
                            });

                          const filteredData = data.filter((subEl) => {
                            if (subEl.responsible === undefined) {
                              return false;
                            }

                            if (subEl.state === "Отмененный") {
                              return false;
                            }

                            return subEl.responsible.split(", ").includes(el);
                          });

                          const filteredPAOData = [
                            [
                              {
                                v: "1. ПАО",
                                t: "s",
                                s: headerStyle,
                              },
                            ],
                            ...getDataArray(
                              filteredData.filter((el) => {
                                if (
                                  typeof el.approvingOrganization !== "string"
                                ) {
                                  return false;
                                }
                                console.log(el.approvingOrganization);

                                return el.approvingOrganization.includes("ПАО");
                              }),
                            ),
                          ];

                          const filteredOSTData = [
                            [
                              {
                                v: "2. ОСТ",
                                t: "s",
                                s: headerStyle,
                              },
                            ],
                            ...getDataArray(
                              filteredData.filter((el) => {
                                if (
                                  typeof el.approvingOrganization !== "string"
                                ) {
                                  return false;
                                }

                                return el.approvingOrganization.includes(
                                  "Приморск",
                                );
                              }),
                            ),
                          ];

                          const worksheet = utils.aoa_to_sheet([
                            ...filteredPAOData,
                            ...filteredOSTData,
                          ]);

                          worksheet["!merges"] = [
                            utils.decode_range("A1:J1"),
                            utils.decode_range(
                              `A${filteredPAOData.length + 1}:J${filteredPAOData.length + 1}`,
                            ),
                          ];

                          const workbook = utils.book_new();

                          utils.book_append_sheet(workbook, worksheet, "НД");

                          writeFile(workbook, "НД.xlsx");
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
