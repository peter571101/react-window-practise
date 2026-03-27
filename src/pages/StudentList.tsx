import React, { useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window";
import axios from "axios"; // 1. 导入 axios

// 定义学生接口
interface Student {
  student_id: number;
  name: string;
  password?: string;
  id_card: string;
  gender: string;
  s_class: string;
  building_number: number;
  building_name: string;
  room_number: number;
}

// 定义字段显示顺序
const DISPLAY_FIELDS: (keyof Student)[] = [
  "student_id",
  "name",
  "password",
  "id_card",
  "gender",
  "s_class",
  "building_number",
  "building_name",
  "room_number",
];

const HEADER_LABELS = [
  "ID",
  "姓名",
  "密码",
  "身份证号",
  "性别",
  "班级",
  "楼栋号",
  "楼名",
  "房号",
];

interface RowProps {
  index: number;
  style: React.CSSProperties;
  data: Student[];
}

// Row 组件
const Row = ({ index, style, data }: RowProps) => {
  const item = data[index];

  return (
    <div
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent:"center",
        borderBottom: "1px solid #eee",
        fontSize: "13px",
        backgroundColor: index % 2 === 0 ? "#fff" : "#fafafa",
      }}
    >
      {DISPLAY_FIELDS.map((field) => (
        <div
          key={field}
          style={{
            width: "120px",
            padding: "0 10px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {item[field] }
        </div>
      ))}
    </div>
  );
};

export default function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);
//   const [loading, setLoading] = useState(true);

  // 2. 使用 Axios 建立连接
  useEffect(() => {
    const fetchData = async () => {
        const response = await axios.get("http://localhost:3080/api/students");

        const remoteData = response.data.results;

          setStudents(remoteData);
    }

    fetchData();
  }, []);


  return (
    <div style={{ padding: "20px" }}>
      <h3 style={{ marginBottom: "15px" }}>
        学生管理系统  - 共 {students.length} 人
      </h3>

      <div
        style={{
          display: "flex",
          fontWeight: "bold",
          background: "#444",
          color: "#fff",
          width: "1080px",
          padding: "12px 0",
        }}
      >
        {HEADER_LABELS.map((h) => (
          <div key={h} style={{ width: "120px", padding: "0 10px" }}>
            {h}
          </div>
        ))}
      </div>

      {/* 虚拟列表 */}
      <div style={{ border: "1px solid #ccc", width: "1080px" }}>
        <List
          height={400}
          width={1080}
          itemSize={50}
          itemCount={students.length}
          itemData={students}
        >
          {Row}
        </List>
      </div>
    </div>
  );
}
