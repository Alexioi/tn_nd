import { Button } from "antd";
import ExcelJS from "exceljs";
// import { readFile, utils, writeFile } from "xlsx-js-style";

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
      top: { style: "thin" as const },
      bottom: { style: "thin" as const },
      left: { style: "thin" as const },
      right: { style: "thin" as const },
    };

    const headerStyle = {
      border,
      fill: {
        type: "pattern" as const,
        pattern: "solid" as const,
        fgColor: { argb: "FFE0E0E0" },
      },
    };

    const dataStyle = {
      border,
    };

    const getDataArray = (data: any[]) =>
      data.map(
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
          return [
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
          ];
        },
      );

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

    const allData = mergeOrganizations
      .map((el) => {
        const rows = getDataArray(
          filteredData.filter((subEl) => {
            if (typeof subEl.approvingOrganization !== "string") {
              return false;
            }

            return el.names.includes(subEl.approvingOrganization);
          }),
        );

        return {
          description: el.description,
          rows,
        };
      })
      .filter((el) => el.rows.length > 0);

    try {
      // Создаем новую книгу ExcelJS и загружаем существующий файл
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(await file.arrayBuffer());

      // Получаем нужный лист (reports.sheet - это номер листа)
      const worksheet = workbook.getWorksheet(reports.sheet);

      if (!worksheet) {
        console.error("Лист не найден");
        return;
      }

      let currentRow = reports.row;

      // Добавляем данные по организациям
      allData.forEach((orgData) => {
        // Добавляем заголовок организации
        const headerRow = worksheet.getRow(currentRow);

        // Мержим ячейки для заголовка
        worksheet.mergeCells(currentRow, 1, currentRow, 10);

        // Устанавливаем значение и стиль заголовка
        const headerCell = headerRow.getCell(1);
        headerCell.value = orgData.description;
        headerCell.style = {
          ...headerStyle,
          alignment: { vertical: "middle", horizontal: "left" },
        };

        // Применяем стили ко всем ячейкам в заголовке
        for (let col = 1; col <= 10; col++) {
          const cell = headerRow.getCell(col);
          cell.style = {
            ...headerStyle,
            alignment: { vertical: "middle", horizontal: "left" },
          };
        }

        headerRow.commit();
        currentRow++;

        // Добавляем данные организации
        orgData.rows.forEach((rowData) => {
          const dataRow = worksheet.getRow(currentRow);

          rowData.forEach((value, index) => {
            const cell = dataRow.getCell(index + 1);
            cell.value = value || "";
            cell.style = {
              ...dataStyle,
              alignment: { vertical: "middle", horizontal: "left" },
            };
          });

          dataRow.commit();
          currentRow++;
        });
      });

      // Настраиваем ширину колонок (опционально)
      // worksheet.columns = worksheet.columns || [];
      // for (let i = 1; i <= 10; i++) {
      //   if (
      //     !worksheet.getColumn(i)?.width ||
      //     worksheet.getColumn(i).width < 15
      //   ) {
      //     worksheet.getColumn(i).width = 15;
      //   }
      // }

      // Генерируем файл
      const buffer = await workbook.xlsx.writeBuffer();

      // Создаем Blob и скачиваем
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "НД.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Ошибка при создании отчета:", error);
    }
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
