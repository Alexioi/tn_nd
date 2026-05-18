import { Input } from "antd";

const getColumns = (
  organizations: {
    name: string;
    description: string;
  }[],
  states: { name: string; color: string }[],
  statuses: string[],
) => [
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
      return String(record.name).includes(value);
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
        filters: organizations.map((el) => ({
          value: el.name,
          text: el.name,
        })),
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
          return String(record.approvingDate).includes(value);
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
          return String(record.startDate).includes(value);
        },
      },
      {
        title: "Дата окончания действия",
        dataIndex: "endDate",
        key: "endDate",
        width: 150,
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
          return String(record.endDate).includes(value);
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
      return String(record.dateAndNumber).includes(value);
    },
  },
  {
    title: "Состояние НД",
    dataIndex: "state",
    key: "state",
    width: 150,
    align: "center",
    filters: states.map((el) => ({
      value: el.name,
      text: el.name,
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
    filters: statuses.map((el) => ({
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
      return String(record.informationAboutChanges).includes(value);
    },
  },
  {
    title: "Примечание",
    dataIndex: "note",
    key: "note",
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
      return String(record.note).includes(value);
    },
  },
  {
    title:
      "Структурное подразделение, отвественное за исполнение требований НД",
    dataIndex: "responsible",
    key: "responsible",
    width: 200,
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
      if (value === "Все подразделения") {
        return record.responsible === "Все подразделения";
      }

      return String(record.responsible).includes(value);
    },
  },
];

export { getColumns };
