 import app from './app';
 const request = require('supertest');


import { closeDB, connectToDatabase } from './connection';


 describe("Test Start For Tasks Routes", () => {

    beforeAll(async () => {
        await connectToDatabase(); // Establish MongoDB connection before running tests
    });

    test("It should response the all the tasks:", async () => {
      const response = await request(app).get("/tasks/");
      expect(response.statusCode).toBe(200);
    });

    test("It should response with task by id", async () => {
        const taskId = '6555a71e8030ceac7fc849d4';
        const response = await request(app).get(`/tasks/${taskId}`);
        expect(response.statusCode).toBe(200);
      });

    test('should return tasks with the specified status ID', async () => {
        const statusID = '65545e7b64922988e7f62563';
        const response = await request(app).get(`/tasks/status/${statusID}`);
        expect(response.status).toBe(200);
      });

    test('should delete tasks with the specified task ID', async () => {
        const taskId = '6555ef840131eaa76967ddec';
        const response = await request(app).delete(`/tasks/${taskId}`);
        expect(response.status).toBe(200);
      });  

     afterAll(async () => {
        await closeDB(); // Close MongoDB connection after running tests
    });

  });

  