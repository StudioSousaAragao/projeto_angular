import { BrowserModule } from '@angular/platform-browser';
//import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component'; /* Ativando requisi��es Ajax */
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { LoginComponent } from './login/login.component';
import { HttpInterceptorModule } from './service/header-interceptor.service';
import { UsuarioComponent } from './componente/usuario/usuario/usuario.component';
import { UsuarioAddComponent } from './componente/usuario/usuario-add/usuario-add.component';
import { GuardiaoGuard } from './service/guardiao.guard';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxCurrencyModule } from 'ngx-currency';
import { UsuarioReportComponent } from './componente/usuario/usuario-report/usuario-report.component';
import { ChartsModule } from 'ng2-charts';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { BarChartComponent } from './componente/bar-chart/bar-chart.component';
import { ClienteComponent } from './componente/cliente/cliente/cliente.component';
import { ClienteAddComponent } from './componente/cliente/cliente-add/cliente-add.component';
import { FornecedorComponent } from './componente/fornecedor/fornecedor/fornecedor.component';
import { ClienteReportComponent } from './componente/cliente/cliente-report/cliente-report.component';
import { FornecedorAddComponent } from './componente/fornecedor/fornecedor-add/fornecedor-add.component';
import { FornecedorReportComponent } from './componente/fornecedor/fornecedor-report/fornecedor-report.component';
import { ServicoComponent } from './componente/servico/servico/servico.component';
import { ServicoAddComponent } from './componente/servico/servico-add/servico-add.component';
import { ServicoReportComponent } from './componente/servico/servico-report/servico-report.component';
import { CategoriaComponent } from './componente/categoria/categoria/categoria.component';
import { CategoriaAddComponent } from './componente/categoria/categoria-add/categoria-add.component';
import { ProfissionalComponent } from './componente/profissional/profissional/profissional.component';
import { ProfissionalAddComponent } from './componente/profissional/profissional-add/profissional-add.component';
import { ProfissionalReportComponent } from './componente/profissional/profissional-report/profissional-report.component';
import { AgendamentoComponent } from './componente/agendamento/agendamento/agendamento.component';
import { AgendamentoAddComponent } from './componente/agendamento/agendamento-add/agendamento-add.component';
import { AgendamentoReportComponent } from './componente/agendamento/agendamento-report/agendamento-report.component';
import { BarChartAgeComponent } from './componente/bar-chart-age/bar-chart-age.component';
import { FormapagamentoComponent } from './componente/formapagamento/formapagamento/formapagamento.component';
import { FormapagamentoAddComponent } from './componente/formapagamento/formapagamento-add/formapagamento-add.component';
import { PlanocontasComponent } from './componente/planocontas/planocontas/planocontas.component';
import { PlanocontasAddComponent } from './componente/planocontas/planocontas-add/planocontas-add.component';
import { ContaspagarComponent } from './componente/contaspagar/contaspagar/contaspagar.component';
import { ContaspagarAddComponent } from './componente/contaspagar/contaspagar-add/contaspagar-add.component';
import { ContaspagarReportComponent } from './componente/contaspagar/contaspagar-report/contaspagar-report.component';
import { ModalClientesComponent } from './componente/modal-clientes/modal-clientes.component';


export const appRouters: Routes = [

  { path: 'home', component: HomeComponent, canActivate: [GuardiaoGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'usuarioList', component: UsuarioComponent, canActivate: [GuardiaoGuard] },
  { path: 'usuarioAdd', component: UsuarioAddComponent, canActivate: [GuardiaoGuard] },
  { path: 'usuarioAdd/:id', component: UsuarioAddComponent, canActivate: [GuardiaoGuard] },
  { path: 'userReport', component: UsuarioReportComponent, canActivate: [GuardiaoGuard] },
  { path: 'chart', component: BarChartComponent, canActivate: [GuardiaoGuard] },
  { path: 'clienteList', component: ClienteComponent, canActivate: [GuardiaoGuard] },
  { path: 'clienteAdd', component: ClienteAddComponent, canActivate: [GuardiaoGuard] },
  { path: 'clienteAdd/:id', component: ClienteAddComponent, canActivate: [GuardiaoGuard] },
  { path: 'cliReport', component: ClienteReportComponent, canActivate: [GuardiaoGuard] },
  { path: 'fornList', component: FornecedorComponent, canActivate: [GuardiaoGuard] },
  { path: 'fornecedorAdd', component: FornecedorAddComponent, canActivate: [GuardiaoGuard] },
  { path: 'fornecedorAdd/:id', component: FornecedorAddComponent, canActivate: [GuardiaoGuard] },
  { path: 'fornReport', component: FornecedorReportComponent, canActivate: [GuardiaoGuard] },
  { path: 'servicoList', component: ServicoComponent, canActivate: [GuardiaoGuard] },
  { path: 'servicoAdd', component: ServicoAddComponent, canActivate: [GuardiaoGuard] },
  { path: 'servicoAdd/:id', component: ServicoAddComponent, canActivate: [GuardiaoGuard] },
  { path: 'servicoReport', component: ServicoReportComponent, canActivate: [GuardiaoGuard] },
  { path: 'categoriaList', component: CategoriaComponent, canActivate: [GuardiaoGuard] },
  { path: 'categoriaAdd', component: CategoriaAddComponent, canActivate: [GuardiaoGuard] },
  { path: 'categoriaAdd/:id', component: CategoriaAddComponent, canActivate: [GuardiaoGuard] },
  { path: 'profissionalList', component: ProfissionalComponent, canActivate: [GuardiaoGuard] },
  { path: 'profissionalAdd', component: ProfissionalAddComponent, canActivate: [GuardiaoGuard] },
  { path: 'profissionalAdd/:id', component: ProfissionalAddComponent, canActivate: [GuardiaoGuard] },
  { path: 'profReport', component: ProfissionalReportComponent, canActivate: [GuardiaoGuard] },
  { path: 'agendamentoList', component: AgendamentoComponent, canActivate: [GuardiaoGuard] },
  { path: 'agendamentoAdd', component: AgendamentoAddComponent, canActivate: [GuardiaoGuard] },
  { path: 'agendamentoAdd/:id', component: AgendamentoAddComponent, canActivate: [GuardiaoGuard] },
  { path: 'chartAge', component: BarChartAgeComponent, canActivate: [GuardiaoGuard] },
  { path: 'ageReport', component: AgendamentoReportComponent, canActivate: [GuardiaoGuard] },
  { path: 'fpaList', component: FormapagamentoComponent, canActivate: [GuardiaoGuard] },
  { path: 'fpaListAdd', component: FormapagamentoAddComponent, canActivate: [GuardiaoGuard] },
  { path: 'fpaListAdd/:id', component: FormapagamentoAddComponent, canActivate: [GuardiaoGuard] },
  { path: 'pctaList', component: PlanocontasComponent, canActivate: [GuardiaoGuard] },
  { path: 'pctaListAdd', component: PlanocontasAddComponent, canActivate: [GuardiaoGuard] },
  { path: 'pctaListAdd/:id', component: PlanocontasAddComponent, canActivate: [GuardiaoGuard] },
  { path: 'ctapagarList', component: ContaspagarComponent, canActivate: [GuardiaoGuard] },
  { path: 'ctapagarListAdd', component: ContaspagarAddComponent, canActivate: [GuardiaoGuard] },
  { path: 'ctapagarListAdd/:id', component: ContaspagarAddComponent, canActivate: [GuardiaoGuard] },
];

export const routes: ModuleWithProviders = RouterModule.forRoot(appRouters);

export const optionsMask: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UsuarioComponent,
    UsuarioAddComponent,
    UsuarioReportComponent,
    BarChartComponent,
    ClienteComponent,
    ClienteAddComponent,
    FornecedorComponent,
    ClienteReportComponent,
    FornecedorAddComponent,
    FornecedorReportComponent,
    ServicoComponent,
    ServicoAddComponent,
    ServicoReportComponent,
    CategoriaComponent,
    CategoriaAddComponent,
    ProfissionalComponent,
    ProfissionalAddComponent,
    ProfissionalReportComponent,
    AgendamentoComponent,
    AgendamentoAddComponent,
    AgendamentoReportComponent,
    BarChartAgeComponent,
    FormapagamentoComponent,
    FormapagamentoAddComponent,
    PlanocontasComponent,
    PlanocontasAddComponent,
    ContaspagarComponent,
    ContaspagarAddComponent,
    ContaspagarReportComponent,
    ModalClientesComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routes,
    HttpInterceptorModule,
    NgxMaskModule.forRoot(optionsMask),
    NgxPaginationModule,
    NgbModule,
    NgxCurrencyModule,
    ChartsModule
//    BrowserAnimationsModule,
//    MatCardModule,
//    MatIconModule,
//    MatToolbarModule,
//    MatButtonModule,
//    MatFormFieldModule,
//    MatInputModule,
//    CommonModule
  ],
  //    forRoot(),
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
