import { Table, Input, Button,Tooltip,Select,Space,Dropdown,Menu} from 'antd';
import useFarmerDocument from '../../url/farmer/FarmerDocumentService';

const DocumentList=(props)=>{
    const farmerDocuments = useFarmerDocument();
    console.log('document',farmerDocuments)
    

  if (!farmerDocuments) {
    return <div>Loading...</div>;
  }
    const columns = [
        {
          title: ' Document Name',
          dataIndex: 'fileName',
          
        },
        {
          title: 'Document Type',
          dataIndex: 'Age',
          sorter: (a, b) => a.Age - b.Age,
        },
        {
          title: 'Date',
          dataIndex: 'upload_at',
        },
        {
          title: 'Document Status',
          dataIndex: 'Address',
        },
        
        
      ];
    
      const onChange = (pagination, filters, sorter) => {
        console.log('Pagination:', pagination);
        console.log('Filters:', filters);
        console.log('Sorter:', sorter);
      };
      const pageSizeOptions = ['10', '20', '50'];
    return(

      <div>
      <Table
        columns={columns}
        dataSource={farmerDocuments}
        onChange={onChange}
        

      />
        </div>
    )
}
export default DocumentList