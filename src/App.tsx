import {
  Button,
  ConfigProvider,
  DatePicker,
  Empty,
  Flex,
  Table,
  Upload,
} from "antd";
import { read, utils, writeFile } from "xlsx";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import dayjs from "dayjs";
import ruRU from "antd/locale/ru_RU";

dayjs.locale("ru");

const columns = [
  {
    title: "№",
    dataIndex: "number",
    key: "number",
  },
  {
    title: "Обозначение НД",
    dataIndex: "designation",
    key: "designation",
  },
  {
    title: "Наименование НД",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Орган/оганизация утвердивший НД",
    dataIndex: "approvingOrganization",
    key: "approvingOrganization",
  },
  {
    title: "Дата утверждения",
    dataIndex: "approvingDate",
    key: "approvingDate",
  },
  {
    title: "Дата начала действия",
    dataIndex: "startDate",
    key: "startDate",
  },
  {
    title: "Дата окончания действия",
    dataIndex: "endDate",
    key: "endDate",
  },
  {
    title: "Состояние НД",
    dataIndex: "state",
    key: "state",
  },
  {
    title: "Статус НД",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Сведения об изменениях",
    dataIndex: "informationAboutChanges",
    key: "informationAboutChanges",
  },

  {
    title: "Примечание",
    dataIndex: "note",
    key: "note",
  },
  {
    title:
      "Структурное подразделение, отвественное за исполнение требований НД",
    dataIndex: "responsible",
    key: "responsible",
  },
  {
    title: "Действие",
    dataIndex: "actions",
    key: "actions",
  },
];

function App() {
  const [data, setData] = useState<
    {
      key: number;
      number: number;
      designation: string;
      name: string;
      approvingOrganization: string;
      approvingDate: string;
      startDate: string;
      endDate: string;
      state: string;
      status: string;
      informationAboutChanges: string;
      note: string;
      responsible: string;
      isEdible?: boolean;
    }[]
  >([]);

  const [date, setDate] = useState("");

  async function parseExcelFile(file: File) {
    const data = await file.arrayBuffer();

    const workbook = read(data);

    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];

    const x = utils
      .sheet_to_txt(worksheet)
      .split("\n")
      .map((el) => {
        return el.split("\t");
      });

    setData(
      x.map((el, i) => {
        return {
          key: i,
          number: i + 1,
          designation: el[0],
          name: el[1],
          approvingOrganization: el[2],
          approvingDate: el[3],
          startDate: el[4],
          endDate: el[5],
          state: el[6],
          status: el[7],
          informationAboutChanges: el[8],
          note: el[9],
          responsible: el[10],
        };
      }),
    );
  }

  function exportData() {
    const worksheet = utils.json_to_sheet(data);

    const workbook = utils.book_new();

    utils.book_append_sheet(workbook, worksheet, "НД");

    writeFile(workbook, "НД.ods");
  }

  return (
    <ConfigProvider locale={ruRU}>
      <Flex style={{ justifyContent: "center" }} vertical>
        <Upload
          onChange={({ file }) => {
            if (file.status !== "error") {
              return;
            }

            if (file.originFileObj === undefined) {
              return;
            }

            parseExcelFile(file.originFileObj);
          }}
        >
          <Button icon={<UploadOutlined />}>Загрузить</Button>
        </Upload>
        <Button onClick={exportData}>📥 Скачать Excel файл</Button>

        <Table
          virtual
          pagination={false}
          dataSource={data.map((el, i) => {
            if (el.isEdible) {
              return {
                ...el,
                startDate: (
                  <DatePicker
                    defaultValue={dayjs(el.startDate, "DD/MM/YYYY")}
                    onChange={(date) => {
                      setDate(`${date?.format("DD/MM/YYYY")}`);
                    }}
                  />
                ),
                actions: (
                  <Button
                    type="primary"
                    onClick={() => {
                      setData(
                        data.map((el, index) => {
                          if (i === index) {
                            return {
                              ...el,
                              startDate: date,
                              isEdible: undefined,
                            };
                          }

                          return { ...el };
                        }),
                      );
                    }}
                  >
                    Сохранить
                  </Button>
                ),
              };
            }

            return {
              ...el,
              actions: (
                <Button
                  onClick={() => {
                    setData(
                      data.map((el, index) => {
                        if (i === index) {
                          return { ...el, isEdible: true };
                        }

                        return { ...el, isEdible: undefined };
                      }),
                    );
                  }}
                >
                  Изменить
                </Button>
              ),
            };
          })}
          columns={columns}
          scroll={{ y: "130vh" }}
          style={{ width: "100%" }}
          size="small"
          bordered
          locale={{
            emptyText: <Empty description="Нет данных" />,
          }}
        />
      </Flex>
    </ConfigProvider>
  );
}

export default App;
