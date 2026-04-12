import { Button, Card, Flex, Typography, Upload } from "antd";
import { useState } from "react";

import { DownloadReport } from "./DownloadReport";
import { useSettings } from "../../store";

const ReportCard = () => {
  const { departments } = useSettings();
  const [file, setFile] = useState<undefined | any>();

  return (
    <Card style={{ width: "100%", maxWidth: "800px" }}>
      <Flex justify="center">
        <Typography.Title level={3}>Выгрузить НД по отделам</Typography.Title>
      </Flex>

      {file === undefined ? (
        <Flex justify="center">
          <Upload
            beforeUpload={(file) => {
              setFile(file);

              return false;
            }}
          >
            <Button>Загрузить шаблон</Button>
          </Upload>
        </Flex>
      ) : (
        <Flex gap={10} wrap justify="center">
          <DownloadReport file={file} />
          {departments.map((el, i) => {
            return <DownloadReport key={i} departament={el} file={file} />;
          })}
        </Flex>
      )}
    </Card>
  );
};

export { ReportCard };
