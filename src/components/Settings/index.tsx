import { Button, Card, Flex, Input } from "antd";

type Props = {
  departments: string[];
  setDepartaments(departments: string[]): void;
};

const Settings = ({ departments, setDepartaments }: Props) => {
  return (
    <Flex justify="center">
      <Card>
        Добавление отдела
        <Flex vertical gap={10}>
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
            color="cyan"
            variant="solid"
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
      </Card>
    </Flex>
  );
};

export { Settings };
