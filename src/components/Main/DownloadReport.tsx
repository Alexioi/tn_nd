import { Button } from "antd";
import { read, utils, writeFile } from "xlsx-js-style";

import { useData } from "../../store";

type Props = {
  file: any;
  departament?: string;
};

const DownloadReport = ({ file, departament }: Props) => {
  const { data } = useData();

  const handleButtonClick = async () => {
    const border = {
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
    };

    const dataStyle = {
      border,
    };

    const headerStyle = {
      fill: { fgColor: { rgb: "E0E0E0" } },
      border,
    };

    const getDataArray = (data: any[]) =>
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

      if (departament === undefined) {
        return true;
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

    const workbook = read(await file.arrayBuffer(), { cellStyles: true });

    const sheetName = workbook.SheetNames[1];

    const worksheet = workbook.Sheets[sheetName];

    const allData = [...filteredPAOData, ...filteredOSTData];

    const startRow = 20;

    worksheet["!merges"] = [
      utils.decode_range(`A${startRow}:J${startRow}`),
      utils.decode_range(
        `A${startRow + filteredPAOData.length}:J${startRow + filteredPAOData.length}`,
      ),
    ];

    utils.sheet_add_aoa(worksheet, allData, { origin: `A${startRow}` });

    writeFile(workbook, "НД.xlsx");
  };

  return (
    <Button
      onClick={handleButtonClick}
      type={departament === undefined ? "primary" : "default"}
    >
      {departament === undefined ? "Все отделы" : departament}
    </Button>
  );
};

export { DownloadReport };
