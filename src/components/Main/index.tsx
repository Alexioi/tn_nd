import { Button, Flex } from "antd";
import dayjs from "dayjs";
import { utils, writeFile } from "xlsx-js-style";
import { useState } from "react";

import { useSettings, useData } from "../../store";
import { NDTable } from "./NDTable";
import { UploadDB } from "./UploadDB";
import { ChangeNDList } from "./ChangeNDList";
import { ReportCard } from "./ReportCard";

const Main = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { departments, organizations, states, statuses, reports } =
    useSettings();
  const { data } = useData();

  const exportData = () => {
    const worksheet = utils.aoa_to_sheet(
      data.map((el) => {
        return [
          el.designation,
          el.name,
          el.approvingOrganization,
          el.approvingDate,
          el.startDate,
          el.endDate,
          el.dateAndNumber,
          el.state,
          el.status,
          el.informationAboutChanges,
          el.note,
          el.responsible,
        ];
      }),
    );

    const workbook = utils.book_new();

    utils.book_append_sheet(workbook, worksheet, "НД");

    const settings = utils.aoa_to_sheet([
      [JSON.stringify(departments)],
      [JSON.stringify(organizations)],
      [JSON.stringify(states)],
      [JSON.stringify(statuses)],
      [JSON.stringify(reports)],
    ]);

    utils.book_append_sheet(workbook, settings, "Настройки");

    const now = dayjs();

    writeFile(workbook, `${now.format("YYYY-MM-DD_HH-mm")}_НД.ods`);
  };

  return (
    <Flex style={{ justifyContent: "center" }} gap={20} vertical align="center">
      <Flex justify="end" style={{ width: "100%" }} gap={20}>
        {data.length === 0 ? (
          <UploadDB />
        ) : (
          <Button onClick={exportData}>Скачать базу данных</Button>
        )}

        <Button
          type="primary"
          onClick={() => {
            setIsModalOpen(!isModalOpen);
          }}
        >
          Добавить НД
        </Button>
      </Flex>

      <ChangeNDList
        title="Добавить НД"
        isOpen={isModalOpen}
        setIsOpen={() => {
          setIsModalOpen(false);
        }}
        item={{
          key: 0,
          number: 0,
          designation: "",
          name: "",
          approvingOrganization: "",
          approvingDate: "",
          startDate: "",
          endDate: "",
          dateAndNumber: "",
          state: "",
          status: "",
          informationAboutChanges: "",
          note: "",
          responsible: "",
        }}
      />

      <NDTable />

      <ReportCard />
    </Flex>
  );
};

export { Main };
