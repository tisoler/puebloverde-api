import { Request, Response } from 'express'
import { ObtenerProductosActivos } from '../manejadores/producto'

export const RutaObtenerProductosActivos = async (req: Request, res: Response) => {
  try {
    const productos = await ObtenerProductosActivos()
    res.status(200).json(productos)
  } catch(e) {
    console.log(e)
    res.status(400).send(e)
  }
}
