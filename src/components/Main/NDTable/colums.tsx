import { Input } from "antd";
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
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }: any) => (
      <Input.Search
        value={selectedKeys[0]}
        onChange={(e) => {
          const val = e.target.value;

          setSelectedKeys(val ? [val] : []);
        }}
        onSearch={() => confirm()}
      />
    ),
    onFilter: (value: any, record: any) => {
      return String(record.designation.props.item.designation).includes(value);
    },
  },
  {
    title: "Наименование НД",
    dataIndex: "name",
    key: "name",
    width: 250,
    align: "center",
    filterSearch: true,
    filters: [...new Set(data.map((el) => el.name))].map((el) => ({
      value: el,
      text: el,
    })),
    onFilter: (value: any, record: any) => {
      return record.name === value;
    },
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
        filterSearch: true,
        filters: [...new Set(data.map((el) => el.approvingOrganization))].map(
          (el) => ({
            value: el,
            text: el,
          }),
        ),
        onFilter: (value: any, record: any) => {
          return record.approvingOrganization === value;
        },
      },
      {
        title: "Дата утверждения",
        dataIndex: "approvingDate",
        key: "approvingDate",
        width: 150,
        align: "center",
        filterSearch: true,
        filters: [...new Set(data.map((el) => el.approvingDate))].map((el) => ({
          value: el,
          text: el,
        })),
        onFilter: (value: any, record: any) => {
          return record.approvingDate === value;
        },
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
        filterSearch: true,
        filters: [...new Set(data.map((el) => el.startDate))].map((el) => ({
          value: el,
          text: el,
        })),
        onFilter: (value: any, record: any) => {
          return record.startDate === value;
        },
      },
      {
        title: "Дата окончания действия",
        dataIndex: "endDate",
        key: "endDate",
        width: 150,
        align: "center",
        filterSearch: true,
        filters: [...new Set(data.map((el) => el.endDate))].map((el) => ({
          value: el,
          text: el,
        })),
        onFilter: (value: any, record: any) => {
          return record.endDate === value;
        },
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
    filterSearch: true,
    filters: [...new Set(data.map((el) => el.dateAndNumber))].map((el) => ({
      value: el,
      text: el,
    })),
    onFilter: (value: any, record: any) => {
      return record.dateAndNumber === value;
    },
  },
  {
    title: "Состояние НД",
    dataIndex: "state",
    key: "state",
    width: 150,
    align: "center",
    filterSearch: true,
    filters: [...new Set(data.map((el) => el.state))].map((el) => ({
      value: el,
      text: el,
    })),
    onFilter: (value: any, record: any) => {
      return record.state === value;
    },
  },
  {
    title: "Статус НД",
    dataIndex: "status",
    key: "status",
    width: 200,
    align: "center",
    filterSearch: true,
    filters: [...new Set(data.map((el) => el.status))].map((el) => ({
      value: el,
      text: el,
    })),
    onFilter: (value: any, record: any) => {
      return record.status === value;
    },
  },
  {
    title: "Сведения об изменениях",
    dataIndex: "informationAboutChanges",
    key: "informationAboutChanges",
    width: 250,
    align: "center",
    filterSearch: true,
    filters: [...new Set(data.map((el) => el.informationAboutChanges))].map(
      (el) => ({
        value: el,
        text: el,
      }),
    ),
    onFilter: (value: any, record: any) => {
      return record.informationAboutChanges === value;
    },
  },
  {
    title: "Примечание",
    dataIndex: "note",
    key: "note",
    width: 250,
    align: "center",
    filterSearch: true,
    filters: [...new Set(data.map((el) => el.note))].map((el) => ({
      value: el,
      text: el,
    })),
    onFilter: (value: any, record: any) => {
      return record.note === value;
    },
  },
  {
    title:
      "Структурное подразделение, отвественное за исполнение требований НД",
    dataIndex: "responsible",
    key: "responsible",
    width: 200,
    align: "center",
    // filterSearch: true,
    // filters: [...new Set(data.map((el) => el.responsible))].map((el) => ({
    //   value: el,
    //   text: el,
    // })),
    // onFilter: (value: any, record: any) => {
    //   return record.responsible.include(value);
    // },
  },
];

export { getColumns };
