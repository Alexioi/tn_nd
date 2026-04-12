import type { Item } from "../../../store";

const getColumns = (data: Item[]) => [
  {
    title: "№",
    dataIndex: "number",
    key: "number",
    fixed: true,
    width: 50,
    align: "center",
  },
  {
    title: "Обозначение НД",
    dataIndex: "designation",
    key: "designation",
    fixed: true,
    width: 250,
    align: "center",
    filterSearch: true,
    filters: data.map((el) => ({
      value: el.designation,
      text: el.designation,
    })),
    onFilter: (value: any, record: any) => {
      if (typeof record.designation !== "string") {
        return false;
      }

      return record.designation.includes(value as string);
    },
  },
  {
    title: "Наименование НД",
    dataIndex: "name",
    key: "name",
    width: 250,
    align: "center",
  },
  {
    title: "Сведения об утверждении документа",
    children: [
      {
        title: "Орган/оганизация утвердивший НД",
        dataIndex: "approvingOrganization",
        key: "approvingOrganization",
        width: 200,
        align: "center",
      },
      {
        title: "Дата утверждения",
        dataIndex: "approvingDate",
        key: "approvingDate",
        width: 150,
        align: "center",
      },
    ],
  },
  {
    title: "Дата введения и срок действия",
    children: [
      {
        title: "Дата начала действия",
        dataIndex: "startDate",
        key: "startDate",
        width: 150,
        align: "center",
      },
      {
        title: "Дата окончания действия",
        dataIndex: "endDate",
        key: "endDate",
        width: 150,
        align: "center",
      },
    ],
  },
  ,
  {
    title: "Дата, номер приказа",
    dataIndex: "dateAndNumber",
    key: "dateAndNumber",
    width: 150,
    align: "center",
  },
  {
    title: "Состояние НД",
    dataIndex: "state",
    key: "state",
    width: 150,
    align: "center",
  },
  {
    title: "Статус НД",
    dataIndex: "status",
    key: "status",
    width: 200,
    align: "center",
  },
  {
    title: "Сведения об изменениях",
    dataIndex: "informationAboutChanges",
    key: "informationAboutChanges",
    width: 250,
    align: "center",
  },
  {
    title: "Примечание",
    dataIndex: "note",
    key: "note",
    width: 250,
    align: "center",
  },
  {
    title:
      "Структурное подразделение, отвественное за исполнение требований НД",
    dataIndex: "responsible",
    key: "responsible",
    width: 200,
    align: "center",
  },
  {
    title: "Действие",
    dataIndex: "actions",
    key: "actions",
    fixed: "end",
    width: 120,
    align: "center",
  },
];

export { getColumns };
