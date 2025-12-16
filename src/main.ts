
interface Reserva {
  tipoHabitacion: "standard" | "suite";
  pax: number;
  noches: number;
}

const reservas : Reserva[] = [
  {
    tipoHabitacion: "standard",
    pax: 1,
    noches: 3,
  },
  {
    tipoHabitacion: "standard",
    pax: 2,
    noches: 3,
  },
  {
    tipoHabitacion: "suite",
    pax: 2,
    noches: 1,
  },
];

const contenedorSubtotales = document.getElementById("subtotales")
const contenedorTotales = document.getElementById("totales")

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

const calculadora = new CalcularPrecio(reservas);
calculadora.calcularSubtotal();
calculadora.calcularTotal();