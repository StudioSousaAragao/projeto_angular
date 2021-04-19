import { Component, OnInit } from '@angular/core';
import { AgendamentoService } from 'src/app/service/agendamento.service';
import { AgeChart } from 'src/app/model/AgeChart';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart-age',
  templateUrl: './bar-chart-age.component.html',
  styleUrls: ['./bar-chart-age.component.css']
})
export class BarChartAgeComponent implements OnInit {

  constructor(private agendamentoService: AgendamentoService) { }

  ageChart = new AgeChart();

  ngOnInit(): void {

    this.agendamentoService.carregarGraficoAge().subscribe(data => {

      this.ageChart = data;

      /* clientes */
      this.barChartLabels = this.ageChart.nome.split(',');

      /* hora */
      var arrayHora = JSON.parse('[' + this.ageChart.hora + ']');

      this.barChartData = [
        { data: arrayHora, label: 'Agendamentos' }
      ];

    });

  }

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [], label: 'Agendamentos' }
  ];

}
