import { Button } from "antd";
import { readFile, utils, writeFile } from "xlsx-js-style";

import { useData, useSettings } from "../../store";

type Props = {
  file: any;
  departament?: string;
};

const DownloadReport = ({ file, departament }: Props) => {
  const { data } = useData();
  const { reports, organizations } = useSettings();

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
      if (el.state === "Отмененный") {
        return false;
      }

      if (departament === undefined) {
        return true;
      }

      if (el.responsible === undefined) {
        return false;
      }

      return el.responsible.split(", ").includes(departament);
    });

    const mergeOrganizations = organizations
      .filter((el) => el.description !== "")
      .reduce<{ names: string[]; description: string }[]>((acc, el) => {
        const id = acc.findIndex((subEl) => {
          return subEl.description.includes(el.description);
        });

        if (id !== -1) {
          return acc.map((subSubEl, i) => {
            if (id === i) {
              return {
                description: subSubEl.description,
                names: [...subSubEl.names, el.name],
              };
            }

            return subSubEl;
          });
        }

        return [...acc, { names: [el.name], description: el.description }];
      }, []);

    console.log(mergeOrganizations);

    const allData = mergeOrganizations
      .map((el) => {
        return [
          [
            {
              v: el.description,
              t: "s",
              s: headerStyle,
            },
          ],
          ...getDataArray(
            filteredData.filter((subEl) => {
              if (typeof subEl.approvingOrganization !== "string") {
                return false;
              }

              return el.names.includes(subEl.approvingOrganization);
            }),
          ),
        ];
      })
      .reduce((acc, el) => {
        return [...acc, ...el];
      }, []);

    const workbook = readFile(await file.arrayBuffer(), { cellStyles: true });

    const sheetName = workbook.SheetNames[reports.sheet - 1];

    const worksheet = workbook.Sheets[sheetName];

    worksheet["!merges"] = allData.reduce<any>((acc, el, i) => {
      if (el.length === 1) {
        return [
          ...acc,
          utils.decode_range(`A${reports.row + i}:J${reports.row + i}`),
        ];
      }

      return acc;
    }, []);

    utils.sheet_add_aoa(worksheet, allData, { origin: `A${reports.row}` });

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
