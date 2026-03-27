import {FixedSizeList as List} from "react-window";
interface Student{
    name:string,
    age:number,
}
interface RowProps{
    index:number,
    style:React.CSSProperties,
    data:Student[],
}
const list : Student[] = [{name:"jack",age:18},{name:"peter",age:24}];
const Row = ({index,style,data}:RowProps)=> <div style={{...style,padding:"20px"}}>{data[index].name}</div>

export default function VirtualListDemo  ()  {
    return (
        <List
        height = {200}
        width = {300}
        itemSize = {50}
        itemCount = {list.length}
        itemData = {list}
        >
            {Row}
            </List>
    )
}
