import "./ArchiveOfRecipes.css"
import { Button, Table } from "antd";
import { DeleteOutlined } from '@ant-design/icons';
const { Column, ColumnGroup } = Table;


const renderDeleteButton = (deleteFn, rec) => {
  const handleOnClick = () => {
    deleteFn(rec.key)
  }
  return <Button shape="circle" icon={<DeleteOutlined/>} onClick={handleOnClick}/>
}
  
export default function ArchiveOfRecipes ({recipes, deleteFn}) {
    return (
        <div>
            <Table dataSource={recipes}>
              <Column title="Общий вес (гр)" dataIndex="ves" key="ves" />
              <ColumnGroup title="Какао">
                <Column title="%" dataIndex="kakaoPercent" key="kakaoPercent" />
                <Column title="Вес" dataIndex="kakaoVes" key="kakaoVes" />
              </ColumnGroup>
              <ColumnGroup title="Какао-масло">
                <Column title="%" dataIndex="masloPercent" key="masloPercent" />
                <Column title="Вес" dataIndex="masloVes" key="masloVes" />
              </ColumnGroup>
              <ColumnGroup title="Сахарная пудра">
                <Column title="%" dataIndex="pudraPercent" key="pudraPercent" />
                <Column title="Вес" dataIndex="pudraVes" key="pudraVes" />
              </ColumnGroup>
              <Column title="" key="action" render={(_, rec) => {return renderDeleteButton(deleteFn, rec)} } />
            </Table>
        </div>
    )
}     
