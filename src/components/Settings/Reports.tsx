import { Flex, InputNumber, Typography } from "antd";
import { useSettings } from "../../store";

const Reports = () => {
  const { reports, setReports } = useSettings();

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

            setReports({ ...reports, sheet: value });
          }}
          value={reports.sheet}
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

            setReports({ ...reports, row: value });
          }}
          value={reports.row}
        />
      </Flex>
    </Flex>
  );
};

export { Reports };
