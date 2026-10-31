interface TableHeaderItem {
  title: string;
}

const tableHeaderItems: TableHeaderItem[] = [
  { title: "Run"},
  { title: "Repository"},
  { title: "Status"},
  { title: "Branch"},
  { title: "Created"},
  
];

function RunTableHeader() {
    return (
        <thead>
            <tr className="border-b border-slate-800 text-xs uppercase tracking-wider text-slate-500">
                {tableHeaderItems.map((item) => (
                    <th key={item.title} className="px-5 py-4 font-medium">{item.title}</th>    
                ))}
            </tr>
        </thead>        
    );
}
export default RunTableHeader;