import { Button, ConfigProvider, Flex } from "antd";
import { utils, writeFile } from "xlsx";
import { useState } from "react";
import ruRU from "antd/locale/ru_RU";
import { NDTable, UploadData, type Data } from "./components";

const App = () => {
  const [data, setData] = useState<Data>([]);

  function exportData() {
    const worksheet = utils.json_to_sheet(data);

    const workbook = utils.book_new();

    utils.book_append_sheet(workbook, worksheet, "НД");

    writeFile(workbook, "НД.ods");
  }

  return (
    <ConfigProvider locale={ruRU}>
      <NDTable data={data} setData={setData} />

      <Flex style={{ justifyContent: "center" }} vertical>
        <UploadData setData={setData} />

        <Button onClick={exportData}>Скачать Excel файл</Button>
      </Flex>
    </ConfigProvider>
  );
};

export default App;
