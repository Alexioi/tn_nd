import { Button, ColorPicker, Flex, Input, Typography } from "antd";
import { useState } from "react";

import { useSettings } from "../../store";

const States = () => {
  const { states, setStates } = useSettings();
  const [state, setState] = useState("");

  return (
    <Flex vertical gap={10} justify="center">
      {states.map((el, i) => {
        return (
          <Flex gap={10} align="center" key={el.name} justify="space-between">
            <Typography.Text strong style={{ fontSize: "20px" }}>
              {el.name}
            </Typography.Text>
            <ColorPicker
              value={el.color}
              onChange={(_, css) => {
                setStates(
                  states.map((subEl, subI) => {
                    if (subI === i) {
                      return { ...subEl, color: css };
                    }

                    return subEl;
                  }),
                );
              }}
            />

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
          setState(value.target.value);
        }}
        value={state}
      />
      <Button
        type="primary"
        onClick={() => {
          setStates([...states, { name: state, color: "#FFFFFF" }]);
          setState("");
        }}
        disabled={
          states.find((el) => {
            return el.name === state;
          }) !== undefined || state === ""
        }
      >
        добавить
      </Button>
    </Flex>
  );
};

export { States };
