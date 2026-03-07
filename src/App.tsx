import { Button, ConfigProvider, Flex } from "antd";
import { utils, writeFile } from "xlsx";
import { useState } from "react";
import ruRU from "antd/locale/ru_RU";
import { NDTable, UploadData, type Data } from "./components";

const App = () => {
  const [data, setData] = useState<Data>([]);

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
    <ConfigProvider locale={ruRU}>
      <Flex style={{ justifyContent: "center" }} gap={20} vertical>
        <NDTable data={data} setData={setData} />

        <UploadData setData={setData} />

        <Button onClick={exportData}>Скачать Excel файл</Button>
      </Flex>
    </ConfigProvider>
  );
};

export default App;
