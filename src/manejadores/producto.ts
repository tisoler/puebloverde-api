import { ObtenerProductosBD, Producto } from '../baseDatos/producto'

export const ObtenerProductosActivos = async (): Promise<Producto[]> => {
  const productos: Producto[] = await ObtenerProductosBD(true)
  if (!productos?.length) {
    console.log(`No hay productos activos.`)
    return []
  }

  return productos
}
