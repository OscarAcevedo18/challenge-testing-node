const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  // 1.- ruta GET ---Testea que la ruta GET /cafes devuelve un status code 200 y el tipo de dato recibido
  // es un arreglo con por lo menos 1 objeto.

  test("Should respond with a 200 status code", async () => {
    const response = await request(server).get("/cafes").send();
    const status = response.statusCode;
    expect(status).toBe(200);
  });

  test("Should respond an Array", async () => {
    const { body } = await request(server).get("/cafes").send();
    const cafe = body;
    expect(cafe).toBeInstanceOf(Array);
  });

  test("Should respond an Object", async () => {
    const { body } = await request(server).get("/cafes").send();
    const cafe = body;
    const result = cafe.find((element) => typeof element === "object");
    expect(result).toBeInstanceOf(Object);
  });

  // 2.- obteniendo un 404 --- Comprueba que se obtiene un código 404 al intentar eliminar un café con un id que
  // no existe.

  test("you get status 404 when trying to delete an id that does not exist", async () => {
    const jwt = "token";
    const idDeProductoAEliminar = 5;
    const coffee = await request(server)
      .delete(`/cafes/${idDeProductoAEliminar}`)
      .set("Authorization", jwt)
      .send();
    const status = coffee.statusCode;
    expect(status).toBe(404);
  });

  // 3.- Ruta POST --- Prueba que la ruta POST /cafes agrega un nuevo café y devuelve un código 201.

  test("When adding a product you must return a status 201", async () => {
    const cafe = { id: 6, nombre: "Cafe Helado" };
    const response = await request(server).post("/cafes").send(cafe);
    const status = response.statusCode;
    expect(status).toBe(201);
  });

  // 4.- Ruta PUT --- Prueba que la ruta PUT /cafes devuelve un status code 400 si intentas actualizar un
  // café enviando un id en los parámetros que sea diferente al id dentro del payload.

  test("If the id does not exist return a status 400", async () => {
    const id = 2;
    const cafe = { id, nombre: "Largo" };
    const response = await request(server).put("/cafes/1").send(cafe);
    const status = response.statusCode;
    expect(status).toBe(400);
  });
});
