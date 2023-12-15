import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AnimalService} from './services/animal.service';

export class Animal {
  constructor(
    public type: string,
    public name: string,
    public age: number,
    public color: string,
    public sound: string
  ) {}
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'animal-app';
  animals: Animal[] = [];
  showCats: boolean = true;
  selectedAnimal: Animal | null = null;

  constructor(private animalService: AnimalService) {
    this.animals = this.animalService.getAnimals();
  }

  showDetails(animal: Animal): void {
    this.selectedAnimal = animal;
  }

  toggleCats(): void {
    this.showCats = !this.showCats;
  }

  filteredAnimals(): Animal[] {
    return this.showCats ? this.animals : this.animals.filter(animal => animal.type !== 'Кот' );
  }

  showDetailsFor(animal: Animal): boolean {
    return this.showCats || animal.type !== 'Кот';
  }
}
