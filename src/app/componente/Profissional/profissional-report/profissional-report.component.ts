import { Component, Injectable } from '@angular/core';
import { ProfReport } from 'src/app/model/ProfReport';
import { ActivatedRoute } from '@angular/router';
import { NgbDateAdapter, NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ProfissionalService } from 'src/app/service/profissional.service';


@Injectable()
export class FormatDateAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '/';

  fromModel(value: string): NgbDateStruct | null {

    if (value) {
       let date = value.split(this.DELIMITER);
       return {
         day: parseInt(date[0], 10),
       month: parseInt(date[1], 10),
       year: parseInt(date[2], 10)
      }; 
    }        
      return null;
    }
  
 
   format(date: NgbDateStruct): string | null {
       return date ? validarDia(date.day) + this.DELIMITER + validarDia(date.month) + this.DELIMITER + date.year : ''; 
    }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? validarDia(date.day) + this.DELIMITER + validarDia(date.month) + this.DELIMITER + date.year : null;
    }  
}   

  @Injectable() 
  export class FormataData extends NgbDateParserFormatter {
  
  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
      if (value) {
        let date = value.split(this.DELIMITER);
        return {
          day: parseInt(date[0], 10),
          month: parseInt(date[1], 10),
          year: parseInt(date[2], 10)
        };
      }
      return null;           
  }    
           
    
  format(date: NgbDateStruct): string | null {
      return date ? validarDia(date.day) + this.DELIMITER + validarDia(date.month) + this.DELIMITER + date.year : '';
  }   
    
  toModel(date: NgbDateStruct | null): string | null {
      return date ? validarDia(date.day) + this.DELIMITER + validarDia(date.month) + this.DELIMITER + date.year : null;
  }  
    
}
  
function validarDia(valor) {
    if ((valor.toString !== '') && (parseInt(valor) <= 9)) {
      return '0' + valor;
     } else {
      return valor;
      }      
    }

@Component({
    selector: 'app-profissional-report',
    templateUrl: './profissional-report.component.html', 
    styleUrls: ['./profissional-report.component.css'],
    providers: [{ provide: NgbDateParserFormatter, useClass: FormataData },
    { provide: NgbDateAdapter, useClass: FormatDateAdapter }]  
  })    
  export class ProfissionalReportComponent {
  
  profReport = new ProfReport(); 
    
  constructor(private  routeActive: ActivatedRoute,  private profService: ProfissionalService) { }
    
  imprimeRelatorioProfissional() {
      this.profService. downloadPdfRelProfParam(this.profReport);
  }       
}