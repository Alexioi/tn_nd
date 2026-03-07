import {
  Button,
  ConfigProvider,
  Flex,
  // Upload,
} from "antd";
import { read, utils, writeFile } from "xlsx";
// import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import ruRU from "antd/locale/ru_RU";
import { NDTable } from "./components";

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
        <input
          // beforeUpload={() => false}
          type="file"
          onChange={(event) => {
            // if (!(file.status === "error" || file.status === "done")) {
            //   return;
            // }

            console.log(event.target.files?.[0]);

            if (event.target.files?.[0] === undefined) {
              return;
            }

            parseExcelFile(event.target.files?.[0]);
          }}
        />
        {/* <Button icon={<UploadOutlined />}>Загрузить</Button> */}

        <Button onClick={exportData}>📥 Скачать Excel файл</Button>

        <NDTable data={data} setData={setData} />
      </Flex>
    </ConfigProvider>
  );
}

export default App;
