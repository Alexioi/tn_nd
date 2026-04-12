import { Button, Flex, Input } from "antd";

import { useSettings } from "../../store";

const Statuses = () => {
  const { statuses, setStatuses } = useSettings();

  return (
    <Flex vertical gap={10} justify="center">
      {statuses.map((el, i) => {
        return (
          <Flex gap={10}>
            <Input
              key={i}
              onChange={(value) => {
                const newStatuses = statuses.map((subEl, index) => {
                  if (i === index) {
                    return value.target.value;
                  }

                  return subEl;
                });

                setStatuses(newStatuses);
              }}
              value={el}
            />
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
        );
      })}
      <Button
        type="primary"
        onClick={() => {
          setStatuses([...statuses, ""]);
        }}
        disabled={
          statuses.find((el) => {
            return el === "";
          }) !== undefined
        }
      >
        добавить
      </Button>
    </Flex>
  );
};

export { Statuses };
