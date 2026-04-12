import { Flex, InputNumber, Typography } from "antd";
import { useSettings } from "../../store";

const Report = () => {
  const { report, setReport } = useSettings();

  return (
    <Flex gap={10} vertical>
      <Flex vertical>
        <Typography.Text>Номер листа</Typography.Text>
        <InputNumber
          style={{ width: "100%" }}
          onChange={(value) => {
            if (value === null) {
              return;
            }

            setReport({ ...report, sheet: value });
          }}
          value={report.sheet}
        />
      </Flex>

      <Flex vertical>
        <Typography.Text>Номер строки</Typography.Text>
        <InputNumber
          style={{ width: "100%" }}
          onChange={(value) => {
            if (value === null) {
              return;
            }

            setReport({ ...report, row: value });
          }}
          value={report.row}
        />
      </Flex>
    </Flex>
  );
};

export { Report };
