import { Button, Flex, Input, Typography } from "antd";
import { useState } from "react";

import { useSettings } from "../../store";

const Departaments = () => {
  const { departments, setDepartaments } = useSettings();
  const [department, setDepartment] = useState("");

  return (
    <Flex vertical gap={10} justify="center">
      {departments.map((el, i) => {
        return (
          <Flex gap={10} align="center" key={el} justify="space-between">
            <Typography.Text strong style={{ fontSize: "20px" }}>
              {el}
            </Typography.Text>

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
      <Input
        onChange={(value) => {
          setDepartment(value.target.value);
        }}
        value={department}
      />
      <Button
        type="primary"
        onClick={() => {
          setDepartaments([...departments, department]);
          setDepartment("");
        }}
        disabled={
          departments.find((el) => {
            return el === department;
          }) !== undefined || department === ""
        }
      >
        добавить
      </Button>
    </Flex>
  );
};

export { Departaments };
