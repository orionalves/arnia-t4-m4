import { Injectable, NotFoundException } from '@nestjs/common';
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

  findAll(age: number) {
    let filteredCustomers = [...this.customers];

    if (age) {
      filteredCustomers = filteredCustomers.filter(
        (customer) => customer.age === age,
      );
    }

    return filteredCustomers;
  }

  findOne(uuid: string) {
    const customer = this.customers.find((cust) => cust.uuid === uuid);

    return customer;
  }

  update(uuid: string, updateCustomerDto: UpdateCustomerDto) {
    this.customers.forEach((customer) => {
      if (customer.uuid === uuid) {
        Object.assign(customer, updateCustomerDto);
      }
    });
  }

  remove(uuid: string) {
    const customerIndex = this.customers.findIndex(
      (customer) => customer.uuid === uuid,
    );

    if (customerIndex === -1) {
      throw new NotFoundException('Não encontrado');
    }

    this.customers.splice(customerIndex, 1);
  }
}
