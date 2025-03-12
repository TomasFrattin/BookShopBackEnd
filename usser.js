import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createBooks() {
  const books = [
    {
      title: "Orgullo y prejuicio",
      year: 1813,
      author: "Jane Austen",
      price: 11.99,
      rate: 4.9,
      image: "https://pics.filmaffinity.com/Orgullo_y_prejuicio-197724218-large.jpg",
      stock: 40,
      genre: "Romance",
    },
    {
      title: "Moby-Dick",
      year: 1851,
      author: "Herman Melville",
      price: 13.49,
      rate: 4.3,
      image: "https://images.cdn3.buscalibre.com/fit-in/360x360/ed/c5/edc5b53333ebd87cfe6256685249673f.jpg",
      stock: 30,
      genre: "Aventura",
    },
    {
      title: "Crimen y castigo",
      year: 1866,
      author: "Fiódor Dostoyevski",
      price: 17.99,
      rate: 4.8,
      image: "https://images.cdn1.buscalibre.com/fit-in/360x360/ea/1f/ea1fc691874fa49ce341d876a981e2c1.jpg",
      stock: 55,
      genre: "Filosofía",
    },
    {
      title: "Los juegos del hambre",
      year: 2008,
      author: "Suzanne Collins",
      price: 10.99,
      rate: 4.7,
      image: "https://m.media-amazon.com/images/M/MV5BMjIwMDkwZjUtMGU0ZC00NGQ5LWJhMWUtNWZjZDFjZjU2NTZiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
      stock: 80,
      genre: "Juvenil",
    },
    {
      title: "Donde los árboles cantan",
      year: 2011,
      author: "Laura Gallego",
      price: 12.50,
      rate: 4.6,
      image: "https://http2.mlstatic.com/D_918069-MLA73716365677_122023-O.jpg",
      stock: 65,
      genre: "Fantasía",
    },
    {
      title: "El principito",
      year: 1943,
      author: "Antoine de Saint-Exupéry",
      price: 9.99,
      rate: 4.9,
      image: "https://www.editorialsaid.cl/wp-content/uploads/2024/08/El-Principito-Antoine-de-Saint-Exupery_1.jpg",
      stock: 120,
      genre: "Infantil",
    },
    {
      title: "La sombra del viento",
      year: 2001,
      author: "Carlos Ruiz Zafón",
      price: 16.99,
      rate: 4.8,
      image: "https://www.tematika.com/media/catalog/Ilhsa/Imagenes/624973.jpg",
      stock: 70,
      genre: "Misterio",
    }
  ];

  try {
    // Creamos los libros de forma simultánea
    const createdBooks = await prisma.book.createMany({
      data: books,
    });
    console.log(`${createdBooks.count} libros creados con éxito!`);
  } catch (error) {
    console.error("Error al crear los libros:", error);
  } finally {
    // Cerramos la conexión con la base de datos
    await prisma.$disconnect();
  }
}

// Llamamos a la función para crear los libros
createBooks();
