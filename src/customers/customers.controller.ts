import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CreateCustomerDocs } from './docs/create-customer.docs';
import { Customer } from './entities/customer.entity';
@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @ApiBody({
    type: CreateCustomerDocs,
  })
  @ApiResponse({
    type: Customer,
  })
  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @ApiResponse({
    type: Customer,
    isArray: true,
  })
  @Get()
  findAll(@Query('age') age?: string) {
    return this.customersService.findAll(+age);
  }

  @ApiResponse({
    type: Customer,
  })
  @Get(':id')
  findOne(@Param('id') uuid: string) {
    return this.customersService.findOne(uuid);
  }

  @ApiBody({
    type: CreateCustomerDocs,
  })
  @ApiResponse({
    type: Customer,
  })
  @Patch(':id')
  update(
    @Param('id') uuid: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(uuid, updateCustomerDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') uuid: string) {
    return this.customersService.remove(uuid);
  }
}
