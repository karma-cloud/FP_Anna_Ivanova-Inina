import { Injectable } from '@angular/core';
import {Animal} from "../app.component";



@Injectable({
  providedIn: 'root',
})

export class AnimalService {
  private animals: Animal[] = [
    new Animal('Кот', 'Снежок', 3, 'Серый', 'Мяу'),
    new Animal('Собака', 'Дружок', 2, 'Коричневый', 'Гав'),
    new Animal('Кот', 'Персик', 5, 'Рыжий', 'Мяу'),
    new Animal('Кот', 'Миледи', 1, 'Белый', 'Мяу'),
    new Animal('Попугай', 'Гоша', 7, 'Синий', '-'),
    new Animal('Собака', 'Сева', 6, 'Рыжий', 'Гав'),
  ];

  getAnimals(): Animal[] {
    return this.animals;
  }

}
