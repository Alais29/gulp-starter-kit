console.log('Hola');

class Cliente {
  constructor(nombre) {
    this.nombre = nombre;
  }

  mostrarCliente() {
    console.log(`Nombre: ${this.nombre}`)
  }
}

let cliente = new Cliente('Alfonsina');
cliente.mostrarCliente();