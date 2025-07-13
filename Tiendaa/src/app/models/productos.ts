import { Categoria } from "../services/categoria.service"; 


export class Producto {
  _id?: string;
  nombre: string;
  oferta: number;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: Categoria;   
  imagen?: string;

  constructor(
    nombre: string,
    oferta: number,
    descripcion: string,
    precio: number,
    stock: number,
    categoria: Categoria,  
    imagen?: string
  ) {
    this.nombre = nombre;
    this.oferta = oferta;
    this.descripcion = descripcion;
    this.precio = precio;
    this.stock = stock;
    this.categoria = categoria;
    this.imagen = imagen;
  }
}
