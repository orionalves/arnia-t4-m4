import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { CurrentUserDto } from 'src/auth/dto/current-user.dto';

@UseGuards(AuthGuard)
@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  create(
    @CurrentUser() user: CurrentUserDto,
    @Body() createAddressDto: CreateAddressDto,
  ) {
    return this.addressesService.create(createAddressDto, +user.sub);
  }

  @Get()
  findAll() {
    return this.addressesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressesService.update(+id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressesService.remove(+id);
  }
}
