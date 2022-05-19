import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { Configuration } from 'src/app/models/Configuration.model';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  permitirRegistro : boolean | undefined = false;

  constructor (
    private router : Router,
    private configService : ConfigurationService
  ) { }

  ngOnInit(): void {
    this.configService.getConfiguration().subscribe({
      next: (config) => {
        this.permitirRegistro = config?.permitirRegistro
      }
    })
  }

  guardar () {
    let config = {permitirRegistro : this.permitirRegistro};
    this.configService.toggleConfiguration(config);
    this.router.navigate(['/']);
  }

}
