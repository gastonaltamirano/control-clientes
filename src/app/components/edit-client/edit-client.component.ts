import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from 'src/app/models/Client.model';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  client : Client = {
    nombre : '',
    Apellido : '',
    email : '',
    saldo : undefined
  }
  id : string = '';

  constructor(
    private clientService : ClienteService,
    private flashMessageService : FlashMessagesService,
    private router : Router,
    private route : ActivatedRoute
  ) {

  }

  ngOnInit (): void {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(client => {
      if(client) {
        this.client = client
      }
    })
  }

  saveClient (form : NgForm) {
    if(!form.valid) {
      this.flashMessageService.show('Por favor llena el formulario correctamente', {
        cssClass: 'alert-danger', timeout: 4000
      });
    }
    else {
      form.value.id = this.id;
      this.clientService.updateClient(form.value);
      this.router.navigate(['/']);
    }
  };

  deleteClient () {
    if(confirm('¿Seguro desea eliminar cliente?')) {
      this.clientService.deleteClient(this.client);
      this.router.navigate(['/']);
    }
  }

}
