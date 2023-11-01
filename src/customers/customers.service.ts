import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  private customers: Customer[] = [];

  create(createCustomerDto: CreateCustomerDto) {
    const customer = {
      uuid: randomUUID(),
      firstName: createCustomerDto.firstName,
      lastName: createCustomerDto.lastName,
      age: createCustomerDto.age,
      createdAt: new Date(),
    };

    this.customers.push(customer);

    return customer;
  }

  findAll() {
    return this.customers;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
