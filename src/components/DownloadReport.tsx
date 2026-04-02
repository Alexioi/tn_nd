import { Button } from "antd";
import { utils, writeFile } from "xlsx-js-style";

import type { Data } from "./UploudData";

type Props = {
  departament: string;
  data: Data;
};

const DownloadReport = ({ departament, data }: Props) => {
  const handleButtonClick = () => {
    const dataStyle = {
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: {
          style: "thin",
          color: { rgb: "000000" },
        },
        left: { style: "thin", color: { rgb: "000000" } },
        right: {
          style: "thin",
          color: { rgb: "000000" },
        },
      },
    };

    const headerStyle = {
      fill: { fgColor: { rgb: "E0E0E0" } },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: {
          style: "thin",
          color: { rgb: "000000" },
        },
        left: { style: "thin", color: { rgb: "000000" } },
        right: {
          style: "thin",
          color: { rgb: "000000" },
        },
      },
    };

    const getDataArray = (data: Data) =>
      data
        .map(
          ({
            designation,
            name,
            approvingOrganization,
            approvingDate,
            startDate,
            endDate,
            state,
            status,
            informationAboutChanges,
            note,
          }) => {
            return {
              designation,
              name,
              approvingOrganization,
              approvingDate,
              startDate,
              endDate,
              state,
              status,
              informationAboutChanges,
              note,
            };
          },
        )
        .map((el) => {
          return Object.entries(el).map(([_, value]) => ({
            v: String(value || ""),
            t: "s",
            s: dataStyle,
          }));
        });

    const filteredData = data.filter((el) => {
      if (el.responsible === undefined) {
        return false;
      }

      if (el.state === "Отмененный") {
        return false;
      }

      return el.responsible.split(", ").includes(departament);
    });

    const filteredPAOData = [
      [
        {
          v: "1. ПАО",
          t: "s",
          s: headerStyle,
        },
      ],
      ...getDataArray(
        filteredData.filter((el) => {
          if (typeof el.approvingOrganization !== "string") {
            return false;
          }
          console.log(el.approvingOrganization);

          return el.approvingOrganization.includes("ПАО");
        }),
      ),
    ];

    const filteredOSTData = [
      [
        {
          v: "2. ОСТ",
          t: "s",
          s: headerStyle,
        },
      ],
      ...getDataArray(
        filteredData.filter((el) => {
          if (typeof el.approvingOrganization !== "string") {
            return false;
          }

          return el.approvingOrganization.includes("Приморск");
        }),
      ),
    ];

    const worksheet = utils.aoa_to_sheet([
      ...filteredPAOData,
      ...filteredOSTData,
    ]);

    worksheet["!merges"] = [
      utils.decode_range("A1:J1"),
      utils.decode_range(
        `A${filteredPAOData.length + 1}:J${filteredPAOData.length + 1}`,
      ),
    ];

    const workbook = utils.book_new();

    utils.book_append_sheet(workbook, worksheet, "НД");

    writeFile(workbook, "НД.xlsx");
  };

  return <Button onClick={handleButtonClick}>{departament}</Button>;
};

export { DownloadReport };
