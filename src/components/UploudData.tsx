import { Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { read, utils } from "xlsx";

type Item = {
  key: number;
  number: number;
  designation: string;
  name: string;
  approvingOrganization: string;
  approvingDate: string;
  startDate: string;
  endDate: string;
  state: string;
  status: string;
  informationAboutChanges: string;
  note: string;
  responsible: string;
  isEdible?: boolean;
};

type Data = Item[];

type Props = {
  setData(data: Data): void;
};

const UploadData = ({ setData }: Props) => {
  const parseExcelFile = async (file: File) => {
    const data = await file.arrayBuffer();

    const workbook = read(data);

    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];

    const x: any[] = utils.sheet_to_json(worksheet, { header: 1 });

    setData(
      x.map((el, i) => {
        return {
          key: i,
          number: i + 1,
          designation: el[0],
          name: el[1],
          approvingOrganization: el[2],
          approvingDate: el[3],
          startDate: el[4],
          endDate: el[5],
          state: el[6],
          status: el[7],
          informationAboutChanges: el[8],
          note: el[9],
          responsible: el[10],
        };
      }),
    );
  };

  return (
    <Upload
      beforeUpload={(file) => {
        parseExcelFile(file);

        return false;
      }}
    >
      <Button icon={<UploadOutlined />}>Загрузить новые данные</Button>
    </Upload>
  );
};

export type { Data, Item };
export { UploadData };
