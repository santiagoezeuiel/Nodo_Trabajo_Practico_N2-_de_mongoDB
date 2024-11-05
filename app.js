const mongoose = require('mongoose');

const url1 = 'mongodb+srv://Grupo-17:grupo17@cursadanodejs.ls9ii.mongodb.net/Node-js?retryWrites=true&w=majority';

mongoose.connect(url1)
.then(() => console.log('Conectado a la base de datos'))
.catch((error) => console.error('Error al conectar a la base de datos:', error))

const superheroSchema = new mongoose.Schema({
  nombreSuperheroe: { type: String, required: true },
  nombreReal: { type: String, required: true },
  edad: { type: Number, min: 0 },
  planetaOrigen: { type: String, default: 'Desconocido' },
  debilidad: String,
  poderes: [String],
  aliados: [String],
  enemigos: [String],
  creador: String,
  createdAt: { type: Date, default: Date.now }
}, { collection: 'Grupo-17' });

const SuperHero = mongoose.model("Grupo-20", superheroSchema);

// Insertar un superheroe
async function insertSuperheroes() {
  try {
    const superheroe1 = new SuperHero({
      nombreSuperheroe: 'Superman',
      nombreReal: 'Clark Kent',
      edad: 40,
      planetaOrigen: 'Tierra',
      debilidad: 'Rayos X',
      poderes: ['Super fuerza', 'Volar', 'Sentido arácnido'],
      aliados: ['Hulk', 'Thanos'],
      enemigos: ['Lex Luthor'],
      creador: 'DC'
    });
    await superheroe1.save();
    await mongoose.connection.close();
    console.log('Superheroe insertado:', superheroe1);
  } catch (error) {
    console.error('Error al insertar el superhéroe:', error);
  }
}

// Modificar un superheroe
async function updateSuperHeroe(nombreSuperheroe) {
  const result = await SuperHero.updateOne({ nombreSuperheroe: nombreSuperheroe }, { $set: { edad: 26 } });
  console.log('Resultado de la actualización:', result);
}

// Eliminar un superheroe
async function deleteSuperHeroe(nombreSuperheroe) {
  const result = await SuperHero.deleteOne({ nombreSuperheroe: nombreSuperheroe });
  console.log('Superheroe eliminado:', result);
}

// Obtener todos los superheroes
async function getAllSuperheroes() {
  try {
    const superheroe = await SuperHero.find({ planetaOrigen: 'Tierra' });
    await mongoose.connection.close();
    console.log('Todos los superhéroes:', superheroe);
  } catch (error) {
    console.error('Error al obtener los superhéroes:', error);
  }
}

getAllSuperheroes();
//insertSuperheroes();
//updateSuperHeroe('Superman');
//deleteSuperHeroe('Superman');