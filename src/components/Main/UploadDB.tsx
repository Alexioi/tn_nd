import { Button, Upload } from "antd";
import { read, utils } from "xlsx-js-style";

import { useData, useSettings } from "../../store";

const UploadDB = () => {
  const { setData } = useData();

  const {
    setDepartaments,
    setReports,
    setOrganizations,
    setStates,
    setStatuses,
  } = useSettings();

  const parseExcelFile = async (file: File) => {
    const data = await file.arrayBuffer();

    const workbook = read(data);

    const firstSheetName = workbook.SheetNames[0];
    const firstWorksheet = workbook.Sheets[firstSheetName];

    const firstWorksheetData: any[] = utils.sheet_to_json(firstWorksheet, {
      header: 1,
    });

    setData(
      firstWorksheetData.map((el) => {
        return {
          designation: el[0],
          name: el[1],
          approvingOrganization: el[2],
          approvingDate: el[3],
          startDate: el[4],
          endDate: el[5],
          dateAndNumber: el[6],
          state: el[7],
          status: el[8],
          informationAboutChanges: el[9],
          note: el[10],
          responsible: el[11],
        };
      }),
    );

    const secondSheetName = workbook.SheetNames[1];
    const secondWorksheet = workbook.Sheets[secondSheetName];

    const secondWorksheetData: any[] = utils.sheet_to_json(secondWorksheet, {
      header: 1,
    });

    setDepartaments(JSON.parse(secondWorksheetData[0][0]));
    setOrganizations(JSON.parse(secondWorksheetData[1][0]));
    setStates(JSON.parse(secondWorksheetData[2][0]));
    setStatuses(JSON.parse(secondWorksheetData[3][0]));
    setReports(JSON.parse(secondWorksheetData[4][0]));
  };

  return (
    <Upload
      beforeUpload={(file) => {
        parseExcelFile(file);

        return false;
      }}
    >
      <Button>Загрузить базу данных</Button>
    </Upload>
  );
};

export { UploadDB };
