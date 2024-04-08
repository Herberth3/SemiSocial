import mysql from 'mysql2'

// Configuración de la conexión a la base de datos
const configdb = {
  host: process.env.DB_HOST as string,
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
};       

// Crea el pool de conexiones
const mysqlPool = mysql.createPool(configdb).promise();

//ejecutar oricediminetos alamacenados
export const execute_procedure = async(proc_name:string, params:any = '') => {
  if (params) params = ` '${Object.values(params).join(`', '`)}' `

  const [rows] = await mysqlPool.query(`CALL ${proc_name}(${params});`);
  if (!Array.isArray(rows) || !(rows.length > 0)) return [];
  if (!Array.isArray(rows[0]) || !(rows[0].length > 0)) return [];

  return rows[0];//[0];
}