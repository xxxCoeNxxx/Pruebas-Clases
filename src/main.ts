import "./style.css";

interface Reserva {
  tipoHabitacion: "standard" | "suite";
  pax: number;
  noches: number;
}

const reservas : Reserva[] = [
  { tipoHabitacion: "standard", pax: 1, noches: 3 },
  { tipoHabitacion: "standard", pax: 2, noches: 3 },
  { tipoHabitacion: "suite", pax: 2, noches: 1 },
];

const contenedorSubtotales = document.getElementById("subtotales")
const contenedorTotales = document.getElementById("totales")
const contenedorSubtotalesTour = document.getElementById("subtotalesTour")
const contenedorTotalesTour = document.getElementById("totalesTour")

class CalcularPrecio {
  reservas: Reserva[];
  iva: number;
  subtotales: number[];

  constructor(reservas: Reserva[]) {
    this.reservas = reservas;
    this.iva = 0.21;
    this.subtotales = [];
  }

  calcularSubtotal(): void {
    this.reservas.forEach((el, index) => {
      let subtotalReserva = 0;

      if (el.tipoHabitacion === "standard") {
        subtotalReserva = 100;
      } else {
        subtotalReserva = 150;
      }

      if (el.pax > 1) {
        subtotalReserva += 40*(el.pax -1);
      }

      subtotalReserva *= el.noches;

      this.subtotales.push(subtotalReserva)

      const p = document.createElement("p");
      p.textContent = `Reserva ${index +1}: ${subtotalReserva} euros sin IVA`;

      contenedorSubtotales?.appendChild(p);
    });
  }

  calcularTotal(): void {
    this.subtotales.forEach((subtotal, index) => {
      const totalConIVA = subtotal * (1 + this.iva)

      const p = document.createElement("p");
      p.textContent = `Reserva ${index +1}: ${totalConIVA.toFixed(2)} euros con IVA`;
      contenedorTotales?.appendChild(p);
    });
  }
};

class CalcularPrecioTour extends CalcularPrecio {
  descuento: number;

  constructor(reservas: Reserva[]) {
    super(reservas);
    this.descuento = 0.15;
  }

  calcularSubtotal(): void {
    this.subtotales = [];

    this.reservas.forEach((el, index) => {
      let subtotal = 100;

      if (el.pax > 1) {
        subtotal += 40*(el.pax - 1);
      }
      
      subtotal *= el.noches;
      
      subtotal *= (1 - this.descuento);
      
      this.subtotales.push(subtotal)

      const p = document.createElement("p");
      p.textContent = `Reserva Tour Operador ${index +1}: ${subtotal} euros sin IVA`;

      contenedorSubtotalesTour?.appendChild(p);
    });
  }

  calcularTotal(): void {
    this.subtotales.forEach((subtotal, index) => {
      const total = subtotal * (1 + this.iva)

      const p = document.createElement("p");
      p.textContent = `Reserva Tour Operador ${index +1}: ${total.toFixed(2)} euros con IVA`;
      contenedorTotalesTour?.appendChild(p);
    });
  }
}

const calculadora = new CalcularPrecio(reservas);
calculadora.calcularSubtotal();
calculadora.calcularTotal();

const calculadoraTour = new CalcularPrecioTour(reservas);
calculadoraTour.calcularSubtotal();
calculadoraTour.calcularTotal();