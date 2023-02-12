import { ObtenerProductosBD, ProductoDB } from '../baseDatos/producto'

export const ObtenerProductosActivos = async (): Promise<ProductoDB[]> => {
  const equipos: ProductoDB[] = await ObtenerProductosBD(true)
  if (!equipos?.length) {
    console.log(`No hay productos activos.`)
    return []
  }

  return equipos
}
