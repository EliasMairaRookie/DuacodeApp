import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tree, NodeModel, TreeNode } from 'react-organizational-chart'; 
import Cabecera from '../../cabecera';

// Función para crear un nodo del organigrama
const createNode = (employee) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <img src={employee.photo} alt={employee.name} style={{ width: '60px',  }} />
      <div>{employee.name}</div>
    </div>
  );
};

// Función recursiva para construir el organigrama
const buildTree = (departments) => {
  return Object.keys(departments).map((key) => {
    const department = departments[key];
    const subordinates = department.subordinates || {};
    return (
      <TreeNode key={key} label={createNode(department)}>
        {subordinates && buildTree(subordinates)}
        {department.employees && department.employees.map((employee) => (
          <TreeNode key={employee.name} label={createNode(employee)} />
        ))}
      </TreeNode>
    );
  });
};

const OrganizationChart = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/organigramaData.json'); // Asegúrate de que la ruta sea correcta
        setData(response.data);
      } catch (error) {
        console.error('Error fetching the data', error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Cargando...</div>; 
  }

  return (
    <div>
        <Cabecera></Cabecera>
    <Tree lineWidth={'2px'} lineColor={'#000'} lineHeight={'25px'}>
      <TreeNode label={createNode(data.general_director)}>
        {buildTree(data.general_director.departments)}
      </TreeNode>
    </Tree>
    </div>
  );
};

export default OrganizationChart;
