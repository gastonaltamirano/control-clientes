import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from 'src/app/models/Client.model';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients : Client[] | undefined;
  client : Client = {
    nombre : '',
    Apellido : '',
    email : '',
    saldo : undefined
  }

  @ViewChild('clientForm')
  clientForm!: NgForm;

  @ViewChild('closeButton')
  closeButton!: ElementRef

  constructor (
    private clientsService : ClienteService,
    private flashMessages : FlashMessagesService
  ) {

  }

  ngOnInit(): void {
    this.clientsService.getClients().subscribe(
      clients => {
        this.clients = clients
      }
    )
  }

  getTotalBalance () {
    let totalBalance = 0;
    if (this.clients) {
      this.clients.forEach(client => {
        totalBalance += client.saldo || 0;
      })
    }

    return totalBalance;
  }

  addClient (form : NgForm) {
    if(!form.valid) {
      this.flashMessages.show('Por favor llena el formulario correctamente', {
        cssClass: 'alert-danger', timeout: 4000
      })
    } else {
      this.clientsService.addClient(form.value);
      this.clientForm.resetForm();
      this.closeModal();
    }
  }

  private closeModal () {
    this.closeButton.nativeElement.click();
  }

}
