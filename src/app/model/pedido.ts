import { ProductoComprado } from "./producto-comprado";

export class Pedido {
    id: number;
    fecha: string;
    valor_total: number;
    id_usuario: number;
    productos_comprados: ProductoComprado[];
}
