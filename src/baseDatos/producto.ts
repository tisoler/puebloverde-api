import ConexionBaseDatos from './db'

export interface ProductoDB {
  id: number,
  nombre: string,
  descripcion: string,
  stock: number,
  precio: number,
  activo: boolean,
  idUnidad: number,

	idSubProd: number,
  nombreSubProd: string,
  descripcionSubProd: string,
  stockSubProd: number,
  precioSubProd: number,
  activoSubProd: boolean,
  idUnidadSubProd: number,
}

export interface Producto {
  id: number,
  nombre: string,
  descripcion: string,
  stock: number,
  precio: number,
  activo: boolean,
  idUnidad: number,
	subproductos?: Producto[],
}

export const ObtenerProductosBD = async (soloActivos = false): Promise<Producto[]> => {
  return new Promise((resolve, reject)=> {
    const poolConexion = ConexionBaseDatos.obtenerPoolConexion()
    if (!poolConexion) return reject('No hay conexión a la base de datos')
    poolConexion.query(`
			SELECT
				p.*,
				psp.id as idSubProd,
				psp.nombre as nombreSubProd,
				psp.descripcion as descripcionSubProd,
				psp.stock as stockSubProd,
				psp.precio as precioSubProd,
				psp.activo as activoSubProd,
				psp.idUnidad as idUnidadSubProd
			FROM producto as p
			LEFT JOIN subproducto as sp ON sp.idProductoPadre = p.id
			LEFT jOIN producto as psp ON psp.id = sp.idProducto
			WHERE p.activo = ${soloActivos}
		`, (error: any, productos: any)=> {
      if (error){
        console.log(error)
        return reject('Error obteniendos productos')
      }

			const productosResp: Producto[] = []

			productos.forEach((producto: ProductoDB) => {
				let productoSeleccionado = productosResp.find(prodRes => prodRes.id === producto.id)

				if (!productoSeleccionado) {
					productoSeleccionado = {
						id: producto.id,
						nombre: producto.nombre,
						descripcion: producto.descripcion,
						stock: producto.stock,
						precio: producto.precio,
						activo: producto.activo,
						idUnidad: producto.idUnidad,
					}

					productosResp.push(productoSeleccionado)
				}

				if (producto.idSubProd) {
					const subproducto = {
						id: producto.idSubProd,
						nombre: producto.nombreSubProd,
						descripcion: producto.descripcionSubProd,
						stock: producto.stockSubProd,
						precio: producto.precioSubProd,
						activo: producto.activoSubProd,
						idUnidad: producto.idUnidadSubProd,
					}

					if (productoSeleccionado.subproductos?.length) productoSeleccionado.subproductos.push(subproducto)
					else productoSeleccionado.subproductos = [subproducto]
				}
			})

			return resolve(productosResp)
    })
  })
}
