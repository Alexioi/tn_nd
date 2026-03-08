import { Button, Card, Flex, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { read, utils } from "xlsx";
import { useState } from "react";

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
  data: Data;
  setData(data: Data): void;
};

const UploadData = ({ data, setData }: Props) => {
  const [history, setHistory] = useState<string[][]>([]);

  const parseExcelFile = async (file: File) => {
    const excelData = await file.arrayBuffer();

    const workbook = read(excelData);

    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];

    const fileData = utils
      .sheet_to_json(worksheet, { header: 1 })
      .map((el: any) => {
        return {
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
      });

    const newFileData = fileData.reduce<any>((acc, el) => {
      if (
        data.find((subEl) => {
          return subEl.designation === el.designation;
        })
      ) {
        return acc;
      }

      return [...acc, el];
    }, []);

    console.log([
      ...history,
      newFileData.map((el: any) => `Добавлен НД ${el.designation}`),
    ]);

    setHistory([
      ...history,
      newFileData.map((el: any) => `Добавлен НД ${el.designation}`),
    ]);

    setData(
      [...data, ...newFileData].map((el, i) => {
        return { ...el, key: i, number: i + 1 };
      }),
    );
  };

  return (
    <>
      <Upload
        beforeUpload={(file) => {
          parseExcelFile(file);

          return false;
        }}
      >
        <Button icon={<UploadOutlined />}>Загрузить новые данные</Button>
      </Upload>

      {history.map((el, i) => {
        return (
          <Flex gap={10} vertical key={i}>
            {el.map((subEl, i) => {
              return <Card key={i}>{subEl}</Card>;
            })}
          </Flex>
        );
      })}
    </>
  );
};

export type { Data, Item };
export { UploadData };
