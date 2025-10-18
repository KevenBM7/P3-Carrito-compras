import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgregarComponent } from '../agregar/agregar.component';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, AgregarComponent, CartComponent],
  template: `
    <div class="container">
      <h1>{{titulo}}</h1>
      
      <!-- Botón flotante del carrito -->
      <button class="carrito-btn" (click)="toggleCarrito()">
        🛒 ({{productos.length}})
      </button>
      
      <!-- Componente para agregar productos -->
      <app-agregar (productoAgregado)="onProductoAgregado($event)"></app-agregar>
      
      <!-- Mensaje de confirmación -->
      @if(mostrarMensaje) {
        <div class="mensaje-exito">
          ✅ Producto "{{ productoRecienAgregado }}" agregado
        </div>
      }
      
      <!-- Componente del carrito -->
      @if(mostrarCarrito) {
        <app-cart [productos]="productos" (cerrarCarrito)="ocultarCarrito()" (productoEliminado)="onProductoEliminado($event)"></app-cart>
      }
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
    }
    
    .carrito-btn {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: #007bff;
      color: white;
      border: none;
      font-size: 20px;
      cursor: pointer;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }
    
    .carrito-btn:hover {
      background-color: #0056b3;
    }
    
    .mensaje-exito {
      background-color: #d4edda;
      color: #155724;
      padding: 10px;
      margin: 10px 0;
      border-radius: 4px;
      border: 1px solid #c3e6cb;
    }
  `]
})
export class HomeComponent {
  titulo: string = "Carrito de Compras";
  productos: Array<string> = [];
  mostrarMensaje: boolean = false;
  mostrarCarrito: boolean = false;
  productoRecienAgregado: string = '';
  
  onProductoAgregado(nombreProducto: string) {
    this.productos.push(nombreProducto);
    this.productoRecienAgregado = nombreProducto;
    this.mostrarMensaje = true;
    
    // Ocultar mensaje después de 2 segundos
    setTimeout(() => {
      this.mostrarMensaje = false;
    }, 2000);
  }
  
  toggleCarrito() {
    this.mostrarCarrito = !this.mostrarCarrito;
  }
  
  ocultarCarrito() {
    this.mostrarCarrito = false;
  }

  onProductoEliminado(index: number) {
    this.productos.splice(index, 1);
  }
}