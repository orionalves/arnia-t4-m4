import { PartialType } from '@nestjs/swagger';
import { CreateAddressDoc } from './create-address.docs';

export class UpdateAddressDoc extends PartialType(CreateAddressDoc) {}
