import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="agregar-container">
      <h3>Agregar producto</h3>
      
      <form (submit)="agregarProducto($event)">
        <div class="form-group">
          <input 
            type="text" 
            [(ngModel)]="nombreProducto"
            [ngModelOptions]="{standalone: true}"
            placeholder="Nombre del producto"
            required
            class="input-producto"
          />
        </div>
        
        <button type="submit" class="btn-agregar" [disabled]="!nombreProducto">
          Agregar
        </button>
      </form>
    </div>
  `,
  styles: [`
    .agregar-container {
      background-color: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
    }
    
    .form-group {
      margin-bottom: 15px;
    }
    
    .input-producto {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
    }
    
    .btn-agregar {
      background-color: #28a745;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }
    
    .btn-agregar:hover:not(:disabled) {
      background-color: #218838;
    }
    
    .btn-agregar:disabled {
      background-color: #6c757d;
      cursor: not-allowed;
    }
  `]
})
export class AgregarComponent {
  nombreProducto: string = '';
  
  @Output() productoAgregado = new EventEmitter<string>();
  
  agregarProducto(event: Event) {
    event.preventDefault();
    
    if (this.nombreProducto.trim()) {
      // Emitir el evento al componente padre
      this.productoAgregado.emit(this.nombreProducto.trim());
      
      // Limpiar el input
      this.nombreProducto = '';
    }
  }
}