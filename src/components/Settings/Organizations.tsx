import { Button, Flex, Input, Typography } from "antd";
import { useSettings } from "../../store";
import { useState } from "react";

const Organizations = () => {
  const { organizations, setOrganizations } = useSettings();
  const [organization, setOrganization] = useState("");

  return (
    <Flex vertical gap={10} justify="center">
      {organizations.map((el, i) => {
        return (
          <Flex gap={10} key={el.name}>
            <Typography.Text strong style={{ fontSize: "20px" }}>
              {el.name}
            </Typography.Text>

            <Typography.Text>Описание</Typography.Text>
            <Input
              key={i}
              onChange={({ target }) => {
                const newOrganizations = organizations.map((subEl, index) => {
                  if (i === index) {
                    return { ...subEl, description: target.value };
                  }

                  return subEl;
                });

                setOrganizations(newOrganizations);
              }}
              value={el.description}
            />

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
      <Input
        onChange={(value) => {
          setOrganization(value.target.value);
        }}
        value={organization}
      />
      <Button
        type="primary"
        onClick={() => {
          setOrganizations([
            ...organizations,
            { name: organization, description: "" },
          ]);
          setOrganization("");
        }}
        disabled={
          organizations.find((el) => {
            return el.name === organization;
          }) !== undefined || organization === ""
        }
      >
        добавить
      </Button>
    </Flex>
  );
};

export { Organizations };
