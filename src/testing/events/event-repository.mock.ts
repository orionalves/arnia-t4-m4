import { getRepositoryToken } from "@nestjs/typeorm";
import { eventsListMock } from "./events-list.mock";
import { Event } from "../../events/entities/event.entity";

export const eventRepositoryMock = {
  provide: getRepositoryToken(Event),
  useValue: {
    findOneOrFail: jest.fn().mockResolvedValue(eventsListMock[0])
  }
}