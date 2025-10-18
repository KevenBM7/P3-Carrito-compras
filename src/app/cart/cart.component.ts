import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cart-overlay">
      <div class="cart-container">
        <button class="btn-cerrar" (click)="cerrar()">X</button>
        <h3>🛒 Carrito de Compras</h3>
        
        @if (productos.length === 0) {
          <p class="carrito-vacio">El carrito está vacío.</p>
        } @else {
          <ul>
            @for (producto of productos; track producto; let i = $index) {
              <li>
                <span>{{ producto }}</span>
                <button class="btn-eliminar" (click)="eliminar(i)">X</button>
              </li>
            }
          </ul>
        }
      </div>
    </div>
  `,
  styles: [`
    .cart-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .cart-container {
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      width: 90%;
      max-width: 400px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.3);
      position: relative;
    }
    .btn-cerrar {
      position: absolute;
      top: 10px;
      right: 10px;
      background: transparent;
      border: none;
      font-size: 20px;
      cursor: pointer;
    }
    .carrito-vacio {
      color: #6c757d;
      text-align: center;
      margin-top: 20px;
    }
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      padding: 8px 0;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .btn-eliminar {
      background-color: #dc3545;
      color: white;
      border: none;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      cursor: pointer;
      font-weight: bold;
      line-height: 24px;
      text-align: center;
    }
  `]
})
export class CartComponent {
  @Input() productos: string[] = [];
  @Output() cerrarCarrito = new EventEmitter<void>();
  @Output() productoEliminado = new EventEmitter<number>();

  cerrar() {
    this.cerrarCarrito.emit();
  }

  eliminar(index: number) {
    this.productoEliminado.emit(index);
  }
}