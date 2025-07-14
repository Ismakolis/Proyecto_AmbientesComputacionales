import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Producto } from '../../models/productos';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MisProductosService } from '../../services/misProductos';
import { CategoriaService,Categoria } from '../../services/categoria.service';
//No borrar estas lienas
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-agregar-producto',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agregar-producto.component.html',
  styleUrl: './agregar-producto.component.css'
})
export class AgregarProductoComponent {
 categorias: Categoria[] = [];
  //control para visualizar la imagen
  selectedFileName: string | null = null;
  imagePreview: string | null = null;

  //control de formualrio
  productoForm: FormGroup;
  //Variable titulo
  titulo = 'Crear un Producto'
  urlImagen: string | ArrayBuffer | null = null;

  id: string | null;
  // Método que se ejecuta cuando el usuario selecciona un archivo en el input
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFileName = file.name;

      // Crea la URL para previsualizar la imagen seleccionada
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.selectedFileName = null;
      this.imagePreview = null;
    }
  }
  //contructor para el formulario
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _productoService: MisProductosService,
    private aRouter: ActivatedRoute,
   private categoriaService: CategoriaService,
   private cdr: ChangeDetectorRef
  ) {
    this.productoForm = this.fb.group({
      producto: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      oferta: [''],
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      stock: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      categoria: ['', Validators.required]
    });
    
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }


  ngOnInit(): void {
    this.esEditar();
   this.obtenerCategorias();
    //No borrar esta liena
    this.cdr.detectChanges(); 
  }

 


  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar producto';
      this._productoService.obtenerProducto(this.id).subscribe(data => {
        this.productoForm.patchValue({
          producto: data.nombre,
          oferta: data.oferta,
          descripcion: data.descripcion,
          precio: data.precio,
          stock: data.stock,
          categoria: typeof data.categoria === 'string' ? data.categoria : data.categoria._id
        });
        console.log('Categoría cargada en formulario:', this.productoForm.get('categoria')?.value);
        // Mostrar imagen actual
        this.imagePreview = 'http://localhost:4000/api/misProductos/get-imagen/' + data.imagen;
        this.selectedFileName = data.imagen;
      });
    }
  }
  

agregarProducto() {
  const PRODUCTO: Producto = {
    nombre: this.productoForm.get('producto')?.value,
    oferta: this.productoForm.get('oferta')?.value,
    descripcion: this.productoForm.get('descripcion')?.value,
    precio: this.productoForm.get('precio')?.value,
    stock: this.productoForm.get('stock')?.value,
    categoria: this.productoForm.get('categoria')?.value
  };

  const fileInput = document.getElementById('imagen') as HTMLInputElement;
  const file = fileInput?.files?.[0];

  if (this.id !== null) {
    // Actualización (con posible cambio de imagen)
    this._productoService.editarPorducto(this.id, PRODUCTO).subscribe(() => {
      if (file) {
        const formData = new FormData();
        formData.append('imagen', file);
        this._productoService.subirImagen(this.id!, formData).subscribe(() => {
          this.toastr.info('El producto y la imagen fueron actualizados con éxito', 'Producto actualizado');
          this.router.navigate(['/app/misProductos']);
        }, error => {
          console.error('Error al subir imagen', error);
        });
      } else {
        this.toastr.info('El producto fue actualizado con éxito', 'Producto actualizado');
        this.router.navigate(['/app/misProductos']);
      }
    });
  } else {
    // Creación + subida de imagen
    this._productoService.guardarProductos(PRODUCTO).subscribe(
      (data) => {
        this.toastr.success('Producto creado con éxito', 'Producto registrado');

        if (file) {
          const formData = new FormData();
          formData.append('imagen', file);
          this._productoService.subirImagen(data._id, formData).subscribe(() => {
            console.log('Imagen subida correctamente');
          }, error => console.error('Error al subir imagen', error));
        }
        this.router.navigate(['/app/misProductos']);
      },
      error => {
        console.log(error);
        this.productoForm.reset();
      }
    );
  }
}

obtenerCategorias(): void {
  this.categoriaService.obtenerCategorias().subscribe(data => {
   this.categorias = data;
    
 });
}



}