import { Field, Int, ObjectType } from 'type-graphql';
import { Academy } from '../../academies/models/academy.model';

@ObjectType()
export class Statistics {
  @Field(type => Int, {
    description: 'Всего ведомостей',
  })
  all: number;

  @Field(type => Int, {
    description: 'Не проставлены контрольные точки',
  })
  noCheckpoints: number;

  @Field(type => Int, {
    description: 'Не заполнен рейтинг',
  })
  noRatings: number;

  @Field(type => Int, {
    description: 'Незакрытые',
  })
  notClosed: number;

  @Field(type => Int, {
    description: 'Пустые',
  })
  blank: number;

  academy: Academy;
  divisionId: number;
  facultyId: number;
}
