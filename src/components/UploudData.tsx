import { Button, Card, Collapse, Flex, Upload } from "antd";
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

    const log: string[] = [];

    const changeData = data.reduce<any[]>((acc, el) => {
      const item = fileData.find((subEl) => {
        return subEl.designation === el.designation;
      });

      if (item === undefined) {
        return [...acc, el];
      }

      const logStrings = [];

      if (el.name !== item.name) {
        logStrings.push(`"Наименование НД": ${el.name} => ${item.name}`);
      }

      if (el.approvingOrganization !== item.approvingOrganization) {
        logStrings.push(
          `"Орган/оганизация утвердивший НД": ${el.approvingOrganization} => ${item.approvingOrganization}`,
        );
      }

      if (el.approvingDate !== item.approvingDate) {
        logStrings.push(
          `"Дата утверждения": ${el.approvingDate} => ${item.approvingDate}`,
        );
      }

      if (el.startDate !== item.startDate) {
        logStrings.push(
          `"Дата начала действия": ${el.startDate} => ${item.startDate}`,
        );
      }

      if (el.endDate !== item.endDate) {
        logStrings.push(
          `"Дата окончания действия": ${el.endDate} => ${item.endDate}`,
        );
      }

      if (el.state !== item.state) {
        logStrings.push(`"Состояние НД": ${el.state} => ${item.state}`);
      }

      if (el.status !== item.status) {
        logStrings.push(`"Статус НД": ${el.status} => ${item.status}`);
      }

      if (el.informationAboutChanges !== item.informationAboutChanges) {
        logStrings.push(
          `"Сведения об изменениях": ${el.informationAboutChanges} => ${item.informationAboutChanges}`,
        );
      }

      if (el.note !== item.note) {
        logStrings.push(`"Примечание": ${el.note} => ${item.note}`);
      }

      if (el.designation !== item.designation) {
        logStrings.push(
          `"Структурное подразделение, отвественное за исполнение требований НД": ${el.designation} => ${item.designation}`,
        );
      }

      if (logStrings.length !== 0) {
        log.push([`Изменен НД ${el.number}`, ...logStrings].join(" | "));
      }

      return [...acc, item];
    }, []);

    const newFileData = fileData.reduce<any[]>((acc, el) => {
      const item = data.find((subEl) => {
        return subEl.designation === el.designation;
      });

      if (item === undefined) {
        log.push(`Добавлен НД ${el.designation}`);

        return [...acc, el];
      }

      return acc;
    }, []);

    setHistory([...history, log]);

    setData(
      [...changeData, ...newFileData].map((el, i) => {
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

      <Flex gap={10} vertical>
        {history.map((el, i) => {
          return (
            <Collapse
              items={[
                {
                  key: i,
                  label: `Загрузка данный № ${i + 1}`,
                  children:
                    el.length === 0 ? (
                      "Не удалось найти новые данные"
                    ) : (
                      <Flex gap={10} vertical key={i}>
                        {el.map((subEl, i) => {
                          return (
                            <Card hoverable key={i}>
                              {subEl}
                            </Card>
                          );
                        })}
                      </Flex>
                    ),
                },
              ]}
            />
          );
        })}
      </Flex>
    </>
  );
};

export type { Data, Item };
export { UploadData };
