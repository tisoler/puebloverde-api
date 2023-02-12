import ConexionBaseDatos from './db'

export interface ProductoDB {
  id: number,
  nombre: string,
  descripcion: string,
  stock: number,
  precio: number,
  activo: boolean,
  idUnidad: number,
}

export const ObtenerProductosBD = async (soloActivos = false): Promise<ProductoDB[]> => {
  return new Promise((resolve, reject)=> {
    const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
    if (!poolConexion) return reject('No hay conexión a la base de datos')
    poolConexion.query(`SELECT * FROM producto WHERE activo = ${soloActivos}`, (error: any, elements: any)=> {
      if (error){
        console.log(error)
        return reject('Error obteniendos productos')
      }
      return resolve(elements)
    })
  })
}
