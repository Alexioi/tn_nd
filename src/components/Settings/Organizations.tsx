import { Button, Flex, Input, Typography } from "antd";
import { useSettings } from "../../store";

const Organizations = () => {
  const { organizations, setOrganizations } = useSettings();

  return (
    <Flex vertical gap={10} justify="center">
      {organizations.map((el, i) => {
        return (
          <Flex gap={10} key={i}>
            <Flex gap={10}>
              <div>
                <Typography.Text>Название</Typography.Text>
                <Input
                  onChange={({ target }) => {
                    const newOrganizations = organizations.map(
                      (subEl, index) => {
                        if (i === index) {
                          return { ...subEl, name: target.value };
                        }

                        return subEl;
                      },
                    );

                    setOrganizations(newOrganizations);
                  }}
                  value={el.name}
                />
              </div>

              <div>
                <Typography.Text>Описание</Typography.Text>
                <Input
                  key={i}
                  onChange={({ target }) => {
                    const newOrganizations = organizations.map(
                      (subEl, index) => {
                        if (i === index) {
                          return { ...subEl, description: target.value };
                        }

                        return subEl;
                      },
                    );

                    setOrganizations(newOrganizations);
                  }}
                  value={el.description}
                />
              </div>
            </Flex>

            <Button
              type="primary"
              danger
              onClick={() => {
                setOrganizations(
                  organizations.filter((_, index) => {
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
          setOrganizations([...organizations, { name: "", description: "" }]);
        }}
      >
        добавить
      </Button>
    </Flex>
  );
};

export { Organizations };
