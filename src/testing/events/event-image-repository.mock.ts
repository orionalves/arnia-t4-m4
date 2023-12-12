import { getRepositoryToken } from "@nestjs/typeorm";
import { EventImageMock } from "./event-image.mock";
import { Image } from "../../events/entities/image.entity";

export const eventImageRepositoryMock = {
  provide: getRepositoryToken(Image),
  useValue: {
    create: jest.fn().mockReturnValue(EventImageMock[0]),
    save: jest.fn()
  }
}