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
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CurrentUserDto } from '../auth/dto/current-user.dto';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { CreateAddressDoc } from './docs/create-address.docs';
import { AddressDoc } from './docs/address.doc';
import { UpdateAddressDoc } from './docs/update-address.docs';

@ApiTags('Endereço')
@UseGuards(AuthGuard)
@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @ApiBody({
    type: CreateAddressDoc,
  })
  @ApiResponse({
    type: AddressDoc,
  })
  @Post()
  create(
    @CurrentUser() user: CurrentUserDto,
    @Body() createAddressDto: CreateAddressDto,
  ) {
    return this.addressesService.create(createAddressDto, +user.sub);
  }

  @ApiResponse({
    type: AddressDoc,
    isArray: true,
  })
  @Get()
  findAll() {
    return this.addressesService.findAll();
  }

  @ApiResponse({
    type: AddressDoc,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressesService.findOne(+id);
  }

  @ApiBody({
    type: UpdateAddressDoc,
  })
  @ApiResponse({
    type: AddressDoc,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressesService.update(+id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressesService.remove(+id);
  }
}
