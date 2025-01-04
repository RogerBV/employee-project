import 'jest'
import { afterEach, beforeEach } from 'node:test';
import * as employeeDAO from '../src/dao/EmployeeDAO'
import { getAllEmployees } from '../src/controllers/employeeController'
import { Request, Response } from 'express';

jest.mock('../src/dao/EmployeeDAO')

describe('getAllEmployees', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let jsonMock: jest.Mock;
    let statusMock: jest.Mock;

    beforeEach(() => {
        mockRequest = {} as unknown as Request;
        jsonMock = jest.fn();
        statusMock = jest.fn().mockImplementation(() => mockResponse as Response);
        mockResponse = {
            json: jsonMock,
            status: statusMock
        }
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    it('should return one or more than one employees', async () => {
        const mockData = [{ id: 1, firstName: 'Roger', lastName: 'Barriga' }];
        (employeeDAO.getAllEmployeesDAO as jest.Mock).mockResolvedValue(mockData)

        await getAllEmployees(mockRequest as Request, mockResponse as Response)

        expect(employeeDAO.getAllEmployeesDAO).toHaveBeenCalledTimes(1);
        expect(jsonMock).toHaveBeenCalledWith(mockData)
    })
})