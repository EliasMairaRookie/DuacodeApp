import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tree, TreeNode } from 'react-organizational-chart';
import Cabecera from '../../cabecera';
import MenuEmpleados from '../menuEmpleados.js';
import WithLoader from '../../WithLoader.js';

// Componente para mostrar cada miembro del equipo
const MemberCard = ({ member }) => (
  <div style={{
    textAlign: 'center',
    padding: '2%',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.2s',
  }}>

    <div style={{
      fontWeight: 'bold',
      fontSize: '16px',
      color: '#DF1882',
    }}>{member.name}</div>
    <div style={{
      fontStyle: 'italic',
      fontSize: '14px',
      color: '#555',
    }}>{member.position}</div>
  </div>
);

// Componente recursivo para construir el organigrama
const renderEmployees = (employees) => {
  return employees.map((employee, index) => (
    <TreeNode key={index} label={<MemberCard member={employee} />} />
  ));
};

const renderSubordinates = (subordinates) => {
  return Object.entries(subordinates).map(([key, subordinate]) => (
    <TreeNode key={key} label={<MemberCard member={subordinate} />} >
      {subordinate.subordinates && renderSubordinates(subordinate.subordinates)}
      {subordinate.employees && renderEmployees(subordinate.employees)}
      {subordinate.technicians && renderEmployees(subordinate.technicians)}
      {subordinate.developers && renderEmployees(subordinate.developers)}
    </TreeNode>
  ));
};

const Organigrama = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/organigramaData.json');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching the data', error);
      } finally {
        setIsLoading(false); // Cambiar el estado de carga cuando los datos estén listos
      }
    };

    fetchData();
  }, []);

  return (
    <WithLoader isLoading={isLoading}>
      <div>
        <Cabecera activePage="empleados" />
        <MenuEmpleados />
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {/* Agregar clase 'fade-in' cuando los datos estén disponibles */}
          {data && (
            <div className={isLoading ? '' : 'fade-in'}>
              <Tree
                lineWidth={'2px'}
                lineColor={'#000'}
                lineBorderRadius={'10px'}
                label={
                  <div style={{ width: '25%', margin: '0 auto' }}>
                    <MemberCard member={data.general_director} />
                  </div>
                }
              >
                {data.general_director.departments && Object.entries(data.general_director.departments).map(([key, department]) => (
                  <TreeNode key={key} label={<MemberCard member={department} />}>
                    {department.subordinates && renderSubordinates(department.subordinates)}
                  </TreeNode>
                ))}
              </Tree>
            </div>
          )}
        </div>
      </div>
    </WithLoader>
  );
};

export default Organigrama;
