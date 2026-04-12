import { Button, Flex, Input } from "antd";

import { useSettings } from "../../store";

const States = () => {
  const { states, setStates } = useSettings();

  return (
    <Flex vertical gap={10} justify="center">
      {states.map((el, i) => {
        return (
          <Flex gap={10}>
            <Input
              key={i}
              onChange={(value) => {
                const newStates = states.map((subEl, index) => {
                  if (i === index) {
                    return value.target.value;
                  }

                  return subEl;
                });

                setStates(newStates);
              }}
              value={el}
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
      <Button
        type="primary"
        onClick={() => {
          setStates([...states, ""]);
        }}
        disabled={
          states.find((el) => {
            return el === "";
          }) !== undefined
        }
      >
        добавить
      </Button>
    </Flex>
  );
};

export { States };
