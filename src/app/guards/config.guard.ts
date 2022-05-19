import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { ConfigurationService } from "../services/configuration.service";
import { map } from 'rxjs/operators'

@Injectable()
export class ConfigGuard implements CanActivate {
    constructor (
        private router : Router,
        private configService : ConfigurationService
    ) {}

    canActivate () : Observable<boolean> {
        return this.configService.getConfiguration().pipe(
            map (config => {
                if(config && config.permitirRegistro) {
                    return true
                } else {
                    this.router.navigate(['/login']);
                    return false
                }
            })
        )
    }
}