import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { EventsService } from './events.service';
import { userServiceMock } from '../testing/users/user-service.mock';
import { getImageMock } from '../testing/events/get-image.mock';
import { EventImageMock } from '../testing/events/event-image.mock';
import { eventRepositoryMock } from '../testing/events/event-repository.mock';
import { eventImageRepositoryMock } from '../testing/events/event-image-repository.mock';

describe('EventsService', () => {
  let service: EventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        ConfigService,
        userServiceMock,
        eventRepositoryMock,
        eventImageRepositoryMock
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("saveImage", () => {
    it("Should return a image object", async () => {
      const file = await getImageMock()
      const result = await service.saveImage(1, file)

      expect(result).toEqual(EventImageMock[0])
    })

  })
});
