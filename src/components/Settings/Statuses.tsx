import { Button, Card, Flex, Input, Typography } from "antd";
import { useState } from "react";

import { useSettings } from "../../store";

const Statuses = () => {
  const { statuses, setStatuses } = useSettings();
  const [status, setStatus] = useState("");

  return (
    <Flex vertical gap={10} justify="center">
      {statuses.map((el, i) => {
        return (
          <Card key={el}>
            <Flex gap={10} align="center" justify="space-between">
              <Typography.Text strong style={{ fontSize: "20px" }}>
                {el}
              </Typography.Text>

              <Button
                type="primary"
                danger
                onClick={() => {
                  setStatuses(
                    statuses.filter((_, index) => {
                      return index !== i;
                    }),
                  );
                }}
              >
                Удалить
              </Button>
            </Flex>
          </Card>
        );
      })}
      <Input
        onChange={(value) => {
          setStatus(value.target.value);
        }}
        value={status}
      />
      <Button
        type="primary"
        onClick={() => {
          setStatuses([...statuses, status]);
          setStatus("");
        }}
        disabled={
          statuses.find((el) => {
            return el === status;
          }) !== undefined || status === ""
        }
      >
        добавить
      </Button>
    </Flex>
  );
};

export { Statuses };
