import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class SaveStory {
  @Field({ description: 'Дата сохранения' })
  date: string;

  @Field({ description: 'Пользователь' })
  login: string;

  @Field({ description: 'ФИО сотрудника' })
  username: string;

  @Field({ description: 'Должность сотрудника' })
  post: string;

  @Field({ description: 'Компьютер' })
  device: string;
}
