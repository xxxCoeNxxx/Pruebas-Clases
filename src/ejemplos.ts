
// Clases Básicas
class Persona {
    nombre: string;
    edad: number;

    constructor(nombre: string, edad: number) {
        this.nombre = nombre;
        this.edad = edad;
    }

    saludar(): string {
        return `Hola, me llamo ${this.nombre} y tengo ${this.edad} años`;
    }
}

const persona1 = new Persona("Ana", 33);
console.log(persona1.saludar());


// Métodos que modifican estado
class CuentaBancaria {
    titular: string;
    saldo: number;

    constructor(titular: string, saldo: number) {
        this.titular = titular;
        this.saldo = saldo;
    }

    ingresar(cantidad: number): void {
        this.saldo += cantidad;
    }
    retirar(cantidad: number): void {
        if(cantidad <= this.saldo) {
         this.saldo -= cantidad;
        }    
    }
    verSaldo(): string {
        return `Saldo actual: ${this.saldo} eur`;
    }
}

const cuenta = new CuentaBancaria("Jose", 100);
cuenta.ingresar(50);
cuenta.retirar(30);
console.log(cuenta.verSaldo());


// Getters y setters
class Producto {
    private _precio: number;
    descuento: number;

    constructor(precio: number, descuento: number) {
        this._precio = precio;
        this.descuento = descuento;
    }

    set precio(nuevoPrecio: number) {
        this._precio = nuevoPrecio;
    }

    get precioFinal(): number {
        return this._precio - (this._precio * this.descuento) / 100;
    }
}

const producto = new Producto(100, 20);
producto.precio = 200;
console.log(producto.precioFinal);


// Funciones flecha
class Temporizador {
    segundos: number;

    constructor(segundos: number) {
        this.segundos = segundos;
    }

    iniciar(): void {
        setTimeout(() => {
            console.log(`Han pasado ${this.segundos} segundos`);
        }, this.segundos * 1000);
    }
}

const temporizador = new Temporizador(5);
temporizador.iniciar();


// Herencia
class Empleado {
    nombre: string;
    salario: number;

    constructor(nombre: string, salario: number) {
        this.nombre = nombre;
        this.salario = salario;
    }

    calcularSalario(): number {
        return this.salario;
    }
}

class Gerente extends Empleado {
    bonus: number;

    constructor(nombre: string, salario: number, bonus: number) {
        super(nombre, salario);
        this.bonus = bonus;
    }

    calcularSalario(): number {
        return super.calcularSalario() + this.bonus;
    }
}

const emp = new Empleado("Luis", 1500);
const gerente = new Gerente("Marta", 2000, 500);

console.log(emp.calcularSalario());
console.log(gerente.calcularSalario());