import React from "react";
import MaterialTable from "material-table";
import VisibilityIcon from '@material-ui/icons/Visibility';

export default function SearchResult({data,setUid,setDetailsReq}) {
  return (
      <MaterialTable
          title="Student List"
          columns={[
              { title: "User ID", field: "uid" },
              { title: "Name", field: "name" },
              { title: "ID", field: "id" },
              { title: "Phone", field: "phone" }]}
          data={data}
          options={{
              search: false,
              pageSize: 20,
              emptyRowsWhenPaging: false
          }}
          actions={[
              {
                  icon: () => <VisibilityIcon />,
                  tooltip: 'Open',
                  onClick: (event, row) => {
                      setUid(row.uid);
                      setDetailsReq(true);
                  }
              }
          ]}
      />
  );
}
