import { Button, Flex, Input, Typography } from "antd";
import { useState } from "react";

import { useSettings } from "../../store";

const States = () => {
  const { states, setStates } = useSettings();
  const [status, setStatus] = useState("");

  return (
    <Flex vertical gap={10} justify="center">
      {states.map((el, i) => {
        return (
          <Flex gap={10} align="center" key={el} justify="space-between">
            <Typography.Text strong style={{ fontSize: "20px" }}>
              {el}
            </Typography.Text>

            <Button
              type="primary"
              danger
              onClick={() => {
                setStates(
                  states.filter((_, index) => {
                    return index !== i;
                  }),
                );
              }}
            >
              Удалить
            </Button>
          </Flex>
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
          setStates([...states, status]);
          setStatus("");
        }}
        disabled={
          states.find((el) => {
            return el === status;
          }) !== undefined || status === ""
        }
      >
        добавить
      </Button>
    </Flex>
  );
};

export { States };
