import { faker } from '@faker-js/faker';

export default function mockArticle(){
  return {
    title: faker.lorem.sentence(2),
    description: faker.lorem.sentence(3),
    body: faker.lorem.paragraph(3),
    tagList: [
      faker.lorem.word(),
      faker.lorem.word(),
      faker.lorem.word(),
    ]
  }
}