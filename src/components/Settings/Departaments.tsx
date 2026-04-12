import { Button, Flex, Input } from "antd";

import { useSettings } from "../../store";

const Departaments = () => {
  const { departments, setDepartaments } = useSettings();

  return (
    <Flex vertical gap={10} justify="center">
      {departments.map((el, i) => {
        return (
          <Flex gap={10}>
            <Input
              key={i}
              onChange={(value) => {
                const newDepartaments = departments.map((subEl, index) => {
                  if (i === index) {
                    return value.target.value;
                  }

                  return subEl;
                });

                setDepartaments(newDepartaments);
              }}
              value={el}
            />
            <Button
              type="primary"
              danger
              onClick={() => {
                setDepartaments(
                  departments.filter((_, index) => {
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
          setDepartaments([...departments, ""]);
        }}
        disabled={
          departments.find((el) => {
            return el === "";
          }) !== undefined
        }
      >
        добавить
      </Button>
    </Flex>
  );
};

export { Departaments };
