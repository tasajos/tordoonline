import { Component, OnInit } from '@angular/core';
import { SflotaService } from 'src/app/Services/sflota.service';
import { registrarflotaInter } from 'src/app/Interfaz/flota';

@Component({
  selector: 'app-verflota',
  templateUrl: './verflota.component.html',
  styleUrls: ['./verflota.component.css']
})
export class VerflotaComponent implements OnInit {
  registrosFlota: registrarflotaInter[] = []; // Inicializa la variable con un arreglo vacío

  constructor(private verFlota: SflotaService) {}

  ngOnInit(): void {
    this.verFlota.getflota().subscribe(data => {
      this.registrosFlota = data; // Almacena los datos en la variable
    });
  }
}
