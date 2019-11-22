import { Component } from '@angular/core';
import { ANIMALES } from '../../data/data.animales';
import { Animal } from '../../interfaces/animal.interface';

import { Refresher } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  animales: Animal[] = [];
  audio = new Audio();
  ordenando =  false;
  audioTiempo: any;
  constructor() {
    this.animales = ANIMALES.slice(0);
  }
  reproducir( animal: Animal[] ) {

    this.pausarAudio(animal);

    if ( animal.reproduciendo ) {
      animal.reproduciendo = false;
      return;
    }

    this.audio.src = animal.audio;
    this.audio.load();
    this.audio.play();

    animal.reproduciendo = true;
    this.audioTiempo = setTimeout(() => animal.reproduciendo = false, animal.duracion * 1000);

  }

  borrarAnimal(idx: number) {
    this.animales.splice(idx, 1);
  }


  recargarAnimales(refresher: Refresher) {
    setTimeout(() => {
      this.animales = ANIMALES.slice(0);
      refresher.target.complete();
    }, 1500);
  }
  toggleReorder() {
    this.ordenando = !this.ordenando;
    const reorderGroup = document.getElementById('reorder');
    reorderGroup.disabled = !reorderGroup.disabled;
    reorderGroup.addEventListener('ionItemReorder', ({detail}) => {
      detail.complete(true);
    });
  }
  reorderItems(indexes: any) {
    // this.animales = reorderArray(this.animales, indexes);
  }
  private pausarAudio( animalSeleccionado: Animal ) {
    clearTimeout( this.audioTiempo );
    this.audio.pause();
    this.audio.currentTime = 0;

    for (const animal of this.animales) {
      if ( animal.nombre !== animalSeleccionado.nombre ) {
        animal.reproduciendo = false;
      }
    }

  }
}
